class @AbstractFormsliderPlugin
  constructor: (@formslider, config) ->
    @config    = ObjectExtender.extend({}, @constructor.config, config)
    @container = @formslider.container
    @slides    = @formslider.slides
    @events    = @formslider.events
    @logger    = new Logger("jquery.formslider::#{@constructor.name}")
    @init()

  init: ->
    null

  # event helper
  on: (eventName, callback) =>
    @events.on("#{eventName}.#{@constructor.name}", callback)

  off: (eventName) =>
    @events.off("#{eventName}.#{@constructor.name}")

  cancel: (event) =>
    @events.cancel(event)

  isCanceled: (event) =>
    @events.isCanceled(event)

  trigger: () =>
    @events.trigger(arguments...)

  # depends on plugins/generic/tracking
  track: (source, value, category = null) =>
    @events.trigger('track', source, value, category)

  # depends on plugins/view/add_slide_classes
  slideByRole: (role) =>
    $(".slide-role-#{role}", @container)

  slideById: (id) =>
    $(".slide-id-#{id}", @container)

  slideByIndex: (indexFromZero) =>
    @slides.get(indexFromZero)
