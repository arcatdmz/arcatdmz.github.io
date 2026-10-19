import Page from "@/components/live-tuning/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/live-tuning/", {
  projects: ["live-programming", "live-tuning"],
  publications: ["live2016-kato-livetuning"],
  publicationProjects: ["live-tuning"],
});
