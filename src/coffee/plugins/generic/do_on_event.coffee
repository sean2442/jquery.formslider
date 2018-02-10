class @DoOnEvent extends AbstractFormsliderPlugin
  init: =>
    $.each(@config, (eventName, callback) =>
      if typeof(callback) == 'function'
        @on(eventName, =>
          callback(@)
        )
    )
