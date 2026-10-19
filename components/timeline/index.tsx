import {
  Button,
  Divider,
  Feed,
  Header,
  Icon,
  Item,
  List,
  Segment,
} from "react-fomantic-ui";

import { SitePopup } from "@/site/components/SiteWidgets";
import {
  MediaItem,
  ProjectItem,
  Publication,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import { type ReactNode } from "react";
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
        <Feed.Event>
          <Feed.Content>
            {entry ? (
              <>
                <Feed.Date>{entry.getDateString(lang, true)}</Feed.Date>

                <Feed.Summary>
                  <HtmlContent html={entry.text} />
                </Feed.Summary>
              </>
            ) : (
              <>
                <Feed.Summary>
                  {en
                    ? "No updates found in this year."
                    : "この年の更新内容はありません。"}
                </Feed.Summary>
              </>
            )}
          </Feed.Content>
        </Feed.Event>
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
        <Header as="h3" id={attribute(`${y}-awards`)}>
          <Icon name="trophy" />
          {en ? "Awards" : "受賞"}
        </Header>
        <Segment>
          <Feed className="divided">
            {(() => {
              const children: ReactNode[] = [];
              for (entry of as) {
                children.push(
                  <>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date>{entry.getDateString(lang, true)}</Feed.Date>
                        <Feed.Summary>
                          <HtmlContent html={entry.getText(lang)} />
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </>,
                );
              }
              return keyed(children);
            })()}
          </Feed>
        </Segment>
      </>
    );
  }
  function renderTalks(ts: any = undefined, y: any = undefined): ReactNode {
    let entry: any;
    return (
      <>
        <Header as="h3" id={attribute(`${y}-talks`)}>
          <Icon name="talk" />
          {en ? "Invited Talks" : "招待講演"}
        </Header>
        <Segment>
          <Feed className="divided">
            {(() => {
              const children: ReactNode[] = [];
              for (entry of ts) {
                children.push(
                  <>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date>{entry.getDateString(lang, true)}</Feed.Date>
                        <Feed.Summary>
                          <HtmlContent html={entry.getText(lang)} />
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </>,
                );
              }
              return keyed(children);
            })()}
          </Feed>
        </Segment>
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
        <Header as="h3" id={attribute(`${y}-lectures`)}>
          <Icon name="graduation cap" />
          {en ? "Lectures" : "講義"}
        </Header>
        <Segment>
          <Feed className="divided">
            {(() => {
              const children: ReactNode[] = [];
              for (entry of ls) {
                children.push(
                  <>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date>
                          {entry.dateObjs
                            .filter((o) => f(o.date.getFullYear()))
                            .map((o) => o.getDateString(lang, true))
                            .join(", ")}
                        </Feed.Date>
                        <Feed.Summary>
                          <HtmlContent html={entry.getText(lang)} />
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </>,
                );
              }
              return keyed(children);
            })()}
          </Feed>
        </Segment>
      </>
    );
  }
  function renderProjects(prs: any = undefined, y: any = undefined): ReactNode {
    let p: any;
    return (
      <>
        <Header as="h3" id={attribute(`${y}-projects`)}>
          <Icon name="gift" />
          {en ? "New Projects" : "開始したプロジェクト"}
        </Header>
        <Segment>
          <Item.Group divided className="projects">
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
          </Item.Group>
        </Segment>
      </>
    );
  }
  function renderMedia(ms: any = undefined, y: any = undefined): ReactNode {
    let entry: any;
    return (
      <>
        <Header as="h3" id={attribute(`${y}-media`)}>
          <Icon className="broadcast tower" />
          {en ? "Media Coverage" : "メディア掲載"}
        </Header>
        <Segment>
          <List divided className="media">
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
          </List>
        </Segment>
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
        <Header as="h3" id={attribute(`${y}-publications`)}>
          <Icon name="book" />
          {en ? "Publications" : "発表文献"}
        </Header>
        <Segment>
          <List divided>
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
          </List>
        </Segment>
      </>
    );
  }
  function renderTimelineMenu(): ReactNode {
    return (
      <>
        <List divided>
          {(() => {
            const children: ReactNode[] = [];
            children.push(
              <>
                <List.Item role="link" as="a" href={"#body"}>
                  <Icon name="chevron circle up" />
                  <List.Content>{title}</List.Content>
                </List.Item>
              </>,
            );
            const oldestYear = en ? 2011 : 2010;
            for (var year = buildYear; year >= oldestYear; year--) {
              children.push(
                <>
                  <List.Item role="link" as={SiteLink} href={href(`#${year}`)}>
                    <Icon name="triangle right" />
                    <List.Content>{year}</List.Content>
                  </List.Item>
                </>,
              );
            }
            return keyed(children);
          })()}
        </List>
      </>
    );
  }
  function renderTimeline(): ReactNode {
    return (
      <>
        {(() => {
          const children: ReactNode[] = [];
          children.push(
            <>
              <section>
                <Header as="h1">
                  <Icon name="history" />
                  <Header.Content>{title}</Header.Content>
                </Header>
                <p>
                  {en
                    ? "This page shows updates to the website as well as "
                    : "このページではWebサイトの更新情報と"}
                  <SiteLink
                    href={
                      en
                        ? href(`${rootPath}publications`)
                        : href(`${rootPath}ja/publications`)
                    }
                  >
                    <Icon name="book" />
                    {en ? "publication records" : "発表文献"}
                  </SiteLink>
                  {en
                    ? " in their chronological order."
                    : "を時系列で見ることができます。"}
                </p>
              </section>
            </>,
          );
          var i = 0,
            year = buildYear;
          while (i < histories[lang].length) {
            const y = year;
            children.push(
              <>
                <Divider hidden />
              </>,
            );
            children.push(
              <>
                <section id={attribute(y)}>
                  <Header as="h2">{en ? y : `${y}年`}</Header>

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

                  <Header as="h3" id={attribute(`${y}-updates`)}>
                    <Icon name="announcement" />
                    {en ? "Updates" : "更新情報"}
                  </Header>

                  <Segment>
                    <Feed className="divided">
                      {(() => {
                        const children: ReactNode[] = [];
                        var i_ = i;
                        while (i < histories[lang].length) {
                          const entry = histories[lang][i];
                          if (entry.date.getFullYear() !== year) {
                            year = entry.date.getFullYear();
                            break;
                          }
                          children.push(<>{renderUpdate(entry)}</>);
                          i++;
                        }
                        if (i === i_) {
                          children.push(<>{renderUpdate(null)}</>);
                        }
                        return keyed(children);
                      })()}
                    </Feed>
                  </Segment>

                  {renderAll(function (year) {
                    return y === year;
                  }, y)}
                </section>
              </>,
            );
          }
          const y = --year;
          children.push(
            <>
              <Divider hidden />
            </>,
          );
          children.push(
            <>
              <section id={attribute(y)}>
                <Header as="h2">
                  {en ? `${y} and before` : `${y}年とそれ以前`}
                </Header>
                {renderAll(function (year) {
                  return y >= year;
                }, y)}
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
            <SitePopup
              className="popup-menu"
              position="top left"
              trigger={
                <Button
                  circular
                  icon
                  size="large"
                  color="grey"
                  as="a"
                  className="popup-menu hidden mobile-only"
                >
                  <Icon name="sidebar" />
                </Button>
              }
            >
              {renderTimelineMenu()}
            </SitePopup>
          </>
        }
      >
        <div className="left-rail">{renderTimelineMenu()}</div>
        <div className="right-content">{renderTimeline()}</div>
      </SiteLayout>
    </>
  );
}
