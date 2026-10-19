import { Divider, Grid, Header, Icon, List, Segment } from "react-fomantic-ui";

import { LocalizedContent } from "@/site/components/LocalizedContent";
import { ProjectHeader } from "@/site/components/ContentComponents";
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

/** Shared page template. Japanese overrides: design, code, acknowledgement. */
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

  p = projectsTable["website"];
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
  function renderDesign(): ReactNode {
    return (
      <>
        <Header as="h2">{en ? "Design" : "デザイン"}</Header>
        <p>
          {en
            ? "This website is built for usability, maintainability, and speed in mind."
            : "このWebサイトは、ユーザビリティ、メンテナンス性、そして速度を念頭に設計されています。"}
        </p>
        <Divider hidden />
        <Grid stackable columns={3}>
          <Grid.Column>
            <Header as="h3">
              <Icon name="user" />
              {en ? "Usability" : "ユーザビリティ"}
            </Header>
            <Segment basic>
              <LocalizedContent
                ja={
                  <>
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
                  </>
                }
              >
                <p>
                  {"This website is built on top of the "}
                  <a href={"https://semantic-ui.com"}>{"Semantic UI"}</a>
                  {" CSS framework and fully implements responsive design."}
                </p>
                <p>
                  {
                    "The color scheme is almost monotone with a slight accent of adonis blue so that the actual content gets enough attention."
                  }
                </p>
              </LocalizedContent>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">
              <Icon name="configure" />
              {en ? "Maintainability" : "メンテナンス性"}
            </Header>
            <Segment basic>
              <LocalizedContent
                ja={
                  <>
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
                  </>
                }
              >
                <p>
                  {"As detailed "}
                  <a href={"#code"}>{"below"}</a>
                  {
                    ", a certain part of this website is dynamically built from a set of well-structured data source, every time the data source is updated."
                  }
                </p>
                <p>
                  {
                    "The building pipeline makes a low-maintenance and easy-to-test website."
                  }
                </p>
              </LocalizedContent>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">
              <Icon name="plane" />
              {en ? "Speed" : "速度"}
            </Header>
            <Segment basic>
              <LocalizedContent
                ja={
                  <>
                    <p>
                      {
                        "このWebサイトはほとんどが静的なHTML/CSSファイルからなっており、サーバ側でも、クライアント側でも、画面に描画される前に必要な処理が少なくて済むように設計されています。"
                      }
                    </p>
                    <p>
                      {"唯一の例外は、読み込みに多少時間のかかるWebフォント"}
                      <a
                        href={"https://www.morisawa.co.jp/fonts/specimen/1091"}
                      >
                        {"UD 新ゴ R"}
                      </a>
                      {
                        "ですが、これは綺麗なタイポグラフィのためには外せないものです。"
                      }
                    </p>
                  </>
                }
              >
                <p>
                  {
                    "The website is mostly made of static HTML/CSS files and does not require much server- nor client-side processing before rendering."
                  }
                </p>
                <p>
                  {"The only exception is a Japanese web font ("}
                  <a href={"https://www.morisawa.co.jp/fonts/specimen/1091"}>
                    {"UD Shin Go"}
                  </a>
                  {
                    ") that could take some time to load, but is essential for the beautiful typography."
                  }
                </p>
              </LocalizedContent>
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    );
  }
  function renderCode(): ReactNode {
    return (
      <>
        <Header as="h2">{en ? "Code and data" : "コードとデータ"}</Header>
        <Segment basic>
          <p>
            {en
              ? "This website is a collection of static HTML/CSS/JavaScript files. It is built from code and data every time something is pushed to the master branch of the "
              : "このWebサイトはほとんどが静的なHTML/CSS/JavaScriptファイルの塊です。そうしたファイルは、"}
            <a href={"https://github.com/arcatdmz/arcatdmz.github.io"}>
              <Icon name="github" />
              {"GitHub"}
            </a>
            {en
              ? " repository. The build pipeline is executed on "
              : "リポジトリのmasterブランチに何かがpushされるたび、コードとデータをもとにビルドされています。ビルドパイプラインは"}
            <a
              href={"https://travis-ci.org/arcatdmz/arcatdmz.github.io/builds"}
            >
              {"Travis "}
              <abbr title={"Continuous Integration"}>{"CI"}</abbr>
            </a>
            {en ? "." : "上で実行されています。"}
          </p>
          <p>
            {en
              ? "During the build process, the following files are used as data source. Feel free to steal the data structure for making your own portfolio website or making HTTP requests to these data files in your application (but ... for what?)"
              : "ビルド中は、以下のファイルの内容が何度も参照されています。もし似たようなWebサイトを作ってみたい場合、データ構造を参考にしてみてください。また、このポートフォリオ上の情報を機械的に処理したい場合にも使えるかもしれません。"}
          </p>
          <List divided>
            <List.Item>
              <List.Content>
                <List.Header
                  as={SiteLink}
                  href={href(`${rootPath}data/histories.json`)}
                >
                  {"histories.json"}
                </List.Header>
                <List.Description>
                  {'All of the "Recent updates" entries'}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header
                  as={SiteLink}
                  href={href(`${rootPath}data/publications.json`)}
                >
                  {"publications.json"}
                </List.Header>
                <List.Description>
                  {"Publication history (generated from "}
                  <SiteLink href={href(`${rootPath}junkato.bib`)}>
                    {"junkato.bib"}
                  </SiteLink>
                  {")"}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header
                  as={SiteLink}
                  href={href(`${rootPath}data/awards.json`)}
                >
                  {"awards.json"}
                </List.Header>
                <List.Description>
                  {"All of the received awards information"}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header
                  as={SiteLink}
                  href={href(`${rootPath}data/talks.json`)}
                >
                  {"talks.json"}
                </List.Header>
                <List.Description>
                  {"All of the invited talks information"}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header
                  as={SiteLink}
                  href={href(`${rootPath}data/lectures.json`)}
                >
                  {"lectures.json"}
                </List.Header>
                <List.Description>
                  {"All of the lectures information"}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header
                  as={SiteLink}
                  href={href(`${rootPath}data/projects.json`)}
                >
                  {"projects.json"}
                </List.Header>
                <List.Description>
                  {
                    "All of the projects information as well as the project tags information"
                  }
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </>
    );
  }
  function renderAcknowledgement(): ReactNode {
    return (
      <>
        <Header as="h2">{en ? "Acknowledgement" : "謝辞"}</Header>
        <Segment basic>
          <p>
            {en
              ? "This website is made possible with help of various "
              : "このWebサイトはさまざまな"}
            <abbr title={"Open-Source Software"}>{"OSS"}</abbr>
            {en
              ? " projects. As noted in "
              : "プロジェクトを利用して開発されています。"}
            <a href={"https://github.com/arcatdmz/arcatdmz.github.io#readme"}>
              {"README.md"}
            </a>
            {en
              ? ", it is built with the following tools, libraries, and languages. For the complete list of dependent libraries, see "
              : "に書いてあるように、以下のツール、ライブラリ、プログラミング言語が主に使われています。その他も含めたすべての依存ライブラリの一覧は"}
            <a
              href={
                "https://github.com/arcatdmz/arcatdmz.github.io/blog/main/package.json"
              }
            >
              {"package.json"}
            </a>
            {en ? "." : "をご覧ください。"}
          </p>
          <List divided>
            <List.Item>
              <Icon size="large" className="devicon-gulp-plain colored" />
              <List.Content>
                <List.Header>{"Gulp v4"}</List.Header>
                <List.Description>
                  {"for managing build pipelines"}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon size="large" className="devicon-webpack-plain colored" />
              <List.Content>
                <List.Header>{"Webpack v4"}</List.Header>
                <List.Description>
                  {"for packing JavaScript code"}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon size="large" className="devicon-babel-plain colored" />
              <List.Content>
                <List.Header>{"Babel v7.9"}</List.Header>
                <List.Description>
                  {
                    "for transpiling JS code to be compatible with outdated browsers"
                  }
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon size="large" name="ellipsis horizontal" />
              <List.Content>
                <List.Header>{"Pug v2"}</List.Header>
                <List.Description>{"for easier HTML coding"}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon
                size="large"
                className="devicon-less-plain-wordmark colored"
              />
              <List.Content>
                <List.Header>{"LESS"}</List.Header>
                <List.Description>{"for easier CSS coding"}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon size="large" className="devicon-typescript-plain colored" />
              <List.Content>
                <List.Header>{"TypeScript v5.3"}</List.Header>
                <List.Description>{"for easier JS coding"}</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"website"} />
        <Divider hidden />
        <section id={"design"}>{renderDesign()}</section>
        <Divider hidden />
        <Grid stackable columns={2}>
          <Grid.Column>
            <section id={"code"}>
              {renderCode()}
              <Divider hidden />
            </section>
          </Grid.Column>
          <Grid.Column>
            <section id={"acknowledgement"}>
              {renderAcknowledgement()}
              <Divider hidden />
            </section>
          </Grid.Column>
        </Grid>
      </SiteLayout>
    </>
  );
}
