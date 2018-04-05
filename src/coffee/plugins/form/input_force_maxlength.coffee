class @InputForceMaxlength extends AbstractFormsliderPlugin
  @config =
    selector: 'input, textarea'
    # coffeelint: disable
    forceMaxLengthJs: "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    # coffeelint: enable

  init: =>
    @prepareInputs($(@config.selector))

  prepareInputs: ($inputs)=>
    $inputs.each( (index, input) =>
      $input = $(input)
      if $input.data('force-max-length')
        $input.attr('oninput', @config.forceMaxLengthJs)
    )
