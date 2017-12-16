class @ScrollUpPlugin extends AbstractFormsliderPlugin
  @config =
    scrollUpIfNotVisibleSelector: '.headline'
    duration: 200
    tolerance: 30

  init: =>
    @on('after', @onBefore)

  onBefore: (e, current, direction, next) =>
    $scrollTo = $(@config.scrollUpIfNotVisibleSelector, current)

    tolerance = @config.tolerance || 0
    return unless $scrollTo.isInViewport(
      tolerance: tolerance
    ).length

    $("html, body").animate({
      scrollTop: Math.max(0, $scrollTo.offset().top - tolerance)
    }, @config.duration)
