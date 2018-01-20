
class @BrowserHistoryPlugin extends AbstractFormsliderPlugin
  @config =
    updateHash: true
    resetStatesOnLoad: true

  init: =>
    @on('after', @onAfter)

    @dontUpdateHistoryNow = false
    @time = new Date().getTime()

    @pushCurrentHistoryState()
    $(window).bind('popstate', @handleHistoryChange)

  onAfter: =>
    if @dontUpdateHistoryNow
      @dontUpdateHistoryNow = false
      return

    @pushCurrentHistoryState()

  pushCurrentHistoryState: =>
    hash = null
    hash = "##{@formslider.index()}" if @config.updateHash

    @logger.debug('pushCurrentHistoryState', hash)

    history.pushState(
      { index: @formslider.index(), time: @time },
      "index #{@formslider.index()}",
      hash
    )

  handleHistoryChange: (event) =>
    return unless event.originalEvent?.state?

    state = event.originalEvent.state

    if @config.resetStatesOnLoad
      return unless state.time == @time

    @logger.debug('handleHistoryChange', state.index)

    @dontUpdateHistoryNow = true

    @formslider.goto(state.index)
