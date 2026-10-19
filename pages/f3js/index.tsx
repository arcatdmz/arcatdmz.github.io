import Page from "@/components/f3js/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/f3js/", {
  projects: ["f3js"],
  publications: ["dis2017-kato-f3js"],
  publicationProjects: ["f3js"],
});
