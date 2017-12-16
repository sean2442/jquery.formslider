class @ArrowNavigationPlugin extends AbstractFormsliderPlugin
  @config =
    selector: document
    keyCodeLeft: 37
    keyCodeRight: 39

  init: =>
    $trigger = $(@config.selector)
    $trigger.keydown(@onKeyPressed)

  onKeyPressed: (event) =>
    keyCode = event.keyCode || event.which

    switch keyCode
      when @config.keyCodeLeft
        @formslider.prev()

      when @config.keyCodeRight
        @formslider.next()
