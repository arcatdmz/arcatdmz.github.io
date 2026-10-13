import { createContext, useContext } from "react";
import type { SiteData } from "../page-data";
import type { SiteContext } from "../types";

export type PageContext = SiteData & SiteContext;
const pageContext = createContext<PageContext | undefined>(undefined);
export const PageContextProvider = pageContext.Provider;
export function useSiteContext(): PageContext {
  const context = useContext(pageContext);
  if (!context)
    throw new Error("Site content must be rendered inside SiteLayout");
  return context;
}
