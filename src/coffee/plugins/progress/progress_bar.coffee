class @ProgressBarPlugin extends AbstractFormsliderPlugin
  @config =
    selectorWrapper: '.progressbar-wrapper'
    selectorText: '.progress-text'
    selectorProgress: '.progress'
    animationSpeed: 300
    adapter: 'ProgressBarAdapterPercent'
    initialProgress: null
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

    @progressText = $(@config.selectorText, @wrapper)
    @bar          = $(@config.selectorProgress, @wrapper)

    @bar.css('transition-duration', (@config.animationSpeed / 1000) + 's')

    @countMax = @slidesThatCount()

    @adapter  = new window[@config.adapter](@, @config)

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

  set: (indexFromZero) =>
    indexFromZero = @countMax if indexFromZero > @countMax
    indexFromZero = 0 if indexFromZero < 0

    percent = ((indexFromZero + 1) / @countMax) * 100

    if @config.initialProgress && indexFromZero == 0
      percent = @config.initialProgress

    @bar.css('width', percent + '%')

    @adapter.set(indexFromZero, percent)

  shouldBeVisible: (slide) =>
    ! ($(slide).data('role') in @config.hideOnRoles)

  hide: =>
    return unless @visible
    @wrapper.animate({opacity: 0}, @config.animationSpeed)
    @visible = false

  show: =>
    return if @visible
    @wrapper.animate({opacity: 1}, @config.animationSpeed)
    @visible = true
