
helper = helper || {}

formslider = null

helper.formslider =
  currentSlide: ->
    $(formslider.driver.get(formslider.index()))

  init: (debug=false) ->
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
        }
        {
          class: 'ProgressBarPlugin'
          config:
            selectorWrapper: '.progressbar-wrapper.steps'
            type: 'steps'
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
        { class: 'ContactSlidePlugin'      }
        { class: 'ConfirmationSlidePlugin' }
        { class: 'EqualHeightPlugin'       }
        { class: 'ScrollUpPlugin'          }
        { class: 'LazyLoadPlugin'          }
      ]
    )

    formslider.onReady()
    return formslider
