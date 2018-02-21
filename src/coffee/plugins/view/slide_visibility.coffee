class @SlideVisibility extends AbstractFormsliderPlugin
  init: =>
    @on('before', @showNextSlide)
    @on('after',  @hideOtherSlides)

    @hide(@slides)
    @show(@slideByIndex())

  showNextSlide: (event, current, direction, next) =>
    @show(next)

  hideOtherSlides: (event, current, direction, prev) =>
    @hide(@slides.not(current))
    
  hide: (slide) =>
    $(slide).css('opacity', 0)

  show: (slide) ->
    $(slide).css('opacity', 1)
