class @BrowserHistoryPlugin extends AbstractFormsliderPlugin
  @config =
    updateHash: true

  init: =>
    @on('after', @onAfter)

    @dontUpdateHistoryNow = false

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
      { index: @formslider.index() },
      "index #{@formslider.index()}",
      hash
    )

  handleHistoryChange: (event) =>
    return unless event.originalEvent?.state?

    newIndex = event.originalEvent.state.index

    @logger.debug('handleHistoryChange', newIndex)

    @dontUpdateHistoryNow = true

    @formslider.goto(newIndex)
