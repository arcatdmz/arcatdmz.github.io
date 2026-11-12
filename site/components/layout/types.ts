import type { ReactNode } from "react";

import { type PageContext } from "@/site/components/layout/SiteContext";

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
