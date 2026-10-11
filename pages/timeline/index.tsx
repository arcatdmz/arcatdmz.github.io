import { buildYear } from "@/site/clock";
import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from timeline/index.pug; edit this TSX source directly. */
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

  title = en ? "Timeline" : "活動履歴";
  description = en
    ? "Timeline of Dr. Jun Kato's research and design portfolio, showing website updates and publication records in chronological order."
    : "加藤 淳の研究・デザインのポートフォリオWebサイトの活動履歴です。Webサイトの更新情報と発表文献を時系列で紹介しています。";
  me = "timeline/";
  bodyClass = "with-rail";
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
  function renderUpdate(entry: any = undefined): ReactNode {
    return (
      <>
        <div className="event">
          <div className="content">
            {(() => {
              const children156: ReactNode[] = [];
              if (entry) {
                children156.push(
                  <>
                    <div className="date">{plainText(entry.getDateString(lang, true))}</div>
                  </>,
                );
                children156.push(
                  <>
                    <div className="summary">{richText(entry.text)}</div>
                  </>,
                );
              } else {
                children156.push(
                  <>
                    <div className="summary">
                      {plainText(
                        en ? "No updates found in this year." : "この年の更新内容はありません。",
                      )}
                    </div>
                  </>,
                );
              }
              return keyed(children156);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderAll(f: any = undefined, y: any = undefined): ReactNode {
    return (
      <>
        {(() => {
          const children157: ReactNode[] = [];
          var as = [];
          for (const entry of awards) {
            if (en && entry.entryType === "domestic") continue;
            if (!f(entry.date.getFullYear())) continue;
            as.push(entry);
          }
          if (as.length > 0) {
            children157.push(<>{renderAwards(as, y)}</>);
          }
          var ts = [];
          for (const entry of talks) {
            if (entry.entryType === "private") continue;
            if (en && entry.entryType === "domestic") continue;
            if (!f(entry.date.getFullYear())) continue;
            ts.push(entry);
          }
          if (ts.length > 0) {
            children157.push(<>{renderTalks(ts, y)}</>);
          }
          var ls = [];
          for (const entry of lectures) {
            if (entry.entryType === "private") continue;
            if (en && entry.entryType === "domestic") continue;
            if (!entry.dates.reduce((p, c) => p || f(c.getFullYear()), false)) continue;
            ls.push(entry);
          }
          if (ls.length > 0) {
            children157.push(<>{renderLectures(ls, y, f)}</>);
          }
          var prs = [];
          for (const p of projects) {
            if (p.isPrivateProject(lang)) continue;
            if (!p.year || typeof p.year.from !== "number") continue;
            if (!f(p.year.from)) continue;
            prs.push(p);
          }
          if (prs.length > 0) {
            children157.push(<>{renderProjects(prs, y)}</>);
          }
          var ms = [];
          for (const m of mediaList) {
            if (m.private || m.draft || !m.date) continue;
            if (en && !m.media.en) continue;
            if (!f(m.date.getFullYear())) continue;
            ms.push(m);
          }
          if (ms.length > 0) {
            children157.push(<>{renderMedia(ms, y)}</>);
          }
          var ps = [];
          for (const entry of publications) {
            if (!entry.entryTags) continue;
            if (en && entry.entryTags.language === "japanese") continue;
            if (!f(parseInt(entry.entryTags.year))) continue;
            ps.push(entry);
          }
          if (ps.length > 0) {
            children157.push(<>{renderPublications(ps, y)}</>);
          }
          return keyed(children157);
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
          {plainText(en ? "Awards" : "受賞")}
        </h3>
        <div className="ui segment">
          <div className="ui divided feed">
            {(() => {
              const children158: ReactNode[] = [];
              for (entry of as) {
                children158.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{plainText(entry.getDateString(lang, true))}</div>
                        <div className="summary">{richText(entry.getText(lang))}</div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children158);
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
          {plainText(en ? "Invited Talks" : "招待講演")}
        </h3>
        <div className="ui segment">
          <div className="ui divided feed">
            {(() => {
              const children159: ReactNode[] = [];
              for (entry of ts) {
                children159.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">{plainText(entry.getDateString(lang, true))}</div>
                        <div className="summary">{richText(entry.getText(lang))}</div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children159);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderLectures(ls: any = undefined, y: any = undefined, f: any = undefined): ReactNode {
    let entry: any;
    return (
      <>
        <h3 className="ui header" id={attribute(`${y}-lectures`)}>
          <i className="graduation cap icon"></i>
          {plainText(en ? "Lectures" : "講義")}
        </h3>
        <div className="ui segment">
          <div className="ui divided feed">
            {(() => {
              const children160: ReactNode[] = [];
              for (entry of ls) {
                children160.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">
                          {plainText(
                            entry.dateObjs
                              .filter((o) => f(o.date.getFullYear()))
                              .map((o) => o.getDateString(lang, true))
                              .join(", "),
                          )}
                        </div>
                        <div className="summary">{richText(entry.getText(lang))}</div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children160);
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
          {plainText(en ? "New Projects" : "開始したプロジェクト")}
        </h3>
        <div className="ui segment">
          <div className="ui divided items projects">
            {(() => {
              const children161: ReactNode[] = [];
              for (p of prs) {
                children161.push(<>{content.renderProjectItem(p)}</>);
              }
              return keyed(children161);
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
          {plainText(en ? "Media Coverage" : "メディア掲載")}
        </h3>
        <div className="ui segment">
          <div className="ui divided list media">
            {(() => {
              const children162: ReactNode[] = [];
              for (entry of ms) {
                children162.push(<>{content.renderMediaItem(entry)}</>);
              }
              return keyed(children162);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderPublications(ps: any = undefined, y: any = undefined): ReactNode {
    let entry: any;
    return (
      <>
        <h3 className="ui header" id={attribute(`${y}-publications`)}>
          <i className="book icon"></i>
          {plainText(en ? "Publications" : "発表文献")}
        </h3>
        <div className="ui segment">
          <div className="ui divided list">
            {(() => {
              const children163: ReactNode[] = [];
              for (entry of ps) {
                children163.push(<>{content.renderPublication(entry)}</>);
              }
              return keyed(children163);
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
            const children164: ReactNode[] = [];
            children164.push(
              <>
                <a className="item" href={href("#body")}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{plainText(title)}</div>
                </a>
              </>,
            );
            const oldestYear = en ? 2011 : 2010;
            for (var year = buildYear; year >= oldestYear; year--) {
              children164.push(
                <>
                  <a className="item" href={href(`#${year}`)}>
                    <i className="right triangle icon"></i>
                    <div className="content">{plainText(year)}</div>
                  </a>
                </>,
              );
            }
            return keyed(children164);
          })()}
        </div>
      </>
    );
  }
  function renderTimeline(): ReactNode {
    return (
      <>
        {(() => {
          const children165: ReactNode[] = [];
          children165.push(
            <>
              <section>
                <h1 className="ui header">
                  <i className="history icon"></i>
                  <div className="content">{plainText(title)}</div>
                </h1>
                <p>
                  {richText("This page shows updates to the website as well as ")}
                  <a href={href(`${rootPath}publications`)}>
                    <i className="book icon"></i>
                    {richText("publication records")}
                  </a>
                  {richText(" in their chronological order.")}
                </p>
              </section>
            </>,
          );
          var i = 0,
            year = buildYear;
          while (i < histories[lang].length) {
            const y = year;
            children165.push(
              <>
                <div className="ui hidden divider"></div>
              </>,
            );
            children165.push(
              <>
                <section id={attribute(y)}>
                  {(() => {
                    const children166: ReactNode[] = [];
                    children166.push(
                      <>
                        <h2 className="ui header">{plainText(en ? y : `${y}年`)}</h2>
                      </>,
                    );
                    if (en) {
                      children166.push(
                        <>
                          <p>
                            {richText("To view only the activities in this year, click ")}
                            <a href={href(`${basePath}timeline/${y}/`)}>{richText("here")}</a>
                            {richText(".")}
                          </p>
                        </>,
                      );
                    } else {
                      children166.push(
                        <>
                          <p>
                            {richText("この年の活動だけを表示するには")}
                            <a href={href(`${basePath}timeline/${y}/`)}>{richText("こちら")}</a>
                            {richText("をクリックしてください。")}
                          </p>
                        </>,
                      );
                    }
                    children166.push(
                      <>
                        <h3 className="ui header" id={attribute(`${y}-updates`)}>
                          <i className="announcement icon"></i>
                          {plainText(en ? "Updates" : "更新情報")}
                        </h3>
                      </>,
                    );
                    children166.push(
                      <>
                        <div className="ui segment">
                          <div className="ui divided feed">
                            {(() => {
                              const children167: ReactNode[] = [];
                              var i_ = i;
                              while (i < histories[lang].length) {
                                const entry = histories[lang][i];
                                if (entry.date.getFullYear() !== year) {
                                  year = entry.date.getFullYear();
                                  break;
                                }
                                children167.push(<>{renderUpdate(entry)}</>);
                                i++;
                              }
                              if (i === i_) {
                                children167.push(<>{renderUpdate(null)}</>);
                              }
                              return keyed(children167);
                            })()}
                          </div>
                        </div>
                      </>,
                    );
                    children166.push(
                      <>
                        {renderAll(function (year) {
                          return y === year;
                        }, y)}
                      </>,
                    );
                    return keyed(children166);
                  })()}
                </section>
              </>,
            );
          }
          const y = --year;
          children165.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children165.push(
            <>
              <section id={attribute(y)}>
                <h2 className="ui header">{plainText(en ? `${y} and before` : `${y}年とそれ以前`)}</h2>
                {renderAll(function (year) {
                  return y >= year;
                }, y)}
              </section>
            </>,
          );
          return keyed(children165);
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
            <a className="ui circular icon popup-menu large grey hidden mobile-only button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">{renderTimelineMenu()}</div>
          </>
        }
      >
        <div className="left-rail">{renderTimelineMenu()}</div>
        <div className="right-content">{renderTimeline()}</div>
      </SiteLayout>
    </>
  );
}
