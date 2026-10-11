import { Fragment } from "react";
import { MediaItem, Publication } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { classNames, keyed, href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/publications/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { awards, talks, lectures, publications, mediaList, moment, rootPath } =
    data;
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
          const children248: ReactNode[] = [];
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
          children248.push(
            <>
              <p>
                {"これまでに "}
                <strong>{filteredAwards.length}</strong>
                {" 件の受賞に繋がる成果を創出してきました。"}
              </p>
            </>,
          );
          children248.push(
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
          children248.push(
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
          return keyed(children248);
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
                  const children252: ReactNode[] = [];
                  for (const entry of talks) {
                    if (
                      entry.entryType === "private" ||
                      entry.entryType === "domestic"
                    )
                      continue;
                    children252.push(
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
                  return keyed(children252);
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
                    const children253: ReactNode[] = [];
                    for (const entry of talks) {
                      if (entry.entryType === "private") continue;
                      children253.push(
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
                    return keyed(children253);
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
                  const children255: ReactNode[] = [];
                  for (const entry of lectures) {
                    if (
                      entry.entryType === "private" ||
                      entry.entryType === "domestic"
                    )
                      continue;
                    children255.push(
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
                  return keyed(children255);
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
                    const children256: ReactNode[] = [];
                    for (const entry of lectures) {
                      if (entry.entryType === "private") continue;
                      children256.push(
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
                    return keyed(children256);
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
            const children257: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryTags && entry.entryTags.language === "japanese")
                continue;
              if (entry.entryType === "phdthesis") continue;
              children257.push(
                <>
                  <Publication entry={entry} />
                </>,
              );
            }
            return keyed(children257);
          })()}
        </div>
        <h2 className="ui header" id={"domestic-publications"}>
          {"国内会議・ジャーナル・商業誌"}
        </h2>
        <div className="ui divided list">
          {(() => {
            const children258: ReactNode[] = [];
            for (const entry of publications) {
              if (!entry.entryTags || entry.entryTags.language !== "japanese")
                continue;
              if (entry.entryType === "phdthesis") continue;
              children258.push(
                <>
                  <Publication entry={entry} />
                </>,
              );
            }
            return keyed(children258);
          })()}
        </div>
        <h2 className="ui header" id={"dissertation"}>
          {"学位論文"}
        </h2>
        <div className="ui divided list">
          {(() => {
            const children259: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryType !== "phdthesis") continue;
              children259.push(
                <>
                  <Publication entry={entry} />
                </>,
              );
            }
            return keyed(children259);
          })()}
        </div>
      </>
    );
  }
  function renderMedia(): ReactNode {
    return (
      <>
        {(() => {
          const children260: ReactNode[] = [];
          const filteredMediaList = mediaList.filter(
            (entry) => !entry.private && !entry.draft,
          );
          const numInternationalMediaCoverage = filteredMediaList.reduce(
            (p, c) => p + (c.media?.en ? 1 : 0),
            0,
          );
          const numDomesticMediaCoverage =
            mediaList.length - numInternationalMediaCoverage;
          children260.push(
            <>
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
            </>,
          );
          children260.push(
            <>
              <div className="ui divided relaxed list media">
                {(() => {
                  const children261: ReactNode[] = [];
                  for (const entry of filteredMediaList) {
                    if (en && !entry.media[lang]) continue;
                    children261.push(
                      <>
                        <MediaItem m={entry} />
                      </>,
                    );
                  }
                  return keyed(children261);
                })()}
              </div>
            </>,
          );
          return keyed(children260);
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
