import { Container } from "react-fomantic-ui";

import { PageContextProvider } from "@/site/components/layout/SiteContext";
import { SiteFooter } from "@/site/components/layout/SiteFooter";
import { SiteHead } from "@/site/components/layout/SiteHead";
import { SiteHeader } from "@/site/components/layout/SiteHeader";
import { SiteSidebar } from "@/site/components/layout/SiteSidebar";
import { SiteLayoutProps } from "@/site/components/layout/types";
import { SitePathContext } from "@/site/components/links/SitePathContext";
import { SitePusher } from "@/site/components/widgets/SitePusher";
import { SiteSidebarPanel } from "@/site/components/widgets/SiteSidebarPanel";
import { SiteWidgets } from "@/site/components/widgets/SiteWidgets";

/** Shared document body structure; the Pages router owns html and body. */
export function SiteLayout({
  context,
  children,
  head,
  header,
  projectsSidebarMenu,
  projectsHeaderMenu,
  mainHero,
  mainContainer,
  postFooter,
}: SiteLayoutProps) {
  return (
    <PageContextProvider value={context}>
      <SitePathContext.Provider value={`${context.basePath}${context.me}`}>
        <SiteWidgets>
          <SiteHead context={context}>{head}</SiteHead>
          <SiteSidebarPanel inverted vertical>
            <SiteSidebar
              context={context}
              projectsSidebarMenu={projectsSidebarMenu}
            />
          </SiteSidebarPanel>
          {header !== undefined ? (
            header
          ) : (
            <SiteHeader
              context={context}
              projectsHeaderMenu={projectsHeaderMenu}
            />
          )}
          <SitePusher id="pusher">
            <div id="body">
              {mainContainer !== undefined ? (
                mainContainer
              ) : (
                <>
                  {mainHero}
                  <Container id="main">{children}</Container>
                  <SiteFooter context={context} />
                </>
              )}
            </div>
          </SitePusher>
          <div id="post-footer">{postFooter}</div>
        </SiteWidgets>
      </SitePathContext.Provider>
    </PageContextProvider>
  );
}
