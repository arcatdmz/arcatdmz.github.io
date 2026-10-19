import Page from "@/components/touchdevelop/index";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";

export default Page;

export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      {
        pageData: getPageData("/touchdevelop/", {
          projects: ["touchdevelop"],
          publications: ["pldi2013-kato-alive"],
          publicationProjects: ["touchdevelop"],
        }),
      },
      "/touchdevelop/",
    ),
  };
}
