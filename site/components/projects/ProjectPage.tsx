import type { ReactNode } from "react";

import { SiteLayout } from "@/site/components/layout/SiteLayout";
import { ProjectHeader } from "@/site/components/projects/ProjectHeader";
import { ProjectPublications } from "@/site/components/projects/ProjectPublications";
import { hydratePageData, type PageDataProps } from "@/site/page-data";

/** Standard project chrome; authored components only supply their content. */
export function ProjectPage({
  pageData,
  project,
  children,
}: PageDataProps & { project: string; children: ReactNode }) {
  const data = hydratePageData(pageData);
  const lang = pageData.language;
  const en = lang === "en";
  const p = data.projectsTable[project];
  return (
    <SiteLayout
      context={{
        ...data,
        lang,
        en,
        basePath: data.rootPath + (en ? "" : "ja/"),
        author: en ? "Jun Kato" : "加藤 淳",
        me: `${project}/`,
        p,
        title: p.getTitle(lang),
      }}
    >
      <ProjectHeader project={project} />
      {children}
      <ProjectPublications project={project} />
    </SiteLayout>
  );
}
