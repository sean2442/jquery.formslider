
class @BrowserHistoryController extends AbstractFormsliderPlugin
  @config =
    updateHash: true
    resetStatesOnLoad: true

  init: =>
    @on('after', @onAfter) # just for state tracking

    @dontUpdateHistoryNow = false
    @time = new Date().getTime()

    @pushCurrentHistoryState()
    $(window).bind('popstate', @handleHistoryChange) # browser perv/next

  onAfter: =>
    if @dontUpdateHistoryNow
      @dontUpdateHistoryNow = false
      return

    @pushCurrentHistoryState()

  pushCurrentHistoryState: =>
    index = @index()
    hash = null
    hash = "##{index}" if @config.updateHash

    history.pushState(
      { index: index, time: @time },
      "index #{index}",
      hash
    )

  # controller method reacting on browser prev/next
  handleHistoryChange: (event) =>
    return if @formslider.locking.locked
    return unless event.originalEvent?.state

    state = event.originalEvent.state

    if @config.resetStatesOnLoad
      return unless state.time == @time

    @logger.debug('handleHistoryChange', state.index)

    @dontUpdateHistoryNow = true

    @formslider.goto(state.index)
