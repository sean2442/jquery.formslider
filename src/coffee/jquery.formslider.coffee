#= include formslider.coffee

jQuery.fn.formslider = (config = null) ->
  $this = $(this)

  instance = $this.data('formslider')

  if !instance || config != null
    $this.data('formslider', new FormSlider($this, config || {}))
    instance = $this.data('formslider')

  return instance
