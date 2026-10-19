import Page from "@/components/animare/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/animare/", {
  projects: ["animare", "anime-sig", "griffith"],
  publications: [
    "chi2023-kato-sigccc",
    "chi2024-kato-griffith",
    "chi2025-kato-animesig",
    "chi2025-kato-postgrowth-cst",
    "chi2025-mandai-super-kawaii-vocalics",
    "hi25-kato-ui-design-for-authoring-videos",
    "isid2021-kato-anime-storyboards",
    "isid2022-kato-toolsmiths-in-anime",
    "jssst39-1-kato-toolsmith",
    "sa2024-todo-style-transfer",
    "sas2021-kato-storyboarding-in-anime",
    "sas2022-kato-toolsmiths-in-anime",
    "sas2023-kato-lights-animation-interaction",
    "vc2024-kato-toolsmiths-in-anime",
    "xrds2023summer-kato-toolsmith",
  ],
  publicationProjects: ["animare"],
});
