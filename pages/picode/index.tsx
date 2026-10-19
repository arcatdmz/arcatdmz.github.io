import Page from "@/components/picode/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/picode/", {
  projects: ["picode"],
  publications: ["chi2013-kato-picode"],
  publicationProjects: ["picode"],
});
