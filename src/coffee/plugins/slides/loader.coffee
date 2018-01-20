class @LoaderSlidePlugin extends AbstractFormsliderPlugin
  @config =
    loaderClass: 'SimpleLoaderImplementation'
    duration: 1000

  init: =>
    @on('after.loader', @onLoaderStart)
    @on('leaving.loader', @onLeaving)

  onLoaderStart: (event, currentSlide, direction, nextSlide) =>
    return if @isLoading()

    LoaderClass = window[@config.loaderClass]
    @loader     = new LoaderClass(@, @config, currentSlide)
    @loader.start()

  onLeaving: (event, current, direction, next) =>
    @cancel(event) if @isLoading()

  isLoading: =>
    @loader?.animating
