# Karma configuration

module.exports = (config) ->
  config.set

    # base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: __dirname + '/../'


    # frameworks to use
    # available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine']
    client:
      jasmine:
        random: true
        seed: '4321'
        stopOnFailure: false
        verbose: true

    # list of files to exclude
    exclude: [
    ]

    # preprocess matching files before serving them to the browser
    # available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      # Fix: coverage preprocessor have to run with coffee
      '**/*.coffee': ['coffee', 'coverage']
    }

    coffeePreprocessor:
      options:
        bare: true
        sourceMap: true

      transformPath: (path) ->
        path.replace(/\.coffee$/, '.js')

    # list of files / patterns to load in the browser
    files: [
      'spec/**/*.spec.coffee'
      'spec/helper/**/*.coffee'
      'bower_components/jquery/dist/jquery.js'
      'dist/jquery.formslider.dependencies.js'
      'dist/formslider.css'
      'spec/browse/browse.css'
      # 'dist/maps/**/*'
      'src/coffee/**/*.coffee'
      {
        pattern:  'spec/fixtures/*.html'
        watched:  true
        served:   true
        included: false
      }
    ]


    # test results reporter to use
    # possible values: 'dots', 'progress'
    # available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'coveralls']

    specReporter:
      maxLogLines: 5              # limit number of lines logged per test
      suppressErrorSummary: true  # do not print error summary
      suppressFailed: false       # do not print information about failed tests
      suppressPassed: false       # do not print information about passed tests
      suppressSkipped: true       # do not print information about skipped tests
      showSpecTiming: false       # print the time elapsed for each spec
      failFast: false             # test would finish with error when a first fail occurs.

    coverageReporter:
      dir: 'coverage/'
      reporters:[
        { type: 'html', subdir: 'report-html' }
        { type: 'lcov' }
      ]


    # web server port
    port: 9876


    # enable / disable colors in the output (reporters and logs)
    colors: true


    # level of logging
    # possible values:
    # - config.LOG_DISABLE
    # - config.LOG_ERROR
    # - config.LOG_WARN
    # - config.LOG_INFO
    # - config.LOG_DEBUG
    logLevel: config.LOG_INFO


    # enable / disable watching file and executing tests whenever any file changes
    autoWatch: false


    # start these browsers
    browsers: ['ChromeHeadless']


    # Continuous Integration mode
    # if true, Karma captures browsers, runs the tests and exits
    singleRun: true

    # Concurrency level
    # how many browser should be started simultaneous
    concurrency: 3

    formatError: (msg) ->
      colors = require('colors')
      msg = "\n" + msg.replace(/in .*\.js.*/g, '')
               .replace(/<-(.*)/g, '')
               .replace(/(\(evaluating.*)/g, (match, $1) ->
                  $1.yellow.underline
                )
               .replace(/(.*)@(.*)/g, (match, $1, $2) ->
                  $1.yellow + ' -> ' + $2
               )
               # .replace(/.*->(.*):/g, (match, $1, $2) ->
               #    $1.underline
               # )
               .replace(/-> (.*)(:[0-9]+:[0-9]*)/g, (match, $1, $2) ->
                  $1.underline + $2.yellow + "\t\t"
               )
               .replace(/src\/coffee(\/)*/g, '')
               .replace(/[\n\r]/g, "\n\n")
      #
      # console.log 'START'
      # console.log msg.replace(/<-(.*)/g, '')
      # console.log 'END'
      # process.exit()
