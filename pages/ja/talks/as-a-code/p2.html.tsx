import { Chapter2 } from "@/site/talks/as-a-code";
import { TalkPage } from "@/site/talks/TalkPage";
import { type PageDataProps } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
export default function Page(props: PageDataProps) {
  return (
    <TalkPage {...props} slug="as-a-code" chapter={2} Content={Chapter2} />
  );
}
export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      { pageData: getPageData("/ja/talks/as-a-code/p2.html") },
      "/ja/talks/as-a-code/p2.html",
    ),
  };
}
