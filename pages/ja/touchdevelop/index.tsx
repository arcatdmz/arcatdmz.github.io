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

/** React page migrated from ja/touchdevelop/index.pug; edit this TSX source directly. */
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
  const content = createContentComponents(context);

  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("touchdevelop")}
        <div className="ui message">
          <p>
            <del>
              {richText(
                "この論文で提案されているLive Programmingの技術は、すでに現行のTouchDevelopに実装されています。",
              )}
              <a href={href("#demo")}>{richText("技術デモ")}</a>
              {richText("をお試しください！")}
            </del>
          </p>
          <p>
            {richText("残念ながら")}
            <a href={href("https://makecode.com/touchdevelop")}>
              {richText(
                "MicrosoftはTouchDevelopプラットフォームを2019年6月で終了",
              )}
            </a>
            {richText("しました。採用されていた技術は")}
            <a href={href("https://makecode.com/about")}>
              {richText("Microsoft MakeCode")}
            </a>
            {richText("などに受け継がれているほか、このプログラミング体験は")}
            <a href={href("/ja/textalive")}>{richText("TextAlive")}</a>
            {richText("などの設計に大きな影響を与えています。")}
          </p>
        </div>
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "Live Programmingは、プログラムを走らせたままコードを編集し、その変更を直ちに反映させて変化を観察することを可能にする技術である。このように、伝統的な編集、コンパイル、実行というサイクルを圧縮することで、プログラムのコードと振る舞いの間を行ったり来たりする認知的なギャップを小さくできる。そうすることで、プログラミング初学者がよりよくプログラミングを学べるようになり、経験者ならば生産性を向上できることが期待される。しかしながら、Model-Viewなどの切り分けがはっきりせず抽象化の足りない命令型言語でLive Programmingを実現しようとすると、応答性が悪くなったりフィードバックが分かりにくくなったりして困難が伴う。",
              )}
            </p>
            <p>
              {richText(
                "本論文では、ユーザインタフェースを伴う一般的なプログラムの実装において、次のようにLive Programmingを実現する。すなわち、ユーザインタフェースのレンダリングを行う部分とそれ以外を綺麗に分けることによって、コードに変更があるたびに、プログラム自体を再起動せずともレンダリングだけをやりなおすことができるようにする。さらに、型(と副作用)システムを用いて、この切り分けを形式化し、コード変更時の処理手順を与える評価モデルを与える。このように、Live Programmingに対してより形式的な基盤を与えることで、Live Programmingシステムに関する本質的で技術的な議論を可能にしたい。",
              )}
            </p>
            <p>
              {richText("本研究は、Microsoft Research Redmond")}
              <a
                href={href(
                  "https://www.microsoft.com/en-us/research/group/research-software-engineering-rise/",
                )}
                title={"Research in Software Engineering Group"}
              >
                {richText("RiSE Group")}
              </a>
              {richText("の")}
              <a
                href={href(
                  "https://www.microsoft.com/en-us/research/project/touchdevelop/",
                )}
              >
                {richText("TouchDevelopチーム")}
              </a>
              {richText("における3か月のインターンの成果物である。")}
              <a
                href={href(
                  "https://www.microsoft.com/en-us/research/people/sburckha/",
                )}
              >
                {richText("Sebastian Burckhardt")}
              </a>
              {richText("と")}
              <a href={href("https://moskal.me/")}>
                {richText("Michał Moskal")}
              </a>
              {richText("がメンターであった。Microsoft Research Asiaの")}
              <a
                href={href(
                  "https://scholar.google.com/citations?user=EFCqkUsAAAAJ&hl=en",
                )}
              >
                {richText("Sean McDirmid")}
              </a>
              {richText(
                "とも連絡を取り、MSRの2つのキャンパス間の協力体制を築いて研究を進めた。",
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
                  {richText("PLDI 2013 ")}
                  {plainText(en ? "Demo Video" : "デモ動画")}
                </h3>
                {content.renderEmbedYoutube(
                  "//www.youtube.com/embed/GaVbYx-NN0o",
                )}
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={href("//www.youtube.com/watch?v=GaVbYx-NN0o")}>
                        <i className="youtube icon"></i>
                        {richText("YouTube")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {richText(
                    en
                      ? 'Experimental <abbr title="User Interface">UI</abbr>'
                      : "β版実装",
                  )}
                </h3>
                {content.renderEmbedYoutube(
                  "//www.youtube.com/embed/D1UB73y4GGo",
                )}
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={href("//www.youtube.com/watch?v=D1UB73y4GGo")}>
                        <i className="youtube icon"></i>
                        {richText("YouTube")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <h2 className="ui header" id={attribute("demo")}>
          <del>{richText("技術デモ")}</del>
        </h2>
        <div className="ui basic segment">
          <div className="ui warning message">
            {richText(
              "TouchDevelopのサービス終了に伴いこのセクションのデモも動作しません。ご了承ください。",
            )}
          </div>
          <p>
            {richText(
              "本研究で扱っている技術によるLive Programmingを体験してみたい方は",
            )}
            <a href={href("https://www.touchdevelop.com/rthv")}>
              {richText(
                "TouchDevelop Web Appの当該機能を利用しているスクリプト",
              )}
            </a>
            {richText("を開いてみてください。")}
            <a href={href("https://www.touchdevelop.com/docs/pages-and-boxes")}>
              {richText("公式ドキュメント")}
            </a>
            {richText("もあります。")}
          </p>
          <p>
            {richText("なお、本機能は")}
            <code>{richText("page")}</code>
            {richText(
              "を使ったときだけ有効化されます。TouchDevelopには何でもpostできる",
            )}
            <code>{richText("wall")}</code>
            {richText("というレガシーなコンセプトがありますが、")}
            <code>{richText("page")}</code>
            {richText("はその後継として、互換性を捨てて定義されています。")}
          </p>
          <div className="ui segment">
            <ol>
              <li>
                <a href={href("https://touchdevelop.com")}>
                  {richText("TouchDevelop")}
                </a>
                {richText("にログインする。")}
              </li>
              <li>
                <a href={href("https://www.touchdevelop.com/rthv")}>
                  {richText("リンク先")}
                </a>
                {richText("のヘッダにある「")}
                <strong>{richText("edit in TouchDevelop")}</strong>
                {richText("」からスクリプトを開く。")}
              </li>
              <li>
                {richText("「")}
                <strong>{richText("run")}</strong>
                {richText("」ボタンでスクリプトを実行する。")}
              </li>
              <li>
                {richText("適当なところで画面右上の「")}
                <strong>{richText("一時停止")}</strong>
                {richText(
                  "」ボタンをクリック(またはタップ)すると、イベントハンドラが全て無効化されて「",
                )}
                <strong>{richText("編集モード")}</strong>
                {richText("」になる。")}
              </li>
              <li>
                {richText("画面上で「")}
                <strong>{richText("box")}</strong>
                {richText(
                  "」と呼ばれる任意のGUIコンポーネントをクリックすると選択でき、隣に「",
                )}
                <strong>{richText("edit")}</strong>
                {richText("」ボタンが現れる。")}
              </li>
              <li>
                {richText("「")}
                <strong>{richText("edit")}</strong>
                {richText(
                  "」をクリックすると、コードエディタの当該boxを表示する処理に飛ぶ。",
                )}
              </li>
            </ol>
            <div className="ui divider"></div>
            <ul>
              <li>
                {richText("コードエディタの左隣には画面の縮小表示「")}
                <strong>{richText("Live view")}</strong>
                {richText(
                  "」が表示される。(WindowBuilderやXAMLエディタなどでよくある",
                )}
                <strong>{richText("pre")}</strong>
                {richText(
                  "viewでないことに注意)コードを編集するとLive viewに即座に反映される。",
                )}
              </li>
              <li>
                {richText(
                  "クリックで選択したものの他に現在アクティブな行から生成されるboxがあれば(例えばforループや関数内のbox)、赤い枠線でハイライトされる。",
                )}
              </li>
              <li>
                {richText(
                  "ソフトウェアキーボードにはboxの書式プロパティが並ぶ。どれかクリックすると、既にプロパティを指定している行があればそこに飛ぶ。なければ新しいプロパティ指定文が適当な位置に挿入される。",
                )}
              </li>
            </ul>
            <div className="ui divider"></div>
            <ol start={Number("7")}>
              <li>
                {richText("コード編集に満足したら「")}
                <strong>{richText("再開")}</strong>
                {richText("」ボタンをクリックするとプログラムが再開される。")}
              </li>
            </ol>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications(
          "touchdevelop",
          "pldi2013-kato-alive",
        )}
      </SiteLayout>
    </>
  );
}
