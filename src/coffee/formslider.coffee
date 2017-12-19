#= include driver/**/*.coffee
#= include plugins/**/*.coffee
#= include lib/**/*.coffee

class @FormSlider
  @config = null # see below
  constructor: (@container, config) ->
    @setupConfig(config)
    @firstInteraction = false
    @logger           = new Logger('jquery.formslider')
    @events           = new EventManager(@logger)
    @locking          = new Locking(true)
    @setupDriver()
    @slides           = @driver.slides
    @loadPlugins()
    $(window).resize(@onResize)

  setupConfig: (config) =>
    FormSlider.config.plugins = [] if config?.plugins?
    @config = ObjectExtender.extend({}, FormSlider.config, config)

  setupDriver: =>
    DriverClass = window[@config.driver.class]
    @driver = new DriverClass(
      @container, @config.driver, @onBefore, @onAfter, @onReady
    )

  loadPlugins: =>
    @plugins = new PluginLoader(@, @config.pluginsGlobalConfig)
    @plugins.loadAll(
      @config.plugins
    )

  # called from @driver.next|prev|goto
  # return value(bool) indicates if transition allowed or not
  onBefore: (currentIndex, direction, nextIndex) =>
    return false if @locking.locked

    current     = @slides.get(currentIndex)
    currentRole = $(current).data('role')
    next        = @driver.get(nextIndex)
    nextRole    = $(next).data('role')
    eventData   = [ current, direction, next ]

    # trigger leaving event, can also stop the transition
    event = @events.trigger("leaving.#{currentRole}.#{direction}", eventData...)
    if event.canceled
      @locking.unlock()
      return false

    # trigger before event
    @events.trigger("before.#{nextRole}.#{direction}", eventData...)

    @lastId          = @id()
    @lastCurrent     = current
    @lastNext        = next
    @lastCurrentRole = nextRole
    @lastDirection   = direction

    return true

  onAfter: =>
                # current  , direction     , prev
    eventData = [ @lastNext, @lastDirection, @lastCurrent ]
    @events.trigger("after.#{@lastCurrentRole}.#{@lastDirection}", eventData...)

    unless @firstInteraction
      @firstInteraction = true
      @events.trigger('first-interaction', eventData...)

    @locking.unlock()

  onReady: =>
    @events.trigger('ready')
    @locking.unlock()

  onResize: =>
    @events.trigger('resize')

  index: =>
    @driver.index()

  id: =>
    $(@driver.get()).data('id')

  next: =>
    return if @locking.locked
    @events.trigger('before-driver-next')
    return if @index() + 1 > @driver.slides.length - 1 # zero based
    @driver.next()

  prev: =>
    return if @locking.locked
    @driver.prev() if @index() > 0

  goto: (indexFromZero) =>
    return if @locking.locked
    return if indexFromZero < 0 || indexFromZero > @slides.length - 1
    @driver.goto(indexFromZero)


@FormSlider.config =
  version: 1
  driver:
    class:    'DriverFlexslider'
    selector: '.formslider > .slide'

  pluginsGlobalConfig:
    answersSelector: '.answers'
    answerSelector:  '.answer'
    answerSelectedClass: 'selected'

  plugins: [
    { class: 'AddSlideClassesPlugin'          }
    { class: 'AnswerClickPlugin'              }
    { class: 'InputFocusPlugin'               }
    { class: 'BrowserHistoryPlugin'           }
    { class: 'JqueryValidatePlugin'           }
    { class: 'NormalizeInputAttributesPlugin' }
    { class: 'InputSyncPlugin'                }
    { class: 'NextOnKeyPlugin'                }
    { class: 'ArrowNavigationPlugin'          }
    { class: 'TabIndexSetterPlugin'           }
    { class: 'NextOnClickPlugin'              }
    { class: 'LoadingStatePlugin'             }
    { class: 'ProgressBarPlugin'              }
    { class: 'TrackUserInteractionPlugin'     }
    { class: 'LoaderSlidePlugin'              }
    { class: 'ContactSlidePlugin'             }
    { class: 'ConfirmationSlidePlugin'        }
    { class: 'EqualHeightPlugin'              }
    { class: 'ScrollUpPlugin'                 }
    { class: 'LazyLoadPlugin'                 }
  ]
