
export class Entry {
  public date: Date;
  public text: string;
  constructor(date: Date, text: string) {
    this.date = date;
    this.text = text;
  }
  public getDateString(lang: string) {
    const d = this.date;
    return lang === 'en'
      ? `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
      : `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
  }
}

export interface Histories {
  [lang: string]: Entry[];
}

export default class HistoryLoader {
  private promise: Promise<Histories>;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      import('./historyEntries').then((historyEntries) => {
        const results: Histories = {};
        for (const lang in historyEntries.default) {
          const entries = historyEntries.default[lang];
          results[lang] = [];
          for (const entry of entries) {
            results[lang].push(new Entry(new Date(entry.date), entry.text));
          }
        }
        resolve(results);
      }).catch(reject);
    });
  }
  public onLoad(fn: (history: Histories) => void) {
    this.promise
      .then(fn)
      .catch((e) => {
        console.error(e);
        fn({});
      });
  }
}
