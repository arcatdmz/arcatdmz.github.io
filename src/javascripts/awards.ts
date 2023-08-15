/// <reference path='./typings.d.ts' />
import * as json from "../data/awards.json";
import { Entry, RawEntry } from "./library";
const awards: RawEntry[] = json.default || json;

const entries: Entry[] = [];
for (const re of awards) {
  entries.push(new Entry(re));
}

export default entries;
