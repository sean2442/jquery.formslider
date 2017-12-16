
class @AbstractFormsliderLoader
  @config =
    duration: 2000

  constructor: (@plugin, @config, @slide) ->
    @config = ObjectExtender.extend({}, @constructor.config, @config)
    @animating = false

  start: =>
    return false if @animating
    @plugin.logger.debug "start(#{@config.duration})"
    @animating = true
    setTimeout(
      @stop,
      @config.duration
    )

  stop: =>
    @plugin.logger.debug 'stop()'
    @animating = false
    @plugin.formslider.next()
