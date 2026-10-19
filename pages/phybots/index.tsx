import Page from "@/components/phybots/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/phybots/", {
  projects: ["phybots"],
  publications: ["dis2012-kato-phybots"],
  publicationProjects: ["phybots"],
});
