
# Plugins

## Registering plugins
You can register plugins at initialization time (see [README.md](INTEGRATION.md)).

Or after initialization:
```js
formslider = $('.my-formslider').formslider();

formslider.loadPlugin({
  class: 'BrowserHistory'
  config:{
    updateHash: true
  }
})
```


## Plugin configuration
The configuration consists of three levels:

### 1. The default config
Default configuration for a plugin provided by source code.

### 2. Global plugin config
Passed during initialization.
```js
$('.my-formslider').formslider({
  driver:{
    ...
  },

  pluginsGlobalConfig: {
    answersSelector: '.answers',
    answerSelector:  '.answer',
    answerSelectedClass: 'selected'
  },

  plugins: [
    ...
  ]
});
```

### 3. The initial config
Passed during initialization.
```js
$('.my-formslider').formslider({
  ...
  plugins: [
    {
      class: 'BrowserHistory'
      config:{
        updateHash: false,
        resetStatesOnLoad: true
      }
    }
  ]
  ...
});

```

### Merge data attributes into config
You can merge slide data attributes into the current plugin config:
```
coffee

@config = @configWithDataFrom(@wrapper)
```

Have a look at [AbstractFormsliderPlugin::configWithDataFromElement](EXTENDING.md#configwithdatafromelement)
and  [ProgressBarPlugin](https://github.com/formslider/jquery.formslider/blob/master/src/coffee/plugins/progress/progress_bar.coffee#L27) for an example implementation.


## Available plugins

### List of extern plugins
These plugins can be used to extend the formslider:
  * [formslider.jquery.tracking](https://github.com/formslider/formslider.jquery.tracking)
  * [formslider.animate.css](https://github.com/formslider/formslider.animate.css)
  * [formslider.dramatic.loader](https://github.com/formslider/formslider.dramatic.loader)
  * [formslider.hitory.js](https://github.com/formslider/formslider.hitory.js)
  * [formslider.nouislider](https://github.com/formslider/formslider.nouislider)

### form plugins
##### *AnswerClick*
Add answered classes and triggers track events.
Default configuration:
```js
config: {
  answersSelector:     '.answers', // from global config
  answerSelector:      '.answer'   // from global config
  answerSelectedClass: 'selected'  // from global config
}
```

The Plugin triggers the following events:
```coffee
@trigger('question-answered', questionId, answerId, asnwerValue, slideIndex)
```

##### *AnswerMemory*
Memorizes answers for later usage.

Access by `@formslider.plugins.get('AnswerMemory').memoryByQuestionId`.


##### *FormSubmission*
Submits a form if valid.
Default configuration:
```js
config: {
  submitOnEvents: ['validation.valid.contact'], // only triggered if direction is next

  successEventName: 'form-submitted',
  errorEventName:   'form-submission-error',
  loadHiddenFrameOnSuccess: 'url',

  formSelector: 'form',

  submitter: {
    class: 'FormSubmitterCollect',
    endpoint: '#',
    method:   'POST'
  }

  submitter: {
    class: 'FormSubmitterCollect',
    endpoint: '#',
    method:   'POST'
  }  

  // submitter: {
  //   class: 'FormSubmitterSubmit'
  // }    

  // make sure to load https://github.com/jquery-form/form
  // submitter: {
  //   class: 'FormSubmitterAjax',
  //   jquery-form configuration
  // }    
}
```


##### *InputFocus*
Focusses first input on current slide.
Default configuration:
```js
config: {
  selector: 'input:visible',
  disableOnMobile: true
}
```


##### *InputNormalizer*
Does some normalization on inputs.
Adds
  * `required="required"` if `required` attribute isset
  * `aria-required` if `required` attribute isset
  * `x-inputmode` if `inputmode` isset
  * `x-autocompletetype` if `autocompletetype` or `autocomplete` isset
  * `autocomplete` and `autocompletetype` if one of them isset

Default configuration:
```js
config: {
  selector: 'input:visible'
}
```


##### *InputSync*
Syncs inputs with the same name.
Default configuration:
```js
config: {
  selector: 'input',
  attribute: 'name'
}
```


##### *JqueryValidate*
Validates inputs before leaving a slide. Uses [jquery-validation](https://github.com/jquery-validation/jquery-validation).
Default configuration:
```js
config: {
  selector: 'input:visible'
  validateOnEvents: ['leaving.next']
  forceMaxLengthJs: "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
  messages:
    required:  'Required'
    maxlength: 'To long'
    minlength: 'To short'
    email:     'Enter valid E-Mail'

}
```

The plugin automatically detects the following attributes:
```bash
  * required                    # also add aria-required="true"
  * minlength
  * maxlength
  * type="email"
  * type="number"
  * data-force-max-length="1"   # will truncate input if longer
  * data-without-spinner"1"     # will prevent spinner input on number types
```

The Plugin triggers the following events:
```coffee
@trigger("validation.prepared")
@trigger("validation.valid.#{currentRole}", currentSlide)
@trigger("validation.invalid.#{currentRole}", currentSlide)
```

_Note:_ This plugin will log an error if no surrounding form tag was found.


###  generic plugins
##### *AddSlideClasses*
Adds classes based on role and index.
Adds:
  * class `answer-count-[answerCount]` based on global `answerSelector`
  * attribute `data-answer-count=[answerCount]`
  * class `slide-role-[slideRole]` based on slide attribute `data-role=slideRole`
  * class `slide-number-[index]` based on slide order  
  * attribute `data-slide-number=[index]`

Default configuration:
```js
config: {
  answerSelector:  '.answer' // from global config
}
```


##### *DoOnEvent*
Generic plugin to for inline implementing a plugin..
Default configuration:
```js
config: {
    'after.question': function (plugin){
      plugin.track('any after question');
    }
}
```


##### *DoOneTimeOnEvent*
Run a callback first time a specific event occurs.
Default configuration:
```js
config: {
    'after.question': function (plugin){
      plugin.formslider.track('first time after question');
    }
}
```


###  loader plugins
##### *SimpleLoader*
Controlls a loading page with no user interaction allowed.
Default configuration:
```js
config: {
  duration: 1000  // duration of the loader
}
```

For your custom loader implementation have alook at https://github.com/formslider/formslider.dramatic.loader.


### navigation controller plugins          
controller can be stacked as they cancel the `controller.*` events when they succeed

##### *BrowserHistoryController*
Adds browser history entries and reacts on browser prev/next.
Default configuration:
```js
config: {
  updateHash: false,          // change browser url or not
  resetStatesOnLoad: true    // only allow states since browser reload
}
```


##### *NativeOrderController*
Navigates prev/next by the native order of the slides.


##### *OrderByIdController*
Navigates prev/next by next-id data attributes. You should not use `driver.touch=true` when using fexslider, because the touch transition only respects native slide order.


### navigation plugins
##### *DirectionPolicyByRole*
Can prevent going forward or backward based on events and current/next roles.
Default configuration:
```js
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
```


##### *NavigateOnClick*
Call next/prev if certain element clicked.
Default configuration:
```js
config: {
  actions: [
    {
      selector: '.answer',
      action: 'next',
      wait: 200
    },
    {
      selector: '.next-button',
      action: 'next',
      wait: 10
    },
    {
      selector: '.prev-button',
      action: 'prev',
      wait: 10
    }
  ]
}
```


##### *NavigateOnKey*
Can trigger next/prev if enter or arrow keys pressed.
Default configuration:
```js
config: {
  actions: [
    { // right arrow
      context: document,
      action: 'next',
      code: 39,
      wait: 100
    },
    { // return
      selector: 'input',
      action: 'next',
      code: 13,
      wait: 100
    },
    { // left arrow
      context: document,
      action: 'prev',
      code: 37,
      wait: 100
    }
  ]
}
```


##### *TabIndexSetter*
Fixes tab order on current visible slide, prevents jumping between slides.
Default configuration:
```js
config: {
  selector: 'input, a, select, textarea, button, area, object'
}
```


### progressbar plugins
Manages progress animation, looks for data attributes on progress bar wrapper. Use `data-type="steps"` for ex.
Default configuration:
```js
@config = {
  selectorWrapper: '.progressbar-wrapper',
  selectorText: '.progress-text',
  selectorProgress: '.progress',
  animationSpeed: 300,
  initialProgress: null, // initial bar width in percent
  animateHeight: true,
  dataKeyForMaxLength: 'progressbar-longest-path', // set count max based on data attribute
  dontCountOnRoles: [
    'loader',
    'contact',
    'confirmation'
  ],
  hideOnRoles: [
    'zipcode',
    'loader',
    'contact',
    'confirmation'
  ]
}
```


##### *ProgressBarPercent*
Manages progress with percent progess.


##### *ProgressBarSteps*
Manages progress with steps progress.


### tracking plugins
##### *TrackSessionInformation*
Triggers track events for useragent, device dimension etc and adds an hidden input field for later form submission.
Triggers after first user interaction for clean bounce rate tracking.
Default configuration:
```js
config: {
  onReady: null,   // called after first user interaction, see onReadyInternal
  onReadyInternal: function(plugin){
    plugin.inform('url',       location.href);
    plugin.inform('useragent', navigator.userAgent );
    plugin.inform('referer',   document.referrer);
    plugin.inform('dimension', $(window).width() + 'x' + $(window).height());
    plugin.inform('jquery.formslider.version', plugin.formslider.config.version);

    if plugin.formslider.plugins.isLoaded('JqueryTracking'){
      plugin.inform('channel', $.tracking.channel());
      plugin.inform('campaign', $.tracking.campaign());
    }
  }
}
```


##### *TrackUserInteraction*
Triggers track events for current/next page transition.
Triggers:
  * `slide-[index]-entered` = [direction]
  * `slide-role-[role]-entered` = [direction]
  * `question-answered` = [index]
  * `question-answered-[index]` = [answerValue]
)

Default configuration:
```js
config: {
  questionAnsweredEvent: 'question-answered'  // event triggered, when an answer was selected
}
```

### view plugins
##### *EqualHeight*
Equalizes the height of elements on the current slide.
Default configuration:
```js
config: {
  selector: '.answer .label'
}
```
Listens also on event `do-equal-height`. To trigger this event: `@trigger('do-equal-height', slideToEqualize)`.


##### *LazyLoad*
Load images from the next slides.
Default configuration:
```js
config: {
  lazyClass: 'lazy-load',
  dataKey: 'src'
}
```


##### *LoadingState*
Manipulates loading classes on ready.
Default configuration:
```js
config: {
  selector: '.nextbar-wrapper, .formslider-wrapper',
  loadingClass: 'loading',          // will be removed
  loadedClass: 'loaded'             // will be added
}
```


##### *ScrollUp*
Scrolls up if a question is not in viewport and logs warning if no element found by `@config.selector`.

Default configuration:
```js
config: {
  selector: '.headline',
  duration: 500,
  tolerance: -30
  scrollUpOffset: 30
  scrollTo: function(plugin, $element){
    return Math.max(0, $element.offset().top - plugin.config.scrollUpOffset);
  },
  checkElement: function(plugin, slide){
    retrun $(plugin.config.selector, slide);
  }
}
```


##### *SlideVisibility*
Hides slides before and after current slide until transition is allowed.
