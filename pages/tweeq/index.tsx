import Page from "@/components/tweeq/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/tweeq/", {
          projects: ["tweeq"],
          publications: ["uist2025-hashimoto-tweeq"],
          publicationProjects: ["tweeq"],
        }),
      },
      "/tweeq/",
    ),
  };
}
