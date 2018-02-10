class @NavigateOnKey extends AbstractFormsliderPlugin
  @config =
    actions: [

      { # right arrow
        context: document
        action: 'next'
        code: 39
        wait: 100
      }
      { # return
        selector: 'input'
        action: 'next'
        code: 13
        wait: 100
      }
      { # left arrow
        context: document
        action: 'prev'
        code: 37
        wait: 100
      }
    ]

  init: =>
    $.each(@config.actions, (index, action) =>
      if action?.selector
        $target = $(action.selector, @container)
      else
        $target = $(action.context)

      $target.on('keydown', action, @onKey)
    )

  onKey: (event) =>
    keyCode = event.keyCode || event.which

    return unless keyCode == event.data.code

    @runTimeout(@formslider[event.data.action], event.data.wait)

  runTimeout: (callback, wait) =>
    unless @timeout
      @timeout = setTimeout(
        =>
          callback()
          @timeout = null
      , wait)
