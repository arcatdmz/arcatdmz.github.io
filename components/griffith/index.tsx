import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  Divider,
  Feed,
  FeedContent,
  FeedDate,
  FeedEvent,
  FeedSummary,
  Grid,
  GridColumn,
  GridRow,
  Header,
  HeaderContent,
  Icon,
  ItemGroup,
  List,
  ListContent,
  ListItem,
  Segment,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "react-fomantic-ui";
import { LinkedImage } from "@/site/components/LinkedImage";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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

  p = projectsTable["griffith"];
  title = p.getTitle(lang);
  me = p.project + "/";
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
  function renderPresentations(): ReactNode {
    return (
      <>
        <Header as="h2">
          <HeaderContent>
            {en ? "Presentation materials" : "発表内容"}
          </HeaderContent>
        </Header>
        <Table striped basic="very">
          <TableBody>
            <TableRow>
              <TableCell width={3}>{en ? "Where?" : "会場"}</TableCell>
              <TableCell width={13}>
                <List>
                  <ListItem>
                    <Icon name="map pin" />
                    <ListContent>
                      {"Room 324 (Floor Level 3), Hawaii Convention Center"}
                    </ListContent>
                  </ListItem>
                </List>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={3}>{en ? "When?" : "日時"}</TableCell>
              <TableCell width={13}>
                <List>
                  <ListItem>
                    <Icon name="clock" />
                    <ListContent>{"Mon, May 13 | 14:00 - 14:15"}</ListContent>
                  </ListItem>
                </List>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={3}>{"CHI '24 Program"}</TableCell>
              <TableCell width={13}>
                <List>
                  <ListItem>
                    <Icon name="book" />
                    <ListContent>
                      <a
                        href={
                          "https://programs.sigchi.org/chi/2024/program/content/147403"
                        }
                      >
                        {
                          "Griffith: A Storyboarding Tool Designed with Japanese Animation Professionals - CHI '24"
                        }
                      </a>
                    </ListContent>
                  </ListItem>
                </List>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Segment basic>
          <EmbedYoutube src={"//www.youtube.com/embed/rlJ1Fe53Lw8"} />
          <p className="caption">
            {en
              ? "CHI 2024 Video Preview (30s)"
              : "CHI 2024 Video Preview（30秒）"}
          </p>
        </Segment>
        <Segment basic>
          <EmbedYoutube src={"//www.youtube.com/embed/RWdw9rDRf7A"} />
          <p className="caption">
            {"CHI 2024 Pre-recorded Presentation Video"}
          </p>
        </Segment>
      </>
    );
  }
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
          <CardGroup stackable itemsPerRow={2} className="projects">
            <Card>
              <LinkedImage ui={false} href={"https://gsw.archinc.jp"}>
                <SiteImage
                  src={`${rootPath}griffith/griffith-stopwatch-thumbnail.png`}
                />
              </LinkedImage>
              <CardContent>
                <CardHeader as="a" href={"https://gsw.archinc.jp"}>
                  {"Griffith Stopwatch"}
                </CardHeader>
                <CardDescription as="p">
                  {en
                    ? "Griffith Stopwatch is a web-based stopwatch tool with a user interface designed specifically for anime creators."
                    : "日本のアニメ制作に特化したユーザインタフェースを持つストップウォッチのWebアプリケーションです。"}
                </CardDescription>
              </CardContent>
              <CardContent extra>
                <span className="right floated">
                  <Icon name="calendar" />
                  {"2024-"}
                </span>
              </CardContent>
            </Card>
            <Card>
              <LinkedImage
                ui={false}
                href={href(
                  en
                    ? "https://research.archinc.jp/en/griffith/sketch"
                    : "https://research.archinc.jp/griffith/sketch",
                )}
              >
                <SiteImage
                  src={`${rootPath}griffith/griffith-sketch-screenshot.png`}
                />
              </LinkedImage>
              <CardContent>
                <CardHeader
                  as={SiteLink}
                  href={href(
                    en
                      ? "https://research.archinc.jp/en/griffith/sketch"
                      : "https://research.archinc.jp/griffith/sketch",
                  )}
                >
                  {"Griffith Sketch"}
                </CardHeader>
                <CardDescription as="p">
                  {en
                    ? "Griffith Sketch is a lightweight web-based sketching tool with a pressure-sensitive brush and easy layering."
                    : "感圧式キャンバスやレイヤー機能などを備えたシンプルなスケッチ用のWebアプリケーションです。"}
                </CardDescription>
              </CardContent>
              <CardContent extra>
                <span className="right floated">
                  <Icon name="calendar" />
                  {"2020"}
                </span>
              </CardContent>
            </Card>
          </CardGroup>
          <Segment>
            <ItemGroup divided className="projects">
              <ProjectItem
                p={projectsTable["creativity-support-environments"]}
              />
            </ItemGroup>
          </Segment>
        </Segment>
      </>
    );
  }
  function renderRevisions(): ReactNode {
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
                <FeedDate>{"12/30/2025"}</FeedDate>
                <FeedSummary>
                  {en ? "Added a link to Animāre" : "Animāreへのリンクを追加"}
                </FeedSummary>
              </FeedContent>
            </FeedEvent>
            <FeedEvent>
              <FeedContent>
                <FeedDate>{"09/13/2024"}</FeedDate>
                <FeedSummary>
                  {en ? "Added a project page" : "プロジェクトページを仮公開"}
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
            <ProjectHero project={"griffith"} />
          </>
        }
      >
        <section id={"abstract"}>
          <Header as="h2">
            <HeaderContent>{en ? "Project summary" : "概要"}</HeaderContent>
          </Header>
          <Segment basic>
            <LocalizedContent
              ja={
                <p>
                  {
                    "Griffithは、日本のアニメ制作において設計図とも言うべき絵コンテのための、Webベースの制作支援ツールです。2018年にアニメプロデュース会社アーチでプロトタイプ開発に着手して以来、現場の監督などから幅広い協力を得て、実用に耐えるツールとして研究開発を継続してきました。"
                  }
                </p>
              }
            >
              <p>
                {
                  'The "E-conte," storyboard in English, is commonly referred to as the "blueprint" in Japanese animation (anime) production, serving as a communication medium with a prominent role in anime production. Griffith is a web-based E-conte authoring tool designed with Japanese animation professionals, as part of our long-term effort to intertwine artistic practice and scientific research.'
                }
              </p>
            </LocalizedContent>
          </Segment>
          <Segment basic textAlign="right">
            <Button
              role="link"
              primary
              as={SiteLink}
              href={href(`${rootPath}${en ? "animare/" : "ja/animare"}`)}
            >
              {en ? "Animāre" : "Animāre（アニマーレ）"}
              <Icon name="chevron circle right" />
            </Button>
            <Button
              role="link"
              primary
              as={SiteLink}
              href={href(
                en
                  ? "https://research.archinc.jp/en/griffith/"
                  : "https://research.archinc.jp/griffith/",
              )}
            >
              {"Arch Research "}
              {en ? "project page" : "プロジェクトページ"}
              <Icon name="chevron circle right" />
            </Button>
          </Segment>
        </section>
        <Divider hidden />
        <Grid stackable columns={2}>
          <GridRow>
            <GridColumn>
              <section id={"presentations"}>{renderPresentations()}</section>
              <Divider hidden />
            </GridColumn>
            <GridColumn>
              <section id={"further-readings"}>
                {renderFurtherReadings()}
              </section>
              <Divider hidden />
            </GridColumn>
          </GridRow>
        </Grid>
        <ProjectPublications
          project={p.project}
          majorPublication={"chi2024-kato-griffith"}
        />
        <Divider hidden />
        <section id={"revisions"}>{renderRevisions()}</section>
      </SiteLayout>
    </>
  );
}
