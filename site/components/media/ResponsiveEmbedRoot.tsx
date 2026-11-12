import { Children, isValidElement, type HTMLAttributes } from "react";

import { SiteImage } from "@/site/components/media/SiteImage";

export function ResponsiveEmbedRoot({
  children,
  placeholderAlt,
  ...props
}: HTMLAttributes<HTMLDivElement> & { placeholderAlt?: string }) {
  return (
    <div {...props}>
      {Children.map(children, (child) =>
        isValidElement<HTMLAttributes<HTMLImageElement>>(child) &&
        child.type === "img" ? (
          <SiteImage {...child.props} alt={placeholderAlt || ""} />
        ) : (
          child
        ),
      )}
    </div>
  );
}
