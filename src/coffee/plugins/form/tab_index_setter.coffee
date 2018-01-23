class @TabIndexSetterPlugin extends AbstractFormsliderPlugin
  @config =
    selector: 'input, a, select, textarea, button, area, object'

  init: =>
    @disableTabs()
    @enableTabs(@slideByIndex(0))
    @on('after', @onAfter)

  onAfter: (event, currentSlide, direction, prevSlide) =>
    @disableTabs()
    @enableTabs(currentSlide)

  enableTabs: (slide) =>
    $(@config.selector, slide).each((index, el) ->
      $(el).attr('tabindex', index + 1)
    )

  disableTabs: =>
    $(@config.selector, @container).attr('tabindex', '-1')
