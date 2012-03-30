class Map extends RenderObject
  constructor:(@name)->
    
  _paralaxing = false
  _platform = false
  _showCollisionMap = false
  _assetsLoaded = 0
  _initializeComplete = false
  
  _gravity = 10
  _friction = .25
  
  _enemies = []
  _mapObjects = []
  _nis = []
  
  _activeEnemies = {}
  _inactiveEnemies = {}
  _activeMapObjects = {}
  _inactiveMapObjects = {}
  
  _backgroundAssetClass = {}
  _midgroundAssetClass = {}
  _foregroundAssetClass = {}
  _collisionAssetClass = {}
  
  _backgroundAsset = {}
  _midgroundAsset = {}
  _foregroundAsset = {}
  _collisionAsset = {}
  
  _backgroundData = {}
  _midgroundData = {}
  _foregroundData = {}
  _collisionData = {}
  
  _sound = undefined
  _soundLoops = 0

  initialize: ->
    @workbench = document.createElement "canvas"
    @ctx = @workbench.getContext '2d'
    if @paralaxing
      if (undefined != @backgroundAssetClass && undefined != @midgroundAssetClass && undefined !=
          @foregroundAssetClass && undefined != @collisionAssetClass && undefined != @enemies &&
          undefined != @mapObjects)
        @initializeAssets()
      else
        console.log "Maps using paraxling require 3 assets and a collection of enemies."
    else
      if(undefined != @foregroundAssetClass && undefined != @enemies && undefined != @collisionAssetClass)
        @initializeAssets()
      else
        console.log "Maps require a foreground , collision asset , and a collection of enemies."

  initializeAssets: ->
    if @paralaxing
      @backgroundAsset = new Image()
      @backgroundAsset.onload = @imageLoadComplete.bind this
      @backgroundAsset.src = @backgroundAssetClass
      @backgroundData = new Image()
      
      @midgroundAsset = new Image()
      @midgroundAsset.onload = @imageLoadComplete.bind this
      @midgroundAsset.src = @midgroundAssetClass
      @midgroundData = new Image()

    @foregroundAsset = new Image()
    @foregroundAsset.onload = @imageLoadComplete.bind this
    @foregroundAsset.src = @foregroundAssetClass

    @collisionAsset = new Image()
    @collisionAsset.onload = @imageLoadComplete.bind this
    @collisionAsset.src = @collisionAssetClass

    @foregroundData = new Image()
    @collisionData = new Image()
  
  imageLoadComplete:(e)->
    _assetsLoaded++
    if @paralaxing
      if _assetsLoaded is Map::TOTAL_PARALAX_ASSETS
        @removeColorConstantAndCache @backgroundAsset,@backgroundData
        @removeColorConstantAndCache @midgroundAsset,@midgroundData
        @removeColorConstantAndCache @foregroundAsset,@foregroundData
        @removeColorConstantAndCache @collisionAsset,@collisionData,true
        @finalize()
    else
      if _assetsLoaded is Map::TOTAL_STANDARD_ASSETS
        @removeColorConstantAndCache @foregroundAsset,@foregroundData
        @removeColorConstantAndCache @collisionAsset,@collisionData,true
        @finalize()
        
  finalize:->
    @_initializeComplete = true
    @x = 0
    @y = 0
    @activeEnemies = []
    @activeMapObjects = []

  manageElements:(type)->
    inactiveTargets = {}
    activeTargets = {}
    targetArray = if (type == Map::MANAGE_ENEMIES) then @enemies else @mapObjects;
    inactiveTargets = if (type == Map::MANAGE_ENEMIES) then _inactiveEnemies else _inactiveMapObjects
    activeTargets = if (type == Map::MANAGE_ENEMIES) then @_activeEnemies else @_activeMapObjects
  
    for group in targetArray
      for position,j in group.positions
        key = @generateKey group,j
        target = activeTargets[key]

        obj = {}
        posX = if target then target.mapX else group.positions[j].x
        posY = if target then target.mapY else group.positions[j].y
        vw = Game::VIEWPORT_WIDTH
        vh = Game::VIEWPORT_HEIGHT

        if inactiveTargets[key]
          return

        indep = group.independence

        if target is undefined
          if(@isEnemyOnScreen posX,posY,vw,vh,indep)
            enemy = group.type
            obj = new enemy()
            obj.mapX = posX
            obj.mapY = posY
            obj.screenX = posX - @x
            obj.screenY = obj.mapY - @y - @gravity
            obj.uniqueID = key
            activeTargets[obj.uniqueID] = obj
        else if target
          enemyOffScreen = !(@isEnemyOnScreen posX,posY,vw,vh,indep)
          if enemyOffScreen or target.isDead
            delete activeTargets[target.uniqueID]
          if(target.isDead)
              inactiveTargets[target.uniqueID] = true

  generateKey:(group,i)->
    return group.type::name + "" + group.positions[i].x + "" + group.positions[i].y + "" + i

  isEnemyOnScreen:(posX,posY,vw,vh,indep)->
    hBounds = (((posX - indep) - @x) - vw) <= 0 && (((posX + indep) - @x) - vw) >= -(vw)
    vBounds = (((posY + indep) - @y) - vh) <= 0 && (((posY - indep) - @y) - vh) >= -(vh)
    return (hBounds && vBounds)

  checkForNIS:(player)->
    if (player == undefined)
      return undefined

    for nis in _nis
      nis.player = player
      nis.enemies = []
      nis.map = this
      if (nis.conditionsMet)
        return nis
    return undefined

  removeNis:(nis)->
    index = _nis.indexOf nis, 0 
    arr = _nis.splice index, 1
    arr = undefined
        
  dispose:->
    @backgroundAssetClass = undefined
    @midgroundAssetClass = undefined
    @foregroundAssetClass = undefined
  
    @backgroundAsset = undefined
    @midgroundAsset = undefined
    @foregroundAsset = undefined

    @midgroundData = undefined
    @foregroundData = undefined
  
    _enemies = undefined
    _mapObjects = undefined
  
    _activeEnemies = undefined
    _inactiveEnemies = undefined
    _activeMapObjects = undefined
    _inactiveMapObjects = undefined
    
  buildDataVO:(img,rect)->
    tmp = {}
    tmp.data = img
    tmp.rect = rect
    tmp.name = name
    tmp
    
  collisionDataPixel:(x,y)->
    index = 4 * (y * @collisionData.width + x)
    @collisionPixels.data[index+3]

