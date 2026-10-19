import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import type { NextRouter } from "next/router";
import { LocalizedContent } from "../site/components/LocalizedContent";
import {
  PageContextProvider,
  type PageContext,
} from "../site/components/SiteContext";
import type { Language } from "../site/types";

function renderBlock(
  lang: Language,
  overrides: { en?: ReactNode; ja?: ReactNode } = {},
  fallback: ReactNode = "Default content",
) {
  return renderToStaticMarkup(
    createElement(
      PageContextProvider,
      // This component only reads lang; page integration is exercised below.
      { value: { lang } as PageContext },
      createElement(LocalizedContent, overrides, fallback),
    ),
  );
}

test("rich blocks inherit their default in either language and use explicit overrides", () => {
  for (const lang of ["en", "ja"] as const) {
    assert.equal(renderBlock(lang), "Default content");
  }
  assert.equal(renderBlock("ja", { ja: "日本語" }), "日本語");
  assert.equal(renderBlock("en", { ja: "日本語" }), "Default content");
  assert.equal(renderBlock("en", { en: "English" }, "日本語"), "English");
  assert.equal(renderBlock("ja", { en: "English" }, "日本語"), "日本語");
  assert.equal(renderBlock("ja", { ja: null }), "");
  assert.equal(renderBlock("ja", { ja: false }), "");
  assert.equal(renderBlock("ja", { ja: undefined }), "Default content");
});

test("each consolidated route pair exports the same content component", async () => {
  const routes = JSON.parse(
    readFileSync(
      new URL("../site/generated/routes.json", import.meta.url),
      "utf8",
    ),
  ) as { path: string; source: string; language: Language }[];
  let pairs = 0;
  for (const route of routes) {
    if (route.language !== "en") continue;
    if (!existsSync(new URL(`../components/${route.path}`, import.meta.url)))
      continue;
    const english = await import(`../pages/${route.source}`);
    const ja = routes.find((entry) => entry.path === `ja/${route.path}`)!;
    const japanese = await import(`../pages/${ja.source}`);
    assert.equal(english.default, japanese.default, route.path);
    pairs++;
  }
  assert.equal(pairs, 40);
});

async function renderPage(route: string) {
  const source = existsSync(
    new URL(`../pages/${route}index.tsx`, import.meta.url),
  )
    ? `../pages/${route}index.tsx`
    : `../pages/${route}index.localized.tsx`;
  const page = await import(source);
  const { props } = page.getStaticProps();
  const pathname = `/${route}`;
  const router = {
    route: pathname,
    pathname,
    asPath: pathname,
    query: {},
    basePath: "",
    isFallback: false,
    isReady: true,
    events: { on() {}, off() {}, emit() {} },
  } as unknown as NextRouter;
  return renderToStaticMarkup(
    createElement(
      RouterContext.Provider,
      { value: router },
      createElement(page.default, props),
    ),
  );
}

test("DeployGround inherits English sections while localizing headings and navigation", async () => {
  const english = await renderPage("deployground/");
  const japanese = await renderPage("ja/deployground/");
  const relatedWork = (html: string) =>
    html.match(/<section id="related-work">(.*?)<\/section>/s)?.[1];
  assert.ok(relatedWork(english));
  assert.equal(relatedWork(english), relatedWork(japanese));
  assert.match(english, />Abstract</);
  assert.match(japanese, />概要</);
  assert.match(japanese, /href="\/ja\/projects\/?"/);
});

test("Griffith overrides the abstract without replacing the shared presentation", async () => {
  const english = await renderPage("griffith/");
  const japanese = await renderPage("ja/griffith/");
  assert.match(english, /serving as a communication medium/);
  assert.doesNotMatch(japanese, /serving as a communication medium/);
  assert.match(japanese, /アニメ制作において設計図とも言うべき/);
  for (const html of [english, japanese]) {
    assert.match(html, /id="presentations"/);
    assert.match(html, /griffith/i);
  }
});

test("Fungus Camera inherits Japanese prose and removes the private embed in both locales", async () => {
  for (const route of [
    "homehack/fungus-camera/",
    "ja/homehack/fungus-camera/",
  ]) {
    const html = await renderPage(route);
    assert.match(html, /なめこの生育を観察する定点カメラ/);
    assert.doesNotMatch(html, /6etDXqnFnSM/);
    assert.match(html, /youtube\.com\/embed\/rFeTAwY_d_Y/);
    assert.match(html, /href="\/homehack\/fungus-camera-image\.jpg"/);
  }
});

test("OpenPool's Japanese award label does not leak into the English page", async () => {
  assert.doesNotMatch(await renderPage("openpool/"), /グッドデザイン賞/);
  assert.match(await renderPage("ja/openpool/"), /グッドデザイン賞/);
});
