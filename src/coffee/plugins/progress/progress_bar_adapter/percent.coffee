class @ProgressBarAdapterPercent extends ProgressBarAdapterAbstract
  set: (indexFromZero, percent) =>
    @_setPercent(percent)

  # optimize
  _setPercent: (percent) =>
    startFrom = parseInt(@plugin.progressText.text()) || 13

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
    @plugin.progressText.text(Math.ceil(percent) + '%')
