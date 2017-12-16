gulp        = require 'gulp'
sass        = require 'gulp-sass'
cssmin      = require 'gulp-cssmin'
rename      = require 'gulp-rename'
sourcemaps  = require 'gulp-sourcemaps'
concat      = require 'gulp-concat'
runSequence = require 'run-sequence'

gulp.task 'compile-sass', (cb) ->
  runSequence(
    'compile-sass-to-src'
    'concat-css'
    'minify-css'
  , cb)

gulp.task 'compile-sass-to-src', ->
  gulp.src('src/sass/**/*.sass')
      .pipe(
        sourcemaps.init())
      .pipe(
          sass())
      .pipe(
          sourcemaps.write('./maps'))
      .pipe(
          gulp.dest('./dist'))

gulp.task 'concat-css', ->
  gulp.src(['bower_components/flexslider/flexslider.css', 'dist/formslider.css'])
      .pipe(
        concat('formslider.css'))
      .pipe(
          gulp.dest('./dist'))

gulp.task 'minify-css', ->
  gulp.src('dist/formslider.css')
      .pipe(
        sourcemaps.init())
      .pipe(
        cssmin())
      .pipe(
        rename({ suffix: '.min' }))
      .pipe(
          sourcemaps.write('./maps'))
      .pipe(
          gulp.dest('./dist'))

gulp.task 'compile-karma-browse-sass', ->
  gulp.src('spec/browse/browse.sass')
      .pipe(
          sass())
      .pipe(
          gulp.dest('spec/browse/'))
