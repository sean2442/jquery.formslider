class @FormSubmission extends AbstractFormsliderPlugin
  @config =
    submitOnEvents: ['validation.valid.contact']

    successEventName: 'form-submitted'
    errorEventName:   'form-submission-error'
    loadHiddenFrameOnSuccess: null

    formSelector: 'form'

    submitter:
      class: 'FormSubmitterCollect'
      endpoint: '#'
      method:   'POST'

  init: =>
    @form = $(@config.formSelector)

    for eventName in @config.submitOnEvents
      @on(eventName, @onSubmit)

    SubmitterClass = window[@config.submitter.class]
    @submitter     = new SubmitterClass(@, @config.submitter, @form)


  onSubmit: (event, currentSlide) =>
    return if @isCanceled(event)

    @submitter.submit(event, currentSlide)

  onDone: =>
    @trigger(@config.successEventName)
    @loadHiddenFrameOnSuccess()
    @logger.debug('onDone')

  onFail: =>
    @logger.error('onFail', @config.errorEventName)
    @trigger(@config.errorEventName)

  loadHiddenFrameOnSuccess: (url) ->
    return unless @config.loadHiddenFrameOnSuccess?
    $('<iframe>', {
      src: @config.loadHiddenFrameOnSuccess
      id:  'formslider_conversion_frame'
      frameborder: 0
      scrolling: 'no'
    })
    .css(
      width: 0
      height: 0
    )
    .appendTo('body')
