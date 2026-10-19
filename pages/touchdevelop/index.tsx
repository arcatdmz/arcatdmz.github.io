import Page from "@/components/touchdevelop/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/touchdevelop/", {
  projects: ["touchdevelop"],
  publications: ["pldi2013-kato-alive"],
  publicationProjects: ["touchdevelop"],
});
