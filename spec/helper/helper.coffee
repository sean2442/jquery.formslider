helper = helper || {}

helper.withDebugEnabed = (callback) ->
  oldState = $.debug()
  $.debug(true)
  callback()
  $.debug(oldState)

helper.sleep = (ms) ->
  start = new Date().getTime()
  continue while new Date().getTime() - start < ms

helper.forceRedraw = ->
  $('body').addClass('dummyclass').delay(0).removeClass('dummy‌​class')
