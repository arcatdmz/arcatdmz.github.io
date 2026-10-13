import { createContext, useContext, type ImgHTMLAttributes } from "react";
import type { ImageManifest } from "../image-types";
import { SitePathContext } from "./SiteLink";

/** Only the images used by this route are serialized in its static page props. */
export const SiteImagesContext = createContext<ImageManifest>({});

export function imagePath(
  src: string | Blob | undefined,
  route = "/",
): string | undefined {
  if (typeof src !== "string" || !src || /^(?:data:|blob:)/i.test(src))
    return undefined;
  try {
    const url = new URL(src, `https://junkato.jp${route}`);
    return url.origin === "https://junkato.jp"
      ? decodeURI(url.pathname)
      : undefined;
  } catch {
    return undefined;
  }
}

/** Preserve image markup/CSS and original download URLs; only display bytes change. */
export function SiteImage({
  src,
  srcSet,
  sizes,
  width,
  height,
  displayHeight,
  loading = "lazy",
  decoding = "async",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { displayHeight?: number }) {
  const images = useContext(SiteImagesContext);
  const route = useContext(SitePathContext);
  const key = imagePath(src, route);
  const asset = key ? images[key] : undefined;
  const candidates = asset?.srcSet.length ? [...asset.srcSet] : [];
  // Efficient originals can be smaller than a high-resolution WebP. Keep their
  // intrinsic-width candidate so wider/retina displays never upscale a tiny
  // surviving derivative. Full-resolution download links remain unchanged.
  if (
    asset &&
    candidates.length &&
    typeof src === "string" &&
    candidates.at(-1)!.width < asset.width
  ) {
    candidates.push({ src, width: asset.width, height: asset.height });
  }
  // Sidebar avatars and large Design icons use the same original; their sizes
  // are specified at the call site where the actual layout is known.
  const displaySizes =
    sizes ||
    (displayHeight && asset
      ? `${Math.ceil((displayHeight * asset.width) / asset.height)}px`
      : undefined) ||
    (props.className?.includes("avatar")
      ? "32px"
      : props.id === "avatar"
        ? "96px"
        : "(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 933px, 1127px");
  const fallback =
    candidates.find((candidate) => candidate.width >= 640) || candidates.at(-1);
  const numericDimension = (value: number | string | undefined) =>
    typeof value === "number"
      ? value
      : typeof value === "string" && /^\d+(?:\.\d+)?$/.test(value)
        ? Number(value)
        : undefined;
  const explicitWidth = numericDimension(width);
  const explicitHeight = numericDimension(height);
  const intrinsicWidth =
    width ??
    (asset && explicitHeight !== undefined
      ? Math.round((explicitHeight * asset.width) / asset.height)
      : asset?.width);
  const intrinsicHeight =
    height ??
    (asset && explicitWidth !== undefined
      ? Math.round((explicitWidth * asset.height) / asset.width)
      : asset?.height);
  return (
    <img
      {...props}
      src={fallback?.src || src}
      srcSet={
        srcSet ||
        (candidates.length
          ? candidates
              .map((candidate) => `${candidate.src} ${candidate.width}w`)
              .join(", ")
          : undefined)
      }
      sizes={srcSet || candidates.length ? displaySizes : sizes}
      width={intrinsicWidth}
      height={intrinsicHeight}
      data-site-responsive={asset && height === undefined ? "" : undefined}
      loading={loading}
      decoding={decoding}
      data-original-src={asset ? src : undefined}
    />
  );
}
