var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-csso');
var browserSync = require('browser-sync');

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

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  gulp.watch('dist/**/*.html', ['reload']);
  gulp.watch('dist/stylesheets/**/*.css', ['reload']);
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.pug', '!src/**/_*.pug'], ['html']);
  gulp.watch('src/stylesheets/**/*.less', ['css']);
});

gulp.task('default', [ 'html', 'css' ]);
gulp.task('sync', [ 'default', 'browser-sync', 'watch' ]);
