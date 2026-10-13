import { SiteImage } from "./SiteImage";
import {
  Dropdown,
  SidebarButton,
  Sidebar,
  SitePusher,
  SiteWidgets,
} from "@/site/components/SiteWidgets";
import { SiteLink } from "@/site/components/SiteLink";
import { PageContextProvider, type PageContext } from "./SiteContext";
import { SitePathContext } from "./SiteLink";
import { buildYear } from "@/site/clock";
import type { ReactNode } from "react";
import type { Project, SiteContext } from "../types";
import { HtmlContent } from "@/site/components/RichText";
import { SiteHead } from "./SiteHead";
import { alternateLanguageHref } from "../navigation";

export interface SiteComponentProps {
  context: PageContext;
}

export interface SiteSidebarProps extends SiteComponentProps {
  projectsSidebarMenu?: ReactNode;
}

export interface SiteHeaderProps extends SiteComponentProps {
  projectsHeaderMenu?: ReactNode;
}

export interface SiteLayoutProps extends SiteSidebarProps, SiteHeaderProps {
  children?: ReactNode;
  head?: ReactNode;
  header?: ReactNode;
  mainHero?: ReactNode;
  mainContainer?: ReactNode;
  postFooter?: ReactNode;
}

/** Preserve the template's prefix matching, including its inactive home link. */
export function getItemClass(me: string, path: string): string | undefined {
  return me && path.indexOf(me) === 0 ? "active" : undefined;
}

function itemClass(
  context: SiteContext,
  classes: string,
  path: string,
): string {
  const active = getItemClass(context.me, path);
  return active ? `${classes} ${active}` : classes;
}

function ProjectMenuItem({
  context,
  project,
}: SiteComponentProps & { project: Project }) {
  const link = project.getLink(context.lang, context.basePath);
  return (
    <SiteLink
      className="item"
      href={typeof link === "string" ? link : undefined}
    >
      {project.icon && (
        <SiteImage
          className="ui avatar image"
          src={`${context.rootPath}images/icons/${project.icon}`}
        />
      )}
      <HtmlContent html={project.getTitle(context.lang)} />
    </SiteLink>
  );
}

export function SiteSidebar({
  context,
  projectsSidebarMenu,
}: SiteSidebarProps) {
  const { basePath, en, products, rootPath } = context;
  const languageHref = alternateLanguageHref(context);

  return (
    <>
      <SiteLink className={itemClass(context, "item", "")} href={basePath}>
        <SiteImage
          className="ui avatar image"
          src={`${rootPath}images/junkato.jpg`}
        />
        {en ? "Top page" : "トップ"}
      </SiteLink>
      <SiteLink
        className="item"
        href={`https://blog.junkato.jp/${en ? "" : "ja"}`}
      >
        <i className="pencil icon" />
        {en ? "Blog" : "ブログ"}
      </SiteLink>
      <SiteLink className="item" href={`${basePath}#contact`}>
        <i className="address card icon" />
        {en ? "Contact" : "連絡先"}
      </SiteLink>
      {projectsSidebarMenu !== undefined ? (
        projectsSidebarMenu
      ) : (
        <div className="ui item" {...{ href: `${basePath}projects` }}>
          <i className="gift icon" />
          {en ? "Projects" : "プロジェクト"}
          <div className="menu">
            <SiteLink className="item" href={`${basePath}projects`}>
              {en ? "List of projects" : "プロジェクト一覧"}
            </SiteLink>
            <div className="ui divider" />
            {products.map((project) => (
              <ProjectMenuItem
                key={project.project}
                context={context}
                project={project}
              />
            ))}
            <div className="ui divider" />
            <SiteLink className="item" href={`${basePath}projects/#research`}>
              {en ? "Research projects" : "研究プロジェクト"}
            </SiteLink>
            <SiteLink
              className="item"
              href={`${basePath}projects/#design-and-engineering`}
            >
              {en
                ? "Design and Engineering projects"
                : "デザイン・開発プロジェクト"}
            </SiteLink>
          </div>
        </div>
      )}
      <SiteLink
        className={itemClass(context, "item", "publications/")}
        href={`${basePath}publications`}
      >
        <i className="text file icon" />
        {en ? "Publications" : "発表文献"}
      </SiteLink>
      <SiteLink
        className={itemClass(context, "item", "design/")}
        href={`${basePath}design`}
      >
        <i className="paint brush icon" />
        {en ? "Design" : "デザイン"}
      </SiteLink>
      <SiteLink
        className={itemClass(context, "item", "activities/")}
        href={`${basePath}activities`}
      >
        <i className="student icon" />
        {en ? "Activities" : "職務活動"}
      </SiteLink>
      <SiteLink
        className={itemClass(context, "item", "timeline/")}
        href={`${basePath}timeline`}
      >
        <i className="history icon" />
        {en ? "Timeline" : "活動履歴"}
      </SiteLink>
      <SiteLink
        className={itemClass(context, "item", "collaborations/")}
        href={`${basePath}collaborations`}
      >
        <i className="handshake icon" />
        {en ? "Collaborations" : "共同研究"}
      </SiteLink>
      {languageHref && (
        <SiteLink className="item" href={languageHref}>
          <i className="translate icon" />
          {en ? "日本語" : "English"}
        </SiteLink>
      )}
    </>
  );
}

