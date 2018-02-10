class @LoadingState extends AbstractFormsliderPlugin
  @config =
    selector: '.progressbar-wrapper, .formslider-wrapper'
    loadingClass: 'loading'
    loadedClass: 'loaded'

  init: =>
    @on('ready', @onReady)

  onReady: =>
    $(@config.selector)
      .removeClass(@config.loadingClass)
      .addClass(@config.loadedClass)
