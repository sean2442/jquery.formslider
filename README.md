# jquery.formslider [![Build Status](https://travis-ci.org/formslider/jquery.formslider.svg?branch=master)](https://travis-ci.org/formslider/jquery.formslider) [![Code Climate](https://codeclimate.com/github/formslider/jquery.formslider/badges/gpa.svg)](https://codeclimate.com/github/formslider/jquery.formslider)

This plugin integrates a modified [Flexslider](https://github.com/formslider/FlexSlider) with logical slide pages that can have features and behaviours provided by plugins.

The main goal is to have different actions triggerd depending on what type the actual slide page is. You can stop going foward unless a formular is valid for example.

The Library is very small, performance optimized, full responsive and touch capable. You can easyly write you own plugins and implement custom slide behaviour.

## Installation
```bash
bower install jquery.formslider --save

# or

npm install jquery.formslider --save
```

## Integration
### Load files
Insert the following dependencies into you html file:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="[path_to_your_bower_components]/jquery.formslider/dist/jquery.formslider.dependencies.min.js"></script>
<script src="[path_to_your_bower_components]/jquery.formslider/dist/jquery.formslider.min.js"></script>

<link rel="stylesheet" href="[path_to_your_bower_components]/jquery.formslider/dist/formslider.min.css">
```

You can also use a sass version with pre defined mixins for selecting specific formslider elements:
  * [path_to_your_bower_components]/jquery.formslider/src/sass/formslider.sass
  * [path_to_your_bower_components]/jquery.formslider/src/sass/mixins/\_formslider.sass


### Insert markup
A Minimal Markup looks like this:
```html
<form>
  <div class="formslider-wrapper">
    <div class="formslider">

      <div class="slide" data-role="question">
        <div class="headline">Are you a man or a woman?</div>
        <label class="answer">
          <div class="text">man</div>
        </label>
        <label class="answer">
          <div class="text">women</div>
        </label>
      </div>

      <div class="slide" data-role="zipcode">
        <div class="headline">Where do you live?</div>
        <label for="contact_zipcode">zip code</label>
        <input type="number" required="required">
        <a class="next-button" href="#">continue</a>
      </div>

      <div class="slide" data-role="loader">
        <div class="headline">Please wait!</div>
        <div class="sub-headline">It does not take long.</div>
      </div>

      <div class="slide" data-role="confirmation">
        <div class="headline">Thank you for your interest</div>
        <div class="sub-headline">You hear from me as soon as possible.</div>
      </div>

    </div>
  </div>
</form>  
```

_Note:_ The classes are fully customizable.

### Initialize the formslider
Insert the following code into you html file:
```js
<script>
(function($){

  $('.my-formslider').formslider();

})(jQuery);
</script>
```

## Flexslider configuration
You can pass configuration for flexslider via the driver settings:
```js
$('.my-formslider').formslider({
  driver:{
    class:    'DriverFlexslider' ,
    selector: '.formslider > .slide'

    // add here your Flexslider settings
  }
  ...
});
```

[List of Flexslider settings](https://github.com/formslider/FlexSlider)
[List of Plugins and settings](docs/PLUGINS.md)

## Usage
### Example sequence
A possible use case is as follows:
  * you have a few **question slides** the user can answer and go forth and back
  * there is a **zipcode slide** the user enters a valid zip code
  * the **loader slide** makes an loading animation while navigation is blocked
  * the **contact slide** collects contact information and submits them together with the answers if the input is valid
  * the **confirmation slide** show information while no further navigation allowed

This functionality is provided by plugins. You can develop your own flow as you like by eytending and configuring plugins.

### List of bundeled plugins
```bash
# form plugins
  * AnswerClickPlugin                   # add answered classes and triggers track events
  * FormSubmissionPlugin                # submits a form if valid
  * InputFocusPlugin                    # focusses first input on current slide
  * InputSyncPlugin                     # syncs iputs with the same name
  * JqueryValidatePlugin                # validates inputs before leaving a slide, uses jquery-validate
  * NormalizeInputAttributesPlugin      # does n´some normalization on inputs
  * TabIndexerPlugin                    # fixes tab order on corrent visible slide

# generic plugins
  * AddSlideClassesPlugin               # adds classes based on role and index
  * DoOneTimeOnEventPlugin              # run a callback first time a specific event occurs

# navigation
  * ArrowNavigationPlugin               # adds arrow navigation feature
  * BrowserHistoryPlugin                       # adds browser history entries
  * NextOnClickPlugin                   # call next if certain element clicked
  * NextOnKeyPlugin                     # can trigger next if enter pressed

# progress  
  * ProgressBarPlugin                   # manages progess animation
  * TODO: SlideVisibilityPlugin         # hides adjascent slides befor transition is allowed          
  * TODO: NextSlideResolver             # adds individual slide targeting per answer or slide

# slides
  * LoaderSlidePlugin                   # controlls the loader page
  * ContactSlidePlugin                  # controlls the contact page
  * ConfirmationSlidePlugin             # controlls the confirmation page

# tracking
  * TrackSessionInformationPlugin       # triggers track events for useragent, device dimension etc.
  * TrackUserInteractionPlugin          # triggers track events for current/next page transition etc.

# view
  * EqualHeightPlugin                   # equalizes the height of elements
  * LazyLoadPlugin                      # load images from the next slides
  * LoadingStatePlugin                  # manipulates loading classes on ready
  * ScrollUpPlugin                      # scrolls up if a question is not in viewport
```

For a full list and detailed informations check out this guide: [PLUGINS](docs/PLUGINS.md)

### Write your own Plugin
Check out this guide: [EXTENDING](docs/EXTENDING.md)

### Dependencies
  * [jquery](https://jquery.com)
  * [jquery.debug](https://github.com/creative-workflow/jquery.debug)
  * [jquery-validation](https://github.com/jquery-validation/jquery-validation)
  * [isInViewport](https://github.com/zeusdeux/isInViewport)
  * [js-cookie](https://github.com/js-cookie/js-cookie)
  * [js-url](https://github.com/websanova/js-url)
  * [Flexslider](https://github.com/formslider/FlexSlider)

### Resources
  * https://github.com/formslider/jquery.formslider
  * https://travis-ci.org/formslider/jquery.formslider
  * https://codeclimate.com/github/formslider/jquery.formslider
  * http://bower.io/search/?q=jquery.formslider

### Authors

  [Tom Hanoldt](https://www.tomhanoldt.info)

### Changelog
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

# Contributing

Check out the [Contributing Guidelines](docs/CONTRIBUTING.md)
