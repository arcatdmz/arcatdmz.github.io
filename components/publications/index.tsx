import {
  Button,
  Divider,
  Header,
  HeaderContent,
  Icon,
  List,
  ListContent,
  ListDescription,
  ListHeader,
  ListItem,
  Segment,
  SegmentGroup,
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
          <ListItem role="link" as="a" href={"#awards"}>
            <Icon name="trophy" />
            <ListContent>{en ? "Awards" : "受賞歴"}</ListContent>
          </ListItem>
          <ListItem role="link" as="a" href={"#talks"}>
            <Icon name="talk" />
            <ListContent>{en ? "Invited Talks" : "招待講演"}</ListContent>
          </ListItem>
          <ListItem role="link" as="a" href={"#lectures"}>
            <Icon name="graduation cap" />
            <ListContent>{en ? "Lectures" : "講義"}</ListContent>
          </ListItem>
          <ListItem role="link" as="a" href={"#academic-publications"}>
            <Icon name="book" />
            <ListContent>{en ? "Publications" : "発表文献"}</ListContent>
          </ListItem>
          <ListItem>
            <List>
              <LocalizedContent
                ja={
                  <>
                    <ListItem
                      role="link"
                      as="a"
                      href={"#international-publications"}
                    >
                      <Icon name="triangle right" />
                      <ListContent>{"国際"}</ListContent>
                    </ListItem>
                    <ListItem
                      role="link"
                      as="a"
                      href={"#domestic-publications"}
                    >
                      <Icon name="triangle right" />
                      <ListContent>{"国内"}</ListContent>
                    </ListItem>
                    <ListItem role="link" as="a" href={"#dissertation"}>
                      <Icon name="triangle right" />
                      <ListContent>{"学位論文"}</ListContent>
                    </ListItem>
                  </>
                }
              >
                <ListItem role="link" as="a" href={"#selected-publications"}>
                  <Icon name="triangle right" />
                  <ListContent>{"Selected"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#reviewed-publications"}>
                  <Icon name="triangle right" />
                  <ListContent>{"Reviewed"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#other-publications"}>
                  <Icon name="triangle right" />
                  <ListContent>{"Others"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#dissertation"}>
                  <Icon name="triangle right" />
                  <ListContent>{"Dissertation"}</ListContent>
                </ListItem>
              </LocalizedContent>
            </List>
          </ListItem>
          <ListItem role="link" as="a" href={"#media"}>
            <Icon className="broadcast tower" />
            <ListContent>{en ? "Media" : "メディア"}</ListContent>
          </ListItem>
          <ListItem
            role="link"
            as={SiteLink}
            href={href(`${basePath}timeline/`)}
          >
            <Icon name="history" />
            <ListContent>{en ? "Timeline" : "活動履歴"}</ListContent>
          </ListItem>
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
              <SegmentGroup>
                <Segment secondary>
                  <List horizontal>
                    <ListItem>
                      <Icon name="circle" />
                      <ListContent>
                        <HtmlContent
                          html={
                            en
                              ? `Domestic (<strong>${numDomesticAwards}</strong>)`
                              : `国内 <strong>${numDomesticAwards}</strong> 件`
                          }
                        />
                      </ListContent>
                    </ListItem>
                    <ListItem>
                      <Icon name="world" />
                      <ListContent>
                        <HtmlContent
                          html={
                            en
                              ? `International (<strong>${numInternationalAwards}</strong>)`
                              : `国際 <strong>${numInternationalAwards}</strong> 件`
                          }
                        />
                      </ListContent>
                    </ListItem>
                  </List>
                </Segment>
                <Segment>
                  <List divided>
                    {filteredAwards.map((entry, itemIndex) => (
                      <Fragment key={itemIndex}>
                        <ListItem className={classNames(entry.entryType)}>
                          <Icon className={entry.getIconClass()}></Icon>
                          <ListContent>
                            <ListHeader>
                              <HtmlContent html={entry.getText(lang)} />
                            </ListHeader>
                            <ListDescription className="date">
                              {entry.getDateString(lang, true)}
                            </ListDescription>
                          </ListContent>
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>
                </Segment>
              </SegmentGroup>
            </>,
          );
          children.push(
            <>
              <SegmentGroup>
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
                        <ListItem className={classNames(entry.entryType)}>
                          <Icon className={entry.getIconClass()}></Icon>
                          <ListContent>
                            <ListHeader>
                              <HtmlContent html={entry.getText(lang)} />
                            </ListHeader>
                            <ListDescription className="date">
                              {entry.getDateString(lang, true)}
                            </ListDescription>
                          </ListContent>
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>
                </Segment>
              </SegmentGroup>
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
                        <ListItem className={classNames(entry.entryType)}>
                          <ListContent>
                            <ListHeader>
                              <HtmlContent html={entry.getText(lang)} />
                            </ListHeader>
                            <ListDescription className="date">
                              {entry.getDateString(lang, true)}
                            </ListDescription>
                          </ListContent>
                        </ListItem>
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
            <SegmentGroup>
              <Segment secondary>
                <List horizontal>
                  <ListItem>
                    <Icon name="circle" />
                    <ListContent>{"国内"}</ListContent>
                  </ListItem>
                  <ListItem>
                    <Icon name="world" />
                    <ListContent>{"国際"}</ListContent>
                  </ListItem>
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
                          <ListItem className={classNames(entry.entryType)}>
                            <Icon className={entry.getIconClass()}></Icon>
                            <ListContent>
                              <ListHeader>
                                <HtmlContent html={entry.getText(lang)} />
                              </ListHeader>
                              <ListDescription className="date">
                                {entry.getDateString(lang, true)}
                              </ListDescription>
                            </ListContent>
                          </ListItem>
                        </>,
                      );
                    }
                    return keyed(children);
                  })()}
                </List>
              </Segment>
            </SegmentGroup>
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
                        <ListItem className={classNames(entry.entryType)}>
                          <ListContent>
                            <ListHeader>
                              <HtmlContent html={entry.getText(lang)} />
                            </ListHeader>
                            <ListDescription className="date">
                              {entry.getDatesString(lang).join(", ")}
                            </ListDescription>
                          </ListContent>
                        </ListItem>
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
            <SegmentGroup>
              <Segment secondary>
                <List horizontal>
                  <ListItem>
                    <Icon name="circle" />
                    <ListContent>{"国内"}</ListContent>
                  </ListItem>
                  <ListItem>
                    <Icon name="world" />
                    <ListContent>{"国際"}</ListContent>
                  </ListItem>
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
                          <ListItem className={classNames(entry.entryType)}>
                            <Icon className={entry.getIconClass()}></Icon>
                            <ListContent>
                              <ListHeader>
                                <HtmlContent html={entry.getText(lang)} />
                              </ListHeader>
                              <ListDescription className="date">
                                {entry.getDatesString(lang).join(", ")}
                              </ListDescription>
                            </ListContent>
                          </ListItem>
                        </>,
                      );
                    }
                    return keyed(children);
                  })()}
                </List>
              </Segment>
            </SegmentGroup>
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
              <HeaderContent>
                {en ? "Awards and Honors" : "受賞歴"}
              </HeaderContent>
            </Header>
            {renderAwards()}
          </section>
          <Divider hidden />
          <section id={"talks"}>
            <Header as="h1">
              <Icon name="talk" />
              <HeaderContent>{en ? "Invited Talks" : "招待講演"}</HeaderContent>
            </Header>
            {renderTalks()}
          </section>
          <Divider hidden />
          <section id={"lectures"}>
            <Header as="h1">
              <Icon name="graduation cap" />
              <HeaderContent>{en ? "Lectures" : "講義"}</HeaderContent>
            </Header>
            {renderLectures()}
          </section>
          <Divider hidden />
          <section id={"academic-publications"}>
            <Header as="h1">
              <Icon name="book" />
              <HeaderContent>{en ? "Publications" : "発表文献"}</HeaderContent>
            </Header>
            {renderPublications()}
          </section>
          <Divider hidden />
          <section id={"media"}>
            <Header as="h1">
              {" "}
              <Icon className="broadcast tower" />
              <HeaderContent>
                {en ? "Media coverage" : "メディア掲載"}
              </HeaderContent>
            </Header>
            {renderMedia()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}
