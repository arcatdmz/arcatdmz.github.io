import test from "node:test";
import assert from "node:assert/strict";
import { resolveReactHref, getDocumentMetadata } from "../site/navigation";
import { buildYear } from "../site/clock";

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
