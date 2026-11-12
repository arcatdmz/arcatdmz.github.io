import { createContext } from "react";

import type { SiteData } from "@/site/page-data";
import type { SiteContext } from "@/site/types";

export type PageContext = SiteData & SiteContext;

export const pageContext = createContext<PageContext | undefined>(undefined);

export const PageContextProvider = pageContext.Provider;
