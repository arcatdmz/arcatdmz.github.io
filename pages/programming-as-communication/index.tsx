import Page from "@/components/programming-as-communication/index";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;

export const getStaticProps = localizedPageProps(
  Page,
  "/programming-as-communication/",
  {
    projects: [
      "live-tuning",
      "programming-as-communication",
      "user-generated-variables",
    ],
    publicationProjects: ["programming-as-communication"],
  },
);
