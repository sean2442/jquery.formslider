class @ConfirmationSlidePlugin extends AbstractFormsliderPlugin
  init: =>
    @on('leaving.confirmation', @onLeaving)

  onLeaving: (event, current, direction, next) =>
    @cancel(event)
