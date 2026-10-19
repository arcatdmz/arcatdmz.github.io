import Page from "@/components/programming-with-examples/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(
  Page,
  "/programming-with-examples/",
  {
    projects: ["programming-with-examples"],
    publications: ["programming-with-examples"],
  },
);
