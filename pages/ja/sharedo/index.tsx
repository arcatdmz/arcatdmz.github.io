import Page from "@/components/sharedo/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/sharedo/", {
          projects: ["sharedo"],
          publications: ["hai2014-kato-sharedo"],
          publicationProjects: ["sharedo"],
        }),
      },
      "/ja/sharedo/",
    ),
  };
}
