describe 'formslider', ->
  describe 'plugins', ->
    formslider = events = plugin = undefined
    questionSlide = zipcodeSlide = loaderSlide = contactSlide = undefined
    confirmationSlide = undefined
    visible = (slide) ->
      # work around -> inline styles not respected by jquery in headless
      $(slide).data('slide-visibility') == 1

    beforeEach ->
      helper.fixtures.load('formslider.html')

      formslider = helper.formslider.init(debug=false, waitForReady=true)

    describe 'slide_vibility', ->
      it 'hides all slides but current onReady', ->
        expect(formslider.index()).toEqual 0

        expect(visible(formslider.slides.get(0))).toBe true

        expect(visible(formslider.slides.get(1))).toBe false
        expect(visible(formslider.slides.get(2))).toBe false
        expect(visible(formslider.slides.get(3))).toBe false
        expect(visible(formslider.slides.get(4))).toBe false

      it 'hides all slides but current after next', ->
        expect(formslider.index()).toEqual 0

        formslider.next()

        expect(formslider.index()).toEqual 1

        expect(visible(formslider.slides.get(1))).toBe true
        expect(visible(formslider.slides.get(2))).toBe false
        expect(visible(formslider.slides.get(3))).toBe false
        expect(visible(formslider.slides.get(4))).toBe false
