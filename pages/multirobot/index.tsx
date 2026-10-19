import Page from "@/components/multirobot/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/multirobot/", {
          projects: ["multirobot"],
          publications: ["chi2009-kato-multirobot"],
          publicationProjects: ["multirobot"],
        }),
      },
      "/multirobot/",
    ),
  };
}
