import type { ComponentType } from "react";
import type { GetStaticPropsContext } from "next";
import type { Language, PageDataProps } from "./page-data";
import { getPageData, type PageReferences } from "./page-data.server";
import { withPageImages } from "./page-images.server";

/** Declare a bilingual static route once; generated entries select the locale.
 * Keep this factory in getStaticProps exports so Next strips it from browsers.
 */
export function localizedPageProps(
  Page: ComponentType<PageDataProps>,
  route: string,
  references: PageReferences = {},
  localeReferences: Partial<Record<Language, PageReferences>> = {},
) {
  const defaultLanguage = route.startsWith("/ja/") ? "ja" : "en";
  const baseRoute = route.replace(/^\/ja(?=\/)/, "");
  return function getStaticProps(
    context?: Pick<GetStaticPropsContext, "locale">,
  ) {
    const language = context?.locale || defaultLanguage;
    if (language !== "en" && language !== "ja")
      throw new Error(`Unsupported page language: ${language}`);
    const localizedRoute = language === "ja" ? `/ja${baseRoute}` : baseRoute;
    return {
      props: withPageImages(
        Page,
        {
          pageData: getPageData(
            localizedRoute,
            localeReferences[language] || references,
          ),
        },
        localizedRoute,
      ),
    };
  };
}
