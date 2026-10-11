import type projects from "../src/javascripts/projects";

export type Language = "en" | "ja";
export type Project = (typeof projects)[number];

/** Values shared by the original templates and the React page components. */
export interface SiteContext {
  lang: Language;
  en: boolean;
  rootPath: string;
  basePath: string;
  author: string;
  me: string;
  title: string;
  description?: string;
  imageUrl?: string;
  p?: Project;
  bodyClass?: string;
  protocol: string;
  domain: string;
  defaultDescription: string;
  defaultJapaneseDescription: string;
  defaultImageUrl: string;
  projects: Project[];
  products: Project[];
}
