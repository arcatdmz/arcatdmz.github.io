import {
  Sidebar as FomanticSidebar,
  Menu,
  type SidebarProps,
} from "react-fomantic-ui";

import { useWidgets } from "@/site/hooks/useWidgets";

export function SiteSidebarPanel({ children, ...props }: SidebarProps) {
  const widgets = useWidgets();
  return (
    <FomanticSidebar
      {...props}
      as={Menu}
      animation="uncover"
      direction="right"
      visible={!!widgets?.sidebar}
      id="site-sidebar"
      inert={!widgets?.sidebar}
      aria-label="Site navigation"
      onHide={() => widgets?.setSidebar(false)}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if ((event.target as Element).closest("a[href]"))
          widgets?.setSidebar(false);
      }}
    >
      {children}
    </FomanticSidebar>
  );
}
