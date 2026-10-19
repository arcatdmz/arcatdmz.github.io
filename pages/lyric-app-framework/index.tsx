import Page from "@/components/lyric-app-framework/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(
  Page,
  "/lyric-app-framework/",
  {
    projects: [
      "creativity-support-environments",
      "lyric-app-framework",
      "textalive",
    ],
    publications: [
      "chi2023-kato-lyric-app-framework",
      "interaction2024-kato-lyric-app-framework",
      "sigmus138-kato-lyric-app-framework",
    ],
    publicationProjects: ["lyric-app-framework"],
  },
);
