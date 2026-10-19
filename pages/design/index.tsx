import Page from "@/components/design/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/design/", {
  projects: ["design"],
});
