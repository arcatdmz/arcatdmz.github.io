import { PublicationEntry } from "@/site/components/publications/types";

export function projectPublications(
  entries: PublicationEntry[],
  project: string,
  en: boolean,
) {
  return entries.filter(
    ({ entryTags: tags }) =>
      tags?.project?.includes(project) && (!en || tags.language !== "japanese"),
  );
}
