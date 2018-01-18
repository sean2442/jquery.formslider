class @ProgressBarPlugin extends AbstractFormsliderPlugin
  @config =
    selectorWrapper: '.progressbar-wrapper'
    selectorText: '.progress-text'
    selectorProgress: '.progress'
    animationSpeed: 300
    type: 'percent'
    initialProgress: '15'
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
    @wrapper  = $(@config.selectorWrapper)

    @config   = @configWithDataFrom(@wrapper)

    @progress = $(@config.selectorText, @wrapper)
    @bar      = $(@config.selectorProgress, @wrapper)
    @type     = @config.type

    @bar.css('transition-duration', (@config.animationSpeed / 1000) + 's')

    @countMax = @slidesThatCount()
    @set(0)

  slidesThatCount: =>
    substract = 0
    for role in @config.dontCountOnRoles
      substract = substract + @slideByRole(role).length

    @slides.length - substract

  doUpdate: (e, current, direction, next) =>
    index = @formslider.index()
    unless @shouldBeVisible(current)
      @set(index)
      return @hide()

    @show()
    @set(index) # we are on first step initial

  shouldBeVisible: (slide) =>
    ! ($(slide).data('role') in @config.hideOnRoles)

  set: (indexFromZero) =>
    indexFromZero = @countMax if indexFromZero > @countMax
    indexFromZero = 0 if indexFromZero < 0
    indexFromOne  = indexFromZero + 1

    percent = ((indexFromOne) / @countMax) * 100
    @bar.css('width', percent + '%')

    if @config.type == 'steps'
      @_setSteps(indexFromOne)
      return

    # for percent we can give an initial value
    if @config.initialProgress? && indexFromZero < 1
      percent = Math.max(@config.initialProgress, percent)

    @_setPercent(percent)


  # optimize
  _setPercent: (percent) =>
    startFrom = parseInt(@progress.text()) || 13

    $(Counter: startFrom)
      .animate(
        { Counter: percent }
        {
          duration: @config.animationSpeed
          queue: false
          easing: 'swing'
          step: @_setPercentStepCallback
        }
    )

  _setPercentStepCallback: (percent) =>
    @progress.text(Math.ceil(percent) + '%')

  _setSteps: (indexFromOne) =>
    @progress.text("#{indexFromOne}/#{@countMax}")

  hide: =>
    return unless @visible
    @wrapper.animate({opacity: 0}, @config.animationSpeed)
    @visible = false

  show: =>
    return if @visible
    @wrapper.animate({opacity: 1}, @config.animationSpeed)
    @visible = true
