import { createContext } from "react";

import type { ImageManifest } from "@/site/image-types";

/** Only the images used by this route are serialized in its static page props. */
export const SiteImagesContext = createContext<ImageManifest>({});
