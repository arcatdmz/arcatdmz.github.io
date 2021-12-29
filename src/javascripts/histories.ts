/// <reference path='./typings.d.ts' />
import * as json from "../data/histories.json";
const histories: RawEntries = json.default ? json.default : json;

class Entry {
  public date: Date;
  public text: string;
  constructor(date: string, text: string) {
    this.date = new Date(date);
    this.text = text;
  }
  public getDateString(lang: string) {
    const d = this.date;
    return lang === "en"
      ? `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
      : `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
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
