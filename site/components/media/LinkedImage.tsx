import { Image, type ImageProps } from "react-fomantic-ui";

import { ImageAnchor } from "@/site/components/media/ImageAnchor";

/** Image's children branch consumes href without forwarding it to custom roots.
 * Keep routing and responsive child images while delegating styling to Image.
 */
export function LinkedImage({ href, ...props }: ImageProps) {
  return <Image {...props} as={ImageAnchor} imageHref={href} />;
}
