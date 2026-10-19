import Page from "@/components/creativity-support-environments/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/creativity-support-environments/", {
          projects: [
            "creativity-support-environments",
            "griffith",
            "lyric-app-framework",
            "textalive",
          ],
          publications: ["chi2023-kato-sigccc"],
          publicationProjects: ["creativity-support-environments"],
        }),
      },
      "/creativity-support-environments/",
    ),
  };
}
