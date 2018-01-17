/// <reference path='./typings.d.ts' />
import * as json from "../data/projects.json";
const data: {
  tags: { [tag: string]: { title?: string; label: string; ja?: { title?: string; } } },
  "tags-design": { [tag: string]: { title?: string; icon: string; label: string; ja?: { title?: string; } } },
  projects: RawEntry[]
} = json.default ? json.default : json;

interface RawEntry {
  project: string;
  thumbnail?: string;
  icon?: string;
  tags?: string[];
  "tags-design"?: string[];
  year: {
    from: number;
    to?: number;
  },
  category?: 'collaboration' | 'committee' | 'private';
  publication?: string;
  title: string;
  "title-design"?: string;
  subtitle?: string;
  description: string;
  "description-design"?: string;
  members: string[];
  images?: string[];
  url?: string;
  ja: {
    publication?: string;
    title?: string;
    "title-design"?: string;
    subtitle?: string;
    description?: string;
    "description-design"?: string;
    members?: string[];
    url?: string;
  }
}

class Entry {
  data: RawEntry;
  constructor(data: RawEntry) {
    this.data = data;
  }
  get project() {
    return this.data.project;
  }
  get thumbnail() {
    if (this.data.thumbnail) {
      return this.data.thumbnail;
    }
    return `${this.data.project}.png`;
  }
  get icon() {
    return this.data.icon;
  }
  get tags() {
    return this.data.tags;
  }
  get year() {
    return this.data.year;
  }
  get category() {
    return this.data.category;
  }
  get publication() {
    return this.data.publication;
  }
  get title() {
    return this.data.title;
  }
  get designTitle() {
    return this.data['title-design'];
  }
  get subtitle() {
    return this.data.subtitle;
  }
  get description() {
    return this.data.description;
  }
  get designDescription() {
    return this.data['description-design'];
  }
  get members() {
    return this.data.members;
  }
  get images() {
    return this.data.images;
  }
  get url() {
    return this.data.url;
  }
  get ja() {
    return this.data.ja;
  }
  getYearString(lang?: 'en'|'ja') {
    var to: number;
    if (typeof this.data.year.to === 'number') {
      if (this.data.year.from === this.data.year.to) {
        return this.data.year.from.toString();
      }
      to = this.data.year.to;
    } else {
      to = new Date().getFullYear();
    }
    return `${this.data.year.from}-${to}`;
  }
  isDesignProject() {
    return Array.isArray(this.data.tags)
        && this.data.tags.indexOf('design') >= 0;
  }
  getTags(lang?: 'en'|'ja') {
    const results = [];
    const tags = this.data.tags;
    const dict = data.tags;
    if (typeof tags !== 'undefined') {
      for (const tag of tags) {
        const t = dict[tag];
        if (!t) continue;
        results.push(`<a class="project tag ${tag}" data-tag="${tag}">${t.label}</a>`);
      }
    }
    return results;
  }
  getDesignTags(lang?: 'en'|'ja') {
    const results = [];
    const tags = this.data['tags-design'];
    const dict = data['tags-design'];
    if (typeof tags !== 'undefined') {
      for (const tag of tags) {
        const t = dict[tag];
        if (!t) continue;
        const tagTitle = lang === 'ja' && t.ja && t.ja.title ? t.ja.title : t.title;
        results.push(`<div class="ui basic label project design ${tag}" data-tag="${tag}" title=${tagTitle}><i class="${t.icon} icon"></i>${t.label}</div>`);
      }
    }
    return results;
  }
  hasPublication(lang?: 'en'|'ja') {
    return (this.data.publication)
      || (lang === 'ja' && this.data.ja && this.data.ja.publication);
  }
  getPublication(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja.publication) {
      return this.data.ja.publication;
    }
    if (this.data.publication) {
      return this.data.publication;
    }
    return null;
  }
  getTitle(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja.title) {
      return this.data.ja.title;
    }
    return this.data.title;
  }
  hasDesignTitle(lang?: 'en'|'ja') {
    return (lang === 'en' && this.data['title-design'])
      || (lang === 'ja' && this.data.ja && this.data.ja['title-design']);
  }
  getDesignTitle(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja['title-design']) {
      return this.data.ja['title-design'];
    }
    if (lang === 'en' && this.data['title-design']) {
      return this.data['title-design'];
    }
    return this.getTitle(lang);
  }
  getSubtitle(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja.subtitle) {
      return this.data.ja.subtitle;
    }
    return this.data.subtitle;
  }
  getDescription(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja.description) {
      return this.data.ja.description;
    }
    return this.data.description;
  }
  hasDesignDescription(lang?: 'en'|'ja') {
    return (lang === 'en' && this.data['description-design'])
      || (lang === 'ja' && this.data.ja && this.data.ja['description-design']);
  }
  getDesignDescription(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja['description-design']) {
      return this.data.ja['description-design'];
    }
    if (lang === 'en' && this.data['description-design']) {
      return this.data['description-design'];
    }
    return this.getDescription(lang);
  }
  hasMembers(lang?: 'en'|'ja') {
    return (lang === 'en' && this.data.members)
      || (lang === 'ja' && this.data.ja && this.data.ja.members);
  }
  getMembers(lang?: 'en'|'ja') {
    if (!this.hasMembers(lang)) {
      return [];
    }
    if (lang === 'ja' && this.data.ja && this.data.ja.members) {
      return this.data.ja.members;
    }
    return this.data.members;
  }
  getMembersTags(lang?: 'en'|'ja') {
    return namesToHTML(this.getMembers(lang));
  }
  getUrl(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja.url) return this.data.ja.url;
    return this.data.url;
  }
  getLink(lang: 'en'|'ja', basePath: string) {
    const url = this.getUrl(lang);
    return url ? url : basePath + this.data.project;
  }
}

export function namesToHTML(namesArr: string[]) {
  var i = -1, j = -1;
  if ((i = namesArr.indexOf('Jun Kato')) >= 0
      || (j = namesArr.indexOf('加藤 淳')) >= 0) {
    const k = Math.max(i, j);
    namesArr[k] = `<u>${namesArr[k]}</u>`;
  }
  return namesArr;
}

const entries: Entry[] = [];
for (const project of data.projects) {
  entries.push(new Entry(project));
}

export var tags = data.tags;
export default entries;
