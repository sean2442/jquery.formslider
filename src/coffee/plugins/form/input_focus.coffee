class @InputFocus extends AbstractFormsliderPlugin
  @config =
    selector: 'input:visible'
    disableOnMobile: true

  init: =>
    @on('after', @onAfter)

  onAfter: (e, currentSlide, direction, prevSlide) =>
    return if @config.disableOnMobile && FeatureDetector.isMobileDevice()

    $input = $(@config.selector, currentSlide)

    if !$input.length
      document.activeElement.blur() if "activeElement" in document
      return

    $input.first().focus()
