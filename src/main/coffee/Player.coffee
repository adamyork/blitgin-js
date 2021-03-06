class Player extends RenderObject
  constructor:(@name)->
    @x = 0
    @y = 0
    @width = 0
    @height = 0
    @frame = 0   

  _showCollisionRect = false
  _isBusy = false
  _isDead = false
  _applyGravityAndFriction = true  
  _mapX = 0
  _mapY = 0
  _mapBoundsMin = 0
  _mapBoundsMax = 0
  _screenX = 0
  _screenY = 0
  _frame = 0
  _maxVelocityX = 15
  _maxVelocityY = 26
  _collisionCoefficient = 0
  _minVelocity = 0
  _floor = 0
  _thresholdX = 0
  _thresholdY = 35
  _health = 100
  _damage = 10  
  _uniqueID = ""  
  _actions = []  
  _moveRight = {}
  _moveLeft = {}
  _collisionRight = {}
  _collisionLeft = {}
  _jumpRight = {}
  _jumpLeft = {}
  _state = {}
  _previousState = {}
  _composite = {}
  _compositePoint = {}
  _emitter = {}
  _directionOfCollision = undefined
  
  initialize:->
    super @updateInherentStates
    @y = 0#_floor = ((Game::VIEWPORT_HEIGHT) - (@asset.height - @cellHeight))
    @_frame = 0
    @_minVelocity = 0
    @_isBusy = false
    @_isDead = false
    if @maxVelocityX is undefined
      @maxVelocityX = 15
    if @maxVelocityY is undefined
      @_maxVelocityY = 45
    else
      @_maxVelocityY = @maxVelocityY
    if @frameBuffer is undefined
      @frameBuffer = 0
    @velocityX = 0
    @velocityY = 0
    @mapBoundsMin = Math.round(Game::VIEWPORT_WIDTH * .15)
    @mapBoundsMax = Math.round((Game::VIEWPORT_WIDTH * .85) - @width)
    @updateInherentStates()

  updateInherentStates:(action)->
    if(action is undefined)
      @_moveRight = new State Math.round(@asset.width / @cellWidth)-1,0,true,"moveRight",0
      @_moveLeft = new State Math.round(@asset.width / @cellWidth)-1,1,true,"moveLeft",0
      @_collisionRight = new State Math.round(@asset.width / @cellHeight)-1,2,false,"collisionRight",0
      @_collisionLeft = new State Math.round(@asset.width / @cellHeight)-1,3,false,"collsionLeft",0
      @_jumpRight = new State Math.round(@asset.width / @cellWidth)-1,0,true,"jumpRight",0
      @_jumpLeft = new State Math.round(@asset.width / @cellWidth)-1,1,true,"jumpLeft",0
      @applyState()
    else
      @applyState()
      if action.stateRight
        @_moveRight = @assignActionState action.stateRight,_moveRight
      if action.stateLeft
        @_moveLeft = @assignActionState action.stateLeft,_moveLeft
      if action.stateCollisionRight
        @_collisionRight = @assignActionState action.stateCollisionRight,_collisionRight
      if action.stateCollisionLeft
        @_collisionLeft = @assignActionState action.stateCollisionLeft,_collisionLeft
      if action.stateJumpRight
        @_jumpRight = @assignActionState action.stateJumpRight,_jumpRight
      if action.stateJumpLeft
        @_jumpLeft = @assignActionState action.stateJumpLeft,_jumpLeft      
    if (@_direction == 1) then @_state = @_moveRight else @_state = @_moveLeft      
  
  applyState:->
    if @_direction is undefined
      @_direction = 1
    if (@_direction == 1) then @_previousState = @_moveRight else @_previousState = @_moveLeft
    
  revertState:->
    @_state = @_previousState

  assignActionState:(state,inherent)->
    if (state) then state else inherent
    
  getCustomActionForKey:(keyCode)->
    if @actions is undefined
      @actions = []
    @actions[keyCode]

  setCustomActionForKey:(keyCode,action)->
    if @actions is undefined
      @actions = []
    @actions[keyCode] = action
    
  updatePoints:->
    if @composite isnt undefined
      @composite.point = @compositePoint
    if @emitter isnt undefined
      @emitter.point = @emitterPoint

