import Page from "@/components/f3js/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/f3js/", {
          projects: ["f3js"],
          publications: ["dis2017-kato-f3js"],
          publicationProjects: ["f3js"],
        }),
      },
      "/ja/f3js/",
    ),
  };
}
