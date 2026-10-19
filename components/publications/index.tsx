import { LocalizedContent } from "@/site/components/LocalizedContent";
import { Popup } from "@/site/components/SiteWidgets";
import { Fragment, type ReactNode } from "react";
import { MediaItem, Publication } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { HtmlContent } from "@/site/components/RichText";
import { classNames, keyed, href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: left-rail-list, awards, publications, media. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const {
    awards,
    talks,
    lectures,
    publications,
    selectedPublications,
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

  title = en ? "Awards and Publications" : "受賞歴と発表文献";
  me = "publications/";
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
              <LocalizedContent
                ja={
                  <>
                    <a className="item" href={"#international-publications"}>
                      <i className="right triangle icon"></i>
                      <div className="content">{"国際"}</div>
                    </a>
                    <a className="item" href={"#domestic-publications"}>
                      <i className="right triangle icon"></i>
                      <div className="content">{"国内"}</div>
                    </a>
                    <a className="item" href={"#dissertation"}>
                      <i className="right triangle icon"></i>
                      <div className="content">{"学位論文"}</div>
                    </a>
                  </>
                }
              >
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
              </LocalizedContent>
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
          const children: ReactNode[] = [];
          const isAward = (award) => award.isAward;
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
          children.push(
            <>
              <LocalizedContent
                ja={
                  <p>
                    {"これまでに "}
                    <strong>{filteredAwards.length}</strong>
                    {" 件の受賞に繋がる成果を創出してきました。"}
                  </p>
                }
              >
                <p>
                  {"I have received "}
                  <strong>{filteredAwards.length}</strong>
                  {" awards."}
                </p>
              </LocalizedContent>
            </>,
          );
          children.push(
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
          children.push(
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
          return keyed(children);
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
                  const children: ReactNode[] = [];
                  for (const entry of talks) {
                    if (
                      entry.entryType === "private" ||
                      entry.entryType === "domestic"
                    )
                      continue;
                    children.push(
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
                  return keyed(children);
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
                    const children: ReactNode[] = [];
                    for (const entry of talks) {
                      if (entry.entryType === "private") continue;
                      children.push(
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
                    return keyed(children);
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
                  const children: ReactNode[] = [];
                  for (const entry of lectures) {
                    if (
                      entry.entryType === "private" ||
                      entry.entryType === "domestic"
                    )
                      continue;
                    children.push(
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
                  return keyed(children);
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
                    const children: ReactNode[] = [];
                    for (const entry of lectures) {
                      if (entry.entryType === "private") continue;
                      children.push(
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
                    return keyed(children);
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
        <LocalizedContent
          ja={
            <>
              <p>
                {"以下の発表文献リストは"}
                <SiteLink href={"/junkato.bib"}>{"BibTeX ファイル"}</SiteLink>
                {"から自動生成されています。"}
                {"\n"}
                {"主務の産業技術総合研究所での成果に関しては"}
                <a href={"https://staff.aist.go.jp/jun.kato/"}>
                  {"研究所の個人ページ"}
                </a>
                {"にも掲載しています。"}
              </p>
              <h2 className="ui header" id={"international-publications"}>
                {"国際会議・ジャーナル"}
              </h2>
              <div className="ui divided list">
                {(() => {
                  const children: ReactNode[] = [];
                  for (const entry of publications) {
                    if (
                      entry.entryTags &&
                      entry.entryTags.language === "japanese"
                    )
                      continue;
                    if (entry.entryType === "phdthesis") continue;
                    children.push(
                      <>
                        <Publication entry={entry} />
                      </>,
                    );
                  }
                  return keyed(children);
                })()}
              </div>
              <h2 className="ui header" id={"domestic-publications"}>
                {"国内会議・ジャーナル・商業誌"}
              </h2>
              <div className="ui divided list">
                {(() => {
                  const children: ReactNode[] = [];
                  for (const entry of publications) {
                    if (
                      !entry.entryTags ||
                      entry.entryTags.language !== "japanese"
                    )
                      continue;
                    if (entry.entryType === "phdthesis") continue;
                    children.push(
                      <>
                        <Publication entry={entry} />
                      </>,
                    );
                  }
                  return keyed(children);
                })()}
              </div>
              <h2 className="ui header" id={"dissertation"}>
                {"学位論文"}
              </h2>
            </>
          }
        >
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
              const children: ReactNode[] = [];
              for (const entry of publications) {
                if (selectedPublications.indexOf(entry) >= 0) continue;
                if (entry.entryTags && entry.entryTags.language === "japanese")
                  continue; // skip Japanese publications
                if (entry.entryTags && !entry.entryTags.numpages) continue; // skip non-archival publications
                if (entry.entryType === "phdthesis") continue;
                children.push(
                  <>
                    <Publication entry={entry} />
                  </>,
                );
              }
              return keyed(children);
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
              const children: ReactNode[] = [];
              for (const entry of publications) {
                if (entry.entryTags && entry.entryTags.language === "japanese")
                  continue; // skip Japanese publications
                if (entry.entryTags && entry.entryTags.numpages) continue; // skip archival publications
                if (entry.entryType === "phdthesis") continue;
                children.push(
                  <>
                    <Publication entry={entry} />
                  </>,
                );
              }
              return keyed(children);
            })()}
          </div>
          <div className="ui hidden divider"></div>
          <h2 className="ui header" id={"dissertation"}>
            {"Dissertation"}
          </h2>
        </LocalizedContent>
        <div className="ui divided list">
          {(() => {
            const children: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryType !== "phdthesis") continue;
              children.push(
                <>
                  <Publication entry={entry} />
                </>,
              );
            }
            return keyed(children);
          })()}
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
            (entry) => !entry.private && !entry.draft,
          );
          const numInternationalMediaCoverage = filteredMediaList.reduce(
            (p, c) => p + (c.media?.en ? 1 : 0),
            0,
          );
          const numDomesticMediaCoverage =
            data.mediaCount - numInternationalMediaCoverage;
          children.push(
            <>
              <LocalizedContent
                ja={
                  <p>
                    {"これまでの研究活動は、さまざまなメディアで "}
                    <strong>
                      {numInternationalMediaCoverage + numDomesticMediaCoverage}
                    </strong>
                    {" 件（うち"}
                    <SiteLink href={href(`${rootPath}publications/#media`)}>
                      {"国際 "}
                      <strong>{numInternationalMediaCoverage}</strong>
                      {" 件"}
                    </SiteLink>
                    {"）紹介されてきました。"}
                  </p>
                }
              >
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
              </LocalizedContent>
            </>,
          );
          children.push(
            <>
              <div className="ui divided relaxed list media">
                {(() => {
                  const children: ReactNode[] = [];
                  for (const entry of filteredMediaList) {
                    if (en && !entry.media[lang]) continue;
                    children.push(
                      <>
                        <MediaItem m={entry} />
                      </>,
                    );
                  }
                  return keyed(children);
                })()}
              </div>
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
              {renderPublicationsMenu()}
            </Popup>
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
