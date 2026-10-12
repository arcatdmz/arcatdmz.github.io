import test from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { crc32 } from "node:zlib";
import sharp from "sharp";
import {
  ensureImageManifest,
  imageCacheKey,
  IMAGE_SETTINGS,
  prepareImageDerivatives,
} from "../scripts/image-derivatives";

const settings = {
  ...IMAGE_SETTINGS,
  iconWidths: [20, 40],
  thumbnailWidths: [40, 80, 400],
  contentWidths: [80, 160, 400],
};

async function fixture(t: { after: (fn: () => Promise<void>) => void }) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "site-images-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.mkdir(path.join(root, "src/images/thumbnails"), { recursive: true });
  const source = path.join(root, "src/images/thumbnails/test.png");
  await makeImage(source, 200, 100, 1);
  const build = (overrides = {}) =>
    prepareImageDerivatives({ root, settings, log: () => {}, ...overrides });
  return { root, source, build };
}

async function makeImage(
  filename: string,
  width: number,
  height: number,
  seed: number,
) {
  const pixels = Buffer.alloc(width * height * 3);
  for (let i = 0; i < pixels.length; i++) pixels[i] = (i * 17 + seed) % 256;
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await sharp(pixels, { raw: { width, height, channels: 3 } })
    .png({ compressionLevel: 0 })
    .toFile(filename);
}

test("cold build preserves originals; a warm build restores identical output with no transforms", async (t) => {
  const { root, source, build } = await fixture(t);
  const original = await fs.readFile(source);
  const cold = await build();
  assert.equal(cold.transformed, 3);
  assert.equal(cold.cacheHits, 0);
  const asset = cold.manifest["/images/thumbnails/test.png"];
  assert.equal(asset.width, 200);
  assert.equal(asset.height, 100);
  assert.deepEqual(
    asset.srcSet.map((variant) => variant.width),
    [40, 80, 200],
  );
  const snapshots = await Promise.all(
    asset.srcSet.map(async (variant) => {
      const filename = path.join(root, "public", variant.src);
      const bytes = await fs.readFile(filename);
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.format, "webp");
      assert.equal(metadata.width, variant.width);
      assert.equal(metadata.height, variant.height);
      return bytes;
    }),
  );
  await fs.rm(path.join(root, "public"), { recursive: true });
  const warm = await build();
  assert.equal(warm.transformed, 0);
  assert.equal(warm.cacheHits, 1);
  assert.deepEqual(warm.manifest, cold.manifest);
  await Promise.all(
    asset.srcSet.map(async (variant, i) => {
      assert.deepEqual(
        await fs.readFile(path.join(root, "public", variant.src)),
        snapshots[i],
      );
    }),
  );
  assert.deepEqual(await fs.readFile(source), original);
});

test("source bytes invalidate even when size and modification time are unchanged", async (t) => {
  const { root, source, build } = await fixture(t);
  const before = await fs.stat(source);
  const cold = await build();
  await makeImage(source, 200, 100, 2);
  await fs.utimes(source, before.atime, before.mtime);
  assert.equal((await fs.stat(source)).size, before.size);
  const changed = await build();
  assert.equal(changed.transformed, 3);
  assert.equal(changed.pruned, 1);
  assert.notDeepEqual(changed.manifest, cold.manifest);
  for (const variant of cold.manifest["/images/thumbnails/test.png"].srcSet)
    await assert.rejects(fs.access(path.join(root, "public", variant.src)));
});

test("new, renamed and deleted sources update the manifest and prune cached derivatives", async (t) => {
  const { root, source, build } = await fixture(t);
  await build();
  const added = path.join(root, "src/images/thumbnails/added.png");
  await makeImage(added, 180, 90, 5);
  const changed = await build();
  assert.equal(changed.cacheHits, 1);
  assert.equal(changed.transformed, 3);
  assert.equal(Object.keys(changed.manifest).length, 2);
  await fs.rename(source, path.join(path.dirname(source), "renamed.png"));
  const renamed = await build();
  assert.equal(renamed.transformed, 0);
  assert.equal(renamed.cacheHits, 2);
  assert.ok(renamed.manifest["/images/thumbnails/renamed.png"]);
  assert.equal(renamed.manifest["/images/thumbnails/test.png"], undefined);
  await fs.rm(added);
  const deleted = await build();
  assert.equal(deleted.transformed, 0);
  assert.equal(deleted.pruned, 1);
  assert.equal(deleted.manifest["/images/thumbnails/added.png"], undefined);
  assert.equal(
    (await fs.readdir(path.join(root, ".cache/site-images"))).length,
    1,
  );
  for (const variant of changed.manifest["/images/thumbnails/added.png"].srcSet)
    await assert.rejects(fs.access(path.join(root, "public", variant.src)));
});

