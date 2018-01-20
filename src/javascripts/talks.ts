/// <reference path='./typings.d.ts' />
import * as json from "../data/talks.json";
import { months, I18nText, EntryDateType, Entry, RawEntry } from "./library";
const talks: RawEntry[] = json.default ? json.default : json;

const entries: Entry[] = [];
for (const re of talks) {
  entries.push(new Entry(re.date, re.text, re.type));
}

export default entries;
