import {
  Divider,
  Grid,
  GridColumn,
  Header,
  Icon,
  List,
  ListItem,
  Message,
  Segment,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "react-fomantic-ui";

import { DeferredEmbed } from "@/site/components/DeferredEmbed";
import { LinkedImage } from "@/site/components/LinkedImage";

import { LocalizedContent } from "@/site/components/LocalizedContent";

import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
  Translate,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: message, abstract, comparison, vision. */
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

  p = projectsTable["phybots"];
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

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"phybots"} />
        <Message>
          {en ? "Phybots is open-source at " : "Phybotsは"}
          <a href={"https://github.com/arcatdmz/phybots/"}>{"GitHub"}</a>
          {en
            ? " and can be downloaded at "
            : "にてオープンソースで公開中です。また、ドキュメントやライブラリのダウンロードは "}
          <a href={en ? "https://phybots.com/" : "https://phybots.com/ja/"}>
            {en ? "https://phybots.com" : "https://phybots.com/ja"}
          </a>
          {en ? "." : " から行うことができます。"}
        </Message>
        <Divider hidden />
        <section id={"abstract"}>
          <Segment basic>
            <Grid stackable>
              <GridColumn width={10}>
                <Header as="h2">{en ? "Abstract" : "概要"}</Header>
                <LocalizedContent
                  ja={
                    <>
                      <p>
                        {
                          "ユーザの指示に従って料理や服畳みといった実世界におけるタスクを実行するインタラクティブなロボットアプリケーションが実現しつつある。また、このような高度なアプリケーションの効果的な開発には、プロトタイピングが重要である。しかし、HCI分野で利用されてきた既存のプロトタイピング用ツールキットは、空間内の特定の場所に置かれて使われるアプリケーションを想定している。そのため、プログラマがモビリティを備えたアプリケーションを開発しようとすると、ロボット工学的な困難に直面する。一方で、ロボット工学向けのツールキットは、利用に際し、ある程度の前提知識を必要とするものがほとんどである。"
                        }
                      </p>
                      <p>
                        {
                          '我々は、この学際的な問題を解決するためにツールキットPhybotsを提案した。Phybotsを用いると、HCI研究者やインタラクションデザイナーが、生活空間を動き回れる"Robotic Things"─ロボット的なるもの─をプロトタイピングできる。'
                        }
                      </p>
                    </>
                  }
                >
                  <p>
                    {
                      "There are many toolkits for physical UIs, but most physical UI applications are not locomotive. When the programmer wants to make things move around in the environment, he faces difficulty related to robotics. Toolkits for robot programming, unfortunately, are usually not as accessible as those for building physical UIs."
                    }
                  </p>
                  <p>
                    {
                      "To address this interdisciplinary issue, we propose Phybots, a toolkit that allows researchers and interaction designers to rapidly prototype applications with locomotive robotic things. The contributions of this research are the combination of a hardware setup, software API, its underlying architecture and a graphical runtime debug tool that supports the whole prototyping activity."
                    }
                  </p>
                  <p>
                    {
                      "The paper introduces the toolkit, applications and lessons learned from three user studies."
                    }
                  </p>
                </LocalizedContent>
              </GridColumn>
              <GridColumn width={6}>
                <LinkedImage
                  fluid
                  href={href(`${rootPath}phybots/fig1-overview.jpg`)}
                >
                  <SiteImage
                    src={`${rootPath}phybots/fig1-overview.jpg`}
                    alt={"Overview of hardware setup for Phybots"}
                  />
                </LinkedImage>
              </GridColumn>
            </Grid>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"presentations"}>
          <Header as="h2">{en ? "Presentation materials" : "発表内容"}</Header>
          <Segment basic>
            <Grid stackable columns={2}>
              <GridColumn>
                <Header as="h3">{"Example applications"}</Header>
                <EmbedYoutube
                  src={
                    "https://www.youtube.com/embed/videoseries?list=PL5EC9CECDDBEA183A"
                  }
                />
                <div className="caption">
                  <List horizontal>
                    <ListItem>
                      <a
                        href={
                          "//www.youtube.com/playlist?list=PL5EC9CECDDBEA183A"
                        }
                      >
                        <Icon name="youtube" />
                        {"YouTube"}
                      </a>
                    </ListItem>
                  </List>
                </div>
              </GridColumn>
              <GridColumn>
                <Header as="h3">
                  {"DIS 2012 "}
                  {en ? "Slides" : "発表スライド"}
                </Header>

                <DeferredEmbed
                  url={publicationsTable[p.publication].entryTags.slides}
                  placeholder={`${rootPath}images/background-eee.png`}
                  icon={"video play outline"}
                ></DeferredEmbed>

                <div className="caption">
                  <List horizontal>
                    <ListItem>
                      <SiteLink
                        href={href(
                          publicationsTable[p.publication].entryTags.slides,
                        )}
                      >
                        <Icon name="download" />
                        {en ? "Download" : "ダウンロード"}
                      </SiteLink>
                    </ListItem>
                  </List>
                </div>

                {!en ? (
                  <>
                    <p className="caption">
                      {"日本語の発表スライドは"}
                      <a href={"#publications"}>
                        <Icon name="book" />
                        {"発表文献"}
                      </a>
                      {"で日本語文献の "}
                      <Icon fitted name="sidebar" />
                      {" をクリックすると閲覧できます。"}
                    </p>
                  </>
                ) : null}
              </GridColumn>
            </Grid>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"toolkit"}>
          <Header as="h2">
            {en ? "Phybots Toolkit" : "Phybots ツールキット"}
          </Header>
          <Segment basic>
            <Table className="fluid">
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>
                    {en ? "Toolkits for:" : "目的:"}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {en ? "Physical UIs" : "フィジカルコンピューティング"}
                  </TableHeaderCell>
                  <TableHeaderCell textAlign="center">
                    {"Phybots"}
                  </TableHeaderCell>
                  <TableHeaderCell textAlign="right">
                    {en ? "Robots" : "ロボット"}
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>
                      {en ? "Target users:" : "ターゲット ユーザー:"}
                    </strong>
                  </TableCell>
                  <TableCell positive colSpan={Number("2")}>
                    {en
                      ? "HCI researchers & interaction designers"
                      : "HCI研究者 & インタラクション デザイナー"}
                  </TableCell>
                  <TableCell negative textAlign="right">
                    {en ? "Robotics people" : "ロボット工学の研究者"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>{en ? "Focus:" : "重視すること:"}</strong>
                  </TableCell>
                  <TableCell positive colSpan={Number("2")}>
                    {en ? "Prototyping" : "プロトタイピング"}
                  </TableCell>
                  <TableCell negative textAlign="right">
                    {en ? "Reliability" : "信頼性"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>
                      {en ? "Software APIs:" : "ソフトウェアAPI:"}
                    </strong>
                  </TableCell>
                  <TableCell negative>
                    {en ? "Low-level and static" : "低レベルで拡張性に乏しい"}
                  </TableCell>
                  <TableCell positive textAlign="right" colSpan={Number("2")}>
                    {en
                      ? "High-level and extensible"
                      : "高レベルで拡張性に富む"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>
                      {en
                        ? "Hardware size & cost:"
                        : "ハードウェアの大きさ & 価格:"}
                    </strong>
                  </TableCell>
                  <TableCell positive colSpan={Number("2")}>
                    {en
                      ? "Small & cheap (Phidget Kit $200, "
                      : "小さい & 安い (Phidget Kit $200, "}
                    <a
                      href={
                        "http://www.inmojo.com/store/inmojo-market/item/ikimo-robot-platform/"
                      }
                    >
                      {"Ikimo Robot"}
                    </a>
                    {" $160)"}
                  </TableCell>
                  <TableCell negative textAlign="right">
                    {en
                      ? "Medium to large & expensive ($700-)"
                      : "大きい & 高価 ($700-)"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="caption">
              {en ? "Comparison between toolkits" : "ツールキットの比較"}
            </div>
            <Divider hidden />
            <Grid stackable columns={3}>
              <GridColumn>
                <Header as="h3">
                  {en
                    ? "APIs for 2D Locomotion"
                    : "平面上での移動指示のためのAPI"}
                </Header>

                <p>
                  {
                    "Phybots assumes a simple and inexpensive hardware setup of a camera looking down on the floor and visual markers attached to the top of physical objects. This hardware setup can easily be deployed to everyday spaces such as a working desk, a dining table or in a kitchen or living room."
                  }
                </p>

                <p>
                  {
                    "Given the hardware setup, Phybots provides APIs for two-dimensional localization and locomotion of floor-based robotic things. These APIs are similar to those for graphical applications in which object positions are defined by screen coordinates, and support moving to a goal, pushing an object toward a goal, tracing a path, and other custom behavior by specifying a vector field."
                  }
                </p>

                {!en ? (
                  <>
                    <p>
                      <Translate path={"phybots/index.pug"} />
                    </p>
                  </>
                ) : null}
              </GridColumn>
              <GridColumn>
                <Header as="h3">
                  {en
                    ? "Centralized and Extensible Architecture"
                    : "中央集権・拡張容易なアーキテクチャ"}
                </Header>

                <p>
                  {
                    "Phybots APIs are built on top of a centralized and extensible software architecture that runs on one personal computer and manages all physical objects of interest."
                  }
                </p>

                <p>
                  {
                    "The programmer has direct access to these objects including cameras, robotic things, and entities with visual markers as instances of the "
                  }
                  <Icon>{"Camera"}</Icon>
                  {", "}
                  <Icon>{"Robot"}</Icon>
                  {" and "}
                  <Icon>{"Entity"}</Icon>
                  {
                    " interfaces, respectively. Time-consuming tasks including locomotion APIs are represented by "
                  }
                  <Icon>{"Task"}</Icon>
                  {" interface."}
                </p>

                <p>
                  {
                    "The toolkit can be easily extended on top of these software stacks to support other types of sensors, roobts, and tasks. In addition, a "
                  }
                  <Icon>{"Workflow"}</Icon>
                  {" class represents a directed graph consisting of a set of "}
                  <Icon>{"Robot"}</Icon>
                  {" and "}
                  <Icon>{"Task"}</Icon>
                  {
                    " instances, and enables higher-level task management such as handling multiple tasks by one robot in serial or by two robots in parallel."
                  }
                </p>

                {!en ? (
                  <>
                    <p>
                      <Translate path={"phybots/index.pug"} />
                    </p>
                  </>
                ) : null}
              </GridColumn>
              <GridColumn>
                <Header as="h3">
                  {en ? "Runtime Debug Tool" : "ランタイムデバッグツール"}
                </Header>

                <p>
                  {"Phybots provides a "}
                  <Icon>{"runtime debug tool"}</Icon>
                  {
                    " that supports a test phase, beyond the programming phase, as an essential part of the prototyping process."
                  }
                </p>

                <p>
                  {
                    "In the robot application test phase, when the robot fails to accomplish its task, the user usually has to order the same task to be performed again. Because it is too costly to restart a test run for each error, the programmer often wants to fix the error right away without restarting."
                  }
                </p>

                <p>
                  {"To support this workflow, a graphical "}
                  <Icon>{"runtime debug tool"}</Icon>
                  {
                    " enables API parameter reconfiguration, restart, pause, or resume of the interaction at run-time. For example, when the robotic thing fails to move to a desired destination, the programmer can change the threshold of the marker detection algorithm by dragging a slider and then give the robot another try."
                  }
                </p>

                {!en ? (
                  <>
                    <p>
                      <Translate path={"phybots/index.pug"} />
                    </p>
                  </>
                ) : null}
              </GridColumn>
            </Grid>
            <Divider hidden />
            <p>
              <LinkedImage
                fluid
                href={href(`${rootPath}phybots/debug-tools.png`)}
              >
                <SiteImage src={`${rootPath}phybots/debug-tools.png`} />
              </LinkedImage>
            </p>
            <div className="caption">
              {en
                ? "Overview of the Phybots runtime debug tool"
                : "ランタイムデバッグツールの概観"}
            </div>
          </Segment>
        </section>
        {!en ? (
          <>
            <Divider hidden />
            <section id={"vision"}>
              <Header as="h2">{"未来ビジョン"}</Header>
              <Segment basic>
                {en ? null : (
                  <>
                    <Message>
                      {"本研究には以下の原稿とは別に"}
                      <strong>{"裏"}</strong>
                      {"の未来ビジョンが存在する。詳細は"}

                      <SiteLink
                        href={href(
                          `${rootPath}publications/wiss2010-kato-matereal-slides.pdf`,
                        )}
                      >
                        {"発表スライド"}
                      </SiteLink>
                      {"後半に書いてあり、これが翌年の"}
                      <SiteLink href={href(`${basePath}sharedo/`)}>
                        {"Sharedo"}
                      </SiteLink>
                      {"に繋がっている。"}
                    </Message>
                    <p>
                      {
                        "我々はロボットが何であるかを知らない。自分たちで作った言葉であるにも拘らず、言葉が独り歩きし、各々が勝手なイメージを持っている。日本においては、とくに大型で人型の印象が強いようである。しかしながら、既存のロボット研究において一般的に用いられてきた大型のロボットは、ロバストに動作させるためにハードウェアおよび制御用ソフトウェアに高度な作りこみが求められ、かつ高価なため、そもそも多くのソフトウェアプログラマが満足にアプリケーション開発できるだけの環境を用意するのが困難である。また、空間知能化などのキーワードを考えたとき、大型ロボットは動作空間を用意すること自体に手間がかかる。"
                      }
                    </p>
                    <p>
                      {
                        "一方、小型のロボットであればArduino等のPhysical Computing用ツールキットを利用して比較的安価に自作することが容易であり、さまざまな種類のロボットを試作できることが見込まれる。小型であれば机上など多くの場所で動作させることができるだろう。アプリケーションが確立すれば、小型ロボットなら大量生産もしやすく一層安価になることが期待できる。そもそも人間の生活環境における小型ロボットの存在は既存の家電製品との境界が曖昧であり、とくに家電製品をネットワーク越しに操作できるようになったとき境界はほぼ消失すると考えている。このように我々は、ネットワーク家電を含む小型ロボットが複数台・複数種人間の生活環境に溶け込んでいる未来ビジョンを念頭においてツールキットを開発してきたため、本文中のサンプルアプリケーションでも多くの小型ロボットや遠隔操作できるようハックした家電製品を登場させた。"
                      }
                    </p>
                    <p>
                      {
                        "我々が描く未来は、多くの人々、最初は研究者や科学・技術に強い興味のあるプログラマなどに、まずはロボットに触れてもらうところから始まると考えている。触れるということは、そのプログラムやアプリケーションを開発することであり、それによってロボットで何が出来るのか、どうしたら良くなるのかを、広く議論して行きたいということである。そこで我々は、手軽にプロトタイピングを行える共通のスタートラインとしてのツールキットが必要であると考え、Matereal(旧名、現Phybots)の研究開発を行ってきた。現時点ではJava用ライブラリとして提供しているが、Processingや他の言語の開発環境でも利用できるようにして、さらに幅広い層のプログラマにとって魅力的な環境構築を目指していきたい。"
                      }
                    </p>
                  </>
                )}
              </Segment>
            </section>
          </>
        ) : null}
        <Divider hidden />
        <ProjectPublications
          project={"phybots"}
          majorPublication={"dis2012-kato-phybots"}
        />
      </SiteLayout>
    </>
  );
}
