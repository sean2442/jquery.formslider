class @ProgressBarSteps extends AbstractFormsliderProgressBar
  set: (indexFromZero, percent) =>
    @progressText.text("#{indexFromZero + 1}/#{@countMax}")
