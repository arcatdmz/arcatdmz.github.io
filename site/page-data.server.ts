/** Build-only page viewmodels. Import only from getStaticProps: Next removes
 * this module (and the original datasets/Moment) from browser entry points. */
import { getSiteData, type SiteData as SourceData } from "./data";
import { buildYear } from "./clock";
import type {
  DateView,
  EntryView,
  Language,
  MediaView,
  PageDataSnapshot,
  ProjectView,
} from "./page-data";

type SourceProject = SourceData["projects"][number];
type SourceMedia = SourceData["mediaList"][number];
export interface PageReferences {
  /** Explicit project/publication references used in this editable TSX page. */
  projects?: string[];
  publications?: string[];
  /** Project headers and publication sections, excluding navigation cards. */
  publicationProjects?: string[];
  /** Only pages that actually render a media list need these records. */
  mediaProjects?: string[];
}

function dateView(
  entry: {
    date: Date;
    dateType: number;
    getDateString(lang: string, full?: boolean): string;
  },
  lang: Language,
): DateView {
  return {
    parts: [
      entry.date.getFullYear(),
      entry.date.getMonth(),
      entry.date.getDate(),
    ],
    dateType: entry.dateType,
    label: entry.getDateString(lang),
    fullLabel: entry.getDateString(lang, true),
  };
}
function entryView(
  entry: SourceData["awards"][number] | SourceData["lectures"][number],
  lang: Language,
): EntryView {
  const dates = "dateObjs" in entry ? entry.dateObjs : [entry];
  const japanese = entry.getText("ja") || "";
  return {
    dates: dates.map((date) => dateView(date, lang)),
    text: entry.getText(lang),
    entryType: entry.entryType,
    funding: entry.data?.funding,
    isAward: japanese.includes("受賞") || japanese.includes("選定"),
  };
}
function projectView(
  entry: SourceProject,
  lang: Language,
  key: string,
): ProjectView {
  return {
    key,
    project: entry.project,
    icon: entry.icon,
    hero: entry.hero,
    year: entry.year,
    category: entry.category,
    tags: entry.tags,
    title: entry.title,
    images: entry.images,
    thumbnail: entry.getThumbnail(lang),
    publication: entry.getPublication(lang),
    localizedTitle: entry.getTitle(lang),
    subtitle: entry.getSubtitle(lang),
    description: entry.getDescription(lang),
    designTitle: entry.getDesignTitle(lang),
    designDescription: entry.getDesignDescription(lang),
    members: entry.getMembers(lang),
    tagLabels: entry.getTags(lang),
    designTagLabels: entry.getDesignTags(lang),
    url: entry.getUrl(lang),
    private: entry.isPrivateProject(lang),
    yearLabel: entry.getYearString(lang, buildYear),
    designProject: entry.isDesignProject(),
  };
}
function mediaView(
  entry: SourceMedia,
  lang: Language,
  includeEnglish: boolean,
): MediaView {
  return {
    date: entry.date
      ? dateView(entry as Required<SourceMedia>, lang)
      : undefined,
    text: entry.getText(lang),
    media: entry.getMedia(lang),
    hasEnglish: Boolean(entry.media?.en),
    // OpenPool deliberately uses English outlet names for its logo filenames.
    englishText: includeEnglish ? entry.text?.en : undefined,
    englishMedia: includeEnglish ? entry.media?.en : undefined,
    permalink: entry.permalink,
    archive: entry.archive,
    projects: entry.projects,
    tags: entry.tags,
    tagLabels: entry.getTags(lang),
    draft: entry.draft,
    private: entry.private,
    // Related stories are rendered separately by the flattened media list.
  };
}

