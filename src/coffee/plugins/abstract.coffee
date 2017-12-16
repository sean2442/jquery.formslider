class @AbstractFormsliderPlugin
  constructor: (@formslider, config) ->
    @config    = ObjectExtender.extend({}, @constructor.config, config)
    @container = @formslider.container
    @slides    = @formslider.slides
    @logger    = new Logger("jquery.formslider::#{@constructor.name}")
    @init()

  init: ->
    null

  # event helper
  on: (eventName, callback) =>
    @formslider.events.on("#{eventName}.#{@constructor.name}", callback)

  off: (eventName) =>
    @formslider.events.off("#{eventName}.#{@constructor.name}")

  cancel: (event) =>
    @formslider.events.cancel(event)

  isCanceled: (event) =>
    @formslider.events.isCanceled(event)

  trigger: () =>
    @formslider.events.trigger(arguments...)

  # depends on plugins/generic/tracking
  track: (source, value, category = null) =>
    @formslider.events.trigger('track', source, value, category)

  # depends on plugins/view/add_slide_classes
  slideByRole: (role) =>
    $(".slide-role-#{role}", @container)

  slideById: (id) =>
    $(".slide-id-#{id}", @container)

  slideByIndex: (indexFromZero) =>
    @slides.get(indexFromZero)
