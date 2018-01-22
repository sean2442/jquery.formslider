# jquery.formslider [![Build Status](https://travis-ci.org/formslider/jquery.formslider.svg?branch=master)](https://travis-ci.org/formslider/jquery.formslider) [![Contribute](https://img.shields.io/badge/Contribution-Open-brightgreen.svg)](docs/CONTRIBUTING.md) [![Code Climate](https://codeclimate.com/github/formslider/jquery.formslider/badges/gpa.svg)](https://codeclimate.com/github/formslider/jquery.formslider) [![npm](https://img.shields.io/npm/dt/jquery.formslider.svg)](https://www.npmjs.com/package/jquery.formslider) [![Beerpay](https://beerpay.io/formslider/jquery.formslider/badge.svg?style=flat)](https://beerpay.io/formslider/jquery.formslider)

[![NPM](https://nodei.co/npm/jquery.formslider.png)](https://nodei.co/npm/jquery.formslider/)

This jquery.formslider integrates a modified [Flexslider](https://github.com/formslider/FlexSlider) with logical slide pages that can have features and behaviors provided by plugins.

The main goal is to have different actions triggered depending on what type the actual slide page is. You can stop going forward when a formula is invalid for example.

The Library is very small, performance optimized, full responsive and touch capable. You can easily write you own plugins and implement custom slide behavior.

## Installation
```bash
bower install jquery.formslider --save

# or

npm install jquery.formslider --save
```

## Integration
Follow the [Integration Guide](docs/INTEGRATION.md).

### Example use case
A possible use case is as follows:
  * you have a few **question slides** the user can answer and go forth and back
  * there is a **zipcode slide** the user enters a valid zip code
  * the **loader slide** makes a loading animation while navigation is blocked
  * the **contact slide** collects contact information and submits them together with the answers if the input is valid
  * the **confirmation slide** show information while no further navigation allowed

This functionality is provided by plugins. You can develop your own flow as you like by extend or configure plugins.

### List of bundeled plugins
```bash
# form plugins
  * AnswerClickPlugin                   # add answered classes and triggers track events
  * FormSubmissionPlugin                # submits a form if valid
  * InputFocusPlugin                    # focusses first input on current slide
  * InputSyncPlugin                     # syncs inputs with the same name
  * JqueryValidatePlugin                # validates inputs before leaving a slide, uses jquery-validate
  * NormalizeInputAttributesPlugin      # does n´some normalization on inputs
  * TabIndexSetterPlugin                # fixes tab order on current visible slide

# generic plugins
  * AddSlideClassesPlugin               # adds classes based on role and index
  * DoOnEventPlugin                     # Generic plugin to for inline implementing a plugin.
  * DoOneTimeOnEventPlugin              # run a callback first time a specific event occurs

# navigation
  * ArrowNavigationPlugin               # adds arrow navigation feature
  * BrowserHistoryPlugin                # adds browser history entries
  * NextOnClickPlugin                   # call next if certain element clicked
  * NextOnKeyPlugin                     # can trigger next if enter pressed
  * DirectionPolicyByRolePlugin         # can prevent going forward or backward based on events

# progress  
  * ProgressBarPlugin                   # manages progress animation
  * TODO: NextSlideResolver             # adds individual slide targeting per answer or slide

# slides
  * LoaderSlidePlugin                   # controls the loader page

# tracking
  * TrackSessionInformationPlugin       # triggers track events for useragent, device dimension etc.
  * TrackUserInteractionPlugin          # triggers track events for current/next page transition etc.

# view
  * EqualHeightPlugin                   # equalizes the height of elements
  * LazyLoadPlugin                      # load images from the next slides
  * LoadingStatePlugin                  # manipulates loading classes on ready
  * ScrollUpPlugin                      # scrolls up if a question is not in viewport
  * SlideVisibilityPlugin               # hides slides before and after current until transition is allowed
```

For a full list and detailed informations check out this guide: [PLUGINS](docs/PLUGINS.md)

### Write your own Plugin
Check out this guide: [EXTENDING](docs/EXTENDING.md)

### Dependencies
  * [jquery](https://jquery.com)
  * [jquery.debug](https://github.com/creative-workflow/jquery.debug)
  * [jquery-validation](https://github.com/jquery-validation/jquery-validation)
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

# Contributing

Check out the [Contributing Guidelines](docs/CONTRIBUTING.md)


## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/formslider/jquery.formslider/badge.svg?style=beer)](https://beerpay.io/formslider/jquery.formslider)  [![Beerpay](https://beerpay.io/formslider/jquery.formslider/make-wish.svg?style=flat)](https://beerpay.io/formslider/jquery.formslider?focus=wish)
