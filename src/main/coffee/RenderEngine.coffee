class RenderEngine
  constructor:(@name)->
    @actionObjects = []

  _scrn = {}
  _map = {}
  _player = {}
  _nis = {}
  _soundEngine = {}
  _collisionEngine = {}
  _physicsEngine = {}
  @_ctx = {}

  render:(input)->
    @_ctx.clearRect 0,0,Game::VIEWPORT_WIDTH,Game::VIEWPORT_HEIGHT  
    if @nis
      @manageNIS @nis,input
      return
    @managePlayer input
    @manageMap input
    @paint @map, @map.point
    @map.manageElements Map::MANAGE_ENEMIES
    for enemy of @map.activeEnemies
      @manageEnemy @map.activeEnemies[enemy]
      @paint @map.activeEnemies[enemy],enemy.point
    @manageNewActions input
    for action of @actionObjects
      aObj = @actionObjects[action]
      if @actionIsIdle aObj
        continue
      @manageAction aObj,input
      @paint aObj,aObj.point
    for mapObj of @map.activeMapObjects
      mObj = @map.activeMapObjects[mapObj]
      mObj.frame++
      @manageMapObject mObj
      @paint mObj,mObj.point
    @map.manageElements Map::MANAGE_MAP_OBJECTS
    @paint @player,@player.point
    if @player.composite isnt undefined
      @player.composite.frame++
      @paint @player.composite,@player.compositePoint
    if @player.emitter isnt undefined and @player.emitter.hasParticles
      @player.emitter.frame++
      @paint @player.emitter,@player.point
    input.manageWaits()
    Game::instance.notifySubscribers @map,@player,@actionObjects

  paint:(obj,point)->
    d = obj.bitmapData
    if d.player and d.player.notready is undefined
      @_ctx.drawImage d.player,d.rect.x,d.rect.y,d.rect.width,d.rect.height,obj.point.x,obj.point.y,d.rect.width,d.rect.height
    else if d.player and d.player.notready
      return
    else
      for asset in d.map
        if asset.data isnt undefined
          @_ctx.drawImage asset.data,asset.rect.x,asset.rect.y,asset.rect.width,asset.rect.height,obj.point.x,obj.point.y,asset.rect.width,asset.rect.height

  managePlayer:(input)->
    if input.customKey isnt 0 and (not input.hasWaitFor(input.customKey)) and @player.state.isCancellable
      #TODO this most like likely need to move a new function , like set back to previous state
      @player.updateInherentStates()
      @player.isBusy = false
    if input.direction isnt 0 and @player.state.isCancellable
      @player.updateInherentStates()
      @player.isBusy = false
    @manageJump input
    @physicsEngine.adjustPlayerVerically @player,@map
    if input.direction isnt 0
      @physicsEngine.applyPlayerInput @player,input
      @player.frame++
    else if (input.direction is 0) and (not @player.isBusy)
      @player.frame = 0
    if @player.isBusy
      @player.frame++
    @physicsEngine.adjustPlayerHorizontally @player,@map
    @collisionEngine.checkVerticalMapCollision @player
    @collisionEngine.checkHorizontalMapCollision()

  manageJump:(input)->
    if (input.jump is 1) and (input.jumpLock is false)
      input.jumpLock = true
      @player.state = if (@player.direction is 1) then @player.jumpRight else @player.jumpLeft
    else if (input.jump is 0) and (input.jumpLock) and (@player.velocityY is 0)
      @player.state = if (@player.direction is 1) then @player.moveRight else @player.moveLeft
      input.jumpLock = false

  manageMap:(input)->
    @soundEngine.checkPlayback @map
    @physicsEngine.adjustMapVerically @map, @player
    #@manageNIS @map.checkForNIS(@player),input

  manageEnemy:(enemy)->
    enemy.frame++
    @physicsEngine.adjustEnemy enemy,@player,@map
    @collisionEngine.checkVerticalMapCollision enemy
    @collisionEngine.manageCollisions enemy,@player
    
  manageNewActions:(input)->
    if input.customKey isnt 0
      if input.hasWaitFor(input.customKey)
        input.customKey = 0
        return
      clazz = @player.getCustomActionForKey input.customKey
      action = new clazz()
      if not @actionExists(action)
        action.x += @player.x
        action.y += @player.y
        action.frame = 0
        action.owner = Action::PLAYER
        action.direction = @player.direction
        action.hasAnimated = false
        action.isAnimating = false
        @player.composite = action.composite
        @player.emitter = action.emitter
        if action.spammable
          input.addWaitForAction(input.customKey,action.wait)
          action.id = action.id + @actionObjects.length
        @actionObjects.push action
        @soundEngine.checkPlayback action
      input.customKey = 0

  manageAction:(action,input)->
    action.frame++
    @physicsEngine.adjustAction action,@map
    @managePlayerState action,input
    @collisionEngine.manageCollisions action

  managePlayerState:(action,input)->
    if input
      @manageJump input
    if @player.state isnt action.state and action.isAnimating is false and action.hasAnimated is false and @player.isBusy is false
      @player.state = action.state
      @player.isBusy = true
      action.isAnimating = true
      @player.frame++
    else if @player.state isnt action.state and action.isAnimating
      action.isAnimating = false
      action.hasAnimated = true
      @player.isBusy = false
    else if action.isAnimating and @player.frame < action.state.duration
      @player.frame++

  manageMapObject:(mapObj)->
    @physicsEngine.adjustMapObject mapObj,@player,@map
    @collisionEngine.checkVerticalMapCollision mapObj
    @collisionEngine.manageCollisions mapObj,@player

  actionExists:(action)->
    for existing in @actionObjects
      if existing.id is action.id
        action = undefined
        return true
    false

  actionIsIdle:(action)->
    idle = false
    if action.isComplete
      @removeAction action
      idle = true
    if action.nonObjectProducing and action.isAnimating is false
      action.isAnimating = true
      @player.updateInherentStates action
      idle = true
    else if action.nonObjectProducing and action.isAnimating
      action.frame++
      idle = true
    idle

  removeAction:(action)->
    if action.nonObjectProducing
      @player.updateInherentStates()
    index = @actionObjects.indexOf action,0
    arr = @actionObjects.splice index,1
    arr = undefined
    if action.composite and @player.composite is action.composite
      @player.composite = undefined
    if action.emitter and @player.emitter is action.emitter
      @player.emitter = undefined
    if action.sound
      @soundEngine.removeSound action.sound

  manageNIS:(nis,input)->
    if nis is undefined
      return      
    @_nis = nis
    if not input.disabled
      input.disabled = true
    if @physicsEngine.manageNIS nis,@player,@map
      @map.removeNis(nis)
      @_nis = null
      input.disabled = false
    @paint @map,@map.point
    @paint @player,@player.point

  dispose:->
    @actionObjects = undefined
    @scrn = undefined
    @map.dispose()
    @map = undefined
    @player.dispose()
    @player = undefined
    @soundEngine = undefined
    @collisionEngine = undefined

RenderEngine::name = "RenderEngine"

RenderEngine::__defineGetter__ "scrn",->
  @_scrn
  
RenderEngine::__defineSetter__ "scrn",(val)->
  @_scrn = val
  @_ctx = @scrn.getContext '2d'

RenderEngine::__defineGetter__ "map",->
  @_map

RenderEngine::__defineSetter__ "map",(val)->
  if @_map
    @soundEngine.removeSound @_map.sound
  @collisionEngine.map = val
  @_map = val

RenderEngine::__defineGetter__ "player",->
  @_player

RenderEngine::__defineSetter__ "player",(val)->
  @collisionEngine.player = val
  @_player = val

RenderEngine::__defineGetter__ "soundEngine",->
  @_soundEngine

RenderEngine::__defineSetter__ "soundEngine",(val)->
  @_soundEngine = val

RenderEngine::__defineGetter__ "collisionEngine",->
  @_collisionEngine

RenderEngine::__defineSetter__ "collisionEngine",(val)->
  @_collisionEngine = val
    
RenderEngine::__defineGetter__ "physicsEngine",->
  @_physicsEngine

RenderEngine::__defineSetter__ "physicsEngine",(val)->
  @_physicsEngine = val
  @collisionEngine.physicsEngine = val