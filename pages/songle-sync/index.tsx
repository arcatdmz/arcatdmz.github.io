import Page from "@/components/songle-sync/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/songle-sync/", {
  projects: ["deployground", "songle-sync"],
  publications: ["mm2018-kato-songlesync"],
  publicationProjects: ["songle-sync"],
});
