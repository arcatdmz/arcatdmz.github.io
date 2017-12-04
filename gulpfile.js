var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');

gulp.task('html', function(){
  return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
});

gulp.task('css', function(){
  return gulp.src('src/stylesheets/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/stylesheets'))
});

gulp.task('default', [ 'html', 'css' ]);