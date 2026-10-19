import Page from "@/components/textalive/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/textalive/", {
          projects: [
            "creativity-support-environments",
            "lyric-app-framework",
            "textalive",
          ],
          publications: ["chi2015-kato-textalive"],
          publicationProjects: ["textalive"],
        }),
      },
      "/ja/textalive/",
    ),
  };
}
