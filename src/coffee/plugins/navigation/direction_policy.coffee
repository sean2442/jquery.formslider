class @DirectionPolicyPlugin extends AbstractFormsliderPlugin
  @config =
    cancelEventOn: []

  init: =>
    $.each(@config.cancelEventOn, (index, eventName) =>
      @on(eventName, @cancelEvent)
    )

  cancelEvent: (event, current, direction, next) =>
    @cancel(event)
