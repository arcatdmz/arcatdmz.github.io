import { Grid, GridColumn } from "react-fomantic-ui";
import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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

  p = projectsTable["griffith"];
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
        <table className="ui striped very basic table">
          <tbody>
            <tr>
              <td className="three wide">{en ? "Where?" : "会場"}</td>
              <td className="thirteen wide">
                <div className="ui list">
                  <div className="item">
                    <i className="map pin icon"></i>
                    <div className="content">
                      {"Room 324 (Floor Level 3), Hawaii Convention Center"}
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
                      {"Mon, May 13 | 14:00 - 14:15"}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="three wide">{"CHI '24 Program"}</td>
              <td className="thirteen wide">
                <div className="ui list">
                  <div className="item">
                    <i className="book icon"></i>
                    <div className="content">
                      <a
                        href={
                          "https://programs.sigchi.org/chi/2024/program/content/147403"
                        }
                      >
                        {
                          "Griffith: A Storyboarding Tool Designed with Japanese Animation Professionals - CHI '24"
                        }
                      </a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="ui basic segment">
          <EmbedYoutube src={"//www.youtube.com/embed/rlJ1Fe53Lw8"} />
          <p className="caption">
            {en
              ? "CHI 2024 Video Preview (30s)"
              : "CHI 2024 Video Preview（30秒）"}
          </p>
        </div>
        <div className="ui basic segment">
          <EmbedYoutube src={"//www.youtube.com/embed/RWdw9rDRf7A"} />
          <p className="caption">
            {"CHI 2024 Pre-recorded Presentation Video"}
          </p>
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
          <div className="ui two stackable cards projects">
            <div className="card">
              <a className="image" href={"https://gsw.archinc.jp"}>
                <SiteImage
                  src={`${rootPath}griffith/griffith-stopwatch-thumbnail.png`}
                />
              </a>
              <div className="content">
                <a className="header" href={"https://gsw.archinc.jp"}>
                  {"Griffith Stopwatch"}
                </a>
                <p className="description">
                  {en
                    ? "Griffith Stopwatch is a web-based stopwatch tool with a user interface designed specifically for anime creators."
                    : "日本のアニメ制作に特化したユーザインタフェースを持つストップウォッチのWebアプリケーションです。"}
                </p>
              </div>
              <div className="extra content">
                <span className="right floated">
                  <i className="calendar icon"></i>
                  {"2024-"}
                </span>
              </div>
            </div>
            <div className="card">
              <SiteLink
                className="image"
                href={href(
                  en
                    ? "https://research.archinc.jp/en/griffith/sketch"
                    : "https://research.archinc.jp/griffith/sketch",
                )}
              >
                <SiteImage
                  src={`${rootPath}griffith/griffith-sketch-screenshot.png`}
                />
              </SiteLink>
              <div className="content">
                <SiteLink
                  className="header"
                  href={href(
                    en
                      ? "https://research.archinc.jp/en/griffith/sketch"
                      : "https://research.archinc.jp/griffith/sketch",
                  )}
                >
                  {"Griffith Sketch"}
                </SiteLink>
                <p className="description">
                  {en
                    ? "Griffith Sketch is a lightweight web-based sketching tool with a pressure-sensitive brush and easy layering."
                    : "感圧式キャンバスやレイヤー機能などを備えたシンプルなスケッチ用のWebアプリケーションです。"}
                </p>
              </div>
              <div className="extra content">
                <span className="right floated">
                  <i className="calendar icon"></i>
                  {"2020"}
                </span>
              </div>
            </div>
          </div>
          <div className="ui segment">
            <div className="ui divided items projects">
              <ProjectItem
                p={projectsTable["creativity-support-environments"]}
              />
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
            <div className="event">
              <div className="content">
                <div className="date">{"12/30/2025"}</div>
                <div className="summary">
                  {en ? "Added a link to Animāre" : "Animāreへのリンクを追加"}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"09/13/2024"}</div>
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
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero project={"griffith"} />
          </>
        }
      >
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Project summary" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <LocalizedContent
              ja={
                <p>
                  {
                    "Griffithは、日本のアニメ制作において設計図とも言うべき絵コンテのための、Webベースの制作支援ツールです。2018年にアニメプロデュース会社アーチでプロトタイプ開発に着手して以来、現場の監督などから幅広い協力を得て、実用に耐えるツールとして研究開発を継続してきました。"
                  }
                </p>
              }
            >
              <p>
                {
                  'The "E-conte," storyboard in English, is commonly referred to as the "blueprint" in Japanese animation (anime) production, serving as a communication medium with a prominent role in anime production. Griffith is a web-based E-conte authoring tool designed with Japanese animation professionals, as part of our long-term effort to intertwine artistic practice and scientific research.'
                }
              </p>
            </LocalizedContent>
          </div>
          <div className="ui basic right aligned segment">
            <SiteLink
              className="ui primary button"
              href={href(`${rootPath}${en ? "animare/" : "ja/animare"}`)}
            >
              {en ? "Animāre" : "Animāre（アニマーレ）"}
              <i className="chevron circle right icon"></i>
            </SiteLink>
            <SiteLink
              className="ui primary button"
              href={href(
                en
                  ? "https://research.archinc.jp/en/griffith/"
                  : "https://research.archinc.jp/griffith/",
              )}
            >
              {"Arch Research "}
              {en ? "project page" : "プロジェクトページ"}
              <i className="chevron circle right icon"></i>
            </SiteLink>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <Grid stackable columns={2}>
          <div className="row">
            <GridColumn>
              <section id={"presentations"}>{renderPresentations()}</section>
              <div className="ui hidden divider"></div>
            </GridColumn>
            <GridColumn>
              <section id={"further-readings"}>
                {renderFurtherReadings()}
              </section>
              <div className="ui hidden divider"></div>
            </GridColumn>
          </div>
        </Grid>
        <ProjectPublications
          project={p.project}
          majorPublication={"chi2024-kato-griffith"}
        />
        <div className="ui hidden divider"></div>
        <section id={"revisions"}>{renderRevisions()}</section>
      </SiteLayout>
    </>
  );
}
