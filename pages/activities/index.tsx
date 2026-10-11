import { Fragment } from "react";
import { ProjectItem } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from activities/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projects, misc, moment, rootPath } = data;
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
  let confArr: any,
    hciArr: any,
    pxArr: any,
    rf: any,
    rfx: any,
    end: any,
    start: any;

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
  function renderMeetups(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="users icon"></i>
          {en ? "Meetups" : "勉強会"}
        </h2>

        {en ? (
          <>
            <p>
              {
                "I have founded and regularly held seminars and meetups for researchers and creators."
              }
            </p>
          </>
        ) : (
          <>
            <p>
              {"研究者とクリエータのための講演会や勉強会を運営しています。"}
            </p>
          </>
        )}

        <div className="ui divided items projects" id={"meetups-list"}>
          {(() => {
            const children47: ReactNode[] = [];
            for (const p of projects) {
              if (p.category !== "committee") continue;
              children47.push(
                <>
                  <ProjectItem p={p} />
                </>,
              );
            }
            return keyed(children47);
          })()}
        </div>
      </>
    );
  }
  function renderServices(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="lab icon"></i>
          {en ? "Academic services" : "学会活動"}
        </h2>

        <section id={"oc"}>
          <h3 className="ui header">
            {en ? "Organizing committee" : "運営委員"}
          </h3>

          {en ? (
            <>
              <p>
                {
                  "I have served as organizing committee members for academic conferences and workshops."
                }
              </p>
            </>
          ) : (
            <>
              <p>{"国際会議やワークショップなどを運営してきました。"}</p>
            </>
          )}

          <div className="ui stackable two columns grid">
            <div className="column">{renderServicesOcHci()}</div>
            <div className="column">
              {renderServicesOcMisc()}
              {renderServicesOcPx()}
              {renderServicesOcDomestic()}
            </div>
          </div>
        </section>

        <div className="ui divider"></div>

        <section id={"pc"}>
          <h3 className="ui header">
            {en ? "Program committee" : "プログラム委員"}
          </h3>

          {en ? (
            <>
              <p>
                {
                  "I have served as program committee members for academic conferences and journals."
                }
              </p>
            </>
          ) : (
            <>
              <p>
                {
                  "国際会議、ワークショップやジャーナルなどのプログラム委員を務めてきました。"
                }
              </p>
            </>
          )}

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
        </section>

        <div className="ui divider"></div>

        <h3 className="ui header">{en ? "Reviewer" : "査読"}</h3>

        {en ? (
          <>
            <p>
              {
                "I have served as regular reviewers for academic conferences and journals."
              }
            </p>
          </>
        ) : (
          <>
            <p>
              {
                "以下の国際会議や国際ジャーナルにおいて、学術論文の査読を行ってきました。"
              }
            </p>
          </>
        )}

        <div className="ui horizontal divided list reviewers-list">
          {renderServicesReviewers()}
        </div>

        <div className="ui hidden divider"></div>

        <section id={"miscellaneous"}>{renderServicesMiscellaneous()}</section>
      </>
    );
  }
  function renderPrintServiceOrganizer(organizer: any = undefined): ReactNode {
    return (
      <>
        <div className="ui item">
          <div className="header">
            <SiteLink
              href={href(organizer.event.url || organizer.url)}
              title={organizer.event.fullname}
            >
              {organizer.event.name}
            </SiteLink>
          </div>
          <div className="meta">
            {organizer.track ? (
              <>{organizer.track.fullname || organizer.track.name} </>
            ) : null}
            {organizer.title}
            {organizer.subtitle ? (
              <>
                {" ("}
                {organizer.subtitle}
                {")"}
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  }
  function renderServicesPcHci(): ReactNode {
    return (
      <>
        <h4 className="ui header">{"Human-Computer Interaction"}</h4>
        <div className="ui list">
          {(() => {
            const children52: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (hciArr.reduce(rf(organizer), true)) continue;
              if (organizer.class === "chair" || organizer.class === "oc")
                continue;
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
          <HtmlContent
            html={
              en
                ? "Programming Experience"
                : 'プログラミング体験 (<abbr title="Programming Experience">PX</abbr>)'
            }
          />
        </h4>
        <div className="ui list">
          {(() => {
            const children53: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (pxArr.reduce(rf(organizer), true)) continue;
              if (organizer.class === "chair" || organizer.class === "oc")
                continue;
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
          {en
            ? "Computer Graphics, Human-Robot Interaction, etc."
            : "Computer Graphics, Human-Robot Interaction など"}
        </h4>
        <div className="ui list">
          {(() => {
            const children54: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if ([...hciArr, ...pxArr].reduce(rfx(organizer), false)) continue;
              if (organizer.class === "chair" || organizer.class === "oc")
                continue;
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
        {!en ? (
          <>
            <h4 className="ui header">{"国内会議"}</h4>

            <div className="ui list">
              <div className="ui item">
                <div className="header">
                  {"情報処理学会シンポジウム "}
                  <a href={"https://www.interaction-ipsj.org"}>
                    {"インタラクション"}
                  </a>
                </div>
                <div className="meta">
                  {"プログラム委員 (2017-"}
                  {buildYear}
                  {")"}
                </div>
              </div>
              <div className="ui item">
                <div className="header">
                  {"日本ソフトウェア科学会 "}
                  <a
                    href={"https://wiss.org/"}
                    title={
                      "インタラクティブシステムとソフトウェアに関するワークショップ"
                    }
                  >
                    {"WISS"}
                  </a>
                </div>
                <div className="meta">{"プログラム委員 (2015-2019, 2025)"}</div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
  function renderServicesOcHci(): ReactNode {
    return (
      <>
        <h4 className="ui header">{"Human-Computer Interaction"}</h4>
        <div className="ui list">
          {(() => {
            const children56: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (hciArr.reduce(rf(organizer), true)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc")
                continue;
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
          <HtmlContent
            html={
              en
                ? "Programming Experience"
                : 'プログラミング体験 (<abbr title="Programming Experience">PX</abbr>)'
            }
          />
        </h4>
        <div className="ui list">
          {(() => {
            const children57: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (pxArr.reduce(rf(organizer), true)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc")
                continue;
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
          {en
            ? "Computer Graphics, Human-Robot Interaction, etc."
            : "Computer Graphics, Human-Robot Interaction など"}
        </h4>
        <div className="ui list">
          {(() => {
            const children58: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if ([...hciArr, ...pxArr].reduce(rfx(organizer), false)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc")
                continue;
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
        {!en ? (
          <>
            <h4 className="ui header">{"国内会議"}</h4>

            <div className="ui list">
              <div className="ui item">
                <div className="header">
                  {"日本ソフトウェア科学会 "}
                  <a
                    href={"https://wiss.org/"}
                    title={
                      "インタラクティブシステムとソフトウェアに関するワークショップ"
                    }
                  >
                    {"WISS"}
                  </a>
                </div>
                <div className="meta">
                  {
                    "Web/投票/ローカルサーバ担当 運営委員 (2015-2019), Web担当 運営委員 (2025)"
                  }
                </div>
              </div>
              <div className="ui item">
                <div className="header">
                  {"情報処理学会 "}
                  <a href={"https://ipsj-one.org/"}>{"IPSJ-ONE"}</a>
                </div>
                <div className="meta">
                  {"Web担当 運営委員 ("}
                  <a href={"https://ipsj-one.org/2015/"}>{"2015"}</a>
                  {", "}
                  <a href={"https://ipsj-one.org/2017/"}>{"2017"}</a>
                  {")"}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
  function renderServicesReviewers(): ReactNode {
    return (
      <>
        {misc.services.reviewers.map((reviewer, itemIndex) => (
          <Fragment key={itemIndex}>
            <div className="item">
              <div className="header">
                <abbr title={reviewer.title}>{reviewer.venue}</abbr>
              </div>
              <div className="meta">{formatYears(reviewer.years)}</div>
            </div>
          </Fragment>
        ))}
      </>
    );
  }
  function renderServicesMiscellaneous(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="book icon"></i>
          {en ? "Miscellaneous" : "その他の活動"}
        </h2>
        <div className="ui divided list miscellaneous-list">
          {(() => {
            const children61: ReactNode[] = [];
            for (let activity of misc.services.miscellaneous) {
              const date = en
                ? activity.date
                : (activity.ja && activity.ja.date) || activity.date || "";
              const description =
                (!en && activity.ja && activity.ja.description) ||
                activity.description ||
                "";
              let url = null;
              if (activity.url && (en || !(activity.ja && activity.ja.url))) {
                url = activity.url;
              } else if (!en && activity.ja && activity.ja.url) {
                url = activity.ja.url;
              }
              const linkOrDescription = url
                ? `<a href="${url}">${description}</a>`
                : description;
              children61.push(
                <>
                  <div className="item">
                    <div className="content">
                      <div className="header">
                        <HtmlContent
                          html={
                            en || !(activity.ja && activity.ja.title)
                              ? activity.title
                              : activity.ja.title
                          }
                        />
                      </div>
                      <div className="meta">
                        <HtmlContent
                          html={[date, linkOrDescription]
                            .filter(Boolean)
                            .join(", ")}
                        />
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
                      {en
                        ? "Graphic & Interaction Design"
                        : "グラフィック & インタラクションデザイン"}
                    </div>
                    <div className="meta">
                      <HtmlContent
                        html={
                          en
                            ? `Please refer to <a href=\"${rootPath}design\">the design portfolio</a>.`
                            : `<a href=\"${rootPath}ja/design\">デザインのポートフォリオ</a>をご覧ください。`
                        }
                      />
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
                    <div className="header">
                      {en ? "Invited talks" : "招待講演"}
                    </div>
                    <div className="meta">
                      <HtmlContent
                        html={
                          en
                            ? `Please refer to <a href=\"${rootPath}publications/#talks\">the dedicated section in Publications</a>.`
                            : `<a href=\"${rootPath}ja/publications/#talks\">発表文献の該当箇所</a>をご覧ください。`
                        }
                      />
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
                    <div className="header">{en ? "Lectures" : "講義"}</div>
                    <div className="meta">
                      <HtmlContent
                        html={
                          en
                            ? `Please refer to <a href=\"${rootPath}publications/#lectures\">the dedicated section in Publications</a>.`
                            : `<a href=\"${rootPath}ja/publications/#lectures\">発表文献の該当箇所</a>をご覧ください。`
                        }
                      />
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
          {en ? "Visited places" : "訪問先"}
        </h2>
        <div className="ui stackable two columns grid">
          <div className="column">
            <iframe
              width={"100%"}
              height={"360"}
              frameBorder={"0"}
              src={
                "https://www.google.com/maps/d/embed?mid=1DBSXYXwQgOVT29JJVTur1dulUC4"
              }
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
                            <abbr title={conference.title}>
                              {conference.name}
                            </abbr>
                          </div>
                          <div className="meta">
                            {(() => {
                              const children63: ReactNode[] = [];
                              let totalLocations = conference.locations.length;
                              conference.locations.forEach(
                                (location, index) => {
                                  children63.push(
                                    <>
                                      <SiteLink href={href(location.link)}>
                                        {location.year}
                                      </SiteLink>
                                      {" ("}
                                      {location.city}
                                      {", "}
                                      {location.country}
                                      {")"}
                                    </>,
                                  );
                                  if (index < totalLocations - 1)
                                    children63.push(", ");
                                },
                              );
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
                        {en ? "Other attended conferences" : "その他の国際会議"}
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
                                  <SiteLink
                                    href={href(location.link)}
                                    title={location.title || undefined}
                                  >
                                    {conf.name} {location.year}
                                  </SiteLink>
                                </>,
                              );
                              children64.push(<>{" ("}</>);
                              children64.push(<>{location.city}</>);
                              children64.push(<>{", "}</>);
                              children64.push(<>{location.country}</>);
                              children64.push(<>{")"}</>);
                              if (
                                locIndex < conf.locations.length - 1 ||
                                confIndex < oConfArr.length - 1
                              ) {
                                children64.push(", ");
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
                <a className="item" href={"#meetups"}>
                  <i className="users icon"></i>
                  <div className="content">{en ? "Meetups" : "勉強会"}</div>
                </a>
                <a className="item" href={"#services"}>
                  <i className="lab icon"></i>
                  <div className="content">{en ? "Academic" : "学会活動"}</div>
                </a>
                <a className="item" href={"#miscellaneous"}>
                  <i className="book icon"></i>
                  <div className="content">{en ? "Others" : "その他"}</div>
                </a>
                <a className="item" href={"#places"}>
                  <i className="world icon"></i>
                  <div className="content">
                    {en ? "Visited places" : "訪問先"}
                  </div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section>
          <h1 className="ui header">
            <i className="student icon"></i>
            {title}
          </h1>
          <div className="ui segment">
            <div className="ui feed">
              <div className="event">
                <div className="label">
                  <img src={`${rootPath}images/junkato.jpg`} />
                </div>
                <div className="content">
                  {"Hi! I am open for collaborations. Please see "}
                  <SiteLink href={href(`${basePath}collaborations/`)}>
                    <i className="handshake icon"></i>
                    {"Collaborations"}
                  </SiteLink>
                  {" for more details."}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden clearing divider"></div>
        <section id={"meetups"}>{renderMeetups()}</section>
        <div className="ui hidden divider"></div>
        <section id={"services"}>{renderServices()}</section>
        <div className="ui hidden divider"></div>
        <section id={"places"}>{renderPlaces()}</section>
      </SiteLayout>
    </>
  );
}
