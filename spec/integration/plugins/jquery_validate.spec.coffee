describe 'formslider', ->
  describe 'plugins', ->
    formslider = events = plugin = slide = undefined

    beforeEach ->
      helper.fixtures.load('formslider.jquery_validate.html')

      formslider = helper.formslider.init(debug=false, waitForReady=true)
      events     = formslider.events
      plugin     = formslider.plugins.get('JqueryValidate')
      slide      = $(formslider.slides.get(formslider.index()))

    describe 'jquery_validate', ->
      it 'validates input[type=tel] correct', ->
        $input = $('input[type=tel]')

        $input.attr('value', 'invalid phone number')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', '+49 /30 42424242 - 23')
        expect(plugin.validate($input)).toBe true

      it 'validates input[type=email] correct', ->
        $input = $('input[type=email]')

        $input.attr('value', 'invalidemail@')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', 'invalidemail.de')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', 'tom@creative-workflow.berlin')
        expect(plugin.validate($input)).toBe true

      it 'validates input[type=number] correct', ->
        $input = $('input[type=number]')

        $input.attr('value', 'invalide number')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', '23,42')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', '23.42')
        expect(plugin.validate($input)).toBe true

        $input.attr('value', '000')
        expect(plugin.validate($input)).toBe true

        $input.attr('value', '00-0')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', '0001')
        expect(plugin.validate($input)).toBe true

      it 'validates minlength correct', ->
        $input = $('input[type=text]').first()

        $input.attr('minlength', 2)
        $input.attr('value', '')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', 'a')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', 'ab')
        expect(plugin.validate($input)).toBe true

      it 'validates maxlength correct', ->
        $input = $('input[type=text]').first()

        $input.attr('maxlength', 5)
        $input.attr('value', 'abcd')
        expect(plugin.validate($input)).toBe true

        $input.attr('value', 'abcde')
        expect(plugin.validate($input)).toBe true

        $input.attr('value', 'abcdef')
        expect(plugin.validate($input)).toBe false

      it 'validates pattern correct', ->
        $input = $('input[type=text]').first()
        $input.attr('pattern', '^\\d*$')

        $input.attr('value', 'abcd')
        expect(plugin.validate($input)).toBe false

        $input.attr('value', '1234')
        expect(plugin.validate($input)).toBe true

        $input.attr('value', '1234a')
        expect(plugin.validate($input)).toBe false

      it 'prevents going forward if invalid', ->
        expect(formslider.index()).toEqual 0

        formslider.next()

        expect(formslider.index()).toEqual 0

      it 'allows going forward if valid', ->
        expect(formslider.index()).toEqual 0

        $('input[type=text]').val('valid text value')
        $('input[type=number]').val('12345')
        $('input[type=tel]').val('+49 /30 42424242 - 23')
        $('input[type=email]').val('tom@creative-workflow.berlin')

        formslider.next()

        expect(formslider.index()).toEqual 1
