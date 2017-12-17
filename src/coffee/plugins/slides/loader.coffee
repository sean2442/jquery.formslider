class @LoaderSlidePlugin extends AbstractFormsliderPlugin
  @config =
    loaderClass: 'SimpleLoaderImplementation'
    duration: 1000

  init: =>
    @on('before.loader', @onBefore)
    @on('leaving.loader', @onLeaving)

  onBefore: (event, currentSlide, direction, nextSlide) =>
    return if @isLoading()

    LoaderClass = window[@config.loaderClass]
    @loader     = new LoaderClass(@, @config, nextSlide)
    @loader.start()

  onLeaving: (event, current, direction, next) =>
    @cancel(event) if direction == 'prev'
    @cancel(event) if @isLoading()

  isLoading: =>
    @loader?.animating
