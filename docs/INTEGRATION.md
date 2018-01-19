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

  pluginsGlobalConfig:
    transitionSpeed: 600
    answersSelector: '.answers'
    answerSelector:  '.answer'
    answerSelectedClass: 'selected'

  plugins: [
    { class: 'AddSlideClassesPlugin'          }
    { class: 'JqueryAnimatePlugin'            }
    { class: 'JqueryValidatePlugin'           }
    { class: 'ArrowNavigationPlugin'          }
    { class: 'AnswerClickPlugin'              }
    { class: 'InputFocusPlugin'               }
    { class: 'BrowserHistoryPlugin'           }
    { class: 'NormalizeInputAttributesPlugin' }
    {
      class: 'FormSubmissionPlugin'           
      config:
        loadHiddenFrameOnSuccess: '/converted'
        submitter:
          class:    'FormSubmitterCollect'
          endpoint: '/submit'
          method:   'POST'
    }
    { class: 'InputSyncPlugin'                }
    { class: 'NextOnKeyPlugin'                }
    { class: 'TabIndexSetterPlugin'           }
    { class: 'NextOnClickPlugin'              }
    {
      class: 'LoadingStatePlugin'
      config:
        selector: '.progressbar-wrapper, .formslider-wrapper'
    }
    {
      class: 'ProgressBarPlugin'             
      config:
        initialProgress: 15
    }
    {
      class: 'LoaderSlidePlugin'       
      config:
        duration: 2500   
    }
    { class: 'ContactSlidePlugin'            }
    { class: 'ConfirmationSlidePlugin'       }
    { class: 'EqualHeightPlugin'             }
    {
      class: 'ScrollUpPlugin'
      config:
        selector: '.headline'
        scrollUpOffset: 40
    }
    { class: 'LazyLoadPlugin'                }
    { class: 'TrackSessionInformationPlugin' }
    { class: 'TrackUserInteractionPlugin'    }
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
