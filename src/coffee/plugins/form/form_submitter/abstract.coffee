class @FormSubmitterAbstract
  constructor: (@plugin, @config, @form) ->
    @config = ObjectExtender.extend({}, @constructor.config, @config)

  supressNaturalFormSubmit: =>
    @form.submit((e)->
      e.preventDefault()
      return false
    )
