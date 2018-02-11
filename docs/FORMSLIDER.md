# Advanced usage

## Direct access
You can directly access the jquery.formslider instance after setup.

### Setup
```js
  var formslider = $('.formslider-wrapper').formslider({
    ...
  });
```

### Access after setup
```js
  var formslider = $('.formslider-wrapper').formslider();

  // or

  var formslider = $('.formslider-wrapper').data('formslider');
```

## Formslider
The following variables and methods are accessible by the instance.

### Variables
##### config
  * the configuration object you passed in during setup

Structure:
```bash
  version: 1                      # use for what ever you want, will be triggert from TrackSessionInformation

  silenceAfterTransition: 500     # wait after transition, fixes slide depositions on going back when using FlesliderDriver with css transitions (useCss: true)

  driver:                         # options for the driver
    ...

  plugins:                        # setup your plugins
    ...
```
##### container
  * the container you used to setup the formslider

##### driver
  * the driver adapter (Flexslider for ex.) you configured

##### events
  * the eventmanager implementation, see: [EVENTMANAGER](EVENTMANAGER.md)

##### firstInteraction
  * true after first slide got cycled

##### locking
  * lock/unlock cycling
  * provides
    * `locking.lock()`
    * `locking.unlock()`
    * `locking.locked`

##### logger
  * use internal logging mechanism (via jquery.debug](https://github.com/creative-workflow/jquery.debug))
  * provides:
    * `logging.info (arg1, [arg2, ..., argN])`
    * `logging.debug(arg1, [arg2, ..., argN])`
    * `logging.warn (arg1, [arg2, ..., argN])`
    * `logging.error(arg1, [arg2, ..., argN])`
  * enable console output via url param `?debug=1`
  * errors getting always logged to browser console

##### plugins
  * reference to the plugin loader
  * provides
    * `plugins.load([pluginConfig])`
    * `plugins.isLoaded([classNameAsString])`
    * `plugins.get([classNameAsString])`

##### ready
  * true after ready for cycling

##### slides
  * the slides that getting cycled (jQuery result)


### Methods
##### index()
  * return current index

##### next()
  * try to go one forward (triggers `controller.next`)

##### prev()
  * try to go one backward (triggers `controller.prev`)

##### goto(indexFromZero)
  * try to go to specific index (zero based, calls driver)


### Events
Read more about events: [EVENTMANAGER](EVENTMANAGER.md)

##### `leaving.[currentRole].[direction]`
  * triggered before possible cycling
  * payload: `(event, currentSlide, direction, nextSLide)`
  * if `event.canceled` is true, no cycling will happen
  * attention: eventhandler will block swiping, to much of them could lead to hacky transitions

##### `before.[nextRole].[direction]`
  * triggered after `leaving` event, when cycling is allowed
  * payload: `(event, currentSlide, direction, nextSLide)`
  * attention: eventhandler will block swiping, to much of them could lead to hacky transitions

##### `after.[lastCurrentRole].[lastDirection]`
  * triggered after cycling finished
  * payload: `(event, currentSlide, direction, prevSLide)`

##### `first-interaction`
  * triggered after first successful cycling

##### `ready`
  * triggered after ready for cycling

##### `resize`
  * triggered when a window resize events gets triggered
