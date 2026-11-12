import type { AnchorHTMLAttributes } from "react";

import { SiteLink } from "@/site/components/links/SiteLink";

export function ImageAnchor({
  imageHref,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { imageHref?: string }) {
  return <SiteLink {...props} href={imageHref} />;
}
