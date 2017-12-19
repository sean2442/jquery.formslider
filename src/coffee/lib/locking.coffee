
class @Locking
  constructor: (initial = true) ->
    @locked = initial

  lock: =>
    @locked = true

  unlock: =>
    @locked = false
