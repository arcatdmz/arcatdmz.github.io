import type { Language } from "./page-data";

interface RepresentativeProject {
  project: string;
  getPublications(language: Language): string[];
  getTitle(language: Language): string;
  getLink(language: Language, basePath: string): string | boolean;
  isPrivateProject(language: Language): boolean;
}
export interface PublicationProjectLink {
  href: string;
  title: string;
}

/** A shared representative can point to another project's detailed description.
 * Prefer the paper's owning project; otherwise keep the authored project order. */
export function publicationProjectLinks(
  current: RepresentativeProject,
  projects: RepresentativeProject[],
  publications: Record<string, { entryTags?: { project?: string } }>,
  language: Language,
  basePath: string,
): Record<string, PublicationProjectLink> {
  const links: Record<string, PublicationProjectLink> = {};
  for (const key of current.getPublications(language)) {
    const owner = publications[key]?.entryTags?.project;
    if (owner?.includes(current.project)) continue;
    const candidates = projects.filter(
      (p) =>
        p.project &&
        p.project !== current.project &&
        !p.isPrivateProject(language) &&
        p.getPublications(language).includes(key),
    );
    const ordered = [
      ...candidates.filter((p) => p.project === owner),
      ...candidates.filter((p) => p.project !== owner),
    ];
    for (const candidate of ordered) {
      const href = candidate.getLink(language, basePath);
      if (typeof href !== "string" || !href) continue;
      links[key] = { href, title: candidate.getTitle(language) };
      break;
    }
  }
  return links;
}
