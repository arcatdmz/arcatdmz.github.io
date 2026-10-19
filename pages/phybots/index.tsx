import Page from "@/components/phybots/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/phybots/", {
          projects: ["phybots"],
          publications: ["dis2012-kato-phybots"],
          publicationProjects: ["phybots"],
        }),
      },
      "/phybots/",
    ),
  };
}
