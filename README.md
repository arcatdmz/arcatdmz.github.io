# junkato.jp

[![Publish](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/deploy.yml)
[![Publish assets](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/publish-assets.yml/badge.svg?branch=main)](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/publish-assets.yml)

All rights on image, video, text, and related resources (e.g., including paper PDF files) reserved.

## Dependencies

- `Gulp v4`
- `Webpack v5` + `Babel-loader v9` + `Babel v7`
- `TypeScript v5`
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
