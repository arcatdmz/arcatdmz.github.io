/**
 * Compare a React export with a build from the pre-migration commit.
 *
 * node --import tsx scripts/verify-site.ts --baseline ../arcatdmz.github.io-baseline/dist --candidate dist
 * node --import tsx scripts/verify-site.ts --optimized
 * node --import tsx --test tests/migration-verifier.test.mts
 *
 * Ignore only the framework root, executable scripts, resource hints, comments,
 * attribute serialization, and head metadata order. Content/markup, inline CSS,
 * ordered stylesheets, language, body classes, public URLs and static HTML remain
 * strict. --optimized validates narrowly documented image/widget changes before
 * comparing. --render is deprecated: use Next's supported export renderer.
 */
import { resolveReactHref } from "../site/navigation";
import * as fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { parse } from "parse5";
import postcss, { type ChildNode } from "postcss";

interface Element {
  type: "tag";
  name: string;
  attribs: Record<string, string>;
  children: AnyNode[];
}
type AnyNode = Element | { type: "text"; data: string } | { type: "comment" };
function isTag(node: AnyNode): node is Element {
  return node.type === "tag";
}
function parseDocument(
  source: string,
  _options?: unknown,
): { children: AnyNode[] } {
  function convert(node: any): AnyNode {
    if (node.nodeName === "#text") return { type: "text", data: node.value };
    if (!node.tagName) return { type: "comment" };
    return {
      type: "tag",
      name: node.tagName,
      attribs: Object.fromEntries(
        node.attrs.map((attr: any) => [
          attr.prefix ? `${attr.prefix}:${attr.name}` : attr.name,
          attr.value,
        ]),
      ),
      children: (node.content?.childNodes || node.childNodes || []).map(
        convert,
      ),
    };
  }
  return { children: parse(source).childNodes.map(convert) };
}

export interface CanonicalElement {
  tag: string;
  attrs: Record<string, string>;
  children: CanonicalNode[];
}
export type CanonicalNode = CanonicalElement | string;
export interface CanonicalPage {
  html: Record<string, string>;
  body: CanonicalElement;
  metadata: CanonicalNode[];
  styles: CanonicalNode[];
}
export interface Difference {
  location: string;
  expected: unknown;
  actual: unknown;
}
export interface Failure extends Difference {
  page: string;
  category: string;
}
export interface UrlIssue {
  page: string;
  attribute: string;
  url: string;
  target: string;
}
export interface Report {
  mode: "render" | "export";
  optimized: boolean;
  baseline: string;
  candidate: string;
  counts: Record<string, number>;
  failures: Failure[];
  existingBrokenUrls: UrlIssue[];
  newBrokenUrls: UrlIssue[];
  addedHtml: string[];
  addedSitemapUrls: string[];
  css: Array<{
    path: string;
    identical: boolean;
    missing: string[];
    added: string[];
  }>;
}

const booleanAttributes = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
]);
const resourceHints = new Set([
  "preload",
  "modulepreload",
  "preconnect",
  "dns-prefetch",
]);

function normalizeCssValue(value: string): string {
  // Keep quoted text and whitespace-sensitive expressions intact.
  return value.trim();
}

export function cssRules(source: string): string[] {
  const root = postcss.parse(source);
  const entries: string[] = [];
  function visit(node: ChildNode, parents: string[]): void {
    if (node.type === "comment") return;
    if (node.type === "atrule" && node.nodes) {
      const label = `@${node.name} ${node.params.trim()}`.trim();
      if (
        node.nodes.every(
          (child) => child.type === "decl" || child.type === "comment",
        )
      ) {
        entries.push(
          JSON.stringify([...parents, label, declarations(node.nodes)]),
        );
      } else {
        for (const child of node.nodes) visit(child, [...parents, label]);
      }
    } else if (node.type === "rule") {
      const decls = declarations(node.nodes);
      // Decompose selector lists so PurgeCSS retaining an additional selector
      // does not falsely report a retained baseline rule as removed.
      for (const selector of postcss.list.comma(node.selector)) {
        entries.push(JSON.stringify([...parents, selector.trim(), decls]));
      }
    } else if (node.type === "atrule") {
      entries.push(
        JSON.stringify([...parents, `@${node.name}`, node.params.trim()]),
      );
    } else if (node.type === "decl") {
      entries.push(
        JSON.stringify([
          ...parents,
          node.prop,
          normalizeCssValue(node.value),
          !!node.important,
        ]),
      );
    }
  }
  for (const node of root.nodes) visit(node, []);
  return entries;
}

function declarations(nodes: ChildNode[]): unknown[] {
  return nodes
    .filter((n) => n.type === "decl")
    .map((node) => {
      if (node.type !== "decl") throw new Error("Not a declaration");
      return [node.prop, normalizeCssValue(node.value), !!node.important];
    });
}

