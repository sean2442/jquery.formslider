class @AnswerMemory extends AbstractFormsliderPlugin
  init: =>
    @on('question-answered', @memorize)
    @memoryByQuestionId = {}

  memorize: (event, questionId, answerId, value) =>
    @memoryByQuestionId[questionId] =
      id:    answerId
      value: value

    @trigger('answer-memory-updated',
      @memoryByQuestionId
    )
