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
      this._internOnAfter = bind(this._internOnAfter, this);
      this._internOnBefore = bind(this._internOnBefore, this);
      this.index = bind(this.index, this);
      this.goto = bind(this.goto, this);
      this.config = ObjectExtender.extend({}, DriverFlexslider.config, this.config);
      this.config.after = this._internOnAfter;
      this.config.conditionalBefore = this._internOnBefore;
      this.config.start = this.onReady;
      this.slides = $(this.config.selector, this.container);
      this.container.flexslider(this.config);
      this.instance = this.container.data('flexslider');
    }

    DriverFlexslider.prototype.goto = function(indexFromZero) {
      return this.container.flexslider(indexFromZero, true, true);
    };

    DriverFlexslider.prototype.index = function() {
      return this.instance.currentSlide;
    };

    DriverFlexslider.prototype._internOnBefore = function(currentIndex, direction, nextIndex) {
      var result;
      result = this.onBefore(currentIndex, direction, nextIndex);
      if (result === false) {
        return result;
      }
      if (this.config.useCSS) {
        return this.start = +new Date();
      }
    };

    DriverFlexslider.prototype._internOnAfter = function(slider) {
      if (slider.lastSlide === slider.currentSlide) {
        return;
      }
      if (!this.config.useCSS) {
        return this.onAfter();
      }
      return setTimeout(this.onAfter, this.config.animationSpeed - ((+new Date()) - this.start));
    };

    return DriverFlexslider;

  })();

  this.AbstractFormsliderPlugin = (function() {
    function AbstractFormsliderPlugin(formslider, config) {
      this.formslider = formslider;
      this.slideById = bind(this.slideById, this);
      this.slideByRole = bind(this.slideByRole, this);
      this.slideByIndex = bind(this.slideByIndex, this);
      this.index = bind(this.index, this);
      this.track = bind(this.track, this);
      this.trigger = bind(this.trigger, this);
      this.isCanceled = bind(this.isCanceled, this);
      this.cancel = bind(this.cancel, this);
      this.off = bind(this.off, this);
      this.on = bind(this.on, this);
      this.configWithDataFrom = bind(this.configWithDataFrom, this);
      this.config = ObjectExtender.extend({}, this.constructor.config, config);
      this.container = this.formslider.container;
      this.slides = this.formslider.slides;
      this.events = this.formslider.events;
      this.logger = new Logger("jquery.formslider::" + this.constructor.name);
      this.init();
    }

    AbstractFormsliderPlugin.prototype.init = function() {
      return null;
    };

    AbstractFormsliderPlugin.prototype.configWithDataFrom = function(element) {
      var $element, config, data, key, value;
      config = ObjectExtender.extend({}, this.config);
      $element = $(element);
      for (key in config) {
        value = config[key];
        data = $element.data(key);
        if (data !== void 0) {
          config[key] = data;
        }
      }
      return config;
    };

    AbstractFormsliderPlugin.prototype.on = function(eventName, callback) {
      return this.events.on(eventName + "." + this.constructor.name, callback);
    };

    AbstractFormsliderPlugin.prototype.off = function(eventName) {
      return this.events.off(eventName + "." + this.constructor.name);
    };

    AbstractFormsliderPlugin.prototype.cancel = function(event) {
      return this.events.cancel(event);
    };

    AbstractFormsliderPlugin.prototype.isCanceled = function(event) {
      return this.events.isCanceled(event);
    };

    AbstractFormsliderPlugin.prototype.trigger = function() {
      var ref;
      return (ref = this.events).trigger.apply(ref, arguments);
    };

    AbstractFormsliderPlugin.prototype.track = function(source, value, category) {
      if (category == null) {
        category = null;
      }
      return this.events.trigger('track', source, value, category);
    };

    AbstractFormsliderPlugin.prototype.index = function() {
      return this.formslider.index();
    };

    AbstractFormsliderPlugin.prototype.slideByIndex = function(indexFromZero) {
      if (indexFromZero == null) {
        indexFromZero = null;
      }
      if (indexFromZero === null) {
        indexFromZero = this.index();
      }
      return this.slides.get(indexFromZero);
    };

    AbstractFormsliderPlugin.prototype.slideByRole = function(role) {
      return $(".slide-role-" + role, this.container);
    };

    AbstractFormsliderPlugin.prototype.slideById = function(id) {
      return $(".slide-id-" + id, this.container);
    };

    return AbstractFormsliderPlugin;

  })();

  this.AnswerClick = (function(superClass) {
    extend(AnswerClick, superClass);

    function AnswerClick() {
      this.onAnswerClicked = bind(this.onAnswerClicked, this);
      this.init = bind(this.init, this);
      return AnswerClick.__super__.constructor.apply(this, arguments);
    }

    AnswerClick.prototype.init = function() {
      return this.container.on('mouseup', this.config.answerSelector, this.onAnswerClicked);
    };

    AnswerClick.prototype.onAnswerClicked = function(event) {
      var $allAnswersinRow, $answer, $answerInput, $answerRow, $questionInput, $slide;
      event.preventDefault();
      $answer = $(event.currentTarget);
      $answerRow = $answer.closest(this.config.answersSelector);
      $allAnswersinRow = $(this.config.answerSelector, $answerRow);
      $allAnswersinRow.removeClass(this.config.answerSelectedClass);
      $answer.addClass(this.config.answerSelectedClass);
      $slide = this.slideByIndex();
      $questionInput = $(this.config.questionSelector, $slide);
      $answerInput = $('input', $answer);
      return this.trigger('question-answered', $questionInput.prop('id'), $answerInput.prop('id'), $answerInput.val(), this.index());
    };

    return AnswerClick;

  })(AbstractFormsliderPlugin);

  this.AnswerMemory = (function(superClass) {
    extend(AnswerMemory, superClass);

    function AnswerMemory() {
      this.memorize = bind(this.memorize, this);
      this.init = bind(this.init, this);
      return AnswerMemory.__super__.constructor.apply(this, arguments);
    }

    AnswerMemory.prototype.init = function() {
      this.on('question-answered', this.memorize);
      return this.memoryByQuestionId = {};
    };

    AnswerMemory.prototype.memorize = function(event, questionId, answerId, value) {
      this.memoryByQuestionId[questionId] = {
        id: answerId,
        value: value
      };
      return this.trigger('answer-memory-updated', this.memoryByQuestionId);
    };

    return AnswerMemory;

  })(AbstractFormsliderPlugin);

  this.FormSubmission = (function(superClass) {
    extend(FormSubmission, superClass);

    function FormSubmission() {
      this.onFail = bind(this.onFail, this);
      this.onDone = bind(this.onDone, this);
      this.onSubmit = bind(this.onSubmit, this);
      this.init = bind(this.init, this);
      return FormSubmission.__super__.constructor.apply(this, arguments);
    }

    FormSubmission.config = {
      submitOnEvents: ['validation.valid.contact'],
      successEventName: 'form-submitted',
      errorEventName: 'form-submission-error',
      loadHiddenFrameOnSuccess: null,
      formSelector: 'form',
      submitter: {
        "class": 'FormSubmitterCollect',
        endpoint: '#',
        method: 'POST'
      }
    };

    FormSubmission.prototype.init = function() {
      var SubmitterClass, eventName, j, len, ref;
      this.form = $(this.config.formSelector);
      ref = this.config.submitOnEvents;
      for (j = 0, len = ref.length; j < len; j++) {
        eventName = ref[j];
        this.on(eventName, this.onSubmit);
      }
      SubmitterClass = window[this.config.submitter["class"]];
      return this.submitter = new SubmitterClass(this, this.config.submitter, this.form);
    };

    FormSubmission.prototype.onSubmit = function(event, currentSlide) {
      if (this.isCanceled(event)) {
        return;
      }
      return this.submitter.submit(event, currentSlide);
    };

    FormSubmission.prototype.onDone = function() {
      this.trigger(this.config.successEventName);
      this.loadHiddenFrameOnSuccess();
      return this.logger.debug('onDone');
    };

    FormSubmission.prototype.onFail = function() {
      this.logger.error('onFail', this.config.errorEventName);
      return this.trigger(this.config.errorEventName);
    };

    FormSubmission.prototype.loadHiddenFrameOnSuccess = function(url) {
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

    return FormSubmission;

  })(AbstractFormsliderPlugin);

  this.FormSubmitterAbstract = (function() {
    function FormSubmitterAbstract(plugin1, config1, form) {
      this.plugin = plugin1;
      this.config = config1;
      this.form = form;
      this.supressNaturalFormSubmit = bind(this.supressNaturalFormSubmit, this);
    }

    FormSubmitterAbstract.prototype.supressNaturalFormSubmit = function() {
      return this.form.submit(function(e) {
        e.preventDefault();
        return false;
      });
    };

    return FormSubmitterAbstract;

  })();

  this.FormSubmitterAjax = (function(superClass) {
    extend(FormSubmitterAjax, superClass);

    function FormSubmitterAjax(plugin1, config1, form) {
      this.plugin = plugin1;
      this.config = config1;
      this.form = form;
      this.submit = bind(this.submit, this);
      FormSubmitterAjax.__super__.constructor.call(this, this.plugin, this.config, this.form);
      this.supressNaturalFormSubmit();
    }

    FormSubmitterAjax.prototype.submit = function(event, slide) {
      this.form.ajaxSubmit(this.config);
      return this.form.data('jqxhr').done(this.plugin.onDone).fail(this.plugin.onFail);
    };

    return FormSubmitterAjax;

  })(FormSubmitterAbstract);

  this.FormSubmitterCollect = (function(superClass) {
    extend(FormSubmitterCollect, superClass);

    function FormSubmitterCollect(plugin1, config1, form) {
      this.plugin = plugin1;
      this.config = config1;
      this.form = form;
      this.collectInputs = bind(this.collectInputs, this);
      this.submit = bind(this.submit, this);
      FormSubmitterCollect.__super__.constructor.call(this, this.plugin, this.config, this.form);
      this.supressNaturalFormSubmit();
    }

    FormSubmitterCollect.prototype.submit = function(event, slide) {
      return $.ajax({
        cache: false,
        url: this.config.endpoint,
        method: this.config.method,
        data: this.collectInputs()
      }).done(this.plugin.onDone).fail(this.plugin.onFail);
    };

    FormSubmitterCollect.prototype.collectInputs = function() {
      var $input, $inputs, $other, $others, input, j, k, len, len1, other, result;
      result = {};
      $inputs = $('input', this.plugin.container);
      for (j = 0, len = $inputs.length; j < len; j++) {
        input = $inputs[j];
        $input = $(input);
        if ($input.is(':checkbox') || $input.is(':radio')) {
          if ($input.is(':checked')) {
            result[$input.attr('name')] = $input.val();
          }
        } else {
          result[$input.attr('name')] = $input.val();
        }
      }
      $others = $('select, textarea', this.plugin.container);
      for (k = 0, len1 = $others.length; k < len1; k++) {
        other = $others[k];
        $other = $(other);
        result[$other.attr('name')] = $other.val();
      }
      return result;
    };

    return FormSubmitterCollect;

  })(FormSubmitterAbstract);

  this.FormSubmitterSubmit = (function(superClass) {
    extend(FormSubmitterSubmit, superClass);

    function FormSubmitterSubmit() {
      return FormSubmitterSubmit.__super__.constructor.apply(this, arguments);
    }

    FormSubmitterSubmit.prototype.submit = function(event, slide) {};

    return FormSubmitterSubmit;

  })(FormSubmitterAbstract);

  this.InputFocus = (function(superClass) {
    extend(InputFocus, superClass);

    function InputFocus() {
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return InputFocus.__super__.constructor.apply(this, arguments);
    }

    InputFocus.config = {
      selector: 'input:visible',
      disableOnMobile: true
    };

    InputFocus.prototype.init = function() {
      return this.on('after', this.onAfter);
    };

    InputFocus.prototype.onAfter = function(e, currentSlide, direction, prevSlide) {
      var $input;
      if (this.config.disableOnMobile && FeatureDetector.isMobileDevice()) {
        return;
      }
      $input = $(this.config.selector, currentSlide);
      if (!$input.length) {
        if (indexOf.call(document, "activeElement") >= 0) {
          document.activeElement.blur();
        }
        return;
      }
      return $input.first().focus();
    };

    return InputFocus;

  })(AbstractFormsliderPlugin);

  this.InputNormalizer = (function(superClass) {
    extend(InputNormalizer, superClass);

    function InputNormalizer() {
      this.prepareInputs = bind(this.prepareInputs, this);
      this.init = bind(this.init, this);
      return InputNormalizer.__super__.constructor.apply(this, arguments);
    }

    InputNormalizer.config = {
      selector: 'input:visible'
    };

    InputNormalizer.prototype.init = function() {
      return this.prepareInputs();
    };

    InputNormalizer.prototype.prepareInputs = function() {
      $(this.config.selector, this.container).each(function(index, input) {
        var $input, attribute, autocompleete, j, len, ref;
        $input = $(input);
        if ($input.attr('required')) {
          $input.data('required', 'required');
          $input.data('aria-required', 'true');
        }
        autocompleete = $input.attr('autocompletetype');
        if (!autocompleete) {
          autocompleete = $input.attr('autocomplete');
        }
        if (autocompleete) {
          $input.attr('autocompletetype', autocompleete);
          $input.attr('autocomplete', autocompleete);
        }
        ref = ['inputmode', 'autocompletetype'];
        for (j = 0, len = ref.length; j < len; j++) {
          attribute = ref[j];
          if ($input.attr(attribute)) {
            $input.attr("x-" + attribute, $input.attr(attribute));
          }
        }
      });
    };

    return InputNormalizer;

  })(AbstractFormsliderPlugin);

  this.InputSync = (function(superClass) {
    extend(InputSync, superClass);

    function InputSync() {
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return InputSync.__super__.constructor.apply(this, arguments);
    }

    InputSync.config = {
      selector: 'input',
      attribute: 'name'
    };

    InputSync.prototype.init = function() {
      this.storage = {};
      return this.on('after', this.onAfter);
    };

    InputSync.prototype.onAfter = function(event, currentSlide, direction, prevSlide) {
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

    return InputSync;

  })(AbstractFormsliderPlugin);

  this.JqueryValidate = (function(superClass) {
    extend(JqueryValidate, superClass);

    function JqueryValidate() {
      this.prepareInputs = bind(this.prepareInputs, this);
      this.onValidate = bind(this.onValidate, this);
      this.init = bind(this.init, this);
      return JqueryValidate.__super__.constructor.apply(this, arguments);
    }

    JqueryValidate.config = {
      selector: 'input:visible:not([readonly])',
      validateOnEvents: ['leaving.next'],
      forceMaxLengthJs: "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);",
      messages: {
        required: 'Required',
        maxlength: 'To long',
        minlength: 'To short',
        email: 'Enter valid E-Mail'
      }
    };

    JqueryValidate.prototype.init = function() {
      var eventName, j, len, ref;
      ref = this.config.validateOnEvents;
      for (j = 0, len = ref.length; j < len; j++) {
        eventName = ref[j];
        this.on(eventName, this.onValidate);
      }
      this.prepareInputs();
      return this.trigger("validation.prepared");
    };

    JqueryValidate.prototype.onValidate = function(event, currentSlide, direction, nextSlide) {
      var $inputs, currentRole;
      $inputs = $(this.config.selector, currentSlide);
      if (!$inputs.length) {
        return;
      }
      currentRole = $(currentSlide).data('role');
      if (!$inputs.valid()) {
        $inputs.filter('.error').first().focus();
        this.trigger("validation.invalid." + currentRole, currentSlide);
        event.canceled = true;
        return false;
      }
      return this.trigger("validation.valid." + currentRole, currentSlide);
    };

    JqueryValidate.prototype.prepareInputs = function() {
      return $(this.config.selector, this.container).each((function(_this) {
        return function(index, input) {
          var $input, attribute, j, len, ref;
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
          for (j = 0, len = ref.length; j < len; j++) {
            attribute = ref[j];
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

    return JqueryValidate;

  })(AbstractFormsliderPlugin);

  this.AddSlideClasses = (function(superClass) {
    extend(AddSlideClasses, superClass);

    function AddSlideClasses() {
      this._addAnswerCountClasses = bind(this._addAnswerCountClasses, this);
      this._doWithSlide = bind(this._doWithSlide, this);
      this.init = bind(this.init, this);
      return AddSlideClasses.__super__.constructor.apply(this, arguments);
    }

    AddSlideClasses.prototype.init = function() {
      return this.slides.each(this._doWithSlide);
    };

    AddSlideClasses.prototype._doWithSlide = function(index, slide) {
      var $slide;
      $slide = $(slide);
      this._addAnswerCountClasses(index, $slide);
      this._addSlideNumberClass(index, $slide);
      this._addRoleClass($slide);
      return this._addSlideIdClass($slide);
    };

    AddSlideClasses.prototype._addAnswerCountClasses = function(index, $slide) {
      var answerCount;
      answerCount = $(this.config.answerSelector, $slide).length;
      return $slide.addClass("answer-count-" + answerCount).data('answer-count', answerCount);
    };

    AddSlideClasses.prototype._addRoleClass = function($slide) {
      var role;
      role = $slide.data('role');
      return $slide.addClass("slide-role-" + role);
    };

    AddSlideClasses.prototype._addSlideNumberClass = function(index, $slide) {
      return $slide.addClass("slide-number-" + index).data('slide-number', index);
    };

    AddSlideClasses.prototype._addSlideIdClass = function($slide) {
      var id;
      id = $slide.data('id');
      if (id === void 0) {
        id = $slide.data('role');
      }
      return $slide.addClass("slide-id-" + id);
    };

    return AddSlideClasses;

  })(AbstractFormsliderPlugin);

  this.DoOnEvent = (function(superClass) {
    extend(DoOnEvent, superClass);

    function DoOnEvent() {
      this.init = bind(this.init, this);
      return DoOnEvent.__super__.constructor.apply(this, arguments);
    }

    DoOnEvent.prototype.init = function() {
      return $.each(this.config, (function(_this) {
        return function(eventName, callback) {
          if (typeof callback === 'function') {
            return _this.on(eventName, function() {
              return callback(_this);
            });
          }
        };
      })(this));
    };

    return DoOnEvent;

  })(AbstractFormsliderPlugin);

  this.DoOneTimeOnEvent = (function(superClass) {
    extend(DoOneTimeOnEvent, superClass);

    function DoOneTimeOnEvent() {
      this.init = bind(this.init, this);
      return DoOneTimeOnEvent.__super__.constructor.apply(this, arguments);
    }

    DoOneTimeOnEvent.prototype.init = function() {
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

    return DoOneTimeOnEvent;

  })(AbstractFormsliderPlugin);

  this.AbstractFormsliderLoader = (function(superClass) {
    extend(AbstractFormsliderLoader, superClass);

    function AbstractFormsliderLoader() {
      this.stop = bind(this.stop, this);
      this.start = bind(this.start, this);
      this.onLeaving = bind(this.onLeaving, this);
      this.onLoaderStart = bind(this.onLoaderStart, this);
      this.init = bind(this.init, this);
      return AbstractFormsliderLoader.__super__.constructor.apply(this, arguments);
    }

    AbstractFormsliderLoader.config = {
      duration: 1000
    };

    AbstractFormsliderLoader.prototype.init = function() {
      this.on('after.loader', this.onLoaderStart);
      this.on('leaving.loader', this.onLeaving);
      return this.locking = new Locking(false);
    };

    AbstractFormsliderLoader.prototype.onLoaderStart = function(event, currentSlide, direction, nextSlide) {
      if (!this.locking.locked) {
        return this.start();
      }
    };

    AbstractFormsliderLoader.prototype.onLeaving = function(event, current, direction, next) {
      if (this.locking.locked) {
        return this.cancel(event);
      }
    };

    AbstractFormsliderLoader.prototype.start = function() {
      if (this.locking.locked) {
        return false;
      }
      this.locking.lock();
      this.logger.debug("start(" + this.config.duration + ")");
      return setTimeout(this.doAnimation, this.config.duration);
    };

    AbstractFormsliderLoader.prototype.doAnimation = function() {};

    AbstractFormsliderLoader.prototype.stop = function() {
      this.logger.debug('stop()');
      this.locking.unlock();
      return this.formslider.next();
    };

    return AbstractFormsliderLoader;

  })(AbstractFormsliderPlugin);

  this.SimpleLoader = (function(superClass) {
    extend(SimpleLoader, superClass);

    function SimpleLoader() {
      this.doAnimation = bind(this.doAnimation, this);
      return SimpleLoader.__super__.constructor.apply(this, arguments);
    }

    SimpleLoader.prototype.doAnimation = function() {
      return this.stop();
    };

    return SimpleLoader;

  })(AbstractFormsliderLoader);

  this.BrowserHistoryController = (function(superClass) {
    extend(BrowserHistoryController, superClass);

    function BrowserHistoryController() {
      this.handleHistoryChange = bind(this.handleHistoryChange, this);
      this.pushCurrentHistoryState = bind(this.pushCurrentHistoryState, this);
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return BrowserHistoryController.__super__.constructor.apply(this, arguments);
    }

    BrowserHistoryController.config = {
      updateHash: true,
      resetStatesOnLoad: true
    };

    BrowserHistoryController.prototype.init = function() {
      this.on('after', this.onAfter);
      this.dontUpdateHistoryNow = false;
      this.time = new Date().getTime();
      this.pushCurrentHistoryState();
      return $(window).bind('popstate', this.handleHistoryChange);
    };

    BrowserHistoryController.prototype.onAfter = function() {
      if (this.dontUpdateHistoryNow) {
        this.dontUpdateHistoryNow = false;
        return;
      }
      return this.pushCurrentHistoryState();
    };

    BrowserHistoryController.prototype.pushCurrentHistoryState = function() {
      var hash, index;
      index = this.index();
      hash = null;
      if (this.config.updateHash) {
        hash = "#" + index;
      }
      return history.pushState({
        index: index,
        time: this.time
      }, "index " + index, hash);
    };

    BrowserHistoryController.prototype.handleHistoryChange = function(event) {
      var ref, state;
      if (this.formslider.locking.locked) {
        return;
      }
      if (!((ref = event.originalEvent) != null ? ref.state : void 0)) {
        return;
      }
      state = event.originalEvent.state;
      if (this.config.resetStatesOnLoad) {
        if (state.time !== this.time) {
          return;
        }
      }
      this.logger.debug('handleHistoryChange', state.index);
      this.dontUpdateHistoryNow = true;
      return this.formslider.goto(state.index);
    };

    return BrowserHistoryController;

  })(AbstractFormsliderPlugin);

  this.NativeOrderController = (function(superClass) {
    extend(NativeOrderController, superClass);

    function NativeOrderController() {
      this.prev = bind(this.prev, this);
      this.next = bind(this.next, this);
      this.init = bind(this.init, this);
      return NativeOrderController.__super__.constructor.apply(this, arguments);
    }

    NativeOrderController.prototype.init = function() {
      this.on('controller.prev', this.prev);
      return this.on('controller.next', this.next);
    };

    NativeOrderController.prototype.next = function(event) {
      if (this.isCanceled(event)) {
        return;
      }
      this.cancel(event);
      return this.formslider.goto(this.index() + 1);
    };

    NativeOrderController.prototype.prev = function(event) {
      if (this.isCanceled(event)) {
        return;
      }
      this.cancel(event);
      return this.formslider.goto(this.index() - 1);
    };

    return NativeOrderController;

  })(AbstractFormsliderPlugin);

  this.OrderByIdController = (function(superClass) {
    extend(OrderByIdController, superClass);

    function OrderByIdController() {
      this.prev = bind(this.prev, this);
      this.next = bind(this.next, this);
      this.init = bind(this.init, this);
      return OrderByIdController.__super__.constructor.apply(this, arguments);
    }

    OrderByIdController.prototype.init = function() {
      this.on('controller.prev', this.prev);
      return this.on('controller.next', this.next);
    };

    OrderByIdController.prototype.onCalculateLongestPath = function(event) {
      return event.longest_path = 42;
    };

    OrderByIdController.prototype.next = function(event) {
      var currentSlide, nextId, nextIdFromAnswer, nextSlide, selectedAnswer;
      if (this.isCanceled(event)) {
        return;
      }
      currentSlide = this.slideByIndex();
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
        nextSlide.data('prev-id', $(currentSlide).data('id'));
        return this.formslider.goto(nextSlide.index());
      }
    };

    OrderByIdController.prototype.prev = function(event) {
      var currentSlide, nextSlide, prevId;
      if (this.isCanceled(event)) {
        return;
      }
      currentSlide = this.slideByIndex();
      prevId = $(currentSlide).data('prev-id');
      if (prevId !== void 0) {
        nextSlide = this.slideById(prevId);
        this.cancel(event);
        $(currentSlide).data('prev-id', void 0);
        return this.formslider.goto(nextSlide.index());
      }
    };

    return OrderByIdController;

  })(AbstractFormsliderPlugin);

  this.DirectionPolicyByRole = (function(superClass) {
    extend(DirectionPolicyByRole, superClass);

    function DirectionPolicyByRole() {
      this.checkPermissions = bind(this.checkPermissions, this);
      this.init = bind(this.init, this);
      return DirectionPolicyByRole.__super__.constructor.apply(this, arguments);
    }

    DirectionPolicyByRole.config = {};

    DirectionPolicyByRole.prototype.init = function() {
      return this.on('leaving', this.checkPermissions);
    };

    DirectionPolicyByRole.prototype.checkPermissions = function(event, current, direction, next) {
      var currentRole, nextRole, permissions;
      currentRole = $(current).data('role');
      nextRole = $(next).data('role');
      if (!currentRole || !nextRole) {
        return;
      }
      if (currentRole in this.config) {
        permissions = this.config[currentRole];
        if ('goingTo' in permissions) {
          if (indexOf.call(permissions.goingTo, 'none') >= 0) {
            return this.cancel(event);
          }
          if (indexOf.call(permissions.goingTo, nextRole) < 0) {
            return this.cancel(event);
          }
        }
      }
      if (nextRole in this.config) {
        permissions = this.config[nextRole];
        if ('commingFrom' in permissions) {
          if (indexOf.call(permissions.commingFrom, 'none') >= 0) {
            return this.cancel(event);
          }
          if (indexOf.call(permissions.commingFrom, currentRole) < 0) {
            return this.cancel(event);
          }
        }
      }
    };

    return DirectionPolicyByRole;

  })(AbstractFormsliderPlugin);

  this.NavigateOnClick = (function(superClass) {
    extend(NavigateOnClick, superClass);

    function NavigateOnClick() {
      this.onClick = bind(this.onClick, this);
      this.init = bind(this.init, this);
      return NavigateOnClick.__super__.constructor.apply(this, arguments);
    }

    NavigateOnClick.config = {
      actions: [
        {
          selector: '.answer',
          action: 'next',
          wait: 200
        }, {
          selector: '.next-button',
          action: 'next',
          wait: 10
        }, {
          selector: '.prev-button',
          action: 'prev',
          wait: 10
        }
      ]
    };

    NavigateOnClick.prototype.init = function() {
      var $target, action, j, len, ref;
      ref = this.config.actions;
      for (j = 0, len = ref.length; j < len; j++) {
        action = ref[j];
        $target = $(action.selector, this.container);
        $target.on('mouseup', action, this.onClick);
      }
    };

    NavigateOnClick.prototype.onClick = function(event, action) {
      event.preventDefault();
      if (!this.timeout) {
        return this.timeout = setTimeout((function(_this) {
          return function() {
            _this.formslider[event.data.action].call();
            return _this.timeout = null;
          };
        })(this), event.data.wait);
      }
    };

    return NavigateOnClick;

  })(AbstractFormsliderPlugin);

  this.NavigateOnKey = (function(superClass) {
    extend(NavigateOnKey, superClass);

    function NavigateOnKey() {
      this.runTimeout = bind(this.runTimeout, this);
      this.onKey = bind(this.onKey, this);
      this.init = bind(this.init, this);
      return NavigateOnKey.__super__.constructor.apply(this, arguments);
    }

    NavigateOnKey.config = {
      actions: [
        {
          context: document,
          action: 'next',
          code: 39,
          wait: 100
        }, {
          selector: 'input',
          action: 'next',
          code: 13,
          wait: 100
        }, {
          context: document,
          action: 'prev',
          code: 37,
          wait: 100
        }
      ]
    };

    NavigateOnKey.prototype.init = function() {
      return $.each(this.config.actions, (function(_this) {
        return function(index, action) {
          var $target;
          if (action != null ? action.selector : void 0) {
            $target = $(action.selector, _this.container);
          } else {
            $target = $(action.context);
          }
          return $target.on('keydown', action, _this.onKey);
        };
      })(this));
    };

    NavigateOnKey.prototype.onKey = function(event) {
      var keyCode;
      keyCode = event.keyCode || event.which;
      if (keyCode !== event.data.code) {
        return;
      }
      return this.runTimeout(this.formslider[event.data.action], event.data.wait);
    };

    NavigateOnKey.prototype.runTimeout = function(callback, wait) {
      if (!this.timeout) {
        return this.timeout = setTimeout((function(_this) {
          return function() {
            callback();
            return _this.timeout = null;
          };
        })(this), wait);
      }
    };

    return NavigateOnKey;

  })(AbstractFormsliderPlugin);

  this.TabIndexSetter = (function(superClass) {
    extend(TabIndexSetter, superClass);

    function TabIndexSetter() {
      this.disableTabs = bind(this.disableTabs, this);
      this.enableTabs = bind(this.enableTabs, this);
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return TabIndexSetter.__super__.constructor.apply(this, arguments);
    }

    TabIndexSetter.config = {
      selector: 'input, a, select, textarea, button, area, object'
    };

    TabIndexSetter.prototype.init = function() {
      this.disableTabs();
      this.enableTabs(this.slideByIndex(0));
      return this.on('after', this.onAfter);
    };

    TabIndexSetter.prototype.onAfter = function(event, currentSlide, direction, prevSlide) {
      this.disableTabs();
      return this.enableTabs(currentSlide);
    };

    TabIndexSetter.prototype.enableTabs = function(slide) {
      return $(this.config.selector, slide).each(function(index, el) {
        return $(el).attr('tabindex', index + 1);
      });
    };

    TabIndexSetter.prototype.disableTabs = function() {
      return $(this.config.selector, this.container).attr('tabindex', '-1');
    };

    return TabIndexSetter;

  })(AbstractFormsliderPlugin);

  this.AbstractFormsliderProgressBar = (function(superClass) {
    extend(AbstractFormsliderProgressBar, superClass);

    function AbstractFormsliderProgressBar() {
      this.show = bind(this.show, this);
      this.hide = bind(this.hide, this);
      this.shouldBeVisible = bind(this.shouldBeVisible, this);
      this._set = bind(this._set, this);
      this.doUpdate = bind(this.doUpdate, this);
      this.slidesThatCount = bind(this.slidesThatCount, this);
      this.setCountMax = bind(this.setCountMax, this);
      this.init = bind(this.init, this);
      return AbstractFormsliderProgressBar.__super__.constructor.apply(this, arguments);
    }

    AbstractFormsliderProgressBar.config = {
      selectorWrapper: '.progressbar-wrapper',
      selectorText: '.progress-text',
      selectorProgress: '.progress',
      animationSpeed: 300,
      initialProgress: null,
      animateHeight: true,
      dontCountOnRoles: ['loader', 'contact', 'confirmation'],
      hideOnRoles: ['zipcode', 'loader', 'contact', 'confirmation'],
      dataKeyForMaxLength: 'progressbar-longest-path'
    };

    AbstractFormsliderProgressBar.prototype.init = function() {
      this.on('after.next', (function(_this) {
        return function() {
          return _this.currentIndex++;
        };
      })(this));
      this.on('after.prev', (function(_this) {
        return function() {
          return _this.currentIndex--;
        };
      })(this));
      this.on('after', this.doUpdate);
      this.visible = true;
      this.setCountMax();
      this.wrapper = $(this.config.selectorWrapper);
      this.config = this.configWithDataFrom(this.wrapper);
      this.progressText = $(this.config.selectorText, this.wrapper);
      this.bar = $(this.config.selectorProgress, this.wrapper);
      this.bar.css('transition-duration', (this.config.animationSpeed / 1000) + 's');
      this.currentIndex = 0;
      return this._set(this.currentIndex);
    };

    AbstractFormsliderProgressBar.prototype.set = function(indexFromZero, percent) {};

    AbstractFormsliderProgressBar.prototype.setCountMax = function(slide) {
      var possibleCountMax;
      if (slide == null) {
        slide = null;
      }
      if (!this.config.dataKeyForMaxLength) {
        this.countMax = this.slidesThatCount();
        return;
      }
      if (slide === null) {
        slide = this.slideByIndex();
      }
      possibleCountMax = $(slide).data(this.config.dataKeyForMaxLength);
      if (!possibleCountMax) {
        return;
      }
      possibleCountMax = parseInt(possibleCountMax, 10);
      return this.countMax = possibleCountMax;
    };

    AbstractFormsliderProgressBar.prototype.slidesThatCount = function() {
      var j, len, ref, role, substract;
      substract = 0;
      ref = this.config.dontCountOnRoles;
      for (j = 0, len = ref.length; j < len; j++) {
        role = ref[j];
        substract = substract + this.slideByRole(role).length;
      }
      return this.slides.length - substract;
    };

    AbstractFormsliderProgressBar.prototype.doUpdate = function(_event, current, direction, prev) {
      this.setCountMax(current);
      if (!this.shouldBeVisible(current)) {
        this._set(this.currentIndex);
        return this.hide();
      }
      this.show();
      return this._set(this.currentIndex);
    };

    AbstractFormsliderProgressBar.prototype._set = function(indexFromZero) {
      var percent;
      if (indexFromZero > this.countMax) {
        indexFromZero = this.countMax;
      }
      if (indexFromZero < 0) {
        indexFromZero = 0;
      }
      percent = ((indexFromZero + 1) / this.countMax) * 100;
      if (this.config.initialProgress && indexFromZero === 0) {
        percent = this.config.initialProgress;
      }
      this.bar.css('width', percent + '%');
      return this.set(indexFromZero, percent);
    };

    AbstractFormsliderProgressBar.prototype.shouldBeVisible = function(slide) {
      var ref;
      return !(ref = $(slide).data('role'), indexOf.call(this.config.hideOnRoles, ref) >= 0);
    };

    AbstractFormsliderProgressBar.prototype.hide = function() {
      if (!this.visible) {
        return;
      }
      this.visible = false;
      return this.wrapper.stop().animate({
        opacity: 0,
        height: 0
      }, this.config.animationSpeed);
    };

    AbstractFormsliderProgressBar.prototype.show = function() {
      var animationProperties, autoHeight, currentHeight;
      if (this.visible) {
        return;
      }
      this.visible = true;
      animationProperties = {
        opacity: 1
      };
      if (this.config.animateHeight) {
        currentHeight = this.wrapper.height();
        autoHeight = this.wrapper.css('height', 'auto').height();
        this.wrapper.css('height', currentHeight);
        animationProperties.height = autoHeight + "px";
      }
      return this.wrapper.stop().animate(animationProperties, this.config.animationSpeed);
    };

    return AbstractFormsliderProgressBar;

  })(AbstractFormsliderPlugin);

  this.ProgressBarPercent = (function(superClass) {
    extend(ProgressBarPercent, superClass);

    function ProgressBarPercent() {
      this._setPercentStepCallback = bind(this._setPercentStepCallback, this);
      this.set = bind(this.set, this);
      return ProgressBarPercent.__super__.constructor.apply(this, arguments);
    }

    ProgressBarPercent.prototype.set = function(indexFromZero, percent) {
      var startFrom;
      startFrom = parseInt(this.progressText.text()) || 1;
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

    ProgressBarPercent.prototype._setPercentStepCallback = function(percent) {
      return this.progressText.text(Math.ceil(percent) + '%');
    };

    return ProgressBarPercent;

  })(AbstractFormsliderProgressBar);

  this.ProgressBarSteps = (function(superClass) {
    extend(ProgressBarSteps, superClass);

    function ProgressBarSteps() {
      this.set = bind(this.set, this);
      return ProgressBarSteps.__super__.constructor.apply(this, arguments);
    }

    ProgressBarSteps.prototype.set = function(indexFromZero, percent) {
      return this.progressText.text((indexFromZero + 1) + "/" + this.countMax);
    };

    return ProgressBarSteps;

  })(AbstractFormsliderProgressBar);

  this.TrackSessionInformation = (function(superClass) {
    extend(TrackSessionInformation, superClass);

    function TrackSessionInformation() {
      this.inform = bind(this.inform, this);
      this.onFirstInteraction = bind(this.onFirstInteraction, this);
      this.init = bind(this.init, this);
      return TrackSessionInformation.__super__.constructor.apply(this, arguments);
    }

    TrackSessionInformation.config = {
      onReady: null,
      onReadyInternal: function(plugin) {
        plugin.inform('url', location.href);
        plugin.inform('useragent', navigator.userAgent);
        plugin.inform('referer', document.referrer);
        plugin.inform('dimension', $(window).width() + 'x' + $(window).height());
        plugin.inform('jquery.formslider.version', plugin.formslider.config.version);
        if (plugin.formslider.plugins.isLoaded('JqueryTracking')) {
          plugin.inform('channel', $.tracking.channel());
          return plugin.inform('campaign', $.tracking.campaign());
        }
      }
    };

    TrackSessionInformation.prototype.init = function() {
      return this.on('first-interaction', this.onFirstInteraction);
    };

    TrackSessionInformation.prototype.onFirstInteraction = function() {
      if (this.config.onReadyInternal) {
        this.config.onReadyInternal(this);
      }
      if (this.config.onReady) {
        return this.config.onReady(this);
      }
    };

    TrackSessionInformation.prototype.inform = function(name, value) {
      this.track(name, value, 'info');
      return this.container.append($('<input>', {
        type: 'hidden',
        name: "info[" + name + "]",
        value: value
      }));
    };

    return TrackSessionInformation;

  })(AbstractFormsliderPlugin);

  this.TrackUserInteraction = (function(superClass) {
    extend(TrackUserInteraction, superClass);

    function TrackUserInteraction() {
      this.setupQuestionAnswerTracking = bind(this.setupQuestionAnswerTracking, this);
      this.setupTransportTracking = bind(this.setupTransportTracking, this);
      this.init = bind(this.init, this);
      return TrackUserInteraction.__super__.constructor.apply(this, arguments);
    }

    TrackUserInteraction.config = {
      questionAnsweredEvent: 'question-answered'
    };

    TrackUserInteraction.prototype.init = function() {
      this.setupQuestionAnswerTracking();
      return this.setupTransportTracking();
    };

    TrackUserInteraction.prototype.setupTransportTracking = function() {
      return this.on("after", (function(_this) {
        return function(event, currentSlide, direction, prevSlide) {
          var id, role;
          role = $(currentSlide).data('role');
          id = $(currentSlide).data('id');
          _this.track("slide-" + (_this.index()) + "-entered", direction);
          _this.track("slide-role-" + role + "-entered", direction);
          if (id) {
            return _this.track("slide-id-" + id + "-entered", direction);
          }
        };
      })(this));
    };

    TrackUserInteraction.prototype.setupQuestionAnswerTracking = function() {
      return this.on('question-answered', (function(_this) {
        return function(event, questionId, answerId, value, slideIndex) {
          var eventName;
          eventName = _this.config.questionAnsweredEvent;
          _this.track(eventName, slideIndex);
          return _this.track(eventName + "-" + slideIndex, value);
        };
      })(this));
    };

    return TrackUserInteraction;

  })(AbstractFormsliderPlugin);

  this.EqualHeight = (function(superClass) {
    extend(EqualHeight, superClass);

    function EqualHeight() {
      this.doEqualize = bind(this.doEqualize, this);
      this.equalizeAll = bind(this.equalizeAll, this);
      this.init = bind(this.init, this);
      return EqualHeight.__super__.constructor.apply(this, arguments);
    }

    EqualHeight.config = {
      selector: '.answer .text'
    };

    EqualHeight.prototype.init = function() {
      this.on('ready', this.equalizeAll);
      this.on('resize', this.equalizeAll);
      return this.on('do-equal-height', this.doEqualize);
    };

    EqualHeight.prototype.equalizeAll = function() {
      var i, j, ref;
      for (i = j = 0, ref = this.slides.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        this.doEqualize(null, this.slideByIndex(i));
      }
    };

    EqualHeight.prototype.doEqualize = function(event, slide) {
      var $element, $elements, element, j, len, maxHeight;
      $elements = $(this.config.selector, slide);
      if (!$elements.length) {
        return;
      }
      maxHeight = 0;
      for (j = 0, len = $elements.length; j < len; j++) {
        element = $elements[j];
        $element = $(element);
        $element.css('height', 'auto');
        maxHeight = Math.max(maxHeight, $element.outerHeight());
      }
      return $elements.css('height', maxHeight);
    };

    return EqualHeight;

  })(AbstractFormsliderPlugin);

  this.LazyLoad = (function(superClass) {
    extend(LazyLoad, superClass);

    function LazyLoad() {
      this._loadLazyCallback = bind(this._loadLazyCallback, this);
      this.doLazyLoad = bind(this.doLazyLoad, this);
      this.onBefore = bind(this.onBefore, this);
      this.init = bind(this.init, this);
      return LazyLoad.__super__.constructor.apply(this, arguments);
    }

    LazyLoad.config = {
      lazyClass: 'lazy-load',
      dataKey: 'src',
      waitBeforeLoad: 10
    };

    LazyLoad.prototype.init = function() {
      this.doLazyLoad(this.slideByIndex(0));
      return this.on('before', this.onBefore);
    };

    LazyLoad.prototype.onBefore = function(event, current, direction, next) {
      return this.doLazyLoad(next);
    };

    LazyLoad.prototype.doLazyLoad = function(slide) {
      return setTimeout((function(_this) {
        return function() {
          $("img." + _this.config.lazyClass, slide).each(_this._loadLazyCallback);
          return _this.trigger('do-equal-height', slide);
        };
      })(this), this.config.waitBeforeLoad);
    };

    LazyLoad.prototype._loadLazyCallback = function(index, el) {
      var $el;
      $el = $(el);
      return $el.attr('src', $el.data(this.config.dataKey)).removeData(this.config.dataKey).removeClass(this.config.lazyClass);
    };

    return LazyLoad;

  })(AbstractFormsliderPlugin);

  this.LoadingState = (function(superClass) {
    extend(LoadingState, superClass);

    function LoadingState() {
      this.onReady = bind(this.onReady, this);
      this.init = bind(this.init, this);
      return LoadingState.__super__.constructor.apply(this, arguments);
    }

    LoadingState.config = {
      selector: '.progressbar-wrapper, .formslider-wrapper',
      loadingClass: 'loading',
      loadedClass: 'loaded'
    };

    LoadingState.prototype.init = function() {
      return this.on('ready', this.onReady);
    };

    LoadingState.prototype.onReady = function() {
      return $(this.config.selector).removeClass(this.config.loadingClass).addClass(this.config.loadedClass);
    };

    return LoadingState;

  })(AbstractFormsliderPlugin);

  this.ScrollUp = (function(superClass) {
    extend(ScrollUp, superClass);

    function ScrollUp() {
      this.isOnScreen = bind(this.isOnScreen, this);
      this.onAfter = bind(this.onAfter, this);
      this.init = bind(this.init, this);
      return ScrollUp.__super__.constructor.apply(this, arguments);
    }

    ScrollUp.config = {
      selector: '.headline',
      duration: 500,
      tolerance: 80,
      scrollUpOffset: 30,
      scrollTo: function(plugin, $element) {
        return Math.max(0, $element.offset().top - plugin.config.scrollUpOffset);
      },
      checkElement: function(plugin, slide) {
        return $(plugin.config.selector, slide);
      }
    };

    ScrollUp.prototype.init = function() {
      this.on('after', this.onAfter);
      return this.window = $(window);
    };

    ScrollUp.prototype.onAfter = function(e, current, direction, prev) {
      var $element;
      $element = this.config.checkElement(this, current);
      if (!$element.length) {
        this.logger.warn("no element found for selector " + this.config.selector);
        return;
      }
      if (this.isOnScreen($element)) {
        return;
      }
      return $("html, body").animate({
        scrollTop: this.config.scrollTo(this, $element)
      }, this.config.duration);
    };

    ScrollUp.prototype.isOnScreen = function($element) {
      var bounds, viewport;
      viewport = {
        top: this.window.scrollTop()
      };
      viewport.bottom = viewport.top + this.window.height();
      bounds = $element.offset();
      bounds.bottom = bounds.top + $element.outerHeight();
      return !(viewport.bottom < bounds.top - this.config.tolerance || viewport.top > bounds.bottom - this.config.tolerance);
    };

    return ScrollUp;

  })(AbstractFormsliderPlugin);

  this.SlideVisibility = (function(superClass) {
    extend(SlideVisibility, superClass);

    function SlideVisibility() {
      this.hideOtherSlides = bind(this.hideOtherSlides, this);
      this.showNextSlide = bind(this.showNextSlide, this);
      this.init = bind(this.init, this);
      return SlideVisibility.__super__.constructor.apply(this, arguments);
    }

    SlideVisibility.prototype.init = function() {
      this.on('before', this.showNextSlide);
      this.on('after', this.hideOtherSlides);
      this.hide(this.slides);
      return this.show(this.slideByIndex());
    };

    SlideVisibility.prototype.showNextSlide = function(event, current, direction, next) {
      return this.show(next);
    };

    SlideVisibility.prototype.hideOtherSlides = function(event, current, direction, prev) {
      return this.hide(this.slides.not(current));
    };

    SlideVisibility.prototype.hide = function(slide) {
      return $(slide).css('opacity', 0).data('slide-visibility', 0);
    };

    SlideVisibility.prototype.show = function(slide) {
      return $(slide).css('opacity', 1).data('slide-visibility', 1);
    };

    return SlideVisibility;

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
      var data, event, j, len, listener, name, ref, tags;
      data = slice.call(arguments);
      name = data.shift();
      tags = name.split('.');
      name = tags.shift();
      event = {
        type: name,
        tags: tags,
        canceled: false
      };
      if (this.listener[name] == null) {
        return event;
      }
      ref = this.listener[name];
      for (j = 0, len = ref.length; j < len; j++) {
        listener = ref[j];
        if (!listener.tags || this.allTagsInArray(listener.tags, tags)) {
          listener.callback.apply(listener, [event].concat(slice.call(data)));
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
      var j, len, tag;
      for (j = 0, len = tags.length; j < len; j++) {
        tag = tags[j];
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

  this.FeatureDetector = (function() {
    function FeatureDetector() {}

    FeatureDetector.isMobileDevice = function() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    return FeatureDetector;

  })();

  this.Locking = (function() {
    function Locking(initial) {
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
      var j, len, plugin;
      for (j = 0, len = plugins.length; j < len; j++) {
        plugin = plugins[j];
        if (!window[plugin["class"]]) {
          this.formslider.logger.warn("loadAll(" + plugin["class"] + ") -> not found");
          continue;
        }
        this.load(plugin);
      }
    };

    PluginLoader.prototype.load = function(plugin) {
      var PluginClass, config, error, pluginInstance;
      PluginClass = window[plugin["class"]];
      if (plugin.config == null) {
        config = this.globalPluginConfig;
      } else {
        config = ObjectExtender.extend({}, this.globalPluginConfig, plugin.config);
      }
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
      this.index = bind(this.index, this);
      this.onResize = bind(this.onResize, this);
      this.onReady = bind(this.onReady, this);
      this.onAfter = bind(this.onAfter, this);
      this.onBefore = bind(this.onBefore, this);
      this.loadPlugins = bind(this.loadPlugins, this);
      this.setupDriver = bind(this.setupDriver, this);
      this.setupConfig = bind(this.setupConfig, this);
      this.logger = new Logger('jquery.formslider');
      if (!this.container.length) {
        this.logger.error('container is empty');
        return;
      }
      this.setupConfig(config);
      this.firstInteraction = false;
      this.events = new EventManager(this.logger);
      this.locking = new Locking(true);
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
      if (currentIndex === nextIndex) {
        return false;
      }
      if (this.locking.locked) {
        return false;
      }
      this.locking.lock();
      current = this.slides.get(currentIndex);
      currentRole = $(current).data('role');
      next = this.slides.get(nextIndex);
      nextRole = $(next).data('role');
      eventData = [current, direction, next];
      event = (ref = this.events).trigger.apply(ref, ["leaving." + currentRole + "." + direction].concat(slice.call(eventData)));
      if (event.canceled) {
        this.locking.unlock();
        return false;
      }
      (ref1 = this.events).trigger.apply(ref1, ["before." + nextRole + "." + direction].concat(slice.call(eventData)));
      this.lastCurrent = current;
      this.lastNext = next;
      this.lastCurrentRole = nextRole;
      return this.lastDirection = direction;
    };

    FormSlider.prototype.onAfter = function() {
      var eventData, ref, ref1;
      if (!this.locking.locked) {
        return;
      }
      eventData = [this.lastNext, this.lastDirection, this.lastCurrent];
      (ref = this.events).trigger.apply(ref, ["after." + this.lastCurrentRole + "." + this.lastDirection].concat(slice.call(eventData)));
      if (!this.firstInteraction) {
        this.firstInteraction = true;
        (ref1 = this.events).trigger.apply(ref1, ['first-interaction'].concat(slice.call(eventData)));
      }
      return setTimeout(this.locking.unlock, this.config.silenceAfterTransition);
    };

    FormSlider.prototype.onReady = function() {
      this.ready = true;
      this.events.trigger('ready');
      return this.locking.unlock();
    };

    FormSlider.prototype.onResize = function() {
      return this.events.trigger('resize');
    };

    FormSlider.prototype.index = function() {
      return this.driver.index();
    };

    FormSlider.prototype.next = function() {
      return this.events.trigger("controller.next");
    };

    FormSlider.prototype.prev = function() {
      return this.events.trigger("controller.prev");
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
    silenceAfterTransition: 500,
    driver: {
      "class": 'DriverFlexslider',
      selector: '.formslider > .slide'
    },
    pluginsGlobalConfig: {
      questionSelector: '.question-input',
      answersSelector: '.answers',
      answerSelector: '.answer',
      answerSelectedClass: 'selected'
    },
    plugins: [
      {
        "class": 'BrowserHistoryController'
      }, {
        "class": 'NativeOrderController'
      }, {
        "class": 'SlideVisibility'
      }, {
        "class": 'LazyLoad'
      }, {
        "class": 'EqualHeight'
      }, {
        "class": 'ScrollUp'
      }, {
        "class": 'LoadingState'
      }, {
        "class": 'ProgressBarPercent'
      }, {
        "class": 'AnswerMemory'
      }, {
        "class": 'AnswerClick'
      }, {
        "class": 'JqueryValidate'
      }, {
        "class": 'TabIndexSetter'
      }, {
        "class": 'InputSync'
      }, {
        "class": 'InputNormalizer'
      }, {
        "class": 'InputFocus'
      }, {
        "class": 'FormSubmission'
      }, {
        "class": 'NavigateOnClick'
      }, {
        "class": 'NavigateOnKey'
      }, {
        "class": 'TrackUserInteraction'
      }, {
        "class": 'TrackSessionInformation'
      }, {
        "class": 'SimpleLoader'
      }, {
        "class": 'AddSlideClasses'
      }
    ]
  };

}).call(this);

//# sourceMappingURL=maps/formslider.js.map
