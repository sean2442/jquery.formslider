class @FormSubmissionPlugin extends AbstractFormsliderPlugin
  @config =
    submitOnEvents: ['validation.valid.contact']

    successEventName: 'form-submitted'
    errorEventName:   'form-submission-error'
    loadHiddenFrameOnSuccess: 'url'

    strategy:
      # type: 'submit'     # trivial submit
      # formSelector: 'form'

      # make sure to load https://github.com/jquery-form/form
      # type: 'ajaxSubmit'
      # formSelector: 'form'

      type:     'collect'
      endpoint: '#'
      method:   'POST'

  init: =>
    for eventName in @config.submitOnEvents
      @on(eventName, @onSubmit)

  onSubmit: (event, currentSlide) =>
    return @isCanceled(event)

    switch @config.strategy.type
      when 'submit'
        $form = $(@config.formSelector)
        $form.submit()

      when 'ajaxSubmit'
        $form = $(@config.formSelector)
        $form.ajaxSubmit(@config.strategy)
        $form.data('jqxhr')
          .done(@onDone)
          .fail(@onFail)

      when 'collect'
        $.ajax(
          cache: false
          url: @config.strategy.endpoint
          method: @config.strategy.method
          data: @collectInputs()
        )
        .done(@onDone)
        .fail(@onFail)

  onDone: =>
    @trigger(@config.successEventName)
    @loadHiddenFrameOnSuccess()
    @logger.debug('onDone')

  onFail: =>
    @logger.error('onFail', @config.errorEventName)
    @trigger(@config.errorEventName)

  collectInputs: =>
    result = {}

    $inputs = $('input', @container)
    for input in $inputs
      $input = $(input)

      if $input.is(':checkbox') || $input.is(':radio')
        if $input.is(':checked')
          result[$input.attr('name')] = $input.val()

      else
        result[$input.attr('name')] = $input.val()

    $others = $('select, textarea', @container)
    for other in $others
      $other = $(other)
      result[$other.attr('name')] = $other.val()

    result

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
