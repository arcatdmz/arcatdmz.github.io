
class Entry {
  public date: Date;
  public text: string;
  constructor(date: Date, text: string) {
    this.date = date;
    this.text = text;
  }
  public getDateString(en = true) {
    const d = this.date;
    return en
      ? `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
      : `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
  }
}

const History = [
  new Entry(new Date('01/01/2018'), 'Test')
];
  
export default History;
