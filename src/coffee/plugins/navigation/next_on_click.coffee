class @NextOnClickPlugin extends AbstractFormsliderPlugin
  @config =
    selector: '.next-button, .answer'
    waitAfterClick: 10

  init: =>
    $buttons = $(@config.selector, @container)
    $buttons.on('mouseup', @onClick)

  onClick: (event) =>
    event.preventDefault()

    unless @timeout
      @timeout = setTimeout(
        =>
          @formslider.next()
          @timeout = null
      , @config.waitAfterClick)
