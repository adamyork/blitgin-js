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