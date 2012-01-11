class Map extends RenderObject
  constructor: (@name) ->
    
  _paralaxing = false
  _platform = false
  _showCollisionMap = false
  _assetsLoaded = 0
  
  _gravity = 10
  _friction = .25
  
  _enemies = []
  _mapObjects = []
  _nis = []
  
  _activeEnemies = []
  _inactiveEnemies = []
  _activeMapObjects = []
  _inactiveMapObjects = []
  
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
  
  _sound = {}
  _soundLoops = 0
  
  initialize: ->
    @workbench = document.createElement "canvas"
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
      @backgroundData = new Image()
      @midgroundAsset = new Image()
      @midgroundData = new Image()

    @foregroundAsset = new Image()
    @foregroundAsset.onload = @imageLoadComplete.bind this
    @foregroundAsset.src = @foregroundAssetClass
    @collisionAsset = new Image()
    @collisionAsset.onload = @imageLoadComplete.bind this
    @collisionAsset.src = @collisionAssetClass

    @foregroundData = new Image()
    @collisionData = new Image()
    
    @x = 0
    @y = 0
  
  imageLoadComplete: (e) ->
    _assetsLoaded++
    if @paralaxing
      if _assetsLoaded is Map::TOTAL_PARALAX_ASSETS
        @removeBlackAndCache @backgroundAsset, @bacgroundData
        @removeBlackAndCache @midgroundAsset, @midgroundData
        @removeBlackAndCache @foregroundAsset, @foregroundData
        @removeBlackAndCache @collisionAsset, @collisionData
    else
       if _assetsLoaded is Map::TOTAL_STANDARD_ASSETS
        @removeBlackAndCache @foregroundAsset, @foregroundData
        @removeBlackAndCache @collisionAsset, @collisionData

  manageElements: (type) ->
    targetArray = if (type == Map::MANAGE_ENEMIES) then @_enemies else @_mapObjects;
    inactiveTargets = if (type == Map::MANAGE_ENEMIES) then @_inactiveEnemies else @_inactiveMapObjects
    activeTargets = if (type == Map::MANAGE_ENEMIES) then _activeEnemies else @_activeMapObjects
  
    for group in targetArray
      for i in group.positions
        key = @generateKey group, i
        target = activeTargets[key]

        obj = {}
        posX = if target then target.mapX else group.positions[i].x
        posY = if target then target.mapY else group.positions[i].y
        vw = Game::VIEWPORT_WIDTH
        vh = Game::VIEWPORT_HEIGHT

        if(inactiveTargets[(posX + posY)])
          return

        indep = group.independence

        if(target == undefined)
          if(@sEnemyOnScreen posX, posY, vw, vh, indep)
            enemy = group.type
            obj = new enemy()
            obj.mapX = posX
            obj.mapY = posY
            obj.screenX = posX - x
            obj.screenY = obj.mapY - y - gravity
            obj.uniqueID = key
            activeTargets[obj.uniqueID] = obj
        else if(target)
          if(!@isEnemyOnScreen posX, posY, vw, vh, indep || target.isDead)
            delete activeTargets[target.uniqueID]
          if(target.isDead)
              inactiveTargets[target.uniqueID] = true

  generateKey: (group, i) ->
    return group.type + "" + group.positions[i].x + "" + group.positions[i].y + "" + i

  isEnemyOnScreen: (posX, posY, vw, vh, indep) ->
    hBounds = (((posX - indep) - x) - vw) <= 0 && (((posX + indep) - x) - vw) >= -(vw)
    vBounds = (((posY + indep) - y) - vh) <= 0 && (((posY - indep) - y) - vh) >= -(vh)
    return (hBounds && vBounds)

  removeBlackAndCache: (asset, targetData) ->
    @workbench.width = asset.width
    @workbench.height = asset.height
    ctx = @workbench.getContext '2d'
    ctx.drawImage asset,0,0
    imageData = ctx.getImageData 0, 0, @workbench.width, @workbench.height

    for xpos in [0 .. imageData.width-1]
      for ypos in [0 .. imageData.height-1]
          index = 4 * (ypos * imageData.width + xpos)
          r = imageData.data[index]
          g = imageData.data[index + 1]
          b = imageData.data[index + 2]
          a = imageData.data[index + 3]
        if(r+g+b == 0)
          imageData.data[index + 3] = 0

    ctx.putImageData imageData,0,0
    targetData.src = null
    targetData.src = @workbench.toDataURL()
    ctx.clearRect 0,0,asset.width,asset.height

  checkForNIS: (player) ->
    if (player == undefined)
      return undefined

    for nis in _nis
      nis.player = player
      nis.enemies = []
      nis.map = this
      if (nis.conditionsMet)
        return nis
    return undefined

  removeNis: (nis) ->
    index = _nis.indexOf nis, 0 
    arr = _nis.splice index, 1
    arr = undefined
        
  dispose: ->
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
    
  copyPixels: (asset,target,rect)->
    @workbench.width = asset.width
    @workbench.height = asset.height
    ctx = @workbench.getContext '2d'
    ctx.drawImage asset,0,0
    imageData = ctx.getImageData rect.x,rect.y,rect.width,rect.height
    ctx.putImageData imageData,0,0
    target.src = null
    target.src = @workbench.toDataURL()
    ctx.clearRect 0,0,asset.width,asset.height
    
