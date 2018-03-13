class @SyncInnerAndOuterHeight extends AbstractFormsliderPlugin
  @config =
    wait: 200
    animationDuration: 400
    selectorInnerElement: '.formslider-wrapper'
    selectorOuterElement: '.formslider-wrapper'
    selectParent: (plugin) ->
      $(plugin.config.selectorOuterElement).parent()

  init: =>
    @on('ready',  @sync)
    @on('before', @sync)
    @on('resize', @sync)

  sync: (event, slide) =>
    setTimeout( =>
      @_sync(event, slide)
    ,
    @config.wait)

  _sync: (event, slide) =>
    $innerElements = $(@config.selectorInnerElement)
    $outerElements = @config.selectParent(@)

    return if $innerElements.length == 0 || $outerElements.length == 0

    newHeight = $innerElements.outerHeight(true)
    console.log newHeight
    $outerElements.animate({'height': "#{newHeight}px"}, @config.animationDuration)
