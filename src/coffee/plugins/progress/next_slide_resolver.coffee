# this plugin requires all slides to have data-id="" defined

class @NextSlideResolverPlugin extends AbstractFormsliderPlugin
  # @config =

  init: =>
    @on('ready', @onReady)
    # @on('question-answered', @onQuestionAnswered)
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

  onQuestionAnswered: (event, $answer, value, slideIndex) =>
    currentSlide = @slideByIndex(slideIndex)

    answerNextId = $answer.data('next-id')

    nextId       = $(currentSlide).data('next-id')
    nextId       = answerNextId if answerNextId != undefined

    @makeToNextSlide(nextId, slideIndex + 1, currentSlide)

  makeToNextSlide: (nextId, insertAtIndex, currentSlide) =>
    nextSlide = @slideById(nextId)

    # console.warn '!!!', 'nextId', nextId, 'nextSlide:', nextSlide

    # return unless nextSlide.length

    @formslider.driver.moveSlide(nextSlide, insertAtIndex)
    #@formslider.driver.removeSlide(nextSlide)
    #$(nextSlide).detach().insertAfter(currentSlide)

    @trigger('next-slide-changed', nextSlide)

  onResolve: (event) =>
    currentSlide = @formslider.driver.get(@formslider.index())

    nextId  = $(currentSlide).data('next-id')

    selectedAnswer = $(".#{@config.answerSelectedClass}", currentSlide)
    if selectedAnswer.length
      nextIdFromAnswer = selectedAnswer.data('next-id')
      nextId     = nextIdFromAnswer if nextIdFromAnswer != undefined

    if nextId != undefined
      nextSlide = @slideById(nextId)
      @makeToNextSlide(nextId, $(currentSlide).index() + 1, currentSlide)
      @trigger('next-slide-changed', nextSlide)