export function SiteHeader({ context, projectsHeaderMenu }: SiteHeaderProps) {
  const { author, basePath, en, products, projects } = context;

  return (
    <div className="ui top fixed menu" id="fixed-menu">
      <SiteLink className={itemClass(context, "item", "")} href={basePath}>
        <span className="mobile hidden">{author}</span>
        <span className="print-hidden mobile only">
          <i className="user icon" />
        </span>
      </SiteLink>
      {projectsHeaderMenu !== undefined ? (
        projectsHeaderMenu
      ) : (
        <Dropdown
          className="ui dropdown mobile hidden item"
          {...{ href: `${basePath}projects` }}
        >
          <i className="gift icon" />
          <span className="print-hidden tablet or lower hidden">
            {en ? "Projects" : "プロジェクト"}
          </span>
          <div className="menu">
            <SiteLink className="item" href={`${basePath}projects`}>
              {en ? "List of projects" : "プロジェクト一覧"}
            </SiteLink>
            <div className="ui divider" />
            {(
              context.headerProducts ||
              projects.filter((project) => products.includes(project))
            ).map((project) => (
              <ProjectMenuItem
                key={project.project}
                context={context}
                project={project}
              />
            ))}
            <div className="ui divider" />
            <SiteLink className="item" href={`${basePath}projects/#research`}>
              {en ? "Research" : "研究"}
            </SiteLink>
            <SiteLink
              className="item"
              href={`${basePath}projects/#design-and-engineering`}
            >
              {en ? "Design and engineering" : "デザイン・開発"}
            </SiteLink>
          </div>
        </Dropdown>
      )}
      <SiteLink
        className={itemClass(context, "mobile hidden item", "publications/")}
        href={`${basePath}publications`}
      >
        <i className="text file icon" />
        <span className="print-hidden tablet or lower hidden">
          {en ? "Publications" : "発表文献"}
        </span>
      </SiteLink>
      <SiteLink
        className={itemClass(context, "mobile hidden item", "design/")}
        href={`${basePath}design`}
      >
        <i className="paint brush icon" />
        <span
          className={`print-hidden ${
            en ? "tablet" : "computer"
          } or lower hidden`}
        >
          {en ? "Design" : "デザイン"}
        </span>
      </SiteLink>
      <SiteLink
        className={itemClass(context, "mobile hidden item", "activities/")}
        href={`${basePath}activities`}
      >
        <i className="student icon" />
        <span
          className={`print-hidden ${
            en ? "tablet" : "computer"
          } or lower hidden`}
        >
          {en ? "Activities" : "職務活動"}
        </span>
      </SiteLink>
      <SiteLink
        className={itemClass(context, "mobile hidden item", "timeline/")}
        href={`${basePath}timeline`}
      >
        <i className="history icon" />
        <span className="print-hidden computer or lower hidden">
          {en ? "Timeline" : "活動履歴"}
        </span>
      </SiteLink>
      <SiteLink
        className={itemClass(context, "mobile hidden item", "collaborations/")}
        href={`${basePath}collaborations`}
      >
        <i className="handshake icon" />
        <span className="print-hidden computer or lower hidden">
          {en ? "Collaborations" : "共同研究"}
        </span>
      </SiteLink>
      <div className="right menu">
        <SiteRightHeaderMenu context={context} />
      </div>
    </div>
  );
}

