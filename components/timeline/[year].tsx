import { Popup } from "@/site/components/SiteWidgets";
import { Fragment, type ReactNode } from "react";
import {
  MediaItem,
  ProjectItem,
  Publication,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href, attribute } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: description. */
export default function Page({
  pageYear,
  pageData,
}: PageDataProps & { pageYear: number }) {
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

  title = en ? `Timeline (${pageYear})` : `${pageYear}年の活動履歴`;
  description = en
    ? `Timeline of Dr. Jun Kato's research and design portfolio, showing ${pageYear} website updates and publication records.`
    : `加藤 淳の研究・デザインのポートフォリオWebサイトにおける${pageYear}年の活動履歴です。Webサイトの更新情報と発表文献を紹介しています。`;
  me = `timeline/${pageYear}/`;
  bodyClass = "with-rail";
  const currentYear = buildYear;
  const oldestYear = en ? 2011 : 2010;
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
          const children: ReactNode[] = [];
          var as = [];
          for (const entry of awards) {
            if (en && entry.entryType === "domestic") continue;
            if (!f(entry.date.getFullYear())) continue;
            as.push(entry);
          }
          if (as.length > 0) {
            children.push(<>{renderAwards(as, y)}</>);
          }
          var ts = [];
          for (const entry of talks) {
            if (entry.entryType === "private") continue;
            if (en && entry.entryType === "domestic") continue;
            if (!f(entry.date.getFullYear())) continue;
            ts.push(entry);
          }
          if (ts.length > 0) {
            children.push(<>{renderTalks(ts, y)}</>);
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
            children.push(<>{renderLectures(ls, y, f)}</>);
          }
          var prs = [];
          for (const p of projects) {
            if (p.isPrivateProject(lang)) continue;
            if (!p.year || typeof p.year.from !== "number") continue;
            if (!f(p.year.from)) continue;
            prs.push(p);
          }
          if (prs.length > 0) {
            children.push(<>{renderProjects(prs, y)}</>);
          }
          var ms = [];
          for (const m of mediaList) {
            if (m.private || m.draft || !m.date) continue;
            if (en && !m.media.en) continue;
            if (!f(m.date.getFullYear())) continue;
            ms.push(m);
          }
          if (ms.length > 0) {
            children.push(<>{renderMedia(ms, y)}</>);
          }
          var ps = [];
          for (const entry of publications) {
            if (!entry.entryTags) continue;
            if (en && entry.entryTags.language === "japanese") continue;
            if (!f(parseInt(entry.entryTags.year))) continue;
            ps.push(entry);
          }
          if (ps.length > 0) {
            children.push(<>{renderPublications(ps, y)}</>);
          }
          return keyed(children);
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
              const children: ReactNode[] = [];
              for (entry of as) {
                children.push(
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
              return keyed(children);
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
              const children: ReactNode[] = [];
              for (entry of ts) {
                children.push(
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
              return keyed(children);
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
              const children: ReactNode[] = [];
              for (entry of ls) {
                children.push(
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
              return keyed(children);
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
              const children: ReactNode[] = [];
              for (p of prs) {
                children.push(
                  <>
                    <ProjectItem p={p} />
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
              const children: ReactNode[] = [];
              for (entry of ms) {
                children.push(
                  <>
                    <MediaItem m={entry} />
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
              const children: ReactNode[] = [];
              for (entry of ps) {
                children.push(
                  <>
                    <Publication entry={entry} />
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
  function renderTimelineYearNav(): ReactNode {
    return (
      <>
        <div className="ui divided list">
          <SiteLink className="item" href={href(`${basePath}timeline/`)}>
            <i className="chevron circle up icon"></i>
            <div className="content">{en ? "Timeline" : "活動履歴"}</div>
          </SiteLink>

          {pageYear < currentYear ? (
            <>
              <SiteLink
                className="item"
                href={href(`${basePath}timeline/${pageYear + 1}/`)}
              >
                <i className="arrow up icon"></i>
                <div className="content">{pageYear + 1}</div>
              </SiteLink>
            </>
          ) : null}
          {pageYear > oldestYear ? (
            <>
              <SiteLink
                className="item"
                href={href(`${basePath}timeline/${pageYear - 1}/`)}
              >
                <i className="arrow down icon"></i>
                <div className="content">{pageYear - 1}</div>
              </SiteLink>
            </>
          ) : null}
        </div>
      </>
    );
  }
  function renderYearContent(): ReactNode {
    return (
      <>
        {(() => {
          const children: ReactNode[] = [];
          var yearHistories = [];
          for (const entry of histories[lang]) {
            if (entry.date.getFullYear() === pageYear)
              yearHistories.push(entry);
          }
          children.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children.push(
            <>
              <section id={attribute(pageYear)}>
                <h3 className="ui header" id={attribute(`${pageYear}-updates`)}>
                  <i className="announcement icon"></i>
                  {en ? "Updates" : "更新情報"}
                </h3>
                <div className="ui segment">
                  <div className="ui divided feed">
                    {yearHistories.length > 0 ? (
                      <>
                        {yearHistories.map((entry, itemIndex) => (
                          <Fragment key={itemIndex}>
                            {renderUpdate(entry)}
                          </Fragment>
                        ))}
                      </>
                    ) : (
                      <>{renderUpdate(null)}</>
                    )}
                  </div>
                </div>
                {renderAll(function (year) {
                  return pageYear === year;
                }, pageYear)}
              </section>
            </>,
          );
          return keyed(children);
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
            <Popup
              className="ui hidden popup-menu popup"
              position="top left"
              trigger={
                <a className="ui circular icon popup-menu large grey hidden mobile-only button">
                  <i className="sidebar icon"></i>
                </a>
              }
            >
              {renderTimelineYearNav()}
            </Popup>
          </>
        }
      >
        <div className="left-rail">{renderTimelineYearNav()}</div>
        <div className="right-content">
          <section>
            <h1 className="ui header">
              <i className="history icon"></i>
              <div className="content">{title}</div>
            </h1>
            <p>
              {en ? "This page shows " : "このページでは"}
              {pageYear}
              {en
                ? " updates to the website as well as publication records. View "
                : "年のWebサイトの更新情報と発表文献を見ることができます。全期間の活動履歴は"}
              <SiteLink href={href(`${basePath}timeline/`)}>
                {en ? "the full timeline" : "こちら"}
              </SiteLink>
              {en ? "." : "。"}
            </p>
          </section>
          {renderYearContent()}
        </div>
      </SiteLayout>
    </>
  );
}
