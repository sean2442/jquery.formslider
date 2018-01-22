# Changelog

##### 1.0.17
  * add `scrollTo` and `checkElement` method to `ScrollUpPlugin` so that they can be overridden
  * remove left and right check from `ScrollUpPlugin`

##### 1.0.16
  * implement `SlideVisibilityPlugin`

##### 1.0.15
  * fix triggering after events, when there was not an allowed transition
  * correct description for `DirectionPolicyByRolePlugin`

##### 1.0.14
  * add specs for `DirectionPolicyByRolePlugin`
  * lock navigation until current transition finished
  * set default for `BrowserHistoryPlugin` `updateHash` to false
  * introduce `resetStatesOnLoad` for `BrowserHistoryPlugin`

##### 1.0.13
  * docs/INTEGRATION.md added
  * `DirectionPolicyByRolePlugin` introduced
  * implement `ProgressBarPlugin` with adapter:
    * `ProgressBarAdapterPercent`
    * `ProgressBarAdapterSteps`

##### 1.0.12
  * define FormSubmitter in global namespace

##### 1.0.11
  * build dist ;)

##### 1.0.10
  * add `configWithDataFrom` for `AbstractPlugin` so you can merge data attributes
  * log warning if `ScrollUpPlugin` does not find an element to check for
  * `ProgressbarPlugin` merges config data from progress bar wrapper by default
  * `NextOnKeyPlugin` attaches to all inputs per default config
  * `InputSyncPlugin` attaches to all inputs per default config
  * refactor `FormSubmissionPlugin` and implement strategies via adapter classes

##### 1.0.09
  * build dist ;)

##### 1.0.8
  * only equalize element heights at ready or resize

##### 1.0.8
  * add feature `disableOnMobile` to `InputFocusPlugin`
  * add feature `scrollUpOffset` to `ScrollUpPlugin`
  * introduce `FeatureDetector`

##### 1.0.7
  * performance

##### 1.0.6
  * add `DoOnEventPlugin` for inline plugin definition
  * eleminate `before` event dependency from `EqualHeightPlugin`
  * add `do-equal-height` event
  * move changelog to `docs/CHANGELOG.md`

##### 1.0.5
  * fix loader implementation

##### 1.0.4
  * add input without spinner capability

##### 1.0.3
  * remove isInViewport dependency

##### 1.0.2
  * remove phantomjs dependency
  * extend sass capabilities

##### 1.0.1
  * introduce locking
  * fix initial progressbar value
