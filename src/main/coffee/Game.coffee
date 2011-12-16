class Game
  constructor: () ->
    
  _subscribers = []
  
  _subscribers = undefined
  _pause = false
  _activeMap = 0
  _activePlayer = 0
  _customKey = 0
  _players = []
  _maps = []
  _leftKeys = []
  _rightKeys = []
  _upKeys = []
  _downKeys = []
  _jumpKeys = []
  _customKeys = []
  _parent = undefined
  _screen = undefined
  _renderEngineClass = undefined
  _collisionEngineClass = undefined
  _physicsEngineClass = undefined
  _renderEngine = undefined
  _soundEngine = undefined
  _movement = undefined
  _input = undefined
  
  render: ->
    if @_pause
        return;
    _renderEngine.render _input
    
  start: ->
    _stage.addEventListener(Event.ENTER_FRAME, render);
    
  dispose: -> 
    removeListeners()    
    _players = null
    _maps = null
    _leftKeys = null
    _rightKeys = null
    _upKeys = null
    _downKeys = null
    _jumpKeys = null
    _customKeys = null    
    _renderEngineClass = null
    _renderEngine.dispose()
    _soundEngine = null
    _movement = null
    _input = null
    _subscribers = null
    _screen = null
      
Game::__defineGetter__ "renderEngineClass", ->
  @_renderEngineClass

Game::__defineSetter__ "renderEngineClass", (val) ->
  @_renderEngineClass = val

Game::__defineGetter__ "collisionEngineClass", ->
  @_collisionEngineClass

Game::__defineSetter__ "collisionEngineClass", (val) ->
  @_collisionEngineClass = val

Game::__defineGetter__ "physicsEngineClass", ->
  @_physicsEngineClass

Game::__defineSetter__ "physicsEngineClass", (val) ->
  @_physicsEngineClass = value

Game::__defineGetter__ "players", ->
  @_players

Game::__defineSetter__ "players", (val) ->
  @_players = value

Game::__defineGetter__ "maps", ->
  @_maps

Game::__defineSetter__ "maps", (val) ->
  @_maps = value

Game::__defineGetter__ "activeMap", ->
  @_activeMap

Game::__defineSetter__ "activeMap", (val) ->
  @_activeMap = value

Game::__defineSetter__ "activePlayer", (val) ->
  @_activePlayer = value

Game::__defineGetter__ "activePlayer", ->
  @_activePlayer

Game::__defineGetter__ "leftKeys", ->
  @_leftKeys

Game::__defineSetter__ "leftKeys", (val) ->
  _leftKeys = value

Game::__defineGetter__ "rightKeys", ->
  @_rightKeys

Game::__defineSetter__ "rightKeys", (val) ->
  @_rightKeys = value

Game::__defineGetter__ "upKeys", ->
  @_upKeys

Game::__defineSetter__ "upKeys", (val) ->
  @_upKeys = value

Game::__defineGetter__ "downKeys", ->
  @_downKeys

Game::__defineSetter__ "downKeys", (val) ->
  @_downKeys = value

Game::__defineGetter__ "jumpKeys", ->
  @_jumpKeys

Game::__defineSetter__ "jumpKeys", (val) ->
  @_jumpKeys = value

Game::__defineGetter__ "customKeys", ->
  @_customKeys

Game::__defineSetter__ "customKeys", (val) ->
  @_customKeys = value

Game::__defineGetter__ "pause", ->
  @_pause

Game::__defineSetter__ "pause", (val) ->
  @_pause = value

  preinitialize: (parent, width, height) ->
  _parent = parent
  @ViewportHeight = height
  @ViewportWidth = width
  _screen = document.createElement("canvas")
  _screen.setAttribute "width", @ViewportWidth
  _screen.setAttribute "height", @ViewportHeight
  document.body.appendChild _screen
  initialize()
  
  initialize: ->
  if @_renderEngineClass == null
      _renderEngine = new RenderEngine()
  else
      _renderEngine = new _renderEngineClass()
  
  if @_collisionEngineClass == null
      _renderEngine.collisionEngine = new CollisionEngine()
  else
      _renderEngine.collisionEngine = new _collisionEngineClass()
  
  if @_physicsEngineClass == null
      _renderEngine.physicsEngine = new PhysicsEngine()
  else
      _renderEngine.physicsEngine = new _physicsEngineClass()
  
  if @_maps.length == 0
      console.log "Blitgin_as :: [ERROR] :: you need at least one map."
  
  if @_players.length == 0
      console.log "Blitgin_as :: [ERROR] :: you need at least one player."
  
  _soundEngine = new SoundEngine()
  _renderEngine.soundEngine = _soundEngine
  
  map = _maps[_activeMap]
  player= _players[_activePlayer]
  
  _renderEngine.screen = _screen
  _renderEngine.map = new map()
  _renderEngine.player = new player()
  
  _input = new InputVO();
  _input.direction = 0;
  _input.jump = 0;
  _input.jumpLock = false;
  _input.customKey = 0;
  
  addListeners()
    
  addListeners: ->
  _stage.addEventListener(KeyboardEvent.KEY_UP, manageMovement);
  _stage.addEventListener(KeyboardEvent.KEY_DOWN, manageMovement);

  _stage.removeEventListener(KeyboardEvent.KEY_UP, manageMovement);
  _stage.removeEventListener(KeyboardEvent.KEY_DOWN, manageMovement);
  
  removeListeners: ->
  
  
  manageMovement: ->
  if _input.disabled
    return
  
  if event.type == KeyboardEvent.KEY_UP
    _input.direction = if checkKeys(_leftKeys, event.keyCode) then 0 else _input.direction
    _input.direction = if checkKey(_rightKeys, event.keyCode) then 0 else _input.direction
    _input.vDirection = if checkKey(_upKeys, event.keyCode) then 0 else _input.vDirection
    _input.vDirection = if checkKey(_downKeys, event.keyCode) then 0 else _input.vDirection
    _input.jump = if checkKey(_jumpKeys, event.keyCode) then 0 else _input.jump
    _input.customKey = if checkKey(_customKeys, event.keyCode) then 0 else _input.customKey
  else
    _input.direction = if checkKey(_leftKeys, event.keyCode) then -1 else _input.direction
    _input.direction = if checkKey(_rightKeys, event.keyCode) then 1 else _input.direction
    _input.vDirection = if checkKey(_upKeys, event.keyCode) then -1 else _input.direction
    _input.vDirection = if checkKey(_downKeys, event.keyCode) then 1 else _input.direction
    _input.jump = if checkKey(_jumpKeys, event.keyCode) then 1 else _input.jump
  
  if checkKey(_customKeys, event.keyCode)
    _input.customKey = _customKeys[_customKey]

  checkKey: (arr, keyCode) ->
  index = arr.indexOf keyCode, 0
  _customKey = index
  return (index != -1);
