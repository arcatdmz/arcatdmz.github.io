import { SiteLayout } from "./SiteLayout";
import { SiteLink } from "./SiteLink";
import { hydratePageData, type PageDataProps } from "../page-data";
import slides from "../slides.json";

export function SlidesPage({
  pageData,
  language,
}: PageDataProps & { language: "en" | "ja" }) {
  const data = hydratePageData(pageData);
  const en = language === "en";
  const title = en ? "Presentation slides" : "発表スライド";
  const context = {
    ...data,
    lang: language,
    en,
    basePath: data.rootPath + (en ? "" : "ja/"),
    author: en ? "Jun Kato" : "加藤 淳",
    me: "slides/",
    title,
  };
  return (
    <SiteLayout context={context}>
      <section>
        <h1 className="ui header">
          <i className="file powerpoint outline icon" aria-hidden="true" />
          <div className="content">{title}</div>
        </h1>
        <p>
          {en
            ? "Presentation slides previously shared on SlideShare. Open a PDF to read it, or download a copy."
            : "SlideShare で公開していた発表資料です。PDF を開いて閲覧するか、ダウンロードできます。"}
        </p>
        <div className="ui divided relaxed items">
          {slides.map((slide) => (
            <article className="item" id={slide.id} key={slide.id}>
              <div className="content">
                <h2 className="ui small header" lang={slide.language}>
                  {slide.title}
                </h2>
                <p>
                  {slide.language === "ja"
                    ? en
                      ? "Japanese"
                      : "日本語"
                    : en
                      ? "English"
                      : "英語"}{" "}
                  · PDF · {slide.pages} {en ? "pages" : "ページ"} ·{" "}
                  {(slide.bytes / 1024 / 1024).toFixed(1)} MiB
                </p>
                <a
                  className="ui button"
                  href={`${data.rootPath}slides/${slide.id}.pdf`}
                >
                  {en ? "Open PDF" : "PDF を開く"}
                </a>
                <a
                  className="ui basic button"
                  href={`${data.rootPath}slides/${slide.id}.pdf`}
                  download
                >
                  {en ? "Download" : "ダウンロード"}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p>
          <SiteLink href={`${context.basePath}publications/`}>
            {en ? "Publications" : "発表文献"}
          </SiteLink>
        </p>
      </section>
    </SiteLayout>
  );
}