function attributes(element: Element): Record<string, string> {
  return Object.fromEntries(
    Object.entries(element.attribs)
      .filter(([name]) => name !== "data-next-head")
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, raw]) => {
        let value = raw;
        // Intentional migration: translation helpers now edit the actual TSX source.
        // Preserve literal URLs except known React routes' equivalent trailing slash.
        if (name === "href")
          value = value.replace(
            /^(https:\/\/github\.com\/arcatdmz\/arcatdmz\.github\.io\/blob\/main)\/src\/(phybots|homehack|live-tuning|openpool|programming-with-examples)\/index\.pug$/,
            "$1/components/$2/index.tsx",
          );
        if (name === "href" && resolveReactHref(value)) {
          const url = new URL(value, "https://junkato.jp/");
          value = `${url.pathname.replace(/\/$/, "") || "/"}${url.search}${
            url.hash
          }`;
        }
        if (name === "class")
          value = [...new Set(raw.split(/\s+/).filter(Boolean))]
            .sort()
            .join(" ");
        if (booleanAttributes.has(name)) value = "";
        if (name === "style") {
          try {
            const rule = postcss.parse(`a{${raw}}`).nodes[0];
            if (rule.type === "rule")
              value = JSON.stringify(declarations(rule.nodes));
          } catch {
            /* A malformed baseline style is still compared literally. */
          }
        }
        return [name, value];
      })
      .filter(
        ([name, value]) =>
          !(
            (name === "class" && value === "") ||
            (name === "style" && value === "[]")
          ),
      ),
  );
}

function ignored(element: Element): boolean {
  return (
    (element.name === "script" &&
      (element.attribs.id === "__NEXT_DATA__" ||
        (element.attribs.type === "application/x-site-script" &&
          (!element.attribs["data-type"] ||
            /^(?:text|application)\/(?:java|ecma)script$/i.test(
              element.attribs["data-type"],
            ))) ||
        !element.attribs.type ||
        /^(?:module|(?:text|application)\/(?:java|ecma)script)$/i.test(
          element.attribs.type,
        ))) ||
    (element.name === "noscript" &&
      "data-n-css" in element.attribs &&
      element.children.length === 0) ||
    (element.name === "link" && resourceHints.has(element.attribs.rel)) ||
    (element.name === "meta" && element.attribs.name === "next-head-count")
  );
}

function canonicalChildren(
  nodes: AnyNode[],
  preserveWhitespace = false,
  unwrapNext = false,
): CanonicalNode[] {
  const result: CanonicalNode[] = [];
  function append(value: CanonicalNode) {
    if (typeof value === "string" && typeof result.at(-1) === "string") {
      result[result.length - 1] = String(result.at(-1)) + value;
    } else result.push(value);
  }
  for (const node of nodes) {
    if (node.type === "text") {
      append(
        preserveWhitespace
          ? node.data
          : node.data.replace(/[\t\n\r\f ]+/g, " "),
      );
    } else if (isTag(node) && !ignored(node)) {
      if (
        unwrapNext &&
        node.name === "div" &&
        node.attribs.id === "__next" &&
        Object.keys(node.attribs).length === 1
      ) {
        canonicalChildren(node.children, preserveWhitespace).forEach(append);
      } else {
        const children =
          node.name === "style"
            ? [
                JSON.stringify(
                  cssRules(
                    node.children
                      .map((n) => (n.type === "text" ? n.data : ""))
                      .join(""),
                  ),
                ),
              ]
            : canonicalChildren(
                node.children,
                preserveWhitespace ||
                  ["pre", "textarea", "script"].includes(node.name),
              );
        append({ tag: node.name, attrs: attributes(node), children });
      }
    }
  }
  // Normalize once more after merging text split by React's nonvisual comments.
  return result.map((node) =>
    typeof node === "string" && !preserveWhitespace
      ? node.replace(/[\t\n\r\f ]+/g, " ")
      : node,
  );
}

function findElement(nodes: AnyNode[], name: string): Element | undefined {
  for (const node of nodes) {
    if (!isTag(node)) continue;
    if (node.name === name) return node;
    const result = findElement(node.children, name);
    if (result) return result;
  }
}

function metadataKey(node: CanonicalNode): string {
  if (typeof node === "string") return node;
  const {
    name,
    property,
    itemprop,
    charset,
    rel,
    rev,
    "http-equiv": httpEquiv,
  } = node.attrs;
  return JSON.stringify([
    node.tag,
    name,
    property,
    itemprop,
    charset,
    rel,
    rev,
    httpEquiv,
    node.tag === "link" ? node.attrs.href : "",
  ]);
}

export function canonicalPage(source: string): CanonicalPage {
  const document = parseDocument(source, { decodeEntities: true });
  const html = findElement(document.children, "html");
  const head = findElement(document.children, "head");
  const body = findElement(document.children, "body");
  if (!html || !head || !body)
    throw new Error("Document must contain html, head and body elements");
  const headChildren = canonicalChildren(head.children);
  const isStyle = (node: CanonicalNode) =>
    typeof node !== "string" &&
    (node.tag === "style" ||
      (node.tag === "link" && node.attrs.rel === "stylesheet"));
  return {
    html: attributes(html),
    body: {
      tag: "body",
      attrs: attributes(body),
      children: canonicalChildren(body.children, false, true),
    },
    metadata: headChildren
      .filter(
        (node) => !isStyle(node) && !(typeof node === "string" && !node.trim()),
      )
      .sort((a, b) => metadataKey(a).localeCompare(metadataKey(b))),
    styles: headChildren.filter(isStyle),
  };
}

/** Explicit optimization contracts. Unknown markup/attributes remain differences. */
export interface OptimizationContext {
  page: string;
  manifest: import("../site/image-types").ImageManifest;
  pageImages: import("../site/image-types").ImageManifest;
}
const defaultImageSizes =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 933px, 1127px";
const classTokens = (value = "") =>
  [...new Set(value.split(/\s+/).filter(Boolean))].sort().join(" ");
const hasClasses = (node: CanonicalElement, ...names: string[]) =>
  names.every((name) => (node.attrs.class || "").split(" ").includes(name));
const reactId = (value?: string) => !!value && /^_R_[a-z0-9]+_$/i.test(value);

