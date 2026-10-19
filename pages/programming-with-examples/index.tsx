import Page from "@/components/programming-with-examples/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/programming-with-examples/", {
          projects: ["programming-with-examples"],
          publications: ["programming-with-examples"],
        }),
      },
      "/programming-with-examples/",
    ),
  };
}
