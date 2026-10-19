import Page from "@/components/dejavu/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/dejavu/", {
  projects: ["dejavu"],
  publications: ["uist2012-kato-dejavu"],
  publicationProjects: ["dejavu"],
});
