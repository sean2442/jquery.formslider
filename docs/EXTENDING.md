# Extending

By combining, configuring and writing own plugins you are able to implement nearly any behaviour you can imagine.

## AbstractFormsliderPlugin
Your plugin should inherit `AbstractFormsliderPlugin`.

### variables
##### @config
Configuration merged from
  * global config (see [PLUGINS.md](PLUGINS.md))
  * default config
  * instance config

##### @container
  * the container the flexslider and formslider runs on

##### @formslider
The underlying slider driver, currently only [Flexslider](https://github.com/creative-workflow/FlexSlider) supported.

Available methods:
  * @formslider.next()
  * @formslider.prev()
  * @formslider.goto(indexFromZero)
  * @formslider.index()

##### @logger
Can be used to log informations. Utilizes [jquery.debug](https://github.com/creative-workflow/jquery.debug). Warnings and errors will always be preinted in the brwoser console. Info and Debug only if you append `?debug=1` on the current page.

Available methods:
  * @logger.debug(arg1, [arg2, ..., argN])   // arg1 should be string
  * @logger.info(arg1, [arg2, ..., argN])   // arg1 should be string
  * @logger.warn(arg1, [arg2, ..., argN])   // arg1 should be string
  * @logger.error(arg1, [arg2, ..., argN])   // arg1 should be string

### methods
##### init()
  * called after instantiation
  * do your setups here

##### on(eventName, callback)
Registeres an event listener.

Possible pre define event names in chronoloical order:
```bash
  * `ready`                         # fired when flexslider is ready
  * `resize`                        # fired when page is resized
  * `first-interaction`             # fired after first transition
  * `leaving`                       # fired before going to the next slide, can stop transition
  * `leaving.[currentRole]`         # currentRole it the role of the slide, a plugin can listen only listen for `leaving-zipcode`
  * `leaving.[currentRole].next`    # same as above but only when direction forward
  * `leaving.[currentRole].prev`    # same as above but only when direction backward
  * `before`                        # fired after leaving, when transition is allowed
  * `before.[nextRole]`             # role of the up comming slide
  * `before.[nextRole].next`        # same as above but only when direction forward
  * `before.[nextRole].prev`    # same as above but only when direction backward
  * `after`                         # fired after the transition
  * `after.[currentRole]`           # role of the current slide
  * `after.[currentRole].next`        # same as above but only when direction forward
  * `after.[currentRole].prev`    # same as above but only when direction backward
```

##### off(eventName)
Deregister an event listener.

##### cancel(event)
Cancel the given event.

##### isCanceled(event)
Checks if event is canceled.

##### trigger(eventName [, eventArg1 [, ebentArg2 ...]])
Triggers the event `eventName` and passes args to callbacks.

The signature of a callback is: callbck(event [, eventArg1 [, ebentArg2 ...]])

##### track(source, value, category = null)
This will trigger an tracking event. If the plugin `JqueryTrackingPlugin` was loaded the event will be published to google analytics for ex.

##### slideByRole(role)
Retrieves slides by `data-role`, depends on plugin `AddSlideClassesPlugin`.

##### slideByIndex(indexFromZero)
Retrieves slides by index.

##### slideById(id)
Retrieves slides by `data-id` attribute, depends on plugin `AddSlideClassesPlugin`.


## Example implementation
### Example plugin
Here is an example of the `LoadingStatePlugin`.
```coffee
class @MySelfDefinedPlugin extends window.AbstractFormsliderPlugin
  init: =>
    @on('before', @onBefore)

  onBefore: (event, currentSlide, direction, prevSlide) =>
    @logger.warn "onBefore() called from #{@config.name}"

```

### Load your custom plugin
```js
formslider = $('.my-formslider').formslider();

myPluginInstance = formslider.plugins.load({
  class: 'MySelfDefinedPlugin'
  config:
    name: 'tom@creative-workflow.berlin'
})
```
