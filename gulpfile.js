const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
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

const tsProject = ts.createProject('tsconfig.json');
const tsNodeProject = ts.createProject('tsconfig-node.json');
const webpackConfigFile = './webpack.config';
const webpackDebugConfigFile = './webpack-debug.config';
const bibtexFile = 'src/junkato.bib';

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
    , 'dist/javascripts/**/*'
    , 'build/**/*'
  ]);
});

gulp.task('ts', ['del:js'], function(){
  return gulp.src('src/**/*.ts')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(tsProject())
    .pipe(gulp.dest('src'));
});

gulp.task('ts:node', function(){
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
  return gulp.src('dist/data/publications.json', { base: 'dist' })
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('build'));
})

gulp.task('copy:node', function(){
  return gulp.src('src/**/*.json', { base: 'src'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('build'));
});

gulp.task('js', ['ts'], function(){
  const webpackConfig = require(webpackConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('js:debug', ['ts'], function(){
  const webpackConfig = require(webpackDebugConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', ['ts:node', 'copy:node', 'copy:bibtex'], function(){
  return gulp.src(['src/**/*.pug', '!src/**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug({
      locals: {
        histories: require('./build/javascripts/histories').default,
        awards: require('./build/javascripts/awards').default,
        projects: require('./build/javascripts/projects').default,
        publications: require('./build/javascripts/publications').parse(require('./build/data/publications.json'))
      },
      verbose: true,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function(){
  return gulp.src('src/stylesheets/**/*.less')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(browserSync.stream());
});

gulp.task('copy', function(){
  return gulp.src(['src/**/*.{pdf,png,jpg,bib,json}', 'src/.htaccess'], { base: 'src'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
})

gulp.task('site', ['semantic'], function(){
  for (const name of ['html', 'css', 'js', 'copy']) {
    gulp.start(name);
  }
});

gulp.task('site:debug', ['semantic'], function(){
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
  gulp.watch(['src/**/*.pug'], ['html']);
  gulp.watch(['semantic/**/*.{less,overrides,variables}','src/stylesheets/**/*.less'], ['css']);
  gulp.watch('src/**/*.ts', ['js']);
  gulp.watch('src/**/*.{pdf,png,jpg,bib,json}', ['copy']);
  gulp.watch('semantic/**/*.js', ['semantic']);
});

gulp.task('default', ['site']);
gulp.task('debug', ['site:debug']);
gulp.task('sync', ['watch', 'browser-sync']);
