class @AnswerMemory extends AbstractFormsliderPlugin
  init: =>
    @on('question-answered', @memorize)
    @memoryBySlideId = {}

  memorize: (event, $answer, value, slideIndex) =>
    $slide       = $(@slides.get(slideIndex))
    slideId      = $slide.data('id')

    @memoryBySlideId[slideId] =
      id:    $('input', $answer).prop('id')
      value: value
