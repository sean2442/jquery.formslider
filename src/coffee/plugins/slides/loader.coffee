class @LoaderSlidePlugin extends AbstractFormsliderPlugin
  @config =
    loaderClass: 'SimpleLoaderImplementation'
    duration: 1000

  init: =>
    @on('after.loader', @onLOaderStart)
    @on('leaving.loader', @onLeaving)

  onLOaderStart: (event, currentSlide, direction, nextSlide) =>
    return if @isLoading()

    LoaderClass = window[@config.loaderClass]
    @loader     = new LoaderClass(@, @config, currentSlide)
    @loader.start()

  onLeaving: (event, current, direction, next) =>
    @cancel(event) if direction == 'prev'
    @cancel(event) if @isLoading()

  isLoading: =>
    @loader?.animating
