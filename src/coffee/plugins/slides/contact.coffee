class @ContactSlidePlugin extends AbstractFormsliderPlugin
  init: =>
    @on('leaving.contact', @onLeaving)

  onLeaving: (event, current, direction, next) =>
    @cancel(event) if direction == 'prev'
