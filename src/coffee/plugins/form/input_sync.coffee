class @InputSync extends AbstractFormsliderPlugin
  @config =
    selector: 'input'
    attribute: 'name'
    syncGlobal: false

  init: =>
    @storage = {}
    @on('after', @onAfter)

  onAfter: (event, currentSlide, direction, prevSlide) =>
    $inputsHere = @readInputs(prevSlide)

    @writeInputs(currentSlide, $inputsHere)

  readInputs: (slide) =>
    $inputsHere  = $(@config.selector, slide)

    $inputsHere.each( (index, input) =>
      $input = $(input)
      if $input.is(':checkbox') || $input.is(':radio')
        if $input.is(':checked')
          @storage[$input.attr(@config.attribute)] = $input.val()

      else
        @storage[$input.attr(@config.attribute)] = $input.val()
    )

  writeInputs: (slide, $inputsHere) =>
    if @config.syncGlobal
      $inputsThere = $(@config.selector)
    else
      $inputsThere = $(@config.selector, slide)

    $inputsThere.not($inputsHere).each( (index, input) =>
      $input    = $(input)
      inputName = $input.attr(@config.attribute)

      return unless @storage[inputName]

      if $input.is(':checkbox') || $input.is(':radio')
        if $input.attr('value') == @storage[inputName]
          $input.attr('checked', 'checked')
      else
        $input.val(@storage[inputName])
    )
