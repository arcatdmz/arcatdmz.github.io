import { Chapter3 } from "@/site/talks/as-a-code";
import { TalkPage } from "@/site/talks/TalkPage";
import { type PageDataProps } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
export default function Page(props: PageDataProps) {
  return (
    <TalkPage {...props} slug="as-a-code" chapter={3} Content={Chapter3} />
  );
}
export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      { pageData: getPageData("/ja/talks/as-a-code/p3.html") },
      "/ja/talks/as-a-code/p3.html",
    ),
  };
}
