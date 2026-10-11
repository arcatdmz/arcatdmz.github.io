import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from publications/index.pug; edit this TSX source directly. */
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

  title = en ? "Awards and Publications" : "受賞歴と発表文献";
  me = "publications/";
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
  function renderPublicationsMenu(): ReactNode {
    return (
      <>
        <div className="ui divided list">
          <a className="item" href={href("#awards")}>
            <i className="trophy icon"></i>
            <div className="content">{plainText(en ? "Awards" : "受賞歴")}</div>
          </a>
          <a className="item" href={href("#talks")}>
            <i className="talk icon"></i>
            <div className="content">{plainText(en ? "Invited Talks" : "招待講演")}</div>
          </a>
          <a className="item" href={href("#lectures")}>
            <i className="graduation cap icon"></i>
            <div className="content">{plainText(en ? "Lectures" : "講義")}</div>
          </a>
          <a className="item" href={href("#academic-publications")}>
            <i className="book icon"></i>
            <div className="content">{plainText(en ? "Publications" : "発表文献")}</div>
          </a>
          <div className="item">
            <div className="ui list">
              <a className="item" href={href("#selected-publications")}>
                <i className="right triangle icon"></i>
                <div className="content">{richText("Selected")}</div>
              </a>
              <a className="item" href={href("#reviewed-publications")}>
                <i className="right triangle icon"></i>
                <div className="content">{richText("Reviewed")}</div>
              </a>
              <a className="item" href={href("#other-publications")}>
                <i className="right triangle icon"></i>
                <div className="content">{richText("Others")}</div>
              </a>
              <a className="item" href={href("#dissertation")}>
                <i className="right triangle icon"></i>
                <div className="content">{richText("Dissertation")}</div>
              </a>
            </div>
          </div>
          <a className="item" href={href("#media")}>
            <i className="broadcast tower icon"></i>
            <div className="content">{plainText(en ? "Media" : "メディア")}</div>
          </a>
          <a className="item" href={href(`${basePath}timeline/`)}>
            <i className="history icon"></i>
            <div className="content">{plainText(en ? "Timeline" : "活動履歴")}</div>
          </a>
        </div>
      </>
    );
  }
  function renderAwards(): ReactNode {
    return (
      <>
        {(() => {
          const children135: ReactNode[] = [];
          const isAward = (award) =>
            award.getText("ja").indexOf("受賞") >= 0 || award.getText("ja").indexOf("選定") >= 0;
          const filteredAwards = awards.filter(isAward);
          const honors = awards.filter((award) => !isAward(award));
          const numInternationalAwards = filteredAwards.reduce(
            (p, c) => p + (c.entryType !== "domestic" ? 1 : 0),
            0,
          );
          const numDomesticAwards = filteredAwards.reduce(
            (p, c) => p + (c.entryType === "domestic" ? 1 : 0),
            0,
          );
          children135.push(
            <>
              <p>
                {"I have received "}<strong>{plainText(filteredAwards.length)}</strong>{" awards."}
              </p>
            </>,
          );
          children135.push(
            <>
              <div className="ui segments">
                <div className="ui secondary segment">
                  <div className="ui horizontal list">
                    <div className="item">
                      <i className="circle icon"></i>
                      <div className="content">
                        {richText(
                          en
                            ? `Domestic (<strong>${numDomesticAwards}</strong>)`
                            : `国内 <strong>${numDomesticAwards}</strong> 件`,
                        )}
                      </div>
                    </div>
                    <div className="item">
                      <i className="world icon"></i>
                      <div className="content">
                        {richText(
                          en
                            ? `International (<strong>${numInternationalAwards}</strong>)`
                            : `国際 <strong>${numInternationalAwards}</strong> 件`,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ui segment">
                  <div className="ui divided list">
                    {(() => {
                      const children136: ReactNode[] = [];
                      for (const entry of filteredAwards) {
                        children136.push(
                          <>
                            <div className={classNames("item", entry.entryType)}>
                              <i className={classNames("icon", entry.getIconClass())}></i>
                              <div className="content">
                                <div className="header">{richText(entry.getText(lang))}</div>
                                <div className="description date">
                                  {plainText(entry.getDateString(lang, true))}
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                      }
                      return keyed(children136);
                    })()}
                  </div>
                </div>
              </div>
            </>,
          );
          children135.push(
            <>
              <div className="ui segments">
                <div className="ui secondary segment">
                  <p>
                    {richText(
                      en
                        ? `Other honors and recognitions (<strong>${honors.length}</strong>)`
                        : `その他の顕彰など <strong>${honors.length}</strong> 件`,
                    )}
                  </p>
                </div>
                <div className="ui segment">
                  <div className="ui divided list">
                    {(() => {
                      const children137: ReactNode[] = [];
                      for (const entry of honors) {
                        children137.push(
                          <>
                            <div className={classNames("item", entry.entryType)}>
                              <i className={classNames("icon", entry.getIconClass())}></i>
                              <div className="content">
                                <div className="header">{richText(entry.getText(lang))}</div>
                                <div className="description date">
                                  {plainText(entry.getDateString(lang, true))}
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                      }
                      return keyed(children137);
                    })()}
                  </div>
                </div>
              </div>
            </>,
          );
          return keyed(children135);
        })()}
      </>
    );
  }
  function renderTalks(): ReactNode {
    return (
      <>
        {(() => {
          const children138: ReactNode[] = [];
          if (en) {
            children138.push(
              <>
                <div className="ui segment">
                  <div className="ui divided list">
                    {(() => {
                      const children139: ReactNode[] = [];
                      for (const entry of talks) {
                        if (entry.entryType === "private" || entry.entryType === "domestic")
                          continue;
                        children139.push(
                          <>
                            <div className={classNames("item", entry.entryType)}>
                              <div className="content">
                                <div className="header">{richText(entry.getText(lang))}</div>
                                <div className="description date">
                                  {plainText(entry.getDateString(lang, true))}
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                      }
                      return keyed(children139);
                    })()}
                  </div>
                </div>
              </>,
            );
          } else {
            children138.push(
              <>
                <div className="ui segments">
                  <div className="ui secondary segment">
                    <div className="ui horizontal list">
                      <div className="item">
                        <i className="circle icon"></i>
                        <div className="content">{richText("国内")}</div>
                      </div>
                      <div className="item">
                        <i className="world icon"></i>
                        <div className="content">{richText("国際")}</div>
                      </div>
                    </div>
                  </div>
                  <div className="ui segment">
                    <div className="ui divided list">
                      {(() => {
                        const children140: ReactNode[] = [];
                        for (const entry of talks) {
                          if (entry.entryType === "private") continue;
                          children140.push(
                            <>
                              <div className={classNames("item", entry.entryType)}>
                                <i className={classNames("icon", entry.getIconClass())}></i>
                                <div className="content">
                                  <div className="header">{richText(entry.getText(lang))}</div>
                                  <div className="description date">
                                    {plainText(entry.getDateString(lang, true))}
                                  </div>
                                </div>
                              </div>
                            </>,
                          );
                        }
                        return keyed(children140);
                      })()}
                    </div>
                  </div>
                </div>
              </>,
            );
          }
          return keyed(children138);
        })()}
      </>
    );
  }
  function renderLectures(): ReactNode {
    return (
      <>
        {(() => {
          const children141: ReactNode[] = [];
          if (en) {
            children141.push(
              <>
                <div className="ui segment">
                  <div className="ui divided list">
                    {(() => {
                      const children142: ReactNode[] = [];
                      for (const entry of lectures) {
                        if (entry.entryType === "private" || entry.entryType === "domestic")
                          continue;
                        children142.push(
                          <>
                            <div className={classNames("item", entry.entryType)}>
                              <div className="content">
                                <div className="header">{richText(entry.getText(lang))}</div>
                                <div className="description date">
                                  {plainText(entry.getDatesString(lang).join(", "))}
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                      }
                      return keyed(children142);
                    })()}
                  </div>
                </div>
              </>,
            );
          } else {
            children141.push(
              <>
                <div className="ui segments">
                  <div className="ui secondary segment">
                    <div className="ui horizontal list">
                      <div className="item">
                        <i className="circle icon"></i>
                        <div className="content">{richText("国内")}</div>
                      </div>
                      <div className="item">
                        <i className="world icon"></i>
                        <div className="content">{richText("国際")}</div>
                      </div>
                    </div>
                  </div>
                  <div className="ui segment">
                    <div className="ui divided list">
                      {(() => {
                        const children143: ReactNode[] = [];
                        for (const entry of lectures) {
                          if (entry.entryType === "private") continue;
                          children143.push(
                            <>
                              <div className={classNames("item", entry.entryType)}>
                                <i className={classNames("icon", entry.getIconClass())}></i>
                                <div className="content">
                                  <div className="header">{richText(entry.getText(lang))}</div>
                                  <div className="description date">
                                    {plainText(entry.getDatesString(lang).join(", "))}
                                  </div>
                                </div>
                              </div>
                            </>,
                          );
                        }
                        return keyed(children143);
                      })()}
                    </div>
                  </div>
                </div>
              </>,
            );
          }
          return keyed(children141);
        })()}
      </>
    );
  }
  function renderPublications(): ReactNode {
    return (
      <>
        <p>
          {richText("The following publications list is automatically generated from ")}
          <a href={href("/junkato.bib")}>{richText("the BibTeX file")}</a>
          {richText(".")}
        </p>
        <h2 className="ui header" id={attribute("selected-publications")}>
          {richText("Selected peer-reviewed publications")}
        </h2>
        <div className="ui divided list">
          {(() => {
            const children144: ReactNode[] = [];
            for (const entry of selectedPublications) {
              children144.push(<>{content.renderPublication(entry)}</>);
            }
            return keyed(children144);
          })()}
        </div>
        <div className="ui hidden divider"></div>
        <h2 className="ui header" id={attribute("reviewed-publications")}>
          {richText("Journal/conference/workshop publications")}
        </h2>
        <p>
          {richText(
            "All of these publications, except those explicitly marked as the invited articles, underwent a review process; most of these publications are considered either archival or semi-archival.",
          )}
        </p>
        <div className="ui divided list">
          {(() => {
            const children145: ReactNode[] = [];
            for (const entry of publications) {
              if (selectedPublications.indexOf(entry) >= 0) continue;
              if (entry.entryTags && entry.entryTags.language === "japanese") continue; // skip Japanese publications
              if (entry.entryTags && !entry.entryTags.numpages) continue; // skip non-archival publications
              if (entry.entryType === "phdthesis") continue;
              children145.push(<>{content.renderPublication(entry)}</>);
            }
            return keyed(children145);
          })()}
        </div>
        <div className="ui hidden divider"></div>
        <h2 className="ui header" id={attribute("other-publications")}>
          {richText("Other publications")}
        </h2>
        <p>
          {richText(
            "The following publications are either invited articles or non-archival demo/poster papers.",
          )}
        </p>
        <div className="ui divided list">
          {(() => {
            const children146: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryTags && entry.entryTags.language === "japanese") continue; // skip Japanese publications
              if (entry.entryTags && entry.entryTags.numpages) continue; // skip archival publications
              if (entry.entryType === "phdthesis") continue;
              children146.push(<>{content.renderPublication(entry)}</>);
            }
            return keyed(children146);
          })()}
        </div>
        <div className="ui hidden divider"></div>
        <h2 className="ui header" id={attribute("dissertation")}>
          {richText("Dissertation")}
        </h2>
        <div className="ui divided list">
          {(() => {
            const children147: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryType !== "phdthesis") continue;
              children147.push(<>{content.renderPublication(entry)}</>);
            }
            return keyed(children147);
          })()}
        </div>
      </>
    );
  }
  function renderMedia(): ReactNode {
    return (
      <>
        {(() => {
          const children148: ReactNode[] = [];
          const filteredMediaList = mediaList.filter((entry) => !entry.private && !entry.draft);
          const numInternationalMediaCoverage = filteredMediaList.reduce(
            (p, c) => p + (c.media?.en ? 1 : 0),
            0,
          );
          const numDomesticMediaCoverage = mediaList.length - numInternationalMediaCoverage;
          children148.push(
            <>
              <p>
                {"Media coverage includes both my work and personal interviews, featured in "}<strong>{plainText(numInternationalMediaCoverage)}</strong>{" international and "}
                <a href={href(`${rootPath}ja/publications/#media`)}>
                  {""}<strong>{plainText(numDomesticMediaCoverage)}</strong>{" domestic"}
                </a>
                {richText(" media outlets.")}
              </p>
            </>,
          );
          children148.push(
            <>
              <div className="ui divided relaxed list media">
                {(() => {
                  const children149: ReactNode[] = [];
                  for (const entry of filteredMediaList) {
                    if (en && !entry.media[lang]) continue;
                    children149.push(<>{content.renderMediaItem(entry)}</>);
                  }
                  return keyed(children149);
                })()}
              </div>
            </>,
          );
          return keyed(children148);
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
            <div className="ui hidden popup-menu popup">{renderPublicationsMenu()}</div>
          </>
        }
      >
        <div className="left-rail">{renderPublicationsMenu()}</div>
        <div className="right-content" id={attribute("publications")}>
          <section id={attribute("awards")}>
            <h1 className="ui header">
              <i className="trophy icon"></i>
              <div className="content">{plainText(en ? "Awards and Honors" : "受賞歴")}</div>
            </h1>
            {renderAwards()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={attribute("talks")}>
            <h1 className="ui header">
              <i className="talk icon"></i>
              <div className="content">{plainText(en ? "Invited Talks" : "招待講演")}</div>
            </h1>
            {renderTalks()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={attribute("lectures")}>
            <h1 className="ui header">
              <i className="graduation cap icon"></i>
              <div className="content">{plainText(en ? "Lectures" : "講義")}</div>
            </h1>
            {renderLectures()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={attribute("academic-publications")}>
            <h1 className="ui header">
              <i className="book icon"></i>
              <div className="content">{plainText(en ? "Publications" : "発表文献")}</div>
            </h1>
            {renderPublications()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={attribute("media")}>
            <h1 className="ui header">
              {richText(" ")}
              <i className="broadcast tower icon"></i>
              <div className="content">{plainText(en ? "Media coverage" : "メディア掲載")}</div>
            </h1>
            {renderMedia()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}
