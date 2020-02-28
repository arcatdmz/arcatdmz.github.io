// Gulp packages
const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');

// General packages
const path = require('path');
const fs = require('fs');
const through2 = require('through2');
const browserSync = require('browser-sync');
const moment = require('moment');

// Load website-wide config
const tsProjectFile = './tsconfig.json';
const tsNodeProjectFile = './tsconfig-node.json';
const webpackConfigFile = './webpack.config';
const webpackDebugConfigFile = './webpack-debug.config';
const bibtexFile = './src/junkato.bib';

var website;
function loadConfig(){
  website = JSON.parse(fs.readFileSync('./website.json'));
}
loadConfig();

// Import Semantic UI tasks
gulp.task('semantic:js', require('./semantic/tasks/build/javascript'));
gulp.task('semantic:assets', require('./semantic/tasks/build/assets'));
gulp.task('semantic', gulp.parallel('semantic:js', 'semantic:assets'));

// Clean up
const del = require('del');

// [del]
gulp.task('del', function(){
  return del([
      'dist/**/*'
    , 'build/**/*'
  ]);
});

// [del:js]
gulp.task('del:js', function(){
  return del([
      'src/javascripts/**/*.js'
    , 'dist/javascripts/**/*.js'
  ]);
});

// [del:node]
gulp.task('del:node', function(){
  return del([
    , 'build/**/*.js'
  ]);
});

// TypeScript & JavaScript compilation
const ts = require('gulp-typescript');
const tsProject = ts.createProject(tsProjectFile);
const tsNodeProject = ts.createProject(tsNodeProjectFile);
const webpackStream = require('webpack-stream');
const webpack = require('webpack');

// [ts] should be called after del:js
gulp.task('ts', function(){
  return gulp.src('src/**/*.ts')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(tsProject())
    .pipe(gulp.dest('src'));
});

// [ts:node] should be called after del:node
gulp.task('ts:node', function(){
  return gulp.src('src/javascripts/*.ts')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(tsNodeProject())
    .pipe(gulp.dest('build/javascripts'));
});

