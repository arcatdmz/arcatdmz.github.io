import Page from "@/components/sharedo/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/sharedo/", {
  projects: ["sharedo"],
  publications: ["hai2014-kato-sharedo"],
  publicationProjects: ["sharedo"],
});
