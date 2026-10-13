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

/** React page migrated from projects/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projects, rootPath } = data;
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
            {"This page shows the list of research projects. See "}
            <SiteLink href={href(`${rootPath}design`)}>
              <i className="paint brush icon"></i>
              {"Design"}
            </SiteLink>
            {" for the design-oriented list of my projects."}
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
              "The following research-oriented projects have been conducted under a certain scientific context and most of them have been published at archival venues."
            }
          </p>
          <div className="ui divided items projects" id={"other-projects-list"}>
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
                children133.push(
                  <>
                    <ProjectItem p={p} />
                  </>,
                );
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
            {en
              ? "Design and/or engineering projects"
              : "デザイン・開発プロジェクト"}
          </div>
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "The following design and engineering projects have been conducted as part of my hobby or probono activities."
            }
          </p>
          <div
            className="ui divided items projects"
            id={"design-and-engineering-projects-list"}
          >
            {(() => {
              const children134: ReactNode[] = [];
              for (const p of projects) {
                if (p.isPrivateProject(lang) || p.category !== "private")
                  continue;
                children134.push(
                  <>
                    <ProjectItem p={p} />
                  </>,
                );
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
  return { props: withPageImages(Page, { pageData: getPageData("/projects/") }, "/projects/") };
}
