import { Image, type ImageProps } from "react-fomantic-ui";

import type { AnchorHTMLAttributes } from "react";

import { SiteLink } from "./SiteLink";

function ImageAnchor({
  imageHref,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { imageHref?: string }) {
  return <SiteLink {...props} href={imageHref} />;
}

/** Image's children branch consumes href without forwarding it to custom roots.
 * Keep routing and responsive child images while delegating styling to Image.
 */
export function LinkedImage({ href, ...props }: ImageProps) {
  return <Image {...props} as={ImageAnchor} imageHref={href} />;
}
