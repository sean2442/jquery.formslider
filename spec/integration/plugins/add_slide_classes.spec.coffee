describe 'formslider', ->
  describe 'plugins', ->
    formslider = $slide = undefined

    beforeEach ->
      helper.fixtures.load('formslider.html')

      formslider = helper.formslider.init()
      container  = formslider.container
      $slide     = helper.formslider.currentSlide()

    describe 'add_slide_classes', ->
      it 'has correct role class', ->
        role = $slide.data('role')
        expect($slide.hasClass("slide-role-#{role}")).toBe true

      it 'has correct answer count class', ->
        answerCount = $('.answer', $slide).length
        expectedClass = "answer-count-#{answerCount}"
        expect($slide.hasClass(expectedClass)).toBe true

      it 'has correct answer count data attribute', ->
        answerCount = $('.answer', $slide).length
        expect(answerCount).toBeGreaterThan 0
        expect($slide.data('answer-count')).toEqual answerCount

      it 'has slide number class', ->
        expectedClass = "slide-number-#{$slide.index()}"
        expect($slide.hasClass(expectedClass)).toBe true

      it 'has correct slide number data attribute', ->
        expect($slide.index()).toEqual 0
        expect($slide.data('slide-number')).toEqual $slide.index()
