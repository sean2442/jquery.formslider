# Extending

By combining, configuring and writing own plugins you are able to implement nearly any behavior you can imagine.

## AbstractFormsliderPlugin
Your plugin should inherit `AbstractFormsliderPlugin`.

### variables
##### @config
Configuration merged from:
  * global config (see [PLUGINS.md](PLUGINS.md))
  * default config
  * instance config

##### @container
  * the container the flexslider and formslider runs on

##### @formslider
  * formslider instance, see: [FORMSLIDER](FORMSLIDER.md)

##### @logger
  * logger instance, see: [FORMSLIDER](FORMSLIDER.md#logger)


### methods
##### init()
  * called after instantiation
  * do your setups here

##### on(eventName, callback)
Registers an event listener for your plugin. (more on events: [EVENTMANAGER](EVENTMANAGER.md))

The eventName has the following semantic:

`name[.tag1.tag2.tag3]`

When you read the [EVENTMANAGER](EVENTMANAGER.md) guide, you dont have to care about the `context` as the `AbstractFormsliderPlugin` handles this.

Possible pre define event names in chronoloical order:
```bash
  * `ready`                         # fired when flexslider is ready
  * `resize`                        # fired when page is resized
  * `first-interaction`             # fired after first transition
  * `leaving`                       # fired before going to the next slide, can stop transition
  * `leaving.[currentRole]`         # currentRole it the role of the slide, a plugin can listen only listen for `leaving.zipcode`
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
Deregister an event listener for your plugin. (more on events: [EVENTMANAGER](EVENTMANAGER.md))

The eventName has the following semantic:

`name[.tag1.tag2.tag3]`

When you read the [EVENTMANAGER](EVENTMANAGER.md) guide, you dont have to care about the `context` as the `AbstractFormsliderPlugin` handles this.

##### cancel(event)
Cancel the given event.

##### isCanceled(event)
Checks if event is canceled.

##### trigger(eventName [, eventArg1 [, ebentArg2 ...]])
Triggers the event `eventName` and passes args to callbacks. (more on events: [EVENTMANAGER](EVENTMANAGER.md))

The signature of a callback is: callbck(event [, eventArg1 [, ebentArg2 ...]])

##### track(source, value, category = null)
This will trigger a tracking event. If the plugin `JqueryTracking` was loaded the event will be published to google analytics for ex.

##### slideByRole(role)
Retrieves slides by `data-role`, depends on plugin `AddSlideClasses`.

##### slideByIndex(indexFromZero)
Retrieves slides by index.

##### slideById(id)
Retrieves slides by `data-id` attribute, depends on plugin `AddSlideClasses`.

##### configWithDataFrom(element)
Iterate through @config keys and merge with config if element has "data-#{key}".

Returns cloned instance from @config, so @config is untouched

## Example implementation
### Example plugin
Here is an example of the `LoadingState`.
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
