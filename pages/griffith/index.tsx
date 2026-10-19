import Page from "@/components/griffith/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/griffith/", {
  projects: ["creativity-support-environments", "griffith"],
  publications: ["chi2024-kato-griffith"],
  publicationProjects: ["griffith"],
});
