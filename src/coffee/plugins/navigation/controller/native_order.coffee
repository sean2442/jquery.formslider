
class @NativeOrderController extends AbstractFormsliderPlugin
  init: =>
    @on('controller.prev', @prev)
    @on('controller.next', @next)

  next: (event) =>
    return if @isCanceled(event)

    @cancel(event)

    @formslider.goto(@index() + 1)

  prev: (event) =>
    return if @isCanceled(event)

    @cancel(event)

    @formslider.goto(@index() - 1)
