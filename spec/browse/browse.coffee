describe 'jquery.formslider', ->
  beforeEach ->
    helper.jasmine.setTimeout(210000000)

    helper.fixtures.load('formslider.html')

    formslider = helper.formslider.init(true)

  it 'can be served', (done) ->
    setTimeout(done, 210000000)
