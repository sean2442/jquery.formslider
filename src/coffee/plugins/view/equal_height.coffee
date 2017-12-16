class @EqualHeightPlugin extends AbstractFormsliderPlugin
  @config =
    selector: '.answer .text'

  init: =>
    @doEqualize(@slideByIndex(0))
    @on('ready', @onReady)
    @on('after', @onAfter)
    @on('resize', @onResize)

  onReady: =>
    @doEqualize(@slideByIndex(0))
    @doEqualize(@slideByIndex(1))

  onAfter: =>
    currentIndex = @formslider.index()
    @doEqualize(@slideByIndex(currentIndex + 1))

  onResize: =>
    currentIndex = @formslider.index()
    @doEqualize(@slideByIndex(currentIndex))
    @doEqualize(@slideByIndex(currentIndex + 1))

  doEqualize: (slide) ->
    $elements = $(@config.selector, slide)

    return unless $elements.length

    maxHeight = 0
    for element in $elements
      $element = $(element)
      $element.css('height', 'auto')
      maxHeight = Math.max(maxHeight, $element.outerHeight())

    $elements.css('height', maxHeight)
