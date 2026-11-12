import { useContext } from "react";

import {
  pageContext,
  type PageContext,
} from "@/site/components/layout/SiteContext";
export function useSiteContext(): PageContext {
  const context = useContext(pageContext);
  if (!context)
    throw new Error("Site content must be rendered inside SiteLayout");
  return context;
}
