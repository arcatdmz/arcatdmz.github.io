import Page from "@/components/homehack/fungus-camera/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(
  Page,
  "/homehack/fungus-camera/",
  {
    projects: ["homehack"],
    publicationProjects: ["homehack"],
  },
);
