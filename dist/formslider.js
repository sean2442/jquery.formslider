(function() {
  var EventManager, Logger,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  this.DriverFlexslider = (function() {
    DriverFlexslider.config = {
      selector: '.formslider > .slide',
      animation: 'slide',
      animationSpeed: 200,
      smoothHeight: true,
      useCSS: true,
      directionNav: false,
      controlNav: false,
      slideshow: false,
      keyboard: false,
      animationLoop: false
    };

    function DriverFlexslider(container, config1, onBefore, onAfter, onReady) {
      this.container = container;
      this.config = config1;
      this.onBefore = onBefore;
      this.onAfter = onAfter;
      this.onReady = onReady;
      this.moveSlide = bind(this.moveSlide, this);
      this.addSlide = bind(this.addSlide, this);
      this.removeSlide = bind(this.removeSlide, this);
      this._internOnAfter = bind(this._internOnAfter, this);
      this.index = bind(this.index, this);
      this.get = bind(this.get, this);
      this.goto = bind(this.goto, this);
      this.prev = bind(this.prev, this);
      this.next = bind(this.next, this);
      this.config = ObjectExtender.extend({}, DriverFlexslider.config, this.config);
      this.config.after = this._internOnAfter;
      this.config.conditionalBefore = this.onBefore;
      this.config.start = this.onReady;
      this.slides = $(this.config.selector, this.container);
      this.container.flexslider(this.config);
      this.instance = this.container.data('flexslider');
    }

    DriverFlexslider.prototype.next = function() {
      return this.container.flexslider("next");
    };

    DriverFlexslider.prototype.prev = function() {
      return this.container.flexslider("prev");
    };

    DriverFlexslider.prototype.goto = function(indexFromZero) {
      return this.container.flexslider(indexFromZero, true);
    };

    DriverFlexslider.prototype.get = function(indexFromZero) {
      if (indexFromZero === void 0) {
        indexFromZero = this.index();
      }
      return this.slides.get(indexFromZero);
    };

    DriverFlexslider.prototype.index = function() {
      return this.instance.currentSlide;
    };

    DriverFlexslider.prototype._internOnAfter = function(slider) {
      if (slider.lastSlide === slider.currentSlide) {
        return;
      }
      return this.onAfter(slider);
    };

    DriverFlexslider.prototype.removeSlide = function(slide) {
      return this.instance.removeSlide(slide);
    };

    DriverFlexslider.prototype.addSlide = function(slide, position) {
      return this.instance.addSlide(slide, position);
    };

    DriverFlexslider.prototype.moveSlide = function(slide, position) {
      return this.instance.moveSlide(slide, position);
    };

    return DriverFlexslider;

  })();

  this.AbstractFormsliderPlugin = (function() {
    function AbstractFormsliderPlugin(formslider, config) {
      this.formslider = formslider;
      this.slideByIndex = bind(this.slideByIndex, this);
      this.slideById = bind(this.slideById, this);
      this.slideByRole = bind(this.slideByRole, this);
      this.track = bind(this.track, this);
      this.trigger = bind(this.trigger, this);
      this.isCanceled = bind(this.isCanceled, this);
      this.cancel = bind(this.cancel, this);
      this.off = bind(this.off, this);
      this.on = bind(this.on, this);
      this.config = ObjectExtender.extend({}, this.constructor.config, config);
      this.container = this.formslider.container;
      this.slides = this.formslider.slides;
      this.logger = new Logger("jquery.formslider::" + this.constructor.name);
      this.init();
    }

    AbstractFormsliderPlugin.prototype.init = function() {
      return null;
    };

    AbstractFormsliderPlugin.prototype.on = function(eventName, callback) {
      return this.formslider.events.on(eventName + "." + this.constructor.name, callback);
    };

    AbstractFormsliderPlugin.prototype.off = function(eventName) {
      return this.formslider.events.off(eventName + "." + this.constructor.name);
    };

    AbstractFormsliderPlugin.prototype.cancel = function(event) {
      return this.formslider.events.cancel(event);
    };

    AbstractFormsliderPlugin.prototype.isCanceled = function(event) {
      return this.formslider.events.isCanceled(event);
    };

    AbstractFormsliderPlugin.prototype.trigger = function() {
      var ref;
      return (ref = this.formslider.events).trigger.apply(ref, arguments);
    };

    AbstractFormsliderPlugin.prototype.track = function(source, value, category) {
      if (category == null) {
        category = null;
      }
      return this.formslider.events.trigger('track', source, value, category);
    };

    AbstractFormsliderPlugin.prototype.slideByRole = function(role) {
      return $(".slide-role-" + role, this.container);
    };

    AbstractFormsliderPlugin.prototype.slideById = function(id) {
      return $(".slide-id-" + id, this.container);
    };

    AbstractFormsliderPlugin.prototype.slideByIndex = function(indexFromZero) {
      return this.slides.get(indexFromZero);
    };

    return AbstractFormsliderPlugin;

  })();

  this.AnswerClickPlugin = (function(superClass) {
    extend(AnswerClickPlugin, superClass);

    function AnswerClickPlugin() {
      this.onAnswerClicked = bind(this.onAnswerClicked, this);
      this.init = bind(this.init, this);
      return AnswerClickPlugin.__super__.constructor.apply(this, arguments);
    }

    AnswerClickPlugin.prototype.init = function() {
      var $answers;
      $answers = $(this.config.answerSelector, this.container);
      return $answers.on('mouseup', this.onAnswerClicked);
    };

    AnswerClickPlugin.prototype.onAnswerClicked = function(event) {
      var $allAnswersinRow, $answer, $answerRow;
      event.preventDefault();
      $answer = $(event.currentTarget);
      $answerRow = $answer.closest(this.config.answersSelector);
      $allAnswersinRow = $(this.config.answerSelector, $answerRow);
      $allAnswersinRow.removeClass(this.config.answerSelectedClass);
      $answer.addClass(this.config.answerSelectedClass);
      return this.trigger('question-answered', $answer, $('input', $answer).val(), this.formslider.index());
    };

    return AnswerClickPlugin;

  })(AbstractFormsliderPlugin);

  this.FormSubmissionPlugin = (function(superClass) {
    extend(FormSubmissionPlugin, superClass);

    function FormSubmissionPlugin() {
      this.collectInputs = bind(this.collectInputs, this);
      this.onFail = bind(this.onFail, this);
      this.onDone = bind(this.onDone, this);
      this.onSubmit = bind(this.onSubmit, this);
      this.init = bind(this.init, this);
      return FormSubmissionPlugin.__super__.constructor.apply(this, arguments);
    }

    FormSubmissionPlugin.config = {
      submitOnEvents: ['validation.valid.contact'],
      successEventName: 'form-submitted',
      errorEventName: 'form-submission-error',
      loadHiddenFrameOnSuccess: 'url',
      strategy: {
        type: 'collect',
        endpoint: '#',
        method: 'POST'
      }
    };

    FormSubmissionPlugin.prototype.init = function() {
      var eventName, i, len, ref, results;
      ref = this.config.submitOnEvents;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        eventName = ref[i];
        results.push(this.on(eventName, this.onSubmit));
      }
      return results;
    };

    FormSubmissionPlugin.prototype.onSubmit = function(event, currentSlide) {
      var $form;
      return this.isCanceled(event);
      switch (this.config.strategy.type) {
        case 'submit':
          $form = $(this.config.formSelector);
          return $form.submit();
        case 'ajaxSubmit':
          $form = $(this.config.formSelector);
          $form.ajaxSubmit(this.config.strategy);
          return $form.data('jqxhr').done(this.onDone).fail(this.onFail);
        case 'collect':
          return $.ajax({
            cache: false,
            url: this.config.strategy.endpoint,
            method: this.config.strategy.method,
            data: this.collectInputs()
          }).done(this.onDone).fail(this.onFail);
      }
    };

    FormSubmissionPlugin.prototype.onDone = function() {
      this.trigger(this.config.successEventName);
      this.loadHiddenFrameOnSuccess();
      return this.logger.debug('onDone');
    };

    FormSubmissionPlugin.prototype.onFail = function() {
      this.logger.error('onFail', this.config.errorEventName);
      return this.trigger(this.config.errorEventName);
    };

    FormSubmissionPlugin.prototype.collectInputs = function() {
      var $input, $inputs, $other, $others, i, input, j, len, len1, other, result;
      result = {};
      $inputs = $('input', this.container);
      for (i = 0, len = $inputs.length; i < len; i++) {
        input = $inputs[i];
        $input = $(input);
        if ($input.is(':checkbox') || $input.is(':radio')) {
          if ($input.is(':checked')) {
            result[$input.attr('name')] = $input.val();
          }
        } else {
          result[$input.attr('name')] = $input.val();
        }
      }
      $others = $('select, textarea', this.container);
      for (j = 0, len1 = $others.length; j < len1; j++) {
        other = $others[j];
        $other = $(other);
        result[$other.attr('name')] = $other.val();
      }
      return result;
    };

    FormSubmissionPlugin.prototype.loadHiddenFrameOnSuccess = function(url) {
      if (this.config.loadHiddenFrameOnSuccess == null) {
        return;
      }
      return $('<iframe>', {
        src: this.config.loadHiddenFrameOnSuccess,
        id: 'formslider_conversion_frame',
        frameborder: 0,
        scrolling: 'no'
      }).css({
        width: 0,
        height: 0
      }).appendTo('body');
    };

    return FormSubmissionPlugin;

  })(AbstractFormsliderPlugin);

  this.InputFocusPlugin = (function(superClass) {
    extend(InputFocusPlugin, superClass);

    function InputFocusPlugin() {
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return InputFocusPlugin.__super__.constructor.apply(this, arguments);
    }

    InputFocusPlugin.config = {
      selector: 'input:visible',
      waitBeforeFocus: 200
    };

    InputFocusPlugin.prototype.init = function() {
      return this.on('after', this.onAfter);
    };

    InputFocusPlugin.prototype.onAfter = function(e, currentSlide, direction, prevSlide) {
      var $input;
      $input = $(this.config.selector, currentSlide);
      if (!$input.length) {
        return;
      }
      return setTimeout(function() {
        return $input.first().focus();
      }, this.config.waitBeforeFocus);
    };

    return InputFocusPlugin;

  })(AbstractFormsliderPlugin);

  this.InputSyncPlugin = (function(superClass) {
    extend(InputSyncPlugin, superClass);

    function InputSyncPlugin() {
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return InputSyncPlugin.__super__.constructor.apply(this, arguments);
    }

    InputSyncPlugin.config = {
      selector: 'input:visible',
      attribute: 'name'
    };

    InputSyncPlugin.prototype.init = function() {
      this.storage = {};
      return this.on('after', this.onAfter);
    };

    InputSyncPlugin.prototype.onAfter = function(event, currentSlide, direction, prevSlide) {
      var $inputsHere, $inputsThere;
      $inputsHere = $(this.config.selector, prevSlide);
      $inputsHere.each((function(_this) {
        return function(index, input) {
          var $input;
          $input = $(input);
          return _this.storage[$input.attr(_this.config.attribute)] = $input.val();
        };
      })(this));
      $inputsThere = $(this.config.selector, currentSlide);
      return $inputsThere.each((function(_this) {
        return function(index, input) {
          var $input, inputName;
          $input = $(input);
          inputName = $input.attr(_this.config.attribute);
          if (_this.storage[inputName]) {
            return $input.val(_this.storage[inputName]);
          }
        };
      })(this));
    };

    return InputSyncPlugin;

  })(AbstractFormsliderPlugin);

  this.JqueryValidatePlugin = (function(superClass) {
    extend(JqueryValidatePlugin, superClass);

    function JqueryValidatePlugin() {
      this.prepareInputs = bind(this.prepareInputs, this);
      this.onValidate = bind(this.onValidate, this);
      this.init = bind(this.init, this);
      return JqueryValidatePlugin.__super__.constructor.apply(this, arguments);
    }

    JqueryValidatePlugin.config = {
      selector: 'input:visible',
      validateOnEvents: ['leaving.next'],
      forceMaxLengthJs: "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);",
      messages: {
        required: 'Required',
        maxlength: 'To long',
        minlength: 'To short',
        email: 'Enter valid E-Mail'
      }
    };

    JqueryValidatePlugin.prototype.init = function() {
      var eventName, i, len, ref;
      ref = this.config.validateOnEvents;
      for (i = 0, len = ref.length; i < len; i++) {
        eventName = ref[i];
        this.on(eventName, this.onValidate);
      }
      this.prepareInputs();
      return this.trigger("validation.prepared");
    };

    JqueryValidatePlugin.prototype.onValidate = function(event, currentSlide, direction, nextSlide) {
      var $inputs, currentRole, error;
      $inputs = $(this.config.selector, currentSlide);
      if (!$inputs.length) {
        return;
      }
      currentRole = $(currentSlide).data('role');
      try {
        if ($inputs.valid()) {
          return this.trigger("validation.valid." + currentRole, currentSlide);
        } else {
          $inputs.filter('.error').first().focus();
          this.trigger("validation.invalid." + currentRole, currentSlide);
          return this.cancel(event);
        }
      } catch (error1) {
        error = error1;
        this.trigger("validation.error." + currentRole, currentSlide);
        return this.logger.debug('validation error', error);
      }
    };

    JqueryValidatePlugin.prototype.prepareInputs = function() {
      return $(this.config.selector, this.container).each((function(_this) {
        return function(index, input) {
          var $input, attribute, i, len, ref;
          $input = $(input);
          if ($input.attr('required')) {
            $input.data('data-rule-required', 'true');
            $input.data('data-msg-required', _this.config.messages.required);
          }
          if ($input.data('type') === 'number') {
            $input.attr('pattern', '\\d*');
            $input.attr('inputmode', 'numeric');
          }
          if ($input.data('without-spinner')) {
            $input.addClass('without-spinner');
          }
          ref = ['maxlength', 'minlength'];
          for (i = 0, len = ref.length; i < len; i++) {
            attribute = ref[i];
            if ($input.attr(attribute)) {
              $input.data("data-rule-" + attribute, $input.attr(attribute));
              $input.data("data-msg-" + attribute, _this.config.messages[attribute]);
            }
          }
          if ($input.data('force-max-length')) {
            $input.attr('oninput', _this.config.forceMaxLengthJs);
          }
          if ($input.attr('type') === 'email') {
            return $input.data('data-msg-email', _this.config.messages.email);
          }
        };
      })(this));
    };

    return JqueryValidatePlugin;

  })(AbstractFormsliderPlugin);

  this.NormalizeInputAttributesPlugin = (function(superClass) {
    extend(NormalizeInputAttributesPlugin, superClass);

    function NormalizeInputAttributesPlugin() {
      this.prepareInputs = bind(this.prepareInputs, this);
      this.init = bind(this.init, this);
      return NormalizeInputAttributesPlugin.__super__.constructor.apply(this, arguments);
    }

    NormalizeInputAttributesPlugin.config = {
      selector: 'input:visible'
    };

    NormalizeInputAttributesPlugin.prototype.init = function() {
      return this.prepareInputs();
    };

    NormalizeInputAttributesPlugin.prototype.prepareInputs = function() {
      return $(this.config.selector, this.container).each(function(index, input) {
        var $input, attribute, i, len, ref, results;
        $input = $(input);
        if ($input.attr('required')) {
          $input.data('required', 'required');
          $input.data('aria-required', 'true');
        }
        ref = ['inputmode', 'autocompletetype'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          attribute = ref[i];
          if ($input.attr(attribute)) {
            results.push($input.data("x-" + attribute, $input.attr(attribute)));
          } else {
            results.push(void 0);
          }
        }
        return results;
      });
    };

    return NormalizeInputAttributesPlugin;

  })(AbstractFormsliderPlugin);

  this.TabIndexSetterPlugin = (function(superClass) {
    extend(TabIndexSetterPlugin, superClass);

    function TabIndexSetterPlugin() {
      this.disableTabs = bind(this.disableTabs, this);
      this.enableTabs = bind(this.enableTabs, this);
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return TabIndexSetterPlugin.__super__.constructor.apply(this, arguments);
    }

    TabIndexSetterPlugin.config = {
      selector: 'input:visible, a, select, textarea, button'
    };

    TabIndexSetterPlugin.prototype.init = function() {
      this.disableTabs();
      this.enableTabs(this.slideByIndex(0));
      return this.on('after', this.onAfter);
    };

    TabIndexSetterPlugin.prototype.onAfter = function(event, currentSlide, direction, prevSlide) {
      this.disableTabs();
      return this.enableTabs(currentSlide);
    };

    TabIndexSetterPlugin.prototype.enableTabs = function(slide) {
      return $(this.config.selector, slide).attr('tabindex', 0);
    };

    TabIndexSetterPlugin.prototype.disableTabs = function() {
      return $(this.config.selector, this.container).attr('tabindex', '-1');
    };

    return TabIndexSetterPlugin;

  })(AbstractFormsliderPlugin);

  this.AddSlideClassesPlugin = (function(superClass) {
    extend(AddSlideClassesPlugin, superClass);

    function AddSlideClassesPlugin() {
      this._addAnswerCountClasses = bind(this._addAnswerCountClasses, this);
      this._doWithSlide = bind(this._doWithSlide, this);
      this.init = bind(this.init, this);
      return AddSlideClassesPlugin.__super__.constructor.apply(this, arguments);
    }

    AddSlideClassesPlugin.prototype.init = function() {
      return this.slides.each(this._doWithSlide);
    };

    AddSlideClassesPlugin.prototype._doWithSlide = function(index, slide) {
      var $slide;
      $slide = $(slide);
      this._addAnswerCountClasses(index, $slide);
      this._addSlideNumberClass(index, $slide);
      this._addRoleClass(index, $slide);
      return this._addSlideIdClass($slide);
    };

    AddSlideClassesPlugin.prototype._addAnswerCountClasses = function(index, $slide) {
      var answerCount;
      answerCount = $(this.config.answerSelector, $slide).length;
      return $slide.addClass("answer-count-" + answerCount).data('answer-count', answerCount);
    };

    AddSlideClassesPlugin.prototype._addRoleClass = function(index, $slide) {
      var role;
      role = $slide.data('role');
      return $slide.addClass("slide-role-" + role);
    };

    AddSlideClassesPlugin.prototype._addSlideNumberClass = function(index, $slide) {
      return $slide.addClass("slide-number-" + index).data('slide-number', index);
    };

    AddSlideClassesPlugin.prototype._addSlideIdClass = function($slide) {
      var id;
      id = $slide.data('id');
      if (id === void 0) {
        id = $slide.data('role');
      }
      return $slide.addClass("slide-id-" + id);
    };

    return AddSlideClassesPlugin;

  })(AbstractFormsliderPlugin);

  this.DoOneTimeOnEventPlugin = (function(superClass) {
    extend(DoOneTimeOnEventPlugin, superClass);

    function DoOneTimeOnEventPlugin() {
      this.init = bind(this.init, this);
      return DoOneTimeOnEventPlugin.__super__.constructor.apply(this, arguments);
    }

    DoOneTimeOnEventPlugin.prototype.init = function() {
      return $.each(this.config, (function(_this) {
        return function(eventName, callback) {
          if (typeof callback === 'function') {
            return _this.on(eventName, function() {
              _this.off(eventName);
              return callback(_this);
            });
          }
        };
      })(this));
    };

    return DoOneTimeOnEventPlugin;

  })(AbstractFormsliderPlugin);

  this.ArrowNavigationPlugin = (function(superClass) {
    extend(ArrowNavigationPlugin, superClass);

    function ArrowNavigationPlugin() {
      this.onKeyPressed = bind(this.onKeyPressed, this);
      this.init = bind(this.init, this);
      return ArrowNavigationPlugin.__super__.constructor.apply(this, arguments);
    }

    ArrowNavigationPlugin.config = {
      selector: document,
      keyCodeLeft: 37,
      keyCodeRight: 39
    };

    ArrowNavigationPlugin.prototype.init = function() {
      var $trigger;
      $trigger = $(this.config.selector);
      return $trigger.keydown(this.onKeyPressed);
    };

    ArrowNavigationPlugin.prototype.onKeyPressed = function(event) {
      var keyCode;
      keyCode = event.keyCode || event.which;
      switch (keyCode) {
        case this.config.keyCodeLeft:
          return this.formslider.prev();
        case this.config.keyCodeRight:
          return this.formslider.next();
      }
    };

    return ArrowNavigationPlugin;

  })(AbstractFormsliderPlugin);

  this.BrowserHistoryPlugin = (function(superClass) {
    extend(BrowserHistoryPlugin, superClass);

    function BrowserHistoryPlugin() {
      this.handleHistoryChange = bind(this.handleHistoryChange, this);
      this.pushCurrentHistoryState = bind(this.pushCurrentHistoryState, this);
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return BrowserHistoryPlugin.__super__.constructor.apply(this, arguments);
    }

    BrowserHistoryPlugin.config = {
      updateHash: true
    };

    BrowserHistoryPlugin.prototype.init = function() {
      this.on('after', this.onAfter);
      this.dontUpdateHistoryNow = false;
      this.pushCurrentHistoryState();
      return $(window).bind('popstate', this.handleHistoryChange);
    };

    BrowserHistoryPlugin.prototype.onAfter = function() {
      if (this.dontUpdateHistoryNow) {
        this.dontUpdateHistoryNow = false;
        return;
      }
      return this.pushCurrentHistoryState();
    };

    BrowserHistoryPlugin.prototype.pushCurrentHistoryState = function() {
      var hash;
      hash = null;
      if (this.config.updateHash) {
        hash = "#" + (this.formslider.index());
      }
      this.logger.debug('pushCurrentHistoryState', hash);
      return history.pushState({
        index: this.formslider.index()
      }, "index " + (this.formslider.index()), hash);
    };

    BrowserHistoryPlugin.prototype.handleHistoryChange = function(event) {
      var newIndex, ref;
      if (((ref = event.originalEvent) != null ? ref.state : void 0) == null) {
        return;
      }
      newIndex = event.originalEvent.state.index;
      this.logger.debug('handleHistoryChange', newIndex);
      this.dontUpdateHistoryNow = true;
      return this.formslider.goto(newIndex);
    };

    return BrowserHistoryPlugin;

  })(AbstractFormsliderPlugin);

  this.NextOnClickPlugin = (function(superClass) {
    extend(NextOnClickPlugin, superClass);

    function NextOnClickPlugin() {
      this.onClick = bind(this.onClick, this);
      this.init = bind(this.init, this);
      return NextOnClickPlugin.__super__.constructor.apply(this, arguments);
    }

    NextOnClickPlugin.config = {
      selector: '.next-button, .answer',
      waitAfterClick: 10
    };

    NextOnClickPlugin.prototype.init = function() {
      var $buttons;
      $buttons = $(this.config.selector, this.container);
      return $buttons.on('mouseup', this.onClick);
    };

    NextOnClickPlugin.prototype.onClick = function(event) {
      event.preventDefault();
      if (!this.timeout) {
        return this.timeout = setTimeout((function(_this) {
          return function() {
            _this.formslider.next();
            return _this.timeout = null;
          };
        })(this), this.config.waitAfterClick);
      }
    };

    return NextOnClickPlugin;

  })(AbstractFormsliderPlugin);

  this.NextOnKeyPlugin = (function(superClass) {
    extend(NextOnKeyPlugin, superClass);

    function NextOnKeyPlugin() {
      this.onKeyPressed = bind(this.onKeyPressed, this);
      this.init = bind(this.init, this);
      return NextOnKeyPlugin.__super__.constructor.apply(this, arguments);
    }

    NextOnKeyPlugin.config = {
      selector: 'input:visible',
      keyCode: 13
    };

    NextOnKeyPlugin.prototype.init = function() {
      var $inputs;
      $inputs = $(this.config.selector, this.container);
      return $inputs.keypress(this.onKeyPressed);
    };

    NextOnKeyPlugin.prototype.onKeyPressed = function(event) {
      var keyCode;
      keyCode = event.keyCode || event.which;
      if (keyCode === this.config.keyCode) {
        return this.formslider.next();
      }
    };

    return NextOnKeyPlugin;

  })(AbstractFormsliderPlugin);

  this.NextSlideResolverPlugin = (function(superClass) {
    extend(NextSlideResolverPlugin, superClass);

    function NextSlideResolverPlugin() {
      this.onResolve = bind(this.onResolve, this);
      this.makeToNextSlide = bind(this.makeToNextSlide, this);
      this.onQuestionAnswered = bind(this.onQuestionAnswered, this);
      this.onReady = bind(this.onReady, this);
      this.init = bind(this.init, this);
      return NextSlideResolverPlugin.__super__.constructor.apply(this, arguments);
    }

    NextSlideResolverPlugin.prototype.init = function() {
      this.on('ready', this.onReady);
      return this.on('before-driver-next', this.onResolve);
    };

    NextSlideResolverPlugin.prototype.onReady = function(event) {
      return this.slides.each((function(_this) {
        return function(index, slide) {
          var $slide, slideBefore;
          $slide = $(slide);
          slideBefore = _this.slides.get(index - 1);
          if (slideBefore && $(slideBefore).data('next-id') === void 0) {
            return $(slideBefore).data('next-id', $slide.data('id')).addClass("next-id-" + ($slide.data('id')));
          }
        };
      })(this));
    };

    NextSlideResolverPlugin.prototype.onQuestionAnswered = function(event, $answer, value, slideIndex) {
      var answerNextId, currentSlide, nextId;
      currentSlide = this.slideByIndex(slideIndex);
      answerNextId = $answer.data('next-id');
      nextId = $(currentSlide).data('next-id');
      if (answerNextId !== void 0) {
        nextId = answerNextId;
      }
      return this.makeToNextSlide(nextId, slideIndex + 1, currentSlide);
    };

    NextSlideResolverPlugin.prototype.makeToNextSlide = function(nextId, insertAtIndex, currentSlide) {
      var nextSlide;
      nextSlide = this.slideById(nextId);
      this.formslider.driver.moveSlide(nextSlide, insertAtIndex);
      return this.trigger('next-slide-changed', nextSlide);
    };

    NextSlideResolverPlugin.prototype.onResolve = function(event) {
      var currentSlide, nextId, nextIdFromAnswer, nextSlide, selectedAnswer;
      currentSlide = this.formslider.driver.get(this.formslider.index());
      nextId = $(currentSlide).data('next-id');
      selectedAnswer = $("." + this.config.answerSelectedClass, currentSlide);
      if (selectedAnswer.length) {
        nextIdFromAnswer = selectedAnswer.data('next-id');
        if (nextIdFromAnswer !== void 0) {
          nextId = nextIdFromAnswer;
        }
      }
      if (nextId !== void 0) {
        nextSlide = this.slideById(nextId);
        this.makeToNextSlide(nextId, $(currentSlide).index() + 1, currentSlide);
        return this.trigger('next-slide-changed', nextSlide);
      }
    };

    return NextSlideResolverPlugin;

  })(AbstractFormsliderPlugin);

  this.ProgressBarPlugin = (function(superClass) {
    extend(ProgressBarPlugin, superClass);

    function ProgressBarPlugin() {
      this.show = bind(this.show, this);
      this.hide = bind(this.hide, this);
      this._setSteps = bind(this._setSteps, this);
      this._setPercentStepCallback = bind(this._setPercentStepCallback, this);
      this._setPercent = bind(this._setPercent, this);
      this.set = bind(this.set, this);
      this.shouldBeVisible = bind(this.shouldBeVisible, this);
      this.onBefore = bind(this.onBefore, this);
      this.slidesThatCount = bind(this.slidesThatCount, this);
      this.init = bind(this.init, this);
      return ProgressBarPlugin.__super__.constructor.apply(this, arguments);
    }

    ProgressBarPlugin.config = {
      selectorWrapper: '.progressbar-wrapper',
      selectorText: '.progress-text',
      selectorProgress: '.progress',
      animationSpeed: 300,
      type: 'percent',
      initialProgress: '15',
      dontCountOnRoles: ['loader', 'contact', 'confirmation'],
      hideOnRoles: ['zipcode', 'loader', 'contact', 'confirmation']
    };

    ProgressBarPlugin.prototype.init = function() {
      this.on('before', this.onBefore);
      this.visible = true;
      this.wrapper = $(this.config.selectorWrapper);
      this.progress = $(this.config.selectorText, this.wrapper);
      this.bar = $(this.config.selectorProgress, this.wrapper);
      this.type = this.config.type;
      this.bar.css('transition-duration', (this.config.animationSpeed / 1000) + 's');
      this.countMax = this.slidesThatCount();
      return this.set(0);
    };

    ProgressBarPlugin.prototype.slidesThatCount = function() {
      var i, len, ref, role, substract;
      substract = 0;
      ref = this.config.dontCountOnRoles;
      for (i = 0, len = ref.length; i < len; i++) {
        role = ref[i];
        substract = substract + this.slideByRole(role).length;
      }
      return this.slides.length - substract;
    };

    ProgressBarPlugin.prototype.onBefore = function(e, current, direction, next) {
      var index;
      index = this.formslider.index() + 1;
      if (direction === 'prev') {
        index = this.formslider.index() - 1;
      }
      if (!this.shouldBeVisible(next)) {
        this.set(index);
        return this.hide();
      }
      this.show();
      return this.set(index);
    };

    ProgressBarPlugin.prototype.shouldBeVisible = function(slide) {
      var ref;
      return !(ref = $(slide).data('role'), indexOf.call(this.config.hideOnRoles, ref) >= 0);
    };

    ProgressBarPlugin.prototype.set = function(indexFromZero) {
      var indexFromOne, percent;
      if (indexFromZero > this.countMax) {
        indexFromZero = this.countMax;
      }
      if (indexFromZero < 0) {
        indexFromZero = 0;
      }
      indexFromOne = indexFromZero + 1;
      percent = (indexFromOne / this.countMax) * 100;
      this.bar.css('width', percent + '%');
      if (this.config.type === 'steps') {
        this._setSteps(indexFromOne);
        this._setSteps(indexFromOne);
        return;
      }
      if ((this.config.initialProgress != null) && indexFromZero < 1) {
        percent = Math.max(this.config.initialProgress, percent);
      }
      return this._setPercent(percent);
    };

    ProgressBarPlugin.prototype._setPercent = function(percent) {
      var startFrom;
      startFrom = parseInt(this.progress.text()) || 13;
      return $({
        Counter: startFrom
      }).animate({
        Counter: percent
      }, {
        duration: this.config.animationSpeed,
        queue: false,
        easing: 'swing',
        step: this._setPercentStepCallback
      });
    };

    ProgressBarPlugin.prototype._setPercentStepCallback = function(percent) {
      return this.progress.text(Math.ceil(percent) + '%');
    };

    ProgressBarPlugin.prototype._setSteps = function(indexFromOne) {
      return this.progress.text(indexFromOne + "/" + this.countMax);
    };

    ProgressBarPlugin.prototype.hide = function() {
      if (!this.visible) {
        return;
      }
      this.wrapper.animate({
        opacity: 0
      }, this.config.animationSpeed);
      return this.visible = false;
    };

    ProgressBarPlugin.prototype.show = function() {
      if (this.visible) {
        return;
      }
      this.wrapper.animate({
        opacity: 1
      }, this.config.animationSpeed);
      return this.visible = true;
    };

    return ProgressBarPlugin;

  })(AbstractFormsliderPlugin);

  this.ConfirmationSlidePlugin = (function(superClass) {
    extend(ConfirmationSlidePlugin, superClass);

    function ConfirmationSlidePlugin() {
      this.onLeaving = bind(this.onLeaving, this);
      this.init = bind(this.init, this);
      return ConfirmationSlidePlugin.__super__.constructor.apply(this, arguments);
    }

    ConfirmationSlidePlugin.prototype.init = function() {
      return this.on('leaving.confirmation', this.onLeaving);
    };

    ConfirmationSlidePlugin.prototype.onLeaving = function(event, current, direction, next) {
      return this.cancel(event);
    };

    return ConfirmationSlidePlugin;

  })(AbstractFormsliderPlugin);

  this.ContactSlidePlugin = (function(superClass) {
    extend(ContactSlidePlugin, superClass);

    function ContactSlidePlugin() {
      this.onLeaving = bind(this.onLeaving, this);
      this.init = bind(this.init, this);
      return ContactSlidePlugin.__super__.constructor.apply(this, arguments);
    }

    ContactSlidePlugin.prototype.init = function() {
      return this.on('leaving.contact', this.onLeaving);
    };

    ContactSlidePlugin.prototype.onLeaving = function(event, current, direction, next) {
      if (direction === 'prev') {
        return this.cancel(event);
      }
    };

    return ContactSlidePlugin;

  })(AbstractFormsliderPlugin);

  this.LoaderSlidePlugin = (function(superClass) {
    extend(LoaderSlidePlugin, superClass);

    function LoaderSlidePlugin() {
      this.isLoading = bind(this.isLoading, this);
      this.onLeaving = bind(this.onLeaving, this);
      this.onBefore = bind(this.onBefore, this);
      this.init = bind(this.init, this);
      return LoaderSlidePlugin.__super__.constructor.apply(this, arguments);
    }

    LoaderSlidePlugin.config = {
      loaderClass: 'SimpleLoaderImplementation',
      duration: 1000
    };

    LoaderSlidePlugin.prototype.init = function() {
      this.on('before.loader', this.onBefore);
      return this.on('leaving.loader', this.onLeaving);
    };

    LoaderSlidePlugin.prototype.onBefore = function(event, currentSlide, direction, nextSlide) {
      var LoaderClass;
      if (this.isLoading()) {
        return;
      }
      LoaderClass = window[this.config.loaderClass];
      this.loader = new LoaderClass(this, this.config, nextSlide);
      return this.loader.start();
    };

    LoaderSlidePlugin.prototype.onLeaving = function(event, current, direction, next) {
      if (direction === 'prev') {
        this.cancel(event);
      }
      if (this.isLoading()) {
        return this.cancel(event);
      }
    };

    LoaderSlidePlugin.prototype.isLoading = function() {
      var ref;
      return (ref = this.loader) != null ? ref.animating : void 0;
    };

    return LoaderSlidePlugin;

  })(AbstractFormsliderPlugin);

  this.AbstractFormsliderLoader = (function() {
    AbstractFormsliderLoader.config = {
      duration: 2000
    };

    function AbstractFormsliderLoader(plugin1, config1, slide1) {
      this.plugin = plugin1;
      this.config = config1;
      this.slide = slide1;
      this.stop = bind(this.stop, this);
      this.doAnimation = bind(this.doAnimation, this);
      this.start = bind(this.start, this);
      this.config = ObjectExtender.extend({}, this.constructor.config, this.config);
      this.animating = false;
    }

    AbstractFormsliderLoader.prototype.start = function() {
      if (this.animating) {
        return false;
      }
      this.plugin.logger.debug("start(" + this.config.duration + ")");
      this.animating = true;
      return setTimeout(this.doAnimation, this.config.duration);
    };

    AbstractFormsliderLoader.prototype.doAnimation = function() {
      return this.stop();
    };

    AbstractFormsliderLoader.prototype.stop = function() {
      this.plugin.logger.debug('stop()');
      this.animating = false;
      return this.plugin.formslider.next();
    };

    return AbstractFormsliderLoader;

  })();

  this.SimpleLoaderImplementation = (function(superClass) {
    extend(SimpleLoaderImplementation, superClass);

    function SimpleLoaderImplementation() {
      return SimpleLoaderImplementation.__super__.constructor.apply(this, arguments);
    }

    return SimpleLoaderImplementation;

  })(AbstractFormsliderLoader);

  this.TrackSessionInformationPlugin = (function(superClass) {
    extend(TrackSessionInformationPlugin, superClass);

    function TrackSessionInformationPlugin() {
      this.inform = bind(this.inform, this);
      this.onFirstInteraction = bind(this.onFirstInteraction, this);
      this.init = bind(this.init, this);
      return TrackSessionInformationPlugin.__super__.constructor.apply(this, arguments);
    }

    TrackSessionInformationPlugin.config = {
      onReady: null,
      onReadyInternal: function(plugin) {
        plugin.inform('url', location.href);
        plugin.inform('useragent', navigator.userAgent);
        plugin.inform('referer', document.referrer);
        plugin.inform('dimension', $(window).width() + 'x' + $(window).height());
        plugin.inform('jquery.formslider.version', plugin.formslider.config.version);
        if (plugin.formslider.plugins.isLoaded('JqueryTrackingPlugin')) {
          plugin.inform('channel', $.tracking.channel());
          return plugin.inform('campaign', $.tracking.campaign());
        }
      }
    };

    TrackSessionInformationPlugin.prototype.init = function() {
      return this.on('first-interaction', this.onFirstInteraction);
    };

    TrackSessionInformationPlugin.prototype.onFirstInteraction = function() {
      if (this.config.onReadyInternal) {
        this.config.onReadyInternal(this);
      }
      if (this.config.onReady) {
        return this.config.onReady(this);
      }
    };

    TrackSessionInformationPlugin.prototype.inform = function(name, value) {
      this.track(name, value, 'info');
      return this.container.append($('<input>', {
        type: 'hidden',
        name: "info[" + name + "]",
        value: value
      }));
    };

    return TrackSessionInformationPlugin;

  })(AbstractFormsliderPlugin);

  this.TrackUserInteractionPlugin = (function(superClass) {
    extend(TrackUserInteractionPlugin, superClass);

    function TrackUserInteractionPlugin() {
      this.setupQuestionAnswerTracking = bind(this.setupQuestionAnswerTracking, this);
      this.setupTransportTracking = bind(this.setupTransportTracking, this);
      this.init = bind(this.init, this);
      return TrackUserInteractionPlugin.__super__.constructor.apply(this, arguments);
    }

    TrackUserInteractionPlugin.config = {
      questionAnsweredEvent: 'question-answered'
    };

    TrackUserInteractionPlugin.prototype.init = function() {
      this.setupQuestionAnswerTracking();
      return this.setupTransportTracking();
    };

    TrackUserInteractionPlugin.prototype.setupTransportTracking = function() {
      return this.on("after", (function(_this) {
        return function(event, currentSlide, direction, prevSlide) {
          var index, role;
          index = _this.formslider.index();
          role = $(currentSlide).data('role');
          _this.track("slide-" + index + "-entered", direction);
          return _this.track("slide-role-" + role + "-entered");
        };
      })(this));
    };

    TrackUserInteractionPlugin.prototype.setupQuestionAnswerTracking = function() {
      return this.on('question-answered', (function(_this) {
        return function(event, $answer, value, slideIndex) {
          var eventName;
          eventName = _this.config.questionAnsweredEvent;
          _this.track(eventName, slideIndex);
          return _this.track(eventName + "-" + slideIndex, value);
        };
      })(this));
    };

    return TrackUserInteractionPlugin;

  })(AbstractFormsliderPlugin);

  this.EqualHeightPlugin = (function(superClass) {
    extend(EqualHeightPlugin, superClass);

    function EqualHeightPlugin() {
      this.onResize = bind(this.onResize, this);
      this.onAfter = bind(this.onAfter, this);
      this.onReady = bind(this.onReady, this);
      this.init = bind(this.init, this);
      return EqualHeightPlugin.__super__.constructor.apply(this, arguments);
    }

    EqualHeightPlugin.config = {
      selector: '.answer .text'
    };

    EqualHeightPlugin.prototype.init = function() {
      this.doEqualize(this.slideByIndex(0));
      this.on('ready', this.onReady);
      this.on('after', this.onAfter);
      return this.on('resize', this.onResize);
    };

    EqualHeightPlugin.prototype.onReady = function() {
      this.doEqualize(this.slideByIndex(0));
      return this.doEqualize(this.slideByIndex(1));
    };

    EqualHeightPlugin.prototype.onAfter = function() {
      var currentIndex;
      currentIndex = this.formslider.index();
      return this.doEqualize(this.slideByIndex(currentIndex + 1));
    };

    EqualHeightPlugin.prototype.onResize = function() {
      var currentIndex;
      currentIndex = this.formslider.index();
      this.doEqualize(this.slideByIndex(currentIndex));
      return this.doEqualize(this.slideByIndex(currentIndex + 1));
    };

    EqualHeightPlugin.prototype.doEqualize = function(slide) {
      var $element, $elements, element, i, len, maxHeight;
      $elements = $(this.config.selector, slide);
      if (!$elements.length) {
        return;
      }
      maxHeight = 0;
      for (i = 0, len = $elements.length; i < len; i++) {
        element = $elements[i];
        $element = $(element);
        $element.css('height', 'auto');
        maxHeight = Math.max(maxHeight, $element.outerHeight());
      }
      return $elements.css('height', maxHeight);
    };

    return EqualHeightPlugin;

  })(AbstractFormsliderPlugin);

  this.LazyLoadPlugin = (function(superClass) {
    extend(LazyLoadPlugin, superClass);

    function LazyLoadPlugin() {
      this._loadLazyCallback = bind(this._loadLazyCallback, this);
      this.doLazyLoad = bind(this.doLazyLoad, this);
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return LazyLoadPlugin.__super__.constructor.apply(this, arguments);
    }

    LazyLoadPlugin.config = {
      lazyClass: 'lazy-load',
      dataKey: 'src'
    };

    LazyLoadPlugin.prototype.init = function() {
      this.doLazyLoad(this.slideByIndex(0));
      this.doLazyLoad(this.slideByIndex(1));
      return this.on('after', this.onAfter);
    };

    LazyLoadPlugin.prototype.onAfter = function() {
      var currentIndex;
      currentIndex = this.formslider.index();
      return this.doLazyLoad(this.slideByIndex(currentIndex + 1));
    };

    LazyLoadPlugin.prototype.doLazyLoad = function(slide) {
      return $("img." + this.config.lazyClass, slide).each(this._loadLazyCallback);
    };

    LazyLoadPlugin.prototype._loadLazyCallback = function(index, el) {
      var $el;
      $el = $(el);
      return $el.attr('src', $el.data(this.config.dataKey)).removeData(this.config.dataKey).removeClass(this.config.lazyClass);
    };

    return LazyLoadPlugin;

  })(AbstractFormsliderPlugin);

  this.LoadingStatePlugin = (function(superClass) {
    extend(LoadingStatePlugin, superClass);

    function LoadingStatePlugin() {
      this.onReady = bind(this.onReady, this);
      this.init = bind(this.init, this);
      return LoadingStatePlugin.__super__.constructor.apply(this, arguments);
    }

    LoadingStatePlugin.config = {
      selector: '.progressbar-wrapper, .formslider-wrapper',
      loadingClass: 'loading',
      loadedClass: 'loaded'
    };

    LoadingStatePlugin.prototype.init = function() {
      return this.on('ready', this.onReady);
    };

    LoadingStatePlugin.prototype.onReady = function() {
      return $(this.config.selector).removeClass(this.config.loadingClass).addClass(this.config.loadedClass);
    };

    return LoadingStatePlugin;

  })(AbstractFormsliderPlugin);

  this.ScrollUpPlugin = (function(superClass) {
    extend(ScrollUpPlugin, superClass);

    function ScrollUpPlugin() {
      this.isOnScreen = bind(this.isOnScreen, this);
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return ScrollUpPlugin.__super__.constructor.apply(this, arguments);
    }

    ScrollUpPlugin.config = {
      selector: '.headline',
      duration: 200,
      tolerance: 80
    };

    ScrollUpPlugin.prototype.init = function() {
      this.on('after', this.onAfter);
      return this.window = $(window);
    };

    ScrollUpPlugin.prototype.onAfter = function(e, current, direction, prev) {
      var $element;
      $element = $(this.config.selector, current);
      if (this.isOnScreen($element)) {
        return;
      }
      return $("html, body").animate({
        scrollTop: Math.max(0, $element.offset().top - this.config.tolerance)
      }, this.config.duration);
    };

    ScrollUpPlugin.prototype.isOnScreen = function($element) {
      var bounds, viewport;
      viewport = {
        top: this.window.scrollTop(),
        left: this.window.scrollLeft()
      };
      viewport.right = viewport.left + this.window.width();
      viewport.bottom = viewport.top + this.window.height();
      bounds = $element.offset();
      bounds.right = bounds.left + $element.outerWidth();
      bounds.bottom = bounds.top + $element.outerHeight();
      return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top - this.config.tolerance || viewport.top > bounds.bottom - this.config.tolerance);
    };

    return ScrollUpPlugin;

  })(AbstractFormsliderPlugin);

  EventManager = (function() {
    function EventManager(logger) {
      this.logger = logger;
      this.off = bind(this.off, this);
      this.on = bind(this.on, this);
      this.trigger = bind(this.trigger, this);
      this.listener = {};
    }

    EventManager.prototype.trigger = function() {
      var data, error, event, i, len, listener, name, ref, tags;
      data = slice.call(arguments);
      name = data.shift();
      this.logger.info("triggerEvent(" + name + ")");
      tags = name.split('.');
      name = tags.shift();
      if (this.listener[name] == null) {
        return;
      }
      event = {
        type: name,
        tags: tags,
        canceled: false
      };
      ref = this.listener[name];
      for (i = 0, len = ref.length; i < len; i++) {
        listener = ref[i];
        if (listener.tags && !this.allTagsInArray(listener.tags, tags)) {
          continue;
        }
        try {
          listener.callback.apply(listener, [event].concat(slice.call(data)));
        } catch (error1) {
          error = error1;
          this.logger.error("triggerEvent(" + name + ")", error, data);
          event.canceled = true;
        }
      }
      return event;
    };

    EventManager.prototype.on = function(name, callback) {
      var base, context, tags;
      tags = name.split('.');
      name = tags.shift();
      context = tags.pop();
      if ((base = this.listener)[name] == null) {
        base[name] = [];
      }
      return this.listener[name].push({
        name: name,
        tags: tags,
        context: context,
        callback: callback
      });
    };

    EventManager.prototype.off = function(name) {
      var context, tags;
      tags = name.split('.');
      name = tags.shift();
      context = tags.pop();
      if (this.listener[name] == null) {
        return;
      }
      return this.listener[name] = this.listener[name].filter((function(_this) {
        return function(listener) {
          if (listener.context !== context) {
            return true;
          }
          if (_this.allTagsInArray(tags, listener.tags)) {
            return false;
          }
        };
      })(this));
    };

    EventManager.prototype.allTagsInArray = function(tags, inputArray) {
      var i, len, tag;
      for (i = 0, len = tags.length; i < len; i++) {
        tag = tags[i];
        if (!(indexOf.call(inputArray, tag) >= 0)) {
          return false;
        }
      }
      return true;
    };

    EventManager.prototype.isCanceled = function(event) {
      return event.canceled === true;
    };

    EventManager.prototype.cancel = function(event) {
      event.canceled = true;
      return false;
    };

    return EventManager;

  })();

  this.Locking = (function() {
    function Locking(logger, initial) {
      this.logger = logger;
      if (initial == null) {
        initial = true;
      }
      this.unlock = bind(this.unlock, this);
      this.lock = bind(this.lock, this);
      this.locked = initial;
    }

    Locking.prototype.lock = function() {
      return this.locked = true;
    };

    Locking.prototype.unlock = function() {
      return this.locked = false;
    };

    return Locking;

  })();

  Logger = (function() {
    function Logger(namespace) {
      this.namespace = namespace;
      this.error = bind(this.error, this);
      this.warn = bind(this.warn, this);
      this.debug = bind(this.debug, this);
      this.info = bind(this.info, this);
      if (!$.debug) {
        if (typeof console !== "undefined" && console !== null) {
          if (typeof console.warn === "function") {
            console.warn('jquery.debug not loaded');
          }
        }
      }
    }

    Logger.prototype.info = function() {
      var ref;
      arguments[0] = this.namespace + "::" + arguments[0];
      return (ref = $.debug).info.apply(ref, arguments);
    };

    Logger.prototype.debug = function() {
      var ref;
      arguments[0] = this.namespace + "::" + arguments[0];
      return (ref = $.debug).debug.apply(ref, arguments);
    };

    Logger.prototype.warn = function() {
      var ref;
      arguments[0] = this.namespace + "::" + arguments[0];
      if ($.debug.isEnabled()) {
        return (ref = $.debug).warn.apply(ref, arguments);
      }
      return typeof console !== "undefined" && console !== null ? typeof console.warn === "function" ? console.warn.apply(console, arguments) : void 0 : void 0;
    };

    Logger.prototype.error = function() {
      var ref;
      arguments[0] = this.namespace + "::" + arguments[0];
      if ($.debug.isEnabled()) {
        return (ref = $.debug).error.apply(ref, arguments);
      }
      return typeof console !== "undefined" && console !== null ? typeof console.error === "function" ? console.error.apply(console, arguments) : void 0 : void 0;
    };

    return Logger;

  })();

  this.ObjectExtender = (function() {
    function ObjectExtender() {}

    ObjectExtender.extend = function(obj) {
      Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        var prop, ref, ref1, results;
        if (!source) {
          return;
        }
        results = [];
        for (prop in source) {
          if (((ref = source[prop]) != null ? ref.constructor : void 0) === Object) {
            if (!obj[prop] || ((ref1 = obj[prop]) != null ? ref1.constructor : void 0) === Object) {
              obj[prop] = obj[prop] || {};
              results.push(ObjectExtender.extend(obj[prop], source[prop]));
            } else {
              results.push(obj[prop] = source[prop]);
            }
          } else {
            results.push(obj[prop] = source[prop]);
          }
        }
        return results;
      });
      return obj;
    };

    return ObjectExtender;

  })();

  this.PluginLoader = (function() {
    function PluginLoader(formslider, globalPluginConfig) {
      this.formslider = formslider;
      this.globalPluginConfig = globalPluginConfig;
      this.get = bind(this.get, this);
      this.isLoaded = bind(this.isLoaded, this);
      this.load = bind(this.load, this);
      this.loadAll = bind(this.loadAll, this);
      this.loaded = {};
    }

    PluginLoader.prototype.loadAll = function(plugins) {
      var i, len, plugin, results;
      results = [];
      for (i = 0, len = plugins.length; i < len; i++) {
        plugin = plugins[i];
        if (!window[plugin["class"]]) {
          this.formslider.logger.warn("loadAll(" + plugin["class"] + ") -> not found");
          continue;
        }
        results.push(this.load(plugin));
      }
      return results;
    };

    PluginLoader.prototype.load = function(plugin) {
      var PluginClass, config, error, pluginInstance;
      PluginClass = window[plugin["class"]];
      if (plugin.config == null) {
        config = this.globalPluginConfig;
      } else {
        config = ObjectExtender.extend({}, this.globalPluginConfig, plugin.config);
      }
      this.formslider.logger.info("loadPlugin(" + plugin["class"] + ")");
      try {
        pluginInstance = new PluginClass(this.formslider, config);
        this.loaded[plugin["class"]] = pluginInstance;
        return pluginInstance;
      } catch (error1) {
        error = error1;
        return this.formslider.logger.error("loadPlugin(" + plugin["class"] + ") -> error", error);
      }
    };

    PluginLoader.prototype.isLoaded = function(name) {
      return name in this.loaded;
    };

    PluginLoader.prototype.get = function(name) {
      if (!this.isLoaded(name)) {
        return;
      }
      return this.loaded[name];
    };

    return PluginLoader;

  })();

  this.FormSlider = (function() {
    FormSlider.config = null;

    function FormSlider(container, config) {
      this.container = container;
      this.goto = bind(this.goto, this);
      this.prev = bind(this.prev, this);
      this.next = bind(this.next, this);
      this.id = bind(this.id, this);
      this.index = bind(this.index, this);
      this.onResize = bind(this.onResize, this);
      this.onReady = bind(this.onReady, this);
      this.onAfter = bind(this.onAfter, this);
      this.onBefore = bind(this.onBefore, this);
      this.loadPlugins = bind(this.loadPlugins, this);
      this.setupDriver = bind(this.setupDriver, this);
      this.setupConfig = bind(this.setupConfig, this);
      this.setupConfig(config);
      this.firstInteraction = false;
      this.logger = new Logger('jquery.formslider');
      this.events = new EventManager(this.logger);
      this.locking = new Locking(this.logger, true);
      this.setupDriver();
      this.slides = this.driver.slides;
      this.loadPlugins();
      $(window).resize(this.onResize);
    }

    FormSlider.prototype.setupConfig = function(config) {
      if ((config != null ? config.plugins : void 0) != null) {
        FormSlider.config.plugins = [];
      }
      return this.config = ObjectExtender.extend({}, FormSlider.config, config);
    };

    FormSlider.prototype.setupDriver = function() {
      var DriverClass;
      DriverClass = window[this.config.driver["class"]];
      return this.driver = new DriverClass(this.container, this.config.driver, this.onBefore, this.onAfter, this.onReady);
    };

    FormSlider.prototype.loadPlugins = function() {
      this.plugins = new PluginLoader(this, this.config.pluginsGlobalConfig);
      return this.plugins.loadAll(this.config.plugins);
    };

    FormSlider.prototype.onBefore = function(currentIndex, direction, nextIndex) {
      var current, currentRole, event, eventData, next, nextRole, ref, ref1;
      if (this.locking.locked) {
        return false;
      }
      current = this.driver.get(currentIndex);
      currentRole = $(current).data('role');
      next = this.driver.get(nextIndex);
      nextRole = $(next).data('role');
      eventData = [current, direction, next];
      event = (ref = this.events).trigger.apply(ref, ["leaving." + currentRole + "." + direction].concat(slice.call(eventData)));
      if (event.canceled) {
        this.locking.unlock();
        return false;
      }
      (ref1 = this.events).trigger.apply(ref1, ["before." + nextRole + "." + direction].concat(slice.call(eventData)));
      this.lastId = this.id();
      this.lastCurrent = current;
      this.lastNext = next;
      this.lastCurrentRole = nextRole;
      this.lastDirection = direction;
      return true;
    };

    FormSlider.prototype.onAfter = function() {
      var eventData, ref, ref1;
      eventData = [this.lastNext, this.lastDirection, this.lastCurrent];
      (ref = this.events).trigger.apply(ref, ["after." + this.lastCurrentRole + "." + this.lastDirection].concat(slice.call(eventData)));
      if (!this.firstInteraction) {
        this.firstInteraction = true;
        (ref1 = this.events).trigger.apply(ref1, ['first-interaction'].concat(slice.call(eventData)));
      }
      return this.locking.unlock();
    };

    FormSlider.prototype.onReady = function() {
      this.events.trigger('ready');
      return this.locking.unlock();
    };

    FormSlider.prototype.onResize = function() {
      return this.events.trigger('resize');
    };

    FormSlider.prototype.index = function() {
      return this.driver.index();
    };

    FormSlider.prototype.id = function() {
      return $(this.driver.get()).data('id');
    };

    FormSlider.prototype.next = function() {
      if (this.locking.locked) {
        return;
      }
      this.events.trigger('before-driver-next');
      if (this.index() + 1 > this.driver.slides.length - 1) {
        return;
      }
      return this.driver.next();
    };

    FormSlider.prototype.prev = function() {
      if (this.locking.locked) {
        return;
      }
      if (this.index() > 0) {
        return this.driver.prev();
      }
    };

    FormSlider.prototype.goto = function(indexFromZero) {
      if (this.locking.locked) {
        return;
      }
      if (indexFromZero < 0 || indexFromZero > this.slides.length - 1) {
        return;
      }
      return this.driver.goto(indexFromZero);
    };

    return FormSlider;

  })();

  this.FormSlider.config = {
    version: 1,
    driver: {
      "class": 'DriverFlexslider',
      selector: '.formslider > .slide'
    },
    pluginsGlobalConfig: {
      answersSelector: '.answers',
      answerSelector: '.answer',
      answerSelectedClass: 'selected'
    },
    plugins: [
      {
        "class": 'AddSlideClassesPlugin'
      }, {
        "class": 'AnswerClickPlugin'
      }, {
        "class": 'InputFocusPlugin'
      }, {
        "class": 'BrowserHistoryPlugin'
      }, {
        "class": 'JqueryValidatePlugin'
      }, {
        "class": 'NormalizeInputAttributesPlugin'
      }, {
        "class": 'InputSyncPlugin'
      }, {
        "class": 'NextOnKeyPlugin'
      }, {
        "class": 'ArrowNavigationPlugin'
      }, {
        "class": 'TabIndexSetterPlugin'
      }, {
        "class": 'NextOnClickPlugin'
      }, {
        "class": 'LoadingStatePlugin'
      }, {
        "class": 'ProgressBarPlugin'
      }, {
        "class": 'TrackUserInteractionPlugin'
      }, {
        "class": 'LoaderSlidePlugin'
      }, {
        "class": 'ContactSlidePlugin'
      }, {
        "class": 'ConfirmationSlidePlugin'
      }, {
        "class": 'EqualHeightPlugin'
      }, {
        "class": 'ScrollUpPlugin'
      }, {
        "class": 'LazyLoadPlugin'
      }
    ]
  };

}).call(this);

//# sourceMappingURL=maps/formslider.js.map