export function optimizedDifferences(
  before: string,
  after: string,
  context: OptimizationContext,
): Difference[] {
  const expected = canonicalPage(before),
    actual = canonicalPage(after);
  const validation: Difference[] = [];
  function requireValue(location: string, expected: unknown, actual: unknown) {
    validation.push(...differences(expected, actual, location));
  }
  for (const [src, entry] of Object.entries(context.pageImages)) {
    requireValue(
      `$.pageImages[${JSON.stringify(src)}]`,
      context.manifest[src],
      entry,
    );
  }
  const popupIds = new Map<string, CanonicalElement>();
  function index(node: CanonicalNode) {
    if (typeof node === "string") return;
    if (node.attrs["data-site-popup-trigger"]) {
      const id = node.attrs["data-site-popup-trigger"];
      if (popupIds.has(id)) requireValue("$.popupIds.unique", true, false);
      popupIds.set(id, structuredClone(node));
    }
    node.children.forEach(index);
  }
  index(actual.body);
  function normalize(
    a: CanonicalNode,
    b: CanonicalNode,
    at: string,
    parent?: CanonicalElement,
    grandparent?: CanonicalElement,
    greatGrandparent?: CanonicalElement,
  ) {
    if (typeof a === "string" || typeof b === "string" || a.tag !== b.tag)
      return;
    const aa = a.attrs,
      ba = b.attrs;
    // Restore only a validated optimization value; authored values are untouched.
    const attribute = (key: string, value: string) => {
      if (aa[key] !== undefined) return;
      requireValue(`${at}.attrs.${key}`, value, ba[key]);
      if (ba[key] === value) delete ba[key];
    };
    const changedClass = (value: string) => {
      requireValue(`${at}.attrs.class`, classTokens(value), ba.class || "");
      if ((ba.class || "") === classTokens(value)) {
        if (aa.class) ba.class = aa.class;
        else delete ba.class;
      }
    };
    const button = () => {
      attribute("role", "button");
      attribute("tabindex", "0");
    };
    if (a.tag === "img") {
      let key: string | undefined;
      try {
        const url = new URL(
          aa.src,
          `https://junkato.jp/${context.page.replace(/index\.html$/, "")}`,
        );
        if (url.origin === "https://junkato.jp") key = decodeURI(url.pathname);
      } catch {
        /* The normal comparison catches malformed original URLs. */
      }
      const asset =
        key && (ba["data-original-src"] !== undefined || ba.src !== aa.src)
          ? context.pageImages[key]
          : undefined;
      if (asset) {
        const variants = [...asset.srcSet];
        if (variants.length && variants.at(-1)!.width < asset.width)
          variants.push({
            src: aa.src,
            width: asset.width,
            height: asset.height,
          });
        const fallback =
          variants.find((variant) => variant.width >= 640) || variants.at(-1);
        requireValue(`${at}.attrs.src`, fallback?.src || aa.src, ba.src);
        if (ba.src === (fallback?.src || aa.src)) ba.src = aa.src;
        attribute("data-original-src", aa.src);
        attribute("width", String(asset.width));
        attribute("height", String(asset.height));
        {
          if (variants.length)
            attribute(
              "srcset",
              variants
                .map((variant) => `${variant.src} ${variant.width}w`)
                .join(", "),
            );
          let sizes = defaultImageSizes;
          if (hasClasses(a, "avatar"))
            sizes =
              parent?.attrs.class === "header" &&
              grandparent?.attrs.class === "content" &&
              greatGrandparent &&
              hasClasses(greatGrandparent, "card") &&
              !!greatGrandparent.attrs["data-project"]
                ? "40px"
                : "32px";
          else if (aa.id === "avatar") sizes = "96px";
          else if (/^(?:ja\/)?design\/index.html$/.test(context.page)) {
            if (key?.startsWith("/images/icons/")) sizes = "150px";
            else if (
              parent?.tag === "a" &&
              hasClasses(parent, "for-modal", "image")
            )
              sizes = `${Math.ceil((70 * asset.width) / asset.height)}px`;
          } else if (key?.startsWith("/images/thumbnails/")) {
            if (
              parent &&
              hasClasses(parent, "mobile", "hidden", "bordered", "image")
            )
              sizes = "175px";
            else if (
              parent?.attrs.class === "image" &&
              grandparent &&
              hasClasses(grandparent, "card") &&
              grandparent.attrs["data-project"]
            )
              sizes =
                "(max-width:767px) calc(100vw - 2rem), (max-width:991px) 340px, (max-width:1199px) 450px, 540px";
          }
          // The home video poster has its own 340px column.
          if (
            /^(?:ja\/)?index.html$/.test(context.page) &&
            parent?.tag === "a" &&
            hasClasses(parent, "ui", "fluid", "bordered", "image") &&
            key?.startsWith("/images/panels/")
          )
            sizes = "(max-width: 767px) calc(100vw - 2rem), 340px";
          if (variants.length || sizes !== defaultImageSizes)
            attribute("sizes", sizes);
        }
      } else if (ba["data-original-src"] !== undefined) {
        requireValue(
          `${at}.pageImages`,
          "manifest entry for original image",
          undefined,
        );
      }
      // All SiteImage instances, including external/SVG/GIF images, use these defaults.
      // Unconverted archived/direct img elements remain strict and unchanged.
      if (ba.loading !== undefined || ba.decoding !== undefined || asset) {
        attribute("decoding", "async");
        attribute(
          "loading",
          aa.id === "avatar" || (parent && hasClasses(parent, "modal"))
            ? "eager"
            : "lazy",
        );
      }
      if (aa.id === "avatar") {
        button();
        attribute("fetchpriority", "high");
      }
      if (
        hasClasses(a, "hover") &&
        parent?.tag === "a" &&
        ["live-programming", "live-tuning"].includes(parent.attrs.id) &&
        /^(?:ja\/)?live-tuning\/index.html$/.test(context.page)
      ) {
        const approved = JSON.stringify([
          ["position", "absolute", false],
          ["z-index", "10", false],
        ]);
        const original = JSON.stringify([
          ["position", "absolute", false],
          ["display", "none", false],
          ["z-index", "10", false],
        ]);
        if (aa.style === original) {
          requireValue(`${at}.attrs.style`, approved, ba.style);
          if (ba.style === approved) ba.style = aa.style;
        }
      }
    }
    if (
      a.tag === "div" &&
      hasClasses(a, "ui", "right", "sidebar", "inverted", "vertical", "menu")
    ) {
      attribute("id", "site-sidebar");
      attribute("aria-label", "Site navigation");
      changedClass(`${aa.class} uncover`);
    }
    if (a.tag === "a" && hasClasses(a, "sidebar-button")) {
      attribute("role", "button");
      attribute("aria-controls", "site-sidebar");
      attribute("aria-expanded", "false");
    }
    const dropdown = a.tag === "div" && hasClasses(a, "ui", "dropdown");
    const popupTrigger =
      hasClasses(a, "with-popup") ||
      hasClasses(a, "with-popup-menu", "button") ||
      hasClasses(a, "popup-menu", "button") ||
      (a.tag === "a" && hasClasses(a, "project", "tag"));
    if (dropdown || popupTrigger) {
      const id = ba["data-site-popup-trigger"];
      requireValue(`${at}.reactId`, true, reactId(id));
      if (reactId(id)) attribute("data-site-popup-trigger", id);
      attribute("aria-expanded", "false");
      if (dropdown) {
        button();
        attribute("aria-haspopup", "menu");
      } else {
        if (reactId(id)) attribute("aria-controls", id);
        if (!aa.href) button();
        if (hasClasses(a, "popup-menu", "button", "hidden"))
          changedClass(
            aa.class
              .split(" ")
              .filter((name) => name !== "hidden")
              .join(" "),
          );
      }
    }
    if (
      a.tag === "div" &&
      aa.class === "menu" &&
      parent &&
      hasClasses(parent, "ui", "dropdown")
    ) {
      changedClass("menu transition hidden");
      attribute("role", "menu");
    }
    const previous = parent?.children[(parent?.children.indexOf(a) ?? 0) - 1];
    const expectedInlinePopup =
      previous &&
      typeof previous !== "string" &&
      (hasClasses(previous, "with-popup-menu", "button") ||
        hasClasses(previous, "popup-menu", "button") ||
        (hasClasses(previous, "with-popup") &&
          !previous.attrs["data-content"]));
    if (
      a.tag === "div" &&
      hasClasses(a, "ui", "popup") &&
      (ba["data-site-popup"] !== undefined || expectedInlinePopup)
    ) {
      const id = ba["data-site-popup"],
        trigger = popupIds.get(id);
      requireValue(
        `${at}.popupTrigger`,
        true,
        reactId(id) && !!trigger && trigger.attrs["aria-controls"] === id,
      );
      if (trigger && reactId(id)) {
        attribute("id", id);
        attribute("data-site-popup", id);
        const position = hasClasses(a, "popup-menu") ? "top left" : "top right";
        changedClass(`${aa.class} ${position} transition hidden`);
      }
    }
    if (
      a.tag === "a" &&
      (hasClasses(a, "bibtex") ||
        (hasClasses(a, "for-modal", "image") &&
          /^(?:ja\/)?design\/index.html$/.test(context.page)))
    )
      button();
    if (a.tag === "div" && hasClasses(a, "ui", "modal"))
      attribute("aria-hidden", "true");
    if (
      a.tag === "a" &&
      hasClasses(a, "more", "disabled") &&
      /^(?:ja\/)?index.html$/.test(context.page)
    ) {
      attribute("role", "button");
      attribute("tabindex", "-1");
      attribute("aria-disabled", "true");
    }
    if (
      a.tag === "a" &&
      ["live-programming", "live-tuning"].includes(aa.id) &&
      /^(?:ja\/)?live-tuning\/index.html$/.test(context.page)
    ) {
      changedClass(`${aa.class || ""} live-preview`);
      attribute("tabindex", "0");
    }
    if (
      a.tag === "div" &&
      hasClasses(a, "ui", "embed") &&
      aa["data-url"] &&
      a.children.length === 0
    ) {
      button();
      attribute("aria-label", "Open embedded content");
      const placeholder: CanonicalNode[] = [];
      if (aa["data-icon"] !== "")
        placeholder.push({
          tag: "i",
          attrs: {
            class: classTokens(`${aa["data-icon"] || "video play"} icon`),
          },
          children: [],
        });
      if (aa["data-placeholder"])
        placeholder.push({
          tag: "img",
          attrs: {
            class: "placeholder",
            src: aa["data-placeholder"],
            alt: aa["data-alt"] || "",
          },
          children: [],
        });
      // Validate every synthesized child before replacing only the exact placeholder.
      b.children.forEach((child, i) => {
        if (placeholder[i])
          normalize(placeholder[i], child, `${at}.placeholder[${i}]`, a);
      });
      requireValue(`${at}.placeholder`, placeholder, b.children);
      if (differences(placeholder, b.children).length === 0) b.children = [];
    }
    for (let i = 0; i < Math.min(a.children.length, b.children.length); i++)
      normalize(
        a.children[i],
        b.children[i],
        `${at}.children[${i}]`,
        a,
        parent,
        grandparent,
      );
  }
  normalize(expected.body, actual.body, "$.body");
  // Main pages preload their existing, scoped Design CSS for client transitions.
  // Only the exact new link immediately after main.css is permitted.
  if (
    !expected.styles.some(
      (node) =>
        typeof node !== "string" &&
        node.attrs.href === "/stylesheets/design.css",
    )
  ) {
    const mainIndex = actual.styles.findIndex(
      (node) =>
        typeof node !== "string" && node.attrs.href === "/stylesheets/main.css",
    );
    const design = actual.styles[mainIndex + 1];
    if (
      mainIndex >= 0 &&
      design &&
      differences(
        {
          tag: "link",
          attrs: { href: "/stylesheets/design.css", rel: "stylesheet" },
          children: [],
        },
        design,
      ).length === 0
    )
      actual.styles.splice(mainIndex + 1, 1);
  }
  return [...validation, ...differences(expected, actual, "$", 200)];
}

