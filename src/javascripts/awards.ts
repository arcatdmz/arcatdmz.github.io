/// <reference path='./typings.d.ts' />
import json from "../data/awards.json";
import { Entry } from "./library";
import {
  awardText,
  compactAwardLabel,
  type AwardRecord,
} from "./award-records";

const entries = (json as AwardRecord[]).map(
  (record) =>
    new Entry({
      ...record,
      text: { en: awardText(record, "en"), ja: awardText(record, "ja") },
      label: {
        en: compactAwardLabel(record, "en"),
        ja: compactAwardLabel(record, "ja"),
      },
    }),
);
export default entries;
