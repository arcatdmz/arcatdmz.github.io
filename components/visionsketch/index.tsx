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

/** Shared page template. Japanese overrides: message, abstract. */
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

  p = projectsTable["visionsketch"];
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
        <ProjectHeader project={"visionsketch"} />
        <div className="ui message">
          {en ? "Source code is available on " : "ソースコードが"}
          <a href={"https://github.com/arcatdmz/visionsketch/"}>{"GitHub"}</a>
          {en
            ? "! It works on both Windows and Mac OS X."
            : "で公開されています。WindowsとMac両用です。"}
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
                      'プログラムの手順を表すのに文字が最善手とは限らない。とくに画像処理のパイプライン処理では、入力と出力は画像および動画であり、アルゴリズムに渡すパラメタは二次元座標系上の領域など画像や動画上で何らかの意味を持っていることが多い。我々は画像処理のプログラミングが持つこれらのビジュアルな特徴に着目し、画像処理のパイプラインを素早く構築して実行できるプロトタイピング目的の言語および開発環境"VisionSketch"を提案する。'
                    }
                  </p>
                  <p>
                    {
                      "VisionSketchのユーザは、まず操作対象となる画像または動画のソースを開き、その上で図形を描いて着目する領域(ROI, region of interest)を指定する。次に、VisionSketchの開発環境がROIに対して適用できる操作を一覧表示する。ユーザがその中から一つを選ぶと、操作の適用結果がインタラクティブに表示される。ユーザは、このようにして望みの操作を探すことができる。さらに、必要であれば、出力として得られた画像または動画を入力として用い、ROIの指定と画像処理の適用を繰り返すことができる。"
                    }
                  </p>
                  <p>
                    {
                      "VisionSketchでは、従来の文字列ベースの言語ではメソッド呼び出しの繰り返しとしてタイピングにより記述していた処理が、図形の描画と必要な操作の選択をGUIの直接操作で繰り返すことにより指示可能となっている。"
                    }
                  </p>
                </>
              }
            >
              <p>
                {
                  'We propose an integrated development environment (IDE) called "VisionSketch", which supports example-centric programming for easily building image processing pipelines.'
                }
              </p>
              <p>
                {
                  "With VisionSketch, a programmer is first asked to select the input video. Then, he can start building the pipeline with a visual programming language that provides immediate graphical feedback for algorithms applied to the video. He can also use a text-based editor to create or edit the implementation of each algorithm."
                }
              </p>
              <p>
                {
                  "During the development, the pipeline is always ready for execution with a video player-like interface enabling rapid iterative prototyping. In a preliminary user study, VisionSketch was positively received by five programmers, who had prior experience of writing text-based image processing programs and could successfully build interesting applications."
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
                <h3 className="ui header">
                  {"GI 2014 "}
                  {en ? "Demo Video" : "デモ動画"}
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/I6FTOVygHxc"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=I6FTOVygHxc"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </GridColumn>
              <GridColumn>
                <h3 className="ui header">
                  {"GI 2014 "}
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
        <section>
          <h2 className="ui header">{"VisionSketch IDE"}</h2>
          <Grid stackable columns={2}>
            <GridColumn>
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/fig1-overview.jpg`)}
              >
                <SiteImage
                  src={`${rootPath}visionsketch/fig1-overview.jpg`}
                  alt={"Overview"}
                />
              </SiteLink>
              <div className="caption">
                {en
                  ? "Overview of the VisionSketch IDE (GI '14)"
                  : "VisionSketch IDEの概観"}
              </div>
              <div className="ui hidden divider"></div>
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/visionsketch-overview.jpg`)}
              >
                <SiteImage
                  src={`${rootPath}visionsketch/visionsketch-overview.jpg`}
                  alt={"Overview (original version)"}
                />
              </SiteLink>
              <div className="caption">
                {en
                  ? "Prototype of the VisionSketch IDE (PLDI '13)"
                  : "PLDI '13発表時の初版の概観"}
              </div>
            </GridColumn>
            <GridColumn>
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}visionsketch/visionsketch-example.jpg`)}
              >
                <SiteImage
                  src={`${rootPath}visionsketch/visionsketch-example.jpg`}
                  alt={"Example use case #1: counting grinds"}
                  width={"560"}
                />
              </SiteLink>
              <div className="caption">
                {en
                  ? "An example image processing pipeline"
                  : "構築した画像処理パイプラインの例"}
              </div>
            </GridColumn>
          </Grid>
        </section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"visionsketch"}
          majorPublication={"gi2014-kato-visionsketch"}
        />
      </SiteLayout>
    </>
  );
}
