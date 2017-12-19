class @InputFocusPlugin extends AbstractFormsliderPlugin
  @config =
    selector: 'input:visible'
    waitBeforeFocus: 200
    disableOnMobile: true

  init: =>
    @on('after', @onAfter)

  onAfter: (e, currentSlide, direction, prevSlide) =>
    return if @config.disableOnMobile && FeatureDetector.isMobileDevice()

    $input = $(@config.selector, currentSlide)

    return unless $input.length

    setTimeout(
      ->
        $input.first().focus()
    ,
    @config.waitBeforeFocus)
