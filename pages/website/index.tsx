import Page from "@/components/website/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/website/", {
  projects: ["design", "website"],
  publicationProjects: ["website"],
});
