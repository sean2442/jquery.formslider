# requires SlideVisibility
class @OrderByIdController extends AbstractFormsliderPlugin
  init: =>
    @on('controller.prev', @prev)
    @on('controller.next', @next)

  onCalculateLongestPath: (event) ->
    # TODO find longest path
    event.longest_path = 42

  next: (event) =>
    return if @isCanceled(event)

    currentSlide = @slideByIndex()

    nextId  = $(currentSlide).data('next-id')

    selectedAnswer = $(".#{@config.answerSelectedClass}", currentSlide)

    if selectedAnswer.length
      nextIdFromAnswer = selectedAnswer.data('next-id')
      nextId = nextIdFromAnswer if nextIdFromAnswer != undefined

    if nextId != undefined
      nextSlide = @slideById(nextId)
      nextSlide.data('prev-id', $(currentSlide).data('id'))
      @formslider.goto(nextSlide.index())

  prev: (event) =>
    return if @isCanceled(event)

    currentSlide = @slideByIndex()
    prevId = $(currentSlide).data('prev-id')

    if prevId != undefined
      nextSlide = @slideById(prevId)
      @cancel(event)
      $(currentSlide).data('prev-id', undefined)
      @formslider.goto(nextSlide.index())
