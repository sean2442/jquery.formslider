class @LazyLoad extends AbstractFormsliderPlugin
  @config =
    lazyClass: 'lazy-load'
    dataKey: 'src'
    waitBeforeLoad: 10

  init: =>
    @doLazyLoad(@slideByIndex(0))
    @on('before', @onBefore)

  onBefore: (event, current, direction, next)=>
    @doLazyLoad(next)

  doLazyLoad: (slide) =>
    setTimeout(
      =>
        $("img.#{@config.lazyClass}", slide).each( @_loadLazyCallback )
        @trigger('do-equal-height', slide)
      ,
      @config.waitBeforeLoad
    )

  _loadLazyCallback: (index, el) =>
    $el = $(el)
    $el.attr('src', $el.data(@config.dataKey))
      .removeData(@config.dataKey)
      .removeClass(@config.lazyClass)
