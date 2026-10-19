import Page from "@/components/creativity-support-environments/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(
  Page,
  "/creativity-support-environments/",
  {
    projects: [
      "creativity-support-environments",
      "griffith",
      "lyric-app-framework",
      "textalive",
    ],
    publications: ["chi2023-kato-sigccc"],
    publicationProjects: ["creativity-support-environments"],
  },
);
