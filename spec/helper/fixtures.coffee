helper = helper || {}

helper.fixtures =
  load: (file) ->
    jasmine.getFixtures().fixturesPath = 'base/spec/fixtures'
    loadFixtures file
