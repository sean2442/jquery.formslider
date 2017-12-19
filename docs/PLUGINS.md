
# Plugins

## Registering plugins
You can register plugins at initialization time (see [README.md](../README.md)).

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


## Global configuration
The configuration passed to a plugin consists of:
### Global plugin config
Passed during initialization.
```js
$('.my-formslider').formslider({
  driver:{
    class:    'DriverFlexslider' ,
    selector: '.formslider > .slide'
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

### The initial config
Passed during initialization.
```js
$('.my-formslider').formslider({
  ...
  plugins: [
    {
      class: 'BrowserHistoryPlugin'
      config:{
        updateHash: true
      }
    }
  ]
  ...
});

```

### The default config
Default configuration for a plugin.


## Available plugins

### List of extern plugins
These plugins can be used to extend the formslider:
  * [formslider.jquery.tracking](https://github.com/formslider/formslider.jquery.tracking)
  * [formslider.animate.css](https://github.com/formslider/formslider.animate.css)
  * [formslider.dramatic.loader](https://github.com/formslider/formslider.dramatic.loader)

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



### InputFocusPlugin                    
Focusses first input on current slide.
Default configuration:
```js
config: {
  selector: 'input:visible',
  waitBeforeFocus: 50        // have to wait a little for flexslider reasons
}
```


### BrowserHistoryPlugin                       
Adds browser history entries.
Default configuration:
```js
config: {
  updateHash: true    // change browser hash or not
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

  strategy:{
    type:     'collect',
    endpoint: '#',
    method:   'POST'

    // type: 'submit',        // trivial submit
    // formSelector: 'form'

    // make sure to load https://github.com/jquery-form/form
    // type: 'ajaxSubmit',
    // formSelector: 'form'
  }
}
```


### InputSyncPlugin                     
Syncs inputs with the same name.
Default configuration:
```js
config: {
  selector: 'input:visible',
  attribute: 'name'
}
```


### NextOnKeyPlugin                     
Can trigger next if key pressed.
Default configuration:
```js
config: {
  selector: 'input:visible',
  keyCode: 13                 //enter
}
```


### ArrowNavigationPlugin               
Can trigger next/prev if arrow keys pres
Default configuration:
```js
config: {
  selector: document,
  keyCodeLeft: 37,
  keyCodeRight: 39
}
```
sed.

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
  selector: '.progressbar-wrapper, .formslider-wrapper',
  loadingClass: 'loading',          // will be removed
  loadedClass: 'loaded'             // will be added
}
```


### ProgressBarPlugin                   
Manages progress animation.
Default configuration:
```js
config: {
  selectorWrapper: '.progressbar-wrapper'
  selectorText: '.progress-text',
  selectorProgress: '.progress',
  animationSpeed: 300,
  type: 'percent',             // animate progress in percent or 'steps' (1/6)
  initialProgress: '15',
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
Triggers after first user interaction for clean unbounce tracking.
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

For you custom loader implementation have alook at https://github.com/formslider/jquery.formslider/src/plugins/pages/loader/abstract.coffee.


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
Scrolls up if a question is not in viewport. Depends on [isInViewport](https://github.com/zeusdeux/isInViewport).
Default configuration:
```js
config: {
  selector: '.headline',
  duration: 200,
  tolerance: -30
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
