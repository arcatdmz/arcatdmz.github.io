import routes from "./routes.json";
import website from "../website.json";
import { buildYear } from "./clock";

const reactRoutes = new Set([
  ...routes.flatMap(({ path, language }) => {
    if (path.includes("[year]")) {
      const firstYear = language === "ja" ? 2010 : 2011;
      return Array.from(
        { length: buildYear - firstYear + 1 },
        (_, index) =>
          `/${path.replace("[year].tsx", String(firstYear + index))}`,
      );
    }
    return [
      `/${path.replace(/(?:\/)?index\.tsx$/, "")}`.replace(/\/$/, "") || "/",
    ];
  }),
]);

/** Archive pages and downloads need a document load; only exported React routes use Link. */
export function resolveReactHref(
  href: string | undefined,
  currentPath = "/",
): string | undefined {
  // The résumé has an independent print stylesheet and uses document loads
  // in both directions, including links inside its trusted HTML data.
  if (/^\/resume(?:\.html|\/)?(?:[?#]|$)/.test(currentPath)) return undefined;
  if (!href || href.startsWith("#")) return undefined;
  let url: URL;
  try {
    url = new URL(href, `https://${website.domain}${currentPath}`);
  } catch {
    return undefined;
  }
  if (url.origin !== `https://${website.domain}`) return undefined;
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  if (!reactRoutes.has(pathname)) return undefined;
  return `${url.pathname}${url.search}${url.hash}`;
}

export function getDocumentMetadata(pathname: string) {
  const legacyEnglishRedirect =
    pathname === "/ja/talks/as-a-code" ||
    pathname === "/ja/talks/people-are-programmers";
  const section = pathname.replace(/^\/ja(?=\/|$)/, "").split("/")[1];
  return {
    language:
      !legacyEnglishRedirect &&
      (pathname.startsWith("/ja/") || pathname === "/ja")
        ? "ja"
        : "en",
    bodyClass: ["projects", "publications", "timeline"].includes(section)
      ? "with-rail"
      : section === "design"
        ? "without-header-menu design"
        : undefined,
  };
}
