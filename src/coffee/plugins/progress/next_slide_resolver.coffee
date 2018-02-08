# this plugin requires all slides to have data-id="" defined

class @NextSlideResolverPlugin extends AbstractFormsliderPlugin
  # @config =

  init: =>
    @on('ready', @onReady)
    @on('before-driver-next', @onResolve)

  # set next-id based on native order if not set for slide
  onReady: (event) =>
    @slides.each( (index, slide) =>
      $slide      = $(slide)
      slideBefore = @slides.get(index - 1)

      if slideBefore && $(slideBefore).data('next-id') == undefined
        $(slideBefore).data('next-id', $slide.data('id'))
                      .addClass("next-id-#{$slide.data('id')}")
    )

  onResolve: (event) =>
    currentSlide = @formslider.driver.get(@formslider.index())

    nextId  = $(currentSlide).data('next-id')

    selectedAnswer = $(".#{@config.answerSelectedClass}", currentSlide)
    if selectedAnswer.length
      nextIdFromAnswer = selectedAnswer.data('next-id')
      nextId     = nextIdFromAnswer if nextIdFromAnswer != undefined

    if nextId != undefined
      nextSlide = @slideById(nextId)
      event.nextIndex = nextSlide.index() - 1
      @trigger('next-slide-changed', nextSlide)
