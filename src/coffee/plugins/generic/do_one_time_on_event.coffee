class @DoOneTimeOnEvent extends AbstractFormsliderPlugin
  init: =>
    $.each(@config, (eventName, callback) =>
      if typeof(callback) == 'function'
        @on(eventName, =>
          @off(eventName)
          callback(@)
        )
    )
