/// <reference path='./typings.d.ts' />
import json from "../data/talks.json";
import { Entry, RawEntry } from "./library";
const talks: RawEntry[] = json as RawEntry[];

const entries: Entry[] = [];
for (const re of talks) {
  entries.push(new Entry(re));
}

export default entries;
