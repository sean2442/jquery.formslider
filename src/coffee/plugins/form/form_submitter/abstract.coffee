class @FormSubmitterAbstract
  constructor: (@plugin, @config, @form) ->

  supressNaturalFormSubmit: =>
    @form.submit((e)->
      e.preventDefault()
      return false
    )
