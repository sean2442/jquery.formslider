class @SlideVisibilityPlugin extends AbstractFormsliderPlugin
  @config = {}

  init: =>
    @on('before', @showNextSlide)
    @on('after', @hideAdjescentSlides)

    @hide @slides
    @show @slideByIndex(@formslider.index())

  showNextSlide: (event, current, direction, next) =>
    @show next

  hideAdjescentSlides: (event, current, direction, prev) =>
    @hide @slideByIndex(@formslider.index() + 1)
    @hide prev

  hide: (slide) ->
    $(slide).css('opacity', 0).data('slide-visibility', 0)

  show: (slide) ->
    $(slide).css('opacity', 1).data('slide-visibility', 1)
