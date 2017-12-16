gulp    = require 'gulp'
Server  = require('karma').Server

gulp.task 'karma', (done) ->
  server = new Server(
    configFile: __dirname + '/../spec/config.coffee'
  )

  server.start((err) ->
    if err == 0
      done()
    else
      done(new (gutil.PluginError)('karma', message: 'Karma Tests failed'))
  )

gulp.task 'karma-and-browse', (done) ->
  server = new Server(
    configFile: __dirname + '/../spec/browse/config.coffee'
  )

  server.start((err) ->
    # we do not call done, because we want to browse ;)
  )
