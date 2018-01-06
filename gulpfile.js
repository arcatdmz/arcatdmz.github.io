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
const bibtexFile = 'src/junkato.bib';

gulp.task('semantic-js', require('./semantic/tasks/build/javascript'));
gulp.task('semantic-assets', require('./semantic/tasks/build/assets'));
gulp.task('semantic', ['semantic-js', 'semantic-assets']);

gulp.task('del', function(){
  return del([
      'dist/**/*'
    , '!dist/semantic'
    , '!dist/semantic/**/*'
  ]);
});

gulp.task('del:js', function(){
  return del([
      'src/javascripts/**/*.js'
    , 'dist/javascripts/**/*'
    , '*.js'
    , '!gulpfile.js'
    , '!webpack.config.js'
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
    .pipe(gulp.dest('.'));
});

gulp.task('js', ['ts'], function(){
  const webpackConfig = require(webpackConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('html', ['ts:node'], function(){
  const bibtexJSON = bibtexParse.toJSON(
    fs.readFileSync(
        bibtexFile
      , { encoding: 'UTF-8' }));
  return gulp.src(['src/**/*.pug', '!src/**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug({
      locals: {
        histories: require('./histories').default,
        awards: require('./awards').default,
        publications: require('./publications').parse(bibtexJSON)
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
  return gulp.src('src/**/*.{pdf,png,jpg,bib,json}', { base: 'src'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
})

gulp.task('site', ['semantic'], function(){
  for (const name of ['html', 'css', 'js', 'copy']) {
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
gulp.task('sync', ['watch', 'browser-sync']);
