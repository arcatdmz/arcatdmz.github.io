/// <reference path='./typings.d.ts' />
import json from "../data/awards.json";
import { Entry, RawEntry } from "./library";
const awards: RawEntry[] = json as RawEntry[];

const entries: Entry[] = [];
for (const re of awards) {
  entries.push(new Entry(re));
}

export default entries;
