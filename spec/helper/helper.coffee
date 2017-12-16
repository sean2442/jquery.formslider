helper = helper || {}

helper.withDebugEnabed = (callback) ->
    oldState = $.debug()
    $.debug(true)
    callback()
    $.debug(oldState)
