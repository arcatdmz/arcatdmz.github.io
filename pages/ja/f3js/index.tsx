import { Embed } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHero,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/f3js/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath } = data;
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

  p = projectsTable["f3js"];
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
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero project={"f3js"} />
          </>
        }
      >
        <div className="with-rail">
          <div className="right-rail">
            <section id={"news"}>
              <h2 className="ui header">
                <i className="announcement icon"></i>
                <div className="content">{en ? "News" : "ニュース"}</div>
              </h2>
              <div className="ui basic segment">
                <div className="ui divided small feed">
                  <div className="event">
                    <div className="content">
                      <div className="date">{"2017/6/14"}</div>
                      <div className="summary">
                        {
                          "国際会議ACM DIS 2017でf3.jsに関する登壇発表を行いました。"
                        }
                        <a href={"http://f3js.org"}>{"f3js.org"}</a>
                        {"で実際にIoTデバイス製作を試すことができます。"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui hidden divider"></div>
            </section>
          </div>
          <div className="left-content">
            <section id={"abstract"}>
              <h2 className="ui header">
                <div className="content">{en ? "Abstract" : "概要"}</div>
              </h2>
              <div className="ui basic segment">
                <p>
                  {
                    "Internet of Things (IoT)アプリケーションのソフトウェア開発者にとって、センサやアクチュエータを配置する筐体の設計はCADシステムを用いる必要があり容易でない。この研究では、アプリケーションのソフトウェアと筐体設計を一つの統合開発環境中でソースコードの記述を通して行えるコード中心の開発プロセス（code-centric development process）を提案する。また、その実例としてソフトウェアの開発用インタフェース上でハードウェア設計まで一貫して行える統合開発環境f3.jsを提案する。"
                  }
                </p>
                <p>
                  {
                    "f3.jsでは、センサやアクチュエータの制御コードと同じスコープに、レーザーカッターを用いた筐体設計のためのコードを書ける。また、レーザーカッターの切断面を組み合わせて立体形状を形成できるように、展開図の作成支援用APIを備えている。ユーザは展開図上にセンサやアクチュエータを配置するGUIプログラミングのようなコードで、新しいハードウェアインタフェースを設計できる。これらの仕組みを利用して、エンドユーザでもGUIを操作してIoTアプリケーションをパラメトリックにカスタマイズできるようになっている。"
                  }
                </p>
                <p>
                  {
                    "提案手法とそれを実現するシステムf3.jsの有効性について、インタラクションデザイナ、コンピュータ科学専攻の大学生、そしてエンドユーザを対象とした2つのユーザスタディで評価した。"
                  }
                </p>
              </div>
              <div className="ui hidden divider"></div>
            </section>
          </div>
        </div>
        <section id={"presentations"}>
          <h2 className="ui header">
            {en ? "Presentation materials" : "発表内容"}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {"DIS 2017 "}
                  {en ? "Demo Video" : "デモ動画"}
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/BwPXXjfUUVw"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=BwPXXjfUUVw"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {"DIS 2017 "}
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
        <section id={"concept"}>
          <h2 className="ui header">
            {en
              ? "Core concept: parametric design of devices"
              : "核となるアイデア: IoTデバイスのパラメトリックデザイン"}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {en ? (
                    <>{"Parametric Design for Interaction Designers"}</>
                  ) : (
                    <>
                      {"インタラクションデザイナ向けの特長"}

                      <div className="sub header">
                        {"ハードとソフトの一体開発"}
                      </div>
                    </>
                  )}
                </h3>
                <SiteLink
                  className="ui fluid image"
                  href={href(`${rootPath}f3js/f3js-programmers.png`)}
                >
                  <SiteImage src={`${rootPath}f3js/f3js-programmers.png`} />
                </SiteLink>
                <div className="caption">
                  <p>
                    {
                      "IoTデバイスはハードウェア（筐体とセンサ、アクチュエータ）とソフトウェア（センサ、アクチュエータを操作するプログラム）からなっている。IoTデバイスの開発においては、これら2つは"
                    }
                    <abbr title={"Computer-aided design"}>{"CAD"}</abbr>
                    {"システムと"}
                    <abbr title={"Integrated Development Environment"}>
                      {"IDE"}
                    </abbr>
                    {"という別々のツールで設計されることが多い。"}
                  </p>
                  <p>
                    {
                      "こうした分業は、仕様が初めから決まっているデバイスを一種類製作する目的には向いている。一方で、仕様を作りながら探索するプロトタイピング過程においては、異なる筐体形状、センサ、アクチュエータ、ソフトウェアの機能を持つデバイスを多種作って管理する必要がある。別々のツールで派生したデータを作成、管理することは容易ではない。代替デザインを探索する過程においては、別々のワークフローを何度も分けたり統合したりする手間が生じてしまう。例えば、デバイスにボタンを何個つけるべきか試作を繰り返そうと思ったら、別々のツールを何度も行ったり来たりしなければならない。"
                    }
                  </p>
                  <p>
                    {"本研究で提案している"}
                    <strong>
                      {
                        "コード中心の開発プロセス（code-centric development process）"
                      }
                    </strong>
                    {
                      "では、デバイスのハードウェアとソフトウェア両面が一つのソースコードで定義されるため、例えばボタンの数のような変数を定義することもできるし、実際に数を変えてみたかったら、変数の値を動的に変えられる"
                    }
                    <strong>
                      {"軽量なGUIウィジェット（lightweight GUI widget）"}
                    </strong>
                    {"を使うこともできる。"}
                  </p>
                  <p>
                    {"さらに、f3.jsは"}
                    <strong>{"筐体設計に使えるGUIライクなAPI"}</strong>
                    {"を提供する。例えば"}
                    <code>
                      {"var rect = f3js.drawRectangle(0, 0, 100, 30)"}
                    </code>
                    {
                      "と書けば100mm×30mmの長方形をレーザーカッターで切り出せる。"
                    }
                    <code>{"var planes = rect.extrude(40)"}</code>
                    {
                      "と書けば長方形を40mm押し出した直方体形状を作るための面を5つ生成できる。"
                    }
                    <code>{"f3js.add(new GroveButton(1))"}</code>
                    {
                      "と書けば、ボタンモジュールを配置するためのネジ穴と配線穴を開けられる。また、"
                    }
                    <strong>{"レイアウトマネージャAPI"}</strong>
                    {
                      "を使えば、IoTデバイスによくあるデザインパターンに沿ってボタンやセンサを配置できる。"
                    }
                  </p>
                </div>
                <div className="ui hidden divider"></div>
                <div className="ui stackable two columns grid">
                  <div className="column">
                    <SiteLink
                      className="ui fluid image"
                      href={href(
                        `${rootPath}f3js/extrusion-without-opposite-plane.jpg`,
                      )}
                    >
                      <SiteImage
                        src={`${rootPath}f3js/extrusion-without-opposite-plane-resized.jpg`}
                      />
                    </SiteLink>
                    <p className="caption">
                      {en
                        ? "Extruding a rectangle makes a box."
                        : "矩形を押し出すと箱型ができる。"}
                    </p>
                    <div className="ui hidden divider"></div>
                  </div>
                  <div className="column">
                    <SiteLink
                      className="ui fluid image"
                      href={href(`${rootPath}f3js/circle-layout.jpg`)}
                    >
                      <SiteImage src={`${rootPath}f3js/circle-layout-resized.jpg`} />
                    </SiteLink>

                    {en ? (
                      <>
                        <p className="caption">
                          {
                            "Circular layout is common in physical user interfaces."
                          }
                        </p>

                        <p>
                          {
                            "Other figures showing the API usage and design patterns include: "
                          }
                          <SiteLink
                            href={href(`${rootPath}f3js/partial-extrusion.jpg`)}
                          >
                            {"partial extrusion"}
                          </SiteLink>
                          {" and  "}
                          <SiteLink
                            href={href(`${rootPath}f3js/line-layout.jpg`)}
                          >
                            {"line layout"}
                          </SiteLink>
                          {"."}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="caption">
                          {
                            "モジュールが円形に並ぶデザインは多くのIoTデバイスで見られる。他に"
                          }
                          <SiteLink
                            href={href(`${rootPath}f3js/partial-extrusion.jpg`)}
                          >
                            {"押し出し操作の別例"}
                          </SiteLink>
                          {"と"}
                          <SiteLink
                            href={href(`${rootPath}f3js/line-layout.jpg`)}
                          >
                            {"モジュールが線上に並ぶデザイン"}
                          </SiteLink>
                          {
                            "の図がある。いずれもf3.jsのAPIで容易に設計できる形状である。"
                          }
                        </p>
                      </>
                    )}

                    <div className="ui hidden divider"></div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {en ? (
                    <>{"Parametric Design for End-uesrs"}</>
                  ) : (
                    <>
                      {"エンドユーザ向けの特長"}

                      <div className="sub header">
                        {"プラモデルのようなデバイス組み立て"}
                      </div>
                    </>
                  )}
                </h3>
                <SiteLink
                  className="ui fluid image"
                  href={href(`${rootPath}f3js/f3js-end-users.png`)}
                >
                  <SiteImage src={`${rootPath}f3js/f3js-end-users.png`} />
                </SiteLink>
                <div className="caption">
                  <p>
                    {
                      "f3.jsを利用すると、プログラミングなどの事前知識がなくても軽量なGUIウィジェット（lightweight GUI widget）を操作することで自分好みの仕様を持ったIoTデバイスを製作することができる。ウィジェットで選んだパラメタの値に応じて、システムによってデバイスの組み立て手順が自動的に生成されるため、ユーザスタディのコメントから引用すれば"
                    }
                    <strong>
                      {
                        "「プラモデルを作るように簡単にIoTデバイスを組み立てることができる。」"
                      }
                    </strong>
                  </p>
                  <div className="ui right floated small image">
                    <SiteLink
                      href={href(
                        `${rootPath}f3js/design-alternatives-shapes.jpg`,
                      )}
                    >
                      <SiteImage
                        src={`${rootPath}f3js/design-alternatives-shapes-resized.jpg`}
                      />
                    </SiteLink>
                    <p className="caption">
                      {
                        "f3.jsで自分好みにカスタマイズしたIoTデバイスを作るには、プログラミングなどの前提知識は要らない。スライダーを操作するだけでよい。"
                      }
                    </p>
                  </div>
                  <p>
                    {
                      "ユーザはf3.js上でまず作ってみたいデバイスのプロジェクトを選ぶ。プロジェクトの詳細ページでは、デバイスの写真、デモ動画や機能紹介といった情報を見ることができる。さらに、軽量なGUIウィジェットを操作することで、デバイスの見た目がどう変化するかをインタラクティブに確認することができる。システムは、ウィジェットの操作結果に応じて、デバイスのデザイナが記述したソースコード中のパラメタ値を変更する。これにより、ユーザはソースコードを直接読んで理解しなくても、異なる仕様のデバイスを入手できる。"
                    }
                  </p>
                  <p>
                    {
                      "プロジェクトの詳細ページを下にスクロールすると、自動的に生成された組み立て手順が表示される。まず、デバイスの組み立てに必要なセンサとアクチュエータの種類が一覧となっており、各センサ、アクチュエータ名をクリックすれば、入手先の情報などさらに詳細を追うこともできる。次に、PDFファイルをダウンロードできるリンクがある。このデータをレーザーカッターに送信すると、デバイスの組み立てに必要な筐体面が切り出される。面同士の接合部はそれぞれ固有の辺形状を持ち、誤った辺と組み合わせるミスを防いでくれる。また、必要に応じて、接する辺同士に固有のアルファベットを印刷して、さらに組み立てを簡単にすることもできる。"
                    }
                  </p>
                  <p>
                    {
                      "こうしてデバイスのハードウェアを組み立てることができたら、あとはファームウェアを書き込めば、自分好みにカスタマイズしたIoTデバイスが完成する。そのために、プログラムをTARまたはZIP形式でダウンロードすることができるリンクが用意されている。このプログラムをダウンロードして、デバイスに転送し、必要な前処理を行うという一連の作業を自動化するためのコマンドラインツール"
                    }
                    <code>{"f3-projects"}</code>
                    {"も用意されている。"}
                  </p>
                </div>
                <div className="ui hidden divider"></div>
              </div>
            </div>
          </div>
        </section>
        <section id={"examples"}>
          <h2 className="ui header">
            {en ? "Example applications" : "アプリケーション例"}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {en ? "Videos of 17 applications" : "17個の作例動画"}
                </h3>
                <EmbedYoutube
                  src={
                    "https://www.youtube.com/embed/videoseries?list=PLb6OjFoBksmvYwbJqt8Z30LS72LkPrPJb"
                  }
                />
                <div className="caption">
                  <p>
                    {
                      "作例のほとんどは2つのユーザスタディで収集されたものである。ユーザスタディはf3.jsの研究開発中に期間を分けて実施された。"
                    }
                  </p>
                  <p>
                    {
                      "最初のスタディではf3.jsで製作できるデバイスの種類と限界を見極めるために、デバイスを自由に製作してもらうかたちで行われた。次のスタディでは、既存のデバイスを改善したり、デバイスの代替デザインを探索したりするタスクをインタラクションデザイナとエンドユーザに課した。これにより、f3.jsがパラメトリックデザインに有用であることが示された。"
                    }
                  </p>
                </div>
                <div className="ui hidden divider"></div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {en ? "Explanations on the first 5 apps" : "冒頭5例の紹介"}
                </h3>
                <div className="ui basic segment">
                  <ol type={"a"}>
                    <li>
                      <strong>{"QuadBuzzer"}</strong>
                      {
                        "はブザーの数を1-4個から自由に選べる楽器プロジェクトだ。レイアウトマネージャを使ってブザーを円形に並べてある。"
                      }
                    </li>
                    <li>
                      <strong>{"Music Kiosk"}</strong>
                      {
                        "はコンピュータで鳴っている音楽に同期して線上に並んだLEDが光り、ブザーがメロディを奏でるプロジェクトである。"
                      }
                    </li>
                    <li>
                      <strong>{"Card Matching Game"}</strong>
                      {
                        "はプレイヤー数を1-2名から選べる神経衰弱ゲームである。選んだ結果に応じてゲーム内容と出力されるコントローラの数が変わる。"
                      }
                    </li>
                    <li>
                      <strong>{"Rhythm Game on a Drum"}</strong>
                      {
                        "は音センサで太鼓を叩くイベントを検出することでリズムよく太鼓を叩くゲームを実現している。"
                      }
                    </li>
                    <li>
                      <strong>{"Translator"}</strong>
                      {
                        "は腕に装着して使う翻訳機である。Google翻訳APIを利用してカメラで撮影した文字列を翻訳し、結果をLCDディスプレイに表示する。"
                      }
                    </li>
                  </ol>
                  <p>
                    {"この他にも力作揃いなのでぜひ全部鑑賞してみてほしい。"}
                  </p>
                </div>
                <div className="ui hidden divider"></div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"f3js"}
          majorPublication={"dis2017-kato-f3js"}
        />
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/ja/f3js/", {"projects": ["f3js"], "publications": ["dis2017-kato-f3js"], "publicationProjects": ["f3js"]}) }, "/ja/f3js/") };
}
