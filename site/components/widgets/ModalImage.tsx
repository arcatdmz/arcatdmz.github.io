import { type AnchorHTMLAttributes } from "react";

import { LinkedImage } from "@/site/components/media/LinkedImage";
import { useWidgets } from "@/site/hooks/useWidgets";

export function ModalImage({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const widgets = useWidgets();
  return (
    <LinkedImage
      {...props}
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.preventDefault();
        const image = event.currentTarget.querySelector("img");
        widgets?.setModal({
          trigger: event.currentTarget,
          src: image?.getAttribute("data-original-src") || image?.src,
          title: event.currentTarget
            .closest(".ui.segment")
            ?.querySelector("h3.ui.header")?.innerHTML,
        });
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
    >
      {children}
    </LinkedImage>
  );
}
