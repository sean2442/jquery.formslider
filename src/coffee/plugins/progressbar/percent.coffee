class @ProgressBarPercent extends AbstractFormsliderProgressBar
  set: (indexFromZero, percent) =>
    # load initial value from dom element or 1
    startFrom = parseInt(@progressText.text()) || 1

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

  # instance callback for performance reasons
  _setPercentStepCallback: (percent) =>
    @progressText.text(Math.ceil(percent) + '%')
