
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
    const authors = this.entryTags.author.split(/\s+and\s+/);
    for (const key in authors) {
      const names = authors[key].split(/\s*,\s*/);
      if (names.length > 1) {
        authors[key] = names.reverse().join(' ');
      }
    }
    return authors;
  }
  public getAuthorsTags() {
    const authors = this.getAuthors();
    var i = -1, j = -1;
    if ((i = authors.indexOf('Jun Kato')) >= 0
        || (j = authors.indexOf('加藤 淳')) >= 0) {
      const k = Math.max(i, j);
      authors[k] = `<u>${authors[k]}</u>`;
    }
    return authors;
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

export function parse(bibtex: any): Entry[] {
  const entries = [];
  for (const be of bibtex) {
    entries.push(new Entry(be));
  }
  return entries;
}
