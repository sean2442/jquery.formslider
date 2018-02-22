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

  hide: (slide) ->
    $(slide)
      .css('opacity', 0)
      .data('slide-visibility', 0) # work around -> see slide_visibility.spec

  show: (slide) ->
    $(slide)
      .css('opacity', 1)
      .data('slide-visibility', 1) # work around -> see slide_visibility.spec