test("transform settings and encoder versions are part of content identity", async (t) => {
  const { build } = await fixture(t);
  const cold = await build();
  const changed = await build({
    settings: { ...settings, graphicsQuality: 93 },
  });
  assert.equal(changed.transformed, 3);
  assert.equal(changed.pruned, 1);
  assert.notDeepEqual(changed.manifest, cold.manifest);
  const bytes = Buffer.from("same source bytes");
  const recipe = { width: 200, quality: 90 };
  assert.equal(
    imageCacheKey(bytes, recipe, { sharp: "1", vips: "2" }),
    imageCacheKey(bytes, recipe, { vips: "2", sharp: "1" }),
  );
  assert.notEqual(
    imageCacheKey(bytes, recipe, { sharp: "1", vips: "2" }),
    imageCacheKey(bytes, recipe, { sharp: "2", vips: "2" }),
  );
  assert.notEqual(
    imageCacheKey(bytes, recipe, { sharp: "1", vips: "2" }),
    imageCacheKey(bytes, recipe, { sharp: "1", vips: "3" }),
  );
});

test("missing or damaged cached output is safely regenerated", async (t) => {
  const { root, build } = await fixture(t);
  const cold = await build();
  const cacheRoot = path.join(root, ".cache/site-images");
  const [key] = await fs.readdir(cacheRoot);
  const cached = path.join(cacheRoot, key, "40.webp");
  const corrupt = await fs.readFile(cached);
  corrupt[corrupt.length - 1] ^= 1;
  await fs.writeFile(cached, corrupt);
  const repaired = await build();
  assert.equal(repaired.transformed, 3);
  assert.deepEqual(repaired.manifest, cold.manifest);
  await fs.rm(cached);
  assert.equal((await build()).transformed, 3);
});

test("intrinsic dimensions are auto-oriented and derivatives never upscale", async (t) => {
  const { root, build } = await fixture(t);
  const source = path.join(root, "src/oriented.jpg");
  await sharp({
    create: { width: 90, height: 50, channels: 3, background: "red" },
  })
    .withMetadata({ orientation: 6 })
    .jpeg({ quality: 100 })
    .toFile(source);
  const result = await build();
  const asset = result.manifest["/oriented.jpg"];
  assert.equal(asset.width, 50);
  assert.equal(asset.height, 90);
  for (const variant of asset.srcSet) {
    assert.ok(variant.width <= 50);
    assert.ok(variant.height <= 90);
  }
});

test("GIF, SVG and animated WebP stay original; small files keep their cheaper source", async (t) => {
  const { root, build } = await fixture(t);
  await fs.writeFile(
    path.join(root, "src/graphic.svg"),
    '<svg xmlns="http://www.w3.org/2000/svg"/>',
  );
  await fs.writeFile(path.join(root, "src/animated.gif"), "GIF89a");
  const animated = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQACgAAACwAAAAAAQABAAACAkQBACH5BAAKAAAALAAAAAABAAEAAAICTAEAOw==",
    "base64",
  );
  await sharp(animated, { animated: true })
    .webp()
    .toFile(path.join(root, "src/animated.webp"));
  const png = await fs.readFile(
    path.join(root, "src/images/thumbnails/test.png"),
  );
  const control = Buffer.alloc(20);
  control.writeUInt32BE(8, 0);
  control.write("acTL", 4);
  control.writeUInt32BE(2, 8);
  control.writeUInt32BE(crc32(control.subarray(4, 16)), 16);
  await fs.writeFile(
    path.join(root, "src/animated.png"),
    Buffer.concat([png.subarray(0, 33), control, png.subarray(33)]),
  );
  await sharp({
    create: { width: 1, height: 1, channels: 3, background: "white" },
  })
    .webp()
    .toFile(path.join(root, "src/tiny.webp"));
  const result = await build();
  assert.equal(result.manifest["/graphic.svg"], undefined);
  assert.equal(result.manifest["/animated.gif"], undefined);
  assert.equal(result.manifest["/animated.webp"], undefined);
  assert.equal(result.manifest["/animated.png"], undefined);
  assert.equal(result.manifest["/tiny.webp"].width, 1);
  const warm = await build();
  assert.equal(warm.transformed, 0);
});

test("ensure-data creates only an empty manifest and never overwrites real build data", async (t) => {
  const { root, build } = await fixture(t);
  await ensureImageManifest(root);
  const filename = path.join(root, "site/generated/images.json");
  assert.deepEqual(JSON.parse(await fs.readFile(filename, "utf8")), {});
  await assert.rejects(fs.access(path.join(root, ".cache/site-images")));
  await build();
  const contents = await fs.readFile(filename, "utf8");
  await ensureImageManifest(root);
  assert.equal(await fs.readFile(filename, "utf8"), contents);
});
