import { Embed, type EmbedProps } from "react-fomantic-ui";

import { Children, isValidElement, useState, type HTMLAttributes } from "react";

import { SiteImage } from "./SiteImage";

function ResponsiveEmbedRoot({
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

/** Fomantic owns embed markup and activation. This adapter adds keyboard access
 * and the site's responsive placeholder images without loading the iframe early.
 */
export function DeferredEmbed({
  placeholderAlt,
  ...props
}: Omit<EmbedProps, "children"> & { placeholderAlt?: string }) {
  const [active, setActive] = useState(false);
  return (
    <Embed
      {...props}
      as={ResponsiveEmbedRoot}
      placeholderAlt={placeholderAlt}
      active={active}
      role={active ? undefined : "button"}
      tabIndex={active ? undefined : 0}
      aria-label={active ? undefined : "Open embedded content"}
      onClick={() => setActive(true)}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActive(true);
        }
      }}
      iframe={{
        title: "Embedded content",
        allow: "autoplay; fullscreen",
        allowFullScreen: true,
        frameBorder: 0,
      }}
    />
  );
}
