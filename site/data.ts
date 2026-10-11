import moment from "moment";
import website from "../website.json";
import histories from "../src/javascripts/histories";
import awards from "../src/javascripts/awards";
import talks from "../src/javascripts/talks";
import lectures from "../src/javascripts/lectures";
import projects from "../src/javascripts/projects";
import { parse as parsePublications } from "../src/javascripts/publications";
import media from "../src/javascripts/media";
import rawMisc from "../src/data/misc.json";
import rawPublications from "./generated/publications.json";

/**
 * Preserve the existing data models, including their formatting methods and Date
 * values. Only the former build-time ${rootPath} substitution moves here. This
 * module deliberately has no Node-only imports, so Next can use it on either side.
 */
function replaceRootPath(
  value: unknown,
  visited = new WeakSet<object>(),
): void {
  if (!value || typeof value !== "object" || visited.has(value)) return;
  visited.add(value);
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "string") {
      (value as Record<string, unknown>)[key] = item
        .split("${rootPath}")
        .join(website.rootPath);
    } else {
      replaceRootPath(item, visited);
    }
  }
}

const publications = parsePublications(
  rawPublications as Parameters<typeof parsePublications>[0],
);
const misc = structuredClone(rawMisc);
replaceRootPath({ histories, awards, talks, lectures, projects, media, misc });

type Project = (typeof projects)[number];
type Publication = (typeof publications)[number];
type Media = (typeof media)[number];
const projectsTable: Record<string, Project> = Object.fromEntries(
  projects.map((entry) => [entry.project, entry]),
);
const publicationsTable: Record<string, Publication> = Object.fromEntries(
  publications.map((entry) => [entry.citationKey, entry]),
);

function flattenMedia(entries: Media[]): Media[] {
  return entries.flatMap((entry) => [
    entry,
    ...flattenMedia(entry.related || []),
  ]);
}
function sortMedia(a: Media, b: Media): number {
  if (a.date || b.date) {
    if (!a.date) return 1;
    if (!b.date) return -1;
    const difference = b.date.getTime() - a.date.getTime();
    if (difference) return difference;
  }
  return (a.related?.length || 0) - (b.related?.length || 0);
}

const mediaList = flattenMedia(media).sort(sortMedia);
media.sort(sortMedia);

const siteData = {
  histories,
  awards,
  talks,
  lectures,
  projects,
  projectsTable,
  products: website.products.map((key) => projectsTable[key]),
  selectedProjects: website.selectedProjects.map((key) => projectsTable[key]),
  publications,
  publicationsTable,
  selectedPublications: website.selectedPublications.map(
    (key) => publicationsTable[key],
  ),
  media,
  mediaList,
  misc,
  moment,
  protocol: website.protocol,
  domain: website.domain,
  rootPath: website.rootPath,
  defaultImageUrl: website.defaultImageUrl,
  defaultDescription: website.defaultDescription,
  defaultJapaneseDescription: website.defaultJapaneseDescription,
  stripTags: (text: string): string => text.replace(/(<([^>]+)>)/gi, ""),
};

export type SiteData = typeof siteData;
export function getSiteData(): SiteData {
  return siteData;
}
export const setupLocals = getSiteData;
