import Page from "@/components/live-programming/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/live-programming/", {
          projects: ["live-programming"],
          publicationProjects: ["live-programming"],
        }),
      },
      "/live-programming/",
    ),
  };
}