Map::name = "Map"
  
Map::__defineGetter__ "bitmapData",->
  if @_initializeComplete
    @ctx.clearRect 0,0,@workbench.width,@workbench.height
    yPos = if @platform then @_y else 0
    vh = Game::VIEWPORT_HEIGHT
    vw = Game::VIEWPORT_WIDTH
    bg = {}
    mid = {}
    fg = {}
    cd = {}
    if(@paralaxing)
      bg = @buildDataVO @backgroundData,new Rectangle(Math.round(@_x*.25),yPos,vw,vh)
      mid = @buildDataVO @midgroundData,new Rectangle(Math.round(@_x*.5),yPos,vw,vh)
    else
      fg = @buildDataVO @foregroundData,new Rectangle(@_x,yPos,vw,vh)
    if(@showCollisionMap)
      cd = @buildDataVO @collisionData,new Rectangle(@_x,yPos,vw,vh)
    {map:[bg,mid,fg,cd]}
  else
    console.log 'You cannot start the game yet. Map assets are not loaded.'

Map::__defineGetter__ "x",->
  @_x

Map::__defineSetter__ "x",(val)->
  if (val >= 0) and (val <= @foregroundAsset.width - Game::VIEWPORT_WIDTH)
    @_x = val
  else if (val < 0)
    @_x = 0
  else if (val > 0)
    @_x = (@foregroundAsset.width - Game::VIEWPORT_WIDTH)

Map::__defineGetter__ "y",->
  @_y

Map::__defineSetter__ "y",(val)->
  if (val >= @collisionData.height - Game::VIEWPORT_HEIGHT)
    @_y = @collisionData.height - Game::VIEWPORT_HEIGHT
    return
  if (val < 0)
    @_y = 0
    return
  @_y = val

