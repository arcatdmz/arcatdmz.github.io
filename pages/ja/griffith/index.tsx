import Page from "@/components/griffith/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/griffith/", {
          projects: ["creativity-support-environments", "griffith"],
          publications: ["chi2024-kato-griffith"],
          publicationProjects: ["griffith"],
        }),
      },
      "/ja/griffith/",
    ),
  };
}
