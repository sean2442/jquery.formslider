# Integration

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
Insert the following code into you html file:
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
    class:          'DriverFlexslider'
    selector:       '.formslider > .slide'
    animationSpeed: 600
    animation:      'slide'
    smoothHeight:   true
    touch:          true

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