// [js] should be called after ts
gulp.task('js', function(){
  const webpackConfig = require(webpackConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
});

// [js:debug] should be called after ts
gulp.task('js:debug', function(){
  const webpackConfig = require(webpackDebugConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
});

// Copy & replace
const bibtexParse = require('bibtex-parse-js');

// [bibtex]
gulp.task('bibtex', function(callback) {
  const bibtexJSON = bibtexParse.toJSON(
    fs.readFileSync(
        bibtexFile
      , { encoding: 'UTF-8' }));
  if (!fs.existsSync('dist')) fs.mkdirSync('dist');
  if (!fs.existsSync('dist/data')) fs.mkdirSync('dist/data');
  fs.writeFileSync('dist/data/publications.json', JSON.stringify(bibtexJSON, '  '))
  callback();
});

// [copy:bibtex] should be called after bibtex
gulp.task('copy:bibtex', function(){
  return gulp.src('dist/data/publications.json')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('build/data'));
});

// [copy:fonts]
gulp.task('copy:fonts', function(){
  return gulp.src('node_modules/devicon/fonts/*', { base: 'node_modules/devicon'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
});

// [copy:default] should be called after copy:bibtex
gulp.task('copy:default', function(){
  return gulp.src(['src/**/*.{pdf,png,jpg,bib,json,html,css,txt,package-list}', 'src/.htaccess'], { base: 'src'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
});

// [copy]
gulp.task('copy', gulp.parallel('copy:bibtex', 'copy:fonts', 'copy:default'));

// [replace:node]
gulp.task('replace:node', function(){
  loadConfig();
  return gulp.src('src/**/*.json', { base: 'src'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(replace('${rootPath}', website.rootPath))
    .pipe(gulp.dest('build'));
});

// [replace:devicon]
gulp.task('replace:devicon', function(){
  return gulp.src('node_modules/devicon/*.css', { base: 'node_modules/devicon' })
    .pipe(replace('url(\'fonts/', 'url(\'/fonts/'))
    .pipe(gulp.dest('build/stylesheets/'));
});

// HTML
const pug = require('gulp-pug');

// [html] should be called after ts:node, replace:node, copy:bibtex
// gulp.series('ts:node', 'replace:node', 'copy:bibtex')
gulp.task('html', function(){
  return compilePug(gulp.src(['src/**/*.pug', '!src/**/_*.pug']), false);
});

// [html:debug] should be called after ts:node, replace:node, copy:bibtex
// gulp.series('ts:node', 'replace:node', 'copy:bibtex'
gulp.task('html:debug', function(){
  return compilePug(gulp.src(['src/**/*.pug', '!src/**/_*.pug']), true);
});

function compilePug(stream, pretty) {
  return stream.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug({
      locals: setupLocals(),
      verbose: true,
      pretty: pretty
    }))
    .pipe(gulp.dest('dist/'));
}

function setupLocals() {
  loadConfig();
  const histories = require('./build/javascripts/histories').default
    , awards = require('./build/javascripts/awards').default
    , talks = require('./build/javascripts/talks').default
    , projects = require('./build/javascripts/projects').default
    , publications = require('./build/javascripts/publications').parse(
        JSON.parse(fs.readFileSync('./build/data/publications.json')));

  // build projects table and list
  const projectsTable = {};
  for (const entry of projects) {
    projectsTable[entry.project] = entry;
  }
  const recentProjects = [];
  for (const key of website.recentProjects) {
    recentProjects.push(projectsTable[key]);
  }

  // build publications table and list
  const publicationsTable = {};
  for (const entry of publications) {
    publicationsTable[entry.citationKey] = entry;
  }
  const selectedPublications = [];
  for (const key of website.selectedPublications) {
    selectedPublications.push(publicationsTable[key]);
  }

  // merge locals with website options
  var locals = {
      histories: histories
    , awards: awards
    , talks: talks
    , projects: projects
    , projectsTable: projectsTable
    , recentProjects: recentProjects
    , publications: publications
    , publicationsTable: publicationsTable
    , selectedPublications: selectedPublications
    , moment: moment
  }
  for (var key in website) {
    if (typeof website[key] !== 'string') continue;
    locals[key] = website[key];
  }

  locals.stripTags = function(text) { return text.replace(/(<([^>]+)>)/ig,""); };
  return locals;
}

// CSS
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const purify = require('gulp-purifycss');

// [css:debug] should be called after replace:devicon
gulp.task('css:debug', function(){
  return compileCSS(gulp.src('src/stylesheets/**/*.less'));
});

// [css:bare]
gulp.task('css:bare', function(){
  return compileCSS(gulp.src('src/stylesheets/**/*.less'));
});

// [css] should be called after css:debug, js, html
// gulp.series('css:debug', 'js', 'html')
gulp.task('css', function(){
  return gulp.src('dist/stylesheets/**/*.css', { base: 'dist' })
    .pipe(purify(['dist/**/*.js', 'dist/**/*.html'], { minify: true, info: true }))
    .pipe(gulp.dest('dist'));
});

function compileCSS(stream){
  return stream.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(browserSync.stream());
}

// Post-process
const gzip = require('gulp-gzip');
const sharp = require('sharp');
const File = require('vinyl');

// [gzip] should be called after js, css
// gulp.parallel('js', 'css')
gulp.task('gzip', function(){
  return gulp.src(['dist/**/*.{js,css}'])
    .pipe(gzip())
    .pipe(gulp.dest('dist'));
});

// [gzip:debug] should be called after js:debug, css:debug
// gulp.parallel('js:debug', 'css:debug')
gulp.task('gzip:debug', function(){
  return gulp.src(['dist/**/*.{js,css}'])
    .pipe(gzip())
    .pipe(gulp.dest('dist'));
});

// [sharp]
gulp.task('sharp', function(){
  return gulp.src('dist/images/**/*.jpg')
  .pipe(through2.obj(function(chunk, enc, cb) {
    if (chunk.isNull()) {
      this.push(chunk);
      return cb();
    }
    if (chunk.isStream()) {
      console.error('stream is not supported');
      return cb();
    }
    // chunk.isBuffer() === true
    const image = sharp(chunk.contents);
    image.metadata()
      .then(function(metadata) {
        // console.log(metadata);
        if (metadata.width < 200 || metadata.height < 200) {
          throw new Error(`[Skipped] ${chunk.path}`);
        }
        return image
          .resize(120)
          .max()
          .withoutEnlargement()
          .toFormat(metadata.format)
          .toBuffer();
      })
      .then(function(data) {
        const fullPath = chunk.path;
        const dirName = path.dirname(fullPath);
        const ext = path.extname(fullPath);
        const baseName = path.basename(fullPath, ext);
        const newBasePath = path.resolve(__dirname, 'dist');
        const newFilePath = path.join(dirName, `${baseName}-resized${ext}`);
        const newFile = new File({
            base: newBasePath
          , path: newFilePath
          , contents: data
        });
        console.log(`[Resized] ${newFilePath}`);
        cb(null, newFile);
      })
      .catch(function(err) {
        console.error(err.message);
        return cb();
      });
  }))
  .pipe(gulp.dest('dist'));
})

// Lint
const htmlhint = require("gulp-htmlhint")
const pdfinfo = require('pdfinfo');

// [lint:html]
gulp.task('lint:html', function() {
  return gulp.src(['dist/**/*.html', '!dist/picode/docs/**/*.html'])
    .pipe(htmlhint())
	  .pipe(htmlhint.failAfterError());
});

// [lint:pdf]
gulp.task('lint:pdf', function() {
  return gulp.src('dist/**/*.pdf')
  .pipe(through2.obj(function(chunk, enc, cb) {
      const pdf = pdfinfo(chunk.path, ["-enc", "UTF-8"]);
      pdf.info(function(err, meta) {
        // chunk.path
        // chunk.contents
        if (err) {
          console.error(chunk.path, err);
        } else {
          meta.file = chunk.path;
          console.log(meta);
          // example output of meta:
          // { title: 'プログラマ×デザイナ×エンドユーザのための三つ巴システム設計 +HCI系国際会議や研究インターンのご紹介\r',
          //   author: 'Jun Kato\r',
          //   creator: 'Acrobat PDFMaker 15 for PowerPoint\r',
          //   producer: 'Adobe PDF Library 15.0\r',
          //   created: '10/16/15 23:00:49\r',
          //   modified: '10/16/15 23:02:48\r',
          //   tagged: 'yes\r',
          //   form: 'none\r',
          //   pages: 15,
          //   encrypted: 'no\r',
          //   page_size: '960 x 540 pts (rotated 0 degrees)\r',
          //   file_size: '1771252 bytes\r',
          //   optimized: 'no\r',
          //   pdf_version: 1.6 }
        }
        cb(null, chunk);
      });
    }));
});

// Watch & sync
// [browser-sync]
gulp.task('browser-sync', function(){
  browserSync({
    port: 8080,
    server: {
      baseDir: 'dist/'
    }
  });
  gulp.watch('dist/**/*.{html,js}', gulp.task('reload'));
});

// [reload]
gulp.task('reload', function(){
  browserSync.reload();
});

// [watch]
gulp.task('watch', function(){
  gulp.watch(['src/**/*.pug', 'src/**/*.{bib,json}'], gulp.task('html'));
  gulp.watch(['semantic/**/*.{less,overrides,variables}', 'src/stylesheets/**/*.less'], gulp.task('css:bare'));
  gulp.watch('src/**/*.ts', gulp.task('js:debug'));
  gulp.watch('src/**/*.{pdf,png,jpg,bib,json}', gulp.task('copy'));
  gulp.watch('semantic/**/*.js', gulp.task('semantic'));
});

// [watch:html]
gulp.task('watch:html', function(){
  return gulp.watch('src/**/*.pug', function(vinyl){
    // vinyl.type: add | change | unlink
    if (vinyl.event === 'unlink') return;
    // vinyl.path: full path
    const fullPath = vinyl.path;
    const baseName = path.basename(fullPath);
    const basePath = path.resolve(__dirname, 'src');
    const relPath = path.relative(basePath, fullPath);
    const relDirPath = path.relative(basePath, path.dirname(fullPath));

    // _layout.pug affects all pages
    if (baseName.indexOf('_layout') === 0) {
      if (relDirPath.length > 0) {
        return compilePug(gulp.src([
            `src/${relDirPath}/**/*.pug`
          , `!src/${relDirPath}/**/_*.pug`
          , `src/ja/${relDirPath}/**/*.pug`
          , `!src/ja/${relDirPath}/**/_*.pug`
        ]));
      } else {
        return compilePug(gulp.src([
            'src/**/*.pug'
          , '!src/**/_*.pug'
        ]));
      }
    }

    // an English page that has a dependent Japanese page
    const jaPath = path.resolve(basePath, 'ja', relPath);
    if (relPath.indexOf('ja' + path.sep) < 0
        && fs.existsSync(jaPath)) {
      return compilePug(gulp.src([fullPath, jaPath], { base: basePath }));
    }

    // a Japanese pug page
    // or an English page that does not have a dependent Japanese page
    return compilePug(gulp.src([fullPath], { base: basePath }));
  });
});

// [watch:css]
gulp.task('watch:css', function(){
  return gulp.watch(['semantic/**/*.{less,overrides,variables}', 'src/stylesheets/**/*.less'], function(){
    return gulp.start('css:bare');
  });
});

// Build from scratch
// [site]
gulp.task('site', gulp.series('semantic', 'copy', 'html', 'js', 'css', 'gzip'));
// [site:debug]
gulp.task('site:debug', gulp.series('semantic', 'copy', 'html:debug', 'js:debug', 'css:debug', 'gzip:debug'));

// High-level tasks
gulp.task('default', gulp.task('site'));
gulp.task('debug', gulp.task('site:debug'));
gulp.task('test', gulp.task('lint:html'));
gulp.task('sync', gulp.parallel('watch', 'browser-sync'));
gulp.task('sync:html', gulp.parallel('watch:html', 'watch:css', 'browser-sync'));
