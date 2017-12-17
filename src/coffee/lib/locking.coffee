
class @Locking
  constructor: (@logger, initial = true) ->
    @locked = initial

  lock: =>
    @locked = true

  unlock: =>
    @locked = false
