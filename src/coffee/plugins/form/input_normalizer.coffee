class @InputNormalizer extends AbstractFormsliderPlugin
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

      autocompleete = $input.attr('autocompletetype')
      autocompleete = $input.attr('autocomplete') unless autocompleete
      if autocompleete
        $input.attr('autocompletetype', autocompleete)
        $input.attr('autocomplete', autocompleete)

      for attribute in ['inputmode', 'autocompletetype']
        if $input.attr(attribute)
          $input.attr("x-#{attribute}", $input.attr(attribute))

      return # performance, dont return loops in coffee
    )
    return # performance, dont return loops in coffee
