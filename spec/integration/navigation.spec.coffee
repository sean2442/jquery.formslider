describe 'formslider', ->
  formslider = driver = undefined

  beforeEach ->
    helper.fixtures.load('formslider.html')

    formslider = helper.formslider.init()
    driver     = formslider.driver

  describe 'next', ->
    it 'can go next', ->
      expect(formslider.index()).toBe 0
      formslider.next()
      expect(formslider.index()).toBe 1

  describe 'prev', ->
    it 'can go prev', ->
      expect(formslider.index()).toBe 0
      formslider.next()
      expect(formslider.index()).toBe 1
      # wait a little so that the slider gets unlocked
      setTimeout(
        =>
          formslider.prev()
          expect(formslider.index()).toBe 0
        ,
        10
      )

  it 'can`t go prev 0', ->
    expect(formslider.index()).toBe 0
    formslider.prev()
    expect(formslider.index()).toBe 0

  describe 'goto', ->
    it 'can goto 2', ->
      expect(formslider.index()).toBe 0
      formslider.goto(2)
      expect(formslider.index()).toBe 2

    it 'can`t goto 1000', ->
      expect(formslider.index()).toBe 0
      formslider.goto(1000)
      expect(formslider.index()).toBe 0
