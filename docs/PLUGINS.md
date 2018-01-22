
# Plugins

## Registering plugins
You can register plugins at initialization time (see [README.md](INTEGRATION.md)).

Or after initialization:
```js
formslider = $('.my-formslider').formslider();

formslider.loadPlugin({
  class: 'BrowserHistoryPlugin'
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
      class: 'BrowserHistoryPlugin'
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

### AddSlideClassesPlugin               
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

### AnswerClickPlugin                   
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
@trigger('question-answered', $answer, value, slideIndex)
```

### SlideVisibilityPlugin
Hides slides before and after current until transition is allowed

### InputFocusPlugin                    
Focusses first input on current slide.
Default configuration:
```js
config: {
  selector: 'input:visible',
  waitBeforeFocus: 50           // have to wait a little for flexslider reasons
  disableOnMobile: true
}
```


### BrowserHistoryPlugin                       
Adds browser history entries.
Default configuration:
```js
config: {
  updateHash: false,          // change browser url or not
  resetStatesOnLoad: true    // only allow states since browser reload
}
```

### NormalizeInputAttributesPlugin                       
Adds
  * `required="required"` if `required` attribute isset
  * `aria-required` if `required` attribute isset
  * `x-inputmode` id `inputmode` isset
  * `x-autocompletetype` id `autocompletetype` isset

Default configuration:
```js
config: {
  selector: 'input:visible'
}
```

### JqueryValidatePlugin               
Validates inputs based on attributes. Uses [jquery-validation](https://github.com/jquery-validation/jquery-validation).
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

_Note:_ This plugin will log an error if no surrounding form tag was found

### FormSubmissionPlugin                
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


### InputSyncPlugin                     
Syncs inputs with the same name.
Default configuration:
```js
config: {
  selector: 'input',
  attribute: 'name'
}
```


### NextOnKeyPlugin                     
Can trigger next if key pressed.
Default configuration:
```js
config: {
  selector: 'input',
  keyCode: 13                 //enter
}
```


### ArrowNavigationPlugin               
Can trigger next/prev if arrow keys pressed.
Default configuration:
```js
config: {
  selector: document,
  keyCodeLeft: 37,
  keyCodeRight: 39
}
```


### DirectionPolicyByRolePlugin
Prevent going forward or backward based on events.
Default configuration:
```js
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
```


### TabIndexSetterPlugin               
Fixes tab behavior, only enables on current slide.
Default configuration:
```js
config: {
  selector: 'input:visible, a, select, textarea, button'
}
```


### NextOnClickPlugin                   
Call next if certain element clicked.
Default configuration:
```js
config: {
  selector: '.next-button, .answer',
  waitAfterClick: 10
}
```


### LoadingStatePlugin            
Manipulates loading classes on ready.
Default configuration:
```js
config: {
  selector: '.nextbar-wrapper, .formslider-wrapper',
  loadingClass: 'loading',          // will be removed
  loadedClass: 'loaded'             // will be added
}
```


### ProgressBarPlugin                   
Manages progress animation, looks for data attributes on progress bar wrapper. Use `data-type="steps"` for ex.

Default configuration:
```js
config: {
  selectorWrapper: '.progressbar-wrapper'
  selectorText: '.progress-text',
  selectorProgress: '.progress',
  animationSpeed: 300,
  adapter: 'ProgressBarAdapterPercent',  // animate progress in percent or 'steps' (1/6) (ProgressBarAdapterSteps)
  initialProgress: '15',                 // initial bar width, when type percent also the initial value
  dontCountOnRoles: [
    'loader'
    'contact'
    'confirmation'
  ],
  hideOnRoles: [
    'zipcode'
    'loader'
    'contact'
    'confirmation'
  ]
}
```


### TrackSessionInformationPlugin       
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

    if plugin.formslider.plugins.isLoaded('JqueryTrackingPlugin'){
      plugin.inform('channel', $.tracking.channel());
      plugin.inform('campaign', $.tracking.campaign());
    }
  }
}
```


### TrackUserInteractionPlugin          
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


### LoaderSlidePlugin                    
Controls the loader page.
Default configuration:
```js
config: {
  loaderClass: 'SimpleLoaderImplementationPlugin',  // loader implementation
  duration: 1000                      // duration of the loader
}
```

For you custom loader implementation have alook at https://github.com/formslider/jquery.formslider/tree/master/src/coffee/plugins/slides/loader.


### ContactSlidePlugin                   
  * controls the contact page.
  * has no configuration.
  * prevents going back


### ConfirmationSlidePlugin              
  * controls the confirmation page.
  * has no configuration.
  * prevents going forth/back


### EqualHeightPlugin                   
Equalizes the height of elements on the current slide.
Default configuration:
```js
config: {
  selector: '.answer .label'
}
```
Listens also on event `do-equal-height`. To trigger this event: `@trigger('do-equal-height', slideToEqualize)`.


### ScrollUpPlugin                      
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


### LazyLoadPlugin                   
Load images from the next slides, not all together.
Default configuration:
```js
config: {
  lazyClass: 'lazy-load',
  dataKey: 'src'
}
```

### DoOnEventPlugin
Generic plugin to for inline implementing a plugin.

Default configuration:
```js
config: {
    'after.question': function (plugin){
      plugin.track('any after question');
    }
}
```

### DoOneTimeOnEventPlugin
Execute a callback first time an event was seen.

Default configuration:
```js
config: {
    'after.question': function (plugin){
      plugin.formslider.track('first time after question');
    }
}
```
