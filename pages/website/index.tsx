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

/** React page migrated from website/index.pug; edit this TSX source directly. */
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
  const lang: "en" | "ja" = "en";
  const en: boolean = true;
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
            "This website is built for usability, maintainability, and speed in mind.",
          )}
        </p>
        <div className="ui hidden divider"></div>
        <div className="ui stackable three columns grid">
          <div className="column">
            <h3 className="ui header">
              <i className="user icon"></i>
              {richText("Usability")}
            </h3>
            <div className="ui basic segment">
              <p>
                {richText("This website is built on top of the ")}
                <a href={href("https://semantic-ui.com")}>
                  {richText("Semantic UI")}
                </a>
                {richText(
                  " CSS framework and fully implements responsive design.",
                )}
              </p>
              <p>
                {richText(
                  "The color scheme is almost monotone with a slight accent of adonis blue so that the actual content gets enough attention.",
                )}
              </p>
            </div>
          </div>
          <div className="column">
            <h3 className="ui header">
              <i className="configure icon"></i>
              {richText("Maintainability")}
            </h3>
            <div className="ui basic segment">
              <p>
                {richText("As detailed ")}
                <a href={href("#code")}>{richText("below")}</a>
                {richText(
                  ", a certain part of this website is dynamically built from a set of well-structured data source, every time the data source is updated.",
                )}
              </p>
              <p>
                {richText(
                  "The building pipeline makes a low-maintenance and easy-to-test website.",
                )}
              </p>
            </div>
          </div>
          <div className="column">
            <h3 className="ui header">
              <i className="plane icon"></i>
              {richText("Speed")}
            </h3>
            <div className="ui basic segment">
              <p>
                {richText(
                  "The website is mostly made of static HTML/CSS files and does not require much server- nor client-side processing before rendering.",
                )}
              </p>
              <p>
                {richText("The only exception is a Japanese web font (")}
                <a
                  href={href("https://www.morisawa.co.jp/fonts/specimen/1091")}
                >
                  {richText("UD Shin Go")}
                </a>
                {richText(
                  ") that could take some time to load, but is essential for the beautiful typography.",
                )}
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
        <h2 className="ui header">
          {plainText(en ? "Code and data" : "コードとデータ")}
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              'This website is a collection of static HTML/CSS/JavaScript files. It is built from code and data every time something is pushed to the master branch of the <a href="https://github.com/arcatdmz/arcatdmz.github.io"><i class="github icon"></i>GitHub</a> repository. The build pipeline is executed on <a href="https://travis-ci.org/arcatdmz/arcatdmz.github.io/builds">Travis <abbr title="Continuous Integration">CI</abbr></a>.',
            )}
          </p>
          <p>
            {richText(
              "During the build process, the following files are used as data source. Feel free to steal the data structure for making your own portfolio website or making HTTP requests to these data files in your application (but ... for what?)",
            )}
          </p>
          <div className="ui divided list">
            <div className="item">
              <div className="content">
                <a
                  className="header"
                  href={href(`${rootPath}data/histories.json`)}
                >
                  {richText("histories.json")}
                </a>
                <div className="description">
                  {richText("All of the &quot;Recent updates&quot; entries")}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <a
                  className="header"
                  href={href(`${rootPath}data/publications.json`)}
                >
                  {richText("publications.json")}
                </a>
                <div className="description">
                  {richText("Publication history (generated from ")}
                  <a href={href(`${rootPath}junkato.bib`)}>
                    {richText("junkato.bib")}
                  </a>
                  {richText(")")}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <a
                  className="header"
                  href={href(`${rootPath}data/awards.json`)}
                >
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
                <a
                  className="header"
                  href={href(`${rootPath}data/lectures.json`)}
                >
                  {richText("lectures.json")}
                </a>
                <div className="description">
                  {richText("All of the lectures information")}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <a
                  className="header"
                  href={href(`${rootPath}data/projects.json`)}
                >
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
        <h2 className="ui header">
          {plainText(en ? "Acknowledgement" : "謝辞")}
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              'This website is made possible with help of various <abbr title="Open-Source Software">OSS</abbr> projects. As noted in <a href="https://github.com/arcatdmz/arcatdmz.github.io#readme">README.md</a>, it is built with the following tools, libraries, and languages. For the complete list of dependent libraries, see <a href="https://github.com/arcatdmz/arcatdmz.github.io/blog/main/package.json">package.json</a>.',
            )}
          </p>
          <div className="ui divided list">
            <div className="item">
              <i className="large devicon-gulp-plain colored icon"></i>
              <div className="content">
                <div className="header">{richText("Gulp v4")}</div>
                <div className="description">
                  {richText("for managing build pipelines")}
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-webpack-plain colored icon"></i>
              <div className="content">
                <div className="header">{richText("Webpack v4")}</div>
                <div className="description">
                  {richText("for packing JavaScript code")}
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-babel-plain colored icon"></i>
              <div className="content">
                <div className="header">{richText("Babel v7.9")}</div>
                <div className="description">
                  {richText(
                    "for transpiling JS code to be compatible with outdated browsers",
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large ellipsis horizontal icon"></i>
              <div className="content">
                <div className="header">{richText("Pug v2")}</div>
                <div className="description">
                  {richText("for easier HTML coding")}
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-less-plain-wordmark colored icon"></i>
              <div className="content">
                <div className="header">{richText("LESS")}</div>
                <div className="description">
                  {richText("for easier CSS coding")}
                </div>
              </div>
            </div>
            <div className="item">
              <i className="large devicon-typescript-plain colored icon"></i>
              <div className="content">
                <div className="header">{richText("TypeScript v5.3")}</div>
                <div className="description">
                  {richText("for easier JS coding")}
                </div>
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
