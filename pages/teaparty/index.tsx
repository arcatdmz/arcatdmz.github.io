import Page from "@/components/teaparty/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/teaparty/", {
  projects: ["teaparty"],
  publicationProjects: ["teaparty"],
});
