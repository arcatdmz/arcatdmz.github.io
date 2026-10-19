import { Grid, GridColumn } from "react-fomantic-ui";
import { LocalizedContent } from "@/site/components/LocalizedContent";
import { Embed } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
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

/** Shared page template. Japanese overrides: message, abstract, overview, api, extra. */
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

  p = projectsTable["picode"];
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
        <ProjectHeader project={"picode"} />
        <div className="ui message">
          <LocalizedContent
            ja={
              <>
                {"Picodeは"}
                <a
                  href={
                    "https://web.archive.org/web/20160617171039/https://www.microsoft.com/ja-jp/ijarc/core/ifp_07_j_result.aspx"
                  }
                >
                  {"Microsoft Research CORE 7 プログラム"}
                </a>
                {"の支援を受けて始まり、"}
              </>
            }
          >
            {"The project was implemented using the "}
          </LocalizedContent>
          <SiteLink href={href(`${basePath}phybots`)}>{"Phybots"}</SiteLink>
          <LocalizedContent
            ja={
              <>
                {"を利用して開発され、現在は"}
                <a href={"https://github.com/arcatdmz/picode"}>{"GitHub"}</a>
                {
                  "でソースコードが公開されているオープンソースプロジェクトです。"
                }
              </>
            }
          >
            {
              " library for creating robotic things and its source code is available on "
            }
            <a href={"https://github.com/arcatdmz/picode/"}>{"GitHub"}</a>
            {"! The development was supported in part by "}
            <a
              href={
                "https://web.archive.org/web/20160617171039/https://www.microsoft.com/ja-jp/ijarc/core/ifp_07_j_result.aspx"
              }
            >
              {"Microsoft Research CORE 7 program (Japanese page)"}
            </a>
            {"."}
          </LocalizedContent>
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <LocalizedContent
              ja={
                <>
                  <p>
                    {
                      "プログラムのソースコードは、大抵の場合、文字や記号表現を用いて記述するものである。このような表現は、論理的な処理の精確な記述に適している一方で、画像や多関節ロボットの姿勢情報など、具体的なデータセットを分かりやすく見せることができない。この問題は、実世界の人やロボットの姿勢情報を扱うプログラミングで顕著である。"
                    }
                  </p>
                  <p>
                    {
                      "そこで我々は、人やロボットの姿勢データを写真と紐づけ、ソースコード中に写真を貼り込める統合開発環境Picode (旧名Roboko)を試作した。まず、写真と紐づけられた姿勢データを第一級オブジェクトとして扱う拡張を既存の文字言語に施した。次に、姿勢データを引数に取るAPIライブラリを提供した。そして、エディタに写真を貼り付けられるような開発環境を実装した。"
                    }
                  </p>
                </>
              }
            >
              <p>
                {
                  "Current programming environments use textual or symbolic representations. While these representations are good at describing logical processes, they are not appropriate for representing human and robot posture data which is necessary for handing gesture input and controlling robots."
                }
              </p>
              <p>
                {
                  "To address this issue, we propose a text-based development environment integrated with visual representations: photos of human and robots. With our development environment, the user first takes a photo to bind it to a posture data. Then, s/he drag-and-drops the photo to the code editor, where it is shown as an inline image."
                }
              </p>
            </LocalizedContent>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"presentations"}>
          <h2 className="ui header">
            {en ? "Presentation materials" : "発表内容"}
          </h2>
          <div className="ui basic segment">
            <Grid stackable columns={2}>
              <GridColumn>
                <h3 className="ui header">{"CHI 2013 Fast-forward"}</h3>
                <EmbedYoutube src={"//www.youtube.com/embed/NCou4Q1STE8"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=NCou4Q1STE8"}>
                        <i className="youtube icon"></i>
                        {"Fast-forward"}
                      </a>
                    </div>
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=cQv0-4f8LEA"}>
                        <i className="youtube icon"></i>
                        {"Full version"}
                      </a>
                    </div>
                  </div>
                </div>
              </GridColumn>
              <GridColumn>
                <h3 className="ui header">
                  {"CHI 2013 "}
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
              </GridColumn>
            </Grid>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section>
          <h2 className="ui header">{"Picode IDE"}</h2>
          <div className="ui basic segment">
            <LocalizedContent
              ja={
                <>
                  <p>
                    {
                      '本研究では、姿勢情報を用いるプログラミングのワークフローを支援するため、写真を貼りこめるよう拡張したエディタを含む文字ベースの統合開発環境(IDE)に、姿勢情報と写真の記録および紐づけを自然に行える例示インタフェースと、記録した写真を閲覧できる"Pose library"を追加した。このIDEを用いたプログラミングは、人やロボットの姿勢情報を写真とともにキャプチャする例示から始まる。そして、写真をエディタにドラッグ＆ドロップしたり文字を入力したりすることでソースコードを書き上げ、プログラムを実行する。ソースコードはキャプチャした写真と姿勢情報のデータセットと共に再配布できる。'
                    }
                  </p>
                  <p>
                    {
                      "例えば、Picodeを用いると以下のようなプログラムを書ける。サポートされている主なAPIについては後述する。("
                    }
                    <SiteLink
                      href={href(
                        `${rootPath}picode/docs/?com/phybots/picode/api/package-summary.html`,
                      )}
                    >
                      {"Javadoc"}
                    </SiteLink>
                    {")"}
                  </p>
                  <dl>
                    <dt>
                      <SiteLink href={href(`${rootPath}picode/xylophone/`)}>
                        {"鉄琴演奏ロボ"}
                      </SiteLink>
                    </dt>
                    <dd>{"かえるの歌を演奏する。"}</dd>
                    <dt>
                      <SiteLink href={href(`${rootPath}picode/hello/`)}>
                        {"挙手でスライド送り"}
                      </SiteLink>
                    </dt>
                    <dd>
                      {
                        "右手を挙げるとスライドを次に送り、左手を挙げると一つ前に戻す。"
                      }
                    </dd>
                    <dt>
                      <SiteLink href={href(`${rootPath}picode/flag/`)}>
                        {"旗揚げゲーム"}
                      </SiteLink>
                    </dt>
                    <dd>
                      {
                        "画面に出てくるキャラクターと同じほうの手を素早く挙げると高得点。"
                      }
                    </dd>
                  </dl>
                </>
              }
            >
              <p>
                {
                  "Our prototype implementation consists of three main components: the code editor, the pose library, and the preview window. First, the user takes a photo of a human or robot in the preview window. At the same time, posture data is captured and the dataset is stored in the pose library. Next, s/he drag-and-drops the photo from the pose library into the code editor, where the photo is shown inline. Then, s/he can run the application. S/he can also distribute the source code bundled with the referenced datasets so that others can run the same application on our development environment."
                }
              </p>
              <p>
                {
                  "During the coding phase, the programmer can benefit from a software library tightly coupled with the IDE. The library provides a set of API that enables easy control of robots. The main functions are shown below. Other APIs are listed in "
                }
                <SiteLink
                  href={href(
                    `${rootPath}picode/docs/?com/phybots/picode/api/package-summary.html`,
                  )}
                >
                  {"Javadoc"}
                </SiteLink>
                {"."}
              </p>
            </LocalizedContent>
          </div>
          <Grid stackable columns={2}>
            <GridColumn>
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}picode/picode-ide.jpg`)}
              >
                <SiteImage
                  src={`${rootPath}picode/picode-ide.jpg`}
                  alt={"Overview"}
                />
              </SiteLink>
              <div className="caption">
                {en ? "Overview of the Picode IDE" : "Picode IDEの概観"}
              </div>
            </GridColumn>
            <GridColumn>
              <LocalizedContent
                ja={
                  <dl>
                    <dt>
                      <strong>{"Pose"}</strong>
                      {" Robot.getPose()"}
                    </dt>
                    <dd>{"現在の姿勢を返す"}</dd>
                    <dt>
                      <strong>{"float"}</strong>
                      {" Pose.distance(Pose pose)"}
                    </dt>
                    <dd>{"二つの姿勢間の差異を返す [0.0-1.0]"}</dd>
                    <dt>
                      <strong>{"boolean"}</strong>
                      {" Pose.eq(Pose pose, float threshold)"}
                    </dt>
                    <dd>
                      {
                        "二つの姿勢が同じとみなせるかどうか返す (二つの姿勢間の差異がthresholdより小さいかどうか返す)"
                      }
                    </dd>
                    <dt>
                      <strong>{"boolean"}</strong>
                      {" Robot.setPose(Pose pose)"}
                    </dt>
                    <dd>{"ロボットの姿勢を指定する"}</dd>
                    <dt>
                      <strong>{"Action"}</strong>
                      {" Robot.action()"}
                    </dt>
                    <dd>
                      {"ロボットの姿勢の推移を表すActionオブジェクトを返す"}
                    </dd>
                    <dt>
                      <strong>{"Action"}</strong>
                      {" Action.pose(Pose pose)"}
                    </dt>
                    <dd>
                      {"このActionの最後に指定した姿勢への推移を追加する"}
                    </dd>
                    <dt>
                      <strong>{"Action"}</strong>
                      {" Action.stay(int ms)"}
                    </dt>
                    <dd>
                      {"このActionの最後に指定した時間のまま静止するようにする"}
                    </dd>
                    <dt>
                      <strong>{"ActionResult"}</strong>
                      {" Action.play()"}
                    </dt>
                    <dd>{"Actionを再生する"}</dd>
                  </dl>
                }
              >
                <dl>
                  <dt>
                    <strong>{"Pose"}</strong>
                    {" Robot.getPose()"}
                  </dt>
                  <dd>{"returns the current pose data."}</dd>
                  <dt>
                    <strong>{"float"}</strong>
                    {" Pose.distance(Pose pose)"}
                  </dt>
                  <dd>
                    {"calculates the distance between the two poses. [0.0-1.0]"}
                  </dd>
                  <dt>
                    <strong>{"boolean"}</strong>
                    {" Pose.eq(Pose pose, float threshold)"}
                  </dt>
                  <dd>
                    {
                      "returns whether the two poses can be thought of as identical or not. (returns whether the distance between the two poses is less than the threshold or not.)"
                    }
                  </dd>
                  <dt>
                    <strong>{"boolean"}</strong>
                    {" Robot.setPose(Pose pose)"}
                  </dt>
                  <dd>{"set the current pose to the specified data."}</dd>
                  <dt>
                    <strong>{"Action"}</strong>
                    {" Robot.action()"}
                  </dt>
                  <dd>{"start building an action for the robot."}</dd>
                  <dt>
                    <strong>{"Action"}</strong>
                    {" Action.pose(Pose pose)"}
                  </dt>
                  <dd>{"add this pose to the end of this action."}</dd>
                  <dt>
                    <strong>{"Action"}</strong>
                    {" Action.stay(int ms)"}
                  </dt>
                  <dd>
                    {"wait for the specified time at the end of this action."}
                  </dd>
                  <dt>
                    <strong>{"ActionResult"}</strong>
                    {" Action.play()"}
                  </dt>
                  <dd>{"play this action."}</dd>
                </dl>
              </LocalizedContent>
            </GridColumn>
          </Grid>
        </section>
        {!en ? (
          <>
            <div className="ui hidden divider"></div>
            <section id={"vision"}>
              <h2 className="ui header">{"未来ビジョン"}</h2>
              <div className="ui basic segment">
                {en ? null : (
                  <>
                    <p>
                      {
                        '"Programmers are people, too." という言葉がある。この、プログラマだって人である、という言葉には、プログラマがいかに分かりづらい言語を理解し、使いづらい開発環境と格闘してきたか、プログラマと一般人の溝がいかに深いか、という現状認識が現れているように思われる。'
                      }
                    </p>
                    <p>
                      {
                        "しかし私は、プログラマと一般人の溝が近年急速に埋まりつつあるように感じている。まず、開発環境を整えるのが簡単になった。以前なら必要なファイルを揃えてパスを通して、と大変な手間だったものが、今はブラウザを開くだけでよい。プログラミングの学習も"
                      }
                      <a
                        href={
                          "https://www.khanacademy.org/computing/computer-programming"
                        }
                      >
                        {"Kahn Academy"}
                      </a>
                      {
                        "などでインタラクティブに進められる。また、プログラミングできる対象が身近になってきた。"
                      }
                      <a
                        href={
                          "https://en.wikipedia.org/wiki/Lego_Mindstorms_NXT"
                        }
                      >
                        {"LEGO Mindstorms NXT"}
                      </a>
                      {
                        "のように実世界で動くものはもちろん、例えばスマートフォン上でスマートフォン用のプログラムを書いたり("
                      }
                      <SiteLink href={href(`${basePath}touchdevelop/`)}>
                        {"TouchDevelop"}
                      </SiteLink>
                      {")、Webサービス同士をif-thenルールで連携させたり("}
                      <a href={"https://ifttt.com"}>{"IFTTT"}</a>
                      {
                        ")できる。家電製品がネットワークに繋がるようになってきたから、これらを遠隔制御する実用的なプログラムも簡単に書けるようになるだろう。"
                      }
                    </p>
                    <p>
                      {
                        "また、プログラミング言語の研究者コミュニティでは、言語だけでなく開発環境まで含めたプログラマの体験を重視する研究が増えてきている。我々のコミュニティで道具としてのUIから体験としてのHCIに研究の主流がシフトしたように、言語、ライブラリ、開発環境を個々に評価するのではなく、全体のワークフローを重視する流れが生まれている。"
                      }
                    </p>
                    <p>
                      {
                        '我々は、このような追い風を受けながら "People are programmers." の世界を実現していきたいと考えている。'
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
          project={"picode"}
          majorPublication={"chi2013-kato-picode"}
        />
      </SiteLayout>
    </>
  );
}