Player::name = "Player"

Player::__defineGetter__ "bitmapData",->
  if @ctx isnt undefined
    keyFrame = (Math.floor @frame) * @cellWidth
    row = @state.row * @cellHeight
    if @showCollisionRect
      @ctx.drawImage @assetData,0,0
      @ctx.fillStyle = "rgb(200,0,0)"
      @ctx.fillRect keyFrame+@thresholdX,row+@thresholdY,@width-(@thresholdX*2),@height-(@thresholdY*2)
      @assetData.src = @workbench.toDataURL()
    {player:@assetData,rect:new Rectangle keyFrame,row,@cellWidth,@cellHeight}
   else
    {player:{notready:true},rect:new Rectangle keyFrame,row,@cellWidth,@cellHeight}

Player::__defineGetter__ "x",->
  @_x

Player::__defineSetter__ "x",(val)->
  if (val >= 0) and (val <= (Game::VIEWPORT_WIDTH - @width))
    @_x = Math.round(val)
  else if val < 0
    @_x = 0
  else if(val > 0)
    @_x = Game::VIEWPORT_WIDTH - @width
  @updatePoints()

Player::__defineGetter__ "y",->
  @_y  

Player::__defineSetter__ "y",(val)->
  if val >= (Game::VIEWPORT_HEIGHT - @cellHeight)
    @_y = Game::VIEWPORT_HEIGHT - @cellHeight;
    @updatePoints()
    return
  @_y = val
  @updatePoints()

Player::__defineGetter__ "direction",->
  @_direction 

Player::__defineSetter__ "direction",(val)->
  @_direction = val
  @state = if @direction is -1 then @_moveLeft else @_moveRight

Player::__defineGetter__ "directionOfCollision",->
  @_directionOfCollision 

Player::__defineSetter__ "directionOfCollision",(val)->
  @_directionOfCollision = val
  
Player::__defineGetter__ "frame",->
  @_frame

Player::__defineSetter__ "frame",(val)->
  if val >= @_state.duration
    if not @_state.persistent
      @_state = @_previousState
      @frameBuffer = @_state.frameBuffer
      @_isBusy = false
    @_frame = 0
    return
  @_frame = if (@_frame is 0 or val is 0) then val else val - @_frameBuffer

Player::__defineGetter__ "velocityX",->
  @_velocityX
  
Player::__defineSetter__ "velocityX",(val)->
  if(val <= @_maxVelocityX and val >= @_minVelocity)
    @_velocityX = val
  else if val <= @_minVelocity
    @_velocityX = 0
        
Player::__defineGetter__ "vOrigin",->
  val = 0
  if @direction is -1
    val = @width + @x
  else if @direction is 1
    val = @x
  val

Player::__defineGetter__ "hOrigin",->
  val = 0
  dir = @direction
  if @directionOfCollision isnt undefined
    dir = @directionOfCollision
  if dir is -1
      val = @x
  else if dir is 1
      val = @width + @x
  val

Player::__defineGetter__ "state",->
  @_state

Player::__defineSetter__ "state",(val)->
  if @_isBusy or (@_state.id is val.id)
    return  
  if (val.id is @_jumpRight.id) or (val.id is @_jumpLeft.id)
    @velocityY = @_maxVelocityY
  @_frame = 0
  @frameBuffer = val.frameBuffer
  @_previousState = @_state
  @_state = val
    
Player::__defineGetter__ "health",->
  @_health

Player::__defineSetter__ "health",(val)->
  @_health = val
  if @_health <= 0
    @_isDead = true

Player::__defineGetter__ "mapX",->
  @_mapX

Player::__defineSetter__ "mapX",(val)->
  @_mapX = val
  
Player::__defineGetter__ "mapY",->
  @_mapY

Player::__defineSetter__ "mapY",(val)->
  @_mapY = val

Player::__defineGetter__ "mapBoundsMin",->
  @_mapBoundsMin

