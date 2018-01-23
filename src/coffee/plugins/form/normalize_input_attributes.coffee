class @NormalizeInputAttributesPlugin extends AbstractFormsliderPlugin
  @config =
    selector: 'input:visible'

  init: =>
    @prepareInputs()

  prepareInputs: =>
    $(@config.selector, @container).each( (index, input) ->
      $input = $(input)

      if $input.attr('required')
        $input.data('required', 'required')
        $input.data('aria-required', 'true')

      for attribute in ['inputmode', 'autocompletetype']
        if $input.attr(attribute)
          $input.data("x-#{attribute}", $input.attr(attribute))

      return
    )
    return