interface ExportedPageData {
  buildId: string;
  gsp?: boolean;
  props: {
    pageProps: { pageData?: { images?: OptimizationContext["pageImages"] } };
    [key: string]: unknown;
  };
}
function exportedPageData(source: string): ExportedPageData {
  const document = parseDocument(source);
  function visit(nodes: AnyNode[]): Element | undefined {
    for (const node of nodes)
      if (isTag(node)) {
        if (node.name === "script" && node.attribs.id === "__NEXT_DATA__")
          return node;
        const found = visit(node.children);
        if (found) return found;
      }
  }
  const script = visit(document.children);
  if (!script)
    throw new Error(
      "Optimized React pages require exported __NEXT_DATA__ page props. Run npm run build first.",
    );
  return JSON.parse(
    script.children
      .map((node) => (node.type === "text" ? node.data : ""))
      .join(""),
  );
}

export function differences(
  expected: unknown,
  actual: unknown,
  location = "$",
  limit = 20,
): Difference[] {
  const result: Difference[] = [];
  function check(a: unknown, b: unknown, at: string): void {
    if (result.length >= limit || a === b) return;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length)
        result.push({
          location: `${at}.length`,
          expected: a.length,
          actual: b.length,
        });
      for (let i = 0; i < Math.min(a.length, b.length); i++)
        check(a[i], b[i], `${at}[${i}]`);
    } else if (a && b && typeof a === "object" && typeof b === "object") {
      for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
        check(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
          `${at}.${key}`,
        );
      }
    } else result.push({ location: at, expected: a, actual: b });
  }
  check(expected, actual, location);
  return result;
}

