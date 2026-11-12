import Link from "next/link";
import { useContext, type AnchorHTMLAttributes } from "react";

import { SitePathContext } from "@/site/components/links/SitePathContext";
import { TagLink } from "@/site/components/links/TagLink";
import { TooltipLink } from "@/site/components/links/TooltipLink";
import { resolveReactHref } from "@/site/navigation";

/** Data-authored URLs can point to React pages, external sites, or archival assets. */
export function SiteLink({
  href,
  prefetch = false,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: boolean }) {
  const currentPath = useContext(SitePathContext);
  const route =
    props.download == null ? resolveReactHref(href, currentPath) : undefined;
  const link = route ? (
    // A page can contain hundreds of project/timeline links. Prefetch on intent
    // (Next's hover/touch behavior), rather than downloading every visible route.
    <Link href={route} prefetch={prefetch} {...props} />
  ) : (
    <a href={href} {...props} />
  );
  if (
    props.className?.split(/\s+/).includes("project") &&
    props.className?.split(/\s+/).includes("tag")
  ) {
    return (
      <TagLink
        trigger={link}
        lang={currentPath.startsWith("/ja/") ? "ja" : "en"}
      />
    );
  }
  if (
    props.className?.split(/\s+/).includes("with-popup") &&
    typeof props["data-content"] === "string"
  )
    return <TooltipLink trigger={link} />;
  return link;
}
