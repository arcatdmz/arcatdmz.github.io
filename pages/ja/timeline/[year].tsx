import Page from "@/components/timeline/[year]";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { buildYear } from "@/site/clock";

export default Page;

export function getStaticPaths() {
  return {
    paths: Array.from({ length: buildYear - 2010 + 1 }, (_, i) => ({
      params: { year: String(2010 + i) },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }: { params: { year: string } }) {
  const pageYear = Number(params.year);
  const route = `/ja/timeline/${pageYear}/`;
  return {
    props: withPageImages(
      Page,
      { pageYear, pageData: getPageData(`/ja/timeline/${pageYear}/`) },
      route,
    ),
  };
}
