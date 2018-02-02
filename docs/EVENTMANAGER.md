
# EventManager

The event manager is a light weight but powerful event pub/sub implementation.

An event is created by triggering a string (eventName). `before.leaving.question` for example.

The event in this case is `before`, `leaving` and `question` are tags.

So it is possible to listen for some of the events:
  * `before`
  * `before.leaving`
  * `before.question`
  * `before.leaving.question`
  * `before.question.leaving`

You can not! listen for tags. The following will not be triggered:
  * `leaving`
  * `question`
  * `leaving.question`
  * `question.leaving`

## EventManager
### Methods
##### on(eventName, callback)
Registers an event listener. The eventName has the following semantic:

`name[.tag1.tag2.tag3].context`

The context can later be used to deregister an eventhandler

##### off(eventName)
Deregister an event listener. The eventName has the following semantic:

`name[.tag1.tag2.tag3].context`

##### cancel(event)
Cancel the given event.

##### isCanceled(event)
Checks if event is canceled.

##### trigger(eventName [, eventArg1 [, ebentArg2 ...]])
Triggers the event `eventName` and passes args to callbacks.

The signature of a callback is: callback(event [, eventArg1 [, ebentArg2 ...]])
