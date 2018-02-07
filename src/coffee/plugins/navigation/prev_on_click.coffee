class @PrevOnClickPlugin extends AbstractFormsliderPlugin
  @config =
    selector: '.prev-button'
    waitAfterClick: 10

  init: =>
    $buttons = $(@config.selector, @container)
    $buttons.on('mouseup', @onClick)

  onClick: (event) =>
    event.preventDefault()

    unless @timeout
      @timeout = setTimeout(
        =>
          @formslider.prev()
          @timeout = null
      , @config.waitAfterClick)
