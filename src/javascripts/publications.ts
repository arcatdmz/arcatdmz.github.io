
interface BibTexEntry {
  citationKey: string;
  entryType: string;
  entryTags: {
    [tag: string]: string;
  };
}

class Entry implements BibTexEntry {
  citationKey: string;
  entryType: string;
  entryTags: {
    [tag: string]: string;
  };
  constructor(e: BibTexEntry) {
    this.citationKey = e.citationKey;
    this.entryType = e.entryType;
    this.entryTags = e.entryTags;
  }
  public getIcon() {
    if (!this.entryTags) {
      return undefined;
    }
    return this.entryTags.language === 'japanese'
      ? 'circle' : 'world';
  }
  public getAuthors() {
    if (!this.entryTags || typeof this.entryTags.author !== 'string') {
      return [];
    }
    return parseNames(this.entryTags.author);
  }
  public getAuthorsTags() {
    return namesToHTML(this.getAuthors());
  }
  public getEditors() {
    if (!this.entryTags || typeof this.entryTags.editor !== 'string') {
      return [];
    }
    return parseNames(this.entryTags.editor);
  }
  public getEditorsTags() {
    return namesToHTML(this.getEditors());
  }
  public getBibTeX() {
    const entrysep = ',\n', indent = '  ';
    var out = "@" + this.entryType;
    out += '{';
    if (this.citationKey)
      out += this.citationKey + entrysep;
    if (this.entryTags) {
      var tags = indent;
      for (const jdx in this.entryTags) {
        if (tags.trim().length != 0)
          tags += entrysep + indent;
        tags += jdx + ' = {' + 
          this.entryTags[jdx] + '}';
      }
      out += tags;
    }
    out += '\n}';
    return out;
  }
  public getBook() {
    var book: string;
    if (this.entryTags.booktitle) {
      book = this.entryTags.booktitle;
    } else if (this.entryTags.journal) {
      if (this.entryTags.volume && this.entryTags.number) {
        book = `${this.entryTags.journal} ${this.entryTags.volume}(${this.entryTags.number})`;
      } else {
        book = this.entryTags.journal;
      }
    } else {
      book = '';
    }
    return book;
  }
  public getBookWithPages() {
    var book = this.getBook(), pages = this.entryTags.pages;
    if (pages) {
      if (pages.indexOf('-') >= 0) {
        pages = pages.replace(/-+/, '-');
        book = `${book}, pp.${pages}`;
      } else {
        book = `${book}, p.${pages}`;
      }
    }
    return book;
  }
}

export function parseNames(names: string) {
  const namesArr = names.split(/\s+and\s+/);
  for (const key in namesArr) {
    const arr = namesArr[key].split(/\s*,\s*/);
    if (arr.length > 1) {
      namesArr[key] = arr.reverse().join(' ');
    }
  }
  return namesArr;
}

export function namesToHTML(namesArr: string[]) {
  var i = -1, j = -1;
  if ((i = namesArr.indexOf('Jun Kato')) >= 0
      || (j = namesArr.indexOf('加藤 淳')) >= 0) {
    const k = Math.max(i, j);
    namesArr[k] = `<u>${namesArr[k]}</u>`;
  }
  return namesArr;
}

export function parse(bibtex: any): Entry[] {
  const entries = [];
  for (const be of bibtex) {
    entries.push(new Entry(be));
  }
  return entries;
}
