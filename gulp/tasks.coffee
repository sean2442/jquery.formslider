gulp        = require 'gulp'
runSequence = require 'run-sequence'

gulp.task 'default', [
  'coffee-lint'
  'compile'
]

gulp.task 'compile',
[
  'compile-sass'
  'compile-coffee'
  'compile-coffee-and-uglify'
  'compile-dependencies'
  'compile-dependencies-and-uglify'
]

gulp.task 'test', (cb) ->
  runSequence(
              [
                'coffee-lint'
                'compile-sass'
                'compile-karma-browse-sass'
                'compile-dependencies'
              ]
              'karma'
              cb)

gulp.task 'browse', (cb) ->
  runSequence(
              [
                'compile-sass'
                'compile-karma-browse-sass'
                'compile-dependencies'
              ]
              'karma-and-browse'
              )