export async function filesIn(root: string): Promise<string[]> {
  return (await fs.readdir(root, { withFileTypes: true }))
    .flatMap((entry) => (entry.isDirectory() ? [] : [entry.name]))
    .concat(
      ...(await Promise.all(
        (await fs.readdir(root, { withFileTypes: true }))
          .filter((entry) => entry.isDirectory())
          .map(async (entry) =>
            (await filesIn(path.join(root, entry.name))).map(
              (name) => `${entry.name}/${name}`,
            ),
          ),
      )),
    )
    .sort();
}

interface Route {
  source: string;
  path: string;
  language: string;
  bodyClass: string;
}
interface RenderedRoute {
  html: string;
  source: string;
  language: string;
  bodyClass: string;
  props: Record<string, unknown>;
}
async function renderedRoutes(root: string): Promise<RenderedRoute[]> {
  const routes: Route[] = JSON.parse(
    await fs.readFile(path.join(root, "site/routes.json"), "utf8"),
  );
  const result: RenderedRoute[] = [];
  for (const route of routes) {
    if (route.path.includes("[year]")) {
      const module = await import(
        pathToFileURL(path.join(root, "pages", route.path)).href
      );
      const generated = await module.getStaticPaths();
      for (const entry of generated.paths) {
        const year = entry.params.year;
        const props = {};
        result.push({
          ...route,
          source: route.path,
          html: route.path.replace("[year].tsx", `${year}/index.html`),
          props,
        });
      }
    } else
      result.push({
        ...route,
        source: route.path,
        html: route.path.replace(/\.tsx$/, ".html"),
        props: {},
      });
  }
  result.push({
    source: "resume.tsx",
    html: "resume.html",
    language: "en",
    bodyClass: "",
    props: {},
  });
  const knownSources = new Set(result.map((route) => route.source));
  for (const source of await filesIn(path.join(root, "pages"))) {
    if (
      !source.endsWith(".tsx") ||
      path.basename(source).startsWith("_") ||
      source.includes("[") ||
      knownSources.has(source)
    )
      continue;
    result.push({
      source,
      html: source.replace(/\.tsx$/, ".html"),
      language: source.startsWith("ja/") ? "ja" : "en",
      bodyClass: "",
      props: {},
    });
  }
  return result;
}

