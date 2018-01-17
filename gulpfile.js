const gulp = require('gulp');
const watch = require('gulp-watch');
const path = require('path');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const pug = require('gulp-pug');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-csso');
const ts = require('gulp-typescript');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const del = require('del');
const fs = require('fs');
const bibtexParse = require('bibtex-parse-js');
const htmlhint = require("gulp-htmlhint")

const tsProject = ts.createProject('tsconfig.json');
const tsNodeProject = ts.createProject('tsconfig-node.json');
const webpackConfigFile = './webpack.config';
const webpackDebugConfigFile = './webpack-debug.config';
const bibtexFile = 'src/junkato.bib';

var website = loadConfig();

function loadConfig(){
  website = JSON.parse(fs.readFileSync('./website.json'));
}
loadConfig();

gulp.task('semantic-js', require('./semantic/tasks/build/javascript'));
gulp.task('semantic-assets', require('./semantic/tasks/build/assets'));
gulp.task('semantic', ['semantic-js', 'semantic-assets']);

gulp.task('del', function(){
  return del([
      'dist/**/*'
    , 'build/**/*'
  ]);
});

gulp.task('del:js', function(){
  return del([
      'src/javascripts/**/*.js'
    , 'dist/javascripts/**/*.js'
  ]);
});

gulp.task('del:node', function(){
  return del([
    , 'build/**/*.js'
  ]);
});

gulp.task('ts', ['del:js'], function(){
  return gulp.src('src/**/*.ts')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(tsProject())
    .pipe(gulp.dest('src'));
});

gulp.task('ts:node', ['del:node'], function(){
  return gulp.src('src/javascripts/*.ts')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(tsNodeProject())
    .pipe(gulp.dest('build/javascripts'));
});

gulp.task('bibtex', function(callback) {
  const bibtexJSON = bibtexParse.toJSON(
    fs.readFileSync(
        bibtexFile
      , { encoding: 'UTF-8' }));
  if (!fs.existsSync('dist/data')) {
    fs.mkdirSync('dist/data');
  }
  fs.writeFileSync('dist/data/publications.json', JSON.stringify(bibtexJSON, '  '))
  callback();
});

gulp.task('copy:bibtex', ['bibtex'], function(){
  return gulp.src('dist/data/publications.json')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('build/data'));
})

gulp.task('replace:node', function(){
  loadConfig();
  return gulp.src('src/**/*.json', { base: 'src'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(replace('${rootPath}', website.rootPath))
    .pipe(gulp.dest('build'));
});

gulp.task('copy:fonts', function(){
  return gulp.src('node_modules/devicon/fonts/*', { base: 'node_modules/devicon'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
});

gulp.task('replace:devicon', function(){
  return gulp.src('node_modules/devicon/*.css', { base: 'node_modules/devicon' })
    .pipe(replace('url(\'fonts/', 'url(\'/fonts/'))
    .pipe(gulp.dest('build/stylesheets/'));
});

gulp.task('js', ['ts'], function(){
  const webpackConfig = require(webpackConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js:debug', ['ts'], function(){
  const webpackConfig = require(webpackDebugConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', ['ts:node', 'replace:node', 'copy:bibtex'], function(){
  return compilePug(gulp.src(['src/**/*.pug', '!src/**/_*.pug']));
});

function compilePug(stream) {
  return stream.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug({
      locals: setupLocals(),
      verbose: true,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
}

gulp.task('lint:html', function() {
  return gulp.src('dist/**/*.html')
    .pipe(htmlhint())
	  .pipe(htmlhint.failAfterError())
});

function setupLocals() {
  loadConfig();
  const histories = require('./build/javascripts/histories').default
    , awards = require('./build/javascripts/awards').default
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
    , projects: projects
    , projectsTable: projectsTable
    , recentProjects: recentProjects
    , publications: publications
    , publicationsTable: publicationsTable
    , selectedPublications: selectedPublications
  }
  for (var key in website) {
    if (typeof website[key] !== 'string') continue;
    locals[key] = website[key];
  }
  return locals;
}

gulp.task('css', ['replace:devicon'], function(){
  return compileCSS(gulp.src('src/stylesheets/**/*.less'));
});

function compileCSS(stream){
  return stream.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(browserSync.stream());
}

gulp.task('copy', ['copy:bibtex'], function(){
  return gulp.src(['src/**/*.{pdf,png,jpg,bib,json}', 'src/.htaccess'], { base: 'src'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
})

gulp.task('site', ['semantic', 'copy:fonts'], function(){
  for (const name of ['html', 'css', 'js', 'copy']) {
    gulp.start(name);
  }
});

gulp.task('site:debug', ['semantic', 'copy:fonts'], function(){
  for (const name of ['html', 'css', 'js:debug', 'copy']) {
    gulp.start(name);
  }
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  gulp.watch('dist/**/*.{html,js}', ['reload']);
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('watch', function(){
  gulp.watch(['src/**/*.pug', 'src/**/*.{bib,json}'], ['html']);
  gulp.watch(['semantic/**/*.{less,overrides,variables}', 'src/stylesheets/**/*.less'], ['css']);
  gulp.watch('src/**/*.ts', ['js:debug']);
  gulp.watch('src/**/*.{pdf,png,jpg,bib,json}', ['copy']);
  gulp.watch('semantic/**/*.js', ['semantic']);
});

gulp.task('watch:html', function(){
  return watch(['src/**/*.pug'], function(vinyl){
    // vinyl.type: add | change | unlink
    if (vinyl.event === 'unlink') return;
    // vinyl.path: full path
    const fullPath = vinyl.path;
    const basePath = path.resolve(__dirname, 'src');
    const relPath = path.relative(basePath, fullPath);

    // _layout.pug that affects all pages
    if (relPath === '_layout.pug') {
      return compilePug(gulp.src(['src/**/*.pug', '!src/**/_*.pug']));
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

gulp.task('watch:css', function(){
  return watch(['semantic/**/*.{less,overrides,variables}', 'src/stylesheets/**/*.less'], function(){
    return gulp.start('css');
  });
});

gulp.task('default', ['site']);
gulp.task('debug', ['site:debug']);
gulp.task('sync', ['watch', 'browser-sync']);
gulp.task('sync:html', ['watch:html', 'watch:css', 'browser-sync']);
