class @JqueryAnimate extends AbstractFormsliderPlugin
  @config =
    dataPrefix:     'animate' # means data-animate
    defaultDuration: 600

  init: =>
    @prepareAnimations(@container)

  prepareAnimations: (context) =>
    dataKey   = "#{@config.dataPrefix}"
    $elements = $("[data-#{dataKey}]", context)
    return unless $elements.length
    $elements.each((index, element) =>
      $element = $(element)
      data     = $element.data(dataKey)
      return unless data?.on
      for event in data.on.split(',')
        @on(event.trim(), (e, current, direction, next) =>
          @doAnimation($element, data)
          @off(event.trim()) if data?.once
        )
      return # performance
    )

  doAnimation: ($element, data) =>
    $element = if data?.selector then $(data.selector) else $element
    duration = data.duration || @config.defaultDuration

    $element.stop()            if data?.stop
    $element.delay(data.delay) if data?.delay
    $element.css(data.css)     if data?.css

    if data?.complete
      callback = =>
        @doAnimation($element, data.complete)

    $element.animate(data.animate, duration, callback)
