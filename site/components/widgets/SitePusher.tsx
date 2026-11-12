import { type HTMLAttributes } from "react";
import { Sidebar as FomanticSidebar } from "react-fomantic-ui";

import { useWidgets } from "@/site/hooks/useWidgets";

export function SitePusher(props: HTMLAttributes<HTMLDivElement>) {
  const widgets = useWidgets();
  return <FomanticSidebar.Pusher {...props} dimmed={!!widgets?.sidebar} />;
}
