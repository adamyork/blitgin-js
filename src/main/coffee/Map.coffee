class Map extends RenderObject
  constructor: (@name) ->

  _paralaxing = false
  _platform = false
  _showCollisionMap = false
  
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
  
  _midgroundData = {}
  _foregroundData = {}
  _collisionData = {}
  
  _sound = {}
  _soundLoops = 0
  
  intialize: ->
    if _paralaxing
      if (null != _backgroundAssetClass && null != _midgroundAssetClass && null !=
          _foregroundAssetClass && null != _collisionAssetClass && null != _enemies &&
          null != _mapObjects)
        initializeAssets()
      else
          console.log("Maps using paraxling require 3 assets and a collection of enemies.");
    else
      if(null != _foregroundAssetClass && null != _enemies && null != _collisionAssetClass)
        initializeAssets()
      else
        console.log("Maps require a foreground , collision asset , and a collection of enemies.");

  initializeAssets: ->
    if(_paralaxing)
      _backgroundAsset = new _backgroundAssetClass()
      _midgroundAsset = new _midgroundAssetClass()
      _midgroundData = new BitmapData(_midgroundAsset.width, _midgroundAsset.height)
      removeBlackAndCache _midgroundAsset, _midgroundData

    _foregroundAsset = new _foregroundAssetClass()
    _collisionAsset = new _collisionAssetClass()

    _foregroundData = new BitmapData(_foregroundAsset.width, _foregroundAsset.height)
    _collisionData = new BitmapData(_collisionAsset.width, _collisionAsset.height, true, 0)

    removeBlackAndCache _foregroundAsset, _foregroundData
    removeBlackAndCache _collisionAsset, _collisionData

  manageElements: (type) ->
    targetArray = (type == MANAGE_ENEMIES) ? _enemies : _mapObjects;
    inactiveTargets = (type == MANAGE_ENEMIES) ? _inactiveEnemies : _inactiveMapObjects
    activeTargets = (type == MANAGE_ENEMIES) ? _activeEnemies : _activeMapObjects
  
    for group in targetArray
        for(var i = 0; i < group.positions.length; i++)
          var key = generateKey(group, i)
          var target = activeTargets[key] as Player
  
          obj = {}
          posX = (target) ? target.mapX : group.positions[i].x
          posY = (target) ? target.mapY : group.positions[i].y
          vw = Game.VIEWPORT_WIDTH
          vh = Game.VIEWPORT_HEIGHT
  
          if(inactiveTargets[(posX + posY)])
            return

          indep = group.independence

          if(target == null)
          {
              if(isEnemyOnScreen(posX, posY, vw, vh, indep))
              {
                  var enemy:Class = group.type;
                  obj = new enemy() as Player;
                  obj.mapX = posX;
                  obj.mapY = posY;
                  obj.screenX = posX - x;
                  obj.screenY = obj.mapY - y - gravity;
                  obj.uniqueID = key;
                  activeTargets[obj.uniqueID] = obj;
              }
          }
          else if(target)
          {
              if(!isEnemyOnScreen(posX, posY, vw, vh, indep) || target.isDead)
              {
                  delete activeTargets[target.uniqueID];
                  if(target.isDead)
                  {
                      inactiveTargets[target.uniqueID] = true;
                  }
              }
          }


  generateKey: (group, i) ->
    return group.type + "" + group.positions[i].x + "" + group.positions[i].y + "" + i

  isEnemyOnScreen: (posX, posY, vw, vh, indep) ->
    hBounds = (((posX - indep) - x) - vw) <= 0 && (((posX + indep) - x) - vw) >= -(vw)
    vBounds = (((posY + indep) - y) - vh) <= 0 && (((posY - indep) - y) - vh) >= -(vh)
    return (hBounds && vBounds)

  removeBlackAndCache: (asset:Bitmap, targetData:BitmapData) ->
    #tmpData  = new BitmapData asset.width, asset.height
    #tmpData.threshold(asset.bitmapData, new Rectangle(0, 0, asset.width, asset.height), new Point(0, 0), "<=", 0x000000, 0x0000000, 0xFFFFFF, true);
    #targetData.copyPixels(tmpData, new Rectangle(0, 0, asset.width, asset.height), new Point(0, 0));

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
    _backgroundAssetClass = undefined
    _midgroundAssetClass = undefined
    _foregroundAssetClass = undefined
  
    _backgroundAsset.bitmapData.dispose()
    _midgroundAsset.bitmapData.dispose()
    _foregroundAsset.bitmapData.dispose()
  
    _backgroundAsset = undefined
    _midgroundAsset = undefined
    _foregroundAsset = undefined
  
    _midgroundData.dispose()
    _foregroundData.dispose()
  
    _midgroundData = undefined
    _foregroundData = undefined
  
    _enemies = undefined
    _mapObjects = undefined
  
    _activeEnemies = undefined
    _inactiveEnemies = undefined
    _activeMapObjects = undefined
    _inactiveMapObjects = undefined
    
