import Page from "@/components/homehack/fungus-camera/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/homehack/fungus-camera/", {
          projects: ["homehack"],
          publicationProjects: ["homehack"],
        }),
      },
      "/homehack/fungus-camera/",
    ),
  };
}
