class @EqualHeight extends AbstractFormsliderPlugin
  @config =
    selector: '.answer .text'

  init: =>
    @on('ready',           @equalizeAll)
    @on('resize',          @equalizeAll)
    @on('do-equal-height', @doEqualize)

  equalizeAll: =>
    for i in [0..@slides.length - 1]
      @doEqualize(null, @slideByIndex(i))

    return # performance, dont return loops in coffee

  doEqualize: (event, slide) =>
    $elements = $(@config.selector, slide)

    return unless $elements.length

    maxHeight = 0
    for element in $elements
      $element = $(element)
      $element.css('height', 'auto')
      maxHeight = Math.max(maxHeight, $element.outerHeight())

    $elements.css('height', maxHeight)
