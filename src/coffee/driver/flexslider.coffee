
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
    @config.conditionalBefore = @onBefore
    @config.start             = @onReady

    @slides                   = $(@config.selector, @container)

    @container.flexslider(@config)
    @instance = @container.data('flexslider')

  next: =>
    @container.flexslider("next")

  prev: =>
    @container.flexslider("prev")

  goto: (indexFromZero) =>
    @container.flexslider(indexFromZero, true)

  get: (indexFromZero) =>
    indexFromZero = @index() if indexFromZero == undefined
    @slides.get(indexFromZero)

  index: =>
    @instance.currentSlide

  _internOnAfter: (slider) =>
    # will be triggered on window resize after first slide
    return if slider.lastSlide == slider.currentSlide

    @onAfter(slider)

  removeSlide: (slide) =>
    @instance.removeSlide(slide)

  addSlide: (slide, position) =>
    @instance.addSlide(slide, position)

  moveSlide: (slide, position) =>
    @instance.moveSlide(slide, position)
