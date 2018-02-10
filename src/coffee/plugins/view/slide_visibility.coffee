class @SlideVisibility extends AbstractFormsliderPlugin
  @config =
    hideAnimationDuration: 300

  init: =>
    @on('before', @showNextSlide)
    @on('after', @hideAdjescentSlides)

    @hide(@slides, 0)
    @show(@slideByIndex())

  showNextSlide: (event, current, direction, next) =>
    @show next

  hideAdjescentSlides: (event, current, direction, prev) =>
    @hide @slideByIndex(@index() + 1)
    @hide @slideByIndex(@index() - 1)

  hide: (slide, duration=null) =>
    duration = @config.hideAnimationDuration if duration == null
    $(slide)
      .animate({opacity: 0}, duration)
      .data('slide-visibility', 0)

  show: (slide) ->
    $(slide)
      .finish()
      .css('opacity', 1)
      .data('slide-visibility', 1)
