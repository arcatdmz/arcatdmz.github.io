import Page from "@/components/homehack/realmote/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/homehack/realmote/", {
          projects: ["homehack"],
          publicationProjects: ["homehack"],
        }),
      },
      "/ja/homehack/realmote/",
    ),
  };
}
