import { buildYear } from "@/site/clock";
import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from activities/index.pug; edit this TSX source directly. */
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
  let confArr: any, hciArr: any, pxArr: any, rf: any, rfx: any, end: any, start: any;

  title = en ? "Professional Activities" : "職務活動";
  me = "activities/";
  confArr = ["ACM CHI", "ACM UIST", "ACM DIS", "ACM SPLASH"];
  hciArr = ["CHI", "UIST", "IUI"];
  pxArr = ["LIVE", "SPLASH", "VL/HCC", "Programming", "ECOOP", "PX/"];
  rf = (organizer) => (p, c) =>
    p &&
    organizer.event.name.indexOf(c) < 0 &&
    (!organizer.conference || organizer.conference.name.indexOf(c) < 0);
  rfx = (organizer) => (p, c) =>
    p ||
    organizer.event.name.indexOf(c) >= 0 ||
    (organizer.conference && organizer.conference.name.indexOf(c) >= 0);
  function formatYears(years) {
    years.sort(function (a, b) {
      return a - b;
    });
    var ranges = [];
    var start = years[0];
    var end = years[0];

    for (var i = 1; i <= years.length; i++) {
      if (years[i] === end + 1) {
        end = years[i];
      } else {
        if (start === end) {
          ranges.push("" + start);
        } else {
          ranges.push(start + "-" + end);
        }
        start = years[i];
        end = years[i];
      }
    }
    return ranges.join(", ");
  }
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
  function renderMeetups(): ReactNode {
    return (
      <>
        {(() => {
          const children46: ReactNode[] = [];
          children46.push(
            <>
              <h2 className="ui header">
                <i className="users icon"></i>
                {plainText(en ? "Meetups" : "勉強会")}
              </h2>
            </>,
          );
          if (en) {
            children46.push(
              <>
                <p>
                  {richText(
                    "I have founded and regularly held seminars and meetups for researchers and creators.",
                  )}
                </p>
              </>,
            );
          } else {
            children46.push(
              <>
                <p>{richText("研究者とクリエータのための講演会や勉強会を運営しています。")}</p>
              </>,
            );
          }
          children46.push(
            <>
              <div className="ui divided items projects" id={attribute("meetups-list")}>
                {(() => {
                  const children47: ReactNode[] = [];
                  for (const p of projects) {
                    if (p.category !== "committee") continue;
                    children47.push(<>{content.renderProjectItem(p)}</>);
                  }
                  return keyed(children47);
                })()}
              </div>
            </>,
          );
          return keyed(children46);
        })()}
      </>
    );
  }
  function renderServices(): ReactNode {
    return (
      <>
        {(() => {
          const children48: ReactNode[] = [];
          children48.push(
            <>
              <h2 className="ui header">
                <i className="lab icon"></i>
                {plainText(en ? "Academic services" : "学会活動")}
              </h2>
            </>,
          );
          children48.push(
            <>
              <section id={attribute("oc")}>
                {(() => {
                  const children49: ReactNode[] = [];
                  children49.push(
                    <>
                      <h3 className="ui header">
                        {plainText(en ? "Organizing committee" : "運営委員")}
                      </h3>
                    </>,
                  );
                  if (en) {
                    children49.push(
                      <>
                        <p>
                          {richText(
                            "I have served as organizing committee members for academic conferences and workshops.",
                          )}
                        </p>
                      </>,
                    );
                  } else {
                    children49.push(
                      <>
                        <p>{richText("国際会議やワークショップなどを運営してきました。")}</p>
                      </>,
                    );
                  }
                  children49.push(
                    <>
                      <div className="ui stackable two columns grid">
                        <div className="column">{renderServicesOcHci()}</div>
                        <div className="column">
                          {renderServicesOcMisc()}
                          {renderServicesOcPx()}
                          {renderServicesOcDomestic()}
                        </div>
                      </div>
                    </>,
                  );
                  return keyed(children49);
                })()}
              </section>
            </>,
          );
          children48.push(
            <>
              <div className="ui divider"></div>
            </>,
          );
          children48.push(
            <>
              <section id={attribute("pc")}>
                {(() => {
                  const children50: ReactNode[] = [];
                  children50.push(
                    <>
                      <h3 className="ui header">
                        {plainText(en ? "Program committee" : "プログラム委員")}
                      </h3>
                    </>,
                  );
                  if (en) {
                    children50.push(
                      <>
                        <p>
                          {richText(
                            "I have served as program committee members for academic conferences and journals.",
                          )}
                        </p>
                      </>,
                    );
                  } else {
                    children50.push(
                      <>
                        <p>
                          {richText(
                            "国際会議、ワークショップやジャーナルなどのプログラム委員を務めてきました。",
                          )}
                        </p>
                      </>,
                    );
                  }
                  children50.push(
                    <>
                      <div className="ui stackable two columns grid">
                        <div className="column">
                          {renderServicesPcHci()}
                          {renderServicesPcMisc()}
                        </div>
                        <div className="column">
                          {renderServicesPcPx()}
                          {renderServicesPcDomestic()}
                        </div>
                      </div>
                    </>,
                  );
                  return keyed(children50);
                })()}
              </section>
            </>,
          );
          children48.push(
            <>
              <div className="ui divider"></div>
            </>,
          );
          children48.push(
            <>
              <h3 className="ui header">{plainText(en ? "Reviewer" : "査読")}</h3>
            </>,
          );
          if (en) {
            children48.push(
              <>
                <p>
                  {richText(
                    "I have served as regular reviewers for academic conferences and journals.",
                  )}
                </p>
              </>,
            );
          } else {
            children48.push(
              <>
                <p>
                  {richText(
                    "以下の国際会議や国際ジャーナルにおいて、学術論文の査読を行ってきました。",
                  )}
                </p>
              </>,
            );
          }
          children48.push(
            <>
              <div className="ui horizontal divided list reviewers-list">
                {renderServicesReviewers()}
              </div>
            </>,
          );
          children48.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children48.push(
            <>
              <section id={attribute("miscellaneous")}>{renderServicesMiscellaneous()}</section>
            </>,
          );
          return keyed(children48);
        })()}
      </>
    );
  }
  function renderPrintServiceOrganizer(organizer: any = undefined): ReactNode {
    return (
      <>
        <div className="ui item">
          <div className="header">
            <a href={href(organizer.event.url || organizer.url)} title={organizer.event.fullname}>
              {plainText(organizer.event.name)}
            </a>
          </div>
          <div className="meta">
            {(() => {
              const children51: ReactNode[] = [];
              if (organizer.track) {
                children51.push(<>{plainText(organizer.track.fullname || organizer.track.name)}</>);
                children51.push(<>{richText(" ")}</>);
              }
              children51.push(<>{plainText(organizer.title)}</>);
              if (organizer.subtitle) {
                children51.push(<>{richText(" (")}</>);
                children51.push(<>{plainText(organizer.subtitle)}</>);
                children51.push(<>{richText(")")}</>);
              }
              return keyed(children51);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderServicesPcHci(): ReactNode {
    return (
      <>
        <h4 className="ui header">{richText("Human-Computer Interaction")}</h4>
        <div className="ui list">
          {(() => {
            const children52: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (hciArr.reduce(rf(organizer), true)) continue;
              if (organizer.class === "chair" || organizer.class === "oc") continue;
              children52.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children52);
          })()}
        </div>
      </>
    );
  }
  function renderServicesPcPx(): ReactNode {
    return (
      <>
        <h4 className="ui header">
          {richText(
            en
              ? "Programming Experience"
              : 'プログラミング体験 (<abbr title="Programming Experience">PX</abbr>)',
          )}
        </h4>
        <div className="ui list">
          {(() => {
            const children53: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (pxArr.reduce(rf(organizer), true)) continue;
              if (organizer.class === "chair" || organizer.class === "oc") continue;
              children53.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children53);
          })()}
        </div>
      </>
    );
  }
  function renderServicesPcMisc(): ReactNode {
    return (
      <>
        <h4 className="ui header">
          {plainText(
            en
              ? "Computer Graphics, Human-Robot Interaction, etc."
              : "Computer Graphics, Human-Robot Interaction など",
          )}
        </h4>
        <div className="ui list">
          {(() => {
            const children54: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if ([...hciArr, ...pxArr].reduce(rfx(organizer), false)) continue;
              if (organizer.class === "chair" || organizer.class === "oc") continue;
              children54.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children54);
          })()}
        </div>
      </>
    );
  }
  function renderServicesPcDomestic(): ReactNode {
    return (
      <>
        {(() => {
          const children55: ReactNode[] = [];
          if (!en) {
            children55.push(
              <>
                <h4 className="ui header">{richText("国内会議")}</h4>
              </>,
            );
            children55.push(
              <>
                <div className="ui list">
                  <div className="ui item">
                    <div className="header">
                      {richText(
                        '情報処理学会シンポジウム <a href="https://www.interaction-ipsj.org">インタラクション</a>',
                      )}
                    </div>
                    <div className="meta">
                      {richText("プログラム委員 (2017-")}
                      {plainText(buildYear)}
                      {richText(")")}
                    </div>
                  </div>
                  <div className="ui item">
                    <div className="header">
                      {richText(
                        '日本ソフトウェア科学会 <a href="https://wiss.org/" title="インタラクティブシステムとソフトウェアに関するワークショップ">WISS</a>',
                      )}
                    </div>
                    <div className="meta">{richText("プログラム委員 (2015-2019, 2025)")}</div>
                  </div>
                </div>
              </>,
            );
          }
          return keyed(children55);
        })()}
      </>
    );
  }
  function renderServicesOcHci(): ReactNode {
    return (
      <>
        <h4 className="ui header">{richText("Human-Computer Interaction")}</h4>
        <div className="ui list">
          {(() => {
            const children56: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (hciArr.reduce(rf(organizer), true)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc") continue;
              children56.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children56);
          })()}
        </div>
      </>
    );
  }
  function renderServicesOcPx(): ReactNode {
    return (
      <>
        <h4 className="ui header">
          {richText(
            en
              ? "Programming Experience"
              : 'プログラミング体験 (<abbr title="Programming Experience">PX</abbr>)',
          )}
        </h4>
        <div className="ui list">
          {(() => {
            const children57: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (pxArr.reduce(rf(organizer), true)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc") continue;
              children57.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children57);
          })()}
        </div>
      </>
    );
  }
  function renderServicesOcMisc(): ReactNode {
    return (
      <>
        <h4 className="ui header">
          {plainText(
            en
              ? "Computer Graphics, Human-Robot Interaction, etc."
              : "Computer Graphics, Human-Robot Interaction など",
          )}
        </h4>
        <div className="ui list">
          {(() => {
            const children58: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if ([...hciArr, ...pxArr].reduce(rfx(organizer), false)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc") continue;
              children58.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children58);
          })()}
        </div>
      </>
    );
  }
  function renderServicesOcDomestic(): ReactNode {
    return (
      <>
        {(() => {
          const children59: ReactNode[] = [];
          if (!en) {
            children59.push(
              <>
                <h4 className="ui header">{richText("国内会議")}</h4>
              </>,
            );
            children59.push(
              <>
                <div className="ui list">
                  <div className="ui item">
                    <div className="header">
                      {richText(
                        '日本ソフトウェア科学会 <a href="https://wiss.org/" title="インタラクティブシステムとソフトウェアに関するワークショップ">WISS</a>',
                      )}
                    </div>
                    <div className="meta">
                      {richText(
                        "Web/投票/ローカルサーバ担当 運営委員 (2015-2019), Web担当 運営委員 (2025)",
                      )}
                    </div>
                  </div>
                  <div className="ui item">
                    <div className="header">
                      {richText('情報処理学会 <a href="https://ipsj-one.org/">IPSJ-ONE</a>')}
                    </div>
                    <div className="meta">
                      {richText("Web担当 運営委員 (")}
                      <a href={href("https://ipsj-one.org/2015/")}>{richText("2015")}</a>
                      {richText(", ")}
                      <a href={href("https://ipsj-one.org/2017/")}>{richText("2017")}</a>
                      {richText(")")}
                    </div>
                  </div>
                </div>
              </>,
            );
          }
          return keyed(children59);
        })()}
      </>
    );
  }
  function renderServicesReviewers(): ReactNode {
    return (
      <>
        {(() => {
          const children60: ReactNode[] = [];
          for (let reviewer of misc.services.reviewers) {
            children60.push(
              <>
                <div className="item">
                  <div className="header">
                    <abbr title={reviewer.title}>{plainText(reviewer.venue)}</abbr>
                  </div>
                  <div className="meta">{plainText(formatYears(reviewer.years))}</div>
                </div>
              </>,
            );
          }
          return keyed(children60);
        })()}
      </>
    );
  }
  function renderServicesMiscellaneous(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="book icon"></i>
          {plainText(en ? "Miscellaneous" : "その他の活動")}
        </h2>
        <div className="ui divided list miscellaneous-list">
          {(() => {
            const children61: ReactNode[] = [];
            for (let activity of misc.services.miscellaneous) {
              const date = en
                ? activity.date
                : (activity.ja && activity.ja.date) || activity.date || "";
              const description =
                (!en && activity.ja && activity.ja.description) || activity.description || "";
              let url = null;
              if (activity.url && (en || !(activity.ja && activity.ja.url))) {
                url = activity.url;
              } else if (!en && activity.ja && activity.ja.url) {
                url = activity.ja.url;
              }
              const linkOrDescription = url ? `<a href="${url}">${description}</a>` : description;
              children61.push(
                <>
                  <div className="item">
                    <div className="content">
                      <div className="header">
                        {richText(
                          en || !(activity.ja && activity.ja.title)
                            ? activity.title
                            : activity.ja.title,
                        )}
                      </div>
                      <div className="meta">
                        {richText([date, linkOrDescription].filter(Boolean).join(", "))}
                      </div>
                    </div>
                  </div>
                </>,
              );
            }
            children61.push(
              <>
                <div className="item">
                  <i className="paint brush icon"></i>
                  <div className="content">
                    <div className="header">
                      {plainText(
                        en
                          ? "Graphic & Interaction Design"
                          : "グラフィック & インタラクションデザイン",
                      )}
                    </div>
                    <div className="meta">
                      {richText(
                        en
                          ? `Please refer to <a href=\"${rootPath}design\">the design portfolio</a>.`
                          : `<a href=\"${rootPath}ja/design\">デザインのポートフォリオ</a>をご覧ください。`,
                      )}
                    </div>
                  </div>
                </div>
              </>,
            );
            children61.push(
              <>
                <div className="item">
                  <i className="talk icon"></i>
                  <div className="content">
                    <div className="header">{plainText(en ? "Invited talks" : "招待講演")}</div>
                    <div className="meta">
                      {richText(
                        en
                          ? `Please refer to <a href=\"${rootPath}publications/#talks\">the dedicated section in Publications</a>.`
                          : `<a href=\"${rootPath}ja/publications/#talks\">発表文献の該当箇所</a>をご覧ください。`,
                      )}
                    </div>
                  </div>
                </div>
              </>,
            );
            children61.push(
              <>
                <div className="item">
                  <i className="graduation cap icon"></i>
                  <div className="content">
                    <div className="header">{plainText(en ? "Lectures" : "講義")}</div>
                    <div className="meta">
                      {richText(
                        en
                          ? `Please refer to <a href=\"${rootPath}publications/#lectures\">the dedicated section in Publications</a>.`
                          : `<a href=\"${rootPath}ja/publications/#lectures\">発表文献の該当箇所</a>をご覧ください。`,
                      )}
                    </div>
                  </div>
                </div>
              </>,
            );
            return keyed(children61);
          })()}
        </div>
      </>
    );
  }
  function renderPlaces(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="world icon"></i>
          {plainText(en ? "Visited places" : "訪問先")}
        </h2>
        <div className="ui stackable two columns grid">
          <div className="column">
            <iframe
              width={"100%"}
              height={"360"}
              frameBorder={"0"}
              src={"https://www.google.com/maps/d/embed?mid=1DBSXYXwQgOVT29JJVTur1dulUC4"}
            ></iframe>
          </div>
          <div className="column">
            <div className="ui divided list">
              {(() => {
                const children62: ReactNode[] = [];
                misc.services.attendances
                  .filter((c) => confArr.indexOf(c.name) >= 0)
                  .forEach((conference) => {
                    children62.push(
                      <>
                        <div className="item">
                          <div className="header">
                            <abbr title={conference.title}>{plainText(conference.name)}</abbr>
                          </div>
                          <div className="meta">
                            {(() => {
                              const children63: ReactNode[] = [];
                              let totalLocations = conference.locations.length;
                              conference.locations.forEach((location, index) => {
    children63.push(<><a href={href(location.link)}>{plainText(location.year)}</a>{" ("}{plainText(location.city)}{", "}{plainText(location.country)}{")"}</>);
    if (index < totalLocations - 1) children63.push(", ");
  });
                              return keyed(children63);
                            })()}
                          </div>
                        </div>
                      </>,
                    );
                  });
                children62.push(
                  <>
                    <div className="item">
                      <div className="header">
                        {plainText(en ? "Other attended conferences" : "その他の国際会議")}
                      </div>
                      <div className="meta">
                        {(() => {
                          const children64: ReactNode[] = [];
                          const oConfArr = misc.services.attendances.filter(
                            (c) => confArr.indexOf(c.name) < 0,
                          );
                          oConfArr.forEach((conf, confIndex) => {
                            conf.locations.forEach((location, locIndex) => {
                              children64.push(
                                <>
                                  <a href={href(location.link)} title={location.title || undefined}>
                                    {plainText(conf.name)}
                                    {richText(" ")}
                                    {plainText(location.year)}
                                  </a>
                                </>,
                              );
                              children64.push(<>{richText(" (")}</>);
                              children64.push(<>{plainText(location.city)}</>);
                              children64.push(<>{richText(", ")}</>);
                              children64.push(<>{plainText(location.country)}</>);
                              children64.push(<>{richText(")")}</>);
                              if (
                                locIndex < conf.locations.length - 1 ||
                                confIndex < oConfArr.length - 1
                              ) {children64.push(", ");
                              }
                            });
                          });
                          return keyed(children64);
                        })()}
                      </div>
                    </div>
                  </>,
                );
                return keyed(children62);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#meetups")}>
                  <i className="users icon"></i>
                  <div className="content">{plainText(en ? "Meetups" : "勉強会")}</div>
                </a>
                <a className="item" href={href("#services")}>
                  <i className="lab icon"></i>
                  <div className="content">{plainText(en ? "Academic" : "学会活動")}</div>
                </a>
                <a className="item" href={href("#miscellaneous")}>
                  <i className="book icon"></i>
                  <div className="content">{plainText(en ? "Others" : "その他")}</div>
                </a>
                <a className="item" href={href("#places")}>
                  <i className="world icon"></i>
                  <div className="content">{plainText(en ? "Visited places" : "訪問先")}</div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section>
          <h1 className="ui header">
            <i className="student icon"></i>
            {plainText(title)}
          </h1>
          <div className="ui segment">
            <div className="ui feed">
              <div className="event">
                <div className="label">
                  <img src={`${rootPath}images/junkato.jpg`} />
                </div>
                <div className="content">
                  {richText("Hi! I am open for collaborations. Please see ")}
                  <a href={href(`${basePath}collaborations/`)}>
                    <i className="handshake icon"></i>
                    {richText("Collaborations")}
                  </a>
                  {richText(" for more details.")}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden clearing divider"></div>
        <section id={attribute("meetups")}>{renderMeetups()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("services")}>{renderServices()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("places")}>{renderPlaces()}</section>
      </SiteLayout>
    </>
  );
}
