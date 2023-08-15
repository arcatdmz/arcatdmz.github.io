export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface I18nText {
  en: string;
  ja: string;
}

export enum EntryDateType {
  Year,
  Month,
  Range,
}

export class Entry {
  public dateType: EntryDateType;
  public date: Date;
  public endDate?: Date;
  public text: string | I18nText;
  public entryType?: string;
  constructor({
    date, text, entryType
  }: RawEntry) {
    if (date.indexOf("/") < 0) {
      this.date = new Date("1/1/" + date);
      this.dateType = EntryDateType.Year;
    } else if (date.indexOf("-") >= 0) {
      const dates = date.split("-");
      this.date = new Date(dates[0]);
      this.endDate = new Date(dates[1]);
      this.dateType = EntryDateType.Range;
    } else {
      this.date = new Date(date);
      this.dateType = EntryDateType.Month;
    }
    this.text = text;
    this.entryType = entryType;
  }
  public getDateString(lang: string) {
    const d = this.date,
      ed = this.endDate || new Date();
    switch (this.dateType) {
      case EntryDateType.Year:
        return lang === "en" ? `${d.getFullYear()}` : `${d.getFullYear()}年`;
      case EntryDateType.Month:
        return lang === "en"
          ? `${months[d.getMonth()]}. ${d.getFullYear()}`
          : `${d.getFullYear()}年${d.getMonth() + 1}月`;
      case EntryDateType.Range:
        return lang === "en"
          ? `${months[d.getMonth()]}. ${d.getFullYear()} - ${
              months[ed.getMonth()]
            }. ${ed.getFullYear()}`
          : `${d.getFullYear()}年${d.getMonth() + 1}月-${ed.getFullYear()}年${
              ed.getMonth() + 1
            }月`;
    }
  }
  public getText(lang: "en" | "ja") {
    if (typeof this.text === "string") {
      return lang === "en" ? this.text : this.text + " 受賞";
    }
    return this.text[lang];
  }
  public getIconClass() {
    return this.entryType === "domestic" ? "circle" : "world";
  }
}

export interface RawEntry {
  date: string;
  text: string | I18nText;
  entryType?: string;
}
