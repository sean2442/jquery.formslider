class @JqueryValidate extends AbstractFormsliderPlugin
  @config =
    validationSelector: 'input:visible:not([readonly])'
    preparationSelector: 'input:not([readonly])'

    validateOnEvents: ['leaving.next']
    # coffeelint: disable
    forceMaxLengthJs: "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    # coffeelint: enable

    pattern:
      numeric: '\\d*'
      tel: '^[0-9\\-\\+\\s\\(\\)]*$'

    messages:
      required:  'Required'
      maxlength: 'To long'
      minlength: 'To short'
      tel:       'Enter valid phone number'
      email:     'Enter valid email'
      number:    'Enter valid number'
      pattern:   'Invalid input'


  init: =>
    for eventName in @config.validateOnEvents
      @on(eventName, @onValidate)

    @setupValidationRules()
    @prepareInputs()
    @trigger("validation.prepared")

  onValidate: (event, currentSlide, direction, nextSlide) =>
    $inputs = $(@config.validationSelector, currentSlide)

    return if !$inputs.length

    currentRole = $(currentSlide).data('role')

    if $inputs.valid()
      @trigger("validation.valid.#{currentRole}", currentSlide)
      return

    $inputs.filter('.error').first().focus()
    @trigger("validation.invalid.#{currentRole}", currentSlide)
    event.canceled = true

    # trigger resize if error labels changed the dom
    setTimeout(
      ->
        $(window).trigger('resize')
      , 400
    )

  setupValidationRules: ->
    jQuery.validator.addMethod( 'pattern', (value, element, options) =>
      return value.match($(element).attr('pattern'))
    )

    jQuery.validator.addMethod( 'tel', (value, element, options) =>
      pattern = $(element).attr('pattern') || @config.pattern.tel
      return value.match(pattern)
    )

    jQuery.validator.addMethod( 'number', (value, element, options) =>
      pattern = $(element).attr('pattern') || @config.pattern.number
      return value.match(pattern)
    )

  setAttrUnless: ($target, attributeName, value) ->
    $target.attr(attributeName, value) unless $target.attr(attributeName)

  prepareInputs: ($inputs)=>
    $(@config.preparationSelector, @container).each( (index, input) =>
      $input = $(input)

      switch $input.attr('type')
        when 'number'
          $input.attr('data-rule-number', 'true')
          @setAttrUnless($input, "data-msg-number", @config.messages.number)

        when 'tel'
          $input.attr('data-rule-tel', 'true')
          @setAttrUnless($input, "data-msg-tel", @config.messages.tel)

        when 'email'
          $input.attr('data-rule-email', 'true')
          @setAttrUnless($input, 'data-msg-email', @config.messages.email)

      for attribute in ['required', 'pattern']
        if $input.attr(attribute)
          $input.attr("data-rule-#{attribute}", 'true')
          @setAttrUnless($input, "data-msg-#{attribute}",
            @config.messages[attribute])

      for attribute in ['maxlength', 'minlength']
        if $input.attr(attribute)
          @setAttrUnless($input, "data-rule-#{attribute}",
            $input.attr(attribute))
          @setAttrUnless($input, "data-msg-#{attribute}",
            @config.messages[attribute])

      if $input.attr('data-force-max-length')
        $input.attr('oninput', @config.forceMaxLengthJs)

      if($input.attr('data-without-spinner'))
        $input.addClass('without-spinner')
        # add something like this in your css:
        # input.without-spinner
        #   -moz-appearance: textfield
        #
        # input.without-spinner::-webkit-outer-spin-button,
        # input.without-spinner::-webkit-inner-spin-button
        #   -webkit-appearance: none
        #   margin: 0
    )
