import { Chapter3 } from "@/site/talks/people-are-programmers";
import { TalkPage } from "@/site/talks/TalkPage";
import { type PageDataProps } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
export default function Page(props: PageDataProps) {
  return (
    <TalkPage
      {...props}
      slug="people-are-programmers"
      chapter={3}
      Content={Chapter3}
    />
  );
}
export function getStaticProps() {
  return {
    props: withPageImages(
      Page,
      { pageData: getPageData("/ja/talks/people-are-programmers/p3.html") },
      "/ja/talks/people-are-programmers/p3.html",
    ),
  };
}
