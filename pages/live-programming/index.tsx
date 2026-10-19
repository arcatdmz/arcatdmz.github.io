import Page from "@/components/live-programming/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/live-programming/", {
  projects: ["live-programming"],
  publicationProjects: ["live-programming"],
});
