import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import {
  classNames,
  style,
  text as plainText,
  keyed,
  href,
  attribute,
} from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/animare/index.pug; edit this TSX source directly. */
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

  p = projectsTable["animare"];
  title = p.getTitle(lang);
  me = "animare/";
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
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="gift icon"></i>
          <div className="content">
            {plainText(en ? "Relevant projects" : "関連プロジェクト")}
          </div>
        </h2>
        <div className="ui basic segment">
          <div className="ui segment">
            <div className="ui divided items projects">
              {content.renderProjectItem(projectsTable["anime-sig"])}
              {content.renderProjectItem(projectsTable["griffith"])}
            </div>
          </div>
        </div>
        <div className="ui basic segment">
          <p>
            {plainText(
              en
                ? "I have also organized and hosted related events."
                : "他にも関連イベントを主催・開催してきました。",
            )}
          </p>
          <div className="ui segment">
            <div className="ui divided items projects">
              {(() => {
                const children187: ReactNode[] = [];
                for (const e of misc.miscellaneous["past-anime-events"]) {
                  children187.push(
                    <>
                      <a className="item" href={href(e.url)}>
                        <div className="content">
                          <div className="header">{plainText(e.title)}</div>
                          <div className="extra">
                            <span className="right floated">
                              <i className="calendar icon"></i>
                              {plainText(
                                en ? e.dates : (e.ja && e.ja.dates) || e.dates,
                              )}
                            </span>
                          </div>
                        </div>
                      </a>
                    </>,
                  );
                }
                return keyed(children187);
              })()}
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
          <div className="content">
            {plainText(en ? "Publications" : "発表文献")}
          </div>
        </h2>
        <div className="ui basic segment">
          <div className="ui divided list">
            {(() => {
              const children188: ReactNode[] = [];
              for (const entry of publications) {
                if (entry.getFundings().indexOf("JST CRONOS JPMJCS25K1") < 0)
                  continue;
                children188.push(<>{content.renderPublication(entry)}</>);
              }
              return keyed(children188);
            })()}
          </div>
          <div className="ui divider"></div>
          <p>
            {plainText(
              en
                ? "The following is a full list of past publications (including non-archival ones)."
                : "過去の発表文献のうち内容面で本プロジェクトに関係するものは以下のとおりです。",
            )}
          </p>
          <div className="ui divider"></div>
          <div className="ui divided list">
            {(() => {
              const children189: ReactNode[] = [];
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
                children189.push(
                  <>{content.renderPublication(publicationsTable[pubId])}</>,
                );
              }
              return keyed(children189);
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
          const children190: ReactNode[] = [];
          const filteredMediaList = mediaList.filter(
            (entry) =>
              !entry.private &&
              !entry.draft &&
              entry.tags &&
              entry.tags.includes("anime"),
          );
          children190.push(
            <>
              <h2 className="ui header">
                {richText(" ")}
                <i className="broadcast tower icon"></i>
                <div className="content">
                  {plainText(en ? "Media coverage" : "メディア掲載")}
                </div>
              </h2>
            </>,
          );
          children190.push(
            <>
              <div className="ui basic segment">
                <div className="ui divided relaxed list media">
                  {(() => {
                    const children191: ReactNode[] = [];
                    for (const entry of filteredMediaList) {
                      children191.push(
                        <>{content.renderMediaItem(entry, false)}</>,
                      );
                    }
                    return keyed(children191);
                  })()}
                </div>
              </div>
            </>,
          );
          return keyed(children190);
        })()}
      </>
    );
  }
  function renderRevision(): ReactNode {
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
                <div className="date">{richText("2026/3/29")}</div>
                <div className="summary">
                  {richText(
                    'プロジェクト関連の発表文献を追加（例: <a href="https://junkato.jp/publications/undonecs2026-kato-anime-rnd-slides.pdf">UndoneCS \'26 講演スライド</a>）',
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2025/12/30")}</div>
                <div className="summary">
                  {richText("Animareのビジュアルを更新")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2025/12/19")}</div>
                <div className="summary">
                  {richText("公式ページへのリンクを追加")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2025/9/14")}</div>
                <div className="summary">
                  {richText("プロジェクトページを仮公開")}
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
        mainHero={<>{content.renderProjectHero("animare")}</>}
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden mobile-only button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#body")}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">
                    {plainText(en ? "Top" : "トップ")}
                  </div>
                </a>
                <a className="item" href={href("#abstract")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Abstract" : "概要")}
                  </div>
                </a>
                <a className="item" href={href("#further-readings")}>
                  <i className="gift icon"></i>
                  <div className="content">
                    {plainText(en ? "Relevant projects" : "関連プロジェクト")}
                  </div>
                </a>
                <a className="item" href={href("#publications")}>
                  <i className="book icon"></i>
                  <div className="content">
                    {plainText(en ? "Publications" : "発表文献")}
                  </div>
                </a>
                <a className="item" href={href("#media")}>
                  <i className="broadcast tower icon"></i>
                  <div className="content">
                    {plainText(en ? "Media coverage" : "メディア掲載")}
                  </div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Summary" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>{richText(p.getDescription(lang))}</p>
            <p>
              {richText(
                en
                  ? "This project is being advanced in collaboration with Co-PIs Maejima (OLM Digital Inc.) and Koyama (The University of Tokyo). This page mainly serves to publicize the related achievements of the Kato group."
                  : '本プロジェクトは<a href="https://www.jst.go.jp/kisoken/presto/">JST さきがけ</a>（JPMJPR25I1）および<a href="https://www.jst.go.jp/kisoken/cronos/">JST CRONOS</a>（JPMJCS25K1）の支援の下で前島（OLM Digital; CRONOS Co-PI）、小山（東京大学; CRONOS Co-PI）および産学官のコミュニティとともに進めるものです。本ページは主に加藤個人の関連成果を広報しています。',
              )}
            </p>
            <div className="ui hidden divider"></div>
            <div className="ui stackable two columns grid">
              <div className="column">
                <img
                  className="ui fluid image"
                  src={`${basePath}animare/animare-workflow.jpg`}
                />
                <p className="caption">
                  {plainText(
                    en
                      ? "A representative anime production workflow and the strengths of each group"
                      : "代表的なアニメ制作のワークフローと各グループの担当範囲",
                  )}
                </p>
              </div>
              <div className="column">
                <img
                  className="ui fluid image"
                  src={`${rootPath}images/panels/${
                    en ? "animare" : "animare-ja"
                  }.png`}
                />
                <p className="caption">
                  {plainText(
                    en
                      ? "A mutually beneficial platform for anime production to be built in the project"
                      : "プロジェクトで構築を目指す互恵的プラットフォーム",
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="ui basic center aligned segment">
            <a
              className="ui primary huge button"
              href={href("https://anime.pj.aist.go.jp")}
            >
              {plainText(
                en ? "CRONOS project website" : "CRONOS プロジェクトページ",
              )}
              <i className="chevron circle right icon"></i>
            </a>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("further-readings")}>
          {renderFurtherReadings()}
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("publications")}>{renderPublications()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("media")}>{renderMedia()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("revision")}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}
