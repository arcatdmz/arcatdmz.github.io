import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/lyric-app-framework/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const {
    histories,
    awards,
    talks,
    lectures,
    projects,
    projectsTable,
    products,
    selectedProjects,
    publications,
    publicationsTable,
    selectedPublications,
    media,
    mediaList,
    misc,
    moment,
    rootPath,
    protocol,
    domain,
    defaultImageUrl,
    defaultDescription,
    defaultJapaneseDescription,
    stripTags,
  } = data;
  const lang: "en" | "ja" = "ja";
  const en: boolean = false;
  const basePath = en ? rootPath : rootPath + "ja/";
  const author = en ? "Jun Kato" : "加藤 淳";
  let me: any,
    p: any,
    title: any,
    description: any,
    imageUrl: any,
    bodyClass: any;

  p = projectsTable["lyric-app-framework"];
  title = p.getTitle(lang);
  me = p.project + "/";
  moment.locale(lang);
  const context: ReturnType<typeof getSiteData> & SiteContext = {
    ...data,
    lang,
    en,
    basePath,
    author,
    me,
    p,
    title,
    description,
    imageUrl,
    bodyClass,
  };
  const content = createContentComponents(context);
  function renderPresentations(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">{plainText(en ? "Presentation materials" : "発表内容")}</div>
        </h2>
        <div className="ui basic segment">
          {(() => {
            const children229: ReactNode[] = [];
            children229.push(<>{richText(" ")}</>);
            if (!en) {
              children229.push(
                <>
                  <h3 className="ui header" id={attribute("interaction2024")}>
                    <div className="content">
                      {richText("第28回 一般社団法人情報処理学会シンポジウム インタラクション2024")}
                      <div className="sub header">
                        <i className="ui trophy icon"></i>
                        {richText("最優秀論文賞・インタラクティブ発表賞 (一般投票)")}
                      </div>
                    </div>
                  </h3>
                </>,
              );
              children229.push(
                <>
                  <table className="ui striped very basic table">
                    <tbody>
                      <tr>
                        <td className="three wide">{richText("会場")}</td>
                        <td className="thirteen wide">
                          <div className="ui list">
                            <div className="item">
                              <i className="map pin icon"></i>
                              <div className="content">
                                {richText("学術総合センター内 一橋記念講堂")}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="three wide">{richText("日時")}</td>
                        <td className="thirteen wide">
                          <div className="ui list">
                            <div className="item">
                              <i className="clock icon"></i>
                              <div className="content">
                                <a
                                  href={href(
                                    "https://www.interaction-ipsj.org/2024/program/#video",
                                  )}
                                >
                                  {richText("2024/3/6 (水) 9:30-9:50")}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="three wide">{richText("論文")}</td>
                        <td className="thirteen wide">
                          <div className="ui list">
                            <div className="item">
                              <i className="text file icon"></i>
                              <div className="content">
                                <a
                                  href={href(
                                    `${rootPath}publications/interaction2024-kato-lyric-apps.pdf`,
                                  )}
                                >
                                  {richText(
                                    "Lyric App Framework: インタラクティブな歌詞駆動型視覚表現の開発用フレームワーク",
                                  )}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>,
              );
              children229.push(
                <>
                  <div className="ui two columns grid">
                    <div className="stackable row">
                      <div className="column">
                        <div className="ui basic segment">
                          {content.renderEmbedYoutube(
                            "//www.youtube.com/embed/tBBcweuGdrc?start=2061",
                          )}
                          <p className="caption">{richText("講演の録画")}</p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="ui basic segment">
                          <div
                            className="ui embed"
                            data-url={
                              publicationsTable["interaction2024-kato-lyric-app-framework"]
                                .entryTags.slides
                            }
                            data-placeholder={`${basePath}lyric-app-framework/interaction2024-kato-lyric-apps-slides.png`}
                            data-icon={"video play outline"}
                          ></div>
                          <div className="caption">
                            <div className="ui horizontal list">
                              <div className="item">
                                <a
                                  href={href(
                                    publicationsTable["interaction2024-kato-lyric-app-framework"]
                                      .entryTags.slides,
                                  )}
                                >
                                  <i className="download icon"></i>
                                  {plainText(en ? "Download" : "ダウンロード")}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>,
              );
              children229.push(
                <>
                  <h3 className="ui header" id={attribute("sigmus138")}>
                    <div className="content">
                      {richText("第138回音楽情報科学研究発表会 (SIGMUS)")}
                      <div className="sub header">
                        <i className="ui trophy icon"></i>
                        {richText("ベストプレゼンテーション賞 (Best Research部門)")}
                      </div>
                    </div>
                  </h3>
                </>,
              );
              children229.push(
                <>
                  <table className="ui striped very basic table">
                    <tbody>
                      <tr>
                        <td className="three wide">{richText("会場")}</td>
                        <td className="thirteen wide">
                          <div className="ui list">
                            <div className="item">
                              <i className="map pin icon"></i>
                              <div className="content">{richText("明治大学 中野キャンパス")}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="three wide">{richText("日時")}</td>
                        <td className="thirteen wide">
                          <div className="ui list">
                            <div className="item">
                              <i className="clock icon"></i>
                              <div className="content">
                                <a
                                  href={href("https://www.ipsj.or.jp/kenkyukai/event/mus138.html")}
                                >
                                  {richText("2023/8/27 (日) 13:30-13:55")}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="three wide">{richText("論文")}</td>
                        <td className="thirteen wide">
                          <div className="ui list">
                            <div className="item">
                              <i className="text file icon"></i>
                              <div className="content">
                                <a
                                  href={href(
                                    `${rootPath}publications/sigmus138-kato-lyric-apps.pdf`,
                                  )}
                                >
                                  {richText(
                                    "TextAlive App API:「リリックアプリ」の提案とプログラミング・コンテストでの実証実験",
                                  )}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>,
              );
              children229.push(
                <>
                  <div className="ui two columns grid">
                    <div className="stackable row">
                      <div className="column">
                        <div className="ui basic segment">
                          {content.renderEmbedYoutube("//www.youtube.com/embed/yTS5600B4pg")}
                          <p className="caption">{richText("プレゼンテーション再録")}</p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="ui basic segment">
                          <div
                            className="ui embed"
                            data-url={
                              publicationsTable["sigmus138-kato-lyric-app-framework"].entryTags
                                .slides
                            }
                            data-placeholder={`${basePath}lyric-app-framework/sigmus138-kato-lyric-apps-slides.png`}
                            data-icon={"video play outline"}
                          ></div>
                          <div className="caption">
                            <div className="ui horizontal list">
                              <div className="item">
                                <a
                                  href={href(
                                    publicationsTable["sigmus138-kato-lyric-app-framework"]
                                      .entryTags.slides,
                                  )}
                                >
                                  <i className="download icon"></i>
                                  {plainText(en ? "Download" : "ダウンロード")}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>,
              );
              children229.push(
                <>
                  <div className="ui hidden divider"></div>
                </>,
              );
              children229.push(
                <>
                  <h3 className="ui header" id={attribute("chi2023")}>
                    <div className="content">
                      {(() => {
                        const children230: ReactNode[] = [];
                        children230.push(<>{richText("ACM CHI 2023")}</>);
                        if (!en) {
                          children230.push(
                            <>
                              <div className="sub header">
                                <i className="ui trophy icon"></i>
                                {richText("Honorable Mention Award")}
                              </div>
                            </>,
                          );
                        }
                        return keyed(children230);
                      })()}
                    </div>
                  </h3>
                </>,
              );
            }
            children229.push(
              <>
                <table className="ui striped very basic table">
                  <tbody>
                    <tr>
                      <td className="three wide">{plainText(en ? "Where?" : "会場")}</td>
                      <td className="thirteen wide">
                        <div className="ui list">
                          <div className="item">
                            <i className="map pin icon"></i>
                            <div className="content">
                              {richText("Room Y07 + Y08, Congress Center Hamburg (CCH)")}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="three wide">{plainText(en ? "When?" : "日時")}</td>
                      <td className="thirteen wide">
                        <div className="ui list">
                          <div className="item">
                            <i className="clock icon"></i>
                            <div className="content">
                              <a
                                href={href(
                                  "https://www.timeanddate.com/worldclock/fixedtime.html?msg=ACM+CHI+2023%3A+Lyric+App+Framework+paper+presentation&iso=20230427T09&p1=307&am=14",
                                )}
                              >
                                {richText("Thu, Apr 27 | 09:00 - 09:14")}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="three wide">{richText("CHI '23 Program")}</td>
                      <td className="thirteen wide">
                        <div className="ui list">
                          <div className="item">
                            <i className="book icon"></i>
                            <div className="content">
                              <a
                                href={href(
                                  "https://programs.sigchi.org/chi/2023/program/content/96444",
                                )}
                              >
                                {richText(
                                  "Lyric App Framework: A Web-based Framework for Developing Interactive Lyric-driven Musical Applications - CHI '23",
                                )}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>,
            );
            return keyed(children229);
          })()}
        </div>
        <div className="ui two columns grid">
          <div className="stackable row">
            <div className="column">
              <div className="ui basic segment">
                {content.renderEmbedYoutube("//www.youtube.com/embed/7XpDPghxdCE")}
                <p className="caption">
                  {plainText(en ? "CHI 2023 Video Preview (30s)" : "CHI 2023 Video Preview（30秒）")}
                </p>
              </div>
            </div>
            <div className="column">
              <div className="ui basic segment">
                {content.renderEmbedYoutube("//www.youtube.com/embed/sX4Cdcljqd0")}
                <p className="caption">{richText("CHI 2023 Pre-recorded Presentation Video")}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderRevisions(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          {plainText(en ? "Revision history" : "更新履歴")}
        </h2>
        <div className="ui basic segment">
          <div className="ui divided feed">
            {(() => {
              const children231: ReactNode[] = [];
              if (en) {
                children231.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("04/20/2026")}</div>
                        <div className="summary">
                          {richText(
                            "Added project hero image and updated project text and 2026 thumbnail",
                          )}
                        </div>
                      </div>
                    </div>
                  </>,
                );
                children231.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("03/29/2026")}</div>
                        <div className="summary">
                          {richText(
                            "Updated links to &quot;Hatsune Miku Magical Mirai&quot; programming contest websites.",
                          )}
                        </div>
                      </div>
                    </div>
                  </>,
                );
                children231.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("09/02/2023")}</div>
                        <div className="summary">
                          {richText(
                            "Added links to &quot;Hatsune Miku Magical Mirai&quot; programming contest websites.",
                          )}
                        </div>
                      </div>
                    </div>
                  </>,
                );
              } else {
                children231.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("04/20/2026")}</div>
                        <div className="summary">
                          {richText(
                            "文章などを更新、2026年のプログラミング・コンテスト サムネイルを追加",
                          )}
                        </div>
                      </div>
                    </div>
                  </>,
                );
                children231.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("03/29/2026")}</div>
                        <div className="summary">
                          {richText(
                            "「初音ミク『マジカルミライ』」プログラミング・コンテスト関連のリンクを更新",
                          )}
                        </div>
                      </div>
                    </div>
                  </>,
                );
                children231.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("03/11/2024")}</div>
                        <div className="summary">
                          {richText(
                            "インタラクションでの講演の録画を追加、「初音ミク『マジカルミライ』」プログラミング・コンテスト入選作品一覧へのリンクを追加",
                          )}
                        </div>
                      </div>
                    </div>
                  </>,
                );
                children231.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("09/02/2023")}</div>
                        <div className="summary">
                          {richText(
                            "SIGMUSでのプレゼン再録動画を追加、「初音ミク『マジカルミライ』」プログラミング・コンテストへのリンクを追加",
                          )}
                        </div>
                      </div>
                    </div>
                  </>,
                );
                children231.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{richText("08/27/2023")}</div>
                        <div className="summary">
                          {richText("第138回音楽情報科学研究発表会 (SIGMUS) での発表資料を追加")}
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              children231.push(
                <>
                  <div className="event">
                    <div className="content">
                      <div className="date">{richText("04/19/2023")}</div>
                      <div className="summary">
                        {plainText(
                          en
                            ? "Added a pre-recorded presentation video"
                            : "事前録画のプレゼンテーション動画を追加",
                        )}
                      </div>
                    </div>
                  </div>
                </>,
              );
              children231.push(
                <>
                  <div className="event">
                    <div className="content">
                      <div className="date">{richText("04/16/2023")}</div>
                      <div className="summary">
                        {plainText(en ? "Added a video preview" : "Video Preview を追加")}
                      </div>
                    </div>
                  </div>
                </>,
              );
              children231.push(
                <>
                  <div className="event">
                    <div className="content">
                      <div className="date">{richText("03/31/2023")}</div>
                      <div className="summary">
                        {plainText(en ? "Added a project page" : "プロジェクトページを仮公開")}
                      </div>
                    </div>
                  </div>
                </>,
              );
              return keyed(children231);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="gift icon"></i>
          <div className="content">{plainText(en ? "Relevant projects" : "関連プロジェクト")}</div>
        </h2>
        <div className="ui basic segment">
          <div className="ui segment">
            <div className="ui divided items projects">
              {content.renderProjectItem(projectsTable["textalive"])}
              {content.renderProjectItem(projectsTable["creativity-support-environments"])}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={<>{content.renderProjectHero("lyric-app-framework")}</>}
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#body")}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{plainText(en ? "Top" : "トップ")}</div>
                </a>
                <a className="item" href={href("#abstract")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
                </a>
                <a className="item" href={href("#presentations")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Presentations" : "発表内容")}</div>
                </a>
                <a className="item" href={href("#publications")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Publications" : "発表文献")}</div>
                </a>
                <a className="item" href={href("#revisions")}>
                  <i className="right triangle icon"></i>
                  <div className="content">{plainText(en ? "Revisions" : "更新履歴")}</div>
                </a>
                <a className="item" href={href("#further-readings")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Relevant projects" : "関連プロジェクト")}
                  </div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <div className="ui two columns grid">
          <div className="stackable row">
            <div className="column">
              <section id={attribute("abstract")}>
                <h2 className="ui header">
                  <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
                </h2>
                <div className="ui basic segment">
                  {(() => {
                    const children232: ReactNode[] = [];
                    if (en) {
                      children232.push(
                        <>
                          <p>
                            <img
                              className="ui bordered image"
                              src={"/images/thumbnails/lyric-app-framework.png"}
                            />
                          </p>
                        </>,
                      );
                    } else {
                      children232.push(
                        <>
                          <p>
                            <img
                              className="ui bordered image"
                              src={`${basePath}lyric-app-framework/sigmus138-kato-lyric-apps-slides-p4_thumbnail.png`}
                            />
                          </p>
                        </>,
                      );
                    }
                    children232.push(
                      <>
                        <p>{richText(p.getDescription(lang))}</p>
                      </>,
                    );
                    if (en) {
                      children232.push(
                        <>
                          <p>
                            {richText(
                              "The programming contests continue to be held even after the paper was published, with a 2025 Japanese journal paper reporting analysis results from four years, and the 2026 contest is ongoing.",
                            )}
                          </p>
                        </>,
                      );
                    } else {
                      children232.push(
                        <>
                          <p>
                            {richText(
                              "論文執筆後もプログラミング・コンテストは継続して開催されており、2025年のジャーナル論文では4年分の分析結果を報告した他、2026年のコンテストが開催中です。",
                            )}
                          </p>
                        </>,
                      );
                    }
                    return keyed(children232);
                  })()}
                </div>
              </section>
            </div>
            <div className="column">
              <section id={attribute("programming-contest")}>
                <h2 className="ui header">
                  <div className="content">
                    {plainText(en ? "Programming Contests" : "プログラミング・コンテスト")}
                  </div>
                </h2>
                <div className="ui basic segment">
                  {(() => {
                    const children233: ReactNode[] = [];
                    children233.push(<>{richText(" ")}</>);
                    if (en) {
                      children233.push(
                        <>
                          <p>
                            <img
                              className="ui bordered image"
                              src={`${basePath}lyric-app-framework/magicalmirai2026-banner.jpg`}
                            />
                          </p>
                        </>,
                      );
                      children233.push(
                        <>
                          <p>
                            {richText(
                              "We made the framework publicly available in 2020 and has been conducting an annual programming contest in ",
                            )}
                            <a href={href("https://magicalmirai.com")}>
                              {richText("&quot;Hatsune Miku Magical Mirai&quot;")}
                            </a>
                            {richText(
                              " &mdash; a live show and exhibition, connecting with Hatsune Miku through creativity. ",
                            )}
                          </p>
                        </>,
                      );
                      children233.push(
                        <>
                          <ul className="ui horizontal divided list">
                            <a className="item" href={href("https://magicalmirai.com/2020/procon")}>
                              {richText("2020 (ja)")}
                            </a>
                            <a className="item" href={href("https://magicalmirai.com/2021/procon")}>
                              {richText("2021 (ja)")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/10th/procon/index_en.html")}
                            >
                              {richText("2022")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2023/procon/index_en.html")}
                            >
                              {richText("2023")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2024/procon/index_en.html")}
                            >
                              {richText("2024")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2025/procon/index_en.html")}
                            >
                              {richText("2025")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2026/procon/index_en.html")}
                            >
                              {richText("2026")}
                            </a>
                          </ul>
                        </>,
                      );
                    } else {
                      children233.push(
                        <>
                          <p>
                            <img
                              className="ui bordered image"
                              src={`${basePath}lyric-app-framework/interaction2024-kato-lyric-apps-slides-p27_thumbnail.png`}
                            />
                          </p>
                        </>,
                      );
                      children233.push(
                        <>
                          <p>
                            {richText(
                              "本フレームワークの「TextAlive App API」を活用したプログラミング・コンテストが、2020年より「",
                            )}
                            <a href={href("https://magicalmirai.com")}>
                              {richText("初音ミク『マジカルミライ』")}
                            </a>
                            {richText(
                              "」で開催されています。詳しくは各年のコンテスト公式サイトをご覧ください。2020-2021年の応募作品については論文でも報告されています。",
                            )}
                          </p>
                        </>,
                      );
                      children233.push(
                        <>
                          <ul className="ui horizontal divided list">
                            <strong className="item">{richText("公式サイト")}</strong>
                            <a className="item" href={href("https://magicalmirai.com/2020/procon")}>
                              {richText("2020")}
                            </a>
                            <a className="item" href={href("https://magicalmirai.com/2021/procon")}>
                              {richText("2021")}
                            </a>
                            <a className="item" href={href("https://magicalmirai.com/10th/procon")}>
                              {richText("2022 (10th Anniversary)")}
                            </a>
                            <a className="item" href={href("https://magicalmirai.com/2023/procon")}>
                              {richText("2023")}
                            </a>
                            <a className="item" href={href("https://magicalmirai.com/2024/procon")}>
                              {richText("2024")}
                            </a>
                            <a className="item" href={href("https://magicalmirai.com/2025/procon")}>
                              {richText("2025")}
                            </a>
                            <a className="item" href={href("https://magicalmirai.com/2026/procon")}>
                              {richText("2026")}
                            </a>
                          </ul>
                        </>,
                      );
                      children233.push(
                        <>
                          <ul className="ui horizontal divided list">
                            <strong className="item">{richText("入選作品一覧")}</strong>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2020/procon/entry.html")}
                            >
                              {richText("2020")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2021/procon/entry.html")}
                            >
                              {richText("2021")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/10th/procon/entry.html")}
                            >
                              {richText("2022 (10th Anniversary)")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2023/procon/entry.html")}
                            >
                              {richText("2023")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2024/procon/entry.html")}
                            >
                              {richText("2024")}
                            </a>
                            <a
                              className="item"
                              href={href("https://magicalmirai.com/2025/procon/entry.html")}
                            >
                              {richText("2025")}
                            </a>
                          </ul>
                        </>,
                      );
                    }
                    return keyed(children233);
                  })()}
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="ui basic right aligned segment">
          <a className="ui primary button" href={href("//developer.textalive.jp")}>
            <i className="external icon"></i>
            {plainText(en ? "Framework Website" : "フレームワークのWebサイトへ")}
          </a>
        </div>
        <div className="ui hidden divider"></div>
        <section id={attribute("presentations")}>{renderPresentations()}</section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications(p.project, "chi2023-kato-lyric-app-framework")}
        <div className="ui hidden divider"></div>
        <section id={attribute("revisions")}>{renderRevisions()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("further-readings")}>{renderFurtherReadings()}</section>
      </SiteLayout>
    </>
  );
}
