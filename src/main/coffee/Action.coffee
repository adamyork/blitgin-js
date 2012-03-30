class Action extends RenderObject
  contructor:(@name)->

  _isComplete = false
  _isAnimating = false
  _hasAnimated = false
  _nonObjectProducing = false
  _width = 0
  _height = 0
  _frame = 0
  _lifeSpan = 0
  _collisionCoefficient = 0
  _health = 100
  _damage = 10
  _soundLoops = 0
  _maxVelocityX = 0
  _owner = ""
  _id = ""
  _bitmapData = {}
  _sound = {}
  _stateLeft = {}
  _stateRight = {}
  _stateCollisionRight = {}
  _stateCollisionLeft = {}
  _stateJumpRight = {}
  _stateJumpLeft = {}
  _state = {}
  _composite = {}
  _emitter = {}
  
  loadedMetadata:()->
    console.log "LOADED METADADA"
    
  audioAvailable:()->
    console.log "audioAvailable"
  
Action::name = "Action"

Action::__defineGetter__ "velocityX",->
  @_velocityX

Action::__defineSetter__ "velocityX",(val)->
  if val <= @maxVelocityX
    @_velocityX = val

Action::__defineGetter__ "maxVelocityX",->
  @_maxVelocityX

Action::__defineSetter__ "maxVelocityX",(val)->
  @_maxVelocityX = val

Action::__defineGetter__ "collisionRect",->
  new Rectangle @x,@y,@width,@height

Action::__defineGetter__ "collisionCoefficient",->
  @_collisionCoefficient

Action::__defineSetter__ "collisionCoefficient",(val)->
  @_collisionCoefficient = val

Action::__defineGetter__ "id",->
  @_id

Action::__defineSetter__ "id",(val)->
  @_id = val

Action::__defineGetter__ "lifeSpan",->
  @_lifeSpan

Action::__defineSetter__ "lifeSpan",(val)->
  @_lifeSpan = val

Action::__defineGetter__ "damage",->
  @_damage
  
Action::__defineSetter__ "damage",(val)->
  @_damage = val

Action::__defineGetter__ "health",->
  @_health

Action::__defineSetter__ "health",(val)->
  @_health = val
  if val <= 0
    @isComplete = true

Action::__defineGetter__ "owner",->
  @_owner
    
Action::__defineSetter__ "owner",(val)->
  @_owner = val

Action::__defineGetter__ "nonObjectProducing",->
  @_nonObjectProducing

Action::__defineSetter__ "nonObjectProducing",(val)->
  @_nonObjectProducing = val

Action::__defineGetter__ "isComplete",->
  @_isComplete

Action::__defineSetter__ "isComplete",(val)->
  @_isComplete = val
  
Action::__defineGetter__ "isAnimating",->
  @_isAnimating

Action::__defineSetter__ "isAnimating",(val)->
  @_isAnimating = val

Action::__defineGetter__ "hasAnimated",->
  @_hasAnimated

Action::__defineSetter__ "hasAnimated",(val)->
  @_hasAnimated = val

Action::__defineGetter__ "stateLeft",->
  @_stateLeft

Action::__defineSetter__ "stateLeft",(val)->
  @_stateLeft = val

Action::__defineGetter__ "stateRight",->
  @_stateRight

Action::__defineSetter__ "stateRight",(val)->
  @_stateRight = val

Action::__defineGetter__ "stateCollisionLeft",->
  @_stateCollisionLeft

Action::__defineSetter__ "stateCollisionLeft",(val)->
  @_stateCollisionLeft = val

Action::__defineGetter__ "stateCollisionRight",->
  @_stateCollisionRight

Action::__defineSetter__ "stateCollisionRight",(val)->
  @_stateCollisionRight = val

Action::__defineGetter__ "stateJumpRight",->
  @_stateJumpRight

Action::__defineSetter__ "stateJumpRight",(val)->
  @_stateJumpRight = val

Action::__defineGetter__ "stateJumpLeft",->
  @_stateJumpLeft

Action::__defineSetter__ "stateJumpLeft",(val)->
  @_stateJumpLeft = val

Action::__defineGetter__ "state",->
  if @direction is 1    
    return @stateRight    
  else    
    return @stateLeft

Action::__defineGetter__ "composite",->
  @_composite

Action::__defineSetter__ "composite",(val)->
  @_composite = val
  
Action::__defineGetter__ "emitter",->
  @_emitter

Action::__defineSetter__ "emitter",(val)->
  @_emitter = val

Action::__defineGetter__ "sound",->
  @_sound

Action::__defineSetter__ "sound",(val)->
  @_sound = val
    
Action::__defineGetter__ "soundLoops",->
  @_soundLoops

Action::__defineSetter__ "soundLoops",(val)->
  @_soundLoops = val
  
Action::__defineGetter__ "frame",->
  @_frame

Action::__defineSetter__ "frame",(val)->
  if val >= @lifeSpan
    @isComplete = true
  @_frame = val
  if @asset is undefined
    @objectKeyframeLength = 0
    return
  if @objectKeyframeLength is (Math.round(@asset.width / @cellWidth)-1)
    @objectKeyframeLength = 0
    return
  @objectKeyframeLength = val

Action::ENEMY = "enemy"
Action::PLAYER = "player"