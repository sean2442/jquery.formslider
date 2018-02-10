class @FormSubmitterCollect extends FormSubmitterAbstract
  constructor: (@plugin, @config, @form) ->
    super(@plugin, @config, @form)
    @supressNaturalFormSubmit()

  submit: (event, slide) =>
    $.ajax(
      cache:  false
      url:    @config.endpoint
      method: @config.method
      data:   @collectInputs()
    )
    .done(@plugin.onDone)
    .fail(@plugin.onFail)

  collectInputs: =>
    result = {}

    $inputs = $('input', @plugin.container)
    for input in $inputs
      $input = $(input)

      if $input.is(':checkbox') || $input.is(':radio')
        if $input.is(':checked')
          result[$input.attr('name')] = $input.val()

      else
        result[$input.attr('name')] = $input.val()

    $others = $('select, textarea', @plugin.container)
    for other in $others
      $other = $(other)
      result[$other.attr('name')] = $other.val()

    return result
