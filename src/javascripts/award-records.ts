/** Award names and links are shared by compact labels and detailed descriptions.
 * before/after are authored HTML fragments; preserve outcome wording verbatim. */
export interface AwardLocale {
  label?: string;
  url?: string;
  shortLabel?: string;
  before?: string;
  after?: string;
}
export interface AwardRecord {
  id: string;
  date: string;
  entryType?: string;
  kind: "award" | "honor";
  publications?: string[];
  en?: AwardLocale;
  ja?: AwardLocale;
}
function locales(record: AwardRecord, language: "en" | "ja") {
  const current = record[language];
  const other = record[language === "en" ? "ja" : "en"];
  return { current: current || other || {}, other: other || current || {} };
}
export function awardText(record: AwardRecord, language: "en" | "ja"): string {
  if (record.kind !== "award" && record.kind !== "honor")
    throw new Error(`Invalid award kind: ${record.id}`);
  const { current, other } = locales(record, language);
  const label = current.label ?? other.label;
  const url = current.url ?? other.url;
  if (!label || !url || !/^https?:\/\//.test(url))
    throw new Error(`Missing award name/link: ${record.id} (${language})`);
  return `${current.before || ""}<a href="${url}">${label}</a>${current.after || ""}`;
}
export function compactAwardLabel(
  record: AwardRecord,
  language: "en" | "ja",
): string {
  const { current, other } = locales(record, language);
  return (
    current.shortLabel ??
    other.shortLabel ??
    (current.label ?? other.label ?? "").replace(/<[^>]*>/g, "")
  );
}
