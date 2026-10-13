import { Popup } from "@/site/components/SiteWidgets";
import {
  MediaItem,
  ProjectItem,
  Publication,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href, attribute } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/timeline/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const {
    histories,
    awards,
    talks,
    lectures,
    projects,
    publications,
    mediaList,
    rootPath,
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

  title = en ? "Timeline" : "活動履歴";
  description = en
    ? "Timeline of Dr. Jun Kato's research and design portfolio, showing website updates and publication records in chronological order."
    : "加藤 淳の研究・デザインのポートフォリオWebサイトの活動履歴です。Webサイトの更新情報と発表文献を時系列で紹介しています。";
  me = "timeline/";
  bodyClass = "with-rail";
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
  function renderUpdate(entry: any = undefined): ReactNode {
    return (
      <>
        <div className="event">
          <div className="content">
            {entry ? (
              <>
                <div className="date">{entry.getDateString(lang, true)}</div>

                <div className="summary">
                  <HtmlContent html={entry.text} />
                </div>
              </>
            ) : (
              <>
                <div className="summary">
                  {en
                    ? "No updates found in this year."
                    : "この年の更新内容はありません。"}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
  function renderAll(f: any = undefined, y: any = undefined): ReactNode {
    return (
      <>
        {(() => {
          const children269: ReactNode[] = [];
          var as = [];
          for (const entry of awards) {
            if (en && entry.entryType === "domestic") continue;
            if (!f(entry.date.getFullYear())) continue;
            as.push(entry);
          }
          if (as.length > 0) {
            children269.push(<>{renderAwards(as, y)}</>);
          }
          var ts = [];
          for (const entry of talks) {
            if (entry.entryType === "private") continue;
            if (en && entry.entryType === "domestic") continue;
            if (!f(entry.date.getFullYear())) continue;
            ts.push(entry);
          }
          if (ts.length > 0) {
            children269.push(<>{renderTalks(ts, y)}</>);
          }
          var ls = [];
          for (const entry of lectures) {
            if (entry.entryType === "private") continue;
            if (en && entry.entryType === "domestic") continue;
            if (!entry.dates.reduce((p, c) => p || f(c.getFullYear()), false))
              continue;
            ls.push(entry);
          }
          if (ls.length > 0) {
            children269.push(<>{renderLectures(ls, y, f)}</>);
          }
          var prs = [];
          for (const p of projects) {
            if (p.isPrivateProject(lang)) continue;
            if (!p.year || typeof p.year.from !== "number") continue;
            if (!f(p.year.from)) continue;
            prs.push(p);
          }
          if (prs.length > 0) {
            children269.push(<>{renderProjects(prs, y)}</>);
          }
          var ms = [];
          for (const m of mediaList) {
            if (m.private || m.draft || !m.date) continue;
            if (en && !m.media.en) continue;
            if (!f(m.date.getFullYear())) continue;
            ms.push(m);
          }
          if (ms.length > 0) {
            children269.push(<>{renderMedia(ms, y)}</>);
          }
          var ps = [];
          for (const entry of publications) {
            if (!entry.entryTags) continue;
            if (en && entry.entryTags.language === "japanese") continue;
            if (!f(parseInt(entry.entryTags.year))) continue;
            ps.push(entry);
          }
          if (ps.length > 0) {
            children269.push(<>{renderPublications(ps, y)}</>);
          }
          return keyed(children269);
        })()}
      </>
    );
  }
  function renderAwards(as: any = undefined, y: any = undefined): ReactNode {
    let entry: any;
    return (
      <>
        <h3 className="ui header" id={attribute(`${y}-awards`)}>
          <i className="trophy icon"></i>
          {en ? "Awards" : "受賞"}
        </h3>
        <div className="ui segment">
          <div className="ui divided feed">
            {(() => {
              const children270: ReactNode[] = [];
              for (entry of as) {
                children270.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">
                          {entry.getDateString(lang, true)}
                        </div>
                        <div className="summary">
                          <HtmlContent html={entry.getText(lang)} />
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children270);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderTalks(ts: any = undefined, y: any = undefined): ReactNode {
    let entry: any;
    return (
      <>
        <h3 className="ui header" id={attribute(`${y}-talks`)}>
          <i className="talk icon"></i>
          {en ? "Invited Talks" : "招待講演"}
        </h3>
        <div className="ui segment">
          <div className="ui divided feed">
            {(() => {
              const children271: ReactNode[] = [];
              for (entry of ts) {
                children271.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">
                          {entry.getDateString(lang, true)}
                        </div>
                        <div className="summary">
                          <HtmlContent html={entry.getText(lang)} />
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children271);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderLectures(
    ls: any = undefined,
    y: any = undefined,
    f: any = undefined,
  ): ReactNode {
    let entry: any;
    return (
      <>
        <h3 className="ui header" id={attribute(`${y}-lectures`)}>
          <i className="graduation cap icon"></i>
          {en ? "Lectures" : "講義"}
        </h3>
        <div className="ui segment">
          <div className="ui divided feed">
            {(() => {
              const children272: ReactNode[] = [];
              for (entry of ls) {
                children272.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">
                          {entry.dateObjs
                            .filter((o) => f(o.date.getFullYear()))
                            .map((o) => o.getDateString(lang, true))
                            .join(", ")}
                        </div>
                        <div className="summary">
                          <HtmlContent html={entry.getText(lang)} />
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children272);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderProjects(prs: any = undefined, y: any = undefined): ReactNode {
    let p: any;
    return (
      <>
        <h3 className="ui header" id={attribute(`${y}-projects`)}>
          <i className="gift icon"></i>
          {en ? "New Projects" : "開始したプロジェクト"}
        </h3>
        <div className="ui segment">
          <div className="ui divided items projects">
            {(() => {
              const children273: ReactNode[] = [];
              for (p of prs) {
                children273.push(
                  <>
                    <ProjectItem p={p} />
                  </>,
                );
              }
              return keyed(children273);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderMedia(ms: any = undefined, y: any = undefined): ReactNode {
    let entry: any;
    return (
      <>
        <h3 className="ui header" id={attribute(`${y}-media`)}>
          <i className="broadcast tower icon"></i>
          {en ? "Media Coverage" : "メディア掲載"}
        </h3>
        <div className="ui segment">
          <div className="ui divided list media">
            {(() => {
              const children274: ReactNode[] = [];
              for (entry of ms) {
                children274.push(
                  <>
                    <MediaItem m={entry} />
                  </>,
                );
              }
              return keyed(children274);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderPublications(
    ps: any = undefined,
    y: any = undefined,
  ): ReactNode {
    let entry: any;
    return (
      <>
        <h3 className="ui header" id={attribute(`${y}-publications`)}>
          <i className="book icon"></i>
          {en ? "Publications" : "発表文献"}
        </h3>
        <div className="ui segment">
          <div className="ui divided list">
            {(() => {
              const children275: ReactNode[] = [];
              for (entry of ps) {
                children275.push(
                  <>
                    <Publication entry={entry} />
                  </>,
                );
              }
              return keyed(children275);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderTimelineMenu(): ReactNode {
    return (
      <>
        <div className="ui divided list">
          {(() => {
            const children276: ReactNode[] = [];
            children276.push(
              <>
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{title}</div>
                </a>
              </>,
            );
            const oldestYear = en ? 2011 : 2010;
            for (var year = buildYear; year >= oldestYear; year--) {
              children276.push(
                <>
                  <SiteLink className="item" href={href(`#${year}`)}>
                    <i className="right triangle icon"></i>
                    <div className="content">{year}</div>
                  </SiteLink>
                </>,
              );
            }
            return keyed(children276);
          })()}
        </div>
      </>
    );
  }
  function renderTimeline(): ReactNode {
    return (
      <>
        {(() => {
          const children277: ReactNode[] = [];
          children277.push(
            <>
              <section>
                <h1 className="ui header">
                  <i className="history icon"></i>
                  <div className="content">{title}</div>
                </h1>
                <p>
                  {"このページではWebサイトの更新情報と"}
                  <SiteLink href={href(`${rootPath}ja/publications`)}>
                    <i className="book icon"></i>
                    {"発表文献"}
                  </SiteLink>
                  {"を時系列で見ることができます。"}
                </p>
              </section>
            </>,
          );
          var i = 0,
            year = buildYear;
          while (i < histories[lang].length) {
            const y = year;
            children277.push(
              <>
                <div className="ui hidden divider"></div>
              </>,
            );
            children277.push(
              <>
                <section id={attribute(y)}>
                  <h2 className="ui header">{en ? y : `${y}年`}</h2>

                  {en ? (
                    <>
                      <p>
                        {"To view only the activities in this year, click "}
                        <SiteLink href={href(`${basePath}timeline/${y}/`)}>
                          {"here"}
                        </SiteLink>
                        {"."}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        {"この年の活動だけを表示するには"}
                        <SiteLink href={href(`${basePath}timeline/${y}/`)}>
                          {"こちら"}
                        </SiteLink>
                        {"をクリックしてください。"}
                      </p>
                    </>
                  )}

                  <h3 className="ui header" id={attribute(`${y}-updates`)}>
                    <i className="announcement icon"></i>
                    {en ? "Updates" : "更新情報"}
                  </h3>

                  <div className="ui segment">
                    <div className="ui divided feed">
                      {(() => {
                        const children279: ReactNode[] = [];
                        var i_ = i;
                        while (i < histories[lang].length) {
                          const entry = histories[lang][i];
                          if (entry.date.getFullYear() !== year) {
                            year = entry.date.getFullYear();
                            break;
                          }
                          children279.push(<>{renderUpdate(entry)}</>);
                          i++;
                        }
                        if (i === i_) {
                          children279.push(<>{renderUpdate(null)}</>);
                        }
                        return keyed(children279);
                      })()}
                    </div>
                  </div>

                  {renderAll(function (year) {
                    return y === year;
                  }, y)}
                </section>
              </>,
            );
          }
          const y = --year;
          children277.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children277.push(
            <>
              <section id={attribute(y)}>
                <h2 className="ui header">
                  {en ? `${y} and before` : `${y}年とそれ以前`}
                </h2>
                {renderAll(function (year) {
                  return y >= year;
                }, y)}
              </section>
            </>,
          );
          return keyed(children277);
        })()}
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        postFooter={
          <>
            <Popup className="ui hidden popup-menu popup" position="top left" trigger={<a className="ui circular icon popup-menu large grey hidden mobile-only button">
              <i className="sidebar icon"></i>
            </a>}>
              {renderTimelineMenu()}
            </Popup>
          </>
        }
      >
        <div className="left-rail">{renderTimelineMenu()}</div>
        <div className="right-content">{renderTimeline()}</div>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/ja/timeline/") }, "/ja/timeline/") };
}
