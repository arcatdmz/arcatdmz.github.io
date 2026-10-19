import Page from "@/components/website/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/website/", {
          projects: ["design", "website"],
          publicationProjects: ["website"],
        }),
      },
      "/ja/website/",
    ),
  };
}
