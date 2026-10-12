/** Serializable per-page image data. The complete manifest stays build-side. */
export interface ImageAsset {
  width: number;
  height: number;
  srcSet: { src: string; width: number; height: number }[];
}

export type ImageManifest = Record<string, ImageAsset>;
