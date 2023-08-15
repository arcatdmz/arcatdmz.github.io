/// <reference path='./typings.d.ts' />
import * as json from "../data/talks.json";
import { Entry, RawEntry } from "./library";
const talks: RawEntry[] = json.default || json;

const entries: Entry[] = [];
for (const re of talks) {
  entries.push(new Entry(re));
}

export default entries;
