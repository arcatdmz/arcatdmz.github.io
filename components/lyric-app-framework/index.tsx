import { Embed, Popup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Both locales inherit the default content. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath } = data;
  const lang = pageData.language;
  const en = lang === "en";
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
  const context: SiteData & SiteContext = {
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
  function renderPresentations(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">
            {en ? "Presentation materials" : "発表内容"}
          </div>
        </h2>
        <div className="ui basic segment">
          {" "}
          {!en ? (
            <>
              <h3 className="ui header" id={"interaction2024"}>
                <div className="content">
                  {
                    "第28回 一般社団法人情報処理学会シンポジウム インタラクション2024"
                  }
                  <div className="sub header">
                    <i className="ui trophy icon"></i>
                    {"最優秀論文賞・インタラクティブ発表賞 (一般投票)"}
                  </div>
                </div>
              </h3>

              <table className="ui striped very basic table">
                <tbody>
                  <tr>
                    <td className="three wide">{"会場"}</td>
                    <td className="thirteen wide">
                      <div className="ui list">
                        <div className="item">
                          <i className="map pin icon"></i>
                          <div className="content">
                            {"学術総合センター内 一橋記念講堂"}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="three wide">{"日時"}</td>
                    <td className="thirteen wide">
                      <div className="ui list">
                        <div className="item">
                          <i className="clock icon"></i>
                          <div className="content">
                            <a
                              href={
                                "https://www.interaction-ipsj.org/2024/program/#video"
                              }
                            >
                              {"2024/3/6 (水) 9:30-9:50"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="three wide">{"論文"}</td>
                    <td className="thirteen wide">
                      <div className="ui list">
                        <div className="item">
                          <i className="text file icon"></i>
                          <div className="content">
                            <SiteLink
                              href={href(
                                `${rootPath}publications/interaction2024-kato-lyric-apps.pdf`,
                              )}
                            >
                              {
                                "Lyric App Framework: インタラクティブな歌詞駆動型視覚表現の開発用フレームワーク"
                              }
                            </SiteLink>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="ui two columns grid">
                <div className="stackable row">
                  <div className="column">
                    <div className="ui basic segment">
                      <EmbedYoutube
                        src={"//www.youtube.com/embed/tBBcweuGdrc?start=2061"}
                      />
                      <p className="caption">{"講演の録画"}</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="ui basic segment">
                      <Embed
                        className="ui embed"
                        data-url={
                          publicationsTable[
                            "interaction2024-kato-lyric-app-framework"
                          ].entryTags.slides
                        }
                        data-placeholder={`${basePath}lyric-app-framework/interaction2024-kato-lyric-apps-slides.png`}
                        data-icon={"video play outline"}
                      ></Embed>
                      <div className="caption">
                        <div className="ui horizontal list">
                          <div className="item">
                            <SiteLink
                              href={href(
                                publicationsTable[
                                  "interaction2024-kato-lyric-app-framework"
                                ].entryTags.slides,
                              )}
                            >
                              <i className="download icon"></i>
                              {en ? "Download" : "ダウンロード"}
                            </SiteLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="ui header" id={"sigmus138"}>
                <div className="content">
                  {"第138回音楽情報科学研究発表会 (SIGMUS)"}
                  <div className="sub header">
                    <i className="ui trophy icon"></i>
                    {"ベストプレゼンテーション賞 (Best Research部門)"}
                  </div>
                </div>
              </h3>

              <table className="ui striped very basic table">
                <tbody>
                  <tr>
                    <td className="three wide">{"会場"}</td>
                    <td className="thirteen wide">
                      <div className="ui list">
                        <div className="item">
                          <i className="map pin icon"></i>
                          <div className="content">
                            {"明治大学 中野キャンパス"}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="three wide">{"日時"}</td>
                    <td className="thirteen wide">
                      <div className="ui list">
                        <div className="item">
                          <i className="clock icon"></i>
                          <div className="content">
                            <a
                              href={
                                "https://www.ipsj.or.jp/kenkyukai/event/mus138.html"
                              }
                            >
                              {"2023/8/27 (日) 13:30-13:55"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="three wide">{"論文"}</td>
                    <td className="thirteen wide">
                      <div className="ui list">
                        <div className="item">
                          <i className="text file icon"></i>
                          <div className="content">
                            <SiteLink
                              href={href(
                                `${rootPath}publications/sigmus138-kato-lyric-apps.pdf`,
                              )}
                            >
                              {
                                "TextAlive App API:「リリックアプリ」の提案とプログラミング・コンテストでの実証実験"
                              }
                            </SiteLink>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="ui two columns grid">
                <div className="stackable row">
                  <div className="column">
                    <div className="ui basic segment">
                      <EmbedYoutube
                        src={"//www.youtube.com/embed/yTS5600B4pg"}
                      />
                      <p className="caption">{"プレゼンテーション再録"}</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="ui basic segment">
                      <Embed
                        className="ui embed"
                        data-url={
                          publicationsTable[
                            "sigmus138-kato-lyric-app-framework"
                          ].entryTags.slides
                        }
                        data-placeholder={`${basePath}lyric-app-framework/sigmus138-kato-lyric-apps-slides.png`}
                        data-icon={"video play outline"}
                      ></Embed>
                      <div className="caption">
                        <div className="ui horizontal list">
                          <div className="item">
                            <SiteLink
                              href={href(
                                publicationsTable[
                                  "sigmus138-kato-lyric-app-framework"
                                ].entryTags.slides,
                              )}
                            >
                              <i className="download icon"></i>
                              {en ? "Download" : "ダウンロード"}
                            </SiteLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ui hidden divider"></div>

              <h3 className="ui header" id={"chi2023"}>
                <div className="content">
                  {"ACM CHI 2023"}
                  {!en ? (
                    <>
                      <div className="sub header">
                        <i className="ui trophy icon"></i>
                        {"Honorable Mention Award"}
                      </div>
                    </>
                  ) : null}
                </div>
              </h3>
            </>
          ) : null}
          <table className="ui striped very basic table">
            <tbody>
              <tr>
                <td className="three wide">{en ? "Where?" : "会場"}</td>
                <td className="thirteen wide">
                  <div className="ui list">
                    <div className="item">
                      <i className="map pin icon"></i>
                      <div className="content">
                        {"Room Y07 + Y08, Congress Center Hamburg (CCH)"}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="three wide">{en ? "When?" : "日時"}</td>
                <td className="thirteen wide">
                  <div className="ui list">
                    <div className="item">
                      <i className="clock icon"></i>
                      <div className="content">
                        <a
                          href={
                            "https://www.timeanddate.com/worldclock/fixedtime.html?msg=ACM+CHI+2023%3A+Lyric+App+Framework+paper+presentation&iso=20230427T09&p1=307&am=14"
                          }
                        >
                          {"Thu, Apr 27 | 09:00 - 09:14"}
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="three wide">{"CHI '23 Program"}</td>
                <td className="thirteen wide">
                  <div className="ui list">
                    <div className="item">
                      <i className="book icon"></i>
                      <div className="content">
                        <a
                          href={
                            "https://programs.sigchi.org/chi/2023/program/content/96444"
                          }
                        >
                          {
                            "Lyric App Framework: A Web-based Framework for Developing Interactive Lyric-driven Musical Applications - CHI '23"
                          }
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ui two columns grid">
          <div className="stackable row">
            <div className="column">
              <div className="ui basic segment">
                <EmbedYoutube src={"//www.youtube.com/embed/7XpDPghxdCE"} />
                <p className="caption">
                  {en
                    ? "CHI 2023 Video Preview (30s)"
                    : "CHI 2023 Video Preview（30秒）"}
                </p>
              </div>
            </div>
            <div className="column">
              <div className="ui basic segment">
                <EmbedYoutube src={"//www.youtube.com/embed/sX4Cdcljqd0"} />
                <p className="caption">
                  {"CHI 2023 Pre-recorded Presentation Video"}
                </p>
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
          {en ? "Revision history" : "更新履歴"}
        </h2>
        <div className="ui basic segment">
          <div className="ui divided feed">
            {en ? (
              <>
                <div className="event">
                  <div className="content">
                    <div className="date">{"04/20/2026"}</div>
                    <div className="summary">
                      {
                        "Added project hero image and updated project text and 2026 thumbnail"
                      }
                    </div>
                  </div>
                </div>

                <div className="event">
                  <div className="content">
                    <div className="date">{"03/29/2026"}</div>
                    <div className="summary">
                      {
                        'Updated links to "Hatsune Miku Magical Mirai" programming contest websites.'
                      }
                    </div>
                  </div>
                </div>

                <div className="event">
                  <div className="content">
                    <div className="date">{"09/02/2023"}</div>
                    <div className="summary">
                      {
                        'Added links to "Hatsune Miku Magical Mirai" programming contest websites.'
                      }
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="event">
                  <div className="content">
                    <div className="date">{"04/20/2026"}</div>
                    <div className="summary">
                      {
                        "文章などを更新、2026年のプログラミング・コンテスト サムネイルを追加"
                      }
                    </div>
                  </div>
                </div>

                <div className="event">
                  <div className="content">
                    <div className="date">{"03/29/2026"}</div>
                    <div className="summary">
                      {
                        "「初音ミク『マジカルミライ』」プログラミング・コンテスト関連のリンクを更新"
                      }
                    </div>
                  </div>
                </div>

                <div className="event">
                  <div className="content">
                    <div className="date">{"03/11/2024"}</div>
                    <div className="summary">
                      {
                        "インタラクションでの講演の録画を追加、「初音ミク『マジカルミライ』」プログラミング・コンテスト入選作品一覧へのリンクを追加"
                      }
                    </div>
                  </div>
                </div>

                <div className="event">
                  <div className="content">
                    <div className="date">{"09/02/2023"}</div>
                    <div className="summary">
                      {
                        "SIGMUSでのプレゼン再録動画を追加、「初音ミク『マジカルミライ』」プログラミング・コンテストへのリンクを追加"
                      }
                    </div>
                  </div>
                </div>

                <div className="event">
                  <div className="content">
                    <div className="date">{"08/27/2023"}</div>
                    <div className="summary">
                      {
                        "第138回音楽情報科学研究発表会 (SIGMUS) での発表資料を追加"
                      }
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="event">
              <div className="content">
                <div className="date">{"04/19/2023"}</div>
                <div className="summary">
                  {en
                    ? "Added a pre-recorded presentation video"
                    : "事前録画のプレゼンテーション動画を追加"}
                </div>
              </div>
            </div>

            <div className="event">
              <div className="content">
                <div className="date">{"04/16/2023"}</div>
                <div className="summary">
                  {en ? "Added a video preview" : "Video Preview を追加"}
                </div>
              </div>
            </div>

            <div className="event">
              <div className="content">
                <div className="date">{"03/31/2023"}</div>
                <div className="summary">
                  {en ? "Added a project page" : "プロジェクトページを仮公開"}
                </div>
              </div>
            </div>
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
          <div className="content">
            {en ? "Relevant projects" : "関連プロジェクト"}
          </div>
        </h2>
        <div className="ui basic segment">
          <div className="ui segment">
            <div className="ui divided items projects">
              <ProjectItem p={projectsTable["textalive"]} />
              <ProjectItem
                p={projectsTable["creativity-support-environments"]}
              />
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
        mainHero={
          <>
            <ProjectHero project={"lyric-app-framework"} />
          </>
        }
        postFooter={
          <>
            <Popup
              className="ui hidden popup-menu popup"
              position="top left"
              trigger={
                <a className="ui circular icon popup-menu large grey hidden button">
                  <i className="sidebar icon"></i>
                </a>
              }
            >
              <div className="ui divided list">
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{en ? "Top" : "トップ"}</div>
                </a>
                <a className="item" href={"#abstract"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{en ? "Abstract" : "概要"}</div>
                </a>
                <a className="item" href={"#presentations"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Presentations" : "発表内容"}
                  </div>
                </a>
                <a className="item" href={"#publications"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Publications" : "発表文献"}
                  </div>
                </a>
                <a className="item" href={"#revisions"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{en ? "Revisions" : "更新履歴"}</div>
                </a>
                <a className="item" href={"#further-readings"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Relevant projects" : "関連プロジェクト"}
                  </div>
                </a>
              </div>
            </Popup>
          </>
        }
      >
        <div className="ui two columns grid">
          <div className="stackable row">
            <div className="column">
              <section id={"abstract"}>
                <h2 className="ui header">
                  <div className="content">{en ? "Abstract" : "概要"}</div>
                </h2>
                <div className="ui basic segment">
                  {en ? (
                    <>
                      <p>
                        <SiteImage
                          className="ui bordered image"
                          src={"/images/thumbnails/lyric-app-framework.png"}
                        />
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <SiteImage
                          className="ui bordered image"
                          src={`${basePath}lyric-app-framework/sigmus138-kato-lyric-apps-slides-p4_thumbnail.png`}
                        />
                      </p>
                    </>
                  )}
                  <p>
                    <HtmlContent html={p.getDescription(lang)} />
                  </p>
                  {en ? (
                    <>
                      <p>
                        {
                          "The programming contests continue to be held even after the paper was published, with a 2025 Japanese journal paper reporting analysis results from four years, and the 2026 contest is ongoing."
                        }
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        {
                          "論文執筆後もプログラミング・コンテストは継続して開催されており、2025年のジャーナル論文では4年分の分析結果を報告した他、2026年のコンテストが開催中です。"
                        }
                      </p>
                    </>
                  )}
                </div>
              </section>
            </div>
            <div className="column">
              <section id={"programming-contest"}>
                <h2 className="ui header">
                  <div className="content">
                    {en ? "Programming Contests" : "プログラミング・コンテスト"}
                  </div>
                </h2>
                <div className="ui basic segment">
                  {" "}
                  {en ? (
                    <>
                      <p>
                        <SiteImage
                          className="ui bordered image"
                          src={`${basePath}lyric-app-framework/magicalmirai2026-banner.jpg`}
                        />
                      </p>

                      <p>
                        {
                          "We made the framework publicly available in 2020 and has been conducting an annual programming contest in "
                        }
                        <a href={"https://magicalmirai.com"}>
                          {'"Hatsune Miku Magical Mirai"'}
                        </a>
                        {
                          " — a live show and exhibition, connecting with Hatsune Miku through creativity. "
                        }
                      </p>

                      <ul className="ui horizontal divided list">
                        <a
                          className="item"
                          href={"https://magicalmirai.com/2020/procon"}
                        >
                          {"2020 (ja)"}
                        </a>
                        <a
                          className="item"
                          href={"https://magicalmirai.com/2021/procon"}
                        >
                          {"2021 (ja)"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/10th/procon/index_en.html"
                          }
                        >
                          {"2022"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2023/procon/index_en.html"
                          }
                        >
                          {"2023"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2024/procon/index_en.html"
                          }
                        >
                          {"2024"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2025/procon/index_en.html"
                          }
                        >
                          {"2025"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2026/procon/index_en.html"
                          }
                        >
                          {"2026"}
                        </a>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>
                        <SiteImage
                          className="ui bordered image"
                          src={`${basePath}lyric-app-framework/interaction2024-kato-lyric-apps-slides-p27_thumbnail.png`}
                        />
                      </p>

                      <p>
                        {
                          "本フレームワークの「TextAlive App API」を活用したプログラミング・コンテストが、2020年より「"
                        }
                        <a href={"https://magicalmirai.com"}>
                          {"初音ミク『マジカルミライ』"}
                        </a>
                        {
                          "」で開催されています。詳しくは各年のコンテスト公式サイトをご覧ください。2020-2021年の応募作品については論文でも報告されています。"
                        }
                      </p>

                      <ul className="ui horizontal divided list">
                        <strong className="item">{"公式サイト"}</strong>
                        <a
                          className="item"
                          href={"https://magicalmirai.com/2020/procon"}
                        >
                          {"2020"}
                        </a>
                        <a
                          className="item"
                          href={"https://magicalmirai.com/2021/procon"}
                        >
                          {"2021"}
                        </a>
                        <a
                          className="item"
                          href={"https://magicalmirai.com/10th/procon"}
                        >
                          {"2022 (10th Anniversary)"}
                        </a>
                        <a
                          className="item"
                          href={"https://magicalmirai.com/2023/procon"}
                        >
                          {"2023"}
                        </a>
                        <a
                          className="item"
                          href={"https://magicalmirai.com/2024/procon"}
                        >
                          {"2024"}
                        </a>
                        <a
                          className="item"
                          href={"https://magicalmirai.com/2025/procon"}
                        >
                          {"2025"}
                        </a>
                        <a
                          className="item"
                          href={"https://magicalmirai.com/2026/procon"}
                        >
                          {"2026"}
                        </a>
                      </ul>

                      <ul className="ui horizontal divided list">
                        <strong className="item">{"入選作品一覧"}</strong>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2020/procon/entry.html"
                          }
                        >
                          {"2020"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2021/procon/entry.html"
                          }
                        >
                          {"2021"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/10th/procon/entry.html"
                          }
                        >
                          {"2022 (10th Anniversary)"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2023/procon/entry.html"
                          }
                        >
                          {"2023"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2024/procon/entry.html"
                          }
                        >
                          {"2024"}
                        </a>
                        <a
                          className="item"
                          href={
                            "https://magicalmirai.com/2025/procon/entry.html"
                          }
                        >
                          {"2025"}
                        </a>
                      </ul>
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="ui basic right aligned segment">
          <a className="ui primary button" href={"//developer.textalive.jp"}>
            <i className="external icon"></i>
            {en ? "Framework Website" : "フレームワークのWebサイトへ"}
          </a>
        </div>
        <div className="ui hidden divider"></div>
        <section id={"presentations"}>{renderPresentations()}</section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={p.project}
          majorPublication={"chi2023-kato-lyric-app-framework"}
        />
        <div className="ui hidden divider"></div>
        <section id={"revisions"}>{renderRevisions()}</section>
        <div className="ui hidden divider"></div>
        <section id={"further-readings"}>{renderFurtherReadings()}</section>
      </SiteLayout>
    </>
  );
}
