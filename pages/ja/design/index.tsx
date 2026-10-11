import { Fragment } from "react";

import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/design/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projects, projectsTable, moment, rootPath } = data;
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

  p = projectsTable["design"];
  title = p.getTitle(lang);
  me = p.project + "/";
  bodyClass = "without-header-menu design";
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
  function renderPortfolio(): ReactNode {
    return (
      <>
        {(() => {
          const children196: ReactNode[] = [];
          children196.push(
            <>
              <h2 className="ui dividing header">
                {en ? "Portfolio" : "ポートフォリオ"}
              </h2>
            </>,
          );
          const sortedProjects = [];
          for (const p of projects) {
            if (!p.isDesignProject()) continue;
            sortedProjects.push(p);
          }
          sortedProjects.sort(function (a, b) {
            return b.year.from - a.year.from;
          });
          for (const p of sortedProjects) {
            children196.push(<>{renderDesignSegment(p)}</>);
          }
          return keyed(children196);
        })()}
      </>
    );
  }
  function renderSkillset(): ReactNode {
    return (
      <>
        <h2 className="ui dividing header">
          {en ? "Skillset" : "スキルセット"}
        </h2>
        <p>
          {
            "以下のリストは職域に必要となる要素技術にフォーカスしたリストです。プロトタイピング手法やユーザ調査手法といったスキルについては掲載していません。"
          }
        </p>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <h3 className="ui header">
              {en ? "As a graphic designer" : "グラフィックデザイン"}
            </h3>
            <div className="ui divided list">{renderSkillsetGraphic()}</div>
          </div>
          <div className="column">
            <h3 className="ui header">
              {en ? "As an interaction designer" : "インタラクションデザイン"}
            </h3>
            <div className="ui divided list">{renderSkillsetIxd()}</div>
          </div>
        </div>
      </>
    );
  }
  function renderSkillsetGraphic(): ReactNode {
    return (
      <>
        <div className="item">
          <i className="large devicon-photoshop-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Photoshop"}</div>
            <div className="description">
              {moment([2002, 9, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-illustrator-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Illustrator"}</div>
            <div className="description">
              {moment([2002, 9, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            {en ? (
              <>
                <div className="header">{"Other Adobe products"}</div>

                <div className="description">
                  {"Premier for producing demo videos and InDesign for basic "}
                  <abbr title={"Desktop Publishing"}>{"DTP"}</abbr>
                  {" tasks"}
                </div>
              </>
            ) : (
              <>
                <div className="header">{"その他のAdobe製品"}</div>

                <div className="description">
                  {"Premier (デモ動画制作), InDesign ("}
                  <abbr title={"Desktop Publishing"}>{"DTP"}</abbr>
                  {")"}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="item">
          <i className="large devicon-html5-plain colored icon"></i>
          <div className="content">
            <div className="header">{"HTML"}</div>
            <div className="description">
              {moment([2000, 10, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{"Pug (Jade)"}</div>
            <div className="description">
              {moment([2015, 0, 5]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-css3-plain colored icon"></i>
          <div className="content">
            <div className="header">{"CSS"}</div>
            <div className="description">
              {moment([2000, 10, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-less-plain-wordmark colored icon"></i>
          <div className="content">
            <div className="header">{"Stylus and LESS"}</div>
            <div className="description">
              {moment([2015, 0, 5]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-bootstrap-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Bootstrap (< 4)"}</div>
            <div className="description">
              {moment([2012, 2, 19]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{"Semantic UI"}</div>
            <div className="description">
              {moment([2016, 1, 22]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-grunt-line colored icon"></i>
          <div className="content">
            <div className="header">{"Grunt"}</div>
            <div className="description">
              {moment([2015, 0, 5]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-gulp-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Gulp"}</div>
            <div className="description">
              {moment([2017, 11, 5]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-vim-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Vim"}</div>
            <div className="description">
              {moment([2005, 5, 1]).toNow(true)}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderSkillsetIxd(): ReactNode {
    return (
      <>
        <div className="item">
          <i className="large devicon-javascript-plain colored icon"></i>
          <div className="content">
            <div className="header">{"JavaScript"}</div>
            <div className="description">
              {moment([2000, 10, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-typescript-plain colored icon"></i>
          <div className="content">
            <div className="header">{"TypeScript"}</div>
            <div className="description">
              {"since it was called "}
              <a
                href={
                  "https://www.zdnet.com/article/who-built-microsoft-typescript-and-why/"
                }
              >
                {'"Strada"'}
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-jquery-plain colored icon"></i>
          <div className="content">
            <div className="header">{"jQuery"}</div>
            <div className="description">
              {moment([2012, 2, 19]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-d3js-plain colored icon"></i>
          <div className="content">
            <div className="header">{"D3.js"}</div>
            <div className="description">
              {moment([2017, 11, 7]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-webpack-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Webpack"}</div>
            <div className="description">
              {moment([2017, 11, 5]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-babel-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Babel"}</div>
            <div className="description">
              {moment([2017, 11, 5]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-nodejs-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Node.js"}</div>
            <div className="description">
              {moment([2015, 0, 5]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-php-plain colored icon"></i>
          <div className="content">
            <div className="header">{"PHP (< 7)"}</div>
            <div className="description">
              {moment([2005, 5, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-wordpress-plain colored icon"></i>
          <div className="content">
            <div className="header">{"WordPress"}</div>
            <div className="description">
              {moment([2005, 5, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-csharp-plain colored icon"></i>
          <div className="content">
            <div className="header">{"C#"}</div>
            <div className="description">
              {"for desktop apps and ASP.NET apps"}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-java-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Java (< 8)"}</div>
            <div className="description">
              {moment([2008, 5, 1]).toNow(true)}
              {", for robot and desktop apps and browser applets"}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-java-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Processing"}</div>
            <div className="description">
              {moment([2008, 5, 1]).toNow(true)}
              {", mostly for robot apps using "}
              <SiteLink href={href(`${rootPath}phybots`)}>{"Phybots"}</SiteLink>
              {" and "}
              <SiteLink href={href(`${rootPath}picode`)}>{"Picode"}</SiteLink>
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-visualstudio-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Visual Studio, Visual Studio Code"}</div>
            <div className="description">
              {moment([2008, 5, 1]).toNow(true)}
              {" and since it was born, respectively"}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-mysql-plain colored icon"></i>
          <div className="content">
            <div className="header">{"MySQL"}</div>
            <div className="description">
              {moment([2005, 9, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{"Eclipse"}</div>
            <div className="description">
              {moment([2008, 5, 1]).toNow(true)}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-github-plain colored icon"></i>
          <div className="content">
            <div className="header">{"GitHub"}</div>
            <div className="description">
              {"see "}
              <a href={"https://github.com/arcatdmz"}>{"my repos"}</a>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderDesignSegment(p: any = undefined): ReactNode {
    return (
      <>
        {(() => {
          const children198: ReactNode[] = [];
          const link = p.getLink(lang, basePath);
          children198.push(
            <>
              <div className="ui basic segment" id={attribute(p.project)}>
                {link === false ? (
                  <>
                    <img
                      className="ui small left floated image"
                      src={`${rootPath}images/icons/${p.icon}`}
                    />
                  </>
                ) : (
                  <>
                    <SiteLink
                      className="ui small left floated image"
                      href={href(link)}
                    >
                      <img src={`${rootPath}images/icons/${p.icon}`} />
                    </SiteLink>
                  </>
                )}

                <h3 className="ui header">
                  <HtmlContent html={p.getDesignTitle(lang)} />
                </h3>

                <HtmlContent html={p.getDesignDescription(lang)} paragraph />

                {p.images ? (
                  <>
                    <div className="ui tiny images">
                      {p.images.map((image, itemIndex) => (
                        <Fragment key={itemIndex}>
                          <a className="ui for-modal image">
                            <img src={image} />
                          </a>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}

                <div className="ui horizontal list">
                  {(() => {
                    const children201: ReactNode[] = [];
                    children201.push(
                      <>
                        <div className="item">
                          <div className="ui basic label">
                            <i className="calendar icon"></i>
                            {p.getYearString(lang, buildYear)}
                          </div>
                        </div>
                      </>,
                    );
                    const tags = p.getDesignTags(lang);
                    if (tags.length > 0) {
                      for (const tag of tags) {
                        children201.push(
                          <>
                            <div className="item">
                              <HtmlContent html={tag} />
                            </div>
                          </>,
                        );
                      }
                    }
                    return keyed(children201);
                  })()}
                </div>

                <div className="ui clearing divider"></div>
              </div>
            </>,
          );
          return keyed(children198);
        })()}
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
        header={
          <>
            <div className="ui text fixed menu">
              <div className="menu" id={"research-menu"}>
                <SiteLink className="item" href={href(basePath)}>
                  <i className="lab icon"></i>

                  {en ? (
                    <>{"Back to research"}</>
                  ) : (
                    <>
                      {"研究"}

                      <span className="mobile hidden">{"に戻る"}</span>
                    </>
                  )}
                </SiteLink>
              </div>
              <div className="right menu" id={"design-menu"}>
                <SiteRightHeaderMenu context={context} />
              </div>
            </div>
          </>
        }
        mainHero={
          <>
            <div className="hero-unit">
              <h1 className="ui center aligned icon header">
                <i className="circular paint brush icon"></i>
                {title}
              </h1>
              <div className="ui container">
                <HtmlContent html={p.getDescription(lang)} />
              </div>
            </div>
          </>
        }
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{en ? "Top" : "トップ"}</div>
                </a>
                <a className="item" href={"#portfolio"}>
                  <i className="history icon"></i>
                  <div className="content">
                    {en ? "Portfolio" : "ポートフォリオ"}
                  </div>
                </a>
                <a className="item" href={"#skillset"}>
                  <i className="user icon"></i>
                  <div className="content">
                    {en ? "Skillset" : "スキルセット"}
                  </div>
                </a>
              </div>
            </div>
            <div className="ui large modal">
              <div className="header">{"Header"}</div>
              <div className="image content">
                <img className="image" />
              </div>
            </div>
          </>
        }
      >
        <section id={"portfolio"}>{renderPortfolio()}</section>
        <div className="ui hidden divider"></div>
        <section id={"skillset"}>{renderSkillset()}</section>
      </SiteLayout>
    </>
  );
}
