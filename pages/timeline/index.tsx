import Page from "@/components/timeline/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(Page, "/timeline/", {});
