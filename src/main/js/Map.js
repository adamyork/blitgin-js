var Map,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Map = (function() {
  var _activeEnemies, _activeMapObjects, _backgroundAsset, _backgroundAssetClass, _collisionAsset, _collisionAssetClass, _collisionData, _enemies, _foregroundAsset, _foregroundAssetClass, _foregroundData, _friction, _gravity, _inactiveEnemies, _inactiveMapObjects, _mapObjects, _midgroundAsset, _midgroundAssetClass, _midgroundData, _nis, _paralaxing, _platform, _showCollisionMap, _sound, _soundLoops;

  __extends(Map, RenderObject);

  function Map(name) {
    this.name = name;
  }

  _paralaxing = false;

  _platform = false;

  _showCollisionMap = false;

  _gravity = 10;

  _friction = .25;

  _enemies = [];

  _mapObjects = [];

  _nis = [];

  _activeEnemies = [];

  _inactiveEnemies = [];

  _activeMapObjects = [];

  _inactiveMapObjects = [];

  _backgroundAssetClass = {};

  _midgroundAssetClass = {};

  _foregroundAssetClass = {};

  _collisionAssetClass = {};

  _backgroundAsset = {};

  _midgroundAsset = {};

  _foregroundAsset = {};

  _collisionAsset = {};

  _midgroundData = {};

  _foregroundData = {};

  _collisionData = {};

  _sound = {};

  _soundLoops = 0;

  return Map;

})();

Map.prototype.__defineSetter__("backgroundAssetClass", function(val) {
  return this._backgroundAssetClass = val;
});

Map.prototype.__defineGetter__("backgroundAssetClass", function() {
  return this._backgroundAssetClass;
});

Map.prototype.__defineSetter__("midgroundAssetClass", function(val) {
  return this._midgroundAssetClass = val;
});

Map.prototype.__defineGetter__("midgroundAssetClass", function() {
  return this._midgroundAssetClass;
});

Map.prototype.__defineSetter__("foregroundAssetClass", function(val) {
  return this._foregroundAssetClass = val;
});

Map.prototype.__defineGetter__("foregroundAssetClass", function() {
  return this._foregroundAssetClass;
});

Map.prototype.__defineSetter__("collisionAssetClass", function(val) {
  return this._collisionAssetClass = val;
});

Map.prototype.__defineGetter__("collisionAssetClass", function() {
  return this._collisionAssetClass;
});

Map.prototype.__defineSetter__("paralaxing", function(val) {
  return this._paralaxing = val;
});

Map.prototype.__defineGetter__("paralaxing", function() {
  return this._paralaxing;
});

Map.prototype.__defineSetter__("showCollisionMap", function(val) {
  return this._showCollisionMap = val;
});

Map.prototype.__defineGetter__("showCollisionMap", function() {
  return this._showCollisionMap;
});

Map.prototype.__defineSetter__("platform", function(val) {
  return this._platform = val;
});

Map.prototype.__defineGetter__("platform", function() {
  return this._platform;
});

Map.prototype.__defineSetter__("enemies", function(val) {
  return this._enemies = val;
});

Map.prototype.__defineGetter__("enemies", function() {
  return this._enemies;
});

Map.prototype.__defineGetter__("nis", function() {
  return this._nis;
});

Map.prototype.__defineSetter__("nis", function(val) {
  return this._nis = val;
});

Map.prototype.__defineSetter__("mapObjects", function(val) {
  return this._mapObjects = val;
});

Map.prototype.__defineGetter__("mapObjects", function() {
  return this._mapObjects;
});

Map.prototype.__defineGetter__("activeMapObjects", function() {
  return this._activeMapObjects;
});

Map.prototype.__defineGetter__("activeEnemies", function() {
  return this._activeEnemies;
});

Map.prototype.__defineGetter__("width", function() {
  return this._foregroundAsset.width;
});

Map.prototype.__defineSetter__("x", function(val) {
  if ((val >= 0) && (val <= this._foregroundAsset.width - Game.prototype.VIEWPORT_WIDTH)) {
    return this.x = val;
  } else if (val < 0) {
    return this.x = 0;
  } else if (val > 0) {
    return this.x = this._foregroundAsset.width - Game.prototype.VIEWPORT_WIDTH;
  }
});

Map.prototype.__defineSetter__("y", function(val) {
  if (val >= this._collisionData.height - Game.prototype.VIEWPORT_HEIGHT) {
    this.y = this._collisionData.height - Game.prototype.VIEWPORT_HEIGHT;
    return;
  }
  if (val < 0) {
    this.y = 0;
    return;
  }
  return this.y = val;
});

Map.prototype.__defineGetter__("collisionData", function() {
  return this._collisionData;
});

Map.prototype.__defineSetter__("gravity", function(val) {
  return this._gravity = val;
});

Map.prototype.__defineGetter__("gravity", function() {
  return this._gravity;
});

Map.prototype.__defineSetter__("friction", function(val) {
  return this._friction = val;
});

Map.prototype.__defineGetter__("friction", function() {
  return this._friction;
});

Map.prototype.__defineGetter__("rect", function() {
  return new Rectangle(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.VIEWPORT_HEIGHT);
});

Map.prototype.__defineGetter__("point", function() {
  return new Point(0, 0);
});

Map.prototype.__defineGetter__("sound", function() {
  return this._sound;
});

Map.prototype.__defineSetter__("sound", function(val) {
  return this._sound = val;
});

Map.prototype.__defineGetter__("soundLoops", function() {
  return this._soundLoops;
});

Map.prototype.__defineSetter__("soundLoops", function(val) {
  return this._soundLoops = val;
});

Map.prototype.MANAGE_ENEMIES = "manageEnemies";

Map.prototype.MANAGE_MAP_OBJECTS = "manageMapObjects";
