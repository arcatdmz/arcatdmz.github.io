import Page from "@/components/dejavu/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/dejavu/", {
          projects: ["dejavu"],
          publications: ["uist2012-kato-dejavu"],
          publicationProjects: ["dejavu"],
        }),
      },
      "/dejavu/",
    ),
  };
}
