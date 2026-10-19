import Page from "@/components/homehack/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/homehack/", {
          projects: ["homehack"],
          publicationProjects: ["homehack"],
        }),
      },
      "/homehack/",
    ),
  };
}
