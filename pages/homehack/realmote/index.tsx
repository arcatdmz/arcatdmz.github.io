import Page from "@/components/homehack/realmote/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/homehack/realmote/", {
  projects: ["homehack"],
  publicationProjects: ["homehack"],
});
