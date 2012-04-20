class NisGoal
  constructor:(@name)->

  _duration = 0
  _playerGoals = {}
  _mapGoals = {}
  _enemyGoals = {}
  _useCollision = true

NisGoal::name = "NisGoal"

NisGoal::__defineSetter__ "duration",(val)->
  @_duration = val

NisGoal::__defineGetter__ "duration",->
  @_duration

NisGoal::__defineSetter__ "playerGoals",(val)->
  @_playerGoals = val

NisGoal::__defineGetter__ "playerGoals",->
  @_playerGoals

NisGoal::__defineSetter__ "mapGoals",(val)->
  @_mapGoals = val

NisGoal::__defineGetter__ "mapGoals",->
  @_mapGoals

NisGoal::__defineSetter__ "enemyGoals",(val)->
  @_enemyGoals = val

NisGoal::__defineGetter__ "enemyGoals",->
  @_enemyGoals
  
NisGoal::__defineSetter__ "useCollision",(val)->
  @_useCollision = val

NisGoal::__defineGetter__ "useCollision",->
  @_useCollision