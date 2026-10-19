import Page from "@/components/programming-as-communication/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/ja/programming-as-communication/", {
          projects: [
            "live-tuning",
            "programming-as-communication",
            "user-generated-variables",
          ],
          publicationProjects: ["programming-as-communication"],
        }),
      },
      "/ja/programming-as-communication/",
    ),
  };
}
