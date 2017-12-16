describe 'formslider', ->
  formslider = plugins = driver = undefined

  beforeEach ->
    helper.fixtures.load('formslider.html')
    formslider = helper.formslider.init()
    plugins    = formslider.plugins

  describe 'plugin_loader', ->
    describe 'load', ->
      it 'can load self defined plugins', ->
        expect(formslider.index()).toBe 0

        class window.MySelfDefinedPlugin extends AbstractFormsliderPlugin
          init: =>
            @on('before', @onBefore)

          onBefore: (event, currentSlide, direction, nextSlide) =>
            @logger.warn 'onBefore() called'

        myPluginInstance = plugins.load({
          class: 'MySelfDefinedPlugin'
        })

        spyOn(myPluginInstance, 'onBefore').and.callThrough()

        myPluginInstance.init() # reinit so spy can replace the onBefore

        helper.withDebugEnabed( =>
          formslider.next()
        )

        expect(formslider.index()).toBe 1

        expect(plugins.isLoaded('MySelfDefinedPlugin')).toBe true

        expect(myPluginInstance.onBefore).toHaveBeenCalled()
