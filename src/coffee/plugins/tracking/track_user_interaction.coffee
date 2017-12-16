class @TrackUserInteractionPlugin extends AbstractFormsliderPlugin
  @config:
    questionAnsweredEvent: 'question-answered'

  init: =>
    @setupQuestionAnswerTracking()
    @setupTransportTracking()

  setupTransportTracking: =>
    @on("after", (event, currentSlide, direction, prevSlide) =>
      index = @formslider.index()
      role  = $(currentSlide).data('role')
      @track("slide-#{index}-entered", direction)
      @track("slide-role-#{role}-entered")
    )

  setupQuestionAnswerTracking: =>
    @on('question-answered', (event, $answer, value, slideIndex) =>
      eventName = @config.questionAnsweredEvent

      @track(eventName, slideIndex)
      @track("#{eventName}-#{slideIndex}", value)
    )
