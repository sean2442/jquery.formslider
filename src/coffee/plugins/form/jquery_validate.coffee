class @JqueryValidate extends AbstractFormsliderPlugin
  @config =
    selector: 'input:visible:not([readonly])'
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

    if !$inputs.valid()
      $inputs.filter('.error').first().focus()
      @trigger("validation.invalid.#{currentRole}", currentSlide)
      event.canceled = true
      return false

    @trigger("validation.valid.#{currentRole}", currentSlide)

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
