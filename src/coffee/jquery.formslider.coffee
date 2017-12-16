#= include formslider.coffee

jQuery.fn.formslider = (config) ->
  $this = $(this)

  $this.formslider = new FormSlider($this, config) if config

  return $this.formslider
