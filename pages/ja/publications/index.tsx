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

/** React page migrated from ja/publications/index.pug; edit this TSX source directly. */
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
            <div className="content">
              {plainText(en ? "Invited Talks" : "招待講演")}
            </div>
          </a>
          <a className="item" href={href("#lectures")}>
            <i className="graduation cap icon"></i>
            <div className="content">{plainText(en ? "Lectures" : "講義")}</div>
          </a>
          <a className="item" href={href("#academic-publications")}>
            <i className="book icon"></i>
            <div className="content">
              {plainText(en ? "Publications" : "発表文献")}
            </div>
          </a>
          <div className="item">
            <div className="ui list">
              <a className="item" href={href("#international-publications")}>
                <i className="right triangle icon"></i>
                <div className="content">{richText("国際")}</div>
              </a>
              <a className="item" href={href("#domestic-publications")}>
                <i className="right triangle icon"></i>
                <div className="content">{richText("国内")}</div>
              </a>
              <a className="item" href={href("#dissertation")}>
                <i className="right triangle icon"></i>
                <div className="content">{richText("学位論文")}</div>
              </a>
            </div>
          </div>
          <a className="item" href={href("#media")}>
            <i className="broadcast tower icon"></i>
            <div className="content">
              {plainText(en ? "Media" : "メディア")}
            </div>
          </a>
          <a className="item" href={href(`${basePath}timeline/`)}>
            <i className="history icon"></i>
            <div className="content">
              {plainText(en ? "Timeline" : "活動履歴")}
            </div>
          </a>
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
                <strong>{plainText(filteredAwards.length)}</strong>
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
                      const children249: ReactNode[] = [];
                      for (const entry of filteredAwards) {
                        children249.push(
                          <>
                            <div
                              className={classNames("item", entry.entryType)}
                            >
                              <i
                                className={classNames(
                                  "icon",
                                  entry.getIconClass(),
                                )}
                              ></i>
                              <div className="content">
                                <div className="header">
                                  {richText(entry.getText(lang))}
                                </div>
                                <div className="description date">
                                  {plainText(entry.getDateString(lang, true))}
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                      }
                      return keyed(children249);
                    })()}
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
                      const children250: ReactNode[] = [];
                      for (const entry of honors) {
                        children250.push(
                          <>
                            <div
                              className={classNames("item", entry.entryType)}
                            >
                              <i
                                className={classNames(
                                  "icon",
                                  entry.getIconClass(),
                                )}
                              ></i>
                              <div className="content">
                                <div className="header">
                                  {richText(entry.getText(lang))}
                                </div>
                                <div className="description date">
                                  {plainText(entry.getDateString(lang, true))}
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                      }
                      return keyed(children250);
                    })()}
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
        {(() => {
          const children251: ReactNode[] = [];
          if (en) {
            children251.push(
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
                            <div
                              className={classNames("item", entry.entryType)}
                            >
                              <div className="content">
                                <div className="header">
                                  {richText(entry.getText(lang))}
                                </div>
                                <div className="description date">
                                  {plainText(entry.getDateString(lang, true))}
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
              </>,
            );
          } else {
            children251.push(
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
                        const children253: ReactNode[] = [];
                        for (const entry of talks) {
                          if (entry.entryType === "private") continue;
                          children253.push(
                            <>
                              <div
                                className={classNames("item", entry.entryType)}
                              >
                                <i
                                  className={classNames(
                                    "icon",
                                    entry.getIconClass(),
                                  )}
                                ></i>
                                <div className="content">
                                  <div className="header">
                                    {richText(entry.getText(lang))}
                                  </div>
                                  <div className="description date">
                                    {plainText(entry.getDateString(lang, true))}
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
              </>,
            );
          }
          return keyed(children251);
        })()}
      </>
    );
  }
  function renderLectures(): ReactNode {
    return (
      <>
        {(() => {
          const children254: ReactNode[] = [];
          if (en) {
            children254.push(
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
                            <div
                              className={classNames("item", entry.entryType)}
                            >
                              <div className="content">
                                <div className="header">
                                  {richText(entry.getText(lang))}
                                </div>
                                <div className="description date">
                                  {plainText(
                                    entry.getDatesString(lang).join(", "),
                                  )}
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
              </>,
            );
          } else {
            children254.push(
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
                        const children256: ReactNode[] = [];
                        for (const entry of lectures) {
                          if (entry.entryType === "private") continue;
                          children256.push(
                            <>
                              <div
                                className={classNames("item", entry.entryType)}
                              >
                                <i
                                  className={classNames(
                                    "icon",
                                    entry.getIconClass(),
                                  )}
                                ></i>
                                <div className="content">
                                  <div className="header">
                                    {richText(entry.getText(lang))}
                                  </div>
                                  <div className="description date">
                                    {plainText(
                                      entry.getDatesString(lang).join(", "),
                                    )}
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
              </>,
            );
          }
          return keyed(children254);
        })()}
      </>
    );
  }
  function renderPublications(): ReactNode {
    return (
      <>
        <p>
          {richText("以下の発表文献リストは")}
          <a href={href("/junkato.bib")}>{richText("BibTeX ファイル")}</a>
          {richText("から自動生成されています。")}
          {richText("\n")}
          {richText("主務の産業技術総合研究所での成果に関しては")}
          <a href={href("https://staff.aist.go.jp/jun.kato/")}>
            {richText("研究所の個人ページ")}
          </a>
          {richText("にも掲載しています。")}
        </p>
        <h2 className="ui header" id={attribute("international-publications")}>
          {richText("国際会議・ジャーナル")}
        </h2>
        <div className="ui divided list">
          {(() => {
            const children257: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryTags && entry.entryTags.language === "japanese")
                continue;
              if (entry.entryType === "phdthesis") continue;
              children257.push(<>{content.renderPublication(entry)}</>);
            }
            return keyed(children257);
          })()}
        </div>
        <h2 className="ui header" id={attribute("domestic-publications")}>
          {richText("国内会議・ジャーナル・商業誌")}
        </h2>
        <div className="ui divided list">
          {(() => {
            const children258: ReactNode[] = [];
            for (const entry of publications) {
              if (!entry.entryTags || entry.entryTags.language !== "japanese")
                continue;
              if (entry.entryType === "phdthesis") continue;
              children258.push(<>{content.renderPublication(entry)}</>);
            }
            return keyed(children258);
          })()}
        </div>
        <h2 className="ui header" id={attribute("dissertation")}>
          {richText("学位論文")}
        </h2>
        <div className="ui divided list">
          {(() => {
            const children259: ReactNode[] = [];
            for (const entry of publications) {
              if (entry.entryType !== "phdthesis") continue;
              children259.push(<>{content.renderPublication(entry)}</>);
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
                  {plainText(
                    numInternationalMediaCoverage + numDomesticMediaCoverage,
                  )}
                </strong>
                {" 件（うち"}
                <a href={href(`${rootPath}publications/#media`)}>
                  {"国際 "}
                  <strong>{plainText(numInternationalMediaCoverage)}</strong>
                  {" 件"}
                </a>
                {richText("）紹介されてきました。")}
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
                    children261.push(<>{content.renderMediaItem(entry)}</>);
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
        <div className="right-content" id={attribute("publications")}>
          <section id={attribute("awards")}>
            <h1 className="ui header">
              <i className="trophy icon"></i>
              <div className="content">
                {plainText(en ? "Awards and Honors" : "受賞歴")}
              </div>
            </h1>
            {renderAwards()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={attribute("talks")}>
            <h1 className="ui header">
              <i className="talk icon"></i>
              <div className="content">
                {plainText(en ? "Invited Talks" : "招待講演")}
              </div>
            </h1>
            {renderTalks()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={attribute("lectures")}>
            <h1 className="ui header">
              <i className="graduation cap icon"></i>
              <div className="content">
                {plainText(en ? "Lectures" : "講義")}
              </div>
            </h1>
            {renderLectures()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={attribute("academic-publications")}>
            <h1 className="ui header">
              <i className="book icon"></i>
              <div className="content">
                {plainText(en ? "Publications" : "発表文献")}
              </div>
            </h1>
            {renderPublications()}
          </section>
          <div className="ui hidden divider"></div>
          <section id={attribute("media")}>
            <h1 className="ui header">
              {richText(" ")}
              <i className="broadcast tower icon"></i>
              <div className="content">
                {plainText(en ? "Media coverage" : "メディア掲載")}
              </div>
            </h1>
            {renderMedia()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}
