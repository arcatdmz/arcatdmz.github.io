import {
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/pressing/index.pug; edit this TSX source directly. */
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
  function renderBody(): ReactNode {
    return (
      <>
        <section id={"abstract"}>
          <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
          <div className="ui basic segment">
            <p>
              {
                "我々は、テキストが表す精確な情報に打鍵力というファジィな情報を加えることによって新しいインタラクションを実現できると考え、統合開発環境“Pressing”を開発した。Pressingは、物理シミュレーションによる視覚的フィードバックがあり、打鍵の強さが出力に影響を与えるインタプリタを内蔵した統合開発環境である。"
              }
            </p>
            <p>
              {"本研究は"}
              <a href={"https://www.microsoft.com/applied-sciences/"}>
                {"Microsoft Applied Science Group"}
              </a>
              {"の"}
              <a href={"https://www.youtube.com/watch?v=1zo0kJ_wi80"}>
                {"打鍵圧を検出できるキーボードのプロトタイプ"}
              </a>
              {"を用いて開発された。UIST 2009 "}
              <a href={"https://www.acm.org/uist/uist2009/call/contest.html"}>
                {"Student Innovation Contest"}
              </a>
              {"で"}
              <SiteLink
                href={href(
                  `${rootPath}publications/uist2009-kato-pressing-flyer.pdf`,
                )}
              >
                <i className="icon-file"></i>
                {"フライヤー"}
              </SiteLink>
              {"を配りながら発表したのが初出である。"}
            </p>
            <div className="ui hidden divider"></div>
            <div className="ui fluid image">
              <img
                src={
                  "https://digitalmuseum.jp/en/software/pressing/images/usage.png"
                }
              />
            </div>
            <div className="caption">
              {en
                ? "Example code and its execution results"
                : "サンプルコードとその実行結果"}
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"px"}>
          <h2 className="ui header">
            {en ? "Programming Experience" : "プログラミング体験"}
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "Pressingを起動すると、仮想環境“Hakoniwa”とインタプリタ“Kotosaka”の入力欄が表れる。Kotosakaにスクリプトを入力すると、各文字を打鍵した強さの情報が保持され、スクリプトの実行時にHakoniwaで打鍵力に応じた出力が得られる。スクリプトの入力と実行は対話的に行われ、コンパイルによりプログラムの状態がリセットされることもない。Pressingは、いわゆるライブプログラミング環境である。"
              }
            </p>
            <p>
              {"例えば "}
              <code>{"new Ball()"}</code>
              {
                " と打ち込んでEnterキーを押すと、スクリーン上に円が現れる。このとき "
              }
              <i>{"Ball"}</i>
              {" の打鍵が強ければ大きな円が、弱ければ小さな物体が現れる。"}
            </p>
            <p>
              {
                "他にもいくつか面白いプリセットクラスが用意されている。例えば、次の2文は円インスタンスを変数 "
              }
              <i>{"b"}</i>
              {" に代入し、円が通った軌跡が赤いブラシで塗られる。ブラシの幅は "}
              <i>{"Brush"}</i>
              {" がどれだけ強く打鍵されたかによって決まる。"}
            </p>
            <pre>{"b = new Ball(); b.pen(new Brush(255,0,0));"}</pre>
            <p>
              {
                "プログラマは、インスタンス化した円オブジェクトとコードを書くことによってインタラクションできる。"
              }
            </p>
            <pre>{"World.setGravity(0, 0.98); b.setSpeed(100);"}</pre>
            <p>
              {
                "しかし、単にマウスカーソルでスクリーン上のオブジェクトに触るだけでもインタラクションできる。本環境は2次元物理シミュレーションのエンジンを内蔵しているため、インスタンス化された物体との自然なインタラクションが可能である。"
              }
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"implementation"}>
          <h2 className="ui header">{en ? "Implementation" : "実装"}</h2>
          <div className="ui basic segment">
            <p>
              {"Hakoniwaは"}
              <a href={"https://github.com/erincatto/box2d"}>{"Box2D"}</a>
              {
                "ベースの物理シミュレータであり、以下の図に示すようなインタラクションを可能にしている。"
              }
            </p>
            <p>
              {
                "Kotosakaは、JavaScriptに影響を受けた簡易言語を解釈する。この言語には、クラス（メソッド、フィールド）、関数、変数といったオブジェクト指向の基本的な概念が備わっている。変数は宣言不要で動的な型付けができ、プリミティブ型（真偽値、数値と文字列）の値、クラスのインスタンスと関数を代入できる。"
              }
            </p>
          </div>
        </section>
      </>
    );
  }
  function renderImages(): ReactNode {
    return (
      <>
        <SiteLink
          className="ui fluid image"
          href={href(`${rootPath}pressing/pressing.png`)}
        >
          <img src={`${rootPath}pressing/pressing.png`} />
        </SiteLink>
        <div className="caption">
          {en
            ? "Screenshot of the Pressing IDE"
            : "統合開発環境Pressingのスクリーンショット"}
        </div>
        <div className="ui hidden divider"></div>
        <a
          className="ui fluid image"
          href={"https://www.flickr.com/photos/zhiquan/3989241000/"}
        >
          <img src={`${rootPath}pressing/3989241000_35cb13136a_o.jpg`} />
        </a>
        <div className="caption">
          {en ? "Demonstration at UIST '09" : "UIST '09でのデモの様子"}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"pressing"} />
        <div className="ui hidden divider"></div>
        <div className="ui stackable grid">
          <div className="ten wide column">{renderBody()}</div>
          <div className="six wide column">{renderImages()}</div>
        </div>
        <div className="ui hidden divider"></div>
        <ProjectPublications project={"pressing"} />
      </SiteLayout>
    </>
  );
}
