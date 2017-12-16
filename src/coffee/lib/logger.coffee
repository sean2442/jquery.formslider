
class Logger
  constructor: (@namespace) ->
    console?.warn?('jquery.debug not loaded') unless $.debug

  # first arg should be a string
  info: =>
    arguments[0] = "#{@namespace}::#{arguments[0]}"
    $.debug.info(arguments...)

  debug: =>
    arguments[0] = "#{@namespace}::#{arguments[0]}"
    $.debug.debug(arguments...)

  warn: =>
    arguments[0] = "#{@namespace}::#{arguments[0]}"

    return $.debug.warn(arguments...) if $.debug.isEnabled()

    # always log warnings to browser console
    console?.warn?(arguments...)

  error: =>
    arguments[0] = "#{@namespace}::#{arguments[0]}"

    return $.debug.error(arguments...) if $.debug.isEnabled()

    # always log errors to browser console
    console?.error?(arguments...)
