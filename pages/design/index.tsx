import Page from "@/components/design/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      { pageData: getPageData("/design/", { projects: ["design"] }) },
      "/design/",
    ),
  };
}
