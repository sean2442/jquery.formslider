# require all dependencies #TODO: gulp-include breaks gulp-sourcemaps
#= include driver/**/*.coffee
#= include plugins/**/*.coffee
#= include lib/**/*.coffee

# the controller aka heart of the formslider
class @FormSlider
  @config = null # see below
  constructor: (@container, config) ->
    @logger = new Logger('jquery.formslider')

    unless @container.length
      @logger.error('container is empty')
      return

    @setupConfig(config)
    @firstInteraction = false
    @events           = new EventManager(@logger)
    @locking          = new Locking(true)
    @setupDriver()
    @slides           = @driver.slides
    @loadPlugins()
    $(window).resize(@onResize)

  setupConfig: (config) =>
    # reset default plugins, if custom plugin definition given
    FormSlider.config.plugins = [] if config?.plugins?

    # merge class with instance config
    @config = ObjectExtender.extend({}, FormSlider.config, config)

  setupDriver: =>
    DriverClass = window[@config.driver.class]
    @driver = new DriverClass(
      @container, @config.driver, @onBefore, @onAfter, @onReady
    )

  loadPlugins: =>
    @plugins = new PluginLoader(@, @config.pluginsGlobalConfig)
    @plugins.loadAll @config.plugins

  # called from @driver.goto
  # return value(bool) indicates if transition allowed or not
  onBefore: (currentIndex, direction, nextIndex) =>
    return false if currentIndex == nextIndex
    return false if @locking.locked
    @locking.lock()

    current     = @slides.get(currentIndex)
    currentRole = $(current).data('role')
    next        = @slides.get(nextIndex)
    nextRole    = $(next).data('role')
    eventData   = [ current, direction, next ]

    # trigger leaving event, can also stop the transition
    event = @events.trigger("leaving.#{currentRole}.#{direction}", eventData...)
    if event.canceled
      @locking.unlock()
      return false

    # trigger before event
    @events.trigger("before.#{nextRole}.#{direction}", eventData...)

    @lastCurrent     = current
    @lastNext        = next
    @lastCurrentRole = nextRole
    @lastDirection   = direction

  onAfter: =>
    # only allow if onBefore was called
    return unless @locking.locked

                # current  , direction     , prev
    eventData = [ @lastNext, @lastDirection, @lastCurrent ]
    @events.trigger("after.#{@lastCurrentRole}.#{@lastDirection}", eventData...)

    unless @firstInteraction
      @firstInteraction = true
      @events.trigger('first-interaction', eventData...)

    setTimeout(@locking.unlock, @config.silenceAfterTransition)

  onReady: =>
    @ready = true
    @events.trigger('ready')
    @locking.unlock()

  onResize: =>
    @events.trigger('resize')

  index: =>
    @driver.index()

  # prev and next could be magical resolved controller events ;)
  next: =>
    @events.trigger("controller.next")

  # prev and next could be magical resolved controller events ;)
  prev: =>
    @events.trigger("controller.prev")

  # will be called from controller plugins (triggered from prev/next)
  goto: (indexFromZero) =>
    return if @locking.locked
    return if indexFromZero < 0 || indexFromZero > @slides.length - 1
    @driver.goto(indexFromZero)



# formslider static default configuration, should work with "hello world"
@FormSlider.config =
  # use for what ever you want, will be tracked by tracking plugins
  version: 1

  # this helps preventing a bug, where slides getting displaced after prev
  silenceAfterTransition: 500

  # the driver between "goto" and slide transitions in the browser
  driver:
    class:    'DriverFlexslider'
    selector: '.formslider > .slide' # this have to be [wrapper] > [slides]

  # will be merged into every plugin instance
  pluginsGlobalConfig:
    questionSelector: '.question-input'
    answersSelector:  '.answers'
    answerSelector:   '.answer'
    answerSelectedClass: 'selected'

  plugins: [
      # prev/next controller plugin
      { class: 'BrowserHistoryController'   }
      { class: 'NativeOrderController' }

      #view
      { class: 'SlideVisibility'          }
      { class: 'LazyLoad'                 }
      { class: 'EqualHeight'              }
      { class: 'ScrollUp'                 }
      { class: 'LoadingState'             }

      # progressbar
      { class: 'ProgressBarPercent'       }

      # form
      { class: 'AnswerMemory'             }
      { class: 'AnswerClick'              }
      { class: 'JqueryValidate'           }
      { class: 'TabIndexSetter'           }
      { class: 'InputSync'                }
      { class: 'InputNormalizer'          }
      { class: 'InputFocus'               }
      { class: 'FormSubmission'           }

      # navigation
      { class: 'NavigateOnClick'          }
      { class: 'NavigateOnKey'            }

      # tracking
      { class: 'TrackUserInteraction'     }
      { class: 'TrackSessionInformation'  }

      # loader
      { class: 'SimpleLoader'             }

      # generic
      { class: 'AddSlideClasses'          }
  ]
