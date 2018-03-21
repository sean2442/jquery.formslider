class @FormSubmitterCollect extends FormSubmitterAbstract
  @config =
    visitedSlideSelector: '.slide-visited'

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

    # all info inputs
    $inputs = $("input.info", $container)
    for input in $inputs
      $input = $(input)
      result[$input.attr('name')] = $input.val()

    # inputs on visited slides
    $container = $(@config.visitedSlideSelector, $container)
    $inputs = $('input, select, textarea', $container)
    for input in $inputs
      $input = $(input)
      if $input.is(':checkbox') || $input.is(':radio')
        result[$input.attr('name')] = $input.val() if $input.is(':checked')

      else
        result[$input.attr('name')] = $input.val()

    return result
