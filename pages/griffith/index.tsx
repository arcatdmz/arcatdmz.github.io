import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from griffith/index.pug; edit this TSX source directly. */
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
  const lang: "en" | "ja" = "en";
  const en: boolean = true;
  const basePath = en ? rootPath : rootPath + "ja/";
  const author = en ? "Jun Kato" : "加藤 淳";
  let me: any,
    p: any,
    title: any,
    description: any,
    imageUrl: any,
    bodyClass: any;

  p = projectsTable["griffith"];
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
        <table className="ui striped very basic table">
          <tbody>
            <tr>
              <td className="three wide">{plainText(en ? "Where?" : "会場")}</td>
              <td className="thirteen wide">
                <div className="ui list">
                  <div className="item">
                    <i className="map pin icon"></i>
                    <div className="content">
                      {richText("Room 324 (Floor Level 3), Hawaii Convention Center")}
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
                    <div className="content">{richText("Mon, May 13 | 14:00 - 14:15")}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="three wide">{richText("CHI '24 Program")}</td>
              <td className="thirteen wide">
                <div className="ui list">
                  <div className="item">
                    <i className="book icon"></i>
                    <div className="content">
                      <a href={href("https://programs.sigchi.org/chi/2024/program/content/147403")}>
                        {richText(
                          "Griffith: A Storyboarding Tool Designed with Japanese Animation Professionals - CHI '24",
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="ui basic segment">
          {content.renderEmbedYoutube("//www.youtube.com/embed/rlJ1Fe53Lw8")}
          <p className="caption">
            {plainText(en ? "CHI 2024 Video Preview (30s)" : "CHI 2024 Video Preview（30秒）")}
          </p>
        </div>
        <div className="ui basic segment">
          {content.renderEmbedYoutube("//www.youtube.com/embed/RWdw9rDRf7A")}
          <p className="caption">{richText("CHI 2024 Pre-recorded Presentation Video")}</p>
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
          <div className="ui two stackable cards projects">
            <div className="card">
              <a className="image" href={href("https://gsw.archinc.jp")}>
                <img src={`${rootPath}griffith/griffith-stopwatch-thumbnail.png`} />
              </a>
              <div className="content">
                <a className="header" href={href("https://gsw.archinc.jp")}>
                  {richText("Griffith Stopwatch")}
                </a>
                <p className="description">
                  {plainText(
                    en
                      ? "Griffith Stopwatch is a web-based stopwatch tool with a user interface designed specifically for anime creators."
                      : "日本のアニメ制作に特化したユーザインタフェースを持つストップウォッチのWebアプリケーションです。",
                  )}
                </p>
              </div>
              <div className="extra content">
                <span className="right floated">
                  <i className="calendar icon"></i>
                  {richText("2024-")}
                </span>
              </div>
            </div>
            <div className="card">
              <a
                className="image"
                href={href(
                  en
                    ? "https://research.archinc.jp/en/griffith/sketch"
                    : "https://research.archinc.jp/griffith/sketch",
                )}
              >
                <img src={`${rootPath}griffith/griffith-sketch-screenshot.png`} />
              </a>
              <div className="content">
                <a
                  className="header"
                  href={href(
                    en
                      ? "https://research.archinc.jp/en/griffith/sketch"
                      : "https://research.archinc.jp/griffith/sketch",
                  )}
                >
                  {richText("Griffith Sketch")}
                </a>
                <p className="description">
                  {plainText(
                    en
                      ? "Griffith Sketch is a lightweight web-based sketching tool with a pressure-sensitive brush and easy layering."
                      : "感圧式キャンバスやレイヤー機能などを備えたシンプルなスケッチ用のWebアプリケーションです。",
                  )}
                </p>
              </div>
              <div className="extra content">
                <span className="right floated">
                  <i className="calendar icon"></i>
                  {richText("2020")}
                </span>
              </div>
            </div>
          </div>
          <div className="ui segment">
            <div className="ui divided items projects">
              {content.renderProjectItem(projectsTable["creativity-support-environments"])}
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
            <div className="event">
              <div className="content">
                <div className="date">{richText("12/30/2025")}</div>
                <div className="summary">
                  {plainText(en ? "Added a link to Animāre" : "Animāreへのリンクを追加")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("09/13/2024")}</div>
                <div className="summary">
                  {plainText(en ? "Added a project page" : "プロジェクトページを仮公開")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context} mainHero={<>{content.renderProjectHero("griffith")}</>}>
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Project summary" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "The &quot;E-conte,&quot; storyboard in English, is commonly referred to as the &quot;blueprint&quot; in Japanese animation (anime) production, serving as a communication medium with a prominent role in anime production. Griffith is a web-based E-conte authoring tool designed with Japanese animation professionals, as part of our long-term effort to intertwine artistic practice and scientific research.",
              )}
            </p>
          </div>
          <div className="ui basic right aligned segment">
            <a
              className="ui primary button"
              href={href(`${rootPath}${en ? "animare/" : "ja/animare"}`)}
            >
              {plainText(en ? "Animāre" : "Animāre（アニマーレ）")}
              <i className="chevron circle right icon"></i>
            </a>
            <a
              className="ui primary button"
              href={href(
                en
                  ? "https://research.archinc.jp/en/griffith/"
                  : "https://research.archinc.jp/griffith/",
              )}
            >
              {richText("Arch Research ")}
              {plainText(en ? "project page" : "プロジェクトページ")}
              <i className="chevron circle right icon"></i>
            </a>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="row">
            <div className="column">
              <section id={attribute("presentations")}>{renderPresentations()}</section>
              <div className="ui hidden divider"></div>
            </div>
            <div className="column">
              <section id={attribute("further-readings")}>{renderFurtherReadings()}</section>
              <div className="ui hidden divider"></div>
            </div>
          </div>
        </div>
        {content.renderProjectPublications(p.project, "chi2024-kato-griffith")}
        <div className="ui hidden divider"></div>
        <section id={attribute("revisions")}>{renderRevisions()}</section>
      </SiteLayout>
    </>
  );
}
