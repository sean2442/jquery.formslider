class @FormSubmitterAjax extends FormSubmitterAbstract
  constructor: (@plugin, @config, @form) ->
    super(@plugin, @config, @form)
    @supressNaturalFormSubmit()

  submit: (event, slide) =>
    @form.ajaxSubmit(@config)
    @form.data('jqxhr')
      .done(@plugin.onDone)
      .fail(@plugin.onFail)
