import { useContext } from "react";

import { WidgetContext } from "@/site/components/widgets/WidgetContext";
export function useWidgets() {
  return useContext(WidgetContext);
}
