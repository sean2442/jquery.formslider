class @TabIndexSetterPlugin extends AbstractFormsliderPlugin
  @config =
    selector: 'input:visible, a, select, textarea, button'

  init: =>
    @disableTabs()
    @enableTabs(@slideByIndex(0))
    @on('after', @onAfter)

  onAfter: (event, currentSlide, direction, prevSlide) =>
    @disableTabs()
    @enableTabs(currentSlide)

  enableTabs: (slide) =>
    $(@config.selector, slide).attr('tabindex', 0)

  disableTabs: =>
    $(@config.selector, @container).attr('tabindex', '-1')
