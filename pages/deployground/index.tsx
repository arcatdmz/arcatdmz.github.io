import Page from "@/components/deployground/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/deployground/", {
          projects: ["deployground"],
          publications: ["vlhcc2018-kato-deployground"],
          publicationProjects: ["deployground"],
        }),
      },
      "/deployground/",
    ),
  };
}
