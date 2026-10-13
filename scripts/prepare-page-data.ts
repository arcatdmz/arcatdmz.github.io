/** Optional interaction data is locale-specific and fetched only on user intent. */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function preparePageData(root: string): Promise<void> {
  // Delay importing generated data until prepare-assets has built the bibliography
  // and written this run's immutable build clock.
  const [{ getSiteData }, { tags }] = await Promise.all([
    import("../site/data"),
    import("../src/javascripts/projects"),
  ]);
  const source = getSiteData();
  const directory = path.join(root, "public/data");
  await mkdir(directory, { recursive: true });
  for (const lang of ["en", "ja"] as const) {
    const histories = source.histories[lang].map((entry) => ({
      date: entry.getDateString(lang, true),
      text: entry.text,
    }));
    const basePath = lang === "ja" ? `${source.rootPath}ja/` : source.rootPath;
    const tagData = {
      tags: Object.fromEntries(
        Object.entries(tags).map(([key, entry]) => [
          key,
          {
            title:
              lang === "ja" && entry.ja?.title
                ? entry.ja.title
                : entry.title || entry.label,
            label: entry.label,
            href: source.projects.some((project) => project.project === key)
              ? `${basePath}${key}`
              : undefined,
          },
        ]),
      ),
      projects: source.projects.map((entry) => ({
        project: entry.project,
        title: entry.getTitle(lang),
        tags: entry.tags || [],
      })),
    };
    await Promise.all([
      writeFile(
        path.join(directory, `histories-${lang}.json`),
        JSON.stringify(histories),
      ),
      writeFile(
        path.join(directory, `project-tags-${lang}.json`),
        JSON.stringify(tagData),
      ),
    ]);
  }
}
