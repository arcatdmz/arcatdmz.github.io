import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from projects/index.pug; edit this TSX source directly. */
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

  title = en ? "Projects" : "プロジェクト";
  me = "projects/";
  bodyClass = "with-rail";
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
  function renderPublicationsMenu(): ReactNode {
    return (
      <>
        <div className="ui divided list">
          <a className="item" href={href("#research")}>
            <i className="lab icon"></i>
            <div className="content">{plainText(en ? "Research" : "研究")}</div>
          </a>
          <a className="item" href={href("#design-and-engineering")}>
            <i className="paint brush icon"></i>
            <div className="content">{plainText(en ? "Design and Engineering" : "デザイン・開発")}</div>
          </a>
        </div>
      </>
    );
  }
  function renderAbout(): ReactNode {
    return (
      <>
        <div className="ui basic segment" id={attribute("about")}>
          <p>
            {richText("This page shows the list of research projects. See ")}
            <a href={href(`${rootPath}design`)}>
              <i className="paint brush icon"></i>
              {richText("Design")}
            </a>
            {richText(" for the design-oriented list of my projects.")}
          </p>
        </div>
      </>
    );
  }
  function renderResearch(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="lab icon"></i>
          <div className="content">{plainText(en ? "Research projects" : "研究プロジェクト")}</div>
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "The following research-oriented projects have been conducted under a certain scientific context and most of them have been published at archival venues.",
            )}
          </p>
          <div className="ui divided items projects" id={attribute("other-projects-list")}>
            {(() => {
              const children133: ReactNode[] = [];
              for (const p of projects) {
                if (
                  p.isPrivateProject(lang) ||
                  p.category === "concept" ||
                  p.category === "committee" ||
                  p.category === "private"
                )
                  continue;
                children133.push(<>{content.renderProjectItem(p)}</>);
              }
              return keyed(children133);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderDesignAndEngineering(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="paint brush icon"></i>
          <div className="content">
            {plainText(en ? "Design and/or engineering projects" : "デザイン・開発プロジェクト")}
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "The following design and engineering projects have been conducted as part of my hobby or probono activities.",
            )}
          </p>
          <div
            className="ui divided items projects"
            id={attribute("design-and-engineering-projects-list")}
          >
            {(() => {
              const children134: ReactNode[] = [];
              for (const p of projects) {
                if (p.isPrivateProject(lang) || p.category !== "private") continue;
                children134.push(<>{content.renderProjectItem(p)}</>);
              }
              return keyed(children134);
            })()}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden mobile-only button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">{renderPublicationsMenu()}</div>
          </>
        }
      >
        <div className="left-rail">{renderPublicationsMenu()}</div>
        <div className="right-content">
          <h1 className="ui header">
            <i className="gift icon"></i>
            <div className="content">{plainText(en ? "Projects" : "プロジェクト")}</div>
          </h1>
          {renderAbout()}
          <div className="ui hidden divider"></div>
          <section id={attribute("research")}>{renderResearch()}</section>
          <div className="ui hidden divider"></div>
          <section id={attribute("design-and-engineering")}>{renderDesignAndEngineering()}</section>
        </div>
      </SiteLayout>
    </>
  );
}
