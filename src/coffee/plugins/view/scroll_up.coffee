
class @ScrollUpPlugin extends AbstractFormsliderPlugin
  @config =
    selector: '.headline'
    duration: 200
    tolerance: 80
    scrollUpOffset: 30

  init: =>
    @on('after', @onAfter)
    @window = $(window)

  onAfter: (e, current, direction, prev) =>
    $element = $(@config.selector, current)

    return if @isOnScreen($element)

    $("html, body").animate({
      scrollTop: Math.max(0, $element.offset().top - @config.scrollUpOffset)
    }, @config.duration)

  isOnScreen: ($element) =>
    viewport =
      top: @window.scrollTop()
      left: @window.scrollLeft()
    viewport.right = viewport.left + @window.width()
    viewport.bottom = viewport.top + @window.height()
    bounds = $element.offset()
    bounds.right = bounds.left + $element.outerWidth()
    bounds.bottom = bounds.top + $element.outerHeight()
    return !(
      viewport.right < bounds.left ||
      viewport.left > bounds.right ||
      viewport.bottom < bounds.top - @config.tolerance ||
      viewport.top > bounds.bottom - @config.tolerance)
