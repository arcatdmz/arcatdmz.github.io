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

/** React page migrated from ja/visionsketch/index.pug; edit this TSX source directly. */
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

  p = projectsTable["visionsketch"];
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
        {content.renderProjectHeader("visionsketch")}
        <div className="ui message">
          {richText("ソースコードが")}
          <a href={href("https://github.com/arcatdmz/visionsketch/")}>
            {richText("GitHub")}
          </a>
          {richText("で公開されています。WindowsとMac両用です。")}
        </div>
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                'プログラムの手順を表すのに文字が最善手とは限らない。とくに画像処理のパイプライン処理では、入力と出力は画像および動画であり、アルゴリズムに渡すパラメタは二次元座標系上の領域など画像や動画上で何らかの意味を持っていることが多い。我々は画像処理のプログラミングが持つこれらのビジュアルな特徴に着目し、画像処理のパイプラインを素早く構築して実行できるプロトタイピング目的の言語および開発環境"VisionSketch"を提案する。',
              )}
            </p>
            <p>
              {richText(
                "VisionSketchのユーザは、まず操作対象となる画像または動画のソースを開き、その上で図形を描いて着目する領域(ROI, region of interest)を指定する。次に、VisionSketchの開発環境がROIに対して適用できる操作を一覧表示する。ユーザがその中から一つを選ぶと、操作の適用結果がインタラクティブに表示される。ユーザは、このようにして望みの操作を探すことができる。さらに、必要であれば、出力として得られた画像または動画を入力として用い、ROIの指定と画像処理の適用を繰り返すことができる。",
              )}
            </p>
            <p>
              {richText(
                "VisionSketchでは、従来の文字列ベースの言語ではメソッド呼び出しの繰り返しとしてタイピングにより記述していた処理が、図形の描画と必要な操作の選択をGUIの直接操作で繰り返すことにより指示可能となっている。",
              )}
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
                  {richText("GI 2014 ")}
                  {plainText(en ? "Demo Video" : "デモ動画")}
                </h3>
                {content.renderEmbedYoutube(
                  "//www.youtube.com/embed/I6FTOVygHxc",
                )}
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={href("//www.youtube.com/watch?v=I6FTOVygHxc")}>
                        <i className="youtube icon"></i>
                        {richText("YouTube")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {richText("GI 2014 ")}
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
        <section>
          <h2 className="ui header">{richText("VisionSketch IDE")}</h2>
          <div className="ui stackable two columns grid">
            <div className="column">
              <a
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/fig1-overview.jpg`)}
              >
                <img
                  src={`${rootPath}visionsketch/fig1-overview.jpg`}
                  alt={"Overview"}
                />
              </a>
              <div className="caption">
                {plainText(
                  en
                    ? "Overview of the VisionSketch IDE (GI '14)"
                    : "VisionSketch IDEの概観",
                )}
              </div>
              <div className="ui hidden divider"></div>
              <a
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/visionsketch-overview.jpg`)}
              >
                <img
                  src={`${rootPath}visionsketch/visionsketch-overview.jpg`}
                  alt={"Overview (original version)"}
                />
              </a>
              <div className="caption">
                {plainText(
                  en
                    ? "Prototype of the VisionSketch IDE (PLDI '13)"
                    : "PLDI '13発表時の初版の概観",
                )}
              </div>
            </div>
            <div className="column">
              <a
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/visionsketch-example.jpg`)}
              >
                <img
                  src={`${rootPath}visionsketch/visionsketch-example.jpg`}
                  alt={"Example use case #1: counting grinds"}
                  width={"560"}
                />
              </a>
              <div className="caption">
                {plainText(
                  en
                    ? "An example image processing pipeline"
                    : "構築した画像処理パイプラインの例",
                )}
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications(
          "visionsketch",
          "gi2014-kato-visionsketch",
        )}
      </SiteLayout>
    </>
  );
}
