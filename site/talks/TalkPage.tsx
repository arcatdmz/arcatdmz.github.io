import { useEffect, type ComponentType } from "react";
import { useRouter } from "next/router";
import { hydratePageData, type PageDataProps } from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { SiteLink } from "@/site/components/SiteLink";
import type { PageContext } from "@/site/components/SiteContext";

export type TalkSlug = "as-a-code" | "people-are-programmers";
export const talkInfo = {
  "as-a-code": {
    title: "* as a Code",
    subtitle: "コンテンツをプログラミングする方法",
    date: "2015-12-09",
    event: "明治大学CE概論",
    image: "/ja/talks/as-a-code.old/as-a-code.png",
    pdf: "151209-ce-slides.pdf",
    chapters: [
      "プログラミングって何だっけ？",
      "コンテンツを作る",
      "プログラミング環境を作る",
    ],
  },
  "people-are-programmers": {
    title: "ぼくらのプログラミングから、みんなのプログラミングへ",
    subtitle: 'From "programmers are people, too" to "people are programmers."',
    date: "2015-09-20",
    event: "第48回 情報科学若手の会 若手特別講演",
    image: "/ja/talks/people-are-programmers.old/P9206331-trim.jpg",
    pdf: "wakate2015-kato-slides.pdf",
    chapters: [
      "自己紹介・はじめに",
      "ぼくらのプログラミング",
      "みんなのプログラミング",
    ],
  },
};
export function chapterHref(slug: TalkSlug, chapter: number) {
  return `/ja/talks/${slug}/${chapter === 1 ? "" : `p${chapter}.html`}`;
}

export function TalkPage({
  pageData,
  slug,
  chapter,
  Content,
  ide = false,
}: PageDataProps & {
  slug: TalkSlug;
  chapter: number;
  Content: ComponentType<{ active: boolean }>;
  ide?: boolean;
}) {
  const data = hydratePageData(pageData);
  const info = talkInfo[slug];
  const router = useRouter();
  useEffect(() => {
    if (chapter !== 1 || !router.isReady) return;
    const legacyChapter = Number(router.query.p);
    if (legacyChapter === 2 || legacyChapter === 3) {
      const query =
        typeof router.query.code === "string"
          ? `?code=${encodeURIComponent(router.query.code)}`
          : "";
      void router.replace(chapterHref(slug, legacyChapter) + query);
    }
  }, [
    chapter,
    router.isReady,
    router.query.p,
    router.query.code,
    slug,
    router,
  ]);
  const me = `talks/${slug}/${
    ide ? "ide/" : chapter === 1 ? "" : `p${chapter}.html`
  }`;
  const context: PageContext = {
    ...data,
    lang: "ja",
    en: false,
    basePath: `${data.rootPath}ja/`,
    author: "加藤 淳",
    me,
    title: `${info.title} | ${
      ide ? "My First IDE" : info.chapters[chapter - 1]
    }`,
    description: info.subtitle,
    imageUrl: `${data.protocol}://${data.domain}${info.image}`,
  };
  return (
    <SiteLayout context={context}>
      <article className="talk-page">
        <header>
          <h1 className="ui header">
            {info.title}
            <div className="sub header">{info.subtitle}</div>
          </h1>
          <div className="ui labels">
            <span className="ui label">
              <i className="calendar icon" />
              <time dateTime={info.date}>{info.date}</time>
            </span>
            <span className="ui blue label">IDE</span>
            <span className="ui red label">{info.event}</span>
          </div>
          <p className="talk-materials">
            <SiteLink href={`/publications/${info.pdf}`}>
              <i className="file pdf icon" />
              講演スライド（PDF）
            </SiteLink>
          </p>
          {slug === "people-are-programmers" && chapter === 1 && !ide && (
            <>
              <h2 className="ui header">概要</h2>
              <p>
                プログラマは一番長くコンピュータと付き合ってきた人たちだ。だから、プログラマはコンピュータを使った創作活動の未来について知っている。プログラミングの方法論を他のコンテンツ制作に応用できれば、より自由で協力的な世界がやってくるだろう。
                一方で、プログラマは過去を引きずっているとも言える。プログラミングを今より分かりやすくできれば、さらに多くの人が使える道具になるだろう。
                本講演では、プログラミングのメリットをみんなが享受できる世界に向けた試みについて、過去・未来2つの観点から論じる。
              </p>
              <div className="ui info message">
                <p>
                  このページでは、
                  <SiteLink href="https://blog.junkato.jp/ja/posts/2015-09-24-ipsj-prosym-wakate-2015/">
                    第48回 情報科学若手の会
                  </SiteLink>
                  で若手特別講演にご招待いただいたときのプレゼンテーションの内容を紹介しています。
                  <SiteLink href="https://togetter.com/li/875960">
                    反響をまとめたTogetter
                  </SiteLink>
                  もあります。これまでの活動を手短にまとめるとてもいい機会になりました。ご招待くださった幹事団のみなさま、当日会場で活発に議論いただいたみなさまに、この場を借りて御礼申し上げます。
                </p>
              </div>
            </>
          )}
          <nav
            className="ui three item stackable pointing secondary menu"
            aria-label="講演の章"
          >
            {info.chapters.map((title, index) => (
              <SiteLink
                key={title}
                className={`item ${
                  !ide && chapter === index + 1 ? "active" : ""
                }`}
                aria-current={
                  !ide && chapter === index + 1 ? "page" : undefined
                }
                href={chapterHref(slug, index + 1)}
              >
                {index + 1}. {title}
              </SiteLink>
            ))}
          </nav>
        </header>
        <div id="content">
          <Content active />
        </div>
        {!ide && (
          <nav
            className="ui two column grid talk-pagination"
            aria-label="前後の章"
          >
            <div className="column">
              {chapter > 1 ? (
                <SiteLink
                  className="ui fluid button"
                  href={chapterHref(slug, chapter - 1)}
                >
                  « 前の章
                </SiteLink>
              ) : (
                <button className="ui fluid disabled button" disabled>
                  « 前の章
                </button>
              )}
            </div>
            <div className="column">
              {chapter < 3 ? (
                <SiteLink
                  className="ui fluid primary button"
                  href={chapterHref(slug, chapter + 1)}
                >
                  次の章 »
                </SiteLink>
              ) : (
                <button className="ui fluid disabled button" disabled>
                  次の章 »
                </button>
              )}
            </div>
          </nav>
        )}
      </article>
    </SiteLayout>
  );
}
