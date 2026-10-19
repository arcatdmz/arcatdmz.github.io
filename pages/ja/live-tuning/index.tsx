import Page from "@/components/live-tuning/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/live-tuning/", {
          projects: ["live-programming", "live-tuning"],
          publications: ["live2016-kato-livetuning"],
          publicationProjects: ["live-tuning"],
        }),
      },
      "/ja/live-tuning/",
    ),
  };
}
