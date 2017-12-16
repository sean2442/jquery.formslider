class @InputFocusPlugin extends AbstractFormsliderPlugin
  @config =
    selector: 'input:visible'
    waitBeforeFocus: 200

  init: =>
    @on('after', @onAfter)

  onAfter: (e, currentSlide, direction, prevSlide) =>
    $input = $(@config.selector, currentSlide)

    return unless $input.length

    setTimeout(
      ->
        $input.first().focus()
    ,
    @config.waitBeforeFocus)
