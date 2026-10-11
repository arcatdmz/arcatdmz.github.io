import type { ReactNode } from "react";
import { richText, richParagraph } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/design/index.pug; edit this TSX source directly. */
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
  const content = createContentComponents(context);
  function renderPortfolio(): ReactNode {
    return (
      <>
        {(() => {
          const children196: ReactNode[] = [];
          children196.push(
            <>
              <h2 className="ui dividing header">{plainText(en ? "Portfolio" : "ポートフォリオ")}</h2>
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
        <h2 className="ui dividing header">{plainText(en ? "Skillset" : "スキルセット")}</h2>
        <p>
          {richText(
            "以下のリストは職域に必要となる要素技術にフォーカスしたリストです。プロトタイピング手法やユーザ調査手法といったスキルについては掲載していません。",
          )}
        </p>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <h3 className="ui header">
              {plainText(en ? "As a graphic designer" : "グラフィックデザイン")}
            </h3>
            <div className="ui divided list">{renderSkillsetGraphic()}</div>
          </div>
          <div className="column">
            <h3 className="ui header">
              {plainText(en ? "As an interaction designer" : "インタラクションデザイン")}
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
            <div className="header">{richText("Photoshop")}</div>
            <div className="description">{plainText(moment([2002, 9, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-illustrator-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Illustrator")}</div>
            <div className="description">{plainText(moment([2002, 9, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            {(() => {
              const children197: ReactNode[] = [];
              if (en) {
                children197.push(
                  <>
                    <div className="header">{richText("Other Adobe products")}</div>
                  </>,
                );
                children197.push(
                  <>
                    <div className="description">
                      {richText(
                        'Premier for producing demo videos and InDesign for basic <abbr title="Desktop Publishing">DTP</abbr> tasks',
                      )}
                    </div>
                  </>,
                );
              } else {
                children197.push(
                  <>
                    <div className="header">{richText("その他のAdobe製品")}</div>
                  </>,
                );
                children197.push(
                  <>
                    <div className="description">
                      {richText(
                        'Premier (デモ動画制作), InDesign (<abbr title="Desktop Publishing">DTP</abbr>)',
                      )}
                    </div>
                  </>,
                );
              }
              return keyed(children197);
            })()}
          </div>
        </div>
        <div className="item">
          <i className="large devicon-html5-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("HTML")}</div>
            <div className="description">{plainText(moment([2000, 10, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{richText("Pug (Jade)")}</div>
            <div className="description">{plainText(moment([2015, 0, 5]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-css3-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("CSS")}</div>
            <div className="description">{plainText(moment([2000, 10, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-less-plain-wordmark colored icon"></i>
          <div className="content">
            <div className="header">{richText("Stylus and LESS")}</div>
            <div className="description">{plainText(moment([2015, 0, 5]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-bootstrap-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Bootstrap (&lt; 4)")}</div>
            <div className="description">{plainText(moment([2012, 2, 19]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{richText("Semantic UI")}</div>
            <div className="description">{plainText(moment([2016, 1, 22]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-grunt-line colored icon"></i>
          <div className="content">
            <div className="header">{richText("Grunt")}</div>
            <div className="description">{plainText(moment([2015, 0, 5]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-gulp-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Gulp")}</div>
            <div className="description">{plainText(moment([2017, 11, 5]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-vim-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Vim")}</div>
            <div className="description">{plainText(moment([2005, 5, 1]).toNow(true))}</div>
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
            <div className="header">{richText("JavaScript")}</div>
            <div className="description">{plainText(moment([2000, 10, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-typescript-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("TypeScript")}</div>
            <div className="description">
              {richText(
                'since it was called <a href="https://www.zdnet.com/article/who-built-microsoft-typescript-and-why/">&quot;Strada&quot;</a>',
              )}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-jquery-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("jQuery")}</div>
            <div className="description">{plainText(moment([2012, 2, 19]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-d3js-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("D3.js")}</div>
            <div className="description">{plainText(moment([2017, 11, 7]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-webpack-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Webpack")}</div>
            <div className="description">{plainText(moment([2017, 11, 5]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-babel-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Babel")}</div>
            <div className="description">{plainText(moment([2017, 11, 5]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-nodejs-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Node.js")}</div>
            <div className="description">{plainText(moment([2015, 0, 5]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-php-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("PHP (&lt; 7)")}</div>
            <div className="description">{plainText(moment([2005, 5, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-wordpress-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("WordPress")}</div>
            <div className="description">{plainText(moment([2005, 5, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-csharp-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("C#")}</div>
            <div className="description">{richText("for desktop apps and ASP.NET apps")}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-java-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Java (&lt; 8)")}</div>
            <div className="description">
              {plainText(moment([2008, 5, 1]).toNow(true))}
              {richText(", for robot and desktop apps and browser applets")}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-java-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Processing")}</div>
            <div className="description">
              {plainText(moment([2008, 5, 1]).toNow(true))}
              {richText(", mostly for robot apps using ")}
              <a href={href(`${rootPath}phybots`)}>{richText("Phybots")}</a>
              {richText(" and ")}
              <a href={href(`${rootPath}picode`)}>{richText("Picode")}</a>
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-visualstudio-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("Visual Studio, Visual Studio Code")}</div>
            <div className="description">
              {plainText(moment([2008, 5, 1]).toNow(true))}
              {richText(" and since it was born, respectively")}
            </div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-mysql-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("MySQL")}</div>
            <div className="description">{plainText(moment([2005, 9, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large ellipsis horizontal icon"></i>
          <div className="content">
            <div className="header">{richText("Eclipse")}</div>
            <div className="description">{plainText(moment([2008, 5, 1]).toNow(true))}</div>
          </div>
        </div>
        <div className="item">
          <i className="large devicon-github-plain colored icon"></i>
          <div className="content">
            <div className="header">{richText("GitHub")}</div>
            <div className="description">
              {richText('see <a href="https://github.com/arcatdmz">my repos</a>')}
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
                {(() => {
                  const children199: ReactNode[] = [];
                  if (link === false) {
                    children199.push(
                      <>
                        <img
                          className="ui small left floated image"
                          src={`${rootPath}images/icons/${p.icon}`}
                        />
                      </>,
                    );
                  } else {
                    children199.push(
                      <>
                        <a className="ui small left floated image" href={href(link)}>
                          <img src={`${rootPath}images/icons/${p.icon}`} />
                        </a>
                      </>,
                    );
                  }
                  children199.push(
                    <>
                      <h3 className="ui header">{richText(p.getDesignTitle(lang))}</h3>
                    </>,
                  );
                  children199.push(
                    <>
                      {richParagraph(p.getDesignDescription(lang))}
                    </>,
                  );
                  if (p.images) {
                    children199.push(
                      <>
                        <div className="ui tiny images">
                          {(() => {
                            const children200: ReactNode[] = [];
                            for (const image of p.images) {
                              children200.push(
                                <>
                                  <a className="ui for-modal image">
                                    <img src={image} />
                                  </a>
                                </>,
                              );
                            }
                            return keyed(children200);
                          })()}
                        </div>
                      </>,
                    );
                  }
                  children199.push(
                    <>
                      <div className="ui horizontal list">
                        {(() => {
                          const children201: ReactNode[] = [];
                          children201.push(
                            <>
                              <div className="item">
                                <div className="ui basic label">
                                  <i className="calendar icon"></i>
                                  {plainText(p.getYearString(lang))}
                                </div>
                              </div>
                            </>,
                          );
                          const tags = p.getDesignTags(lang);
                          if (tags.length > 0) {
                            for (const tag of tags) {
                              children201.push(
                                <>
                                  <div className="item">{richText(tag)}</div>
                                </>,
                              );
                            }
                          }
                          return keyed(children201);
                        })()}
                      </div>
                    </>,
                  );
                  children199.push(
                    <>
                      <div className="ui clearing divider"></div>
                    </>,
                  );
                  return keyed(children199);
                })()}
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
            <link rel={"stylesheet"} href={href(`${rootPath}stylesheets/design.css`)} />
          </>
        }
        header={
          <>
            <div className="ui text fixed menu">
              <div className="menu" id={attribute("research-menu")}>
                <a className="item" href={href(basePath)}>
                  {(() => {
                    const children195: ReactNode[] = [];
                    children195.push(
                      <>
                        <i className="lab icon"></i>
                      </>,
                    );
                    if (en) {
                      children195.push(<>{richText("Back to research")}</>);
                    } else {
                      children195.push(<>{richText("研究")}</>);
                      children195.push(
                        <>
                          <span className="mobile hidden">{richText("に戻る")}</span>
                        </>,
                      );
                    }
                    return keyed(children195);
                  })()}
                </a>
              </div>
              <div className="right menu" id={attribute("design-menu")}>
                {<SiteRightHeaderMenu context={context} />}
              </div>
            </div>
          </>
        }
        mainHero={
          <>
            <div className="hero-unit">
              <h1 className="ui center aligned icon header">
                <i className="circular paint brush icon"></i>
                {plainText(title)}
              </h1>
              <div className="ui container">{richText(p.getDescription(lang))}</div>
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
                <a className="item" href={href("#body")}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{plainText(en ? "Top" : "トップ")}</div>
                </a>
                <a className="item" href={href(`#portfolio`)}>
                  <i className="history icon"></i>
                  <div className="content">{plainText(en ? "Portfolio" : "ポートフォリオ")}</div>
                </a>
                <a className="item" href={href(`#skillset`)}>
                  <i className="user icon"></i>
                  <div className="content">{plainText(en ? "Skillset" : "スキルセット")}</div>
                </a>
              </div>
            </div>
            <div className="ui large modal">
              <div className="header">{richText("Header")}</div>
              <div className="image content">
                <img className="image" />
              </div>
            </div>
          </>
        }
      >
        <section id={attribute("portfolio")}>{renderPortfolio()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("skillset")}>{renderSkillset()}</section>
      </SiteLayout>
    </>
  );
}
