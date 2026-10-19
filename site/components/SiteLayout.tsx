import {
  Container,
  Divider,
  DropdownMenu,
  Icon,
  List,
  ListItem,
  Menu,
  MenuItem,
  MenuMenu,
  Segment,
} from "react-fomantic-ui";

import { SiteImage } from "./SiteImage";
import {
  NavigationDropdown,
  SidebarButton,
  SiteSidebarPanel,
  SitePusher,
  SiteWidgets,
} from "@/site/components/SiteWidgets";
import { SiteLink } from "@/site/components/SiteLink";
import { PageContextProvider, type PageContext } from "./SiteContext";
import { SitePathContext } from "./SiteLink";
import { buildYear } from "@/site/clock";
import type { ReactNode } from "react";
import type { Project } from "../types";
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

function ProjectMenuItem({
  context,
  project,
}: SiteComponentProps & { project: Project }) {
  const link = project.getLink(context.lang, context.basePath);
  return (
    <MenuItem as={SiteLink} href={typeof link === "string" ? link : undefined}>
      {project.icon && (
        <SiteImage
          ui
          avatar
          src={`${context.rootPath}images/icons/${project.icon}`}
        />
      )}
      <HtmlContent html={project.getTitle(context.lang)} />
    </MenuItem>
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
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "")}
        href={basePath}
      >
        <SiteImage ui avatar src={`${rootPath}images/junkato.jpg`} />
        {en ? "Top page" : "トップ"}
      </MenuItem>
      <MenuItem
        as={SiteLink}
        href={`https://blog.junkato.jp/${en ? "" : "ja"}`}
      >
        <Icon name="pencil" />
        {en ? "Blog" : "ブログ"}
      </MenuItem>
      <MenuItem as={SiteLink} href={`${basePath}#contact`}>
        <Icon name="address card" />
        {en ? "Contact" : "連絡先"}
      </MenuItem>
      {projectsSidebarMenu !== undefined ? (
        projectsSidebarMenu
      ) : (
        <MenuItem as="div">
          <Icon name="gift" />
          {en ? "Projects" : "プロジェクト"}
          <MenuMenu>
            <MenuItem as={SiteLink} href={`${basePath}projects`}>
              {en ? "List of projects" : "プロジェクト一覧"}
            </MenuItem>
            <Divider />
            {products.map((project) => (
              <ProjectMenuItem
                key={project.project}
                context={context}
                project={project}
              />
            ))}
            <Divider />
            <MenuItem as={SiteLink} href={`${basePath}projects/#research`}>
              {en ? "Research projects" : "研究プロジェクト"}
            </MenuItem>
            <MenuItem
              as={SiteLink}
              href={`${basePath}projects/#design-and-engineering`}
            >
              {en
                ? "Design and Engineering projects"
                : "デザイン・開発プロジェクト"}
            </MenuItem>
          </MenuMenu>
        </MenuItem>
      )}
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "publications/")}
        href={`${basePath}publications`}
      >
        <Icon name="file text" />
        {en ? "Publications" : "発表文献"}
      </MenuItem>
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "design/")}
        href={`${basePath}design`}
      >
        <Icon name="paint brush" />
        {en ? "Design" : "デザイン"}
      </MenuItem>
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "activities/")}
        href={`${basePath}activities`}
      >
        <Icon name="student" />
        {en ? "Activities" : "職務活動"}
      </MenuItem>
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "timeline/")}
        href={`${basePath}timeline`}
      >
        <Icon name="history" />
        {en ? "Timeline" : "活動履歴"}
      </MenuItem>
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "collaborations/")}
        href={`${basePath}collaborations`}
      >
        <Icon name="handshake" />
        {en ? "Collaborations" : "共同研究"}
      </MenuItem>
      {languageHref && (
        <MenuItem as={SiteLink} href={languageHref}>
          <Icon name="translate" />
          {en ? "日本語" : "English"}
        </MenuItem>
      )}
    </>
  );
}

