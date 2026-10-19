import Page from "@/components/intelliviewer/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/intelliviewer/", {
  projects: ["intelliviewer"],
  publicationProjects: ["intelliviewer"],
});
