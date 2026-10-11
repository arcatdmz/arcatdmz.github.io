import { ProjectHeader } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/website/index.pug; edit this TSX source directly. */
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
  function renderDesign(): ReactNode {
    return (
      <>
        <h2 className="ui header">{en ? "Design" : "デザイン"}</h2>
        <p>
          {
            "このWebサイトは、ユーザビリティ、メンテナンス性、そして速度を念頭に設計されています。"
          }
        </p>
        <div className="ui hidden divider"></div>
        <div className="ui stackable three columns grid">
          <div className="column">
            <h3 className="ui header">
              <i className="user icon"></i>
              {"ユーザビリティ"}
            </h3>
            <div className="ui basic segment">
              <p>
                {"このWebサイトは"}
                <a href={"https://semantic-ui.com"}>{"Semantic UI"}</a>
                {
                  " CSSフレームワークを利用して作られており、さまざまな閲覧環境を想定したレスポンシブデザインとなっています。"
                }
              </p>
              <p>
                {
                  "また、色はモノトーンを基調としてアクセントカラーにアドニスブルーを採用し、肝心の内容が引き立つよう控え目に配色されています。"
                }
              </p>
            </div>
          </div>
          <div className="column">
            <h3 className="ui header">
              <i className="configure icon"></i>
              {"メンテナンス性"}
            </h3>
            <div className="ui basic segment">
              <p>
                <a href={"#code"}>{"下で詳しく触れているように"}</a>
                {
                  "、Webサイトは専用に開発されたデータ構造を持ち、データが更新されるたびに動的にビルドされるようにできています。"
                }
              </p>
              <p>
                {
                  "このビルドパイプラインにより、メンテナンスとテストが容易になっています。"
                }
              </p>
            </div>
          </div>
          <div className="column">
            <h3 className="ui header">
              <i className="plane icon"></i>
              {"速度"}
            </h3>
            <div className="ui basic segment">
              <p>
                {
                  "このWebサイトはほとんどが静的なHTML/CSSファイルからなっており、サーバ側でも、クライアント側でも、画面に描画される前に必要な処理が少なくて済むように設計されています。"
                }
              </p>
              <p>
                {"唯一の例外は、読み込みに多少時間のかかるWebフォント"}
                <a href={"https://www.morisawa.co.jp/fonts/specimen/1091"}>
                  {"UD 新ゴ R"}
                </a>
                {
                  "ですが、これは綺麗なタイポグラフィのためには外せないものです。"
                }
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
        <h2 className="ui header">{en ? "Code and data" : "コードとデータ"}</h2>
        <div className="ui basic segment">
          <p>
            {
              "このWebサイトはほとんどが静的なHTML/CSS/JavaScriptファイルの塊です。そうしたファイルは、"
            }
            <a href={"https://github.com/arcatdmz/arcatdmz.github.io"}>
              <i className={"github icon"}></i>
              {"GitHub"}
            </a>
            {
              "リポジトリのmasterブランチに何かがpushされるたび、コードとデータをもとにビルドされています。ビルドパイプラインは"
            }
            <a
              href={"https://travis-ci.org/arcatdmz/arcatdmz.github.io/builds"}
            >
              {"Travis "}
              <abbr title={"Continuous Integration"}>{"CI"}</abbr>
            </a>
            {"上で実行されています。"}
          </p>
          <p>
            {
              "ビルド中は、以下のファイルの内容が何度も参照されています。もし似たようなWebサイトを作ってみたい場合、データ構造を参考にしてみてください。また、このポートフォリオ上の情報を機械的に処理したい場合にも使えるかもしれません。"
            }
          </p>
          <div className="ui divided list">
            <div className="item">
              <div className="content">
                <SiteLink
                  className="header"
                  href={href(`${rootPath}data/histories.json`)}
                >
                  {"histories.json"}
                </SiteLink>
                <div className="description">
                  {'All of the "Recent updates" entries'}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <SiteLink
                  className="header"
                  href={href(`${rootPath}data/publications.json`)}
                >
                  {"publications.json"}
                </SiteLink>
                <div className="description">
                  {"Publication history (generated from "}
                  <SiteLink href={href(`${rootPath}junkato.bib`)}>
                    {"junkato.bib"}
                  </SiteLink>
                  {")"}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <SiteLink
                  className="header"
                  href={href(`${rootPath}data/awards.json`)}
                >
                  {"awards.json"}
                </SiteLink>
                <div className="description">
                  {"All of the received awards information"}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <SiteLink
                  className="header"
                  href={href(`${rootPath}data/talks.json`)}
                >
                  {"talks.json"}
                </SiteLink>
                <div className="description">
                  {"All of the invited talks information"}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <SiteLink
                  className="header"
                  href={href(`${rootPath}data/lectures.json`)}
                >
                  {"lectures.json"}
                </SiteLink>
                <div className="description">
                  {"All of the lectures information"}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <SiteLink
                  className="header"
                  href={href(`${rootPath}data/projects.json`)}
                >
                  {"projects.json"}
                </SiteLink>
                <div className="description">
                  {
                    "All of the projects information as well as the project tags information"
                  }
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
        <h2 className="ui header">{en ? "Acknowledgement" : "謝辞"}</h2>
        <div className="ui basic segment">
          <p>
            {"このWebサイトはさまざまな"}
            <abbr title={"Open-Source Software"}>{"OSS"}</abbr>
            {"プロジェクトを利用して開発されています。"}
            <a href={"https://github.com/arcatdmz/arcatdmz.github.io#readme"}>
              {"README.md"}
            </a>
            {
              "に書いてあるように、以下のツール、ライブラリ、プログラミング言語が主に使われています。その他も含めたすべての依存ライブラリの一覧は"
            }
            <a
              href={
                "https://github.com/arcatdmz/arcatdmz.github.io/blog/main/package.json"
              }
            >
              {"package.json"}
            </a>
            {"をご覧ください。"}
          </p>
          <div className="ui divided list">
            <div className="item">
              <i className="large devicon-gulp-plain colored icon"></i>
              <div className="content">
                <div className="header">{"Gulp v4"}</div>
                <div className="description">
                  {"for managing build pipelines"}
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-webpack-plain colored icon"></i>
              <div className="content">
                <div className="header">{"Webpack v4"}</div>
                <div className="description">
                  {"for packing JavaScript code"}
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-babel-plain colored icon"></i>
              <div className="content">
                <div className="header">{"Babel v7.9"}</div>
                <div className="description">
                  {
                    "for transpiling JS code to be compatible with outdated browsers"
                  }
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large ellipsis horizontal icon"></i>
              <div className="content">
                <div className="header">{"Pug v2"}</div>
                <div className="description">{"for easier HTML coding"}</div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-less-plain-wordmark colored icon"></i>
              <div className="content">
                <div className="header">{"LESS"}</div>
                <div className="description">{"for easier CSS coding"}</div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-typescript-plain colored icon"></i>
              <div className="content">
                <div className="header">{"TypeScript v5.3"}</div>
                <div className="description">{"for easier JS coding"}</div>
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
            <link
              rel={"stylesheet"}
              href={href(`${rootPath}stylesheets/design.css`)}
            />
          </>
        }
      >
        <ProjectHeader project={"website"} />
        <div className="ui hidden divider"></div>
        <section id={"design"}>{renderDesign()}</section>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <section id={"code"}>
              {renderCode()}
              <div className="ui hidden divider"></div>
            </section>
          </div>
          <div className="column">
            <section id={"acknowledgement"}>
              {renderAcknowledgement()}
              <div className="ui hidden divider"></div>
            </section>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}
