var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-csso');
var babel = require('gulp-babel');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync');

tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function() {
  return gulp.src('src/**/*.ts')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(tsProject())
    //.pipe(babel())
    .pipe(gulp.dest('dist'))
});

gulp.task('html', function(){
  return gulp.src(['src/**/*.pug', '!src/**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug())
    .pipe(gulp.dest('dist/'))
});

gulp.task('css', function(){
  return gulp.src('src/stylesheets/**/*.less')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/stylesheets'))
});

gulp.task('copy', function(){
  return gulp.src('src/**/*.{pdf,png,jpg}', { base: 'src'})
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gulp.dest('dist'));
})

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  gulp.watch('dist/**/*.{html,pdf,png,jpg}', ['reload']);
  gulp.watch('dist/javascripts/**/*.js', ['reload']);
  gulp.watch('dist/stylesheets/**/*.css', ['reload']);
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('watch', function(){
  gulp.watch(['src/**/*.pug', '!src/**/_*.pug'], ['html']);
  gulp.watch('src/stylesheets/**/*.less', ['css']);
  gulp.watch('src/**/*.ts', ['ts']);
  gulp.watch('src/**/*.{pdf,png,jpg}', ['copy']);
});

gulp.task('default', ['html', 'css', 'ts', 'copy']);
gulp.task('sync', ['default', 'browser-sync', 'watch']);
