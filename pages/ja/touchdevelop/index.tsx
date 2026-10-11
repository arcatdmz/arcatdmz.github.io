import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { HtmlContent } from "@/site/components/RichText";

import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/touchdevelop/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, moment, rootPath } = data;
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

  p = projectsTable["touchdevelop"];
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

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"touchdevelop"} />
        <div className="ui message">
          <p>
            <del>
              {
                "この論文で提案されているLive Programmingの技術は、すでに現行のTouchDevelopに実装されています。"
              }
              <a href={"#demo"}>{"技術デモ"}</a>
              {"をお試しください！"}
            </del>
          </p>
          <p>
            {"残念ながら"}
            <a href={"https://makecode.com/touchdevelop"}>
              {"MicrosoftはTouchDevelopプラットフォームを2019年6月で終了"}
            </a>
            {"しました。採用されていた技術は"}
            <a href={"https://makecode.com/about"}>{"Microsoft MakeCode"}</a>
            {"などに受け継がれているほか、このプログラミング体験は"}
            <SiteLink href={"/ja/textalive"}>{"TextAlive"}</SiteLink>
            {"などの設計に大きな影響を与えています。"}
          </p>
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "Live Programmingは、プログラムを走らせたままコードを編集し、その変更を直ちに反映させて変化を観察することを可能にする技術である。このように、伝統的な編集、コンパイル、実行というサイクルを圧縮することで、プログラムのコードと振る舞いの間を行ったり来たりする認知的なギャップを小さくできる。そうすることで、プログラミング初学者がよりよくプログラミングを学べるようになり、経験者ならば生産性を向上できることが期待される。しかしながら、Model-Viewなどの切り分けがはっきりせず抽象化の足りない命令型言語でLive Programmingを実現しようとすると、応答性が悪くなったりフィードバックが分かりにくくなったりして困難が伴う。"
              }
            </p>
            <p>
              {
                "本論文では、ユーザインタフェースを伴う一般的なプログラムの実装において、次のようにLive Programmingを実現する。すなわち、ユーザインタフェースのレンダリングを行う部分とそれ以外を綺麗に分けることによって、コードに変更があるたびに、プログラム自体を再起動せずともレンダリングだけをやりなおすことができるようにする。さらに、型(と副作用)システムを用いて、この切り分けを形式化し、コード変更時の処理手順を与える評価モデルを与える。このように、Live Programmingに対してより形式的な基盤を与えることで、Live Programmingシステムに関する本質的で技術的な議論を可能にしたい。"
              }
            </p>
            <p>
              {"本研究は、Microsoft Research Redmond"}
              <a
                href={
                  "https://www.microsoft.com/en-us/research/group/research-software-engineering-rise/"
                }
                title={"Research in Software Engineering Group"}
              >
                {"RiSE Group"}
              </a>
              {"の"}
              <a
                href={
                  "https://www.microsoft.com/en-us/research/project/touchdevelop/"
                }
              >
                {"TouchDevelopチーム"}
              </a>
              {"における3か月のインターンの成果物である。"}
              <a
                href={
                  "https://www.microsoft.com/en-us/research/people/sburckha/"
                }
              >
                {"Sebastian Burckhardt"}
              </a>
              {"と"}
              <a href={"https://moskal.me/"}>{"Michał Moskal"}</a>
              {"がメンターであった。Microsoft Research Asiaの"}
              <a
                href={
                  "https://scholar.google.com/citations?user=EFCqkUsAAAAJ&hl=en"
                }
              >
                {"Sean McDirmid"}
              </a>
              {
                "とも連絡を取り、MSRの2つのキャンパス間の協力体制を築いて研究を進めた。"
              }
            </p>
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
                <h3 className="ui header">
                  {"PLDI 2013 "}
                  {en ? "Demo Video" : "デモ動画"}
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/GaVbYx-NN0o"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=GaVbYx-NN0o"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  <HtmlContent
                    html={
                      en
                        ? 'Experimental <abbr title="User Interface">UI</abbr>'
                        : "β版実装"
                    }
                  />
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/D1UB73y4GGo"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=D1UB73y4GGo"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <h2 className="ui header" id={"demo"}>
          <del>{"技術デモ"}</del>
        </h2>
        <div className="ui basic segment">
          <div className="ui warning message">
            {
              "TouchDevelopのサービス終了に伴いこのセクションのデモも動作しません。ご了承ください。"
            }
          </div>
          <p>
            {"本研究で扱っている技術によるLive Programmingを体験してみたい方は"}
            <a href={"https://www.touchdevelop.com/rthv"}>
              {"TouchDevelop Web Appの当該機能を利用しているスクリプト"}
            </a>
            {"を開いてみてください。"}
            <a href={"https://www.touchdevelop.com/docs/pages-and-boxes"}>
              {"公式ドキュメント"}
            </a>
            {"もあります。"}
          </p>
          <p>
            {"なお、本機能は"}
            <code>{"page"}</code>
            {"を使ったときだけ有効化されます。TouchDevelopには何でもpostできる"}
            <code>{"wall"}</code>
            {"というレガシーなコンセプトがありますが、"}
            <code>{"page"}</code>
            {"はその後継として、互換性を捨てて定義されています。"}
          </p>
          <div className="ui segment">
            <ol>
              <li>
                <a href={"https://touchdevelop.com"}>{"TouchDevelop"}</a>
                {"にログインする。"}
              </li>
              <li>
                <a href={"https://www.touchdevelop.com/rthv"}>{"リンク先"}</a>
                {"のヘッダにある「"}
                <strong>{"edit in TouchDevelop"}</strong>
                {"」からスクリプトを開く。"}
              </li>
              <li>
                {"「"}
                <strong>{"run"}</strong>
                {"」ボタンでスクリプトを実行する。"}
              </li>
              <li>
                {"適当なところで画面右上の「"}
                <strong>{"一時停止"}</strong>
                {
                  "」ボタンをクリック(またはタップ)すると、イベントハンドラが全て無効化されて「"
                }
                <strong>{"編集モード"}</strong>
                {"」になる。"}
              </li>
              <li>
                {"画面上で「"}
                <strong>{"box"}</strong>
                {
                  "」と呼ばれる任意のGUIコンポーネントをクリックすると選択でき、隣に「"
                }
                <strong>{"edit"}</strong>
                {"」ボタンが現れる。"}
              </li>
              <li>
                {"「"}
                <strong>{"edit"}</strong>
                {
                  "」をクリックすると、コードエディタの当該boxを表示する処理に飛ぶ。"
                }
              </li>
            </ol>
            <div className="ui divider"></div>
            <ul>
              <li>
                {"コードエディタの左隣には画面の縮小表示「"}
                <strong>{"Live view"}</strong>
                {"」が表示される。(WindowBuilderやXAMLエディタなどでよくある"}
                <strong>{"pre"}</strong>
                {
                  "viewでないことに注意)コードを編集するとLive viewに即座に反映される。"
                }
              </li>
              <li>
                {
                  "クリックで選択したものの他に現在アクティブな行から生成されるboxがあれば(例えばforループや関数内のbox)、赤い枠線でハイライトされる。"
                }
              </li>
              <li>
                {
                  "ソフトウェアキーボードにはboxの書式プロパティが並ぶ。どれかクリックすると、既にプロパティを指定している行があればそこに飛ぶ。なければ新しいプロパティ指定文が適当な位置に挿入される。"
                }
              </li>
            </ul>
            <div className="ui divider"></div>
            <ol start={Number("7")}>
              <li>
                {"コード編集に満足したら「"}
                <strong>{"再開"}</strong>
                {"」ボタンをクリックするとプログラムが再開される。"}
              </li>
            </ol>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"touchdevelop"}
          majorPublication={"pldi2013-kato-alive"}
        />
      </SiteLayout>
    </>
  );
}
