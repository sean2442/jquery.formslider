class @JqueryInputValidator extends AbstractFormsliderPlugin
  @config =
    selectors:
      elements: 'input, textarea, select'
      ignore:   ':hidden, [readonly]'

    validateOnEvents: ['leaving.next']

    messages:
      generic:   'invalid'
      email:     'invalid email'
      tel:       'invalid phone number'
      number:    'invalid number'
      minlength: 'to short'
      maxlength: 'to long'
      required:  'required'

  init: =>
    @validator = @container.iValidator(@config)

    for eventName in @config.validateOnEvents
      @on(eventName, @onValidate)

  onValidate: (event, currentSlide, direction, nextSlide) =>
    currentRole = $(currentSlide).data('role')

    errors = @validate(currentSlide)
    if errors == true
      @trigger("validation.valid.#{currentRole}", currentSlide)
      return

    @trigger("validation.invalid.#{currentRole}", currentSlide, errors)
    event.canceled = true

    # trigger resize if error labels changed the dom
    setTimeout(
      ->
        $(window).trigger('resize')
      , 400
    )

  validate: ($inputs) =>
    @validator.validate($inputs)
