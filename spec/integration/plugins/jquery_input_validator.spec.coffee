describe 'formslider', ->
  describe 'plugins', ->
    formslider = events = plugin = slide = validate = undefined

    beforeEach ->
      helper.fixtures.load('formslider.jquery_validate.html')

      formslider = helper.formslider.init(debug=false, waitForReady=true)
      events     = formslider.events
      plugin     = formslider.plugins.get('JqueryInputValidator')
      slide      = $(formslider.slides.get(formslider.index()))
      validate   = ($input) ->
        plugin.validator.validateOne($input)


    describe 'jquery_input_validator', ->
      it 'validates input[type=tel] correct', ->
        $input = $('input[type=tel]')

        $input.attr('value', 'invalid phone number')
        expect(validate($input)).not.toBe true

        $input.attr('value', '+49 /30 42424242 - 23')
        expect(validate($input)).toBe true

      it 'validates input[type=email] correct', ->
        $input = $('input[type=email]')

        $input.attr('value', 'invalidemail@')
        expect(validate($input)).not.toBe true

        $input.attr('value', 'invalidemail.de')
        expect(validate($input)).not.toBe true

        $input.attr('value', 'tom@creative-workflow.berlin')
        expect(validate($input)).toBe true

      it 'validates input[type=number] correct', ->
        $input = $('input[type=number]')

        $input.attr('value', 'invalide number')
        expect(validate($input)).not.toBe true

        $input.attr('value', '23,42')
        expect(validate($input)).not.toBe true

        $input.attr('value', '000')
        expect(validate($input)).toBe true

        $input.attr('value', '00-0')
        expect(validate($input)).not.toBe true

        $input.attr('value', '0001')
        expect(validate($input)).toBe true

      it 'validates minlength correct', ->
        $input = $('input[type=text]').first()

        $input.attr('minlength', 2)
        $input.attr('value', '')
        expect(validate($input)).not.toBe true

        $input.attr('value', 'a')
        expect(validate($input)).not.toBe true

        $input.attr('value', 'ab')
        expect(validate($input)).toBe true

      it 'validates maxlength correct', ->
        $input = $('input[type=text]').first()

        $input.attr('maxlength', 5)
        $input.attr('value', 'abcd')
        expect(validate($input)).toBe true

        $input.attr('value', 'abcde')
        expect(validate($input)).toBe true

        $input.attr('value', 'abcdef')
        expect(validate($input)).not.toBe true

      it 'validates pattern correct', ->
        $input = $('input[type=text]').first()
        $input.attr('pattern', '^\\d*$')

        $input.attr('value', 'abcd')
        expect(validate($input)).not.toBe true

        $input.attr('value', '1234')
        expect(validate($input)).toBe true

        $input.attr('value', '1234a')
        expect(validate($input)).not.toBe true

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
