import Page from "@/components/openpool/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/openpool/", {
  projects: ["openpool"],
  publications: ["gcce2013-kato-openpool"],
  publicationProjects: ["openpool"],
  mediaProjects: ["openpool"],
});
