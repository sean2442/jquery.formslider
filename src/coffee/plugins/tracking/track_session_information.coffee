class @TrackSessionInformation extends AbstractFormsliderPlugin
  @config:
    onReady: null
    onReadyInternal: (plugin) ->
      plugin.inform('url',       location.href)
      plugin.inform('useragent', navigator.userAgent )
      plugin.inform('referer',   document.referrer)
      plugin.inform('dimension', $(window).width() + 'x' + $(window).height())
      plugin.inform('jquery.formslider.version',
        plugin.formslider.config.version)

      if plugin.formslider.plugins.isLoaded('JqueryTracking')
        plugin.inform('channel', $.tracking.channel())
        plugin.inform('campaign', $.tracking.campaign())

  init: =>
    @on('first-interaction', @onFirstInteraction)

  onFirstInteraction: =>
    @config.onReadyInternal(@) if @config.onReadyInternal
    @config.onReady(@) if @config.onReady

  inform: (name, value) =>
    @track(name, value, 'info')

    @container.append(
      $('<input>', {
        type: 'hidden'
        name: "info[#{name}]"
        value: value
      })
    )
