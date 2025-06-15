/// <reference path='./typings.d.ts' />
import * as json from "../data/media.json";
import { EntryDate, EntryDateType, I18nText } from "./library";

interface RawMediaEntry {
  date?: string;
  text?: I18nText;
  media?: I18nText;
  permalink?: string;
  archive?: string;
  projects?: string[];
  related?: RawMediaEntry[];
  draft?: boolean;
  private?: boolean;
}

class MediaEntry {
  public data: RawMediaEntry;
  private dateObj?: EntryDate;
  public get dateType(): EntryDateType | undefined {
    return this.dateObj?.dateType;
  }
  public get date(): Date | undefined {
    return this.dateObj?.date;
  }
  public text?: I18nText;
  public media?: I18nText;
  public permalink?: string;
  public archive?: string;
  private _projects?: string[];
  public get projects(): string[] | undefined {
    return this._projects || this.parent?.projects;
  }
  public related?: MediaEntry[];
  public draft?: boolean;
  public private?: boolean;

  constructor(data: RawMediaEntry, public parent?: MediaEntry) {
    this.data = data;
    this.text = data.text;
    this.media = data.media;
    this.permalink = data.permalink;
    this.archive = data.archive;
    this._projects = data.projects;
    this.draft = data.draft;
    this.private = data.private;
    if (data.date) {
      this.dateObj = new EntryDate(data.date);
    }
    if (data.related) {
      this.related = data.related.map((r) => new MediaEntry(r, this));
    }
  }

  public getDateString(lang: string, full?: boolean) {
    return this.dateObj ? this.dateObj.getDateString(lang, full) : "";
  }

  public getText(lang: "en" | "ja") {
    if (!this.text) return "";
    return this.text[lang] || this.text.ja || this.text.en || "";
  }

  public getMedia(lang: "en" | "ja") {
    if (!this.media) return "";
    return this.media[lang] || this.media.ja || this.media.en || "";
  }
}

const rawEntries: RawMediaEntry[] = json.default || json;
const entries: MediaEntry[] = [];
for (const re of rawEntries) {
  entries.push(new MediaEntry(re));
}

export default entries;
