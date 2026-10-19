import Page from "@/components/visionsketch/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/visionsketch/", {
  projects: ["visionsketch"],
  publications: ["gi2014-kato-visionsketch"],
  publicationProjects: ["visionsketch"],
});
