class @AnswerClickPlugin extends AbstractFormsliderPlugin
  init: =>
    $answers = $(@config.answerSelector, @container)
    $answers.on('mouseup', @onAnswerClicked)

  onAnswerClicked: (event) =>
    event.preventDefault()
    $answer          = $(event.currentTarget)
    $answerRow       = $answer.closest(@config.answersSelector)
    $allAnswersinRow = $(@config.answerSelector, $answerRow)

    $allAnswersinRow.removeClass(@config.answerSelectedClass)
    $answer.addClass(@config.answerSelectedClass)

    @trigger('question-answered',
      $answer,
      $('input', $answer).val(),
      @formslider.index()
    )
