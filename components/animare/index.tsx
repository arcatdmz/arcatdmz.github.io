import {
  Button,
  Divider,
  Feed,
  FeedContent,
  FeedDate,
  FeedEvent,
  FeedSummary,
  Grid,
  GridColumn,
  Header,
  HeaderContent,
  Icon,
  Item,
  ItemContent,
  ItemExtra,
  ItemGroup,
  ItemHeader,
  List,
  ListContent,
  ListItem,
  Segment,
} from "react-fomantic-ui";

import { SitePopup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { SiteLink } from "@/site/components/SiteLink";
import { Fragment, type ReactNode } from "react";
import {
  MediaItem,
  ProjectHero,
  ProjectItem,
  Publication,
} from "@/site/components/ContentComponents";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: news. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const {
    projectsTable,
    publications,
    publicationsTable,
    mediaList,
    misc,
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

  p = projectsTable["animare"];
  title = p.getTitle(lang);
  me = "animare/";
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
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="gift" />
          <HeaderContent>
            {en ? "Relevant projects" : "関連プロジェクト"}
          </HeaderContent>
        </Header>
        <Segment basic>
          <Segment>
            <ItemGroup divided className="projects">
              <ProjectItem p={projectsTable["anime-sig"]} />
              <ProjectItem p={projectsTable["griffith"]} />
            </ItemGroup>
          </Segment>
        </Segment>
        <Segment basic>
          <p>
            {en
              ? "I have also organized and hosted related events."
              : "他にも関連イベントを主催・開催してきました。"}
          </p>
          <Segment>
            <ItemGroup divided className="projects">
              {misc.miscellaneous["past-anime-events"].map((e, itemIndex) => (
                <Fragment key={itemIndex}>
                  <Item as={SiteLink} href={href(e.url)}>
                    <ItemContent>
                      <ItemHeader>{e.title}</ItemHeader>
                      <ItemExtra>
                        <span className="right floated">
                          <Icon name="calendar" />
                          {en ? e.dates : (e.ja && e.ja.dates) || e.dates}
                        </span>
                      </ItemExtra>
                    </ItemContent>
                  </Item>
                </Fragment>
              ))}
            </ItemGroup>
          </Segment>
        </Segment>
      </>
    );
  }
  function renderPublications(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="book" />
          <HeaderContent>{en ? "Publications" : "発表文献"}</HeaderContent>
        </Header>
        <Segment basic>
          <List divided>
            {(() => {
              const children: ReactNode[] = [];
              for (const entry of publications) {
                if (entry.getFundings().indexOf("JST CRONOS JPMJCS25K1") < 0)
                  continue;
                children.push(
                  <>
                    <Publication entry={entry} />
                  </>,
                );
              }
              return keyed(children);
            })()}
          </List>
          <Divider />
          <p>
            {en
              ? "The following is a full list of past publications (including non-archival ones)."
              : "過去の発表文献のうち内容面で本プロジェクトに関係するものは以下のとおりです。"}
          </p>
          <Divider />
          <List divided>
            {(() => {
              const children: ReactNode[] = [];
              for (const pubId of [
                "chi2025-kato-animesig",
                "chi2025-kato-postgrowth-cst",
                "chi2025-mandai-super-kawaii-vocalics",
                "sa2024-todo-style-transfer",
                !en && "vc2024-kato-toolsmiths-in-anime",
                "chi2024-kato-griffith",
                "xrds2023summer-kato-toolsmith",
                "sas2023-kato-lights-animation-interaction",
                !en && "hi25-kato-ui-design-for-authoring-videos",
                "chi2023-kato-sigccc",
                !en && "jssst39-1-kato-toolsmith",
                "sas2022-kato-toolsmiths-in-anime",
                "isid2022-kato-toolsmiths-in-anime",
                "sas2021-kato-storyboarding-in-anime",
                "isid2021-kato-anime-storyboards",
              ]) {
                if (!publicationsTable[pubId]) continue;
                children.push(
                  <>
                    <Publication entry={publicationsTable[pubId]} />
                  </>,
                );
              }
              return keyed(children);
            })()}
          </List>
        </Segment>
      </>
    );
  }
  function renderMedia(): ReactNode {
    return (
      <>
        {(() => {
          const children: ReactNode[] = [];
          const filteredMediaList = mediaList.filter(
            (entry) =>
              !entry.private &&
              !entry.draft &&
              entry.tags &&
              entry.tags.includes("anime"),
          );
          children.push(
            <>
              <Header as="h2">
                {" "}
                <Icon className="broadcast tower" />
                <HeaderContent>
                  {en ? "Media coverage" : "メディア掲載"}
                </HeaderContent>
              </Header>
            </>,
          );
          children.push(
            <>
              <Segment basic>
                <List divided relaxed className="media">
                  {filteredMediaList.map((entry, itemIndex) => (
                    <Fragment key={itemIndex}>
                      <MediaItem m={entry} withLabel={false} />
                    </Fragment>
                  ))}
                </List>
              </Segment>
            </>,
          );
          return keyed(children);
        })()}
      </>
    );
  }
  function renderRevision(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="announcement" />
          {en ? "Revision history" : "更新履歴"}
        </Header>
        <Segment basic>
          <Feed className="divided">
            <FeedEvent>
              <FeedContent>
                <FeedDate>{en ? "3/29/2026" : "2026/3/29"}</FeedDate>
                <FeedSummary>
                  {en
                    ? "Add publications funded by the project (e.g., "
                    : "プロジェクト関連の発表文献を追加（例: "}
                  <SiteLink
                    href={
                      en
                        ? "https://junkato.jp/publications/undonecs2026-kato-anime-rnd.pdf"
                        : "https://junkato.jp/publications/undonecs2026-kato-anime-rnd-slides.pdf"
                    }
                  >
                    {en ? "a talk" : "UndoneCS '26 講演スライド"}
                  </SiteLink>
                  {en ? " at UndoneCS '26)." : "）"}
                </FeedSummary>
              </FeedContent>
            </FeedEvent>
            <FeedEvent>
              <FeedContent>
                <FeedDate>{en ? "12/30/2025" : "2025/12/30"}</FeedDate>
                <FeedSummary>
                  {en ? "Update Animare visuals." : "Animareのビジュアルを更新"}
                </FeedSummary>
              </FeedContent>
            </FeedEvent>
            <FeedEvent>
              <FeedContent>
                <FeedDate>{en ? "12/19/2025" : "2025/12/19"}</FeedDate>
                <FeedSummary>
                  {en
                    ? "Add link to the project website."
                    : "公式ページへのリンクを追加"}
                </FeedSummary>
              </FeedContent>
            </FeedEvent>
            <FeedEvent>
              <FeedContent>
                <FeedDate>{en ? "9/14/2025" : "2025/9/14"}</FeedDate>
                <FeedSummary>
                  {en
                    ? "Upload the initial revision."
                    : "プロジェクトページを仮公開"}
                </FeedSummary>
              </FeedContent>
            </FeedEvent>
          </Feed>
        </Segment>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero project={"animare"} />
          </>
        }
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
              <List divided>
                <ListItem role="link" as="a" href={"#body"}>
                  <Icon name="chevron circle up" />
                  <ListContent>{en ? "Top" : "トップ"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#abstract"}>
                  <Icon name="triangle right" />
                  <ListContent>{en ? "Abstract" : "概要"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#further-readings"}>
                  <Icon name="gift" />
                  <ListContent>
                    {en ? "Relevant projects" : "関連プロジェクト"}
                  </ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#publications"}>
                  <Icon name="book" />
                  <ListContent>{en ? "Publications" : "発表文献"}</ListContent>
                </ListItem>
                <ListItem role="link" as="a" href={"#media"}>
                  <Icon className="broadcast tower" />
                  <ListContent>
                    {en ? "Media coverage" : "メディア掲載"}
                  </ListContent>
                </ListItem>
              </List>
            </SitePopup>
          </>
        }
      >
        <section id={"abstract"}>
          <Header as="h2">
            <HeaderContent>{en ? "Summary" : "概要"}</HeaderContent>
          </Header>
          <Segment basic>
            <p>
              <HtmlContent html={p.getDescription(lang)} />
            </p>
            <p>
              <HtmlContent
                html={
                  en
                    ? "This project is being advanced in collaboration with Co-PIs Maejima (OLM Digital Inc.) and Koyama (The University of Tokyo). This page mainly serves to publicize the related achievements of the Kato group."
                    : '本プロジェクトは<a href="https://www.jst.go.jp/kisoken/presto/">JST さきがけ</a>（JPMJPR25I1）および<a href="https://www.jst.go.jp/kisoken/cronos/">JST CRONOS</a>（JPMJCS25K1）の支援の下で前島（OLM Digital; CRONOS Co-PI）、小山（東京大学; CRONOS Co-PI）および産学官のコミュニティとともに進めるものです。本ページは主に加藤個人の関連成果を広報しています。'
                }
              />
            </p>
            <Divider hidden />
            <Grid stackable columns={2}>
              <GridColumn>
                <SiteImage
                  ui
                  fluid
                  src={`${basePath}animare/animare-workflow.jpg`}
                />
                <p className="caption">
                  {en
                    ? "A representative anime production workflow and the strengths of each group"
                    : "代表的なアニメ制作のワークフローと各グループの担当範囲"}
                </p>
              </GridColumn>
              <GridColumn>
                <SiteImage
                  ui
                  fluid
                  src={`${rootPath}images/panels/${
                    en ? "animare" : "animare-ja"
                  }.png`}
                />
                <p className="caption">
                  {en
                    ? "A mutually beneficial platform for anime production to be built in the project"
                    : "プロジェクトで構築を目指す互恵的プラットフォーム"}
                </p>
              </GridColumn>
            </Grid>
          </Segment>
          <Segment basic textAlign="center">
            <Button
              role="link"
              primary
              size="huge"
              as="a"
              href={"https://anime.pj.aist.go.jp"}
            >
              {en ? "CRONOS project website" : "CRONOS プロジェクトページ"}
              <Icon name="chevron circle right" />
            </Button>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"further-readings"}>{renderFurtherReadings()}</section>
        <Divider hidden />
        <section id={"publications"}>{renderPublications()}</section>
        <Divider hidden />
        <section id={"media"}>{renderMedia()}</section>
        <Divider hidden />
        <section id={"revision"}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}
