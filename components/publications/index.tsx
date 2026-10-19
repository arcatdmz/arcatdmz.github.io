import {
  Button,
  Divider,
  Header,
  Icon,
  List,
  Segment,
} from "react-fomantic-ui";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SitePopup } from "@/site/components/SiteWidgets";
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
        <List divided>
          <List.Item role="link" as="a" href={"#awards"}>
            <Icon name="trophy" />
            <List.Content>{en ? "Awards" : "受賞歴"}</List.Content>
          </List.Item>
          <List.Item role="link" as="a" href={"#talks"}>
            <Icon name="talk" />
            <List.Content>{en ? "Invited Talks" : "招待講演"}</List.Content>
          </List.Item>
          <List.Item role="link" as="a" href={"#lectures"}>
            <Icon name="graduation cap" />
            <List.Content>{en ? "Lectures" : "講義"}</List.Content>
          </List.Item>
          <List.Item role="link" as="a" href={"#academic-publications"}>
            <Icon name="book" />
            <List.Content>{en ? "Publications" : "発表文献"}</List.Content>
          </List.Item>
          <List.Item>
            <List>
              <LocalizedContent
                ja={
                  <>
                    <List.Item
                      role="link"
                      as="a"
                      href={"#international-publications"}
                    >
                      <Icon name="triangle right" />
                      <List.Content>{"国際"}</List.Content>
                    </List.Item>
                    <List.Item
                      role="link"
                      as="a"
                      href={"#domestic-publications"}
                    >
                      <Icon name="triangle right" />
                      <List.Content>{"国内"}</List.Content>
                    </List.Item>
                    <List.Item role="link" as="a" href={"#dissertation"}>
                      <Icon name="triangle right" />
                      <List.Content>{"学位論文"}</List.Content>
                    </List.Item>
                  </>
                }
              >
                <List.Item role="link" as="a" href={"#selected-publications"}>
                  <Icon name="triangle right" />
                  <List.Content>{"Selected"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#reviewed-publications"}>
                  <Icon name="triangle right" />
                  <List.Content>{"Reviewed"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#other-publications"}>
                  <Icon name="triangle right" />
                  <List.Content>{"Others"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#dissertation"}>
                  <Icon name="triangle right" />
                  <List.Content>{"Dissertation"}</List.Content>
                </List.Item>
              </LocalizedContent>
            </List>
          </List.Item>
          <List.Item role="link" as="a" href={"#media"}>
            <Icon className="broadcast tower" />
            <List.Content>{en ? "Media" : "メディア"}</List.Content>
          </List.Item>
          <List.Item
            role="link"
            as={SiteLink}
            href={href(`${basePath}timeline/`)}
          >
            <Icon name="history" />
            <List.Content>{en ? "Timeline" : "活動履歴"}</List.Content>
          </List.Item>
        </List>
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
              <Segment.Group>
                <Segment secondary>
                  <List horizontal>
                    <List.Item>
                      <Icon name="circle" />
                      <List.Content>
                        <HtmlContent
                          html={
                            en
                              ? `Domestic (<strong>${numDomesticAwards}</strong>)`
                              : `国内 <strong>${numDomesticAwards}</strong> 件`
                          }
                        />
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="world" />
                      <List.Content>
                        <HtmlContent
                          html={
                            en
                              ? `International (<strong>${numInternationalAwards}</strong>)`
                              : `国際 <strong>${numInternationalAwards}</strong> 件`
                          }
                        />
                      </List.Content>
                    </List.Item>
                  </List>
                </Segment>
                <Segment>
                  <List divided>
                    {filteredAwards.map((entry, itemIndex) => (
                      <Fragment key={itemIndex}>
                        <List.Item className={classNames(entry.entryType)}>
                          <Icon className={entry.getIconClass()}></Icon>
                          <List.Content>
                            <List.Header>
                              <HtmlContent html={entry.getText(lang)} />
                            </List.Header>
                            <List.Description className="date">
                              {entry.getDateString(lang, true)}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </Fragment>
                    ))}
                  </List>
                </Segment>
              </Segment.Group>
            </>,
          );
          children.push(
            <>
              <Segment.Group>
                <Segment secondary>
                  <p>
                    <HtmlContent
                      html={
                        en
                          ? `Other honors and recognitions (<strong>${honors.length}</strong>)`
                          : `その他の顕彰など <strong>${honors.length}</strong> 件`
                      }
                    />
                  </p>
                </Segment>
                <Segment>
                  <List divided>
                    {honors.map((entry, itemIndex) => (
                      <Fragment key={itemIndex}>
                        <List.Item className={classNames(entry.entryType)}>
                          <Icon className={entry.getIconClass()}></Icon>
                          <List.Content>
                            <List.Header>
                              <HtmlContent html={entry.getText(lang)} />
                            </List.Header>
                            <List.Description className="date">
                              {entry.getDateString(lang, true)}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </Fragment>
                    ))}
                  </List>
                </Segment>
              </Segment.Group>
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
            <Segment>
              <List divided>
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
                        <List.Item className={classNames(entry.entryType)}>
                          <List.Content>
                            <List.Header>
                              <HtmlContent html={entry.getText(lang)} />
                            </List.Header>
                            <List.Description className="date">
                              {entry.getDateString(lang, true)}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </>,
                    );
                  }
                  return keyed(children);
                })()}
              </List>
            </Segment>
          </>
        ) : (
          <>
            <Segment.Group>
              <Segment secondary>
                <List horizontal>
                  <List.Item>
                    <Icon name="circle" />
                    <List.Content>{"国内"}</List.Content>
                  </List.Item>
                  <List.Item>
                    <Icon name="world" />
                    <List.Content>{"国際"}</List.Content>
                  </List.Item>
                </List>
              </Segment>
              <Segment>
                <List divided>
                  {(() => {
                    const children: ReactNode[] = [];
                    for (const entry of talks) {
                      if (entry.entryType === "private") continue;
                      children.push(
                        <>
                          <List.Item className={classNames(entry.entryType)}>
                            <Icon className={entry.getIconClass()}></Icon>
                            <List.Content>
                              <List.Header>
                                <HtmlContent html={entry.getText(lang)} />
                              </List.Header>
                              <List.Description className="date">
                                {entry.getDateString(lang, true)}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        </>,
                      );
                    }
                    return keyed(children);
                  })()}
                </List>
              </Segment>
            </Segment.Group>
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
            <Segment>
              <List divided>
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
                        <List.Item className={classNames(entry.entryType)}>
                          <List.Content>
                            <List.Header>
                              <HtmlContent html={entry.getText(lang)} />
                            </List.Header>
                            <List.Description className="date">
                              {entry.getDatesString(lang).join(", ")}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </>,
                    );
                  }
                  return keyed(children);
                })()}
              </List>
            </Segment>
          </>
        ) : (
          <>
            <Segment.Group>
              <Segment secondary>
                <List horizontal>
                  <List.Item>
                    <Icon name="circle" />
                    <List.Content>{"国内"}</List.Content>
                  </List.Item>
                  <List.Item>
                    <Icon name="world" />
                    <List.Content>{"国際"}</List.Content>
                  </List.Item>
                </List>
              </Segment>
              <Segment>
                <List divided>
                  {(() => {
                    const children: ReactNode[] = [];
                    for (const entry of lectures) {
                      if (entry.entryType === "private") continue;
                      children.push(
                        <>
                          <List.Item className={classNames(entry.entryType)}>
                            <Icon className={entry.getIconClass()}></Icon>
                            <List.Content>
                              <List.Header>
                                <HtmlContent html={entry.getText(lang)} />
                              </List.Header>
                              <List.Description className="date">
                                {entry.getDatesString(lang).join(", ")}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        </>,
                      );
                    }
                    return keyed(children);
                  })()}
                </List>
              </Segment>
            </Segment.Group>
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
              <Header as="h2" id={"international-publications"}>
                {"国際会議・ジャーナル"}
              </Header>
              <List divided>
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
              </List>
              <Header as="h2" id={"domestic-publications"}>
                {"国内会議・ジャーナル・商業誌"}
              </Header>
              <List divided>
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
              </List>
              <Header as="h2" id={"dissertation"}>
                {"学位論文"}
              </Header>
            </>
          }
        >
          <p>
            {"The following publications list is automatically generated from "}
            <SiteLink href={"/junkato.bib"}>{"the BibTeX file"}</SiteLink>
            {"."}
          </p>
          <Header as="h2" id={"selected-publications"}>
            {"Selected peer-reviewed publications"}
          </Header>
          <List divided>
            {selectedPublications.map((entry, itemIndex) => (
              <Fragment key={itemIndex}>
                <Publication entry={entry} />
              </Fragment>
            ))}
          </List>
          <Divider hidden />
          <Header as="h2" id={"reviewed-publications"}>
            {"Journal/conference/workshop publications"}
          </Header>
          <p>
            {
              "All of these publications, except those explicitly marked as the invited articles, underwent a review process; most of these publications are considered either archival or semi-archival."
            }
          </p>
          <List divided>
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
          </List>
          <Divider hidden />
          <Header as="h2" id={"other-publications"}>
            {"Other publications"}
          </Header>
          <p>
            {
              "The following publications are either invited articles or non-archival demo/poster papers."
            }
          </p>
          <List divided>
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
          </List>
          <Divider hidden />
          <Header as="h2" id={"dissertation"}>
            {"Dissertation"}
          </Header>
        </LocalizedContent>
        <List divided>
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
        </List>
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
              <List divided relaxed className="media">
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
              </List>
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
              {renderPublicationsMenu()}
            </SitePopup>
          </>
        }
      >
        <div className="left-rail">{renderPublicationsMenu()}</div>
        <div className="right-content" id={"publications"}>
          <section id={"awards"}>
            <Header as="h1">
              <Icon name="trophy" />
              <Header.Content>
                {en ? "Awards and Honors" : "受賞歴"}
              </Header.Content>
            </Header>
            {renderAwards()}
          </section>
          <Divider hidden />
          <section id={"talks"}>
            <Header as="h1">
              <Icon name="talk" />
              <Header.Content>
                {en ? "Invited Talks" : "招待講演"}
              </Header.Content>
            </Header>
            {renderTalks()}
          </section>
          <Divider hidden />
          <section id={"lectures"}>
            <Header as="h1">
              <Icon name="graduation cap" />
              <Header.Content>{en ? "Lectures" : "講義"}</Header.Content>
            </Header>
            {renderLectures()}
          </section>
          <Divider hidden />
          <section id={"academic-publications"}>
            <Header as="h1">
              <Icon name="book" />
              <Header.Content>
                {en ? "Publications" : "発表文献"}
              </Header.Content>
            </Header>
            {renderPublications()}
          </section>
          <Divider hidden />
          <section id={"media"}>
            <Header as="h1">
              {" "}
              <Icon className="broadcast tower" />
              <Header.Content>
                {en ? "Media coverage" : "メディア掲載"}
              </Header.Content>
            </Header>
            {renderMedia()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}
