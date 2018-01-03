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

const tsProject = ts.createProject('tsconfig.json');
const tsNodeProject = ts.createProject('tsconfig-node.json');
const webpackConfig = require('./webpack.config');

gulp.task('semantic', require('./semantic/tasks/build'));
gulp.task('semantic-watch', require('./semantic/tasks/watch'));

gulp.task('del', function(){
  return del(['dist/**/*', '!dist/semantic/**/*']);
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
  return gulp.src('src/javascripts/history*.ts')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(tsNodeProject())
    .pipe(gulp.dest('.'));
});

gulp.task('js', ['ts'], function(){
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('html', ['ts:node'], function(){
  const histories = require('./histories').default;
  return gulp.src(['src/**/*.pug', '!src/**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug({ locals: {
      histories: histories
    } }))
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
  return gulp.src('src/**/*.{pdf,png,jpg,bibtex,json}', { base: 'src'})
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
  gulp.watch('src/stylesheets/**/*.less', ['css']);
  gulp.watch('src/**/*.ts', ['js']);
  gulp.watch('src/**/*.{pdf,png,jpg}', ['copy']);
});

gulp.task('watch-all', ['semantic-watch', 'watch']);

gulp.task('default', ['site']);
gulp.task('sync', ['watch-all', 'browser-sync']);
