/// <reference path='./typings.d.ts' />
import * as json from "../data/histories.json";
import { EntryDate, EntryDateType } from "./library";
const histories: RawEntries = json.default ? json.default : json;

class Entry {
  private dateObj: EntryDate;
  public get dateType(): EntryDateType {
    return this.dateObj.dateType;
  }
  public get date(): Date {
    return this.dateObj.date;
  }
  public text: string;
  constructor(date: string, text: string) {
    this.dateObj = new EntryDate(date);
    this.text = text;
  }
  public getDateString(lang: string, full?: boolean) {
    return this.dateObj.getDateString(lang, full);
  }
}

class Entries {
  en?: Entry[];
  ja?: Entry[];
}

interface RawEntry {
  date: string;
  text: string;
}

interface RawEntries {
  [lang: string]: RawEntry[];
}

const entries: Entries = { en: [], ja: [] };
for (const lang in histories) {
  const res = histories[lang];
  for (const re of res) {
    (<any>entries)[lang].push(new Entry(re.date, re.text));
  }
}

export default entries;
