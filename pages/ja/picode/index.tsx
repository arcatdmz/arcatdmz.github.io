import Page from "@/components/picode/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/picode/", {
          projects: ["picode"],
          publications: ["chi2013-kato-picode"],
          publicationProjects: ["picode"],
        }),
      },
      "/ja/picode/",
    ),
  };
}
