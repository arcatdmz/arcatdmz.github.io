import Page from "@/components/tweeq/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/tweeq/", {
  projects: ["tweeq"],
  publications: ["uist2025-hashimoto-tweeq"],
  publicationProjects: ["tweeq"],
});
