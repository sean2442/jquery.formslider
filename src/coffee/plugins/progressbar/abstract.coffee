class @AbstractFormsliderProgressBar extends AbstractFormsliderPlugin
  @config =
    selectorWrapper: '.progressbar-wrapper'
    selectorText: '.progress-text'
    selectorProgress: '.progress'
    animationSpeed: 300
    initialProgress: null
    animateHeight: true
    dontCountOnRoles: [
      'loader'
      'contact'
      'confirmation'
    ]
    hideOnRoles: [
      'zipcode'
      'loader'
      'contact'
      'confirmation'
    ]

  init: =>
    @on('after', @doUpdate)

    @visible  = true
    @countMax = @slidesThatCount()
    @wrapper  = $(@config.selectorWrapper)
    @config   = @configWithDataFrom(@wrapper)

    @progressText = $(@config.selectorText, @wrapper)
    @bar          = $(@config.selectorProgress, @wrapper)
    @bar.css('transition-duration', (@config.animationSpeed / 1000) + 's')

    @_set(0)

  set: (indexFromZero, percent) ->
    # this is the method you have to implement

  # TODO calculate longest path based on controller plugins
  #      do it on init and after each transition
  slidesThatCount: =>
    substract = 0
    for role in @config.dontCountOnRoles
      substract = substract + @slideByRole(role).length

    @slides.length - substract

  doUpdate: (_event, current, direction, prev) =>
    index = @index()
    unless @shouldBeVisible(current)
      @_set(index)
      return @hide()

    @show()
    @_set(index) # we are on first step initial

  _set: (indexFromZero) =>
    indexFromZero = @countMax if indexFromZero > @countMax
    indexFromZero = 0 if indexFromZero < 0

    percent = ((indexFromZero + 1) / @countMax) * 100

    if @config.initialProgress && indexFromZero == 0
      percent = @config.initialProgress

    @bar.css('width', percent + '%')

    @set(indexFromZero, percent)

  shouldBeVisible: (slide) =>
    ! ($(slide).data('role') in @config.hideOnRoles)

  hide: =>
    return unless @visible
    @visible = false
    @wrapper.stop().animate({opacity: 0, height: 0}, @config.animationSpeed)

  show: =>
    return if @visible
    @visible = true

    animationProperties =
      opacity: 1

    if @config.animateHeight
      currentHeight = @wrapper.height()
      autoHeight    = @wrapper.css('height', 'auto').height()
      @wrapper.css('height', currentHeight)

      animationProperties.height = "#{autoHeight}px"

    @wrapper.stop().animate(animationProperties, @config.animationSpeed)
