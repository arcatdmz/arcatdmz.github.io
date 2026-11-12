import { Menu } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SiteComponentProps } from "@/site/components/layout/types";
import { SiteLink } from "@/site/components/links/SiteLink";
import { SiteImage } from "@/site/components/media/SiteImage";
import type { Project } from "@/site/types";

export function ProjectMenuItem({
  context,
  project,
}: SiteComponentProps & { project: Project }) {
  const link = project.getLink(context.lang, context.basePath);
  return (
    <Menu.Item as={SiteLink} href={typeof link === "string" ? link : undefined}>
      {project.icon && (
        <SiteImage
          ui
          avatar
          src={`${context.rootPath}images/icons/${project.icon}`}
        />
      )}
      <HtmlContent html={project.getTitle(context.lang)} />
    </Menu.Item>
  );
}
