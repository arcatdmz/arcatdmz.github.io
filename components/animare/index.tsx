import { Popup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { SiteLink } from "@/site/components/SiteLink";
import { Fragment, type ReactNode } from "react";
import {
  MediaItem,
  ProjectHero,
  ProjectItem,
  Publication,
} from "@/site/components/ContentComponents";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: news. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const {
    projectsTable,
    publications,
    publicationsTable,
    mediaList,
    misc,
    rootPath,
  } = data;
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

  p = projectsTable["animare"];
  title = p.getTitle(lang);
  me = "animare/";
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
              <ProjectItem p={projectsTable["anime-sig"]} />
              <ProjectItem p={projectsTable["griffith"]} />
            </div>
          </div>
        </div>
        <div className="ui basic segment">
          <p>
            {en
              ? "I have also organized and hosted related events."
              : "他にも関連イベントを主催・開催してきました。"}
          </p>
          <div className="ui segment">
            <div className="ui divided items projects">
              {misc.miscellaneous["past-anime-events"].map((e, itemIndex) => (
                <Fragment key={itemIndex}>
                  <SiteLink className="item" href={href(e.url)}>
                    <div className="content">
                      <div className="header">{e.title}</div>
                      <div className="extra">
                        <span className="right floated">
                          <i className="calendar icon"></i>
                          {en ? e.dates : (e.ja && e.ja.dates) || e.dates}
                        </span>
                      </div>
                    </div>
                  </SiteLink>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderPublications(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="book icon"></i>
          <div className="content">{en ? "Publications" : "発表文献"}</div>
        </h2>
        <div className="ui basic segment">
          <div className="ui divided list">
            {(() => {
              const children: ReactNode[] = [];
              for (const entry of publications) {
                if (entry.getFundings().indexOf("JST CRONOS JPMJCS25K1") < 0)
                  continue;
                children.push(
                  <>
                    <Publication entry={entry} />
                  </>,
                );
              }
              return keyed(children);
            })()}
          </div>
          <div className="ui divider"></div>
          <p>
            {en
              ? "The following is a full list of past publications (including non-archival ones)."
              : "過去の発表文献のうち内容面で本プロジェクトに関係するものは以下のとおりです。"}
          </p>
          <div className="ui divider"></div>
          <div className="ui divided list">
            {(() => {
              const children: ReactNode[] = [];
              for (const pubId of [
                "chi2025-kato-animesig",
                "chi2025-kato-postgrowth-cst",
                "chi2025-mandai-super-kawaii-vocalics",
                "sa2024-todo-style-transfer",
                !en && "vc2024-kato-toolsmiths-in-anime",
                "chi2024-kato-griffith",
                "xrds2023summer-kato-toolsmith",
                "sas2023-kato-lights-animation-interaction",
                !en && "hi25-kato-ui-design-for-authoring-videos",
                "chi2023-kato-sigccc",
                !en && "jssst39-1-kato-toolsmith",
                "sas2022-kato-toolsmiths-in-anime",
                "isid2022-kato-toolsmiths-in-anime",
                "sas2021-kato-storyboarding-in-anime",
                "isid2021-kato-anime-storyboards",
              ]) {
                if (!publicationsTable[pubId]) continue;
                children.push(
                  <>
                    <Publication entry={publicationsTable[pubId]} />
                  </>,
                );
              }
              return keyed(children);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderMedia(): ReactNode {
    return (
      <>
        {(() => {
          const children: ReactNode[] = [];
          const filteredMediaList = mediaList.filter(
            (entry) =>
              !entry.private &&
              !entry.draft &&
              entry.tags &&
              entry.tags.includes("anime"),
          );
          children.push(
            <>
              <h2 className="ui header">
                {" "}
                <i className="broadcast tower icon"></i>
                <div className="content">
                  {en ? "Media coverage" : "メディア掲載"}
                </div>
              </h2>
            </>,
          );
          children.push(
            <>
              <div className="ui basic segment">
                <div className="ui divided relaxed list media">
                  {filteredMediaList.map((entry, itemIndex) => (
                    <Fragment key={itemIndex}>
                      <MediaItem m={entry} withLabel={false} />
                    </Fragment>
                  ))}
                </div>
              </div>
            </>,
          );
          return keyed(children);
        })()}
      </>
    );
  }
  function renderRevision(): ReactNode {
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
                <div className="date">{en ? "3/29/2026" : "2026/3/29"}</div>
                <div className="summary">
                  {en
                    ? "Add publications funded by the project (e.g., "
                    : "プロジェクト関連の発表文献を追加（例: "}
                  <SiteLink
                    href={
                      en
                        ? "https://junkato.jp/publications/undonecs2026-kato-anime-rnd.pdf"
                        : "https://junkato.jp/publications/undonecs2026-kato-anime-rnd-slides.pdf"
                    }
                  >
                    {en ? "a talk" : "UndoneCS '26 講演スライド"}
                  </SiteLink>
                  {en ? " at UndoneCS '26)." : "）"}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{en ? "12/30/2025" : "2025/12/30"}</div>
                <div className="summary">
                  {en ? "Update Animare visuals." : "Animareのビジュアルを更新"}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{en ? "12/19/2025" : "2025/12/19"}</div>
                <div className="summary">
                  {en
                    ? "Add link to the project website."
                    : "公式ページへのリンクを追加"}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{en ? "9/14/2025" : "2025/9/14"}</div>
                <div className="summary">
                  {en
                    ? "Upload the initial revision."
                    : "プロジェクトページを仮公開"}
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
            <ProjectHero project={"animare"} />
          </>
        }
        postFooter={
          <>
            <Popup
              className="ui hidden popup-menu popup"
              position="top left"
              trigger={
                <a className="ui circular icon popup-menu large grey hidden mobile-only button">
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
                <a className="item" href={"#further-readings"}>
                  <i className="gift icon"></i>
                  <div className="content">
                    {en ? "Relevant projects" : "関連プロジェクト"}
                  </div>
                </a>
                <a className="item" href={"#publications"}>
                  <i className="book icon"></i>
                  <div className="content">
                    {en ? "Publications" : "発表文献"}
                  </div>
                </a>
                <a className="item" href={"#media"}>
                  <i className="broadcast tower icon"></i>
                  <div className="content">
                    {en ? "Media coverage" : "メディア掲載"}
                  </div>
                </a>
              </div>
            </Popup>
          </>
        }
      >
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Summary" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              <HtmlContent html={p.getDescription(lang)} />
            </p>
            <p>
              <HtmlContent
                html={
                  en
                    ? "This project is being advanced in collaboration with Co-PIs Maejima (OLM Digital Inc.) and Koyama (The University of Tokyo). This page mainly serves to publicize the related achievements of the Kato group."
                    : '本プロジェクトは<a href="https://www.jst.go.jp/kisoken/presto/">JST さきがけ</a>（JPMJPR25I1）および<a href="https://www.jst.go.jp/kisoken/cronos/">JST CRONOS</a>（JPMJCS25K1）の支援の下で前島（OLM Digital; CRONOS Co-PI）、小山（東京大学; CRONOS Co-PI）および産学官のコミュニティとともに進めるものです。本ページは主に加藤個人の関連成果を広報しています。'
                }
              />
            </p>
            <div className="ui hidden divider"></div>
            <div className="ui stackable two columns grid">
              <div className="column">
                <SiteImage
                  className="ui fluid image"
                  src={`${basePath}animare/animare-workflow.jpg`}
                />
                <p className="caption">
                  {en
                    ? "A representative anime production workflow and the strengths of each group"
                    : "代表的なアニメ制作のワークフローと各グループの担当範囲"}
                </p>
              </div>
              <div className="column">
                <SiteImage
                  className="ui fluid image"
                  src={`${rootPath}images/panels/${
                    en ? "animare" : "animare-ja"
                  }.png`}
                />
                <p className="caption">
                  {en
                    ? "A mutually beneficial platform for anime production to be built in the project"
                    : "プロジェクトで構築を目指す互恵的プラットフォーム"}
                </p>
              </div>
            </div>
          </div>
          <div className="ui basic center aligned segment">
            <a
              className="ui primary huge button"
              href={"https://anime.pj.aist.go.jp"}
            >
              {en ? "CRONOS project website" : "CRONOS プロジェクトページ"}
              <i className="chevron circle right icon"></i>
            </a>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"further-readings"}>{renderFurtherReadings()}</section>
        <div className="ui hidden divider"></div>
        <section id={"publications"}>{renderPublications()}</section>
        <div className="ui hidden divider"></div>
        <section id={"media"}>{renderMedia()}</section>
        <div className="ui hidden divider"></div>
        <section id={"revision"}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}
