class @NextOnKeyPlugin extends AbstractFormsliderPlugin
  @config =
    selector: 'input'
    keyCode: 13

  init: =>
    $inputs = $(@config.selector, @container)

    $inputs.keypress(@onKeyPressed)

  onKeyPressed: (event) =>
    keyCode = event.keyCode || event.which
    @formslider.next() if keyCode == @config.keyCode