Player::__defineSetter__ "mapBoundsMin",(val)->
  @_mapBoundsMin = val

Player::__defineGetter__ "mapBoundsMax",->
  @_mapBoundsMax

Player::__defineSetter__ "mapBoundsMax",(val)->
  @_mapBoundsMax = val

Player::__defineGetter__ "screenX",->
  @_screenX

Player::__defineSetter__ "screenX",(val)->
  @_screenX = val
  
Player::__defineGetter__ "screenY",->
  @_screenY

Player::__defineSetter__ "screenY",(val)->
  @_screenY = val
    
Player::__defineGetter__ "floor",->
  @_floor

Player::__defineSetter__ "floor",(val)->
  @_floor = val

Player::__defineGetter__ "collisionCoefficient",->
  @_collisionCoefficient

Player::__defineSetter__ "collisionCoefficient",(val)->
  @_collisionCoefficient = val

Player::__defineGetter__ "maxVelocityX",->
  @_maxVelocityX

Player::__defineSetter__ "maxVelocityX",(val)->
  @_maxVelocityX = val

Player::__defineGetter__ "maxVelocityY",->
  @_maxVelocityY

Player::__defineSetter__ "maxVelocityY",(val)->
  @_maxVelocityY = val

Player::__defineGetter__ "applyGravityAndFriction",->
  @_applyGravityAndFriction

Player::__defineSetter__ "applyGravityAndFriction",(val)->
  @_applyGravityAndFriction = val
    
Player::__defineGetter__ "showCollisionRect",->
  @_showCollisionRect
    
Player::__defineSetter__ "showCollisionRect",(val)->
  @_showCollisionRect = val
  
Player::__defineGetter__ "thresholdX",->
  @_thresholdX

Player::__defineSetter__ "thresholdX",(val)->
  if val > (@width * .5)
    GameError.warn "You cant set a threshold this high. There would be no collision area."
  @_thresholdX = val
  
Player::__defineGetter__ "thresholdY",->
  @_thresholdY

Player::__defineSetter__ "thresholdY",(val)->
  if val > (@height * .5)
    GameError.warn "You cant set a threshold this high. There would be no collision area."
  @_thresholdY = val

Player::__defineGetter__ "damage",->
  @_damage

Player::__defineSetter__ "damage",(val)->
  @_damage = val

Player::__defineGetter__ "isDead",->
  @_isDead

Player::__defineGetter__ "isBusy",->
  @_isBusy

Player::__defineSetter__ "isBusy",(val)->
  @_isBusy = val

Player::__defineGetter__ "collisionRect",->
  new Rectangle (@x+@thresholdX),(@y+@thresholdY),(@width-(@thresholdX*2)),(@height-(@thresholdY*2))

Player::__defineGetter__ "moveLeft",->
  @_moveLeft

Player::__defineGetter__ "moveRight",->
  @_moveRight

Player::__defineGetter__ "jumpRight",->
  @_jumpRight

Player::__defineGetter__ "jumpLeft",->
  @_jumpLeft

Player::__defineGetter__ "collisionLeft",->
  @_collisionLeft

Player::__defineGetter__ "collisionRight",->
  @_collisionRight

Player::__defineGetter__ "composite",->
  @_composite

Player::__defineSetter__ "composite",(val)->
  @_composite = val
  @updatePoints()

Player::__defineGetter__ "compositePoint",->
  new Point (@x + @composite.x),(@y + @composite.y)

Player::__defineSetter__ "compositePoint",(val)->
  @_compositePoint = val

Player::__defineGetter__ "emitter",->
  @_emitter

Player::__defineSetter__ "emitter",(val)->
  @_emitter = val
  if @_emitter isnt undefined
    @updatePoints()
    @_emitter.createParticles()
  
Player::__defineGetter__ "emitterPoint",->
  new Point (@x + @emitter.x),(@y + @emitter.y)

Player::__defineSetter__ "emitterPoint",(val)->
  @_compositePoint = val

Player::__defineGetter__ "uniqueID",->
  @_uniqueID

Player::__defineSetter__ "uniqueID",(val)->
  @_uniqueID = val