Map::__defineGetter__ "bitmapData", ->
  tmp = new Image()
  yPos = if @platform then @_y else 0
  vh = Game::ViewportHeight
  vw = Game::ViewportWidth
  
  if(@paralaxing)
    @copyPixels @backgroundData,tmp,new Rectangle @_x * .25, yPos, vw, vh
    @copyPixels @midgroundData,tmp,new Rectangle @_x * .5, yPos, vw, vh
  else
    @copyPixels @foregroundData,tmp,new Rectangle @_x, yPos, vw, vh
  
  if(@showCollisionMap)
    @copyPixels @collisionData,tmp,new Rectangle @_x, yPos, vw, vh   

  tmp
  
Map::__defineSetter__ "x", (val) ->
  if (val >= 0) and (val <= @foregroundAsset.width - Game::ViewportWidth)
    @_x = val
  else if (val < 0)
    @_x = 0
  else if (val > 0)
    @_x = (@foregroundAsset.width - Game::ViewportWidth)

Map::__defineSetter__ "y", (val) ->
  if (val >= @collisionData.height - Game::ViewportWidth)
    @_y = @collisionData.height - Game::ViewportHeight
    return
  if (val < 0)
    @_y = 0
    return
  @_y = val

Map::__defineSetter__ "backgroundAssetClass", (val) ->
  @_backgroundAssetClass = val

Map::__defineGetter__ "backgroundAssetClass", ->
  @_backgroundAssetClass

Map::__defineSetter__ "midgroundAssetClass", (val) ->
  @_midgroundAssetClass = val

Map::__defineGetter__ "midgroundAssetClass", ->
  @_midgroundAssetClass

Map::__defineSetter__ "foregroundAssetClass", (val) ->
  @_foregroundAssetClass = val

Map::__defineGetter__ "foregroundAssetClass", ->
  @_foregroundAssetClass;

Map::__defineSetter__ "collisionAssetClass", (val) ->
  @_collisionAssetClass = val

Map::__defineGetter__ "collisionAssetClass", ->
  @_collisionAssetClass;

Map::__defineSetter__ "backgroundAsset", (val) ->
  @_backgroundAsset = val

Map::__defineGetter__ "backgroundAsset", ->
  @_backgroundAsset

Map::__defineSetter__ "midgroundAsset", (val) ->
  @_midgroundAsset = val

Map::__defineGetter__ "midgroundAsset", ->
  @_midgroundAsset

Map::__defineSetter__ "foregroundAsset", (val) ->
  @_foregroundAsset = val

Map::__defineGetter__ "foregroundAsset", ->
  @_foregroundAsset;

Map::__defineSetter__ "collisionAsset", (val) ->
  @_collisionAsset = val

Map::__defineGetter__ "collisionAsset", ->
  @_collisionAsset;

Map::__defineSetter__ "paralaxing", (val) ->
  @_paralaxing = val

Map::__defineGetter__ "paralaxing", ->
  @_paralaxing

Map::__defineSetter__ "showCollisionMap", (val) ->
  @_showCollisionMap = val

Map::__defineGetter__ "showCollisionMap", ->
  @_showCollisionMap

Map::__defineSetter__ "platform", (val) ->
  @_platform = val

Map::__defineGetter__ "platform", ->
  @_platform

Map::__defineSetter__ "enemies", (val) ->
  @_enemies = val

Map::__defineGetter__ "enemies", ->
  @_enemies

Map::__defineGetter__ "nis", ->
  @_nis

Map::__defineSetter__ "nis", (val) ->
  @_nis = val

Map::__defineSetter__ "mapObjects", (val) ->
  @_mapObjects = val

Map::__defineGetter__ "mapObjects", ->
  @_mapObjects

Map::__defineGetter__ "activeMapObjects", ->
  @_activeMapObjects

Map::__defineGetter__ "activeEnemies", ->
  @_activeEnemies

Map::__defineGetter__ "width", ->
  @_foregroundAsset.width

Map::__defineGetter__ "collisionData", ->
  @_collisionData

Map::__defineSetter__ "collisionData", (val) ->
  @_collisionData = val

Map::__defineGetter__ "foregroundData", ->
  @_foregroundData

Map::__defineSetter__ "foregroundData", (val) ->
  @_foregroundData = val

Map::__defineSetter__ "gravity", (val) ->
  @_gravity = val

Map::__defineGetter__ "gravity", ->
  @_gravity;

Map::__defineSetter__ "friction", (val) ->
  @_friction = val

Map::__defineGetter__ "friction", ->
  @_friction
    
Map::__defineGetter__ "rect", ->
  new Rectangle(0, 0, Game::VIEWPORT_WIDTH, Game::VIEWPORT_HEIGHT);

Map::__defineGetter__ "point", ->
  new Point(0, 0);

Map::__defineGetter__ "sound", ->
  @_sound

Map::__defineSetter__ "sound", (val) ->
  @_sound = val

Map::__defineGetter__ "soundLoops", ->
  @_soundLoops

Map::__defineSetter__ "soundLoops", (val) ->
  @_soundLoops = val

Map::MANAGE_ENEMIES = "manageEnemies"
Map::MANAGE_MAP_OBJECTS = "manageMapObjects"
Map::TOTAL_STANDARD_ASSETS = 2
Map::TOTAL_PARALAX_ASSETS = 4
