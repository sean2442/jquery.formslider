
# TODO think about implementing drivers as plugins
#      introduce events for "driver.goto", "driver.reorder" etc.
#      you can have multiple driver -> make sure the index is synchron

class @DriverFlexslider
  @config =
    selector:       '.formslider > .slide'
    animation:      'slide'
    animationSpeed: 200
    smoothHeight:   true
    useCSS:         true
    directionNav:   false
    controlNav:     false
    slideshow:      false
    keyboard:       false
    animationLoop:  false

  constructor: (@container, @config, @onBefore, @onAfter, @onReady) ->
    @config = ObjectExtender.extend({}, DriverFlexslider.config, @config)
    @config.after             = @_internOnAfter
    @config.conditionalBefore = @_internOnBefore
    @config.start             = @_internOnReady

    @slides                   = $(@config.selector, @container)

    @container.flexslider(@config)
    @instance = @container.data('flexslider')

  goto: (indexFromZero) =>
    @container.flexslider(indexFromZero, true, true)
    #@instance.flexAnimate(indexFromZero, true)

  index: =>
    @instance.currentSlide

  _internOnReady: (slider) =>
    # fix: trigger resize on ready, so smooth height will not fail
    setTimeout(
      =>
        $(window).trigger('resize')
        @onReady()
    , 10)

  _internOnBefore: (currentIndex, direction, nextIndex) =>
    result = @onBefore(currentIndex, direction, nextIndex)
    return result if result == false

    # fix: onAfter callback gets triggert to early when using css transitions
    @start = +new Date() if @config.useCSS

  _internOnAfter: (slider) =>
    # fix: flexslider falsy triggers onAfter on initialization
    return if slider.lastSlide == slider.currentSlide

    return @onAfter() unless @config.useCSS

    # fix: onAfter callback gets triggert to early when using css transitions
    setTimeout(@onAfter, @config.animationSpeed - ((+new Date()) - @start))
