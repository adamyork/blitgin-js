class RenderEngine
  constructor:(@name)->
        
  _actionObjects = []
  _scrn = {}
  _map = {}
  _player = {}
  _nis = {}
  _soundEngine = {}
  _collisionEngine = {}
  _physicsEngine = {}

  render:(input)->
    ctxMain = @scrn.getContext '2d'
    ctxMain.clearRect 0,0,Game::VIEWPORT_WIDTH,Game::VIEWPORT_HEIGHT  
    if @nis
      @manageNIS @nis,input
      return
    @managePlayer input
    @manageMap input
    @paint @map, @map.point
    @map.manageElements Map::MANAGE_ENEMIES
    for enemy in @map.activeEnemies
      @manageEnemy enemy
      @paint enemy,enemy.point
    #@manageNewActions input
    for action in _actionObjects
      if @actionIsIdle action
        continue
      @manageAction action
      @paint action,action.point
    for mapObj in @map.activeMapObjects
      mapObj.frame++
      @manageMapObject mapObj
      @paint mapObj,mapObj.point
    #@map.manageElements Map::MANAGE_MAP_OBJECTS
    #Render player on screen
    @paint @player,@player.point
    #Render player composites onto player.
    if @player.composite isnt undefined
      @player.composite.frame++
      @paint @player.composite,@player.compositePoint
    if @player.emitter isnt undefined and @player.emitter.hasParticles
      @player.emitter.frame++
      @paint @player.emitter,@player.point
    Game::instance.notifySubscribers @map,@player,@actionObjects

  paint:(obj,point)->
    ctxMain = @scrn.getContext '2d'
    d = obj.bitmapData
    if d.player
      ctxMain.drawImage d.player,d.rect.x,d.rect.y,d.rect.width,d.rect.height,obj.point.x,obj.point.y,d.rect.width,d.rect.height
    else
      for asset in d.map
        if asset.data isnt undefined
          ctxMain.drawImage asset.data,asset.rect.x,asset.rect.y,asset.rect.width,asset.rect.height,obj.point.x,obj.point.y,asset.rect.width,asset.rect.height

  managePlayer:(input)->
    #@manageJump input
    @physicsEngine.adjustPlayerVerically @player,@map
    if input.direction isnt 0
      @physicsEngine.applyPlayerInput @player,input
      @player.frame++
    else if (input.direction is 0) and (not @player.isBusy)
      @player.frame = 0
    # if @player.isBusy
      # @player.frame++
    @physicsEngine.adjustPlayerHorizontally @player,@map
    #@collisionEngine.checkVerticalMapCollision @player
    # @collisionEngine.checkHorizontalMapCollision()

# 
# protected function managePlayerState(action:Action, input:InputVO = null):void
# {
    # if(input)
    # {
        # manageJump(input);
    # }
# 
    # if(_player.state != action.state && !action.isAnimating && !action.hasAnimated &&
        # !_player.isBusy)
    # {
        # _player.state = action.state;
        # _player.isBusy = true;
        # action.isAnimating = true;
        # _player.frame++;
    # }
    # else if(_player.state != action.state && action.isAnimating)
    # {
        # action.isAnimating = false;
        # action.hasAnimated = true;
        # _player.isBusy = false;
    # }
    # else if(action.isAnimating && (_player.frame < action.state.duration))
    # {
        # _player.frame++;
    # }
# }
# 
# protected function manageJump(input:InputVO):void
# {
    # if(input.jump == 1 && input.jumpLock == false)
    # {
        # input.jumpLock = true;
        # _player.state = (_player.direction == 1) ? _player.jumpRight : _player.jumpLeft;
    # }
    # else if(input.jump == 0 && input.jumpLock && _player.velocityY == 0)
    # {
        # _player.state = (_player.direction == 1) ? _player.moveRight : _player.moveRight;
        # input.jumpLock = false;
    # }
