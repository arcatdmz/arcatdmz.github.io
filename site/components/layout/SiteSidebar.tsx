import { Divider, Icon, Menu } from "react-fomantic-ui";

import { getItemClass } from "@/site/components/layout/getItemClass";
import { ProjectMenuItem } from "@/site/components/layout/ProjectMenuItem";
import { SiteSidebarProps } from "@/site/components/layout/types";
import { SiteLink } from "@/site/components/links/SiteLink";
import { SiteImage } from "@/site/components/media/SiteImage";
import { alternateLanguageHref } from "@/site/navigation";

export function SiteSidebar({
  context,
  projectsSidebarMenu,
}: SiteSidebarProps) {
  const { basePath, en, products, rootPath } = context;
  const languageHref = alternateLanguageHref(context);

  return (
    <>
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "")}
        href={basePath}
      >
        <SiteImage ui avatar src={`${rootPath}images/junkato.jpg`} />
        {en ? "Top page" : "トップ"}
      </Menu.Item>
      <Menu.Item
        as={SiteLink}
        href={`https://blog.junkato.jp/${en ? "" : "ja"}`}
      >
        <Icon name="pencil" />
        {en ? "Blog" : "ブログ"}
      </Menu.Item>
      <Menu.Item as={SiteLink} href={`${basePath}#contact`}>
        <Icon name="address card" />
        {en ? "Contact" : "連絡先"}
      </Menu.Item>
      {projectsSidebarMenu !== undefined ? (
        projectsSidebarMenu
      ) : (
        <Menu.Item as="div">
          <Icon name="gift" />
          {en ? "Projects" : "プロジェクト"}
          <Menu.Menu>
            <Menu.Item as={SiteLink} href={`${basePath}projects`}>
              {en ? "List of projects" : "プロジェクト一覧"}
            </Menu.Item>
            <Divider />
            {products.map((project) => (
              <ProjectMenuItem
                key={project.project}
                context={context}
                project={project}
              />
            ))}
            <Divider />
            <Menu.Item as={SiteLink} href={`${basePath}projects/#research`}>
              {en ? "Research projects" : "研究プロジェクト"}
            </Menu.Item>
            <Menu.Item
              as={SiteLink}
              href={`${basePath}projects/#design-and-engineering`}
            >
              {en
                ? "Design and Engineering projects"
                : "デザイン・開発プロジェクト"}
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      )}
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "publications/")}
        href={`${basePath}publications`}
      >
        <Icon name="file text" />
        {en ? "Publications" : "発表文献"}
      </Menu.Item>
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "design/")}
        href={`${basePath}design`}
      >
        <Icon name="paint brush" />
        {en ? "Design" : "デザイン"}
      </Menu.Item>
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "activities/")}
        href={`${basePath}activities`}
      >
        <Icon name="student" />
        {en ? "Activities" : "職務活動"}
      </Menu.Item>
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "timeline/")}
        href={`${basePath}timeline`}
      >
        <Icon name="history" />
        {en ? "Timeline" : "活動履歴"}
      </Menu.Item>
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "collaborations/")}
        href={`${basePath}collaborations`}
      >
        <Icon name="handshake" />
        {en ? "Collaborations" : "共同研究"}
      </Menu.Item>
      {languageHref && (
        <Menu.Item as={SiteLink} href={languageHref}>
          <Icon name="translate" />
          {en ? "日本語" : "English"}
        </Menu.Item>
      )}
    </>
  );
}
