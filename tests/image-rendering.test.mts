import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  SiteImage,
  SiteImagesContext,
  imagePath,
} from "../site/components/SiteImage";
import { SitePathContext } from "../site/components/SiteLink";
import { selectPageImages } from "../site/page-images.server";
import type { ImageManifest } from "../site/image-types";

const manifest: ImageManifest = {
  "/images/photo.jpg": {
    width: 1200,
    height: 800,
    srcSet: [
      { src: "/_images/photo-320.webp", width: 320, height: 213 },
      { src: "/_images/photo-640.webp", width: 640, height: 427 },
    ],
  },
  "/images/alternate.png": { width: 100, height: 100, srcSet: [] },
  "/project/local.png": { width: 800, height: 600, srcSet: [] },
};

test("image selection serializes only rendered local sources, including avatar alternate", () => {
  const selected = selectPageImages(
    '<img src="../images/photo.jpg" data-alt-src="/images/alternate.png"><img src="https://elsewhere.test/pic.png"><img src="local.png">',
    "/project/",
    manifest,
  );
  assert.deepEqual(Object.keys(selected), [
    "/images/alternate.png",
    "/images/photo.jpg",
    "/project/local.png",
  ]);
  assert.deepEqual(
    selectPageImages('<img src="/images/photo.jpg">', "/", manifest),
    { "/images/photo.jpg": manifest["/images/photo.jpg"] },
  );
});

test("responsive images reserve original proportions, defer by default, and retain full-resolution target", () => {
  const html = renderToStaticMarkup(
    createElement(
      SiteImagesContext.Provider,
      { value: manifest },
      createElement(SiteImage, {
        src: "/images/photo.jpg",
        sizes: "150px",
        alt: "Photo",
      }),
    ),
  );
  for (const expected of [
    'src="/_images/photo-640.webp"',
    'srcSet="/_images/photo-320.webp 320w, /_images/photo-640.webp 640w, /images/photo.jpg 1200w"',
    'sizes="150px"',
    'width="1200"',
    'height="800"',
    'loading="lazy"',
    'data-original-src="/images/photo.jpg"',
  ])
    assert.ok(html.includes(expected), expected);
});

test("eager above-fold images and explicit layout dimensions are preserved", () => {
  const html = renderToStaticMarkup(
    createElement(
      SiteImagesContext.Provider,
      { value: manifest },
      createElement(SiteImage, {
        src: "/images/photo.jpg",
        id: "avatar",
        loading: "eager",
        fetchPriority: "high",
        width: 96,
        height: 96,
      }),
    ),
  );
  assert.ok(html.includes('loading="eager"'));
  assert.ok(html.includes('fetchPriority="high"'));
  assert.ok(html.includes('sizes="96px"'));
  assert.ok(html.includes('width="96" height="96"'));
});

test("unknown, external, animated, and empty modal sources retain their original URL", () => {
  for (const src of [
    "/image.gif",
    "https://external.test/image.jpg",
    undefined,
  ]) {
    const html = renderToStaticMarkup(createElement(SiteImage, { src }));
    if (src) assert.ok(html.includes(`src="${src}"`));
    else assert.ok(!html.includes("src="));
    assert.ok(!html.includes("srcSet="));
  }
  assert.equal(imagePath("local.png", "/project/"), "/project/local.png");
  assert.equal(imagePath("https://external.test/image.jpg", "/"), undefined);
  const html = renderToStaticMarkup(
    createElement(
      SiteImagesContext.Provider,
      { value: manifest },
      createElement(
        SitePathContext.Provider,
        { value: "/project/" },
        createElement(SiteImage, { src: "local.png" }),
      ),
    ),
  );
  assert.ok(html.includes('width="800" height="600"'));
});
