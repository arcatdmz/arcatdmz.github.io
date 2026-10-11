import { buildYear } from "@/site/clock";
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
export function getStaticPaths() {
  return {
    paths: Array.from({ length: buildYear - 2011 + 1 }, (_, i) => ({
      params: { year: String(2011 + i) },
    })),
    fallback: false,
  };
}
export function getStaticProps({ params }: { params: { year: string } }) {
  return { props: { pageYear: Number(params.year) } };
}
/** React page migrated from timeline/_year.pug; edit this TSX source directly. */
export default function Page({ pageYear }: { pageYear: number }) {
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

  title = en ? `Timeline (${pageYear})` : `${pageYear}年の活動履歴`;
  description = en
    ? `Timeline of Dr. Jun Kato's research and design portfolio, showing ${pageYear} website updates and publication records.`
    : `加藤 淳の研究・デザインのポートフォリオWebサイトにおける${pageYear}年の活動履歴です。Webサイトの更新情報と発表文献を紹介しています。`;
  me = `timeline/${pageYear}/`;
  bodyClass = "with-rail";
  const currentYear = buildYear;
  const oldestYear = en ? 2011 : 2010;
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
              const children280: ReactNode[] = [];
              if (entry) {
                children280.push(
                  <>
                    <div className="date">
                      {plainText(entry.getDateString(lang, true))}
                    </div>
                  </>,
                );
                children280.push(
                  <>
                    <div className="summary">{richText(entry.text)}</div>
                  </>,
                );
              } else {
                children280.push(
                  <>
                    <div className="summary">
                      {plainText(
                        en
                          ? "No updates found in this year."
                          : "この年の更新内容はありません。",
                      )}
                    </div>
                  </>,
                );
              }
              return keyed(children280);
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
          const children281: ReactNode[] = [];
          var as = [];
          for (const entry of awards) {
            if (en && entry.entryType === "domestic") continue;
            if (!f(entry.date.getFullYear())) continue;
            as.push(entry);
          }
          if (as.length > 0) {
            children281.push(<>{renderAwards(as, y)}</>);
          }
          var ts = [];
          for (const entry of talks) {
            if (entry.entryType === "private") continue;
            if (en && entry.entryType === "domestic") continue;
            if (!f(entry.date.getFullYear())) continue;
            ts.push(entry);
          }
          if (ts.length > 0) {
            children281.push(<>{renderTalks(ts, y)}</>);
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
            children281.push(<>{renderLectures(ls, y, f)}</>);
          }
          var prs = [];
          for (const p of projects) {
            if (p.isPrivateProject(lang)) continue;
            if (!p.year || typeof p.year.from !== "number") continue;
            if (!f(p.year.from)) continue;
            prs.push(p);
          }
          if (prs.length > 0) {
            children281.push(<>{renderProjects(prs, y)}</>);
          }
          var ms = [];
          for (const m of mediaList) {
            if (m.private || m.draft || !m.date) continue;
            if (en && !m.media.en) continue;
            if (!f(m.date.getFullYear())) continue;
            ms.push(m);
          }
          if (ms.length > 0) {
            children281.push(<>{renderMedia(ms, y)}</>);
          }
          var ps = [];
          for (const entry of publications) {
            if (!entry.entryTags) continue;
            if (en && entry.entryTags.language === "japanese") continue;
            if (!f(parseInt(entry.entryTags.year))) continue;
            ps.push(entry);
          }
          if (ps.length > 0) {
            children281.push(<>{renderPublications(ps, y)}</>);
          }
          return keyed(children281);
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
              const children282: ReactNode[] = [];
              for (entry of as) {
                children282.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">
                          {plainText(entry.getDateString(lang, true))}
                        </div>
                        <div className="summary">
                          {richText(entry.getText(lang))}
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children282);
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
              const children283: ReactNode[] = [];
              for (entry of ts) {
                children283.push(
                  <>
                    <div className="event">
                      <div className="content">
                        <div className="date">
                          {plainText(entry.getDateString(lang, true))}
                        </div>
                        <div className="summary">
                          {richText(entry.getText(lang))}
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children283);
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
          {plainText(en ? "Lectures" : "講義")}
        </h3>
        <div className="ui segment">
          <div className="ui divided feed">
            {(() => {
              const children284: ReactNode[] = [];
              for (entry of ls) {
                children284.push(
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
                        <div className="summary">
                          {richText(entry.getText(lang))}
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children284);
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
              const children285: ReactNode[] = [];
              for (p of prs) {
                children285.push(<>{content.renderProjectItem(p)}</>);
              }
              return keyed(children285);
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
              const children286: ReactNode[] = [];
              for (entry of ms) {
                children286.push(<>{content.renderMediaItem(entry)}</>);
              }
              return keyed(children286);
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
          {plainText(en ? "Publications" : "発表文献")}
        </h3>
        <div className="ui segment">
          <div className="ui divided list">
            {(() => {
              const children287: ReactNode[] = [];
              for (entry of ps) {
                children287.push(<>{content.renderPublication(entry)}</>);
              }
              return keyed(children287);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderTimelineYearNav(): ReactNode {
    return (
      <>
        <div className="ui divided list">
          {(() => {
            const children288: ReactNode[] = [];
            children288.push(
              <>
                <a className="item" href={href(`${basePath}timeline/`)}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">
                    {plainText(en ? "Timeline" : "活動履歴")}
                  </div>
                </a>
              </>,
            );
            if (pageYear < currentYear) {
              children288.push(
                <>
                  <a
                    className="item"
                    href={href(`${basePath}timeline/${pageYear + 1}/`)}
                  >
                    <i className="arrow up icon"></i>
                    <div className="content">{plainText(pageYear + 1)}</div>
                  </a>
                </>,
              );
            }
            if (pageYear > oldestYear) {
              children288.push(
                <>
                  <a
                    className="item"
                    href={href(`${basePath}timeline/${pageYear - 1}/`)}
                  >
                    <i className="arrow down icon"></i>
                    <div className="content">{plainText(pageYear - 1)}</div>
                  </a>
                </>,
              );
            }
            return keyed(children288);
          })()}
        </div>
      </>
    );
  }
  function renderYearContent(): ReactNode {
    return (
      <>
        {(() => {
          const children289: ReactNode[] = [];
          var yearHistories = [];
          for (const entry of histories[lang]) {
            if (entry.date.getFullYear() === pageYear)
              yearHistories.push(entry);
          }
          children289.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children289.push(
            <>
              <section id={attribute(pageYear)}>
                <h3 className="ui header" id={attribute(`${pageYear}-updates`)}>
                  <i className="announcement icon"></i>
                  {plainText(en ? "Updates" : "更新情報")}
                </h3>
                <div className="ui segment">
                  <div className="ui divided feed">
                    {(() => {
                      const children290: ReactNode[] = [];
                      if (yearHistories.length > 0) {
                        for (const entry of yearHistories) {
                          children290.push(<>{renderUpdate(entry)}</>);
                        }
                      } else {
                        children290.push(<>{renderUpdate(null)}</>);
                      }
                      return keyed(children290);
                    })()}
                  </div>
                </div>
                {renderAll(function (year) {
                  return pageYear === year;
                }, pageYear)}
              </section>
            </>,
          );
          return keyed(children289);
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
            <div className="ui hidden popup-menu popup">
              {renderTimelineYearNav()}
            </div>
          </>
        }
      >
        <div className="left-rail">{renderTimelineYearNav()}</div>
        <div className="right-content">
          <section>
            <h1 className="ui header">
              <i className="history icon"></i>
              <div className="content">{plainText(title)}</div>
            </h1>
            <p>
              {richText("This page shows ")}
              {plainText(pageYear)}
              {richText(
                " updates to the website as well as publication records. View ",
              )}
              <a href={href(`${basePath}timeline/`)}>
                {richText("the full timeline")}
              </a>
              {richText(".")}
            </p>
          </section>
          {renderYearContent()}
        </div>
      </SiteLayout>
    </>
  );
}
