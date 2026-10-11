import Link from "next/link";
import { createContext, useContext, type AnchorHTMLAttributes } from "react";
import { resolveReactHref } from "../navigation";

export const SitePathContext = createContext("/");

/** Data-authored URLs can point to React pages, external sites, or archival assets. */
export function SiteLink({
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const currentPath = useContext(SitePathContext);
  const route =
    props.download == null ? resolveReactHref(href, currentPath) : undefined;
  return route ? (
    <Link href={route} {...props} />
  ) : (
    <a href={href} {...props} />
  );
}