export function SiteRightHeaderMenu({ context }: SiteComponentProps) {
  const { en } = context;
  const languageHref = alternateLanguageHref(context);
  return (
    <>
      <SiteLink
        className="item"
        href={`https://blog.junkato.jp/${en ? "" : "ja"}`}
      >
        <i className="pencil icon" />
        <span className="print-hidden tablet or lower hidden">{` ${
          en ? "Blog" : "ブログ"
        }`}</span>
      </SiteLink>
      {languageHref && (
        <SiteLink className="item" href={languageHref}>
          <i className="translate icon" />
          <span className="print-hidden">{en ? "日本語" : "English"}</span>
        </SiteLink>
      )}
      <SidebarButton className="item print-hidden sidebar-button" href="#">
        <i className="sidebar icon" />
        <span className="widescreen monitor only">
          {en ? "Menu" : "メニュー"}
        </span>
      </SidebarButton>
    </>
  );
}

export function SiteFooter({ context }: SiteComponentProps) {
  const { basePath, en } = context;
  const languageHref = alternateLanguageHref(context);
  return (
    <footer className="ui center aligned basic segment">
      <div className="ui container">
        <div className="ui divider" />
        <div className="ui horizontal divided list">
          <div className="item">
            {"© "}
            <SiteLink href={`${basePath}#contact`}>
              {en ? "Jun Kato" : "加藤 淳"}
            </SiteLink>
          </div>
          <div className="item">{`2012-${buildYear}`}</div>
          <div className="item">
            <SiteLink href={`${basePath}privacy`}>
              <i className="envelope open outline icon" />
              {` ${en ? "Privacy Policy" : "プライバシーポリシー"}`}
            </SiteLink>
          </div>
          {languageHref && (
            <div className="item">
              <SiteLink className="item" href={languageHref}>
                <i className="translate icon" />
                {en ? " 日本語" : "English"}
              </SiteLink>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

/** Shared document body structure; the Pages router owns html and body. */
export function SiteLayout({
  context,
  children,
  head,
  header,
  projectsSidebarMenu,
  projectsHeaderMenu,
  mainHero,
  mainContainer,
  postFooter,
}: SiteLayoutProps) {
  return (
    <PageContextProvider value={context}>
      <SitePathContext.Provider value={`${context.basePath}${context.me}`}>
        <SiteWidgets>
          <SiteHead context={context}>{head}</SiteHead>
          <Sidebar className="ui right sidebar inverted vertical menu">
            <SiteSidebar
              context={context}
              projectsSidebarMenu={projectsSidebarMenu}
            />
          </Sidebar>
          {header !== undefined ? (
            header
          ) : (
            <SiteHeader
              context={context}
              projectsHeaderMenu={projectsHeaderMenu}
            />
          )}
          <SitePusher id="pusher" className="pusher">
            <div id="body">
              {mainContainer !== undefined ? (
                mainContainer
              ) : (
                <>
                  {mainHero}
                  <div className="ui container" id="main">
                    {children}
                  </div>
                  <SiteFooter context={context} />
                </>
              )}
            </div>
          </SitePusher>
          <div id="post-footer">{postFooter}</div>
        </SiteWidgets>
      </SitePathContext.Provider>
    </PageContextProvider>
  );
}
