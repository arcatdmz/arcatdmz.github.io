/** Locale-specific, route-scoped data sent by getStaticProps. No source datasets
 * or date-formatting libraries belong in this browser module. */
import website from "../website.json";
import { parse as parsePublications } from "../src/javascripts/publications";
import type { ImageManifest } from "./image-types";

export type Language = "en" | "ja";
export interface ProjectView {
  key: string;
  project?: string;
  icon?: string;
  hero?: string;
  year?: { from: number; to?: number };
  category?: string;
  tags?: string[];
  title: string;
  images?: string[];
  thumbnail: string;
  publication?: string;
  localizedTitle: string;
  subtitle?: string;
  description: string;
  designTitle: string;
  designDescription: string;
  members: string[];
  tagLabels: string[];
  designTagLabels: string[];
  url?: string | boolean;
  private?: boolean;
  yearLabel: string;
  designProject: boolean;
}
export interface DateView {
  parts: [number, number, number];
  dateType: number;
  label: string;
  fullLabel: string;
}
export interface EntryView {
  dates: DateView[];
  text: string;
  entryType?: string;
  funding?: string;
  isAward: boolean;
}
export interface HistoryView extends DateView {
  text: string;
}
export interface MediaView {
  date?: DateView;
  text: string;
  media: string;
  hasEnglish: boolean;
  englishText?: string;
  englishMedia?: string;
  permalink?: string;
  archive?: string;
  projects?: string[];
  tags?: string[];
  tagLabels: string[];
  draft?: boolean;
  private?: boolean;
  related?: MediaView[];
}
export interface PublicationView {
  citationKey: string;
  entryType: string;
  entryTags: Record<string, string>;
}
export interface PageDataSnapshot {
  language: Language;
  projects: ProjectView[];
  projectList: string[];
  products: string[];
  headerProducts: string[];
  selectedProjects: string[];
  publications: PublicationView[];
  publicationList: string[];
  selectedPublications: string[];
  histories: HistoryView[];
  historyCount: number;
  awards: EntryView[];
  talks: EntryView[];
  lectures: EntryView[];
  mediaList: MediaView[];
  mediaCount: number;
  misc: Record<string, any>;
  durations: Record<string, string>;
  images?: ImageManifest;
}
export interface PageDataProps {
  pageData: PageDataSnapshot;
}

function hydrateProject(view: ProjectView) {
  return {
    ...view,
    getThumbnail: (_lang?: Language) => view.thumbnail,
    getTitle: (_lang?: Language) => view.localizedTitle,
    getLongTitle: (_lang?: Language) =>
      view.subtitle
        ? `${view.localizedTitle}: ${view.subtitle}`
        : view.localizedTitle,
    getSubtitle: (_lang?: Language) => view.subtitle,
    getDescription: (_lang?: Language) => view.description,
    getDesignTitle: (_lang?: Language) => view.designTitle,
    getDesignDescription: (_lang?: Language) => view.designDescription,
    getTags: (_lang?: Language) => view.tagLabels,
    getDesignTags: (_lang?: Language) => view.designTagLabels,
    hasMembers: (_lang?: Language) => view.members.length > 0,
    getMembers: (_lang?: Language) => view.members,
    hasPublication: (_lang?: Language) => Boolean(view.publication),
    getPublication: (_lang?: Language) => view.publication,
    isPrivateProject: (_lang?: Language) => view.private,
    isDesignProject: () => view.designProject,
    getYearString: (_lang?: Language, _year?: number) => view.yearLabel,
    getLink: (_lang: Language, basePath: string) =>
      typeof view.url === "undefined" ? basePath + view.project : view.url,
  };
}
export type Project = ReturnType<typeof hydrateProject>;

function hydrateDate(view: DateView) {
  return {
    // Local calendar parts preserve both ordering and year grouping without
    // shifting a January entry in a visitor's timezone.
    date: new Date(...view.parts),
    dateType: view.dateType,
    getDateString: (_lang: string, full?: boolean) =>
      full ? view.fullLabel : view.label,
  };
}
function hydrateEntry(view: EntryView) {
  const dateObjs = view.dates.map(hydrateDate);
  return {
    ...dateObjs[0],
    text: view.text,
    entryType: view.entryType,
    isAward: view.isAward,
    data: { funding: view.funding },
    dateObjs,
    dates: dateObjs.map((date) => date.date),
    getText: (_lang: Language) => view.text,
    getDatesString: (lang: string, full?: boolean) =>
      dateObjs.map((date) => date.getDateString(lang, full)),
    getIconClass: () => (view.entryType === "domestic" ? "circle" : "world"),
  };
}
function hydrateMedia(view: MediaView) {
  return {
    ...view,
    ...(view.date
      ? hydrateDate(view.date)
      : { date: undefined, dateType: undefined }),
    getDateString: (_lang: string, full?: boolean) =>
      view.date ? (full ? view.date.fullLabel : view.date.label) : "",
    text: { en: view.englishText || view.text },
    media: {
      en: view.englishMedia || (view.hasEnglish ? view.media : undefined),
    },
    getText: (_lang: Language) => view.text,
    getMedia: (_lang: Language) => view.media,
    getTags: (_lang?: Language) => view.tagLabels,
    related: view.related?.map(hydrateMedia),
  };
}

/** Small compatibility adapters keep editable JSX independent of serialization.
 * All localized text and time-dependent formatting was resolved at build time. */
export function hydratePageData(snapshot: PageDataSnapshot) {
  const projectViews = Object.fromEntries(
    snapshot.projects.map((view) => [view.key, hydrateProject(view)]),
  );
  const projectsTable = Object.fromEntries(
    Object.values(projectViews).map((entry) => [entry.project, entry]),
  );
  const publications = parsePublications(snapshot.publications);
  const publicationsTable = Object.fromEntries(
    publications.map((entry) => [entry.citationKey, entry]),
  );
  const histories = {
    en: [],
    ja: [],
    [snapshot.language]: snapshot.histories.map((view) => ({
      ...hydrateDate(view),
      text: view.text,
    })),
  } as Record<Language, ({ text: string } & ReturnType<typeof hydrateDate>)[]>;
  return {
    ...website,
    projects: snapshot.projectList.map((key) => projectViews[key]),
    projectsTable,
    products: snapshot.products.map((key) => projectsTable[key]),
    headerProducts: snapshot.headerProducts.map((key) => projectsTable[key]),
    selectedProjects: snapshot.selectedProjects.map(
      (key) => projectsTable[key],
    ),
    publications: snapshot.publicationList.map((key) => publicationsTable[key]),
    publicationsTable,
    selectedPublications: snapshot.selectedPublications.map(
      (key) => publicationsTable[key],
    ),
    histories,
    historyCount: snapshot.historyCount,
    awards: snapshot.awards.map(hydrateEntry),
    talks: snapshot.talks.map(hydrateEntry),
    lectures: snapshot.lectures.map(hydrateEntry),
    mediaList: snapshot.mediaList.map(hydrateMedia),
    mediaCount: snapshot.mediaCount,
    misc: snapshot.misc,
    durations: snapshot.durations,
    stripTags: (text: string) => text.replace(/(<([^>]+)>)/gi, ""),
  };
}
export type SiteData = ReturnType<typeof hydratePageData>;
