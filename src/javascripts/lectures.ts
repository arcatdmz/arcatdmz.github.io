/// <reference path='./typings.d.ts' />
import json from "../data/lectures.json";
import { MultipleDateEntry, RawMultipleDateEntry } from "./library";
const lectures: RawMultipleDateEntry[] = json as RawMultipleDateEntry[];

const entries: MultipleDateEntry[] = [];
for (const re of lectures) {
  entries.push(new MultipleDateEntry(re));
}

export default entries;
