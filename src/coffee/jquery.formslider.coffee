#= include formslider.coffee

jQuery.fn.formslider = (config) ->
  $this = $(this)

  $this.data('formslider', new FormSlider($this, config)) if config

  return $this.data('formslider')
