/// <reference path='./typings.d.ts' />
import * as json from "../data/projects.json";
const data: {
  tags: {[tag: string]: { title?: string; label: string; }},
  projects: RawEntry[]
} = json.default ? json.default : json;

interface RawEntry {
  project: string;
  thumbnail?: string;
  tags?: string[];
  year: {
    from: number;
    to?: number;
  },
  category?: 'collaboration' | 'private';
  publication?: string;
  title: string;
  description: string;
  ja: {
    publication?: string;
    title?: string;
    description?: string;
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
  get description() {
    return this.data.description;
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
  getTags(lang?: 'en'|'ja') {
    const results = [];
    const tags = this.data.tags ? this.data.tags : [];
   const dict = data.tags;
    for (const tag of tags) {
      const t = dict[tag];
      if (!t) continue;
      results.push(`<a class="project tag ${tag}" data-tag="${tag}">${t.label}</a>`);
    }
    return results;
  }
  getPublication(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja.publication) {
      return this.data.ja.publication;
    }
    if (this.publication) {
      return this.publication;
    }
    return lang === 'ja' ? '(文献未発表)' : '(Work in progress)';
  }
  getTitle(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja.title) {
      return this.data.ja.title;
    }
    return this.data.title;
  }
  getDescription(lang?: 'en'|'ja') {
    if (lang === 'ja' && this.data.ja && this.data.ja.description) {
      return this.data.ja.description;
    }
    return this.data.description;
  }
}

const entries: Entry[] = [];
for (const project of data.projects) {
  entries.push(new Entry(project));
}

export var tags = data.tags;
export default entries;
