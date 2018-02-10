class @InputSync extends AbstractFormsliderPlugin
  @config =
    selector: 'input'
    attribute: 'name'

  init: =>
    @storage = {}
    @on('after', @onAfter)

  onAfter: (event, currentSlide, direction, prevSlide) =>
    $inputsHere  = $(@config.selector, prevSlide)

    $inputsHere.each( (index, input) =>
      $input = $(input)
      @storage[$input.attr(@config.attribute)] = $input.val()
    )

    $inputsThere = $(@config.selector, currentSlide)
    $inputsThere.each( (index, input) =>
      $input = $(input)
      inputName = $input.attr(@config.attribute)
      $input.val(@storage[inputName]) if @storage[inputName]
    )
