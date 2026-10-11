import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/website/index.pug; edit this TSX source directly. */
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

  p = projectsTable["website"];
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
  function renderDesign(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Design" : "デザイン")}</h2>
        <p>
          {richText(
            "このWebサイトは、ユーザビリティ、メンテナンス性、そして速度を念頭に設計されています。",
          )}
        </p>
        <div className="ui hidden divider"></div>
        <div className="ui stackable three columns grid">
          <div className="column">
            <h3 className="ui header">
              <i className="user icon"></i>
              {richText("ユーザビリティ")}
            </h3>
            <div className="ui basic segment">
              <p>
                {richText("このWebサイトは")}
                <a href={href("https://semantic-ui.com")}>{richText("Semantic UI")}</a>
                {richText(
                  " CSSフレームワークを利用して作られており、さまざまな閲覧環境を想定したレスポンシブデザインとなっています。",
                )}
              </p>
              <p>
                {richText(
                  "また、色はモノトーンを基調としてアクセントカラーにアドニスブルーを採用し、肝心の内容が引き立つよう控え目に配色されています。",
                )}
              </p>
            </div>
          </div>
          <div className="column">
            <h3 className="ui header">
              <i className="configure icon"></i>
              {richText("メンテナンス性")}
            </h3>
            <div className="ui basic segment">
              <p>
                <a href={href("#code")}>{richText("下で詳しく触れているように")}</a>
                {richText(
                  "、Webサイトは専用に開発されたデータ構造を持ち、データが更新されるたびに動的にビルドされるようにできています。",
                )}
              </p>
              <p>
                {richText(
                  "このビルドパイプラインにより、メンテナンスとテストが容易になっています。",
                )}
              </p>
            </div>
          </div>
          <div className="column">
            <h3 className="ui header">
              <i className="plane icon"></i>
              {richText("速度")}
            </h3>
            <div className="ui basic segment">
              <p>
                {richText(
                  "このWebサイトはほとんどが静的なHTML/CSSファイルからなっており、サーバ側でも、クライアント側でも、画面に描画される前に必要な処理が少なくて済むように設計されています。",
                )}
              </p>
              <p>
                {richText("唯一の例外は、読み込みに多少時間のかかるWebフォント")}
                <a href={href("https://www.morisawa.co.jp/fonts/specimen/1091")}>
                  {richText("UD 新ゴ R")}
                </a>
                {richText("ですが、これは綺麗なタイポグラフィのためには外せないものです。")}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderCode(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Code and data" : "コードとデータ")}</h2>
        <div className="ui basic segment">
          <p>
            {richText(
              'このWebサイトはほとんどが静的なHTML/CSS/JavaScriptファイルの塊です。そうしたファイルは、<a href="https://github.com/arcatdmz/arcatdmz.github.io"><i class="github icon"></i>GitHub</a>リポジトリのmasterブランチに何かがpushされるたび、コードとデータをもとにビルドされています。ビルドパイプラインは<a href="https://travis-ci.org/arcatdmz/arcatdmz.github.io/builds">Travis <abbr title="Continuous Integration">CI</abbr></a>上で実行されています。',
            )}
          </p>
          <p>
            {richText(
              "ビルド中は、以下のファイルの内容が何度も参照されています。もし似たようなWebサイトを作ってみたい場合、データ構造を参考にしてみてください。また、このポートフォリオ上の情報を機械的に処理したい場合にも使えるかもしれません。",
            )}
          </p>
          <div className="ui divided list">
            <div className="item">
              <div className="content">
                <a className="header" href={href(`${rootPath}data/histories.json`)}>
                  {richText("histories.json")}
                </a>
                <div className="description">
                  {richText("All of the &quot;Recent updates&quot; entries")}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <a className="header" href={href(`${rootPath}data/publications.json`)}>
                  {richText("publications.json")}
                </a>
                <div className="description">
                  {richText("Publication history (generated from ")}
                  <a href={href(`${rootPath}junkato.bib`)}>{richText("junkato.bib")}</a>
                  {richText(")")}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <a className="header" href={href(`${rootPath}data/awards.json`)}>
                  {richText("awards.json")}
                </a>
                <div className="description">
                  {richText("All of the received awards information")}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <a className="header" href={href(`${rootPath}data/talks.json`)}>
                  {richText("talks.json")}
                </a>
                <div className="description">
                  {richText("All of the invited talks information")}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <a className="header" href={href(`${rootPath}data/lectures.json`)}>
                  {richText("lectures.json")}
                </a>
                <div className="description">{richText("All of the lectures information")}</div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <a className="header" href={href(`${rootPath}data/projects.json`)}>
                  {richText("projects.json")}
                </a>
                <div className="description">
                  {richText(
                    "All of the projects information as well as the project tags information",
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderAcknowledgement(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Acknowledgement" : "謝辞")}</h2>
        <div className="ui basic segment">
          <p>
            {richText(
              'このWebサイトはさまざまな<abbr title="Open-Source Software">OSS</abbr>プロジェクトを利用して開発されています。<a href="https://github.com/arcatdmz/arcatdmz.github.io#readme">README.md</a>に書いてあるように、以下のツール、ライブラリ、プログラミング言語が主に使われています。その他も含めたすべての依存ライブラリの一覧は<a href="https://github.com/arcatdmz/arcatdmz.github.io/blog/main/package.json">package.json</a>をご覧ください。',
            )}
          </p>
          <div className="ui divided list">
            <div className="item">
              <i className="large devicon-gulp-plain colored icon"></i>
              <div className="content">
                <div className="header">{richText("Gulp v4")}</div>
                <div className="description">{richText("for managing build pipelines")}</div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-webpack-plain colored icon"></i>
              <div className="content">
                <div className="header">{richText("Webpack v4")}</div>
                <div className="description">{richText("for packing JavaScript code")}</div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-babel-plain colored icon"></i>
              <div className="content">
                <div className="header">{richText("Babel v7.9")}</div>
                <div className="description">
                  {richText("for transpiling JS code to be compatible with outdated browsers")}
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large ellipsis horizontal icon"></i>
              <div className="content">
                <div className="header">{richText("Pug v2")}</div>
                <div className="description">{richText("for easier HTML coding")}</div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-less-plain-wordmark colored icon"></i>
              <div className="content">
                <div className="header">{richText("LESS")}</div>
                <div className="description">{richText("for easier CSS coding")}</div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-typescript-plain colored icon"></i>
              <div className="content">
                <div className="header">{richText("TypeScript v5.3")}</div>
                <div className="description">{richText("for easier JS coding")}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        head={
          <>
            <link rel={"stylesheet"} href={href(`${rootPath}stylesheets/design.css`)} />
          </>
        }
      >
        {content.renderProjectHeader("website")}
        <div className="ui hidden divider"></div>
        <section id={attribute("design")}>{renderDesign()}</section>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <section id={attribute("code")}>
              {renderCode()}
              <div className="ui hidden divider"></div>
            </section>
          </div>
          <div className="column">
            <section id={attribute("acknowledgement")}>
              {renderAcknowledgement()}
              <div className="ui hidden divider"></div>
            </section>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}
