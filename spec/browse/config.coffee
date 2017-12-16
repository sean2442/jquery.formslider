# Karma configuration for browsing

specConfig = require(__dirname + '/../config.coffee')

module.exports = (config) ->
  specConfig(config)

  # replace spec files with browser run spec file
  config.files[0] = 'spec/browse/browse.coffee'

  config.set
    files: config.files
    singleRun: false
    autoWatch: true
    useIframe: true
    runInParent: false
    clearContext: false
    browsers: ['Chrome']
    captureTimeout: 210000000
    browserDisconnectTolerance: 3
    browserDisconnectTimeout : 210000000
    browserNoActivityTimeout : 210000000
