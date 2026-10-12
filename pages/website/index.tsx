import { ProjectHeader } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from website/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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
        <h2 className="ui header">{en ? "Design" : "デザイン"}</h2>
        <p>
          {
            "This website is built for usability, maintainability, and speed in mind."
          }
        </p>
        <div className="ui hidden divider"></div>
        <div className="ui stackable three columns grid">
          <div className="column">
            <h3 className="ui header">
              <i className="user icon"></i>
              {"Usability"}
            </h3>
            <div className="ui basic segment">
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
            </div>
          </div>
          <div className="column">
            <h3 className="ui header">
              <i className="configure icon"></i>
              {"Maintainability"}
            </h3>
            <div className="ui basic segment">
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
            </div>
          </div>
          <div className="column">
            <h3 className="ui header">
              <i className="plane icon"></i>
              {"Speed"}
            </h3>
            <div className="ui basic segment">
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
              "This website is a collection of static HTML/CSS/JavaScript files. It is built from code and data every time something is pushed to the master branch of the "
            }
            <a href={"https://github.com/arcatdmz/arcatdmz.github.io"}>
              <i className={"github icon"}></i>
              {"GitHub"}
            </a>
            {" repository. The build pipeline is executed on "}
            <a
              href={"https://travis-ci.org/arcatdmz/arcatdmz.github.io/builds"}
            >
              {"Travis "}
              <abbr title={"Continuous Integration"}>{"CI"}</abbr>
            </a>
            {"."}
          </p>
          <p>
            {
              "During the build process, the following files are used as data source. Feel free to steal the data structure for making your own portfolio website or making HTTP requests to these data files in your application (but ... for what?)"
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
            {"This website is made possible with help of various "}
            <abbr title={"Open-Source Software"}>{"OSS"}</abbr>
            {" projects. As noted in "}
            <a href={"https://github.com/arcatdmz/arcatdmz.github.io#readme"}>
              {"README.md"}
            </a>
            {
              ", it is built with the following tools, libraries, and languages. For the complete list of dependent libraries, see "
            }
            <a
              href={
                "https://github.com/arcatdmz/arcatdmz.github.io/blog/main/package.json"
              }
            >
              {"package.json"}
            </a>
            {"."}
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
      <SiteLayout context={context}>
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

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/website/", {"projects": ["design", "website"], "publicationProjects": ["website"]}) }, "/website/") };
}