Map::__defineGetter__ "bitmapData", ->
  var tmp:BitmapData;
  var yPos:Number = (_platform) ? y : 0;
  var vh:Number = Game.VIEWPORT_HEIGHT;
  var vw:Number = Game.VIEWPORT_WIDTH;
  
  if(_paralaxing)
  {
      tmp = new BitmapData(_backgroundAsset.width, _backgroundAsset.height);
      tmp.copyPixels(_backgroundAsset.bitmapData, new Rectangle(x * .25, yPos, vw, vh), new Point(0, 0));
      tmp.copyPixels(_midgroundData, new Rectangle(x * .5, yPos, vw, vh), new Point(0, 0), null, null, true);
  }
  else
  {
      tmp = new BitmapData(_foregroundAsset.width, _foregroundAsset.height);
  }
  
  tmp.copyPixels(_foregroundData, new Rectangle(x, yPos, vw, vh), new Point(0, 0), null, null, true);
  
  if(_showCollisionMap)
  {
      tmp.copyPixels(_collisionData, new Rectangle(x, yPos, vw, vh), new Point(0, 0), null, null, true);
  }
  
  return tmp

Map::__defineSetter__ "backgroundAssetClass", (val) ->
    @_backgroundAssetClass = val

Map::__defineGetter__ "backgroundAssetClass", ->
    return @_backgroundAssetClass

Map::__defineSetter__ "midgroundAssetClass", (val) ->
    @_midgroundAssetClass = val

Map::__defineGetter__ "midgroundAssetClass", ->
    return @_midgroundAssetClass

Map::__defineSetter__ "foregroundAssetClass", (val) ->
    @_foregroundAssetClass = val

Map::__defineGetter__ "foregroundAssetClass", ->
    return @_foregroundAssetClass;

Map::__defineSetter__ "collisionAssetClass", (val) ->
    @_collisionAssetClass = val

Map::__defineGetter__ "collisionAssetClass", ->
    return @_collisionAssetClass;

Map::__defineSetter__ "paralaxing", (val) ->
    @_paralaxing = val

Map::__defineGetter__ "paralaxing", ->
    return @_paralaxing

Map::__defineSetter__ "showCollisionMap", (val) ->
    @_showCollisionMap = val

Map::__defineGetter__ "showCollisionMap", ->
    return @_showCollisionMap

Map::__defineSetter__ "platform", (val) ->
    @_platform = val

Map::__defineGetter__ "platform", ->
    return @_platform

Map::__defineSetter__ "enemies", (val) ->
    @_enemies = val

Map::__defineGetter__ "enemies", ->
    return @_enemies

Map::__defineGetter__ "nis", ->
    return @_nis

Map::__defineSetter__ "nis", (val) ->
    @_nis = val

Map::__defineSetter__ "mapObjects", (val) ->
    @_mapObjects = val

Map::__defineGetter__ "mapObjects", ->
    return @_mapObjects

Map::__defineGetter__ "activeMapObjects", ->
    return @_activeMapObjects

Map::__defineGetter__ "activeEnemies", ->
    return @_activeEnemies

Map::__defineGetter__ "width", ->
    return @_foregroundAsset.width

Map::__defineSetter__ "x", (val) ->
  if (val >= 0) and (val <= @_foregroundAsset.width - Game::VIEWPORT_WIDTH)
    @x = val
  else if (val < 0)
    @x = 0
  else if (val > 0)
    @x = (@_foregroundAsset.width - Game::VIEWPORT_WIDTH)

Map::__defineSetter__ "y", (val) ->
  if (val >= @_collisionData.height - Game::VIEWPORT_HEIGHT)
    @y = @_collisionData.height - Game::VIEWPORT_HEIGHT
    return
  if (val < 0)
    @y = 0;
    return
  @y = val

Map::__defineGetter__ "collisionData", ->
    return @_collisionData

Map::__defineSetter__ "gravity", (val) ->
    @_gravity = val

Map::__defineGetter__ "gravity", ->
    return @_gravity;

Map::__defineSetter__ "friction", (val) ->
    @_friction = val

Map::__defineGetter__ "friction", ->
    return @_friction
    
Map::__defineGetter__ "rect", ->
    return new Rectangle(0, 0, Game::VIEWPORT_WIDTH, Game::VIEWPORT_HEIGHT);

Map::__defineGetter__ "point", ->
    return new Point(0, 0);

Map::__defineGetter__ "sound", ->
    return @_sound

Map::__defineSetter__ "sound", (val) ->
    @_sound = val

Map::__defineGetter__ "soundLoops", ->
    return @_soundLoops

Map::__defineSetter__ "soundLoops", (val) ->
    @_soundLoops = val

Map::MANAGE_ENEMIES = "manageEnemies"
Map::MANAGE_MAP_OBJECTS = "manageMapObjects"