# Changelog

##### 1.1.5
  * fix resize issue with `DriverFlexslider`
  * fix loading issue with `AbstractFormsliderProgressBar`

##### 1.1.4
  * dont set `dataKeyForMaxLength` per default for `AbstractFormsliderProgressBar`

##### 1.1.3
  * adjust `SlideVisibility` plugin for unordered jumps, enhance performance
  * remove `waitBeforeFocus` option from `InputFocus` as it works as expected after fixing after trigger timer issue with 1.1.0
  * return an event even when there is no listener (`EventManager`)
  * `BrowserHostoryController` only react if slider is unlocked
  * `AbstractFormsliderProgressBar` now respects the data attribute `dataKeyForMaxLength`
  * enhance `InputNormalizer`
  * `AnswerMemory` plugin now memorizes by question input id and answer input id
  * `JqueryValidate` validtates now only writable inputs (not readonly)
  * `AnswerClick` trigger now events in form of @trigger('question-answered', questionId, answerId, asnwerValue, slideIndex)
  * `TrackUserInteraction` respects new `AnswerClick` event signature

##### 1.1.2
  * add link to minimal demo implementation
  * fix empty first initialization with jquery plugin

##### 1.1.1
  * " `OrderByIdController`:reset prev-id after navigating back"
  * re introduce formlsider.index

##### 1.1.0
  * rename plugins -> remove `Plugin` from names as its redundant information
  * implement `OrderByIdController` for non native order paths
  * introduce navgation controller plugins: `BrowserHistoryController`, `HistoryJsController`, `NativeOrderController` and `OrderByIdController`
  * simplify driver implementation by removing `get`, `removeSlide`, `addSlide` and `moveSlide`
  * fix: driver triggers on after before transition end when using css animations
  * add `AnswerMemory` plugin for later logic depending on previous answers
  * rename `NormalizeInputAttributes` -> `InputNormalizer`
  * progessbars are now direct `AbstractFormsliderPlugin`s
  * loader are now direct `AbstractFormsliderPlugin`s
  * browser history is now a controller
  * refactor navigation trigger plugins to `NavigateOnCLick` and `NavigateOnKey`
  * refactor `LazyLoad` and `SlideVisibility` for working with non native order routing
  * add `slide-[id]-entered` event to `TrackUserInteraction`
  * add more comments and explcicit returns
  * do forgotten commit for `docs/EVENTMANAGER.md` ;)
  * add `PrevOnClick`
  * add new external plugin `NoUiSlider` to list

##### 1.0.21
  * don't let jquery.formslider fail if wrapper not found
  * add `animateHeight` to `Progressbar`
  * add possibility to access formslider directly via attached element
  * add `docs/FORMSLIDER.md`
  * add `docs/EVENTMANAGER.md`
  * update `README.md`

##### 1.0.20
  * eliminate unwanted loops for performance
  * remove logging of loaded modules

##### 1.0.19
  * add `hideAnimationDuration` to `SlideVisibility`

##### 1.0.18
  * fix `TabIndexSetter`, start from 1 and count up per slide -> fixes autofill
  * add area and object for tabindex setting and apply also to non visible because they get ignored
  * move slide `SlideVisibility` plugin from progress to views

##### 1.0.17
  * add `scrollTo` and `checkElement` method to `ScrollUp` so that they can be overridden
  * remove left and right check from `ScrollUp`

##### 1.0.16
  * implement `SlideVisibility`

##### 1.0.15
  * fix triggering after events, when there was not an allowed transition
  * correct description for `DirectionPolicyByRole`

##### 1.0.14
  * add specs for `DirectionPolicyByRole`
  * lock navigation until current transition finished
  * set default for `BrowserHistory` `updateHash` to false
  * introduce `resetStatesOnLoad` for `BrowserHistory`

##### 1.0.13
  * docs/INTEGRATION.md added
  * `DirectionPolicyByRole` introduced
  * implement `ProgressBar` with adapter:
    * `ProgressBarAdapterPercent`
    * `ProgressBarAdapterSteps`

##### 1.0.12
  * define FormSubmitter in global namespace

##### 1.0.11
  * build dist ;)

##### 1.0.10
  * add `configWithDataFrom` for `Abstract` so you can merge data attributes
  * log warning if `ScrollUp` does not find an element to check for
  * `Progressbar` merges config data from progress bar wrapper by default
  * `NextOnKey` attaches to all inputs per default config
  * `InputSync` attaches to all inputs per default config
  * refactor `FormSubmission` and implement strategies via adapter classes

##### 1.0.09
  * build dist ;)

##### 1.0.8
  * only equalize element heights at ready or resize

##### 1.0.8
  * add feature `disableOnMobile` to `InputFocus`
  * add feature `scrollUpOffset` to `ScrollUp`
  * introduce `FeatureDetector`

##### 1.0.7
  * performance

##### 1.0.6
  * add `DoOnEvent` for inline plugin definition
  * eleminate `before` event dependency from `EqualHeight`
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
