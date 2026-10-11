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

/** React page migrated from ja/projects/index.pug; edit this TSX source directly. */
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
            <div className="content">
              {plainText(en ? "Design and Engineering" : "デザイン・開発")}
            </div>
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
            {richText(
              "このページでは加藤が関わってきた研究・開発・デザインに関するプロジェクトの一覧を見ることができます。グラフィックデザインとインタラクションデザインに絞った一覧は",
            )}
            <a href={href(`${rootPath}ja/design`)}>
              <i className="paint brush icon"></i>
              {richText("デザイン")}
            </a>
            {richText("のページでも確認できます。")}
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
          <div className="content">
            {plainText(en ? "Research projects" : "研究プロジェクト")}
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "研究者として、所属先の東京大学、Microsoft Research、産業技術総合研究所、アーチで取り組んできた研究プロジェクトの一覧です。",
            )}
          </p>
          <div
            className="ui divided items projects"
            id={attribute("other-projects-list")}
          >
            {(() => {
              const children246: ReactNode[] = [];
              for (const p of projects) {
                if (
                  p.isPrivateProject(lang) ||
                  p.category === "concept" ||
                  p.category === "committee" ||
                  p.category === "private"
                )
                  continue;
                children246.push(<>{content.renderProjectItem(p)}</>);
              }
              return keyed(children246);
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
            {plainText(
              en
                ? "Design and/or engineering projects"
                : "デザイン・開発プロジェクト",
            )}
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "デザインや開発に主眼が置かれたプロジェクトです。趣味またはプロボノ的活動として取り組んできました。",
            )}
          </p>
          <div
            className="ui divided items projects"
            id={attribute("design-and-engineering-projects-list")}
          >
            {(() => {
              const children247: ReactNode[] = [];
              for (const p of projects) {
                if (p.isPrivateProject(lang) || p.category !== "private")
                  continue;
                children247.push(<>{content.renderProjectItem(p)}</>);
              }
              return keyed(children247);
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
            <div className="ui hidden popup-menu popup">
              {renderPublicationsMenu()}
            </div>
          </>
        }
      >
        <div className="left-rail">{renderPublicationsMenu()}</div>
        <div className="right-content">
          <h1 className="ui header">
            <i className="gift icon"></i>
            <div className="content">
              {plainText(en ? "Projects" : "プロジェクト")}
            </div>
          </h1>
          {renderAbout()}
          <div className="ui hidden divider"></div>
          <section id={attribute("research")}>{renderResearch()}</section>
          <div className="ui hidden divider"></div>
          <section id={attribute("design-and-engineering")}>
            {renderDesignAndEngineering()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}
