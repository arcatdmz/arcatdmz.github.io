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

/** Shared page template. Japanese overrides: message, abstract, overview, canvas, timeline. */
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

  p = projectsTable["dejavu"];
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
        <ProjectHeader project={"dejavu"} />
        <div className="ui message">
          <LocalizedContent
            ja={
              "本研究の成果物である統合開発環境は、現在のところ公開される予定はありません。ただ、Kinectデータの録画再生など類似の機能は、統合開発環境とは独立したツール"
            }
          >
            <strong>{"For those interested in this IDE:"}</strong>
            {
              " Unfortunately, there's no short term plan for the distribution. You can still use "
            }
          </LocalizedContent>
          <a href={"https://msdn.microsoft.com/en-us/library/hh855389.aspx"}>
            {"Kinect Studio"}
          </a>
          {en
            ? " that partially provides similar features (recording and replaying data stream) though without tight integration with the IDE."
            : "として提供されています。ぜひご利用ください。"}
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
                      "カメラ入力を用いたインタラクティブなアプリケーション開発が一般的になるにつれ、その特徴的な開発フローが既存の統合開発環境に馴染まないことが明らかになってきた。そこで本研究では、統合開発環境の拡張機能DejaVuを提案する。我々は、カメラからの入力が与えられるたびに画像処理のパイプラインが走るプログラムの構造に着目して、既存の統合開発環境に2つのインタフェースCanvasとTimelineを追加した。Canvasインタフェースは、カメラからの入力とプログラム内の処理結果およびウィンドウ出力をリアルタイムかつ継続的に可視化し続ける。Timelineインタフェースは、同データを容易に記録、再生できる。また、ソースコードに変更があった際、記録したカメラ入力を用いて、プログラム内の処理結果とウィンドウ出力を更新できる。DejaVuは、3名のベテランターゲットユーザーによる予備的な試用の結果、好意的に受け入れられた。"
                    }
                  </p>
                  <p>
                    {"本研究は、Microsoft Research Asia "}
                    <a
                      href={
                        "https://web.archive.org/web/20120408040100/http://research.microsoft.com/en-us/um/beijing/groups/hci/"
                      }
                    >
                      {"HCI Group"}
                    </a>
                    {"における3か月強のインターンの成果物である。"}
                    <a
                      href={
                        "https://scholar.google.com/citations?user=XprSyesAAAAJ&hl=en"
                      }
                    >
                      {"Xiang Cao"}
                    </a>
                    {"および"}
                    <a
                      href={
                        "https://scholar.google.com/citations?user=EFCqkUsAAAAJ&hl=en"
                      }
                    >
                      {"Sean McDirmid"}
                    </a>
                    {"がメンターであった。"}
                  </p>
                </>
              }
            >
              <p>
                {
                  "The increasing popularity of interactive camera-based programs highlights the inadequacies of conventional IDEs in developing these programs given their distinctive attributes and workflows. We present DejaVu, an IDE enhancement that eases the development of these programs by enabling programmers to visually and continuously monitor program data in consistency with the frame-based pipeline of computer-vision programs; and to easily record, review, and reprocess temporal data to iteratively improve the processing of non-reproducible camera input. DejaVu was positively received by three experienced programmers of interactive camera-based programs in our preliminary user trial."
                }
              </p>
              <p>
                {
                  "This research was done during my internship at Microsoft Research Asia "
                }
                <a
                  href={
                    "https://web.archive.org/web/20120408040100/http://research.microsoft.com/en-us/um/beijing/groups/hci/"
                  }
                >
                  {"HCI Group"}
                </a>
                {". My mentors were "}
                <a
                  href={
                    "https://scholar.google.com/citations?user=XprSyesAAAAJ&hl=en"
                  }
                >
                  {"Xiang Cao"}
                </a>
                {" and "}
                <a
                  href={
                    "https://scholar.google.com/citations?user=EFCqkUsAAAAJ&hl=en"
                  }
                >
                  {"Sean McDirmid"}
                </a>
                {"."}
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
                <h3 className="ui header">
                  {"UIST 2012 "}
                  {en ? "Demo Video" : "デモ動画"}
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/k5USoB7ZPPk"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=k5USoB7ZPPk"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </GridColumn>
              <GridColumn>
                <h3 className="ui header">
                  {"UIST 2012 "}
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
              </GridColumn>
            </Grid>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"overview"}>
          <h2 className="ui header">
            {"DejaVu "}
            <abbr title={"Integrated Development Environment"}>{"IDE"}</abbr>
          </h2>
          <div className="ui basic segment">
            <p>
              <LocalizedContent
                ja={
                  <>
                    {
                      "我々は以下の2つのインタフェースを、一般的な統合開発環境に追加した。実装のベースには"
                    }
                    <a href={"https://github.com/icsharpcode"}>
                      {"SharpDevelop"}
                    </a>
                    {
                      "を用いたが、VisualStudioやEclipse、Xcodeに同様の機能拡張を施すこともできる。"
                    }
                  </>
                }
              >
                {
                  "We added two interlinked components to a general purpose development environment."
                }
              </LocalizedContent>
            </p>
            <Grid stackable columns={2}>
              <GridColumn width={6}>
                <p>
                  <SiteLink
                    className="ui fluid image"
                    href={href(`${rootPath}dejavu/fig4-canvas.png`)}
                  >
                    <SiteImage
                      src={`${rootPath}dejavu/fig4-canvas.png`}
                      alt={"Canvas"}
                      width={"570"}
                    />
                  </SiteLink>
                </p>
                <p>
                  <SiteLink
                    className="ui fluid image"
                    href={href(`${rootPath}dejavu/fig6-timeline.png`)}
                  >
                    <SiteImage
                      src={`${rootPath}dejavu/fig6-timeline.png`}
                      alt={"Timeline"}
                      width={"570"}
                    />
                  </SiteLink>
                </p>
              </GridColumn>
              <GridColumn width={10}>
                <h3 className="ui header">{"Canvas"}</h3>
                <ul>
                  <li>
                    {en
                      ? "Visualizing various variable contents by drag-and-drop"
                      : "変数のドラッグ＆ドロップによる可視化"}
                  </li>
                  <li>
                    {en
                      ? "Continuously showing camera input, variable contents, window output"
                      : "カメラ入力、変数の中身、ウィンドウ出力のリアルタイム更新"}
                  </li>
                  <li>
                    {en
                      ? "Sketching capability"
                      : "スケッチによるアノテーション"}
                  </li>
                </ul>
                <h3 className="ui header">{"Timeline"}</h3>
                <ul>
                  <LocalizedContent
                    ja={
                      <>
                        <li>
                          {
                            "Canvasインタフェースに可視化されている項目が自動的に表示される"
                          }
                        </li>
                        <li>
                          {
                            "カメラ入力、変数の中身、ウィンドウ出力の自動録画と再生"
                          }
                        </li>
                        <li>
                          {
                            "ソースコードに変更があった場合に、カメラ入力の録画を用いて変数の中身とウィンドウ出力を自動更新"
                          }
                        </li>
                      </>
                    }
                  >
                    <li>
                      {
                        "Auto-recording, replaying (input streams) & refreshing (variables) to handle non-reproducible input"
                      }
                    </li>
                    <li>{"Contents synchronized with canvas"}</li>
                  </LocalizedContent>
                </ul>
              </GridColumn>
            </Grid>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"dejavu"}
          majorPublication={"uist2012-kato-dejavu"}
        />
      </SiteLayout>
    </>
  );
}
