import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  List,
  Message,
  Segment,
} from "react-fomantic-ui";

import { DeferredEmbed } from "@/site/components/DeferredEmbed";

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
import { keyed, href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: message, abstract, related-projects. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath, protocol, domain } = data;
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

  let dg: any;
  p = projectsTable["songle-sync"];
  title = p.getTitle(lang);
  me = p.project + "/";
  const slideUrl = `${protocol}://${domain}${rootPath}publications/mm2018-kato-songlesync-slides.pdf`;
  const slideImagePath = `${rootPath}songle-sync/mm2018-kato-songlesync-slides.jpg`;
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <Header as="h2">{en ? "Abstract" : "概要"}</Header>
        <LocalizedContent
          ja={
            <>
              <Segment basic>
                <p>
                  <SiteImage
                    ui
                    src={"/songle-sync/songlesync-platform-ja.png"}
                  />
                </p>
                <p>
                  {
                    "Songle Syncは、ウェブ上の音楽の再生に合わせて、インターネット接続された多種多様な機器（スマートフォン、PC、フィジカルコンピューティングデバイス）を数百台以上同時制御可能な大規模音楽連動制御プラットフォームである。音楽理解技術を利用することで、好みの音楽でマルチメディア演出を駆動できる。"
                  }
                </p>
                <p>
                  {
                    "数百台の機器を同時に駆動するために、既存手法では通常、機器同士を常時接続するアーキテクチャを採用してきた。しかし、常時接続による負荷にともなうスケーラビリティの問題と、多様なデバイスとの不安定な接続にともなうレイテンシとジッタの問題があった。これらの問題を解決するため、我々は音楽地図に基づく自律駆動アーキテクチャを提案する。本アーキテクチャでは、個々のデバイスがビートやサビなどのタイミング情報を保持し、自律的にマルチメディア演出を駆動する。"
                  }
                </p>
                <p>
                  {
                    "Songle Sync API はこうしたマルチメディア演出をイベントドリブンのAPIで開発できるフレームワークであり、サンプルコードやインタラクティブなチュートリアルとともに開発者向けのキットとして公開されている。"
                  }
                </p>
                <p>
                  {
                    "本プラットフォームの評価実験として、既存手法と提案するアーキテクチャ間でレイテンシ、ジッタ、ネットワーク通信量の定量比較を行った。また、100台以上の多様なデバイスを駆動する実験を行った。さらに、数百名の観客が自身のスマートフォンで演出に参加する"
                  }
                  <abbr title={"Bring-Your-Own-Device"}>{"BYOD"}</abbr>
                  {
                    '体験を提供する音楽再生に連動するWebアプリケーションを開発した。さらに、開発キットを2日間のハッカソンで実用した。これらの実験から得られた教訓を報告し、 "The Internet of Musical Things (IoMT)" の未来について議論した。'
                  }
                </p>
              </Segment>
              <Segment basic textAlign="center">
                <p>
                  <Button
                    role="link"
                    icon
                    size="massive"
                    color="green"
                    labelPosition="left"
                    as="a"
                    href={"https://tutorial.songle.jp/sync"}
                  >
                    <Icon name="external" />
                    {" Songle Syncを試す"}
                  </Button>
                </p>
              </Segment>
              <Divider />
              <Segment basic>
                <p>
                  {
                    "上記は ACM Multimedia 2018 向けの論文概要を翻訳したものです。その後、 "
                  }
                  <a href={"https://ongaaccel.jp/"}>{"OngaACCEL"}</a>
                  {
                    " プロジェクトでは Songle Sync を活用した様々な実証実験を行ってきました。詳しくは "
                  }
                  <a href={"https://ongaaccel.jp/symposium2020/"}>
                    {"OngaACCELシンポジウム2020"}
                  </a>
                  {" 予稿集PDFをご覧ください。"}
                </p>
                <p>
                  <a
                    href={
                      "https://ongaaccel.jp/wp-content/uploads/2020/09/OngaACCEL20200912proceedings.pdf"
                    }
                  >
                    <SiteImage
                      ui
                      src={"/songle-sync/songlesync-poster-extract.jpg"}
                    />
                  </a>
                </p>
                <div className="caption">
                  <List horizontal>
                    <List.Item>
                      <a href={"https://ongaaccel.jp/symposium2020/"}>
                        <Icon name="file pdf" />
                        {"OngaACCELシンポジウム2020予稿集"}
                      </a>
                    </List.Item>
                  </List>
                </div>
              </Segment>
            </>
          }
        >
          <Segment basic>
            <p>
              <SiteImage ui src={"/songle-sync/mm2018-songlesync-demo.jpg"} />
            </p>
            <p>
              {
                "This paper presents Songle Sync, a web-based platform on which hundreds of Internet-connected devices — including smartphones, computers, and other physical computing devices — can be controlled to synchronize with music playback. It uses music-understanding technologies to dynamically synthesize music-driven multimedia performances from a musical piece of choice."
              }
            </p>
            <p>
              {
                "To simultaneously control hundreds of devices, a conventional architecture keeps always-on connections between them. However, it does not scale and suffers from latency and jitter issues when there are various devices with potentially unstable networks. We address this with a novel autonomous control architecture in which each device is notified of forthcoming musical events (e.g., beats and chorus sections) to automatically drive various changes in multimedia performances. Moreover, we provide a development kit of an event-driven multimedia framework for JavaScript, example programs, and an interactive tutorial."
              }
            </p>
            <p>
              {
                "To evaluate the platform, we compared latencies, jitters, and amounts of network traffic between ours and the conventional architecture. To examine use cases in the wild, we deployed the platform to drive over a hundred of a variety of devices. We also developed a web browser-based application for a multimedia performance with music playback. It provided audiences of hundreds with a bring-your-own-device experience of synchronized animations on smartphones. In addition, the development kit was used in a two-day hackathon."
              }
            </p>
            <p>
              {
                "We report lessons learned from these studies and discuss the future of the Internet of Musical Things."
              }
            </p>
          </Segment>
          <Segment basic textAlign="center">
            <p>
              <Button
                role="link"
                icon
                size="massive"
                color="green"
                labelPosition="left"
                as="a"
                href={"https://tutorial.songle.jp/sync?lang=en"}
              >
                <Icon name="external" />
                {" Try out Songle Sync"}
              </Button>
            </p>
          </Segment>
        </LocalizedContent>
        <Divider hidden />
      </>
    );
  }
  function renderPresentations(): ReactNode {
    return (
      <>
        <Header as="h2">{en ? "Presentation materials" : "発表内容"}</Header>
        <Segment basic>
          <Grid stackable columns={2}>
            <Grid.Column>
              <Header as="h3">
                {"ACM Multimedia 2018 "}
                {en ? "Demo Video" : "デモ動画"}
              </Header>
              <EmbedYoutube src={"//www.youtube.com/embed/dErV9oZw_uQ"} />
              <div className="caption">
                <List horizontal>
                  <List.Item>
                    <a href={"//www.youtube.com/watch?v=dErV9oZw_uQ"}>
                      <Icon name="youtube" />
                      {"YouTube"}
                    </a>
                  </List.Item>
                </List>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                {"ACM Multimedia 2018 "}
                {en ? "Slides" : "発表スライド"}
              </Header>
              <DeferredEmbed
                url={slideUrl}
                placeholder={slideImagePath}
                icon={"video play outline"}
              ></DeferredEmbed>
              <div className="caption">
                <List horizontal>
                  <List.Item>
                    <SiteLink href={href(slideUrl)}>
                      <Icon name="download" />
                      {en ? "Download" : "ダウンロード"}
                    </SiteLink>
                  </List.Item>
                </List>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
        <Divider hidden />
      </>
    );
  }
  function renderRelatedProjects(): ReactNode {
    return (
      <>
        <Header as="h2">
          <Icon name="lab" />
          <Header.Content>
            {en ? "Related projects" : "関連プロジェクト"}
          </Header.Content>
        </Header>
        <Segment basic>
          {(() => {
            const children: ReactNode[] = [];
            children.push(
              <>
                <LocalizedContent
                  ja={
                    <ul>
                      <li>
                        {"Songle Syncの音楽理解技術は"}
                        <a href={"https://songle.jp"}>{"Songle"}</a>
                        {
                          "由来のもので、さまざまな学術論文で発表されてきた研究成果に基づいています。詳細は"
                        }
                        <a
                          href={
                            "https://staff.aist.go.jp/m.goto/publications.html"
                          }
                        >
                          {
                            '"Songle" キーワードで後藤真孝氏の発表文献リストから検索'
                          }
                        </a>
                        {"してみてください。"}
                      </li>
                      <li>
                        {"Songle Sync は"}
                        <a href={"https://api.songle.jp/sync"}>
                          {"Songle API"}
                        </a>
                        {" の一部としてリリースされています。"}
                      </li>
                      <li>
                        <a href={"https://tutorial.songle.jp/sync"}>
                          {"Songle Sync のインタラクティブチュートリアル"}
                        </a>
                        {" は DeployGround フレームワークで実装されています。"}
                      </li>
                    </ul>
                  }
                >
                  <ul>
                    <li>
                      {"Automatic music analysis of Songle Sync relies on "}
                      <a href={"https://songle.jp"}>{"Songle"}</a>
                      {
                        " whose research contributions have been published in multiple academic papers."
                      }
                      {"\n"}
                      {" For more details, "}
                      <a
                        href={
                          "https://staff.aist.go.jp/m.goto/publications.html"
                        }
                      >
                        {
                          'search for the keyword "Songle" in Dr. Goto\'s publications'
                        }
                      </a>
                      {"."}
                    </li>
                    <li>
                      {"Songle Sync has been released as part of "}
                      <a href={"https://api.songle.jp/sync"}>{"Songle API"}</a>
                      {"."}
                    </li>
                    <li>
                      <a href={"https://tutorial.songle.jp/sync"}>
                        {"Interactive coding tutorials for Songle Sync"}
                      </a>
                      {" are implemented based on the DeployGround framework."}
                    </li>
                  </ul>
                </LocalizedContent>
              </>,
            );
            dg = projectsTable["deployground"];
            children.push(
              <>
                <Item.Group divided className="projects">
                  <ProjectItem p={dg} />
                </Item.Group>
              </>,
            );
            return keyed(children);
          })()}
        </Segment>
        <Divider hidden />
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero
              project={"songle-sync"}
              additionalLabels={null}
              heroImage={"https://tutorial.songle.jp/images/background.jpg"}
            />
          </>
        }
      >
        <Message positive>
          <strong>{en ? "Collaborative project:" : "共同研究の成果:"}</strong>
          {en
            ? " While I am credited as the first author of the ACM Multimedia 2018 paper, this project is the result of the collaborative effort in "
            : " 本研究は"}
          <a href={"//staff.aist.go.jp/m.goto/MIG/index-j.html"}>
            {en
              ? "Media Interaction Group"
              : "メディアインタラクション研究グループ"}
          </a>
          {en ? ". Please see " : "における共同プロジェクトです。"}
          <a href={"//api.songle.jp/sync"}>
            {en ? "the official project page" : "Songle Syncの公式サイト"}
          </a>
          {en
            ? " for the complete list of the contributors."
            : "に関係者のクレジットが掲載されています。"}
        </Message>
        <Divider hidden />
        <section id={"abstract"}>{renderAbstract()}</section>
        <section id={"presentations"}>{renderPresentations()}</section>
        <section id={"related-projects"}>{renderRelatedProjects()}</section>
        <ProjectPublications
          project={"songle-sync"}
          majorPublication={"mm2018-kato-songlesync"}
        />
      </SiteLayout>
    </>
  );
}
