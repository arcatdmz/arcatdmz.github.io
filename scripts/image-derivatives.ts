/** Content-addressed, incremental image preparation for the static export. */
import { createHash } from "node:crypto";
import * as fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { ImageAsset, ImageManifest } from "../site/image-types";

export const IMAGE_CACHE_VERSION = 1;
export const IMAGE_SETTINGS = {
  iconWidths: [32, 64, 96, 160, 320],
  thumbnailWidths: [160, 320, 480, 640, 960],
  contentWidths: [320, 640, 960, 1280, 1920],
  quality: 84,
  graphicsQuality: 90,
  alphaQuality: 100,
  effort: 4,
} as const;

export interface ImageSettings {
  iconWidths: readonly number[];
  thumbnailWidths: readonly number[];
  contentWidths: readonly number[];
  quality: number;
  graphicsQuality: number;
  alphaQuality: number;
  effort: number;
}

interface Variant {
  width: number;
  height: number;
  bytes: number;
  sha256: string;
}

interface CachedImage {
  width: number;
  height: number;
  animated: boolean;
  variants: Variant[];
}

interface Options {
  root?: string;
  settings?: ImageSettings;
  log?: (message: string) => void;
}

const digest = (bytes: Buffer | string): string =>
  createHash("sha256").update(bytes).digest("hex");

/** Includes every encoder version, not just sharp, so libvips/WebP upgrades miss. */
export function imageCacheKey(
  bytes: Buffer,
  recipe: unknown,
  versions: Record<string, string> = sharp.versions,
): string {
  return digest(
    Buffer.concat([
      bytes,
      Buffer.from(
        `\0${JSON.stringify({
          version: IMAGE_CACHE_VERSION,
          recipe,
          versions: Object.fromEntries(
            Object.entries(versions).sort(([a], [b]) => a.localeCompare(b)),
          ),
        })}`,
      ),
    ]),
  );
}

async function filesIn(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const filename = path.join(directory, entry.name);
      return entry.isDirectory()
        ? filesIn(filename)
        : entry.isFile()
          ? [filename]
          : [];
    }),
  );
  return nested.flat().sort();
}

