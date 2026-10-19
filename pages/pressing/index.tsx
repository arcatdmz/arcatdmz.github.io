import Page from "@/components/pressing/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/pressing/", {
  projects: ["pressing"],
  publicationProjects: ["pressing"],
});
