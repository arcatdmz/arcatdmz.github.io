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
  Table,
} from "react-fomantic-ui";

import { DeferredEmbed } from "@/site/components/DeferredEmbed";

import { SitePopup } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Both locales inherit the default content. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath } = data;
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

  p = projectsTable["lyric-app-framework"];
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
        <Segment basic>
          {" "}
          {!en ? (
            <>
              <Header as="h3" id={"interaction2024"}>
                <Header.Content>
                  {
                    "第28回 一般社団法人情報処理学会シンポジウム インタラクション2024"
                  }
                  <Header.Subheader>
                    <Icon name="trophy" />
                    {"最優秀論文賞・インタラクティブ発表賞 (一般投票)"}
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <Table striped basic="very">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={3}>{"会場"}</Table.Cell>
                    <Table.Cell width={13}>
                      <List>
                        <List.Item>
                          <Icon name="map pin" />
                          <List.Content>
                            {"学術総合センター内 一橋記念講堂"}
                          </List.Content>
                        </List.Item>
                      </List>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={3}>{"日時"}</Table.Cell>
                    <Table.Cell width={13}>
                      <List>
                        <List.Item>
                          <Icon name="clock" />
                          <List.Content>
                            <a
                              href={
                                "https://www.interaction-ipsj.org/2024/program/#video"
                              }
                            >
                              {"2024/3/6 (水) 9:30-9:50"}
                            </a>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={3}>{"論文"}</Table.Cell>
                    <Table.Cell width={13}>
                      <List>
                        <List.Item>
                          <Icon name="file text" />
                          <List.Content>
                            <SiteLink
                              href={href(
                                `${rootPath}publications/interaction2024-kato-lyric-apps.pdf`,
                              )}
                            >
                              {
                                "Lyric App Framework: インタラクティブな歌詞駆動型視覚表現の開発用フレームワーク"
                              }
                            </SiteLink>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Grid columns={2}>
                <Grid.Row className="stackable">
                  <Grid.Column>
                    <Segment basic>
                      <EmbedYoutube
                        src={"//www.youtube.com/embed/tBBcweuGdrc?start=2061"}
                      />
                      <p className="caption">{"講演の録画"}</p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment basic>
                      <DeferredEmbed
                        url={
                          publicationsTable[
                            "interaction2024-kato-lyric-app-framework"
                          ].entryTags.slides
                        }
                        placeholder={`${basePath}lyric-app-framework/interaction2024-kato-lyric-apps-slides.png`}
                        icon={"video play outline"}
                      ></DeferredEmbed>
                      <div className="caption">
                        <List horizontal>
                          <List.Item>
                            <SiteLink
                              href={href(
                                publicationsTable[
                                  "interaction2024-kato-lyric-app-framework"
                                ].entryTags.slides,
                              )}
                            >
                              <Icon name="download" />
                              {en ? "Download" : "ダウンロード"}
                            </SiteLink>
                          </List.Item>
                        </List>
                      </div>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Header as="h3" id={"sigmus138"}>
                <Header.Content>
                  {"第138回音楽情報科学研究発表会 (SIGMUS)"}
                  <Header.Subheader>
                    <Icon name="trophy" />
                    {"ベストプレゼンテーション賞 (Best Research部門)"}
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <Table striped basic="very">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={3}>{"会場"}</Table.Cell>
                    <Table.Cell width={13}>
                      <List>
                        <List.Item>
                          <Icon name="map pin" />
                          <List.Content>
                            {"明治大学 中野キャンパス"}
                          </List.Content>
                        </List.Item>
                      </List>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={3}>{"日時"}</Table.Cell>
                    <Table.Cell width={13}>
                      <List>
                        <List.Item>
                          <Icon name="clock" />
                          <List.Content>
                            <a
                              href={
                                "https://www.ipsj.or.jp/kenkyukai/event/mus138.html"
                              }
                            >
                              {"2023/8/27 (日) 13:30-13:55"}
                            </a>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={3}>{"論文"}</Table.Cell>
                    <Table.Cell width={13}>
                      <List>
                        <List.Item>
                          <Icon name="file text" />
                          <List.Content>
                            <SiteLink
                              href={href(
                                `${rootPath}publications/sigmus138-kato-lyric-apps.pdf`,
                              )}
                            >
                              {
                                "TextAlive App API:「リリックアプリ」の提案とプログラミング・コンテストでの実証実験"
                              }
                            </SiteLink>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Grid columns={2}>
                <Grid.Row className="stackable">
                  <Grid.Column>
                    <Segment basic>
                      <EmbedYoutube
                        src={"//www.youtube.com/embed/yTS5600B4pg"}
                      />
                      <p className="caption">{"プレゼンテーション再録"}</p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment basic>
                      <DeferredEmbed
                        url={
                          publicationsTable[
                            "sigmus138-kato-lyric-app-framework"
                          ].entryTags.slides
                        }
                        placeholder={`${basePath}lyric-app-framework/sigmus138-kato-lyric-apps-slides.png`}
                        icon={"video play outline"}
                      ></DeferredEmbed>
                      <div className="caption">
                        <List horizontal>
                          <List.Item>
                            <SiteLink
                              href={href(
                                publicationsTable[
                                  "sigmus138-kato-lyric-app-framework"
                                ].entryTags.slides,
                              )}
                            >
                              <Icon name="download" />
                              {en ? "Download" : "ダウンロード"}
                            </SiteLink>
                          </List.Item>
                        </List>
                      </div>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider hidden />

              <Header as="h3" id={"chi2023"}>
                <Header.Content>
                  {"ACM CHI 2023"}
                  {!en ? (
                    <>
                      <Header.Subheader>
                        <Icon name="trophy" />
                        {"Honorable Mention Award"}
                      </Header.Subheader>
                    </>
                  ) : null}
                </Header.Content>
              </Header>
            </>
          ) : null}
          <Table striped basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={3}>{en ? "Where?" : "会場"}</Table.Cell>
                <Table.Cell width={13}>
                  <List>
                    <List.Item>
                      <Icon name="map pin" />
                      <List.Content>
                        {"Room Y07 + Y08, Congress Center Hamburg (CCH)"}
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
                      <List.Content>
                        <a
                          href={
                            "https://www.timeanddate.com/worldclock/fixedtime.html?msg=ACM+CHI+2023%3A+Lyric+App+Framework+paper+presentation&iso=20230427T09&p1=307&am=14"
                          }
                        >
                          {"Thu, Apr 27 | 09:00 - 09:14"}
                        </a>
                      </List.Content>
                    </List.Item>
                  </List>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={3}>{"CHI '23 Program"}</Table.Cell>
                <Table.Cell width={13}>
                  <List>
                    <List.Item>
                      <Icon name="book" />
                      <List.Content>
                        <a
                          href={
                            "https://programs.sigchi.org/chi/2023/program/content/96444"
                          }
                        >
                          {
                            "Lyric App Framework: A Web-based Framework for Developing Interactive Lyric-driven Musical Applications - CHI '23"
                          }
                        </a>
                      </List.Content>
                    </List.Item>
                  </List>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Grid columns={2}>
          <Grid.Row className="stackable">
            <Grid.Column>
              <Segment basic>
                <EmbedYoutube src={"//www.youtube.com/embed/7XpDPghxdCE"} />
                <p className="caption">
                  {en
                    ? "CHI 2023 Video Preview (30s)"
                    : "CHI 2023 Video Preview（30秒）"}
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                <EmbedYoutube src={"//www.youtube.com/embed/sX4Cdcljqd0"} />
                <p className="caption">
                  {"CHI 2023 Pre-recorded Presentation Video"}
                </p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
            {en ? (
              <>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"04/20/2026"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "Added project hero image and updated project text and 2026 thumbnail"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"03/29/2026"}</Feed.Date>
                    <Feed.Summary>
                      {
                        'Updated links to "Hatsune Miku Magical Mirai" programming contest websites.'
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"09/02/2023"}</Feed.Date>
                    <Feed.Summary>
                      {
                        'Added links to "Hatsune Miku Magical Mirai" programming contest websites.'
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </>
            ) : (
              <>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"04/20/2026"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "文章などを更新、2026年のプログラミング・コンテスト サムネイルを追加"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"03/29/2026"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "「初音ミク『マジカルミライ』」プログラミング・コンテスト関連のリンクを更新"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"03/11/2024"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "インタラクションでの講演の録画を追加、「初音ミク『マジカルミライ』」プログラミング・コンテスト入選作品一覧へのリンクを追加"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"09/02/2023"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "SIGMUSでのプレゼン再録動画を追加、「初音ミク『マジカルミライ』」プログラミング・コンテストへのリンクを追加"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{"08/27/2023"}</Feed.Date>
                    <Feed.Summary>
                      {
                        "第138回音楽情報科学研究発表会 (SIGMUS) での発表資料を追加"
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </>
            )}

            <Feed.Event>
              <Feed.Content>
                <Feed.Date>{"04/19/2023"}</Feed.Date>
                <Feed.Summary>
                  {en
                    ? "Added a pre-recorded presentation video"
                    : "事前録画のプレゼンテーション動画を追加"}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Content>
                <Feed.Date>{"04/16/2023"}</Feed.Date>
                <Feed.Summary>
                  {en ? "Added a video preview" : "Video Preview を追加"}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Content>
                <Feed.Date>{"03/31/2023"}</Feed.Date>
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
          <Segment>
            <Item.Group divided className="projects">
              <ProjectItem p={projectsTable["textalive"]} />
              <ProjectItem
                p={projectsTable["creativity-support-environments"]}
              />
            </Item.Group>
          </Segment>
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
            <ProjectHero project={"lyric-app-framework"} />
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
                  className="popup-menu hidden"
                >
                  <Icon name="sidebar" />
                </Button>
              }
            >
              <List divided>
                <List.Item role="link" as="a" href={"#body"}>
                  <Icon name="chevron circle up" />
                  <List.Content>{en ? "Top" : "トップ"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#abstract"}>
                  <Icon name="triangle right" />
                  <List.Content>{en ? "Abstract" : "概要"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#presentations"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Presentations" : "発表内容"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#publications"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Publications" : "発表文献"}
                  </List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#revisions"}>
                  <Icon name="triangle right" />
                  <List.Content>{en ? "Revisions" : "更新履歴"}</List.Content>
                </List.Item>
                <List.Item role="link" as="a" href={"#further-readings"}>
                  <Icon name="triangle right" />
                  <List.Content>
                    {en ? "Relevant projects" : "関連プロジェクト"}
                  </List.Content>
                </List.Item>
              </List>
            </SitePopup>
          </>
        }
      >
        <Grid columns={2}>
          <Grid.Row className="stackable">
            <Grid.Column>
              <section id={"abstract"}>
                <Header as="h2">
                  <Header.Content>{en ? "Abstract" : "概要"}</Header.Content>
                </Header>
                <Segment basic>
                  {en ? (
                    <>
                      <p>
                        <SiteImage
                          ui
                          bordered
                          src={"/images/thumbnails/lyric-app-framework.png"}
                        />
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <SiteImage
                          ui
                          bordered
                          src={`${basePath}lyric-app-framework/sigmus138-kato-lyric-apps-slides-p4_thumbnail.png`}
                        />
                      </p>
                    </>
                  )}
                  <p>
                    <HtmlContent html={p.getDescription(lang)} />
                  </p>
                  {en ? (
                    <>
                      <p>
                        {
                          "The programming contests continue to be held even after the paper was published, with a 2025 Japanese journal paper reporting analysis results from four years, and the 2026 contest is ongoing."
                        }
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        {
                          "論文執筆後もプログラミング・コンテストは継続して開催されており、2025年のジャーナル論文では4年分の分析結果を報告した他、2026年のコンテストが開催中です。"
                        }
                      </p>
                    </>
                  )}
                </Segment>
              </section>
            </Grid.Column>
            <Grid.Column>
              <section id={"programming-contest"}>
                <Header as="h2">
                  <Header.Content>
                    {en ? "Programming Contests" : "プログラミング・コンテスト"}
                  </Header.Content>
                </Header>
                <Segment basic>
                  {" "}
                  {en ? (
                    <>
                      <p>
                        <SiteImage
                          ui
                          bordered
                          src={`${basePath}lyric-app-framework/magicalmirai2026-banner.jpg`}
                        />
                      </p>

                      <p>
                        {
                          "We made the framework publicly available in 2020 and has been conducting an annual programming contest in "
                        }
                        <a href={"https://magicalmirai.com"}>
                          {'"Hatsune Miku Magical Mirai"'}
                        </a>
                        {
                          " — a live show and exhibition, connecting with Hatsune Miku through creativity. "
                        }
                      </p>

                      <List divided horizontal as="ul">
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/2020/procon"}
                        >
                          {"2020 (ja)"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/2021/procon"}
                        >
                          {"2021 (ja)"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/10th/procon/index_en.html"
                          }
                        >
                          {"2022"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2023/procon/index_en.html"
                          }
                        >
                          {"2023"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2024/procon/index_en.html"
                          }
                        >
                          {"2024"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2025/procon/index_en.html"
                          }
                        >
                          {"2025"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2026/procon/index_en.html"
                          }
                        >
                          {"2026"}
                        </List.Item>
                      </List>
                    </>
                  ) : (
                    <>
                      <p>
                        <SiteImage
                          ui
                          bordered
                          src={`${basePath}lyric-app-framework/interaction2024-kato-lyric-apps-slides-p27_thumbnail.png`}
                        />
                      </p>

                      <p>
                        {
                          "本フレームワークの「TextAlive App API」を活用したプログラミング・コンテストが、2020年より「"
                        }
                        <a href={"https://magicalmirai.com"}>
                          {"初音ミク『マジカルミライ』"}
                        </a>
                        {
                          "」で開催されています。詳しくは各年のコンテスト公式サイトをご覧ください。2020-2021年の応募作品については論文でも報告されています。"
                        }
                      </p>

                      <List divided horizontal as="ul">
                        <List.Item as="strong">{"公式サイト"}</List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/2020/procon"}
                        >
                          {"2020"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/2021/procon"}
                        >
                          {"2021"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/10th/procon"}
                        >
                          {"2022 (10th Anniversary)"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/2023/procon"}
                        >
                          {"2023"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/2024/procon"}
                        >
                          {"2024"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/2025/procon"}
                        >
                          {"2025"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={"https://magicalmirai.com/2026/procon"}
                        >
                          {"2026"}
                        </List.Item>
                      </List>

                      <List divided horizontal as="ul">
                        <List.Item as="strong">{"入選作品一覧"}</List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2020/procon/entry.html"
                          }
                        >
                          {"2020"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2021/procon/entry.html"
                          }
                        >
                          {"2021"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/10th/procon/entry.html"
                          }
                        >
                          {"2022 (10th Anniversary)"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2023/procon/entry.html"
                          }
                        >
                          {"2023"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2024/procon/entry.html"
                          }
                        >
                          {"2024"}
                        </List.Item>
                        <List.Item
                          role="link"
                          as="a"
                          href={
                            "https://magicalmirai.com/2025/procon/entry.html"
                          }
                        >
                          {"2025"}
                        </List.Item>
                      </List>
                    </>
                  )}
                </Segment>
              </section>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Segment basic textAlign="right">
          <Button role="link" primary as="a" href={"//developer.textalive.jp"}>
            <Icon name="external" />
            {en ? "Framework Website" : "フレームワークのWebサイトへ"}
          </Button>
        </Segment>
        <Divider hidden />
        <section id={"presentations"}>{renderPresentations()}</section>
        <Divider hidden />
        <ProjectPublications
          project={p.project}
          majorPublication={"chi2023-kato-lyric-app-framework"}
        />
        <Divider hidden />
        <section id={"revisions"}>{renderRevisions()}</section>
        <Divider hidden />
        <section id={"further-readings"}>{renderFurtherReadings()}</section>
      </SiteLayout>
    </>
  );
}
