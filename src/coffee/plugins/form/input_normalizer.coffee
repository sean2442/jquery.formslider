class @InputNormalizer extends AbstractFormsliderPlugin
  @config =
    selector: 'input'

  init: =>
    @mormalizeInputs()

  mormalizeInputs: =>
    $(@config.selector, @container).each( (index, input) =>
      $input = $(input)

      @normalizeRequired($input)
      @normalizeAutocomplete($input)
      @normalizeInputmode($input)
      @normalizeXAttributes($input)
    )
    return # performance, dont return loops in coffee

  normalizeRequired: ($input) ->
    return unless $input.attr('required')

    $input.data('required', 'required')
    $input.data('aria-required', 'true')

  normalizeAutocomplete: ($input) ->
    autocompleete = $input.attr('autocompletetype')
    autocompleete = $input.attr('autocomplete') unless autocompleete

    return unless autocompleete

    $input.attr('autocompletetype', autocompleete)
    $input.attr('autocomplete', autocompleete)

  normalizeInputmode: ($input) ->
    return if $input.attr('inputmode')

    switch $input.attr('type')
      when 'number' then $input.attr('inputmode', 'numeric')
      when 'tel'    then $input.attr('inputmode', 'tel')
      when 'email'  then $input.attr('inputmode', 'email')
      when 'url'    then $input.attr('inputmode', 'url')

  # Firefox OS
  normalizeXAttributes: ($input) ->
    for attribute in ['inputmode', 'autocompletetype']
      if $input.attr(attribute)
        $input.attr("x-#{attribute}", $input.attr(attribute))

    return # performance, dont return loops in coffee
