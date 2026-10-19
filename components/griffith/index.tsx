import {
  Button,
  Card,
  Divider,
  Feed,
  Grid,
  Header,
  Icon,
  Item,
  List,
  Segment,
  Table,
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
          <Header.Content>
            {en ? "Presentation materials" : "発表内容"}
          </Header.Content>
        </Header>
        <Table striped basic="very">
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>{en ? "Where?" : "会場"}</Table.Cell>
              <Table.Cell width={13}>
                <List>
                  <List.Item>
                    <Icon name="map pin" />
                    <List.Content>
                      Room 324 (Floor Level 3), Hawaii Convention Center
                    </List.Content>
                  </List.Item>
                </List>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>{en ? "When?" : "日時"}</Table.Cell>
              <Table.Cell width={13}>
                <List>
                  <List.Item>
                    <Icon name="clock" />
                    <List.Content>Mon, May 13 | 14:00 - 14:15</List.Content>
                  </List.Item>
                </List>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>CHI '24 Program</Table.Cell>
              <Table.Cell width={13}>
                <List>
                  <List.Item>
                    <Icon name="book" />
                    <List.Content>
                      <a href="https://programs.sigchi.org/chi/2024/program/content/147403">
                        Griffith: A Storyboarding Tool Designed with Japanese
                        Animation Professionals - CHI '24
                      </a>
                    </List.Content>
                  </List.Item>
                </List>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Segment basic>
          <EmbedYoutube src="//www.youtube.com/embed/rlJ1Fe53Lw8" />
          <p className="caption">
            {en
              ? "CHI 2024 Video Preview (30s)"
              : "CHI 2024 Video Preview（30秒）"}
          </p>
        </Segment>
        <Segment basic>
          <EmbedYoutube src="//www.youtube.com/embed/RWdw9rDRf7A" />
          <p className="caption">CHI 2024 Pre-recorded Presentation Video</p>
        </Segment>
      </>
    );
  }
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="gift" />
          <Header.Content>
            {en ? "Relevant projects" : "関連プロジェクト"}
          </Header.Content>
        </Header>
        <Segment basic>
          <Card.Group stackable itemsPerRow={2} className="projects">
            <Card>
              <LinkedImage ui={false} href="https://gsw.archinc.jp">
                <SiteImage
                  src={`${rootPath}griffith/griffith-stopwatch-thumbnail.png`}
                />
              </LinkedImage>
              <Card.Content>
                <Card.Header as="a" href="https://gsw.archinc.jp">
                  Griffith Stopwatch
                </Card.Header>
                <Card.Description as="p">
                  {en
                    ? "Griffith Stopwatch is a web-based stopwatch tool with a user interface designed specifically for anime creators."
                    : "日本のアニメ制作に特化したユーザインタフェースを持つストップウォッチのWebアプリケーションです。"}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <span className="right floated">
                  <Icon name="calendar" />
                  2024-
                </span>
              </Card.Content>
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
              <Card.Content>
                <Card.Header
                  as={SiteLink}
                  href={href(
                    en
                      ? "https://research.archinc.jp/en/griffith/sketch"
                      : "https://research.archinc.jp/griffith/sketch",
                  )}
                >
                  Griffith Sketch
                </Card.Header>
                <Card.Description as="p">
                  {en
                    ? "Griffith Sketch is a lightweight web-based sketching tool with a pressure-sensitive brush and easy layering."
                    : "感圧式キャンバスやレイヤー機能などを備えたシンプルなスケッチ用のWebアプリケーションです。"}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <span className="right floated">
                  <Icon name="calendar" />
                  2020
                </span>
              </Card.Content>
            </Card>
          </Card.Group>
          <Segment>
            <Item.Group divided className="projects">
              <ProjectItem
                p={projectsTable["creativity-support-environments"]}
              />
            </Item.Group>
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
            <Feed.Event>
              <Feed.Content>
                <Feed.Date>12/30/2025</Feed.Date>
                <Feed.Summary>
                  {en ? "Added a link to Animāre" : "Animāreへのリンクを追加"}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Content>
                <Feed.Date>09/13/2024</Feed.Date>
                <Feed.Summary>
                  {en ? "Added a project page" : "プロジェクトページを仮公開"}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
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
            <ProjectHero project="griffith" />
          </>
        }
      >
        <section id="abstract">
          <Header as="h2">
            <Header.Content>{en ? "Project summary" : "概要"}</Header.Content>
          </Header>
          <Segment basic>
            <LocalizedContent
              ja={
                <p>
                  Griffithは、日本のアニメ制作において設計図とも言うべき絵コンテのための、Webベースの制作支援ツールです。2018年にアニメプロデュース会社アーチでプロトタイプ開発に着手して以来、現場の監督などから幅広い協力を得て、実用に耐えるツールとして研究開発を継続してきました。
                </p>
              }
            >
              <p>
                The "E-conte," storyboard in English, is commonly referred to as
                the "blueprint" in Japanese animation (anime) production,
                serving as a communication medium with a prominent role in anime
                production. Griffith is a web-based E-conte authoring tool
                designed with Japanese animation professionals, as part of our
                long-term effort to intertwine artistic practice and scientific
                research.
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
              Arch Research {en ? "project page" : "プロジェクトページ"}
              <Icon name="chevron circle right" />
            </Button>
          </Segment>
        </section>
        <Divider hidden />
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <section id="presentations">{renderPresentations()}</section>
              <Divider hidden />
            </Grid.Column>
            <Grid.Column>
              <section id="further-readings">{renderFurtherReadings()}</section>
              <Divider hidden />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ProjectPublications
          project={p.project}
          majorPublication="chi2024-kato-griffith"
        />
        <Divider hidden />
        <section id="revisions">{renderRevisions()}</section>
      </SiteLayout>
    </>
  );
}
