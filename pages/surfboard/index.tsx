import Page from "@/components/surfboard/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/surfboard/", {
  projects: ["surfboard"],
  publications: ["uist2010-kato-surfboard"],
  publicationProjects: ["surfboard"],
});
