
# this is around 20% faster for plain objects then jQuery.extend

class @ObjectExtender
  @extend = (obj) ->
    Array::slice.call(arguments, 1).forEach (source) ->
      return unless source

      for prop of source
        if source[prop]?.constructor == Object
          if !obj[prop] or obj[prop]?.constructor == Object
            obj[prop] = obj[prop] or {}
            ObjectExtender.extend(obj[prop], source[prop])
          else
            obj[prop] = source[prop]
        else
          obj[prop] = source[prop]

    return obj
