
class @PluginLoader
  constructor: (@formslider, @globalPluginConfig) ->
    @loaded = {}

  loadAll: (plugins) =>
    for plugin in plugins
      unless window[plugin.class]
        @formslider.logger.warn("loadAll(#{plugin.class}) -> not found")
        continue

      @load(plugin)

    return # performance, dont return loops in coffee

  load: (plugin) =>
    PluginClass = window[plugin.class]

    unless plugin.config?
      config = @globalPluginConfig
    else
      config = ObjectExtender.extend(
        {},
        @globalPluginConfig,
        plugin.config
      )

    try
      pluginInstance = new PluginClass(@formslider, config)
      @loaded[plugin.class] = pluginInstance
      return pluginInstance

    catch error
      @formslider.logger.error("loadPlugin(#{plugin.class}) -> error", error)

  isLoaded: (name) =>
    name of @loaded

  get: (name) =>
    return unless @isLoaded(name)
    @loaded[name]
