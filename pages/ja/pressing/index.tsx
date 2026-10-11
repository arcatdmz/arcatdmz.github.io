import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/pressing/index.pug; edit this TSX source directly. */
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

  p = projectsTable["pressing"];
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
  function renderBody(): ReactNode {
    return (
      <>
        <section id={attribute("abstract")}>
          <h2 className="ui header">{plainText(en ? "Abstract" : "概要")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "我々は、テキストが表す精確な情報に打鍵力というファジィな情報を加えることによって新しいインタラクションを実現できると考え、統合開発環境“Pressing”を開発した。Pressingは、物理シミュレーションによる視覚的フィードバックがあり、打鍵の強さが出力に影響を与えるインタプリタを内蔵した統合開発環境である。",
              )}
            </p>
            <p>
              {richText("本研究は")}
              <a href={href("https://www.microsoft.com/applied-sciences/")}>
                {richText("Microsoft Applied Science Group")}
              </a>
              {richText("の")}
              <a href={href("https://www.youtube.com/watch?v=1zo0kJ_wi80")}>
                {richText("打鍵圧を検出できるキーボードのプロトタイプ")}
              </a>
              {richText("を用いて開発された。UIST 2009 ")}
              <a href={href("https://www.acm.org/uist/uist2009/call/contest.html")}>
                {richText("Student Innovation Contest")}
              </a>
              {richText("で")}
              <a href={href(`${rootPath}publications/uist2009-kato-pressing-flyer.pdf`)}>
                <i className="icon-file"></i>
                {richText("フライヤー")}
              </a>
              {richText("を配りながら発表したのが初出である。")}
            </p>
            <div className="ui hidden divider"></div>
            <div className="ui fluid image">
              <img src={"https://digitalmuseum.jp/en/software/pressing/images/usage.png"} />
            </div>
            <div className="caption">
              {plainText(en ? "Example code and its execution results" : "サンプルコードとその実行結果")}
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("px")}>
          <h2 className="ui header">
            {plainText(en ? "Programming Experience" : "プログラミング体験")}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "Pressingを起動すると、仮想環境“Hakoniwa”とインタプリタ“Kotosaka”の入力欄が表れる。Kotosakaにスクリプトを入力すると、各文字を打鍵した強さの情報が保持され、スクリプトの実行時にHakoniwaで打鍵力に応じた出力が得られる。スクリプトの入力と実行は対話的に行われ、コンパイルによりプログラムの状態がリセットされることもない。Pressingは、いわゆるライブプログラミング環境である。",
              )}
            </p>
            <p>
              {richText("例えば ")}
              <code>{richText("new Ball()")}</code>
              {richText(" と打ち込んでEnterキーを押すと、スクリーン上に円が現れる。このとき ")}
              <i>{richText("Ball")}</i>
              {richText(" の打鍵が強ければ大きな円が、弱ければ小さな物体が現れる。")}
            </p>
            <p>
              {richText(
                "他にもいくつか面白いプリセットクラスが用意されている。例えば、次の2文は円インスタンスを変数 ",
              )}
              <i>{richText("b")}</i>
              {richText(" に代入し、円が通った軌跡が赤いブラシで塗られる。ブラシの幅は ")}
              <i>{richText("Brush")}</i>
              {richText(" がどれだけ強く打鍵されたかによって決まる。")}
            </p>
            <pre>{richText("b = new Ball(); b.pen(new Brush(255,0,0));")}</pre>
            <p>
              {richText(
                "プログラマは、インスタンス化した円オブジェクトとコードを書くことによってインタラクションできる。",
              )}
            </p>
            <pre>{richText("World.setGravity(0, 0.98); b.setSpeed(100);")}</pre>
            <p>
              {richText(
                "しかし、単にマウスカーソルでスクリーン上のオブジェクトに触るだけでもインタラクションできる。本環境は2次元物理シミュレーションのエンジンを内蔵しているため、インスタンス化された物体との自然なインタラクションが可能である。",
              )}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("implementation")}>
          <h2 className="ui header">{plainText(en ? "Implementation" : "実装")}</h2>
          <div className="ui basic segment">
            <p>
              {richText("Hakoniwaは")}
              <a href={href("https://github.com/erincatto/box2d")}>{richText("Box2D")}</a>
              {richText(
                "ベースの物理シミュレータであり、以下の図に示すようなインタラクションを可能にしている。",
              )}
            </p>
            <p>
              {richText(
                "Kotosakaは、JavaScriptに影響を受けた簡易言語を解釈する。この言語には、クラス（メソッド、フィールド）、関数、変数といったオブジェクト指向の基本的な概念が備わっている。変数は宣言不要で動的な型付けができ、プリミティブ型（真偽値、数値と文字列）の値、クラスのインスタンスと関数を代入できる。",
              )}
            </p>
          </div>
        </section>
      </>
    );
  }
  function renderImages(): ReactNode {
    return (
      <>
        <a className="ui fluid image" href={href(`${rootPath}pressing/pressing.png`)}>
          <img src={`${rootPath}pressing/pressing.png`} />
        </a>
        <div className="caption">
          {plainText(en ? "Screenshot of the Pressing IDE" : "統合開発環境Pressingのスクリーンショット")}
        </div>
        <div className="ui hidden divider"></div>
        <a
          className="ui fluid image"
          href={href("https://www.flickr.com/photos/zhiquan/3989241000/")}
        >
          <img src={`${rootPath}pressing/3989241000_35cb13136a_o.jpg`} />
        </a>
        <div className="caption">
          {plainText(en ? "Demonstration at UIST '09" : "UIST '09でのデモの様子")}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("pressing")}
        <div className="ui hidden divider"></div>
        <div className="ui stackable grid">
          <div className="ten wide column">{renderBody()}</div>
          <div className="six wide column">{renderImages()}</div>
        </div>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("pressing")}
      </SiteLayout>
    </>
  );
}