export function localReferences(
  source: string,
  page: string,
  domain = "junkato.jp",
): UrlIssue[] {
  const document = parseDocument(source);
  const result: UrlIssue[] = [];
  const base = new URL(
    `https://${domain}/${
      page.endsWith("index.html") ? page.slice(0, -10) : page
    }`,
  );
  function visit(nodes: AnyNode[]) {
    for (const node of nodes) {
      if (!isTag(node) || ignored(node)) continue;
      for (const attribute of [
        "href",
        "src",
        "poster",
        "data-src",
        "data-alt-src",
        "data-original-src",
        "srcset",
      ]) {
        const urls =
          attribute === "srcset"
            ? (node.attribs.srcset || "")
                .split(",")
                .map((entry) => entry.trim().split(/\s+/)[0])
            : [node.attribs[attribute]];
        for (const url of urls) {
          if (!url || url.startsWith("#")) continue;
          try {
            const resolved = new URL(url, base);
            if (
              !["http:", "https:"].includes(resolved.protocol) ||
              resolved.hostname !== domain
            )
              continue;
            result.push({
              page,
              attribute,
              url,
              target: decodeURIComponent(resolved.pathname).replace(/^\//, ""),
            });
          } catch {
            result.push({ page, attribute, url, target: "[invalid URL]" });
          }
        }
      }
      visit(node.children);
    }
  }
  visit(document.children);
  return result;
}

export function targetExists(target: string, files: Set<string>): boolean {
  const clean = target.replace(/\/$/, "");
  return (
    files.has(target) ||
    files.has(clean + "/index.html") ||
    (!clean && files.has("index.html")) ||
    files.has(clean + ".html")
  );
}

export function compareCss(
  before: string,
  after: string,
): { missing: string[]; added: string[] } {
  const a = cssRules(before),
    b = cssRules(after);
  // Reordered existing rules can change the cascade, so retained baseline rules
  // must appear in the same relative order in the candidate.
  let index = 0;
  const missing: string[] = [];
  for (const rule of a) {
    const next = b.indexOf(rule, index);
    if (next < 0) missing.push(rule);
    else index = next + 1;
  }
  const counts = new Map<string, number>();
  for (const rule of a) counts.set(rule, (counts.get(rule) || 0) + 1);
  const added = b.filter((rule) => {
    const count = counts.get(rule) || 0;
    if (!count) return true;
    counts.set(rule, count - 1);
    return false;
  });
  return { missing, added };
}

/** Reviewed rules replacing the legacy widgets, independently of source compilation. */
export const optimizedWidgetCss = `
.ui.site-modal-dimmer { overflow-y: auto; padding: 1rem; }
.ui.site-modal-dimmer > .ui.modal { position: relative; top: auto; left: auto; margin: auto !important; flex: 0 0 auto; max-height: none; }
.ui.site-modal-dimmer > .ui.modal:focus { outline: none; }
[role="button"] { cursor: pointer; }
@media (prefers-reduced-motion: reduce) { .ui.sidebar, .pushable > .pusher { transition: none !important; } }
.live-preview > img.hover { opacity: 0; transition: opacity 200ms; }
.live-preview:hover > img.hover, .live-preview:focus > img.hover { opacity: 1; }
`;
export function optimizedCssDifferences(
  source: string,
  baseline = "",
): Difference[] {
  const result: Difference[] = compareCss(
    optimizedWidgetCss,
    source,
  ).missing.map((rule) => ({
    location: "$.widgetCss",
    expected: rule,
    actual: "missing or changed approved widget rule",
  }));
  const key = (rule: string) => JSON.stringify(JSON.parse(rule).slice(0, -1));
  const baselineSelectors = new Set(cssRules(baseline).map(key));
  const approved = new Set(
    cssRules(optimizedWidgetCss + "html { scroll-padding-top: 64px; }"),
  );
  const widgetSelectors = new Set([...approved].map(key));
  for (const rule of compareCss(baseline, source).added) {
    if (
      (baselineSelectors.has(key(rule)) || widgetSelectors.has(key(rule))) &&
      !approved.has(rule)
    )
      result.push({
        location: "$.cssOverride",
        expected: "no unreviewed overrides of existing/approved selectors",
        actual: rule,
      });
  }
  return result;
}

export async function verifySite(options: {
  root: string;
  baseline: string;
  candidate: string;
  render: boolean;
  optimized?: boolean;
}): Promise<Report> {
  const { root, baseline, candidate, render, optimized = false } = options;
  if (render)
    throw new Error(
      "--render is no longer supported: Pages Router getStaticProps, _app providers and router context require the Next export renderer. Run npm run build, then npm run test:parity -- --optimized --baseline <dist>.",
    );
  const manifest = optimized
    ? JSON.parse(
        await fs.readFile(
          path.join(root, "site/generated/images.json"),
          "utf8",
        ),
      )
    : {};
  const baselineFiles = await filesIn(baseline);
  const beforeFiles = new Set(baselineFiles);
  const allRoutes = await renderedRoutes(root);
  const routeMap = new Map(allRoutes.map((route) => [route.html, route]));
  const candidateFiles = render ? [] : await filesIn(candidate);
  const afterFiles = new Set(candidateFiles);
  const htmlPaths = baselineFiles.filter((name) => name.endsWith(".html"));
  const report: Report = {
    mode: render ? "render" : "export",
    optimized,
    baseline,
    candidate,
    counts: {
      baselineHtml: htmlPaths.length,
      expectedReactPages: allRoutes.length,
      candidateHtml: candidateFiles.filter((name) => name.endsWith(".html"))
        .length,
      comparedReactPages: 0,
      exactStaticHtml: 0,
      comparedCss: 0,
      exactStaticAssets: 0,
      comparedRssFeeds: 0,
    },
    failures: [],
    existingBrokenUrls: [],
    newBrokenUrls: [],
    addedHtml: [],
    addedSitemapUrls: [],
    css: [],
  };
  for (const page of htmlPaths) {
    const route = routeMap.get(page);
    if (render && !route) continue;
    const before = await fs.readFile(path.join(baseline, page), "utf8");
    let after: string;
    try {
      after = await fs.readFile(path.join(candidate, page), "utf8");
    } catch (error) {
      report.failures.push({
        page,
        category: "missing-or-unrenderable-page",
        location: page,
        expected: "preserved page",
        actual: String(error),
      });
      continue;
    }
    const generatedNextPage =
      ["404.html", "404/index.html", "resume/index.html"].includes(page) &&
      before.includes('id="__NEXT_DATA__"') &&
      after.includes('id="__NEXT_DATA__"');
    if (route || generatedNextPage) {
      if (route) report.counts.comparedReactPages++;
      else
        report.counts.comparedGeneratedPages =
          (report.counts.comparedGeneratedPages || 0) + 1;
      try {
        if (optimized) {
          const data = exportedPageData(after);
          if (data.gsp) {
            if (!/^[a-zA-Z0-9_-]+$/.test(data.buildId))
              throw new Error("Invalid exported Next build ID");
            const pathname =
              page === "index.html"
                ? "index"
                : page.replace(/\/index\.html$|\.html$/, "");
            const jsonPath = `_next/data/${data.buildId}/${pathname}.json`;
            const routeData = JSON.parse(
              await fs.readFile(path.join(candidate, jsonPath), "utf8"),
            );
            for (const diff of differences(
              data.props,
              routeData,
              "$.pageData",
              200,
            ))
              report.failures.push({
                page,
                category: "route-data-consistency",
                ...diff,
              });
            report.counts.comparedPageData =
              (report.counts.comparedPageData || 0) + 1;
          }
          for (const [src, asset] of Object.entries(
            data.props?.pageProps?.pageData?.images || {},
          )) {
            for (const url of [
              src,
              ...asset.srcSet.map((variant) => variant.src),
            ]) {
              if (
                !url.startsWith("/") ||
                !targetExists(decodeURI(url).slice(1), afterFiles)
              )
                report.failures.push({
                  page,
                  category: "missing-image-manifest-target",
                  location: src,
                  expected: "emitted original/derivative image",
                  actual: url,
                });
            }
          }
        }
        for (const diff of optimized
          ? optimizedDifferences(before, after, {
              page,
              manifest,
              pageImages:
                exportedPageData(after).props?.pageProps?.pageData?.images ||
                {},
            })
          : differences(canonicalPage(before), canonicalPage(after)))
          report.failures.push({ page, category: "dom-metadata", ...diff });
      } catch (error) {
        report.failures.push({
          page,
          category: "invalid-document",
          location: page,
          expected: "parseable full document",
          actual: String(error),
        });
      }
    } else {
      report.counts.exactStaticHtml++;
      if (before !== after)
        report.failures.push({
          page,
          category: "static-html-bytes",
          location: page,
          expected: createHash("sha256").update(before).digest("hex"),
          actual: createHash("sha256").update(after).digest("hex"),
        });
    }
    if (!render) {
      const oldBroken = localReferences(before, page).filter(
        (reference) => !targetExists(reference.target, beforeFiles),
      );
      report.existingBrokenUrls.push(...oldBroken);
      const oldKeys = new Set(
        oldBroken.map(
          (reference) => `${reference.attribute}\0${reference.url}`,
        ),
      );
      report.newBrokenUrls.push(
        ...localReferences(after, page).filter(
          (reference) =>
            !targetExists(reference.target, afterFiles) &&
            !oldKeys.has(`${reference.attribute}\0${reference.url}`),
        ),
      );
    }
  }
  // Each explicit/generated React route must export, even if new this calendar year.
  if (!render)
    for (const route of allRoutes)
      if (!afterFiles.has(route.html))
        report.failures.push({
          page: route.html,
          category: "missing-react-route",
          location: route.html,
          expected: "exported HTML",
          actual: null,
        });
  if (!render) {
    report.addedHtml = candidateFiles.filter(
      (name) => name.endsWith(".html") && !beforeFiles.has(name),
    );
    for (const name of baselineFiles.filter((name) => name.endsWith(".css"))) {
      try {
        const before = await fs.readFile(path.join(baseline, name), "utf8"),
          after = await fs.readFile(path.join(candidate, name), "utf8");
        const diff = compareCss(before, after);
        report.css.push({ path: name, identical: before === after, ...diff });
        report.counts.comparedCss++;
        if (
          !["stylesheets/main.css", "stylesheets/design.css"].includes(name) &&
          before !== after
        )
          report.failures.push({
            page: name,
            category: "static-asset-bytes",
            location: name,
            expected: "unchanged archival stylesheet bytes",
            actual: "changed",
          });
        if (optimized && name === "stylesheets/main.css") {
          for (const diff of optimizedCssDifferences(after, before))
            report.failures.push({
              page: name,
              category: "optimized-css-contract",
              ...diff,
            });
        }
        if (diff.missing.length)
          report.failures.push({
            page: name,
            category: "removed-or-reordered-css",
            location: name,
            expected: diff.missing.slice(0, 20),
            actual: `${diff.missing.length} baseline selector/declaration rules missing or reordered`,
          });
      } catch (error) {
        report.failures.push({
          page: name,
          category: "missing-or-invalid-css",
          location: name,
          expected: "preserved CSS",
          actual: String(error),
        });
      }
    }
    for (const name of baselineFiles.filter(
      (name) =>
        !name.startsWith("_next/") &&
        !/\.(?:html|css|gz)$/.test(name) &&
        !(name.startsWith("javascripts/") && name.endsWith(".js")) &&
        !/\.js\.LICENSE\.txt$/.test(name) &&
        !["sitemap.xml", "rss.xml", "ja/rss.xml"].includes(name),
    )) {
      try {
        const before = await fs.readFile(path.join(baseline, name)),
          after = await fs.readFile(path.join(candidate, name));
        report.counts.exactStaticAssets++;
        if (!before.equals(after))
          report.failures.push({
            page: name,
            category: "static-asset-bytes",
            location: name,
            expected: createHash("sha256").update(before).digest("hex"),
            actual: createHash("sha256").update(after).digest("hex"),
          });
      } catch (error) {
        report.failures.push({
          page: name,
          category: "missing-static-asset",
          location: name,
          expected: "preserved asset",
          actual: String(error),
        });
      }
    }
    for (const name of ["rss.xml", "ja/rss.xml"].filter((name) =>
      beforeFiles.has(name),
    )) {
      try {
        const normalize = (xml: string) =>
          xml.replace(
            /<lastBuildDate>[^<]*<\/lastBuildDate>/g,
            "<lastBuildDate>BUILD_TIMESTAMP</lastBuildDate>",
          );
        const before = normalize(
            await fs.readFile(path.join(baseline, name), "utf8"),
          ),
          after = normalize(
            await fs.readFile(path.join(candidate, name), "utf8"),
          );
        report.counts.comparedRssFeeds++;
        if (before !== after)
          report.failures.push({
            page: name,
            category: "rss-content",
            location: name,
            expected: createHash("sha256").update(before).digest("hex"),
            actual: createHash("sha256").update(after).digest("hex"),
          });
      } catch (error) {
        report.failures.push({
          page: name,
          category: "missing-rss",
          location: name,
          expected: "preserved feed",
          actual: String(error),
        });
      }
    }
    if (beforeFiles.has("sitemap.xml")) {
      try {
        const entries = (xml: string) =>
          new Map(
            [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => [
              match[1].match(/<loc>(.*?)<\/loc>/)?.[1] || "",
              match[1],
            ]),
          );
        const before = entries(
            await fs.readFile(path.join(baseline, "sitemap.xml"), "utf8"),
          ),
          after = entries(
            await fs.readFile(path.join(candidate, "sitemap.xml"), "utf8"),
          );
        report.counts.baselineSitemapEntries = before.size;
        report.counts.candidateSitemapEntries = after.size;
        if (!before.size || !after.size)
          throw new Error("Sitemap has no parseable entries");
        for (const [url, entry] of before)
          if (after.get(url) !== entry)
            report.failures.push({
              page: "sitemap.xml",
              category: "sitemap-entry",
              location: url,
              expected: entry,
              actual: after.get(url),
            });
        report.addedSitemapUrls = [...after.keys()].filter(
          (url) => !before.has(url),
        );
      } catch (error) {
        report.failures.push({
          page: "sitemap.xml",
          category: "missing-or-invalid-sitemap",
          location: "sitemap.xml",
          expected: "preserved sitemap entries",
          actual: String(error),
        });
      }
    }
    for (const issue of report.newBrokenUrls)
      report.failures.push({
        page: issue.page,
        category: "new-broken-url",
        location: issue.attribute,
        expected: issue.url,
        actual: issue.target,
      });
  }
  return report;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const option = (name: string, fallback: string) => {
    const index = args.indexOf(name);
    return index < 0 ? fallback : args[index + 1];
  };
  if (args.includes("--help")) {
    console.log(
      "Usage: node --import tsx scripts/verify-site.ts --baseline <pre-migration-dist> [--candidate dist] [--optimized] [--json report.json] (deprecated --render: use npm run build)\nRun verifier unit tests without a baseline: node --import tsx --test tests/migration-verifier.test.mts",
    );
    return;
  }
  if (args.includes("--render"))
    throw new Error(
      "--render is no longer supported. Run npm run build, then npm run test:parity -- --optimized --baseline <dist>; the Next export renderer supplies getStaticProps and router/app context.",
    );
  const root = process.cwd();
  const baseline = path.resolve(
    option("--baseline", "../arcatdmz.github.io-baseline/dist"),
  );
  try {
    await fs.access(path.join(baseline, "index.html"));
  } catch {
    throw new Error(
      `Baseline build not found at ${baseline}. Pass --baseline <dist built from commit 4a40653>. This integration check needs that independent build; verifier unit tests do not.`,
    );
  }
  const report = await verifySite({
    root,
    baseline,
    candidate: path.resolve(option("--candidate", "dist")),
    render: args.includes("--render"),
    optimized: args.includes("--optimized"),
  });
  const output = option("--json", "");
  if (output)
    await fs.writeFile(output, JSON.stringify(report, null, 2) + "\n");
  console.log(
    JSON.stringify(
      {
        mode: report.mode,
        optimized: report.optimized,
        counts: report.counts,
        failures: report.failures.length,
        failingPages: new Set(report.failures.map((failure) => failure.page))
          .size,
        existingBrokenUrlOccurrences: report.existingBrokenUrls.length,
        newBrokenUrlOccurrences: report.newBrokenUrls.length,
        addedHtml: report.addedHtml,
        addedSitemapUrls: report.addedSitemapUrls,
        css: report.css.map(({ path, identical, missing, added }) => ({
          path,
          identical,
          removedRules: missing.length,
          addedRules: added.length,
        })),
      },
      null,
      2,
    ),
  );
  for (const failure of report.failures.slice(0, 100))
    console.error(JSON.stringify(failure));
  if (report.failures.length > 100)
    console.error(
      `Additional ${
        report.failures.length - 100
      } differences omitted. Use --json for the full report.`,
    );
  process.exitCode = report.failures.length ? 1 : 0;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(new URL(import.meta.url).pathname)
)
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
