class @LazyLoadPlugin extends AbstractFormsliderPlugin
  @config =
    lazyClass: 'lazy-load'
    dataKey: 'src'

  init: =>
    @doLazyLoad(@slideByIndex(0))
    @doLazyLoad(@slideByIndex(1))
    @on('after', @onAfter)

  onAfter: =>
    currentIndex = @formslider.index()
    @doLazyLoad(@slideByIndex(currentIndex + 1))

  doLazyLoad: (slide) =>
    $("img.#{@config.lazyClass}", slide).each( @_loadLazyCallback )

  _loadLazyCallback: (index, el) =>
    $el = $(el)
    $el.attr('src', $el.data(@config.dataKey))
      .removeData(@config.dataKey)
      .removeClass(@config.lazyClass)
