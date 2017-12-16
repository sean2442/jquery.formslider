gulp       = require 'gulp'
gutil      = require 'gulp-util'
coffee     = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'
include    = require 'gulp-include'
uglify     = require('gulp-uglify')
rename     = require 'gulp-rename'

gulp.task 'compile-dependencies', ->
  gulp.src('src/jquery.formslider.dependencies.js')
      .pipe(
        include({ extensions: 'js' }))
      .pipe(
        sourcemaps.init())
      .pipe(
        sourcemaps.write('maps'))
      .pipe(
        gulp.dest('./dist'))

gulp.task 'compile-dependencies-and-uglify', ->
  gulp.src('src/jquery.formslider.dependencies.js')
      .pipe(
        include({ extensions: 'js' }))
      .pipe(
        sourcemaps.init())
      .pipe(
        uglify())
      .pipe(
        rename({ suffix: '.min' }))
      .pipe(
        sourcemaps.write('maps'))
      .pipe(
        gulp.dest('./dist'))
