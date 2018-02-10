
helper = helper || {}

formslider = null

helper.formslider =
  currentSlide: ->
    $(formslider.driver.get(formslider.index()))

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

      plugins: [
        #{ class: 'NextSlideResolver' }
        { class: 'AddSlideClasses'          }
        { class: 'AnswerClick'              }
        { class: 'InputFocus'               }
        { class: 'BrowserHistory'           }
        { class: 'NormalizeInputAttributes' }
        { class: 'FormSubmission'           }
        { class: 'JqueryValidate'           }
        { class: 'InputSync'                }
        { class: 'NextOnKey'                }
        { class: 'ArrowNavigation'          }
        { class: 'TabIndexSetter'           }
        { class: 'NextOnClick'              }
        { class: 'LoadingState'             }
        {
          class: 'ProgressBar'
          config:
            selectorWrapper: '.progressbar-wrapper.percent'
            initialProgress: 23
        }
        {
          class: 'ProgressBar'
          config:
            selectorWrapper: '.progressbar-wrapper.steps'
            adapter: 'ProgressBarAdapterSteps'
        }
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
        { class: 'TrackUserInteraction'     }
        {
          class: 'TrackSessionInformation'
          config:
            onReady: (plugin) ->
              plugin.inform('custom-information-var', 'custom-information-val')
        }
        {
          class: 'LoaderSlide'
          config:
            loaderClass: 'SimpleLoaderImplementation'
            duration: 1000
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
        { class: 'EqualHeight'       }
        { class: 'ScrollUp'          }
        { class: 'LazyLoad'          }
        { class: 'SlideVisibility'   }
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