export function SiteHeader({ context, projectsHeaderMenu }: SiteHeaderProps) {
  const { author, basePath, en, products, projects } = context;

  return (
    <Menu fixed="top" id="fixed-menu">
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "")}
        href={basePath}
      >
        <span className="mobile hidden">{author}</span>
        <span className="print-hidden mobile only">
          <Icon name="user" />
        </span>
      </MenuItem>
      {projectsHeaderMenu !== undefined ? (
        projectsHeaderMenu
      ) : (
        <NavigationDropdown
          className="mobile hidden"
          {...{ href: `${basePath}projects` }}
        >
          <Icon name="gift" />
          <span className="print-hidden tablet or lower hidden">
            {en ? "Projects" : "プロジェクト"}
          </span>
          <DropdownMenu>
            <MenuItem as={SiteLink} href={`${basePath}projects`}>
              {en ? "List of projects" : "プロジェクト一覧"}
            </MenuItem>
            <Divider />
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
            <Divider />
            <MenuItem as={SiteLink} href={`${basePath}projects/#research`}>
              {en ? "Research" : "研究"}
            </MenuItem>
            <MenuItem
              as={SiteLink}
              href={`${basePath}projects/#design-and-engineering`}
            >
              {en ? "Design and engineering" : "デザイン・開発"}
            </MenuItem>
          </DropdownMenu>
        </NavigationDropdown>
      )}
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "publications/")}
        className="mobile hidden"
        href={`${basePath}publications`}
      >
        <Icon name="file text" />
        <span className="print-hidden tablet or lower hidden">
          {en ? "Publications" : "発表文献"}
        </span>
      </MenuItem>
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "design/")}
        className="mobile hidden"
        href={`${basePath}design`}
      >
        <Icon name="paint brush" />
        <span
          className={`print-hidden ${
            en ? "tablet" : "computer"
          } or lower hidden`}
        >
          {en ? "Design" : "デザイン"}
        </span>
      </MenuItem>
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "activities/")}
        className="mobile hidden"
        href={`${basePath}activities`}
      >
        <Icon name="student" />
        <span
          className={`print-hidden ${
            en ? "tablet" : "computer"
          } or lower hidden`}
        >
          {en ? "Activities" : "職務活動"}
        </span>
      </MenuItem>
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "timeline/")}
        className="mobile hidden"
        href={`${basePath}timeline`}
      >
        <Icon name="history" />
        <span className="print-hidden computer or lower hidden">
          {en ? "Timeline" : "活動履歴"}
        </span>
      </MenuItem>
      <MenuItem
        as={SiteLink}
        active={!!getItemClass(context.me, "collaborations/")}
        className="mobile hidden"
        href={`${basePath}collaborations`}
      >
        <Icon name="handshake" />
        <span className="print-hidden computer or lower hidden">
          {en ? "Collaborations" : "共同研究"}
        </span>
      </MenuItem>
      <MenuMenu position="right">
        <SiteRightHeaderMenu context={context} />
      </MenuMenu>
    </Menu>
  );
}

export function SiteRightHeaderMenu({ context }: SiteComponentProps) {
  const { en } = context;
  const languageHref = alternateLanguageHref(context);
  return (
    <>
      <MenuItem
        as={SiteLink}
        href={`https://blog.junkato.jp/${en ? "" : "ja"}`}
      >
        <Icon name="pencil" />
        <span className="print-hidden tablet or lower hidden">{` ${
          en ? "Blog" : "ブログ"
        }`}</span>
      </MenuItem>
      {languageHref && (
        <MenuItem as={SiteLink} href={languageHref}>
          <Icon name="translate" />
          <span className="print-hidden">{en ? "日本語" : "English"}</span>
        </MenuItem>
      )}
      <SidebarButton className="print-hidden sidebar-button" href="#">
        <Icon name="sidebar" />
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
    <Segment basic textAlign="center" as="footer">
      <Container>
        <Divider />
        <List divided horizontal>
          <ListItem>
            {"© "}
            <SiteLink href={`${basePath}#contact`}>
              {en ? "Jun Kato" : "加藤 淳"}
            </SiteLink>
          </ListItem>
          <ListItem>{`2012-${buildYear}`}</ListItem>
          <ListItem>
            <SiteLink href={`${basePath}privacy`}>
              <Icon name="envelope open outline" />
              {` ${en ? "Privacy Policy" : "プライバシーポリシー"}`}
            </SiteLink>
          </ListItem>
          {languageHref && (
            <ListItem>
              <ListItem role="link" as={SiteLink} href={languageHref}>
                <Icon name="translate" />
                {en ? " 日本語" : "English"}
              </ListItem>
            </ListItem>
          )}
        </List>
      </Container>
    </Segment>
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
          <SiteSidebarPanel inverted vertical>
            <SiteSidebar
              context={context}
              projectsSidebarMenu={projectsSidebarMenu}
            />
          </SiteSidebarPanel>
          {header !== undefined ? (
            header
          ) : (
            <SiteHeader
              context={context}
              projectsHeaderMenu={projectsHeaderMenu}
            />
          )}
          <SitePusher id="pusher">
            <div id="body">
              {mainContainer !== undefined ? (
                mainContainer
              ) : (
                <>
                  {mainHero}
                  <Container id="main">{children}</Container>
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
