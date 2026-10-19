import Page from "@/components/homehack/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/homehack/", {
  projects: ["homehack"],
  publicationProjects: ["homehack"],
});
