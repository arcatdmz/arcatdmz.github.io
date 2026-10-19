import Page from "@/components/lyric-app-framework/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/lyric-app-framework/", {
          projects: [
            "creativity-support-environments",
            "lyric-app-framework",
            "textalive",
          ],
          publications: [
            "chi2023-kato-lyric-app-framework",
            "interaction2024-kato-lyric-app-framework",
            "sigmus138-kato-lyric-app-framework",
          ],
          publicationProjects: ["lyric-app-framework"],
        }),
      },
      "/ja/lyric-app-framework/",
    ),
  };
}
