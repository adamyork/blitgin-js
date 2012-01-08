var Map,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Map = (function(_super) {
  var _activeEnemies, _activeMapObjects, _backgroundAsset, _backgroundAssetClass, _collisionAsset, _collisionAssetClass, _collisionData, _enemies, _foregroundAsset, _foregroundAssetClass, _foregroundData, _friction, _gravity, _inactiveEnemies, _inactiveMapObjects, _mapObjects, _midgroundAsset, _midgroundAssetClass, _midgroundData, _nis, _paralaxing, _platform, _showCollisionMap, _sound, _soundLoops;

  __extends(Map, _super);

  function Map(name) {
    this.name = name;
    Map.prototype.intialize = function() {
      if (_paralaxing) {
        if (void 0 !== this._backgroundAssetClass && void 0 !== this._midgroundAssetClass && void 0 !== this._foregroundAssetClass && void 0 !== this._collisionAssetClass && void 0 !== this._enemies && void 0 !== this._mapObjects) {
          return this.initializeAssets();
        } else {
          return console.log("Maps using paraxling require 3 assets and a collection of enemies.");
        }
      } else {
        if (void 0 !== this._foregroundAssetClass && void 0 !== this._enemies && void 0 !== this._collisionAssetClass) {
          return this.initializeAssets();
        } else {
          return console.log("Maps require a foreground , collision asset , and a collection of enemies.");
        }
      }
    };
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

  Map.prototype.initializeAssets = function() {
    if (this._paralaxing) {
      this._backgroundAsset = new this._backgroundAssetClass();
      this._midgroundAsset = new this._midgroundAssetClass();
      this._midgroundData = new BitmapData(this._midgroundAsset.width, this._midgroundAsset.height);
      this.removeBlackAndCache(this._midgroundAsset, this._midgroundData);
    }
    this._foregroundAsset = new this._foregroundAssetClass();
    this._collisionAsset = new this._collisionAssetClass();
    this._foregroundData = new BitmapData(this._foregroundAsset.width, this._foregroundAsset.height);
    this._collisionData = new BitmapData(this._collisionAsset.width, this._collisionAsset.height, true, 0);
    this.removeBlackAndCache(this._foregroundAsset, this._foregroundData);
    return this.removeBlackAndCache(this._collisionAsset, this._collisionData);
  };

  Map.prototype.manageElements = function(type) {
    var activeTargets, enemy, group, i, inactiveTargets, indep, key, obj, posX, posY, target, targetArray, vh, vw, _i, _j, _len, _len2, _ref;
    targetArray = type === Map.prototype.MANAGE_ENEMIES ? this._enemies : this._mapObjects;
    inactiveTargets = type === Map.prototype.MANAGE_ENEMIES ? this._inactiveEnemies : this._inactiveMapObjects;
    activeTargets = type === Map.prototype.MANAGE_ENEMIES ? _activeEnemies : this._activeMapObjects;
    for (_i = 0, _len = targetArray.length; _i < _len; _i++) {
      group = targetArray[_i];
      _ref = group.positions;
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        i = _ref[_j];
        key = this.generateKey(group, i);
        target = activeTargets[key];
        obj = {};
        posX = target ? target.mapX : group.positions[i].x;
        posY = target ? target.mapY : group.positions[i].y;
        vw = Game.prototype.VIEWPORT_WIDTH;
        vh = Game.prototype.VIEWPORT_HEIGHT;
        if (inactiveTargets[posX + posY]) return;
        indep = group.independence;
        if (target === void 0) {
          if (this.sEnemyOnScreen(posX, posY, vw, vh, indep)) {
            enemy = group.type;
            obj = new enemy();
            obj.mapX = posX;
            obj.mapY = posY;
            obj.screenX = posX - x;
            obj.screenY = obj.mapY - y - gravity;
            obj.uniqueID = key;
            activeTargets[obj.uniqueID] = obj;
          }
        } else if (target) {
          if (!this.isEnemyOnScreen(posX, posY, vw, vh, indep || target.isDead)) {
            delete activeTargets[target.uniqueID];
          }
          if (target.isDead) inactiveTargets[target.uniqueID] = true;
        }
      }
    }
  };

  Map.prototype.generateKey = function(group, i) {
    return group.type + "" + group.positions[i].x + "" + group.positions[i].y + "" + i;
  };

  Map.prototype.isEnemyOnScreen = function(posX, posY, vw, vh, indep) {
    var hBounds, vBounds;
    hBounds = (((posX - indep) - x) - vw) <= 0 && (((posX + indep) - x) - vw) >= -vw;
    vBounds = (((posY + indep) - y) - vh) <= 0 && (((posY - indep) - y) - vh) >= -vh;
    return hBounds && vBounds;
  };

  Map.prototype.removeBlackAndCache = function(_arg) {
    var Bitmap, BitmapData;
    Bitmap = _arg.asset, BitmapData = _arg.targetData;
  };

  Map.prototype.checkForNIS = function(player) {
    var nis, _i, _len;
    if (player === void 0) return;
    for (_i = 0, _len = _nis.length; _i < _len; _i++) {
      nis = _nis[_i];
      nis.player = player;
      nis.enemies = [];
      nis.map = this;
      if (nis.conditionsMet) return nis;
    }
  };

  Map.prototype.removeNis = function(nis) {
    var arr, index;
    index = _nis.indexOf(nis, 0);
    arr = _nis.splice(index, 1);
    return arr = void 0;
  };

  Map.prototype.dispose = function() {
    _backgroundAssetClass = void 0;
    _midgroundAssetClass = void 0;
    _foregroundAssetClass = void 0;
    _backgroundAsset.bitmapData.dispose();
    _midgroundAsset.bitmapData.dispose();
    _foregroundAsset.bitmapData.dispose();
    _backgroundAsset = void 0;
    _midgroundAsset = void 0;
    _foregroundAsset = void 0;
    _midgroundData.dispose();
    _foregroundData.dispose();
    _midgroundData = void 0;
    _foregroundData = void 0;
    _enemies = void 0;
    _mapObjects = void 0;
    _activeEnemies = void 0;
    _inactiveEnemies = void 0;
    _activeMapObjects = void 0;
    return _inactiveMapObjects = void 0;
  };

  return Map;

})(RenderObject);

Map.prototype.__defineGetter__("bitmapData", function() {
  var tmp, vh, vw, yPos, _ref;
  tmp = {};
  yPos = (_ref = this._platform) != null ? _ref : {
    y: 0
  };
  vh = Game.prototype.VIEWPORT_HEIGHT;
  vw = Game.prototype.VIEWPORT_WIDTH;
  if (this._paralaxing) {
    tmp = new BitmapData(this._backgroundAsset.width, this._backgroundAsset.height);
    tmp.copyPixels(this._backgroundAsset.bitmapData, new Rectangle(this.x * .25, yPos, vw, vh), new Point(0, 0));
    tmp.copyPixels(this._midgroundData, new Rectangle(this.x * .5, yPos, vw, vh), new Point(0, 0), null, null, true);
  } else {
    tmp = new BitmapData(this.foregroundAsset.width, this._foregroundAsset.height);
  }
  tmp.copyPixels(this._foregroundData, new Rectangle(this.x, yPos, vw, vh), new Point(0, 0), null, null, true);
  if (_showCollisionMap) {
    tmp.copyPixels(this._collisionData, new Rectangle(this.x, yPos, vw, vh), new Point(0, 0), null, null, true);
  }
  return tmp;
});

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
