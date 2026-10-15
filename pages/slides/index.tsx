import { SlidesPage } from "@/site/components/SlidesPage";
import { getPageData } from "@/site/page-data.server";
import type { PageDataProps } from "@/site/page-data";
export default function Page(props: PageDataProps) {
  return <SlidesPage {...props} language="en" />;
}
export function getStaticProps() {
  return { props: { pageData: getPageData("/slides/") } };
}
