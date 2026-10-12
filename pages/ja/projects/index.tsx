import { Popup } from "@/site/components/SiteWidgets";
import { ProjectItem } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { keyed, href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from ja/projects/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projects, rootPath } = data;
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
  function renderPublicationsMenu(): ReactNode {
    return (
      <>
        <div className="ui divided list">
          <a className="item" href={"#research"}>
            <i className="lab icon"></i>
            <div className="content">{en ? "Research" : "研究"}</div>
          </a>
          <a className="item" href={"#design-and-engineering"}>
            <i className="paint brush icon"></i>
            <div className="content">
              {en ? "Design and Engineering" : "デザイン・開発"}
            </div>
          </a>
        </div>
      </>
    );
  }
  function renderAbout(): ReactNode {
    return (
      <>
        <div className="ui basic segment" id={"about"}>
          <p>
            {
              "このページでは加藤が関わってきた研究・開発・デザインに関するプロジェクトの一覧を見ることができます。グラフィックデザインとインタラクションデザインに絞った一覧は"
            }
            <SiteLink href={href(`${rootPath}ja/design`)}>
              <i className="paint brush icon"></i>
              {"デザイン"}
            </SiteLink>
            {"のページでも確認できます。"}
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
            {en ? "Research projects" : "研究プロジェクト"}
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "研究者として、所属先の東京大学、Microsoft Research、産業技術総合研究所、アーチで取り組んできた研究プロジェクトの一覧です。"
            }
          </p>
          <div className="ui divided items projects" id={"other-projects-list"}>
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
                children246.push(
                  <>
                    <ProjectItem p={p} />
                  </>,
                );
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
            {en
              ? "Design and/or engineering projects"
              : "デザイン・開発プロジェクト"}
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "デザインや開発に主眼が置かれたプロジェクトです。趣味またはプロボノ的活動として取り組んできました。"
            }
          </p>
          <div
            className="ui divided items projects"
            id={"design-and-engineering-projects-list"}
          >
            {(() => {
              const children247: ReactNode[] = [];
              for (const p of projects) {
                if (p.isPrivateProject(lang) || p.category !== "private")
                  continue;
                children247.push(
                  <>
                    <ProjectItem p={p} />
                  </>,
                );
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
            <Popup className="ui hidden popup-menu popup" position="top left" trigger={<a className="ui circular icon popup-menu large grey hidden mobile-only button">
              <i className="sidebar icon"></i>
            </a>}>
              {renderPublicationsMenu()}
            </Popup>
          </>
        }
      >
        <div className="left-rail">{renderPublicationsMenu()}</div>
        <div className="right-content">
          <h1 className="ui header">
            <i className="gift icon"></i>
            <div className="content">{en ? "Projects" : "プロジェクト"}</div>
          </h1>
          {renderAbout()}
          <div className="ui hidden divider"></div>
          <section id={"research"}>{renderResearch()}</section>
          <div className="ui hidden divider"></div>
          <section id={"design-and-engineering"}>
            {renderDesignAndEngineering()}
          </section>
        </div>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/ja/projects/") }, "/ja/projects/") };
}
