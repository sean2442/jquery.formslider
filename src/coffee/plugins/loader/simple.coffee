
class @SimpleLoader extends AbstractFormsliderLoader
  @config =
    duration: 1000

  doAnimation: =>
    @stop()