/** Preserve the source's optional ja overrides without transferring both locales. */
function localizeMisc(value: any, lang: Language): any {
  if (Array.isArray(value))
    return value.map((item) => localizeMisc(item, lang));
  if (!value || typeof value !== "object") return value;
  const { ja, ...base } = value;
  if (lang === "ja" && ja) {
    for (const [key, translated] of Object.entries(ja))
      if (translated) base[key] = translated;
  }
  return Object.fromEntries(
    Object.entries(base).map(([key, item]) => [key, localizeMisc(item, lang)]),
  );
}

export function getPageData(
  route: string,
  references: PageReferences = {},
): PageDataSnapshot {
  const source = getSiteData();
  const lang: Language = route.startsWith("/ja/") ? "ja" : "en";
  const name = route.replace(/^\/(ja\/)?/, "").replace(/\/$/, "");
  const section = name.split("/")[0];
  const timeline = section === "timeline";
  const year =
    timeline && /^\d+$/.test(name.split("/")[1] || "")
      ? Number(name.split("/")[1])
      : undefined;
  const inYear = (value: number) => year === undefined || value === year;
  const home = !name;
  const publicationPage = section === "publications";
  const resume = section === "resume";
  const projectKey = (entry: SourceProject) =>
    entry.project || `anonymous-${source.projects.indexOf(entry)}`;
  const projectSet = new Set<SourceProject>();
  const addProject = (key: string) => {
    const project = source.projectsTable[key];
    if (project) projectSet.add(project);
  };
  if (!resume) source.products.forEach((entry) => projectSet.add(entry));
  references.projects?.forEach(addProject);
  if (home) source.selectedProjects.forEach((entry) => projectSet.add(entry));
  const projectList = source.projects.filter((entry) => {
    if (timeline)
      return (
        !entry.isPrivateProject(lang) && entry.year && inYear(entry.year.from)
      );
    if (section === "projects")
      return (
        !entry.isPrivateProject(lang) &&
        entry.category !== "concept" &&
        entry.category !== "committee"
      );
    if (section === "design") return entry.isDesignProject();
    if (section === "activities") return entry.category === "committee";
    if (section === "live-programming")
      return (
        entry.tags?.includes("live-programming") &&
        !["concept", "committee", "private"].includes(entry.category || "")
      );
    if (section === "science") return entry.title === "Chippie";
    return false;
  });
  projectList.forEach((entry) => projectSet.add(entry));

  const publicationSet = new Set<SourceData["publications"][number]>();
  const addPublication = (key: string) => {
    const publication = source.publicationsTable[key];
    if (publication) publicationSet.add(publication);
  };
  references.publications?.forEach(addPublication);
  const publicationList = source.publications.filter((entry) => {
    if (!entry.entryTags) return false;
    if (publicationPage || timeline)
      return (
        (lang === "ja" ||
          entry.entryTags.language !== "japanese" ||
          entry.entryType === "phdthesis") &&
        (!timeline || inYear(Number(entry.entryTags.year)))
      );
    if (resume)
      return (
        !["comment", "phdthesis"].includes(entry.entryType.toLowerCase()) &&
        entry.entryTags.language !== "japanese" &&
        Boolean(entry.entryTags.numpages)
      );
    if (
      section === "animare" &&
      entry.getFundings().includes("JST CRONOS JPMJCS25K1")
    )
      return true;
    return (
      Boolean(
        references.publicationProjects?.some(
          (key) => entry.entryTags.project?.includes(key),
        ),
      ) &&
      (lang === "ja" || entry.entryTags.language !== "japanese")
    );
  });
  publicationList.forEach((entry) => publicationSet.add(entry));
  const selectedPublications =
    (publicationPage && lang === "en") || resume
      ? source.selectedPublications
      : [];
  selectedPublications.forEach((entry) => publicationSet.add(entry));
  // Cards/header labels need their primary citation, but navigation projects do
  // not cause all of their publications to be serialized into unrelated pages.
  projectSet.forEach((entry) => addPublication(entry.getPublication(lang)));
  publicationSet.forEach((entry) => addProject(entry.entryTags?.project));

  const mediaCount = source.mediaList.length;
  const mediaList = source.mediaList.filter((entry) => {
    if (entry.private || entry.draft) return false;
    if (timeline)
      return (
        entry.date &&
        inYear(entry.date.getFullYear()) &&
        (lang === "ja" || entry.media?.en)
      );
    if (publicationPage) return lang === "ja" || entry.media?.en;
    if (section === "animare") return entry.tags?.includes("anime");
    return references.mediaProjects?.some(
      (key) => entry.projects?.includes(key),
    );
  });
  mediaList.forEach((entry) => entry.projects?.forEach(addProject));

  const entryAllowed = (entry: SourceData["awards"][number]) =>
    !timeline ||
    ((lang === "ja" || entry.entryType !== "domestic") &&
      inYear(entry.date.getFullYear()));
  const awards =
    publicationPage || timeline || resume
      ? source.awards.filter(entryAllowed)
      : [];
  const talks =
    publicationPage || timeline ? source.talks.filter(entryAllowed) : [];
  const lectures =
    publicationPage || timeline
      ? source.lectures.filter(
          (entry) =>
            !timeline ||
            (entry.entryType !== "private" &&
              (lang === "ja" || entry.entryType !== "domestic") &&
              entry.dates.some((date) => inYear(date.getFullYear()))),
        )
      : [];
  const allHistories = source.histories[lang] || [];
  const histories = home
    ? allHistories.slice(0, 5)
    : timeline
      ? allHistories.filter((entry) => inYear(entry.date.getFullYear()))
      : [];
  const misc: Record<string, any> = {};
  if (section === "activities" || resume)
    misc.services = localizeMisc(source.misc.services, lang);
  if (resume) misc.publications = source.misc.publications;
  if (section === "animare")
    misc.miscellaneous = {
      "past-anime-events": localizeMisc(
        source.misc.miscellaneous["past-anime-events"],
        lang,
      ),
    };
  const durations: Record<string, string> = {};
  if (section === "design") {
    for (const date of [
      [2002, 9, 1],
      [2000, 10, 1],
      [2015, 0, 5],
      [2012, 2, 19],
      [2016, 1, 22],
      [2017, 11, 5],
      [2005, 5, 1],
      [2017, 11, 7],
      [2008, 5, 1],
      [2005, 9, 1],
    ]) {
      durations[date.join(",")] = source.moment(date).locale(lang).toNow(true);
    }
  }
  const snapshot: PageDataSnapshot = {
    language: lang,
    projects: [...projectSet].map((entry) =>
      projectView(entry, lang, projectKey(entry)),
    ),
    projectList: projectList.map(projectKey),
    products: resume ? [] : source.products.map((entry) => entry.project),
    headerProducts: resume
      ? []
      : source.projects
          .filter((entry) => source.products.includes(entry))
          .map((entry) => entry.project),
    selectedProjects: home
      ? source.selectedProjects.map((entry) => entry.project)
      : [],
    publications: [...publicationSet].map(
      ({ citationKey, entryType, entryTags }) => ({
        citationKey,
        entryType,
        entryTags,
      }),
    ),
    publicationList: publicationList.map((entry) => entry.citationKey),
    selectedPublications: selectedPublications.map(
      (entry) => entry.citationKey,
    ),
    histories: histories.map((entry) => ({
      ...dateView(entry, lang),
      text: entry.text,
    })),
    historyCount: allHistories.length,
    awards: awards.map((entry) => entryView(entry, lang)),
    talks: talks.map((entry) => entryView(entry, lang)),
    lectures: lectures.map((entry) => entryView(entry, lang)),
    mediaList: mediaList.map((entry) =>
      mediaView(entry, lang, section === "openpool"),
    ),
    mediaCount,
    misc,
    durations,
  };
  // Optional source fields must be absent, not undefined, in Next page props.
  return JSON.parse(JSON.stringify(snapshot)) as PageDataSnapshot;
}
