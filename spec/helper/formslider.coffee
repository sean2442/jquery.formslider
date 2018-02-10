
helper = helper || {}

formslider = null

helper.formslider =
  currentSlide: ->
    $(formslider.slides.get(formslider.driver.index()))

  init: (debug=false, waitForReady=false) ->
    $wrapper = $('.formslider-wrapper')

    $.debug(debug)

    formslider = $wrapper.formslider(
      version: 3

      driver:
        class:    'DriverFlexslider'
        selector: '.formslider > .slide'

      pluginsGlobalConfig:
        answersSelector: '.answers'
        answerSelector:  '.answer'
        answerSelectedClass: 'selected'

      plugins: [
        # prev/next controller plugin
        { class: 'BrowserHistoryController'   }
        { class: 'OrderByIdController'   }
        { class: 'NativeOrderController' }

        #view
        { class: 'SlideVisibility'          }
        { class: 'LazyLoad'                 }
        { class: 'EqualHeight'              }
        { class: 'ScrollUp'                 }
        { class: 'LoadingState'             }

        # progressbar
        {
          class: 'ProgressBarPercent'
          config:
            selectorWrapper: '.progressbar-wrapper.percent'
            initialProgress: 23
        }
        {
          class: 'ProgressBarSteps'
          config:
            selectorWrapper: '.progressbar-wrapper.steps'
        }

        # form
        { class: 'AnswerMemory'             }
        { class: 'AnswerClick'              }
        { class: 'JqueryValidate'           }
        { class: 'TabIndexSetter'           }
        { class: 'InputSync'                }
        { class: 'InputNormalizer'          }
        { class: 'InputFocus'               }
        { class: 'FormSubmission'           }

        # navigation
        { class: 'NavigateOnClick'          }
        { class: 'NavigateOnKey'            }

        # tracking
        { class: 'TrackUserInteraction'     }
        {
          class: 'TrackSessionInformation'
          config:
            onReady: (plugin) ->
              plugin.inform('custom-information-var', 'custom-information-val')
        }

        # loader
        {
          class: 'SimpleLoader'
          config:
            duration: 1000
        }

        # generic
        { class: 'AddSlideClasses'          }
        {
          class: 'DoOnEvent'
          config:
            'after.question': (plugin) ->
              plugin.track('any time after question')
        }
        {
          class: 'DoOneTimeOnEvent'
          config:
            'after.question': (plugin) ->
              plugin.track('first time after question')
        }
        {
          class: 'DirectionPolicyByRole'
          config:
            zipcode:
              commingFrom: ['question']
              goingTo: ['loader', 'question']

            loader:
              commingFrom: ['zipcode']
              goingTo: ['contact']

            contact:
              commingFrom: ['loader']
              goingTo: ['confirmation']

            confirmation:
              goingTo: ['none']
        }
      ]
    )

    if waitForReady
      helper.sleep(250)
      formslider.onReady()

      # works in headless only if flexslider init is used for onReady -> fix
      # while true
      #   break if formslider?.ready == true
    else
      formslider.onReady()


    return formslider
