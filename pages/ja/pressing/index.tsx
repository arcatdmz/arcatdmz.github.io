import Page from "@/components/pressing/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/pressing/", {
          projects: ["pressing"],
          publicationProjects: ["pressing"],
        }),
      },
      "/ja/pressing/",
    ),
  };
}
