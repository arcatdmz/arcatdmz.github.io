import Page from "@/components/openpool/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/openpool/", {
          projects: ["openpool"],
          publications: ["gcce2013-kato-openpool"],
          publicationProjects: ["openpool"],
          mediaProjects: ["openpool"],
        }),
      },
      "/ja/openpool/",
    ),
  };
}
