class @ProgressBarAdapterSteps extends ProgressBarAdapterAbstract
  set: (indexFromZero, percent) =>
    @_setSteps(indexFromZero + 1)

  _setSteps: (indexFromOne) =>
    @plugin.progressText.text("#{indexFromOne}/#{@plugin.countMax}")
