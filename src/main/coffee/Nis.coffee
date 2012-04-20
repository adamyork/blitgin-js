class Nis
  constructor:(@name)->
    
  _nisCondition = {}
  _nisGoal = {}
  _player = {}
  _map = {}
  _enemies = {}
  _frame = 0
  
  initialize:->
    @frame = 0
  
  checkConditions:(target,condition)->
    conditionsMet = true
    for prop of condition
      value = condition[prop]
      conditionsMet = @evaluatePropAndValue target,prop,value
    return conditionsMet

  evaluatePropAndValue:(target,prop,value)->
    if(typeof value is "boolean" or typeof value is "string")
      return (target[prop] is value)
    if(typeof value is "number")
      return (target[prop] >= value)
    if(typeof value is "object")
      return (target[prop] is value)
    false

  checkForEnemyConditions:->
    #TODO this needs to be expanded upon. Check more than just number of enemies
    (@enemies.length is @nisCondition.enemies.length)

Nis::name = "Nis"

Nis::__defineGetter__ "conditionsMet",(val)->
  pCondition = @checkConditions @_player,@nisCondition.playerCondition
  mCondition = @checkConditions @_map,@nisCondition.mapCondition
  eCondition = @checkForEnemyConditions()
  (pCondition && mCondition && eCondition)

Nis::__defineGetter__ "nisCondition",->
  @_nisCondition

Nis::__defineSetter__ "nisCondition",(val)->
  @_nisCondition = val
  
Nis::__defineGetter__ "nisGoal",->
  @_nisGoal

Nis::__defineSetter__ "nisGoal",(val)->
  @_nisGoal = val
  
Nis::__defineGetter__ "map",->
  @_map
  
Nis::__defineSetter__ "map",(val)->
  @_map = val
  
Nis::__defineGetter__ "player",->
  @_player

Nis::__defineSetter__ "player",(val)->
  @_player = val
  
Nis::__defineGetter__ "enemies",->
  @_enemies  

Nis::__defineSetter__ "enemies",(val)->
  @_enemies = val

Nis::__defineGetter__ "frame",->
  @_frame

Nis::__defineSetter__ "frame",(val)->
  @_frame = val