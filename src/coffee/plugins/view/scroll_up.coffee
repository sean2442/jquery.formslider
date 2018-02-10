
class @ScrollUp extends AbstractFormsliderPlugin
  @config =
    selector: '.headline'
    duration: 500
    tolerance: 80
    scrollUpOffset: 30

    scrollTo: (plugin, $element) ->
      Math.max(0, $element.offset().top - plugin.config.scrollUpOffset)

    checkElement: (plugin, slide) ->
      $(plugin.config.selector, slide)

  init: =>
    @on('after', @onAfter)
    @window = $(window)

  onAfter: (e, current, direction, prev) =>
    $element = @config.checkElement(@, current)

    unless $element.length
      @logger.warn "no element found for selector #{@config.selector}"
      return

    return if @isOnScreen($element)

    $("html, body").animate({
      scrollTop: @config.scrollTo(@, $element)
    }, @config.duration)


  isOnScreen: ($element) =>
    viewport =
      top: @window.scrollTop()

    viewport.bottom = viewport.top + @window.height()
    bounds = $element.offset()
    bounds.bottom = bounds.top + $element.outerHeight()

    return !(
      viewport.bottom < bounds.top - @config.tolerance ||
      viewport.top > bounds.bottom - @config.tolerance)
