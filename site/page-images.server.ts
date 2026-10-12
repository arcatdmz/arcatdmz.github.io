/** Build-only: discover the exact image set in a route, never ship a global map. */
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import type { NextRouter } from "next/router";
import { parse, type DefaultTreeAdapterMap } from "parse5";
import type { ImageManifest } from "./image-types";
import { imagePath } from "./components/SiteImage";

let cached:
  | { filename: string; mtime: number; images: ImageManifest }
  | undefined;

function readManifest(): ImageManifest {
  const filename = path.join(process.cwd(), "site/generated/images.json");
  const mtime = statSync(filename).mtimeMs;
  if (!cached || cached.filename !== filename || cached.mtime !== mtime) {
    cached = {
      filename,
      mtime,
      images: JSON.parse(readFileSync(filename, "utf8")) as ImageManifest,
    };
  }
  return cached.images;
}

export function selectPageImages(
  html: string,
  route: string,
  manifest: ImageManifest,
): ImageManifest {
  const used = new Set<string>();
  const visit = (node: DefaultTreeAdapterMap["node"]): void => {
    if ("tagName" in node && node.tagName === "img") {
      for (const attr of node.attrs) {
        if (attr.name !== "src" && attr.name !== "data-alt-src") continue;
        const key = imagePath(attr.value, route);
        if (key && manifest[key]) used.add(key);
      }
    }
    if ("childNodes" in node) node.childNodes.forEach(visit);
  };
  visit(parse(html));
  return Object.fromEntries(
    [...used].sort().map((key) => [key, manifest[key]]),
  );
}

/** The first render contains originals; the actual export/hydration gets derivatives. */
export function withPageImages<
  P extends { pageData: { images?: ImageManifest; route?: string } },
>(Page: ComponentType<P>, props: P, route = props.pageData.route || "/"): P {
  // Widget hooks can read the route while rendering. No effects, navigation,
  // browser globals, or event handlers run during this build-only pass.
  const router: NextRouter = {
    route,
    pathname: route,
    asPath: route,
    query: {},
    basePath: "",
    isFallback: false,
    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
    push: async () => false,
    replace: async () => false,
    reload() {},
    back() {},
    forward() {},
    beforePopState() {},
    prefetch: async () => {},
    events: { on() {}, off() {}, emit() {} },
  };
  const html = renderToStaticMarkup(
    createElement(
      RouterContext.Provider,
      { value: router },
      createElement(Page, props),
    ),
  );
  return {
    ...props,
    pageData: {
      ...props.pageData,
      images: selectPageImages(html, route, readManifest()),
    },
  };
}
