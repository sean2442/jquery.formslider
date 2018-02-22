class @AnswerClick extends AbstractFormsliderPlugin
  init: =>
    @container.on('mouseup', @config.answerSelector, @onAnswerClicked)

  onAnswerClicked: (event) =>
    event.preventDefault()
    $answer          = $(event.currentTarget)
    $answerRow       = $answer.closest(@config.answersSelector)
    $allAnswersinRow = $(@config.answerSelector, $answerRow)

    $allAnswersinRow.removeClass(@config.answerSelectedClass)
    $answer.addClass(@config.answerSelectedClass)

    $slide = @slideByIndex()

    $questionInput = $(@config.questionSelector, $slide)
    $answerInput   = $('input', $answer)

    @trigger('question-answered',
      $questionInput.prop('id'),
      $answerInput.prop('id'),
      $answerInput.val(),
      @index()
    )
