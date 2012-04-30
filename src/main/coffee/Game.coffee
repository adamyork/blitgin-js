class Game
  constructor:(@name)->
    Game::instance = @
    @keyboard = new Keyboard()
    @setAnimationFrameRequest()
    @_requiredAssets = 0
    @_useMultipleCanvas = false
    @_frameWait = 0
    @_socketReady = false
    @_socketFrame = 0
    @_framerateBuffer = 2
    @_currentFrame = 0
   
  _subscribers = []
  _pause = false
  _isStarted = false
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
  _fgscreen = undefined
  _renderEngineClass = {}
  _collisionEngineClass = {}
  _physicsEngineClass = {}
  _renderEngine = {}
  _soundEngine = {}
  _movement = {}
  _input = {}
  _timer = {}
  _instance = {}
  _animationFrameRequest = {}
  _toFetchAssets = 0
  _requiredAssets = 0
  _prefetchTmp = []
  _container = {}
  _useMultipleCanvas = false
  _frameWait = 0
  _server = {}
  _socket = {}
  _socketReady = false
  _socketFrame = 0
  _framerateBuffer = 2
  _currentFrame = 0
  
  render:(timestamp)->
    _animationFrameRequest @render.bind @
    if @_currentFrame isnt @_framerateBuffer
      @_currentFrame++
      return
    delta = Date.now() - @_start
    if delta is NaN or delta is undefined
      delta = 0
    Game::DeltaTime = 1 + ((((delta * 1000) - 32 ) / 32 ) / 1000)
    _renderEngine.render _input
    @_start = Date.now()
    @_currentFrame = 0
    
  renderDelegate:->
    if @_pause
        return
    if _animationFrameRequest
      @_start = Date.now()
      @_currentFrame = 0
      @render()
      #_animationFrameRequest @render.bind @
    else
      _renderEngine.render _input

  setAnimationFrameRequest:->
    w = window
    _animationFrameRequest = w.requestAnimationFrame or w.webkitRequestAnimationFrame or w.mozRequestAnimationFrame or w.oRequestAnimationFrame or w.msRequestAnimationFrame
    
  start: ->
    if not _isStarted
      #_timer = setInterval @renderDelegate.bind(@) , 84
      @renderDelegate()
      _isStarted = true
  
  prefetch:(items)->
    @_toFetchAssets = 0
    @_prefetchTmp = []
    for item in items
      tmp = new item()
      @_prefetchTmp.push tmp
      if tmp.assetClass
        @_requiredAssets++
        @_toFetchAssets++
        img = new Image()
        @_prefetchTmp.push img
        img.onload = @handleImagePrefetch.bind @
        img.src = tmp.assetClass
      if tmp.sound
        @_toFetchAssets++
        @_requiredAssets++
        audio = new Audio()
        @_prefetchTmp.push audio
        audio.addEventListener 'canplaythrough',@handleAudioPrefetch.bind(@),false
        audio.src = tmp.sound
        if Bootstrap::IS_IE
          @handleAudioPrefetch {currentTarget:audio}
  
  handleImagePrefetch:->
    @_toFetchAssets--
    if @_toFetchAssets is 0
      @_prefetchTmp = []
      @checkForReady()
    else
      @_requiredAssets--
  
  handleAudioPrefetch:(e)->
    index = @_prefetchTmp.indexOf e.currentTarget,0
    if index >= 0
      @_prefetchTmp.splice index,index+1
      @handleImagePrefetch()
      
  checkForReady:->
    @_requiredAssets--
    if @_requiredAssets is 0
      Game::instance.notifySubscribers Game::Ready,{},{},[]

  preinitialize: (parent, width, height) ->
    _parent = parent
    Game::VIEWPORT_HEIGHT = height
    Game::VIEWPORT_WIDTH = width
    holder = if @container then @container else document.body 
    _screen = document.createElement "canvas"
    _screen.setAttribute "width", @VIEWPORT_WIDTH
    _screen.setAttribute "height", @VIEWPORT_HEIGHT
    _screen.setAttribute "tabIndex", 0
    _screen.setAttribute "id", "scrn"
    if @useMultipleCanvas
      _screen.setAttribute "style","position: absolute; z-index: 0"
    holder.appendChild _screen
    if @useMultipleCanvas
      _fgscreen = document.createElement "canvas"
      _fgscreen.setAttribute "width", @VIEWPORT_WIDTH
      _fgscreen.setAttribute "height", @VIEWPORT_HEIGHT
      _fgscreen.setAttribute "tabIndex", 1
      _fgscreen.setAttribute "id", "fgscrn"
      _fgscreen.setAttribute "style","position: absolute; z-index: 1"
      holder.appendChild _fgscreen
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
        GameError.warn  "you need at least one map."
    
    if @players.length == 0
        GameError.warn  "you need at least one player."
    
    _soundEngine = new SoundEngine()
    _renderEngine.soundEngine = _soundEngine
    
    map = @maps[_activeMap]
    player= @players[_activePlayer]
    
    _renderEngine.scrn = _screen
    _renderEngine.fgscrn = _fgscreen
    _renderEngine.map = new map()
    _renderEngine.player = new player()
    _renderEngine.frameWait = @frameWait
    
    if _renderEngine.map.platform
      @_requiredAssets += Map::TOTAL_PARALAX_ASSETS - 1
    else 
      @_requiredAssets += Map::TOTAL_STANDARD_ASSETS - 1
    
    #This is for the player asset that must exist
    @_requiredAssets += 1
    
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
    
    if @checkKey @customKeys, key
      _input.customKey = @customKeys[_customKey]

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

  notifySubscribers:(event,map,player,actions)->
    if @_socketReady and @_socketFrame is @_server.sendEvery
      console.log "met sending"
      @_socket.send JSON.stringify(@_server.msgTransform(event,map,player,actions))
      @_socketFrame = 0
    if @_socketReady then @_socketFrame++
    subscriber.notify(event,map, player, actions) for subscriber in _subscribers

  subscribe:(subscriber)->
    _subscribers.push(subscriber)

  unsubscribe:(subscriber)->
    _subscribers[_subscribers.indexOf(subscriber).._subscribers.indexOf(subscriber)]
  
  handleSocketMessage:(e)->
    #TODO handle game state validation here
    console.log "msg from server"
    console.log "msg type" + e.type
    console.log "msg origin " + e.origin
    console.log "msg timestamp " + e.timeStamp
    console.log "msg data " + e.data
  
  closeSocket:->
    if @_socket then @_socket.close()

Game::name = "Game"
Game::Ready = "Ready"
Game::Rendered = "Rendered"

Game::__defineGetter__ "server",->
  @_server

Game::__defineSetter__ "server",(val)->
  try
    WebSocket
  catch error
    GameError.warn "WebSockets are not supported by this client"
    return
  ref = @
  @_server = val
  @_socket = new WebSocket(@_server.address)
  @_socket.onopen = (e)->
    ref._socketReady = true
  @_socket.onmessage = @handleSocketMessage.bind @

            
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

Game::__defineGetter__ "container",->
  @_container

Game::__defineSetter__ "container",(val)->
  @_container = val

Game::__defineGetter__ "useMultipleCanvas",->
  @_useMultipleCanvas

Game::__defineSetter__ "useMultipleCanvas",(val)->
  @_useMultipleCanvas = val
  
Game::__defineGetter__ "frameWait",->
  @_frameWait

Game::__defineSetter__ "frameWait",(val)->
  @_frameWait = val