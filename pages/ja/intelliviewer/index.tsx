import Page from "@/components/intelliviewer/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/intelliviewer/", {
          projects: ["intelliviewer"],
          publicationProjects: ["intelliviewer"],
        }),
      },
      "/ja/intelliviewer/",
    ),
  };
}
