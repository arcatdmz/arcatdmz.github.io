import Page from "@/components/homehack/rhythm-kaden/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(
  Page,
  "/homehack/rhythm-kaden/",
  {
    projects: ["homehack"],
    publicationProjects: ["homehack"],
  },
);
