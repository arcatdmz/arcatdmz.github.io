import Page from "@/components/textalive/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/textalive/", {
  projects: [
    "creativity-support-environments",
    "lyric-app-framework",
    "textalive",
  ],
  publications: ["chi2015-kato-textalive"],
  publicationProjects: ["textalive"],
});
