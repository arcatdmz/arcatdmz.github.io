import { Icon, Label, Menu, MenuItem } from "react-fomantic-ui";

import type { ReactNode } from "react";
import { hydratePageData, type PageDataProps } from "@/site/page-data";
import { ProjectHeader } from "@/site/components/ContentComponents";
import { SiteLayout } from "@/site/components/SiteLayout";
import { SiteLink } from "@/site/components/SiteLink";
import { href } from "@/site/rendering";

const projects = [
  {
    slug: "fungus-camera",
    en: "Fungus Camera",
    ja: "なめこカメラ",
    year: "'12-13",
  },
  { slug: "rhythm-kaden", en: "Rhythm-Kaden", ja: "リズム家電", year: "'12" },
  { slug: "realmote", en: "Realmote", ja: "Realmote", year: "'11-12" },
] as const;

/** The shared homehack/_layout.pug template, including its localized submenu. */
export function HomehackLayout({
  pageData,
  active,
  children,
}: PageDataProps & {
  active?: (typeof projects)[number]["slug"];
  children: ReactNode;
}) {
  const data = hydratePageData(pageData);
  const lang = pageData.language;
  const en = lang === "en";
  const basePath = data.rootPath + (en ? "" : "ja/");
  const p = data.projectsTable.homehack;
  const selected = projects.find((project) => project.slug === active);
  const context = {
    ...data,
    lang,
    en,
    basePath,
    author: en ? "Jun Kato" : "加藤 淳",
    me: `homehack/${active ? active + "/" : ""}`,
    p,
    title: p.getTitle(lang) + (selected ? ` (${selected[lang]})` : ""),
  };
  return (
    <SiteLayout context={context}>
      <ProjectHeader project="homehack" />
      <Menu pointing secondary>
        <MenuItem
          as={SiteLink}
          active={!active}
          href={href(`${basePath}homehack/`)}
        >
          {en ? "Overview" : "概要"}
        </MenuItem>
        {projects.map((project) => (
          <MenuItem
            as={SiteLink}
            key={project.slug}
            active={active === project.slug}
            href={href(`${basePath}homehack/${project.slug}/`)}
          >
            {project[lang]}
            <Label horizontal>
              <Icon name="calendar" />
              {project.year}
            </Label>
          </MenuItem>
        ))}
      </Menu>
      {children}
    </SiteLayout>
  );
}
