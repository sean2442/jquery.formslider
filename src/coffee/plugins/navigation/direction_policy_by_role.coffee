class @DirectionPolicyByRole extends AbstractFormsliderPlugin
  @config = {}

  init: =>
    @on('leaving', @checkPermissions)

  checkPermissions: (event, current, direction, next) =>
    currentRole = $(current).data('role')
    nextRole    = $(next).data('role')

    return if !currentRole || !nextRole

    # check goingTo
    if currentRole of @config
      permissions = @config[currentRole]
      if 'goingTo' of permissions
        return @cancel(event) if 'none' in permissions.goingTo
        return @cancel(event) unless nextRole in permissions.goingTo

    # check commingFrom
    if nextRole of @config
      permissions = @config[nextRole]
      if 'commingFrom' of permissions
        return @cancel(event) if 'none' in permissions.commingFrom
        return @cancel(event) unless currentRole in permissions.commingFrom
