class @NavigateOnClick extends AbstractFormsliderPlugin
  @config =
    actions: [
      {
        selector: '.answer'
        action: 'next'
        wait: 200
      }
      {
        selector: '.next-button'
        action: 'next'
        wait: 10
      }
      {
        selector: '.prev-button'
        action: 'prev'
        wait: 10
      }
    ]

  init: =>
    for action in @config.actions
      $target = $(action.selector, @container)
      $target.on('mouseup', action, @onClick)

    return # performance, dont return loops in coffee

  onClick: (event, action) =>
    event.preventDefault()

    unless @timeout
      @timeout = setTimeout(
        =>
          @formslider[event.data.action].call()
          @timeout = null

      , event.data.wait)
