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

export const fullMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface I18nText {
  en: string;
  ja: string;
}

export enum EntryDateType {
  Year,
  Month,
  Day,
  Range,
}

export class EntryDate {
  public dateType: EntryDateType;
  public date: Date;
  public endDate?: Date;
  constructor(dateString: string) {
    if (dateString.indexOf("/") < 0) {
      this.date = new Date("1/1/" + dateString);
      this.dateType = EntryDateType.Year;
    } else if (dateString.indexOf("-") >= 0) {
      const dates = dateString.split("-");
      this.date = new Date(dates[0]);
      this.endDate = new Date(dates[1]);
      this.dateType = EntryDateType.Range;
    } else {
      this.date = new Date(dateString);
      if ((dateString.match(/\//g) || []).length > 1) {
        this.dateType = EntryDateType.Day;
      } else {
        this.dateType = EntryDateType.Month;
      }
    }
  }
  public getDateString(lang: string, full?: boolean) {
    const d = this.date,
      ed = this.endDate || new Date();
    switch (this.dateType) {
      case EntryDateType.Year:
        return lang === "en" ? `${d.getFullYear()}` : `${d.getFullYear()}年`;
      case EntryDateType.Month:
        return lang === "en"
          ? `${(full ? fullMonths: months)[d.getMonth()]}${full ? '' : '.'} ${d.getFullYear()}`
          : `${d.getFullYear()}年${d.getMonth() + 1}月`;
      case EntryDateType.Day:
        return lang === "en"
          ? `${(full ? fullMonths: months)[d.getMonth()]}${full ? '' : '.'} ${d.getDate()}, ${d.getFullYear()}`
          : `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
      case EntryDateType.Range:
        return lang === "en"
          ? `${(full ? fullMonths: months)[d.getMonth()]}${full ? '' : '.'} ${d.getFullYear()} - ${
            (full ? fullMonths: months)[ed.getMonth()]
            }${full ? '' : '.'} ${ed.getFullYear()}`
          : `${d.getFullYear()}年${d.getMonth() + 1}月-${ed.getFullYear()}年${
              ed.getMonth() + 1
            }月`;
    }
  }
}

export class Entry {
  public data: any;
  private dateObj: EntryDate;
  public get dateType(): EntryDateType {
    return this.dateObj.dateType;
  }
  public get date(): Date {
    return this.dateObj.date;
  }
  public get endDate(): Date | undefined {
    return this.dateObj.endDate;
  }
  public text: string | I18nText;
  public entryType?: string;
  constructor(data: RawEntry) {
    this.data = data;
    const {
      date, text, entryType
    } = data;
    this.dateObj = new EntryDate(date);
    this.text = text;
    this.entryType = entryType;
  }
  public getDateString(lang: string, full?: boolean) {
    return this.dateObj.getDateString(lang, full);
  }
  public getText(lang: "en" | "ja") {
    return getI18nText(this.text, lang);
  }
  public getIconClass() {
    return getIconClass(this.entryType);
  }
}

export interface RawEntry {
  date: string;
  text: string | I18nText;
  entryType?: string;
}

export class MultipleDateEntry {
  public data: any;
  public dateObjs: EntryDate[];
  public get dateTypes(): EntryDateType[] {
    return this.dateObjs.map(o => o.dateType);
  }
  public get dates(): Date[] {
    return this.dateObjs.map(o => o.date);
  }
  public get endDates(): (Date | undefined)[] {
    return this.dateObjs.map(o => o.endDate);
  }
  public text: string | I18nText;
  public entryType?: string;
  constructor(data: RawMultipleDateEntry) {
    this.data = data;
    const {
      dates, text, entryType
    } = data;
    this.dateObjs = dates.map(date => new EntryDate(date));
    this.text = text;
    this.entryType = entryType;
  }
  public getDatesString(lang: string, full?: boolean) {
    return this.dateObjs.map(o => o.getDateString(lang, full));
  }
  public getText(lang: "en" | "ja") {
    return getI18nText(this.text, lang);
  }
  public getIconClass() {
    return getIconClass(this.entryType);
  }
}

export interface RawMultipleDateEntry {
  dates: string[];
  text: string | I18nText;
  entryType?: string;
}

function getI18nText(text: string | I18nText, lang: "en" | "ja") {
  if (typeof text === "string") {
    return lang === "en" ? text : text + " 受賞";
  }
  return text[lang];
}

function getIconClass(entryType?: string) {
  return entryType === "domestic" ? "circle" : "world";
}
