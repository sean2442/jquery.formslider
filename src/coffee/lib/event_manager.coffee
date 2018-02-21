
class EventManager
  constructor: (@logger) ->
    @listener = {}

  trigger: () =>
    data = [arguments...]
    name = data.shift()

    # @logger.info("triggerEvent(#{name})")
    # @logger.debug("trigger(#{name})", data)

    tags    = name.split('.')   # event name is first segment
    name    = tags.shift()      # tags are the rest

    event = {
      type: name
      tags: tags
      canceled: false
    }

    return event unless @listener[name]?



    for listener in @listener[name]
      # call listeners without tags or listeners with all tags
      if !listener.tags || @allTagsInArray(listener.tags, tags)
        listener.callback(event, data...)

      # run all listener even if event stopped
      # break if event.canceled

    return event

  # name: name[.tag1.tag2][.context]
  on: (name, callback) =>
    tags    = name.split('.')
    name    = tags.shift()
    context = tags.pop()

    @listener[name] ?= []
    @listener[name].push(
      name: name
      tags: tags
      context: context
      callback: callback
    )

  # name: name[.tag1.tag2][.context]
  off: (name) =>
    tags    = name.split('.')
    name    = tags.shift()
    context = tags.pop()

    return unless @listener[name]?

    @listener[name] = @listener[name].filter((listener) =>
      return true if listener.context != context
      return false if @allTagsInArray(tags, listener.tags)
    )

  allTagsInArray: (tags, inputArray) ->
    for tag in tags
      return false unless (tag in inputArray)

    true

  isCanceled: (event) ->
    event.canceled == true

  cancel: (event) ->
    event.canceled = true
    false
