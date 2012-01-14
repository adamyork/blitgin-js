class Game
  constructor:(@name)->
    Game::instance = @
    @keyboard = new Keyboard()
   
  _subscribers = []
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
  _parent = {}
  _screen = {}
  _renderEngineClass = {}
  _collisionEngineClass = {}
  _physicsEngineClass = {}
  _renderEngine = {}
  _soundEngine = {}
  _movement = {}
  _input = {}
  _timer = {}
  _instance = {}
  
  render: ->
    if @_pause
        return
    window.mozRequestAnimationFrame _renderEngine.render(_input)
    
  start: ->
    _timer = setInterval @render.bind(this) , 80

  preinitialize: (parent, width, height) ->
    _parent = parent
    Game::VIEWPORT_HEIGHT = height
    Game::VIEWPORT_WIDTH = width
    _screen = document.createElement "canvas"
    _screen.setAttribute "width", @VIEWPORT_WIDTH
    _screen.setAttribute "height", @VIEWPORT_HEIGHT
    _screen.setAttribute "tabIndex", 0
    document.body.appendChild _screen
    @initialize()
  
  initialize: ->
    if !@renderEngineClass
        _renderEngine = new RenderEngine()
    else
        _renderEngine = new _renderEngineClass()
    
    if !@collisionEngineClass
        _renderEngine.collisionEngine = new CollisionEngine()
    else
        _renderEngine.collisionEngine = new _collisionEngineClass()
    
    if !@physicsEngineClass
        _renderEngine.physicsEngine = new PhysicsEngine()
    else
        _renderEngine.physicsEngine = new _physicsEngineClass()
    
    if @maps.length == 0
        console.log "Blitgin_as :: [ERROR] :: you need at least one map."
    
    if @players.length == 0
        console.log "Blitgin_as :: [ERROR] :: you need at least one player."
    
    _soundEngine = new SoundEngine()
    _renderEngine.soundEngine = _soundEngine
    
    map = @maps[_activeMap]
    player= @players[_activePlayer]
    
    _renderEngine.scrn = _screen
    _renderEngine.map = new map()
    _renderEngine.player = new player()
    
    _input = new Input();
    _input.direction = 0;
    _input.jump = 0;
    _input.jumpLock = false;
    _input.customKey = 0;
    
    @addListeners()
    
  addListeners: ->
    document.onkeydown = @manageMovement.bind(this)
    document.onkeyup = @manageMovement.bind(this)
    _screen.focus()
  
  removeListeners: ->  
    document.onkeydown = undefined
    document.onkeyup = undefined
        
  manageMovement: (e) ->
    if _input.disabled
      return
      
    if window.event
      key = window.event.keyCode
    else    
      key = e.keyCode

    if e.type == Keyboard::KEY_UP
      _input.direction = if @checkKey(@leftKeys, key) then 0 else _input.direction
      _input.direction = if @checkKey(@rightKeys, key) then 0 else _input.direction
      _input.vDirection = if @checkKey(@upKeys, key) then 0 else _input.vDirection
      _input.vDirection = if @checkKey(@downKeys, key) then 0 else _input.vDirection
      _input.jump = if @checkKey(@jumpKeys, key) then 0 else _input.jump
      _input.customKey = if @checkKey(@customKeys, key) then 0 else _input.customKey
    else
      _input.direction = if @checkKey(@leftKeys, key) then -1 else _input.direction
      _input.direction = if @checkKey(@rightKeys, key) then 1 else _input.direction
      _input.vDirection = if @checkKey(@upKeys, key) then -1 else _input.direction
      _input.vDirection = if @checkKey(@downKeys, key) then 1 else _input.direction
      _input.jump = if @checkKey(@jumpKeys, key) then 1 else _input.jump
    
    if @checkKey _customKeys, key
      _input.customKey = _customKeys[_customKey]

  checkKey: (arr, keyCode) ->
    if !arr
      return
    index = arr.indexOf keyCode, 0
    _customKey = index
    (index != -1)
  
  dispose: ->
    removeListeners()

    @players = undefined
    @maps = undefined
    @leftKeys = undefined
    @rightKeys = undefined
    @upKeys = undefined
    @downKeys = undefined
    @jumpKeys = undefined
    @customKeys = undefined
    
    @renderEngineClass = undefined
    @renderEngine.dispose();
    _soundEngine = undefined
    _movement = undefined
    _input = undefined
    _subscribers = undefined
    _screen = undefined

  notifySubscribers:(map,player,actions)->
    subscriber.notify(map, player, actions) for subscriber in _subscribers

  subscribe:(subscriber)->
    _subscribers.push(subscriber)

  unsubscribe:(subscriber)->
    _subscribers[_subscribers.indexOf(subscriber).._subscribers.indexOf(subscriber)]
    
Game::__defineGetter__ "instance",->
  @_instance

Game::__defineSetter__ "instance",(val)->
  @_instance = val
            
Game::__defineGetter__ "renderEngineClass",->
  @_renderEngineClass

Game::__defineSetter__ "renderEngineClass",(val)->
  @_renderEngineClass = val

Game::__defineGetter__ "collisionEngineClass",->
  @_collisionEngineClass

Game::__defineSetter__ "collisionEngineClass",(val)->
  @_collisionEngineClass = val

Game::__defineGetter__ "physicsEngineClass",->
  @_physicsEngineClass

Game::__defineSetter__ "physicsEngineClass",(val)->
  @_physicsEngineClass = val

Game::__defineGetter__ "players",->
  @_players

Game::__defineSetter__ "players",(val)->
  @_players = val

Game::__defineGetter__ "maps",->
  @_maps

Game::__defineSetter__ "maps",(val)->
  @_maps = val

Game::__defineGetter__ "activeMap",->
  @_activeMap

Game::__defineSetter__ "activeMap",(val)->
  @_activeMap = val

Game::__defineSetter__ "activePlayer",(val)->
  @_activePlayer = val

Game::__defineGetter__ "activePlayer",->
  @_activePlayer

Game::__defineGetter__ "leftKeys",->
  @_leftKeys

Game::__defineSetter__ "leftKeys",(val)->
  @_leftKeys = val

Game::__defineGetter__ "rightKeys",->
  @_rightKeys

Game::__defineSetter__ "rightKeys",(val)->
  @_rightKeys = val

Game::__defineGetter__ "upKeys",->
  @_upKeys

Game::__defineSetter__ "upKeys",(val)->
  @_upKeys = val

Game::__defineGetter__ "downKeys",->
  @_downKeys

Game::__defineSetter__ "downKeys",(val)->
  @_downKeys = val

Game::__defineGetter__ "jumpKeys",->
  @_jumpKeys

Game::__defineSetter__ "jumpKeys",(val)->
  @_jumpKeys = val

Game::__defineGetter__ "customKeys",->
  @_customKeys

Game::__defineSetter__ "customKeys",(val)->
  @_customKeys = val

Game::__defineGetter__ "pause",->
  @_pause

Game::__defineSetter__ "pause",(val)->
  @_pause = val
  
Game::__defineGetter__ "keyboard",->
  @_keyboard

Game::__defineSetter__ "keyboard",(val)->
  @_keyboard = val
