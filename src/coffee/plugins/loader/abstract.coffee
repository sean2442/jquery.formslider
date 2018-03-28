class @AbstractFormsliderLoader extends AbstractFormsliderPlugin
  @config =
    duration: 1000

  init: =>
    @on('after.loader', @onLoaderStart)
    @on('leaving.loader', @onLeaving)
    @locking = new Locking(false)
    @slide   = @slideByRole('loader')

  onLoaderStart: (event, currentSlide, direction, nextSlide) =>
    @start() unless @locking.locked

  onLeaving: (event, current, direction, next) =>
    @cancel(event) if @locking.locked

  # loader animation flow methods
  start: =>
    return false if @locking.locked
    @locking.lock()
    @logger.debug "start(#{@config?.duration || 1000})"
    setTimeout(
      @doAnimation,
      @config?.duration || 1000
    )

  doAnimation: ->
    # this is the method you have to implement and call stop if finished

  stop: =>
    @logger.debug 'stop()'
    @locking.unlock()
    @formslider.next()
