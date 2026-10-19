import { LocalizedContent } from "@/site/components/LocalizedContent";
import { Embed } from "@/site/components/SiteWidgets";
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
        <div className="ui message">
          {en ? "Phybots is open-source at " : "Phybotsは"}
          <a href={"https://github.com/arcatdmz/phybots/"}>{"GitHub"}</a>
          {en
            ? " and can be downloaded at "
            : "にてオープンソースで公開中です。また、ドキュメントやライブラリのダウンロードは "}
          <a href={en ? "https://phybots.com/" : "https://phybots.com/ja/"}>
            {en ? "https://phybots.com" : "https://phybots.com/ja"}
          </a>
          {en ? "." : " から行うことができます。"}
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <div className="ui basic segment">
            <div className="ui stackable grid">
              <div className="ten wide column">
                <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
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
              </div>
              <div className="six wide column">
                <SiteLink
                  className="ui fluid image"
                  href={href(`${rootPath}phybots/fig1-overview.jpg`)}
                >
                  <SiteImage
                    src={`${rootPath}phybots/fig1-overview.jpg`}
                    alt={"Overview of hardware setup for Phybots"}
                  />
                </SiteLink>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"presentations"}>
          <h2 className="ui header">
            {en ? "Presentation materials" : "発表内容"}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">{"Example applications"}</h3>
                <EmbedYoutube
                  src={
                    "https://www.youtube.com/embed/videoseries?list=PL5EC9CECDDBEA183A"
                  }
                />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a
                        href={
                          "//www.youtube.com/playlist?list=PL5EC9CECDDBEA183A"
                        }
                      >
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {"DIS 2012 "}
                  {en ? "Slides" : "発表スライド"}
                </h3>

                <Embed
                  className="ui embed"
                  data-url={publicationsTable[p.publication].entryTags.slides}
                  data-placeholder={`${rootPath}images/background-eee.png`}
                  data-icon={"video play outline"}
                ></Embed>

                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <SiteLink
                        href={href(
                          publicationsTable[p.publication].entryTags.slides,
                        )}
                      >
                        <i className="download icon"></i>
                        {en ? "Download" : "ダウンロード"}
                      </SiteLink>
                    </div>
                  </div>
                </div>

                {!en ? (
                  <>
                    <p className="caption">
                      {"日本語の発表スライドは"}
                      <a href={"#publications"}>
                        <i className="book icon"></i>
                        {"発表文献"}
                      </a>
                      {"で日本語文献の "}
                      <i className="sidebar fitted icon"></i>
                      {" をクリックすると閲覧できます。"}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"toolkit"}>
          <h2 className="ui header">
            {en ? "Phybots Toolkit" : "Phybots ツールキット"}
          </h2>
          <div className="ui basic segment">
            <table className="ui fluid table">
              <thead>
                <tr>
                  <th>{en ? "Toolkits for:" : "目的:"}</th>
                  <th>
                    {en ? "Physical UIs" : "フィジカルコンピューティング"}
                  </th>
                  <th className="center aligned">{"Phybots"}</th>
                  <th className="right aligned">
                    {en ? "Robots" : "ロボット"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>
                      {en ? "Target users:" : "ターゲット ユーザー:"}
                    </strong>
                  </td>
                  <td className="positive" colSpan={Number("2")}>
                    {en
                      ? "HCI researchers & interaction designers"
                      : "HCI研究者 & インタラクション デザイナー"}
                  </td>
                  <td className="negative right aligned">
                    {en ? "Robotics people" : "ロボット工学の研究者"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{en ? "Focus:" : "重視すること:"}</strong>
                  </td>
                  <td className="positive" colSpan={Number("2")}>
                    {en ? "Prototyping" : "プロトタイピング"}
                  </td>
                  <td className="negative right aligned">
                    {en ? "Reliability" : "信頼性"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      {en ? "Software APIs:" : "ソフトウェアAPI:"}
                    </strong>
                  </td>
                  <td className="negative">
                    {en ? "Low-level and static" : "低レベルで拡張性に乏しい"}
                  </td>
                  <td className="positive right aligned" colSpan={Number("2")}>
                    {en
                      ? "High-level and extensible"
                      : "高レベルで拡張性に富む"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      {en
                        ? "Hardware size & cost:"
                        : "ハードウェアの大きさ & 価格:"}
                    </strong>
                  </td>
                  <td className="positive" colSpan={Number("2")}>
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
                  </td>
                  <td className="negative right aligned">
                    {en
                      ? "Medium to large & expensive ($700-)"
                      : "大きい & 高価 ($700-)"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="caption">
              {en ? "Comparison between toolkits" : "ツールキットの比較"}
            </div>
            <div className="ui hidden divider"></div>
            <div className="ui stackable three columns grid">
              <div className="column">
                <h3 className="ui header">
                  {en
                    ? "APIs for 2D Locomotion"
                    : "平面上での移動指示のためのAPI"}
                </h3>

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
              </div>
              <div className="column">
                <h3 className="ui header">
                  {en
                    ? "Centralized and Extensible Architecture"
                    : "中央集権・拡張容易なアーキテクチャ"}
                </h3>

                <p>
                  {
                    "Phybots APIs are built on top of a centralized and extensible software architecture that runs on one personal computer and manages all physical objects of interest."
                  }
                </p>

                <p>
                  {
                    "The programmer has direct access to these objects including cameras, robotic things, and entities with visual markers as instances of the "
                  }
                  <i>{"Camera"}</i>
                  {", "}
                  <i>{"Robot"}</i>
                  {" and "}
                  <i>{"Entity"}</i>
                  {
                    " interfaces, respectively. Time-consuming tasks including locomotion APIs are represented by "
                  }
                  <i>{"Task"}</i>
                  {" interface."}
                </p>

                <p>
                  {
                    "The toolkit can be easily extended on top of these software stacks to support other types of sensors, roobts, and tasks. In addition, a "
                  }
                  <i>{"Workflow"}</i>
                  {" class represents a directed graph consisting of a set of "}
                  <i>{"Robot"}</i>
                  {" and "}
                  <i>{"Task"}</i>
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
              </div>
              <div className="column">
                <h3 className="ui header">
                  {en ? "Runtime Debug Tool" : "ランタイムデバッグツール"}
                </h3>

                <p>
                  {"Phybots provides a "}
                  <i>{"runtime debug tool"}</i>
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
                  <i>{"runtime debug tool"}</i>
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
              </div>
            </div>
            <div className="ui hidden divider"></div>
            <p>
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}phybots/debug-tools.png`)}
              >
                <SiteImage src={`${rootPath}phybots/debug-tools.png`} />
              </SiteLink>
            </p>
            <div className="caption">
              {en
                ? "Overview of the Phybots runtime debug tool"
                : "ランタイムデバッグツールの概観"}
            </div>
          </div>
        </section>
        {!en ? (
          <>
            <div className="ui hidden divider"></div>
            <section id={"vision"}>
              <h2 className="ui header">{"未来ビジョン"}</h2>
              <div className="ui basic segment">
                {en ? null : (
                  <>
                    <div className="ui message">
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
                    </div>
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
              </div>
            </section>
          </>
        ) : null}
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"phybots"}
          majorPublication={"dis2012-kato-phybots"}
        />
      </SiteLayout>
    </>
  );
}
