import Page from "@/components/deployground/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/deployground/", {
  projects: ["deployground"],
  publications: ["vlhcc2018-kato-deployground"],
  publicationProjects: ["deployground"],
});
