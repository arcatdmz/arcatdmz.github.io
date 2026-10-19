import { Divider, Grid, Header, Icon, Image, Segment } from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { SiteImage } from "@/site/components/SiteImage";
import {
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { type ReactNode } from "react";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: abstract, px, implementation. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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

  p = projectsTable["pressing"];
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
  function renderBody(): ReactNode {
    return (
      <>
        <section id="abstract">
          <Header as="h2">{en ? "Abstract" : "概要"}</Header>
          <Segment basic>
            <p>
              <LocalizedContent ja="我々は、テキストが表す精確な情報に打鍵力というファジィな情報を加えることによって新しいインタラクションを実現できると考え、統合開発環境“Pressing”を開発した。Pressingは、物理シミュレーションによる視覚的フィードバックがあり、打鍵の強さが出力に影響を与えるインタプリタを内蔵した統合開発環境である。">
                Pressing is a pressure-sensitive programming environment with
                visual feedbacks of the built-in 2D physical simulator. It runs
                on a PC with{" "}
                <a href="https://www.youtube.com/watch?v=1zo0kJ_wi80">
                  a practical pressure-sensitive keyboard
                </a>{" "}
                developed by{" "}
                <a href="https://www.microsoft.com/applied-sciences/">
                  Microsoft Applied Science Group
                </a>
                .
              </LocalizedContent>
            </p>
            <p>
              <LocalizedContent
                ja={
                  <>
                    本研究は
                    <a href="https://www.microsoft.com/applied-sciences/">
                      Microsoft Applied Science Group
                    </a>
                    の
                    <a href="https://www.youtube.com/watch?v=1zo0kJ_wi80">
                      打鍵圧を検出できるキーボードのプロトタイプ
                    </a>
                    を用いて開発された。UIST 2009{" "}
                  </>
                }
              >
                This work was presented at UIST 2009{" "}
              </LocalizedContent>
              <a href="https://www.acm.org/uist/uist2009/call/contest.html">
                Student Innovation Contest
              </a>
              {en ? " with " : "で"}
              <SiteLink
                href={href(
                  `${rootPath}publications/uist2009-kato-pressing-flyer.pdf`,
                )}
              >
                <Icon name="file"></Icon>
                {en ? "a flyer" : "フライヤー"}
              </SiteLink>
              {en ? "." : "を配りながら発表したのが初出である。"}
            </p>
            <Divider hidden />
            <Image fluid as="div">
              <SiteImage src="https://digitalmuseum.jp/en/software/pressing/images/usage.png" />
            </Image>
            <div className="caption">
              {en
                ? "Example code and its execution results"
                : "サンプルコードとその実行結果"}
            </div>
          </Segment>
        </section>
        <Divider hidden />
        <section id="px">
          <Header as="h2">
            {en ? "Programming Experience" : "プログラミング体験"}
          </Header>
          <Segment basic>
            <p>
              {en
                ? "When the programmer runs the software, a vacant screen appears with a text box. He can start typing immediately and there is no program compilation; The programming experience is completely live and direct."
                : "Pressingを起動すると、仮想環境“Hakoniwa”とインタプリタ“Kotosaka”の入力欄が表れる。Kotosakaにスクリプトを入力すると、各文字を打鍵した強さの情報が保持され、スクリプトの実行時にHakoniwaで打鍵力に応じた出力が得られる。スクリプトの入力と実行は対話的に行われ、コンパイルによりプログラムの状態がリセットされることもない。Pressingは、いわゆるライブプログラミング環境である。"}
            </p>
            <p>
              {en ? "For example, when he types " : "例えば "}
              <code>new Ball()</code>
              {en
                ? " and hits the enter key, a ball apears on the screen. The size of the ball is defined according to how strong the class name "
                : " と打ち込んでEnterキーを押すと、スクリーン上に円が現れる。このとき "}
              <Icon>Ball</Icon>
              {en
                ? " is typed."
                : " の打鍵が強ければ大きな円が、弱ければ小さな物体が現れる。"}
            </p>
            <p>
              {en
                ? "There are several interesting predefined classes. For instance, these two sentences will bind the ball instance to a variable "
                : "他にもいくつか面白いプリセットクラスが用意されている。例えば、次の2文は円インスタンスを変数 "}
              <Icon>b</Icon>
              {en
                ? " and its track will be painted with a red brush. The brush width is defined by how strong "
                : " に代入し、円が通った軌跡が赤いブラシで塗られる。ブラシの幅は "}
              <Icon>Brush</Icon>
              {en
                ? " is typed."
                : " がどれだけ強く打鍵されたかによって決まる。"}
            </p>
            <pre>{"b = new Ball(); b.pen(new Brush(255,0,0));"}</pre>
            <p>
              {en
                ? "The programmer can interact with the instantiated ball objects not only by writing code,"
                : "プログラマは、インスタンス化した円オブジェクトとコードを書くことによってインタラクションできる。"}
            </p>
            <pre>{"World.setGravity(0, 0.98); b.setSpeed(100);"}</pre>
            <p>
              {en
                ? "but also by directly touching them using a mouse cursor. This environment is equipped with a two-dimensional physics simulator and thus provides natural interaction experience."
                : "しかし、単にマウスカーソルでスクリーン上のオブジェクトに触るだけでもインタラクションできる。本環境は2次元物理シミュレーションのエンジンを内蔵しているため、インスタンス化された物体との自然なインタラクションが可能である。"}
            </p>
          </Segment>
        </section>
        <Divider hidden />
        <section id="implementation">
          <Header as="h2">{en ? "Implementation" : "実装"}</Header>
          <Segment basic>
            <LocalizedContent
              ja={
                <>
                  <p>
                    Hakoniwaは
                    <a href="https://github.com/erincatto/box2d">Box2D</a>
                    ベースの物理シミュレータであり、以下の図に示すようなインタラクションを可能にしている。
                  </p>
                  <p>
                    Kotosakaは、JavaScriptに影響を受けた簡易言語を解釈する。この言語には、クラス（メソッド、フィールド）、関数、変数といったオブジェクト指向の基本的な概念が備わっている。変数は宣言不要で動的な型付けができ、プリミティブ型（真偽値、数値と文字列）の値、クラスのインスタンスと関数を代入できる。
                  </p>
                </>
              }
            >
              <p>
                This integrated development environment (IDE) has its original
                interpreter named <Icon>Kotosaka</Icon> which interprets a
                JavaScript-like language. The language shares basic ideas of
                object-oriented programming such as classes (methods and
                fields), functions and variables. Variables can be used without
                declaration and are dynamically typed, capable of storing
                primitive values (boolean, integer and string,) class instances,
                and function objects.
              </p>
              <p>
                The IDE contains a two-dimensional virtual world equipped with a{" "}
                <a href="https://github.com/erincatto/box2d">Box2D</a>
                -based physics simulator and provides interesting APIs to
                interact with the virtual world. Examples are shown below in the
                figure.
              </p>
            </LocalizedContent>
          </Segment>
        </section>
      </>
    );
  }
  function renderImages(): ReactNode {
    return (
      <>
        <LinkedImage fluid href={href(`${rootPath}pressing/pressing.png`)}>
          <SiteImage src={`${rootPath}pressing/pressing.png`} />
        </LinkedImage>
        <div className="caption">
          {en
            ? "Screenshot of the Pressing IDE"
            : "統合開発環境Pressingのスクリーンショット"}
        </div>
        <Divider hidden />
        <LinkedImage
          fluid
          href="https://www.flickr.com/photos/zhiquan/3989241000/"
        >
          <SiteImage src={`${rootPath}pressing/3989241000_35cb13136a_o.jpg`} />
        </LinkedImage>
        <div className="caption">
          {en ? "Demonstration at UIST '09" : "UIST '09でのデモの様子"}
        </div>
        <Divider hidden />
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project="pressing" />
        <Divider hidden />
        <Grid stackable>
          <Grid.Column width={10}>{renderBody()}</Grid.Column>
          <Grid.Column width={6}>{renderImages()}</Grid.Column>
        </Grid>
        <Divider hidden />
        <ProjectPublications project="pressing" />
      </SiteLayout>
    </>
  );
}
