# Integration

A minimal demo can bechecked out here: https://github.com/formslider/jquery.formslider.demo.

## Load dependencies
Insert the following dependencies into you html file:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="[path_to_your_bower_components]/jquery.formslider/dist/jquery.formslider.dependencies.min.js"></script>
<script src="[path_to_your_bower_components]/jquery.formslider/dist/jquery.formslider.min.js"></script>

<link rel="stylesheet" href="[path_to_your_bower_components]/jquery.formslider/dist/formslider.min.css">
```

You can also use a sass version with pre defined mixins for selecting specific formslider elements:
  * [path_to_your_bower_components]/jquery.formslider/src/sass/formslider.sass
  * [path_to_your_bower_components]/jquery.formslider/src/sass/mixins/\_formslider.sass


## Insert markup
A Minimal Markup looks like this:
```html
<form>
  <div class="formslider-wrapper">
    <div class="formslider">

      <div class="slide" data-role="question">
        <div class="headline">Are you a man or a woman?</div>
        <label class="answer">
          <div class="text">man</div>
        </label>
        <label class="answer">
          <div class="text">women</div>
        </label>
      </div>

      <div class="slide" data-role="zipcode">
        <div class="headline">Where do you live?</div>
        <label for="contact_zipcode">zip code</label>
        <input type="number" required="required">
        <a class="next-button" href="#">continue</a>
      </div>

      <div class="slide" data-role="loader">
        <div class="headline">Please wait!</div>
        <div class="sub-headline">It does not take long.</div>
      </div>

      <div class="slide" data-role="confirmation">
        <div class="headline">Thank you for your interest</div>
        <div class="sub-headline">You hear from me as soon as possible.</div>
      </div>

    </div>
  </div>
</form>  

<div class="progressbar-wrapper">
  <div class="progress-text"></div>
  <div class="progress-bar">
    <div class="progress"></div>
  </div>
</div>
```

_Note:_ The classes like `headline` etc. are fully customizable.

### Initialize the formslider minimal
Insert the following code into a html file and open in browser:
```js
<script>
(function($){

  $('.formslider-wrapper').formslider();

})(jQuery);
</script>
```

[List of Plugins and settings](docs/PLUGINS.md)


## Full initialization
```coffee
$('.formslider-wrapper').formslider(
  version: 1

  driver:
    class:    'DriverFlexslider'
    selector: '.formslider > .slide'
    animationSpeed: 600
    smoothHeight:   true
    touch:          true

  pluginsGlobalConfig:
    questionSelector: '.question-input'
    answersSelector:  '.answers'
    answerSelector:   '.answer'
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
        loaderClass: 'SimpleLoaderImplementation'
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

```


## Flexslider (driver) configuration
You can pass configuration for flexslider via the driver settings:
```js
$('.my-formslider').formslider({
  driver:{
    class:    'DriverFlexslider' ,
    selector: '.formslider > .slide'
    animationSpeed: 600
    animation:      'slide'
    smoothHeight:   true
    // add here more Flexslider settings
  }
  ...
});
```

[List of Flexslider settings](https://github.com/formslider/FlexSlider)