Map::__defineGetter__ "backgroundAssetClass",->
  @_backgroundAssetClass

Map::__defineSetter__ "backgroundAssetClass",(val)->
  @_backgroundAssetClass = val

Map::__defineGetter__ "midgroundAssetClass",->
  @_midgroundAssetClass

Map::__defineSetter__ "midgroundAssetClass",(val)->
  @_midgroundAssetClass = val

Map::__defineGetter__ "foregroundAssetClass",->
  @_foregroundAssetClass

Map::__defineSetter__ "foregroundAssetClass",(val)->
  @_foregroundAssetClass = val

Map::__defineGetter__ "collisionAssetClass",->
  @_collisionAssetClass

Map::__defineSetter__ "collisionAssetClass",(val)->
  @_collisionAssetClass = val

Map::__defineGetter__ "backgroundAsset",->
  @_backgroundAsset

Map::__defineSetter__ "backgroundAsset",(val)->
  @_backgroundAsset = val

Map::__defineGetter__ "midgroundAsset",->
  @_midgroundAsset

Map::__defineSetter__ "midgroundAsset",(val)->
  @_midgroundAsset = val

Map::__defineGetter__ "foregroundAsset",->
  @_foregroundAsset

Map::__defineSetter__ "foregroundAsset",(val)->
  @_foregroundAsset = val

Map::__defineGetter__ "collisionAsset",->
  @_collisionAsset

Map::__defineSetter__ "collisionAsset",(val)->
  @_collisionAsset = val

Map::__defineGetter__ "paralaxing",->
  @_paralaxing

Map::__defineSetter__ "paralaxing",(val)->
  @_paralaxing = val

Map::__defineGetter__ "showCollisionMap",->
  @_showCollisionMap

Map::__defineSetter__ "showCollisionMap",(val)->
  @_showCollisionMap = val

Map::__defineGetter__ "platform",->
  @_platform

Map::__defineSetter__ "platform",(val)->
  @_platform = val

Map::__defineGetter__ "enemies",->
  @_enemies

Map::__defineSetter__ "enemies",(val)->
  @_enemies = val

Map::__defineGetter__ "nis",->
  @_nis

Map::__defineSetter__ "nis",(val)->
  @_nis = val

Map::__defineSetter__ "mapObjects",(val)->
  @_mapObjects = val

Map::__defineGetter__ "mapObjects",->
  @_mapObjects
  
Map::__defineSetter__ "activeMapObjects",(val)->
  @_activeMapObjects = val

Map::__defineGetter__ "activeMapObjects",->
  @_activeMapObjects

Map::__defineGetter__ "activeEnemies",->
  @_activeEnemies
  
Map::__defineSetter__ "activeEnemies",(val)->
  @_activeEnemies = val

Map::__defineGetter__ "width",->
  @_foregroundAsset.width

Map::__defineGetter__ "collisionData",->
  @_collisionData

Map::__defineSetter__ "collisionData",(val)->
  @_collisionData = val

Map::__defineGetter__ "foregroundData",->
  @_foregroundData

Map::__defineSetter__ "foregroundData",(val)->
  @_foregroundData = val

Map::__defineSetter__ "gravity",(val)->
  @_gravity = val

Map::__defineGetter__ "gravity",->
  @_gravity;

Map::__defineSetter__ "friction",(val)->
  @_friction = val

Map::__defineGetter__ "friction",->
  @_friction
    
Map::__defineGetter__ "rect",->
  new Rectangle 0,0,Game::VIEWPORT_WIDTH,Game::VIEWPORT_HEIGHT

Map::__defineGetter__ "point",->
  new Point(0, 0);

Map::__defineGetter__ "sound",->
  @_sound

Map::__defineSetter__ "sound",(val)->
  @_sound = val

Map::__defineGetter__ "soundLoops",->
  @_soundLoops

Map::__defineSetter__ "soundLoops",(val)->
  @_soundLoops = val

Map::MANAGE_ENEMIES = "manageEnemies"
Map::MANAGE_MAP_OBJECTS = "manageMapObjects"
Map::TOTAL_STANDARD_ASSETS = 2
Map::TOTAL_PARALAX_ASSETS = 4