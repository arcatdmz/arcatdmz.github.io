import { Fragment } from "react";
import { MediaItem, Publication } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { classNames, keyed, href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from publications/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const {
    awards,
    talks,
    lectures,
    publications,
    selectedPublications,
    mediaList,
    moment,
    rootPath,
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
  function renderPublicationsMenu(): ReactNode {
    return (
      <>
        <div className="ui divided list">
          <a className="item" href={"#awards"}>
            <i className="trophy icon"></i>
            <div className="content">{en ? "Awards" : "受賞歴"}</div>
          </a>
          <a className="item" href={"#talks"}>
            <i className="talk icon"></i>
            <div className="content">{en ? "Invited Talks" : "招待講演"}</div>
          </a>
          <a className="item" href={"#lectures"}>
            <i className="graduation cap icon"></i>
            <div className="content">{en ? "Lectures" : "講義"}</div>
          </a>
          <a className="item" href={"#academic-publications"}>
            <i className="book icon"></i>
            <div className="content">{en ? "Publications" : "発表文献"}</div>
          </a>
          <div className="item">
            <div className="ui list">
              <a className="item" href={"#selected-publications"}>
                <i className="right triangle icon"></i>
                <div className="content">{"Selected"}</div>
              </a>
              <a className="item" href={"#reviewed-publications"}>
                <i className="right triangle icon"></i>
                <div className="content">{"Reviewed"}</div>
              </a>
              <a className="item" href={"#other-publications"}>
                <i className="right triangle icon"></i>
                <div className="content">{"Others"}</div>
              </a>
              <a className="item" href={"#dissertation"}>
                <i className="right triangle icon"></i>
                <div className="content">{"Dissertation"}</div>
              </a>
            </div>
          </div>
          <a className="item" href={"#media"}>
            <i className="broadcast tower icon"></i>
            <div className="content">{en ? "Media" : "メディア"}</div>
          </a>
          <SiteLink className="item" href={href(`${basePath}timeline/`)}>
            <i className="history icon"></i>
            <div className="content">{en ? "Timeline" : "活動履歴"}</div>
          </SiteLink>
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
            award.getText("ja").indexOf("受賞") >= 0 ||
            award.getText("ja").indexOf("選定") >= 0;
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
                {"I have received "}
                <strong>{filteredAwards.length}</strong>
                {" awards."}
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
                        <HtmlContent
                          html={
                            en
                              ? `Domestic (<strong>${numDomesticAwards}</strong>)`
                              : `国内 <strong>${numDomesticAwards}</strong> 件`
                          }
                        />
                      </div>
                    </div>
                    <div className="item">
                      <i className="world icon"></i>
                      <div className="content">
                        <HtmlContent
                          html={
                            en
                              ? `International (<strong>${numInternationalAwards}</strong>)`
                              : `国際 <strong>${numInternationalAwards}</strong> 件`
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ui segment">
                  <div className="ui divided list">
                    {filteredAwards.map((entry, itemIndex) => (
                      <Fragment key={itemIndex}>
                        <div className={classNames("item", entry.entryType)}>
                          <i
                            className={classNames("icon", entry.getIconClass())}
                          ></i>
                          <div className="content">
                            <div className="header">
                              <HtmlContent html={entry.getText(lang)} />
                            </div>
                            <div className="description date">
                              {entry.getDateString(lang, true)}
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    ))}
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
                    <HtmlContent
                      html={
                        en
                          ? `Other honors and recognitions (<strong>${honors.length}</strong>)`
                          : `その他の顕彰など <strong>${honors.length}</strong> 件`
                      }
                    />
                  </p>
                </div>
                <div className="ui segment">
                  <div className="ui divided list">
                    {honors.map((entry, itemIndex) => (
                      <Fragment key={itemIndex}>
                        <div className={classNames("item", entry.entryType)}>
                          <i
                            className={classNames("icon", entry.getIconClass())}
                          ></i>
                          <div className="content">
                            <div className="header">
                              <HtmlContent html={entry.getText(lang)} />
                            </div>
                            <div className="description date">
                              {entry.getDateString(lang, true)}
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    ))}
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
        {en ? (
          <>
            <div className="ui segment">
              <div className="ui divided list">
                {(() => {
                  const children139: ReactNode[] = [];
                  for (const entry of talks) {
                    if (
                      entry.entryType === "private" ||
                      entry.entryType === "domestic"
                    )
                      continue;
                    children139.push(
                      <>
                        <div className={classNames("item", entry.entryType)}>
                          <div className="content">
                            <div className="header">
                              <HtmlContent html={entry.getText(lang)} />
                            </div>
                            <div className="description date">
                              {entry.getDateString(lang, true)}
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
          </>
        ) : (
          <>
            <div className="ui segments">
              <div className="ui secondary segment">
                <div className="ui horizontal list">
                  <div className="item">
                    <i className="circle icon"></i>
                    <div className="content">{"国内"}</div>
                  </div>
                  <div className="item">
                    <i className="world icon"></i>
                    <div className="content">{"国際"}</div>
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
                            <i
                              className={classNames(
                                "icon",
                                entry.getIconClass(),
                              )}
                            ></i>
                            <div className="content">
                              <div className="header">
                                <HtmlContent html={entry.getText(lang)} />
                              </div>
                              <div className="description date">
                                {entry.getDateString(lang, true)}
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
          </>
        )}
      </>
    );
  }
  function renderLectures(): ReactNode {
    return (
      <>
        {en ? (
          <>
            <div className="ui segment">
              <div className="ui divided list">
                {(() => {
                  const children142: ReactNode[] = [];
                  for (const entry of lectures) {
                    if (
                      entry.entryType === "private" ||
                      entry.entryType === "domestic"
                    )
                      continue;
                    children142.push(
                      <>
                        <div className={classNames("item", entry.entryType)}>
                          <div className="content">
                            <div className="header">
                              <HtmlContent html={entry.getText(lang)} />
                            </div>
                            <div className="description date">
                              {entry.getDatesString(lang).join(", ")}
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
          </>
        ) : (
          <>
            <div className="ui segments">
              <div className="ui secondary segment">
                <div className="ui horizontal list">
                  <div className="item">
                    <i className="circle icon"></i>
                    <div className="content">{"国内"}</div>
                  </div>
                  <div className="item">
                    <i className="world icon"></i>
                    <div className="content">{"国際"}</div>
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
                            <i
                              className={classNames(
                                "icon",
                                entry.getIconClass(),
                              )}
                            ></i>
                            <div className="content">
                              <div className="header">
                                <HtmlContent html={entry.getText(lang)} />
                              </div>
                              <div className="description date">
                                {entry.getDatesString(lang).join(", ")}
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
          </>
        )}
      </>
    );
  }
  function renderPublications(): ReactNode {
    return (
      <>
        <p>
          {"The following publications list is automatically generated from "}
          <SiteLink href={"/junkato.bib"}>{"the BibTeX file"}</SiteLink>
          {"."}
        </p>
        <h2 className="ui header" id={"selected-publications"}>
          {"Selected peer-reviewed publications"}
        </h2>
        <div className="ui divided list">
          {selectedPublications.map((entry, itemIndex) => (
            <Fragment key={itemIndex}>
              <Publication entry={entry} />
            </Fragment>
          ))}
        </div>
        <div className="ui hidden divider"></div>
        <h2 className="ui header" id={"reviewed-publications"}>
          {"Journal/conference/workshop publications"}
        </h2>
        <p>
          {
            "All of these publications, except those explicitly marked as the invited articles, underwent a review process; most of these publications are considered either archival or semi-archival."
          }
        </p>
        <div className="ui divided list">
          {(() => {
            const children145: ReactNode[] = [];
            for (const entry of publications) {
              if (selectedPublications.indexOf(entry) >= 0) continue;
              if (entry.entryTags && entry.entryTags.language === "japanese")
                continue; // skip Japanese publications
              if (entry.entryTags && !entry.entryTags.numpages) continue; // skip non-archival publications
              if (entry.entryType === "phdthesis") continue;
              children145.push(
                <>
                  <Publication entry={entry} />
                </>,
              );
            }
            return keyed(children145);
          })()}
        </div>
        <div className="ui hidden divider"></div>
        <h2 className="ui header" id={"other-publications"}>
          {"Other publications"}
        </h2>
        <p>
          {
            "The following publications are either invited articles or non-archival demo/poster papers."
          }
        </p>
        <div className="ui divided list">
          {(() => {
            const children146: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryTags && entry.entryTags.language === "japanese")
                continue; // skip Japanese publications
              if (entry.entryTags && entry.entryTags.numpages) continue; // skip archival publications
              if (entry.entryType === "phdthesis") continue;
              children146.push(
                <>
                  <Publication entry={entry} />
                </>,
              );
            }
            return keyed(children146);
          })()}
        </div>
        <div className="ui hidden divider"></div>
        <h2 className="ui header" id={"dissertation"}>
          {"Dissertation"}
        </h2>
        <div className="ui divided list">
          {(() => {
            const children147: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryType !== "phdthesis") continue;
              children147.push(
                <>
                  <Publication entry={entry} />
                </>,
              );
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
          const filteredMediaList = mediaList.filter(
            (entry) => !entry.private && !entry.draft,
          );
          const numInternationalMediaCoverage = filteredMediaList.reduce(
            (p, c) => p + (c.media?.en ? 1 : 0),
            0,
          );
          const numDomesticMediaCoverage =
            mediaList.length - numInternationalMediaCoverage;
          children148.push(
            <>
              <p>
                {
                  "Media coverage includes both my work and personal interviews, featured in "
                }
                <strong>{numInternationalMediaCoverage}</strong>
                {" international and "}
                <SiteLink href={href(`${rootPath}ja/publications/#media`)}>
                  {""}
                  <strong>{numDomesticMediaCoverage}</strong>
                  {" domestic"}
                </SiteLink>
                {" media outlets."}
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
                    children149.push(
                      <>
                        <MediaItem m={entry} />
                      </>,
                    );
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
            <div className="ui hidden popup-menu popup">
              {renderPublicationsMenu()}
            </div>
          </>
        }
      >
        <div className="left-rail">{renderPublicationsMenu()}</div>
        <div className="right-content" id={"publications"}>
          <section id={"awards"}>
            <h1 className="ui header">
              <i className="trophy icon"></i>
              <div className="content">
                {en ? "Awards and Honors" : "受賞歴"}
              </div>
            </h1>
            {renderAwards()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={"talks"}>
            <h1 className="ui header">
              <i className="talk icon"></i>
              <div className="content">{en ? "Invited Talks" : "招待講演"}</div>
            </h1>
            {renderTalks()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={"lectures"}>
            <h1 className="ui header">
              <i className="graduation cap icon"></i>
              <div className="content">{en ? "Lectures" : "講義"}</div>
            </h1>
            {renderLectures()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={"academic-publications"}>
            <h1 className="ui header">
              <i className="book icon"></i>
              <div className="content">{en ? "Publications" : "発表文献"}</div>
            </h1>
            {renderPublications()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={"media"}>
            <h1 className="ui header">
              {" "}
              <i className="broadcast tower icon"></i>
              <div className="content">
                {en ? "Media coverage" : "メディア掲載"}
              </div>
            </h1>
            {renderMedia()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}
