import Page from "@/components/songle-sync/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/songle-sync/", {
          projects: ["deployground", "songle-sync"],
          publications: ["mm2018-kato-songlesync"],
          publicationProjects: ["songle-sync"],
        }),
      },
      "/ja/songle-sync/",
    ),
  };
}
