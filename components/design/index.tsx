import { Grid, GridColumn } from "react-fomantic-ui";
import { LocalizedContent } from "@/site/components/LocalizedContent";
import { ModalImage, Popup, SiteModal } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { Fragment, type ReactNode } from "react";
import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href, attribute } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: skillset. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projects, projectsTable, rootPath } = data;
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

  p = projectsTable["design"];
  title = p.getTitle(lang);
  me = p.project + "/";
  bodyClass = "without-header-menu design";
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
  function renderPortfolio(): ReactNode {
    return (
      <>
        {(() => {
          const children: ReactNode[] = [];
          children.push(
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
            children.push(<>{renderDesignSegment(p)}</>);
          }
          return keyed(children);
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
          <LocalizedContent
            ja={
              "以下のリストは職域に必要となる要素技術にフォーカスしたリストです。プロトタイピング手法やユーザ調査手法といったスキルについては掲載していません。"
            }
          >
            {
              "The following list focuses on concrete technical tools appearing in common job descriptions. High-level skills such as methods for rapid prototyping and user studies are omitted. See "
            }
            <SiteLink href={href(`${rootPath}resume.html`)}>
              {"my resume"}
            </SiteLink>
            {" for more general information."}
          </LocalizedContent>
        </p>
        <div className="ui hidden divider"></div>
        <Grid stackable columns={2}>
          <GridColumn>
            <h3 className="ui header">
              {en ? "As a graphic designer" : "グラフィックデザイン"}
            </h3>
            <div className="ui divided list">{renderSkillsetGraphic()}</div>
          </GridColumn>
          <GridColumn>
            <h3 className="ui header">
              {en ? "As an interaction designer" : "インタラクションデザイン"}
            </h3>
            <div className="ui divided list">{renderSkillsetIxd()}</div>
          </GridColumn>
        </Grid>
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
            <div className="description">{data.durations["2002,9,1"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-illustrator-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Illustrator"}</div>
            <div className="description">{data.durations["2002,9,1"]}</div>
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
            <div className="description">{data.durations["2000,10,1"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{"Pug (Jade)"}</div>
            <div className="description">{data.durations["2015,0,5"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-css3-plain colored icon"></i>
          <div className="content">
            <div className="header">{"CSS"}</div>
            <div className="description">{data.durations["2000,10,1"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-less-plain-wordmark colored icon"></i>
          <div className="content">
            <div className="header">{"Stylus and LESS"}</div>
            <div className="description">{data.durations["2015,0,5"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-bootstrap-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Bootstrap (< 4)"}</div>
            <div className="description">{data.durations["2012,2,19"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{"Semantic UI"}</div>
            <div className="description">{data.durations["2016,1,22"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-grunt-line colored icon"></i>
          <div className="content">
            <div className="header">{"Grunt"}</div>
            <div className="description">{data.durations["2015,0,5"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-gulp-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Gulp"}</div>
            <div className="description">{data.durations["2017,11,5"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-vim-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Vim"}</div>
            <div className="description">{data.durations["2005,5,1"]}</div>
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
            <div className="description">{data.durations["2000,10,1"]}</div>
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
            <div className="description">{data.durations["2012,2,19"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-d3js-plain colored icon"></i>
          <div className="content">
            <div className="header">{"D3.js"}</div>
            <div className="description">{data.durations["2017,11,7"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-webpack-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Webpack"}</div>
            <div className="description">{data.durations["2017,11,5"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-babel-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Babel"}</div>
            <div className="description">{data.durations["2017,11,5"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-nodejs-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Node.js"}</div>
            <div className="description">{data.durations["2015,0,5"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-php-plain colored icon"></i>
          <div className="content">
            <div className="header">{"PHP (< 7)"}</div>
            <div className="description">{data.durations["2005,5,1"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-wordpress-plain colored icon"></i>
          <div className="content">
            <div className="header">{"WordPress"}</div>
            <div className="description">{data.durations["2005,5,1"]}</div>
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
              {data.durations["2008,5,1"]}
              {", for robot and desktop apps and browser applets"}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-java-plain colored icon"></i>
          <div className="content">
            <div className="header">{"Processing"}</div>
            <div className="description">
              {data.durations["2008,5,1"]}
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
              {data.durations["2008,5,1"]}
              {" and since it was born, respectively"}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-mysql-plain colored icon"></i>
          <div className="content">
            <div className="header">{"MySQL"}</div>
            <div className="description">{data.durations["2005,9,1"]}</div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{"Eclipse"}</div>
            <div className="description">{data.durations["2008,5,1"]}</div>
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
          const children: ReactNode[] = [];
          const link = p.getLink(lang, basePath);
          children.push(
            <>
              <div className="ui basic segment" id={attribute(p.project)}>
                {link === false ? (
                  <>
                    <SiteImage
                      className="ui small left floated image"
                      sizes="150px"
                      src={`${rootPath}images/icons/${p.icon}`}
                    />
                  </>
                ) : (
                  <>
                    <SiteLink
                      className="ui small left floated image"
                      href={href(link)}
                    >
                      <SiteImage
                        sizes="150px"
                        src={`${rootPath}images/icons/${p.icon}`}
                      />
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
                          <ModalImage className="ui for-modal image">
                            <SiteImage src={image} displayHeight={70} />
                          </ModalImage>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}

                <div className="ui horizontal list">
                  {(() => {
                    const children: ReactNode[] = [];
                    children.push(
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
                        children.push(
                          <>
                            <div className="item">
                              <HtmlContent html={tag} />
                            </div>
                          </>,
                        );
                      }
                    }
                    return keyed(children);
                  })()}
                </div>

                <div className="ui clearing divider"></div>
              </div>
            </>,
          );
          return keyed(children);
        })()}
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
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
            <Popup
              className="ui hidden popup-menu popup"
              position="top left"
              trigger={
                <a className="ui circular icon popup-menu large grey hidden button">
                  <i className="sidebar icon"></i>
                </a>
              }
            >
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
            </Popup>
            <SiteModal className="ui large modal">
              <div className="header">{"Header"}</div>
              <div className="image content">
                <SiteImage className="image" />
              </div>
            </SiteModal>
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
