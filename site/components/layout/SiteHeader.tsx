import { Divider, Dropdown, Icon, Menu } from "react-fomantic-ui";

import { getItemClass } from "@/site/components/layout/getItemClass";
import { ProjectMenuItem } from "@/site/components/layout/ProjectMenuItem";
import { SiteRightHeaderMenu } from "@/site/components/layout/SiteRightHeaderMenu";
import { SiteHeaderProps } from "@/site/components/layout/types";
import { SiteLink } from "@/site/components/links/SiteLink";
import { NavigationDropdown } from "@/site/components/widgets/NavigationDropdown";

export function SiteHeader({ context, projectsHeaderMenu }: SiteHeaderProps) {
  const { author, basePath, en, products, projects } = context;

  return (
    <Menu fixed="top" id="fixed-menu">
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "")}
        href={basePath}
      >
        <span className="mobile hidden">{author}</span>
        <span className="print-hidden mobile only">
          <Icon name="user" />
        </span>
      </Menu.Item>
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
          <Dropdown.Menu>
            <Menu.Item as={SiteLink} href={`${basePath}projects`}>
              {en ? "List of projects" : "プロジェクト一覧"}
            </Menu.Item>
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
            <Menu.Item as={SiteLink} href={`${basePath}projects/#research`}>
              {en ? "Research" : "研究"}
            </Menu.Item>
            <Menu.Item
              as={SiteLink}
              href={`${basePath}projects/#design-and-engineering`}
            >
              {en ? "Design and engineering" : "デザイン・開発"}
            </Menu.Item>
          </Dropdown.Menu>
        </NavigationDropdown>
      )}
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "publications/")}
        className="mobile hidden"
        href={`${basePath}publications`}
      >
        <Icon name="file text" />
        <span className="print-hidden tablet or lower hidden">
          {en ? "Publications" : "発表文献"}
        </span>
      </Menu.Item>
      <Menu.Item
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
      </Menu.Item>
      <Menu.Item
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
      </Menu.Item>
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "timeline/")}
        className="mobile hidden"
        href={`${basePath}timeline`}
      >
        <Icon name="history" />
        <span className="print-hidden computer or lower hidden">
          {en ? "Timeline" : "活動履歴"}
        </span>
      </Menu.Item>
      <Menu.Item
        as={SiteLink}
        active={!!getItemClass(context.me, "collaborations/")}
        className="mobile hidden"
        href={`${basePath}collaborations`}
      >
        <Icon name="handshake" />
        <span className="print-hidden computer or lower hidden">
          {en ? "Collaborations" : "共同研究"}
        </span>
      </Menu.Item>
      <Menu.Menu position="right">
        <SiteRightHeaderMenu context={context} />
      </Menu.Menu>
    </Menu>
  );
}
