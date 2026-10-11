import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import {
  classNames,
  style,
  text as plainText,
  keyed,
  href,
  attribute,
} from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/dejavu/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const {
    histories,
    awards,
    talks,
    lectures,
    projects,
    projectsTable,
    products,
    selectedProjects,
    publications,
    publicationsTable,
    selectedPublications,
    media,
    mediaList,
    misc,
    moment,
    rootPath,
    protocol,
    domain,
    defaultImageUrl,
    defaultDescription,
    defaultJapaneseDescription,
    stripTags,
  } = data;
  const lang: "en" | "ja" = "ja";
  const en: boolean = false;
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
  moment.locale(lang);
  const context: ReturnType<typeof getSiteData> & SiteContext = {
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
  const content = createContentComponents(context);

  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("dejavu")}
        <div className="ui message">
          {richText(
            "本研究の成果物である統合開発環境は、現在のところ公開される予定はありません。ただ、Kinectデータの録画再生など類似の機能は、統合開発環境とは独立したツール",
          )}
          <a
            href={href(
              "https://msdn.microsoft.com/en-us/library/hh855389.aspx",
            )}
          >
            {richText("Kinect Studio")}
          </a>
          {richText("として提供されています。ぜひご利用ください。")}
        </div>
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "カメラ入力を用いたインタラクティブなアプリケーション開発が一般的になるにつれ、その特徴的な開発フローが既存の統合開発環境に馴染まないことが明らかになってきた。そこで本研究では、統合開発環境の拡張機能DejaVuを提案する。我々は、カメラからの入力が与えられるたびに画像処理のパイプラインが走るプログラムの構造に着目して、既存の統合開発環境に2つのインタフェースCanvasとTimelineを追加した。Canvasインタフェースは、カメラからの入力とプログラム内の処理結果およびウィンドウ出力をリアルタイムかつ継続的に可視化し続ける。Timelineインタフェースは、同データを容易に記録、再生できる。また、ソースコードに変更があった際、記録したカメラ入力を用いて、プログラム内の処理結果とウィンドウ出力を更新できる。DejaVuは、3名のベテランターゲットユーザーによる予備的な試用の結果、好意的に受け入れられた。",
              )}
            </p>
            <p>
              {richText("本研究は、Microsoft Research Asia ")}
              <a
                href={href(
                  "https://web.archive.org/web/20120408040100/http://research.microsoft.com/en-us/um/beijing/groups/hci/",
                )}
              >
                {richText("HCI Group")}
              </a>
              {richText("における3か月強のインターンの成果物である。")}
              <a
                href={href(
                  "https://scholar.google.com/citations?user=XprSyesAAAAJ&hl=en",
                )}
              >
                {richText("Xiang Cao")}
              </a>
              {richText("および")}
              <a
                href={href(
                  "https://scholar.google.com/citations?user=EFCqkUsAAAAJ&hl=en",
                )}
              >
                {richText("Sean McDirmid")}
              </a>
              {richText("がメンターであった。")}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("presentations")}>
          <h2 className="ui header">
            {plainText(en ? "Presentation materials" : "発表内容")}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {richText("UIST 2012 ")}
                  {plainText(en ? "Demo Video" : "デモ動画")}
                </h3>
                {content.renderEmbedYoutube(
                  "//www.youtube.com/embed/k5USoB7ZPPk",
                )}
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={href("//www.youtube.com/watch?v=k5USoB7ZPPk")}>
                        <i className="youtube icon"></i>
                        {richText("YouTube")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {richText("UIST 2012 ")}
                  {plainText(en ? "Slides" : "発表スライド")}
                </h3>
                <div
                  className="ui embed"
                  data-url={publicationsTable[p.publication].entryTags.slides}
                  data-placeholder={`${rootPath}images/background-eee.png`}
                  data-icon={"video play outline"}
                ></div>
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a
                        href={href(
                          publicationsTable[p.publication].entryTags.slides,
                        )}
                      >
                        <i className="download icon"></i>
                        {plainText(en ? "Download" : "ダウンロード")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("overview")}>
          <h2 className="ui header">
            {richText(
              'DejaVu <abbr title="Integrated Development Environment">IDE</abbr>',
            )}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "我々は以下の2つのインタフェースを、一般的な統合開発環境に追加した。実装のベースには",
              )}
              <a href={href("https://github.com/icsharpcode")}>
                {richText("SharpDevelop")}
              </a>
              {richText(
                "を用いたが、VisualStudioやEclipse、Xcodeに同様の機能拡張を施すこともできる。",
              )}
            </p>
            <div className="ui stackable two columns grid">
              <div className="six wide column">
                <p>
                  <a
                    className="ui fluid image"
                    href={href(`${rootPath}dejavu/fig4-canvas.png`)}
                  >
                    <img
                      src={`${rootPath}dejavu/fig4-canvas.png`}
                      alt={"Canvas"}
                      width={"570"}
                    />
                  </a>
                </p>
                <p>
                  <a
                    className="ui fluid image"
                    href={href(`${rootPath}dejavu/fig6-timeline.png`)}
                  >
                    <img
                      src={`${rootPath}dejavu/fig6-timeline.png`}
                      alt={"Timeline"}
                      width={"570"}
                    />
                  </a>
                </p>
              </div>
              <div className="ten wide column">
                <h3 className="ui header">{richText("Canvas")}</h3>
                <ul>
                  <li>{richText("変数のドラッグ＆ドロップによる可視化")}</li>
                  <li>
                    {richText(
                      "カメラ入力、変数の中身、ウィンドウ出力のリアルタイム更新",
                    )}
                  </li>
                  <li>{richText("スケッチによるアノテーション")}</li>
                </ul>
                <h3 className="ui header">{richText("Timeline")}</h3>
                <ul>
                  <li>
                    {richText(
                      "Canvasインタフェースに可視化されている項目が自動的に表示される",
                    )}
                  </li>
                  <li>
                    {richText(
                      "カメラ入力、変数の中身、ウィンドウ出力の自動録画と再生",
                    )}
                  </li>
                  <li>
                    {richText(
                      "ソースコードに変更があった場合に、カメラ入力の録画を用いて変数の中身とウィンドウ出力を自動更新",
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("dejavu", "uist2012-kato-dejavu")}
      </SiteLayout>
    </>
  );
}
