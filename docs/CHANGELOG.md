# Changelog

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