# }
# 
  manageMap:(input)->
    @soundEngine.checkPlayback @map
    @physicsEngine.adjustMapVerically @map, @player
    #@manageNIS @map.checkForNIS(@player),input
# 
# protected function manageEnemy(enemy:Enemy):void
# {
    # enemy.frame++;
    # _physicsEngine.adjustEnemy(enemy, _player, _map);
    # _collisionEngine.checkVerticalMapCollision(enemy);
    # _collisionEngine.manageCollisions(enemy, _player);
# }
# 
# protected function manageNewActions(input:InputVO):void
# {
    # if(input.customKey != 0)
    # {
        # var clazz:Class = _player.getCustomActionForKey(input.customKey);
        # var action:Action = new clazz() as Action;
        # input.customKey = 0;
# 
        # if(!actionExists(action))
        # {
            # action.x += _player.x;
            # action.y += _player.y;
            # action.owner = Action.PLAYER;
            # action.direction = _player.direction;
            # _player.composite = action.composite;
            # _player.emitter = action.emitter;
            # _actionObjects.push(action);
            # _soundEngine.checkPlayback(action);
        # }
    # }
# }
# 
# protected function manageAction(action:Action):void
# {
    # action.frame++;
    # _physicsEngine.adjustAction(action, _map);
    # managePlayerState(action);
    # _collisionEngine.manageCollisions(action);
# }
# 
# protected function manageMapObject(mapObj:MapObject):void
# {
    # _physicsEngine.adjustMapObject(mapObj, _player, _map);
    # _collisionEngine.checkVerticalMapCollision(mapObj);
    # _collisionEngine.manageCollisions(mapObj, _player);
# }
# 
# protected function actionExists(action:Action):Boolean
# {
    # for each(var existing:Action in _actionObjects)
    # {
        # if(existing.id == action.id)
        # {
            # action = null;
            # return true;
        # }
    # }
    # return false;
# }
# 
# protected function actionIsIdle(action:Action):Boolean
# {
    # var idle:Boolean = false;
    # if(action.isComplete)
    # {
        # removeAction(action);
        # idle = true;
    # }
# 
    # if(action.nonObjectProducing && !action.isAnimating)
    # {
        # action.isAnimating = true;
        # _player.updateInherentStates(action);
        # idle = true
    # }
    # else if(action.nonObjectProducing && action.isAnimating)
    # {
        # action.frame++;
        # idle = true;
    # }
    # return idle;
# }
# 
# protected function removeAction(action:Action):void
# {
    # if(action.nonObjectProducing)
    # {
        # _player.updateInherentStates(null);
    # }
# 
    # var index:Number = _actionObjects.indexOf(action, 0);
    # var arr:Array = _actionObjects.splice(index, 1);
    # arr = null;
# 
    # if(action.composite && _player.composite == action.composite)
    # {
        # _player.composite = null;
    # }
# 
    # if(action.emitter && _player.emitter == action.emitter)
    # {
        # _player.emitter = null;
    # }
# 
    # if(action.sound)
    # {
        # _soundEngine.removeSound(action.sound);
    # }
# }
# 
# protected function manageNIS(nis:Nis, input:InputVO):void
# {
    # if(nis == null)
    # {
        # return;
    # }
# 
    # _nis = nis;
# 
    # if(!input.disabled)
    # {
        # input.disabled = true;
    # }
# 
    # if(_physicsEngine.manageNIS(nis, _player, _map))
    # {
        # trace("nis goal complete");
        # _map.removeNis(nis);
        # _nis = null;
        # input.disabled = false;
    # }
# 
    # paint(_map, _map.point);
    # paint(_player, _player.point);
# }

  dispose:->
    _actionObjects = undefined
    @scrn = undefined
    @map.dispose()
    @map = undefined
    @player.dispose()
    @player = undefined
    @soundEngine = undefined
    @collisionEngine = undefined

RenderEngine::__defineGetter__ "scrn",->
  @_scrn
  
RenderEngine::__defineSetter__ "scrn",(val)->
  @_scrn = val

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