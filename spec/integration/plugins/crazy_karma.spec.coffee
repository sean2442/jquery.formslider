describe 'crazy', ->
  describe 'karma', ->
    formslider = events = plugin = undefined

    beforeAll( (done) =>
      $(->
        console.log "DOM fully loaded and parsed"
        done()
      )
    )

    beforeEach ->
      helper.fixtures.load('formslider.html')

      formslider = helper.formslider.init(debug=false, waitForReady=true)

    describe 'recognize live changes', ->
      it 'recognizes css settings', ->

        slide = formslider.slides.get(2)

        $(slide).css('opacity', '1')

        expect($(slide).css('opacity')).toEqual '1'

        $(slide).css('opacity', '0')

        helper.forceRedraw()
        
        expect($(slide).css('opacity')).toEqual '0'

      it 'recognizes data settings', ->

        slide = formslider.slides.get(2)

        $(slide).data('setting', 1)

        expect($(slide).data('setting')).toEqual 1

        $(slide).data('setting', 0)

        expect($(slide).data('setting')).toEqual 0
