import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveReactHref,
  getDocumentMetadata,
  alternateLanguageHref,
} from "../site/navigation";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  SiteSidebar,
  SiteRightHeaderMenu,
  SiteFooter,
} from "../site/components/SiteLayout";
import type { PageContext } from "../site/components/SiteContext";
import { buildYear } from "../site/clock";

test("language switching requires a defined page identifier and an existing translation", () => {
  const context = { rootPath: "/", en: true };
  assert.equal(alternateLanguageHref(context), undefined);
  assert.equal(
    alternateLanguageHref({ ...context, me: "in-the-wild/" }),
    undefined,
  );
  assert.equal(alternateLanguageHref({ ...context, me: "" }), "/ja/");
  assert.equal(
    alternateLanguageHref({ ...context, me: "visionsketch/" }),
    "/ja/visionsketch/",
  );
  assert.equal(
    alternateLanguageHref({ ...context, en: false, me: "timeline/2010/" }),
    undefined,
  );
  assert.equal(
    alternateLanguageHref({ ...context, en: false, me: "timeline/2011/" }),
    "/timeline/2011/",
  );
});

test("header, sidebar and footer omit unavailable language controls and retain valid ones", () => {
  for (const component of [SiteSidebar, SiteRightHeaderMenu, SiteFooter]) {
    for (const page of [
      { en: true, me: undefined, visible: false },
      { en: true, me: "in-the-wild/", visible: false },
      { en: false, me: "timeline/2010/", visible: false },
      { en: true, me: "", visible: true },
      { en: false, me: "visionsketch/", visible: true },
    ]) {
      const context = {
        rootPath: "/",
        basePath: page.en ? "/" : "/ja/",
        products: [],
        projects: [],
        ...page,
      } as unknown as PageContext;
      const html = renderToStaticMarkup(createElement(component, { context }));
      assert.equal(
        html.includes('class="translate icon"'),
        page.visible,
        `${component.name}: ${page.me}`,
      );
      assert.doesNotMatch(html, /href="[^"]*undefined/);
    }
  }
});

test("only React routes use client navigation, including relative and data-authored URLs", () => {
  assert.equal(resolveReactHref("/projects/#research"), "/projects/#research");
  assert.equal(resolveReactHref("../projects", "/visionsketch/"), "/projects");
  assert.equal(
    resolveReactHref("https://junkato.jp/ja/design/"),
    "/ja/design/",
  );
  assert.equal(
    resolveReactHref(`/timeline/${buildYear}/`),
    `/timeline/${buildYear}/`,
  );
  for (const href of [
    "#abstract",
    "//example.com/projects",
    "https://blog.junkato.jp",
    "mailto:i@junkato.jp",
    "/resume.html",
    "/resume",
    "/resume/",
    "/visionsketch/fig1-overview.jpg",
    "/publications/paper.pdf",
    "/user-generated-variables.old/",
    "/unknown/",
    "/timeline/9000/",
  ]) {
    assert.equal(resolveReactHref(href), undefined, href);
  }
});

test("route metadata updates both language and section layout", () => {
  assert.deepEqual(getDocumentMetadata("/ja/design"), {
    language: "ja",
    bodyClass: "without-header-menu design",
  });
  assert.deepEqual(getDocumentMetadata("/publications"), {
    language: "en",
    bodyClass: "with-rail",
  });
  assert.deepEqual(getDocumentMetadata("/visionsketch"), {
    language: "en",
    bodyClass: undefined,
  });
  assert.equal(getDocumentMetadata("/ja/talks/as-a-code").language, "en");
});

test("the standalone résumé keeps outbound links as document navigation", () => {
  for (const path of ["/resume/", "/resume.html"]) {
    assert.equal(resolveReactHref("/", path), undefined);
    assert.equal(
      resolveReactHref("https://junkato.jp/projects/", path),
      undefined,
    );
  }
});
