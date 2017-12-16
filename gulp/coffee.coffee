gulp       = require 'gulp'
gutil      = require 'gulp-util'
coffee     = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'
include    = require 'gulp-include'
uglify     = require 'gulp-uglify'
rename     = require 'gulp-rename'
coffeelint = require 'gulp-coffeelint'

gulp.task 'compile-coffee', ->
  gulp.src('src/coffee/*.coffee')
      .pipe(
        include({ extensions: 'coffee' }))
      .pipe(
        sourcemaps.init())
      .pipe(
        coffee({bare: false}).on('error', gutil.log))
      .pipe(
        sourcemaps.write('maps'))
      .pipe(
        gulp.dest('./dist'))

gulp.task 'compile-coffee-and-uglify', ->
  gulp.src('src/coffee/*.coffee')
      .pipe(
        include({ extensions: 'coffee' }))
      .pipe(
        sourcemaps.init())
      .pipe(
        coffee({bare: false}).on('error', gutil.log))
      .pipe(
        uglify())
      .pipe(
        rename({ suffix: '.min' }))
      .pipe(
        sourcemaps.write('maps'))
      .pipe(
        gulp.dest('./dist'))

gulp.task 'coffee-lint', ->
  gulp.src('src/**/*.coffee')
      .pipe(
        coffeelint())
      .pipe(
        coffeelint.reporter())
      .pipe(
        coffeelint.reporter('fail')
      )
