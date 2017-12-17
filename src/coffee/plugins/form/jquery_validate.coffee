class @JqueryValidatePlugin extends AbstractFormsliderPlugin
  @config =
    selector: 'input:visible'
    validateOnEvents: ['leaving.next']
    # coffeelint: disable
    forceMaxLengthJs: "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    # coffeelint: enable
    messages:
      required:  'Required'
      maxlength: 'To long'
      minlength: 'To short'
      email:     'Enter valid E-Mail'

  init: =>
    for eventName in @config.validateOnEvents
      @on(eventName, @onValidate)

    @prepareInputs()
    @trigger("validation.prepared")

  onValidate: (event, currentSlide, direction, nextSlide) =>
    $inputs = $(@config.selector, currentSlide)

    return if !$inputs.length

    currentRole = $(currentSlide).data('role')

    try
      if $inputs.valid()
        @trigger("validation.valid.#{currentRole}", currentSlide)

      else
        $inputs.filter('.error').first().focus()
        @trigger("validation.invalid.#{currentRole}", currentSlide)
        return @cancel(event)

    catch error
      @trigger("validation.error.#{currentRole}", currentSlide)
      @logger.debug('validation error', error)

  prepareInputs: =>
    $(@config.selector, @container).each( (index, input) =>
      $input = $(input)

      if $input.attr('required')
        $input.data('data-rule-required', 'true')
        $input.data('data-msg-required', @config.messages.required)

      if $input.data('type') == 'number'
        $input.attr('pattern', '\\d*')
        $input.attr('inputmode', 'numeric')

      if($input.data('without-spinner'))
        $input.addClass('without-spinner')
          
      for attribute in ['maxlength', 'minlength']
        if $input.attr(attribute)
          $input.data("data-rule-#{attribute}", $input.attr(attribute))
          $input.data("data-msg-#{attribute}", @config.messages[attribute])

      if $input.data('force-max-length')
        $input.attr('oninput', @config.forceMaxLengthJs)

      if $input.attr('type') == 'email'
        $input.data('data-msg-email', @config.messages.email)
    )
