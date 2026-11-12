import { Menu, type MenuItemProps } from "react-fomantic-ui";

import { useWidgets } from "@/site/hooks/useWidgets";

export function SidebarButton({ children, ...props }: MenuItemProps) {
  const widgets = useWidgets();
  return (
    <Menu.Item
      as="a"
      {...props}
      role="button"
      aria-controls="site-sidebar"
      aria-expanded={widgets?.sidebar || false}
      onKeyDown={(event) => {
        if (event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
      onClick={(event) => {
        event.preventDefault();
        widgets?.setSidebar(!widgets.sidebar);
      }}
    >
      {children}
    </Menu.Item>
  );
}
