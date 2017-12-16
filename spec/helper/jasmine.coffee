helper = helper || {}

helper.jasmine =
  setTimeout: (durationMs) ->
    jasmine.DEFAULT_TIMEOUT_INTERVAL = durationMs
