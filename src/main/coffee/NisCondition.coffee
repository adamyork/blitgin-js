class NisCondition
  constructor:(@name)->
  
  _mapCondition = {}
  _playerCondition = {}
  _enemies = []

NisCondition::name = "NisCondition"

NisCondition::__defineGetter__ "mapCondition",->
  @_mapCondition

NisCondition::__defineSetter__ "mapCondition",(val)->
  @_mapCondition = val

NisCondition::__defineGetter__ "playerCondition",->
  @_playerCondition

NisCondition::__defineSetter__ "playerCondition",(val)->
  @_playerCondition = val

NisCondition::__defineGetter__ "enemies",->
  @_enemies

NisCondition::__defineSetter__ "enemies",(val)->
  @_enemies = val