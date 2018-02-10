class @AddSlideClasses extends AbstractFormsliderPlugin
  init: =>
    @slides.each(@_doWithSlide)

  _doWithSlide: (index, slide) =>
    $slide = $(slide)
    @_addAnswerCountClasses(index, $slide)
    @_addSlideNumberClass(index, $slide)
    @_addRoleClass($slide)
    @_addSlideIdClass($slide)

  _addAnswerCountClasses: (index, $slide) =>
    answerCount = $(@config.answerSelector, $slide).length

    $slide.addClass("answer-count-#{answerCount}")
          .data('answer-count', answerCount)

  _addRoleClass: ($slide) ->
    role = $slide.data('role')
    $slide.addClass("slide-role-#{role}")

  _addSlideNumberClass: (index, $slide) ->
    $slide.addClass("slide-number-#{index}")
          .data('slide-number', index)

  _addSlideIdClass: ($slide) ->
    id = $slide.data('id')
    id = $slide.data('role') if id == undefined
    $slide.addClass("slide-id-#{id}")