function isAnimatedPng(bytes: Buffer): boolean {
  if (!bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex")))
    return false;
  // Some libvips PNG loaders expose only the first APNG frame in metadata.
  // The animation control chunk must precede IDAT; preserve it without encoding.
  for (let offset = 8; offset + 12 <= bytes.length; ) {
    const length = bytes.readUInt32BE(offset);
    if (offset + length + 12 > bytes.length) return false;
    const type = bytes.toString("ascii", offset + 4, offset + 8);
    if (type === "acTL") return true;
    if (type === "IDAT") return false;
    offset += length + 12;
  }
  return false;
}

function recipeFor(relative: string, settings: ImageSettings) {
  const widths = relative.startsWith("images/icons/")
    ? settings.iconWidths
    : relative.startsWith("images/thumbnails/")
      ? settings.thumbnailWidths
      : settings.contentWidths;
  return {
    widths: [...new Set(widths)].sort((a, b) => a - b),
    format: "webp",
    quality: /\.png$/i.test(relative)
      ? settings.graphicsQuality
      : settings.quality,
    alphaQuality: settings.alphaQuality,
    effort: settings.effort,
    autoOrient: true,
    withoutEnlargement: true,
    kernel: "lanczos3",
  };
}

async function readCache(directory: string): Promise<CachedImage | undefined> {
  try {
    const entry: CachedImage = JSON.parse(
      await fs.readFile(path.join(directory, "metadata.json"), "utf8"),
    );
    if (
      !Number.isSafeInteger(entry.width) ||
      !Number.isSafeInteger(entry.height) ||
      entry.width <= 0 ||
      entry.height <= 0 ||
      typeof entry.animated !== "boolean" ||
      !Array.isArray(entry.variants)
    )
      return;
    for (const variant of entry.variants) {
      if (
        !Number.isSafeInteger(variant.width) ||
        !Number.isSafeInteger(variant.height) ||
        variant.width <= 0 ||
        variant.height <= 0 ||
        variant.width > entry.width
      )
        return;
      const bytes = await fs.readFile(
        path.join(directory, `${variant.width}.webp`),
      );
      if (bytes.length !== variant.bytes || digest(bytes) !== variant.sha256)
        return;
    }
    return entry;
  } catch {
    // A missing, interrupted, or corrupted cache is only an optimization miss.
    return;
  }
}

/** Type checking needs a typed import, never a full image/vendor asset build. */
export async function ensureImageManifest(root = process.cwd()): Promise<void> {
  const destination = path.join(root, "site/generated/images.json");
  await fs.mkdir(path.dirname(destination), { recursive: true });
  try {
    await fs.writeFile(destination, "{}\n", { flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }
}

export async function prepareImageDerivatives({
  root = process.cwd(),
  settings = IMAGE_SETTINGS,
  log = console.log,
}: Options = {}): Promise<{
  manifest: ImageManifest;
  images: number;
  transformed: number;
  cacheHits: number;
  pruned: number;
}> {
  const sourceDirectory = path.join(root, "src");
  const cacheDirectory = path.join(root, ".cache/site-images");
  const outputDirectory = path.join(root, "public/_images");
  const manifestPath = path.join(root, "site/generated/images.json");
  await fs.mkdir(cacheDirectory, { recursive: true });
  // Only this generated namespace is removed; original URLs are never rewritten.
  await fs.rm(outputDirectory, { recursive: true, force: true });
  await fs.mkdir(outputDirectory, { recursive: true });
  const activeKeys = new Set<string>();
  const manifest: ImageManifest = {};
  let transformed = 0;
  let cacheHits = 0;
  let images = 0;
  for (const filename of await filesIn(sourceDirectory)) {
    if (!/\.(?:jpe?g|png|webp)$/i.test(filename)) continue;
    const relative = path
      .relative(sourceDirectory, filename)
      .split(path.sep)
      .join("/");
    const bytes = await fs.readFile(filename);
    const recipe = recipeFor(relative, settings);
    const key = imageCacheKey(bytes, recipe);
    const cache = path.join(cacheDirectory, key);
    activeKeys.add(key);
    let entry = await readCache(cache);
    if (entry) {
      cacheHits++;
    } else {
      const metadata = await sharp(bytes).metadata();
      const swapped = [5, 6, 7, 8].includes(metadata.orientation || 1);
      const width = swapped ? metadata.height : metadata.width;
      const height = swapped ? metadata.width : metadata.height;
      if (!width || !height)
        throw new Error(`Image has no dimensions: ${relative}`);
      entry = {
        width,
        height,
        animated: (metadata.pages || 1) > 1 || isAnimatedPng(bytes),
        variants: [],
      };
      await fs.rm(cache, { recursive: true, force: true });
      await fs.mkdir(cache, { recursive: true });
      if (!entry.animated) {
        const widths = [
          ...new Set(recipe.widths.map((size) => Math.min(size, width))),
        ];
        for (const size of widths) {
          const result = await sharp(bytes)
            .rotate()
            .resize({
              width: size,
              withoutEnlargement: true,
              kernel: "lanczos3",
            })
            .webp({
              quality: recipe.quality,
              alphaQuality: recipe.alphaQuality,
              effort: recipe.effort,
            })
            .toBuffer({ resolveWithObject: true });
          transformed++;
          // Avoid making a tiny already-efficient original more expensive.
          if (result.data.length >= bytes.length) continue;
          await fs.writeFile(
            path.join(cache, `${result.info.width}.webp`),
            result.data,
          );
          entry.variants.push({
            width: result.info.width,
            height: result.info.height,
            bytes: result.data.length,
            sha256: digest(result.data),
          });
        }
      }
      // Write the completion marker last. A killed build regenerates this entry.
      await fs.writeFile(
        path.join(cache, "metadata.json"),
        JSON.stringify(entry),
      );
    }
    if (entry.animated) continue;
    const image: ImageAsset = {
      width: entry.width,
      height: entry.height,
      srcSet: [],
    };
    for (const variant of entry.variants) {
      const output = `${key}-${variant.width}.webp`;
      await fs.copyFile(
        path.join(cache, `${variant.width}.webp`),
        path.join(outputDirectory, output),
      );
      image.srcSet.push({
        src: `/_images/${output}`,
        width: variant.width,
        height: variant.height,
      });
    }
    manifest[`/${relative}`] = image;
    images++;
  }
  // Keep only the current source/recipe/version set: deleted and replaced inputs
  // cannot grow local caches indefinitely or leak obsolete generated output.
  let pruned = 0;
  for (const entry of await fs.readdir(cacheDirectory, {
    withFileTypes: true,
  })) {
    if (
      entry.isDirectory() &&
      /^[a-f0-9]{64}$/.test(entry.name) &&
      !activeKeys.has(entry.name)
    ) {
      await fs.rm(path.join(cacheDirectory, entry.name), {
        recursive: true,
        force: true,
      });
      pruned++;
    }
  }
  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest)}\n`);
  log(
    `Images: ${images} inputs, ${transformed} transforms, ${cacheHits} cache hits, ${pruned} obsolete entries pruned.`,
  );
  return { manifest, images, transformed, cacheHits, pruned };
}
