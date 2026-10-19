import {
  Button,
  Divider,
  Feed,
  Grid,
  Header,
  Icon,
  Item,
  List,
  Segment,
} from "react-fomantic-ui";

import { SitePopup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { Fragment, type ReactNode } from "react";
import { ProjectItem } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: message. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projects, misc, rootPath } = data;
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
  function renderMeetups(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="users" />
          {en ? "Meetups" : "勉強会"}
        </Header>

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

        <Item.Group divided id={"meetups-list"} className="projects">
          {(() => {
            const children: ReactNode[] = [];
            for (const p of projects) {
              if (p.category !== "committee") continue;
              children.push(
                <>
                  <ProjectItem p={p} />
                </>,
              );
            }
            return keyed(children);
          })()}
        </Item.Group>
      </>
    );
  }
  function renderServices(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="lab" />
          {en ? "Academic services" : "学会活動"}
        </Header>

        <section id={"oc"}>
          <Header as="h3">{en ? "Organizing committee" : "運営委員"}</Header>

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

          <Grid stackable columns={2}>
            <Grid.Column>{renderServicesOcHci()}</Grid.Column>
            <Grid.Column>
              {renderServicesOcMisc()}
              {renderServicesOcPx()}
              {renderServicesOcDomestic()}
            </Grid.Column>
          </Grid>
        </section>

        <Divider />

        <section id={"pc"}>
          <Header as="h3">{en ? "Program committee" : "プログラム委員"}</Header>

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

          <Grid stackable columns={2}>
            <Grid.Column>
              {renderServicesPcHci()}
              {renderServicesPcMisc()}
            </Grid.Column>
            <Grid.Column>
              {renderServicesPcPx()}
              {renderServicesPcDomestic()}
            </Grid.Column>
          </Grid>
        </section>

        <Divider />

        <Header as="h3">{en ? "Reviewer" : "査読"}</Header>

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

        <List divided horizontal className="reviewers-list">
          {renderServicesReviewers()}
        </List>

        <Divider hidden />

        <section id={"miscellaneous"}>{renderServicesMiscellaneous()}</section>
      </>
    );
  }
  function renderPrintServiceOrganizer(organizer: any = undefined): ReactNode {
    return (
      <>
        <List.Item>
          <List.Header>
            <SiteLink
              href={href(organizer.event.url || organizer.url)}
              title={organizer.event.fullname}
            >
              {organizer.event.name}
            </SiteLink>
          </List.Header>
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
        </List.Item>
      </>
    );
  }
  function renderServicesPcHci(): ReactNode {
    return (
      <>
        <Header as="h4">{"Human-Computer Interaction"}</Header>
        <List>
          {(() => {
            const children: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (hciArr.reduce(rf(organizer), true)) continue;
              if (organizer.class === "chair" || organizer.class === "oc")
                continue;
              children.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children);
          })()}
        </List>
      </>
    );
  }
  function renderServicesPcPx(): ReactNode {
    return (
      <>
        <Header as="h4">
          <HtmlContent
            html={
              en
                ? "Programming Experience"
                : 'プログラミング体験 (<abbr title="Programming Experience">PX</abbr>)'
            }
          />
        </Header>
        <List>
          {(() => {
            const children: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (pxArr.reduce(rf(organizer), true)) continue;
              if (organizer.class === "chair" || organizer.class === "oc")
                continue;
              children.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children);
          })()}
        </List>
      </>
    );
  }
  function renderServicesPcMisc(): ReactNode {
    return (
      <>
        <Header as="h4">
          {en
            ? "Computer Graphics, Human-Robot Interaction, etc."
            : "Computer Graphics, Human-Robot Interaction など"}
        </Header>
        <List>
          {(() => {
            const children: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if ([...hciArr, ...pxArr].reduce(rfx(organizer), false)) continue;
              if (organizer.class === "chair" || organizer.class === "oc")
                continue;
              children.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children);
          })()}
        </List>
      </>
    );
  }
  function renderServicesPcDomestic(): ReactNode {
    return (
      <>
        {!en ? (
          <>
            <Header as="h4">{"国内会議"}</Header>

            <List>
              <List.Item>
                <List.Header>
                  {"情報処理学会シンポジウム "}
                  <a href={"https://www.interaction-ipsj.org"}>
                    {"インタラクション"}
                  </a>
                </List.Header>
                <div className="meta">
                  {"プログラム委員 (2017-"}
                  {buildYear}
                  {")"}
                </div>
              </List.Item>
              <List.Item>
                <List.Header>
                  {"日本ソフトウェア科学会 "}
                  <a
                    href={"https://wiss.org/"}
                    title={
                      "インタラクティブシステムとソフトウェアに関するワークショップ"
                    }
                  >
                    {"WISS"}
                  </a>
                </List.Header>
                <div className="meta">{"プログラム委員 (2015-2019, 2025)"}</div>
              </List.Item>
            </List>
          </>
        ) : null}
      </>
    );
  }
  function renderServicesOcHci(): ReactNode {
    return (
      <>
        <Header as="h4">{"Human-Computer Interaction"}</Header>
        <List>
          {(() => {
            const children: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (hciArr.reduce(rf(organizer), true)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc")
                continue;
              children.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children);
          })()}
        </List>
      </>
    );
  }
  function renderServicesOcPx(): ReactNode {
    return (
      <>
        <Header as="h4">
          <HtmlContent
            html={
              en
                ? "Programming Experience"
                : 'プログラミング体験 (<abbr title="Programming Experience">PX</abbr>)'
            }
          />
        </Header>
        <List>
          {(() => {
            const children: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if (pxArr.reduce(rf(organizer), true)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc")
                continue;
              children.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children);
          })()}
        </List>
      </>
    );
  }
  function renderServicesOcMisc(): ReactNode {
    return (
      <>
        <Header as="h4">
          {en
            ? "Computer Graphics, Human-Robot Interaction, etc."
            : "Computer Graphics, Human-Robot Interaction など"}
        </Header>
        <List>
          {(() => {
            const children: ReactNode[] = [];
            for (let organizer of misc.services.organizers) {
              if ([...hciArr, ...pxArr].reduce(rfx(organizer), false)) continue;
              if (organizer.class !== "chair" && organizer.class !== "oc")
                continue;
              children.push(<>{renderPrintServiceOrganizer(organizer)}</>);
            }
            return keyed(children);
          })()}
        </List>
      </>
    );
  }
  function renderServicesOcDomestic(): ReactNode {
    return (
      <>
        {!en ? (
          <>
            <Header as="h4">{"国内会議"}</Header>

            <List>
              <List.Item>
                <List.Header>
                  {"日本ソフトウェア科学会 "}
                  <a
                    href={"https://wiss.org/"}
                    title={
                      "インタラクティブシステムとソフトウェアに関するワークショップ"
                    }
                  >
                    {"WISS"}
                  </a>
                </List.Header>
                <div className="meta">
                  {
                    "Web/投票/ローカルサーバ担当 運営委員 (2015-2019), Web担当 運営委員 (2025)"
                  }
                </div>
              </List.Item>
              <List.Item>
                <List.Header>
                  {"情報処理学会 "}
                  <a href={"https://ipsj-one.org/"}>{"IPSJ-ONE"}</a>
                </List.Header>
                <div className="meta">
                  {"Web担当 運営委員 ("}
                  <a href={"https://ipsj-one.org/2015/"}>{"2015"}</a>
                  {", "}
                  <a href={"https://ipsj-one.org/2017/"}>{"2017"}</a>
                  {")"}
                </div>
              </List.Item>
            </List>
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
            <List.Item>
              <List.Header>
                <abbr title={reviewer.title}>{reviewer.venue}</abbr>
              </List.Header>
              <div className="meta">{formatYears(reviewer.years)}</div>
            </List.Item>
          </Fragment>
        ))}
      </>
    );
  }
  function renderServicesMiscellaneous(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="book" />
          {en ? "Miscellaneous" : "その他の活動"}
        </Header>
        <List divided className="miscellaneous-list">
          {(() => {
            const children: ReactNode[] = [];
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
              children.push(
                <>
                  <List.Item>
                    <List.Content>
                      <List.Header>
                        <HtmlContent
                          html={
                            en || !(activity.ja && activity.ja.title)
                              ? activity.title
                              : activity.ja.title
                          }
                        />
                      </List.Header>
                      <div className="meta">
                        <HtmlContent
                          html={[date, linkOrDescription]
                            .filter(Boolean)
                            .join(", ")}
                        />
                      </div>
                    </List.Content>
                  </List.Item>
                </>,
              );
            }
            children.push(
              <>
                <List.Item>
                  <Icon name="paint brush" />
                  <List.Content>
                    <List.Header>
                      {en
                        ? "Graphic & Interaction Design"
                        : "グラフィック & インタラクションデザイン"}
                    </List.Header>
                    <div className="meta">
                      <HtmlContent
                        html={
                          en
                            ? `Please refer to <a href=\"${rootPath}design\">the design portfolio</a>.`
                            : `<a href=\"${rootPath}ja/design\">デザインのポートフォリオ</a>をご覧ください。`
                        }
                      />
                    </div>
                  </List.Content>
                </List.Item>
              </>,
            );
            children.push(
              <>
                <List.Item>
                  <Icon name="talk" />
                  <List.Content>
                    <List.Header>
                      {en ? "Invited talks" : "招待講演"}
                    </List.Header>
                    <div className="meta">
                      <HtmlContent
                        html={
                          en
                            ? `Please refer to <a href=\"${rootPath}publications/#talks\">the dedicated section in Publications</a>.`
                            : `<a href=\"${rootPath}ja/publications/#talks\">発表文献の該当箇所</a>をご覧ください。`
                        }
                      />
                    </div>
                  </List.Content>
                </List.Item>
              </>,
            );
            children.push(
              <>
                <List.Item>
                  <Icon name="graduation cap" />
                  <List.Content>
                    <List.Header>{en ? "Lectures" : "講義"}</List.Header>
                    <div className="meta">
                      <HtmlContent
                        html={
                          en
                            ? `Please refer to <a href=\"${rootPath}publications/#lectures\">the dedicated section in Publications</a>.`
                            : `<a href=\"${rootPath}ja/publications/#lectures\">発表文献の該当箇所</a>をご覧ください。`
                        }
                      />
                    </div>
                  </List.Content>
                </List.Item>
              </>,
            );
            return keyed(children);
          })()}
        </List>
      </>
    );
  }
  function renderPlaces(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="world" />
          {en ? "Visited places" : "訪問先"}
        </Header>
        <Grid stackable columns={2}>
          <Grid.Column>
            <iframe
              width={"100%"}
              height={"360"}
              frameBorder={"0"}
              src={
                "https://www.google.com/maps/d/embed?mid=1DBSXYXwQgOVT29JJVTur1dulUC4"
              }
            ></iframe>
          </Grid.Column>
          <Grid.Column>
            <List divided>
              {(() => {
                const children: ReactNode[] = [];
                misc.services.attendances
                  .filter((c) => confArr.indexOf(c.name) >= 0)
                  .forEach((conference) => {
                    children.push(
                      <>
                        <List.Item>
                          <List.Header>
                            <abbr title={conference.title}>
                              {conference.name}
                            </abbr>
                          </List.Header>
                          <div className="meta">
                            {(() => {
                              const children: ReactNode[] = [];
                              let totalLocations = conference.locations.length;
                              conference.locations.forEach(
                                (location, index) => {
                                  children.push(
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
                                    children.push(", ");
                                },
                              );
                              return keyed(children);
                            })()}
                          </div>
                        </List.Item>
                      </>,
                    );
                  });
                children.push(
                  <>
                    <List.Item>
                      <List.Header>
                        {en ? "Other attended conferences" : "その他の国際会議"}
                      </List.Header>
                      <div className="meta">
                        {(() => {
                          const children: ReactNode[] = [];
                          const oConfArr = misc.services.attendances.filter(
                            (c) => confArr.indexOf(c.name) < 0,
                          );
                          oConfArr.forEach((conf, confIndex) => {
                            conf.locations.forEach((location, locIndex) => {
                              children.push(
                                <>
                                  <SiteLink
                                    href={href(location.link)}
                                    title={location.title || undefined}
                                  >
                                    {conf.name} {location.year}
                                  </SiteLink>
                                </>,
                              );
                              children.push(<>{" ("}</>);
                              children.push(<>{location.city}</>);
                              children.push(<>{", "}</>);
                              children.push(<>{location.country}</>);
                              children.push(<>{")"}</>);
                              if (
                                locIndex < conf.locations.length - 1 ||
                                confIndex < oConfArr.length - 1
                              ) {
                                children.push(", ");
                              }
                            });
                          });
                          return keyed(children);
                        })()}
                      </div>
                    </List.Item>
                  </>,
                );
                return keyed(children);
              })()}
            </List>
          </Grid.Column>
        </Grid>
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
                  className="popup-menu hidden"
                >
                  <Icon name="sidebar" />
                </Button>
              }
            >
              <List divided>
                <List.Item role="link" as="a" href={"#meetups"}>
                  <Icon name="users" />
                  <List.Content>{en ? "Meetups" : "勉強会"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#services"}>
                  <Icon name="lab" />
                  <List.Content>{en ? "Academic" : "学会活動"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#miscellaneous"}>
                  <Icon name="book" />
                  <List.Content>{en ? "Others" : "その他"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#places"}>
                  <Icon name="world" />
                  <List.Content>
                    {en ? "Visited places" : "訪問先"}
                  </List.Content>
                </List.Item>
              </List>
            </SitePopup>
          </>
        }
      >
        <section>
          <Header as="h1">
            <Icon name="student" />
            {title}
          </Header>
          <Segment>
            <Feed>
              <Feed.Event>
                <Feed.Label>
                  <SiteImage src={`${rootPath}images/junkato.jpg`} />
                </Feed.Label>
                <Feed.Content>
                  {en
                    ? "Hi! I am open for collaborations. Please see "
                    : "共同研究の相談やお仕事の依頼については "}
                  <SiteLink href={href(`${basePath}collaborations/`)}>
                    <Icon name="handshake" />
                    {en ? "Collaborations" : "共同研究"}
                  </SiteLink>
                  {en ? " for more details." : " のページを見てみてください。"}
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
        </section>
        <Divider clearing hidden />
        <section id={"meetups"}>{renderMeetups()}</section>
        <Divider hidden />
        <section id={"services"}>{renderServices()}</section>
        <Divider hidden />
        <section id={"places"}>{renderPlaces()}</section>
      </SiteLayout>
    </>
  );
}
