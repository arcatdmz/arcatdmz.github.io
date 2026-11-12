import { useEffect, useState } from "react";

import { SiteImage } from "@/site/components/media/SiteImage";
import { useWidgets } from "@/site/hooks/useWidgets";

export function Avatar({
  src,
  ...props
}: React.ComponentProps<typeof SiteImage> & { "data-alt-src"?: string }) {
  const widgets = useWidgets();
  const [alternate, setAlternate] = useState(false);
  useEffect(() => setAlternate(Math.random() > 0.5), []);
  return (
    <SiteImage
      {...props}
      src={alternate ? props["data-alt-src"] || src : src}
      loading="eager"
      role="button"
      tabIndex={0}
      onClick={(event) => widgets?.setModal({ trigger: event.currentTarget })}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
    />
  );
}
