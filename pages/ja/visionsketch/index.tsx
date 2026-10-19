import Page from "@/components/visionsketch/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/visionsketch/", {
          projects: ["visionsketch"],
          publications: ["gi2014-kato-visionsketch"],
          publicationProjects: ["visionsketch"],
        }),
      },
      "/ja/visionsketch/",
    ),
  };
}
