export interface ResearchProject {
  category?: string;
  private?: boolean;
  tags?: string[];
}
export interface ProjectFilterTag {
  key: string;
  label: string;
  title: string;
  count: number;
}
export function isResearchProject(project: ResearchProject): boolean {
  return (
    !project.private &&
    !["concept", "committee", "private"].includes(project.category || "")
  );
}
export function projectFilterTag(
  asPath: string,
  tags: ProjectFilterTag[],
): string {
  const value = new URL(asPath, "https://site.invalid").searchParams.get("tag");
  return tags.some((tag) => tag.key === value) ? value! : "";
}
export function projectFilterHref(asPath: string, tag: string): string {
  const url = new URL(asPath, "https://site.invalid");
  if (tag) url.searchParams.set("tag", tag);
  else url.searchParams.delete("tag");
  return `${url.pathname}${url.search}${url.hash}`;
}

/** A matching public topic overview is separate from the tagged research list. */
export function partitionProjectFilter<
  T extends ResearchProject & { project?: string },
>(
  research: T[],
  tag: string,
  matchingProject?: T,
): { featured: T | undefined; projects: T[] } {
  const featured =
    tag &&
    matchingProject?.project === tag &&
    !matchingProject.private &&
    !["private", "committee"].includes(matchingProject.category || "")
      ? matchingProject
      : undefined;
  return {
    featured,
    projects: research.filter(
      (p) =>
        (!tag || p.tags?.includes(tag)) &&
        (!featured || p.project !== featured.project),
    ),
  };
}

/** Runs before the static page is painted; React later removes the pending flag. */
export function projectFilterBootstrap(tags: string[]): string {
  const keys = JSON.stringify(tags).replace(/</g, "\\u003c");
  return `try{if(${keys}.includes(new URLSearchParams(window.location.search).get("tag"))){document.documentElement.setAttribute("data-project-filter-pending","");}}catch{}`;
}
