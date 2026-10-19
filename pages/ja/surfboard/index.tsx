import Page from "@/components/surfboard/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/surfboard/", {
          projects: ["surfboard"],
          publications: ["uist2010-kato-surfboard"],
          publicationProjects: ["surfboard"],
        }),
      },
      "/ja/surfboard/",
    ),
  };
}
