import Page from "@/components/multirobot/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/multirobot/", {
  projects: ["multirobot"],
  publications: ["chi2009-kato-multirobot"],
  publicationProjects: ["multirobot"],
});
