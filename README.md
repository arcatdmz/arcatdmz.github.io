# junkato.jp

[![Build Status](https://travis-ci.com/arcatdmz/arcatdmz.github.io.svg?branch=main&status=passed)](https://travis-ci.com/arcatdmz/arcatdmz.github.io)
[![github-pages](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/gh-pages.yml/badge.svg?branch=main)](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/gh-pages.yml)

All rights on image, video, text, and related resources (e.g., including paper PDF files) reserved.

## Dependencies

- `Gulp v4`
- `Webpack v4` + `Babel-loader v8` + `Babel v7`
- `TypeScript v3.8`
- `Pug v2` (as part of `gulp-pug` plugin)

## Directory structure

- `src/`: source files
  - `javascripts/`: TypeScript files
  - `stylesheets/`: LESS files
  - `data/`: JSON files
  - `images/`: image files
  - `thumbnails/`: thumbnail image files
  - `ja/`: Japanese pug files
  - `.htaccess`: Apache .htaccess file
  - `junkato.bib`: BibTeX file
- `build/`: intermediate build files
- `dist/`: build results
- `semantic/`: Semantic UI source files

## Production build

```sh
$ npm install -g gulp-cli
$ npm install
$ gulp
```

## Debug build

```sh
$ npm install -g gulp-cli
$ npm install
$ gulp debug
```

## Browser-sync

Run the following command after `gulp` build will launch a new browser window.

```sh
$ gulp dev
```

## See also

- [arcatdmz/blog](https://github.com/arcatdmz/blog): blog.junkato.jp source code

---

https://github.com/arcatdmz/arcatdmz.github.io
