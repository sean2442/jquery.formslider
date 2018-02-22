class @TrackUserInteraction extends AbstractFormsliderPlugin
  @config:
    questionAnsweredEvent: 'question-answered'

  init: =>
    @setupQuestionAnswerTracking()
    @setupTransportTracking()

  setupTransportTracking: =>
    @on("after", (event, currentSlide, direction, prevSlide) =>
      role  = $(currentSlide).data('role')
      id    = $(currentSlide).data('id')

      @track("slide-#{@index()}-entered",  direction)
      @track("slide-role-#{role}-entered", direction)
      @track("slide-id-#{id}-entered",     direction) if id
    )

  setupQuestionAnswerTracking: =>
    @on('question-answered', (event, questionId, answerId, value, slideIndex) =>
      eventName = @config.questionAnsweredEvent

      @track(eventName, slideIndex)
      @track("#{eventName}-#{slideIndex}", value)
    )
