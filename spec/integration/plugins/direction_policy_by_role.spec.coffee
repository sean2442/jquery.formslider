describe 'formslider', ->
  describe 'plugins', ->
    formslider = events = plugin = undefined
    questionSlide = zipcodeSlide = loaderSlide = contactSlide = undefined
    confirmationSlide = undefined

    beforeEach ->
      helper.fixtures.load('formslider.html')

      formslider   = helper.formslider.init()

      events       = formslider.events

      pluginConfig =
        zipcode:
          commingFrom: ['question']
          goingTo: ['loader', 'question']

        loader:
          commingFrom: ['zipcode']
          goingTo: ['contact']

        contact:
          commingFrom: ['loader']
          goingTo: ['confirmation']

        confirmation:
          goingTo: ['none']

      plugin = new DirectionPolicyByRole(formslider, pluginConfig)

      questionSlide     = $('<div data-role="question"></div>')
      zipcodeSlide      = $('<div data-role="zipcode"></div>')
      loaderSlide       = $('<div data-role="loader"></div>')
      contactSlide      = $('<div data-role="contact"></div>')
      confirmationSlide = $('<div data-role="confirmation"></div>')

    describe 'direction_policy_by_role', ->
      it 'allows from question -> question', ->
        event = {canceled: false}

        plugin.checkPermissions(event, questionSlide, 'next', questionSlide)

        expect(event.canceled).toBe false

      it 'allows from question -> zipcode', ->
        event = {canceled: false}

        plugin.checkPermissions(event, questionSlide, 'next', zipcodeSlide)

        expect(event.canceled).toBe false

      it 'allows from zipcode -> question', ->
        event = {canceled: false}

        plugin.checkPermissions(event, zipcodeSlide, 'prev', questionSlide)

        expect(event.canceled).toBe false

      it 'denies from question -> loader', ->
        event = {canceled: false}

        plugin.checkPermissions(event, questionSlide, 'next', loaderSlide)

        expect(event.canceled).toBe true

      it 'does allow from zipcode -> loader', ->
        event = {canceled: false}

        plugin.checkPermissions(event, zipcodeSlide, 'next', loaderSlide)

        expect(event.canceled).toBe false

      it 'denies from question -> loader', ->
        event = {canceled: false}

        plugin.checkPermissions(event, questionSlide, 'next', loaderSlide)

        expect(event.canceled).toBe true

      it 'denies from loader -> zipcode', ->
        event = {canceled: false}

        plugin.checkPermissions(event, loaderSlide, 'prev', zipcodeSlide)

        expect(event.canceled).toBe true

      it 'does allow from loader -> contact', ->
        event = {canceled: false}

        plugin.checkPermissions(event, loaderSlide, 'next', contactSlide)

        expect(event.canceled).toBe false

      it 'denies from question -> contact', ->
        event = {canceled: false}

        plugin.checkPermissions(event, questionSlide, 'next', contactSlide)

        expect(event.canceled).toBe true

      it 'denies from contact -> loader', ->
        event = {canceled: false}

        plugin.checkPermissions(event, contactSlide, 'prev', loaderSlide)

        expect(event.canceled).toBe true

      it 'does allow from contact -> confirmation', ->
        event = {canceled: false}

        plugin.checkPermissions(event, contactSlide, 'next', confirmationSlide)

        expect(event.canceled).toBe false

      it 'denies from confirmation -> contact ', ->
        event = {canceled: false}

        plugin.checkPermissions(event, confirmationSlide, 'prev', contactSlide)

        expect(event.canceled).toBe true

      it 'denies from confirmation -> question (prev)', ->
        event = {canceled: false}

        plugin.checkPermissions(event, confirmationSlide, 'prev', questionSlide)

        expect(event.canceled).toBe true

      it 'denies from confirmation -> question (next)', ->
        event = {canceled: false}

        plugin.checkPermissions(event, confirmationSlide, 'next', questionSlide)

        expect(event.canceled).toBe true
