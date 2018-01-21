
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
        #{ class: 'NextSlideResolverPlugin' }
        { class: 'AddSlideClassesPlugin'          }
        { class: 'AnswerClickPlugin'              }
        { class: 'InputFocusPlugin'               }
        { class: 'BrowserHistoryPlugin'           }
        { class: 'NormalizeInputAttributesPlugin' }
        { class: 'FormSubmissionPlugin'           }
        { class: 'JqueryValidatePlugin'           }
        { class: 'InputSyncPlugin'                }
        { class: 'NextOnKeyPlugin'                }
        { class: 'ArrowNavigationPlugin'          }
        { class: 'TabIndexSetterPlugin'           }
        { class: 'NextOnClickPlugin'              }
        { class: 'LoadingStatePlugin'             }
        {
          class: 'ProgressBarPlugin'
          config:
            selectorWrapper: '.progressbar-wrapper.percent'
            initialProgress: 23
        }
        {
          class: 'ProgressBarPlugin'
          config:
            selectorWrapper: '.progressbar-wrapper.steps'
            adapter: 'ProgressBarAdapterSteps'
        }
        {
          class: 'DoOnEventPlugin'
          config:
            'after.question': (plugin) ->
              plugin.track('any time after question')
        }
        {
          class: 'DoOneTimeOnEventPlugin'
          config:
            'after.question': (plugin) ->
              plugin.track('first time after question')
        }
        { class: 'TrackUserInteractionPlugin'     }
        {
          class: 'TrackSessionInformationPlugin'
          config:
            onReady: (plugin) ->
              plugin.inform('custom-information-var', 'custom-information-val')
        }
        {
          class: 'LoaderSlidePlugin'
          config:
            loaderClass: 'SimpleLoaderImplementation'
            duration: 1000
        }
        {
          class: 'DirectionPolicyByRolePlugin'
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
        { class: 'EqualHeightPlugin'       }
        { class: 'ScrollUpPlugin'          }
        { class: 'LazyLoadPlugin'          }
        { class: 'SlideVisibilityPlugin'   }
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
