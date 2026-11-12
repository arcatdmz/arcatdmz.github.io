import type { AwardView } from "./page-data";
export function awardsForPublications(
  awards: AwardView[],
  keys: string[],
): AwardView[] {
  const wanted = new Set(keys);
  return [
    ...new Map(
      awards
        .filter(
          (a) =>
            a.kind !== "honor" && a.publications.some((k) => wanted.has(k)),
        )
        .map((a) => [a.id, a]),
    ).values(),
  ];
}
export function awardHref(id: string, lang: string): string {
  return `${lang === "ja" ? "/ja" : ""}/publications/#award-${id}`;
}
export function awardSummary(awards: AwardView[], lang: string): string {
  const domestic = awards.filter((a) => a.entryType === "domestic").length;
  return lang === "ja"
    ? `${awards.length}件受賞（国際${awards.length - domestic}件, 国内${domestic}件）`
    : `${awards.length} awards in total`;
}

export function awardLabel(
  label: Partial<Record<"en" | "ja", string>> | undefined,
  language: "en" | "ja",
  description: string,
): string {
  return (
    label?.[language] ||
    label?.en ||
    label?.ja ||
    description.replace(/<[^>]*>/g, "")
  );
}

export function validatePublicationData(
  projects: {
    project: string;
    getPublications: (language: "en" | "ja") => string[];
  }[],
  awards: {
    data: {
      id?: string;
      publications?: string[];
      text: string | { en?: string; ja?: string };
      label?: Partial<Record<"en" | "ja", string>>;
    };
  }[],
  keys: Set<string>,
): void {
  for (const project of projects)
    for (const language of ["en", "ja"] as const)
      for (const key of project.getPublications(language)) {
        if (!keys.has(key))
          throw new Error(
            `Unknown publication ${key} in project ${project.project} (${language})`,
          );
      }
  const ids = new Set<string>();
  for (const {
    data: { id, publications = [], text, label },
  } of awards) {
    if (!id || !/^[a-z0-9-]+$/.test(id) || ids.has(id))
      throw new Error(`Invalid or duplicate award id: ${id}`);
    ids.add(id);
    if (!text || (typeof text !== "string" && (!text.en || !text.ja)))
      throw new Error(`Missing award translation: ${id}`);
    if (label && !label.en && !label.ja)
      throw new Error(`Empty award label: ${id}`);
    for (const key of publications)
      if (!keys.has(key))
        throw new Error(`Unknown publication ${key} in award ${id}`);
  }
}
