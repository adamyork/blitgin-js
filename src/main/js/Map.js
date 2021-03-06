// Generated by CoffeeScript 1.3.3
var Map,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Map = (function(_super) {
  var _activeEnemies, _activeMapObjects, _assetsLoaded, _backgroundAsset, _backgroundAssetClass, _backgroundData, _collisionAsset, _collisionAssetClass, _collisionData, _enemies, _floor, _foregroundAsset, _foregroundAssetClass, _foregroundData, _friction, _gravity, _inactiveEnemies, _inactiveMapObjects, _initializeComplete, _mapObjects, _mapType, _midgroundAsset, _midgroundAssetClass, _midgroundData, _nis, _paralaxing, _platform, _showCollisionMap, _sound, _soundLoops;

  __extends(Map, _super);

  function Map(name) {
    this.name = name;
  }

  _mapType = '';

  _paralaxing = false;

  _platform = false;

  _showCollisionMap = false;

  _assetsLoaded = 0;

  _initializeComplete = false;

  _gravity = 10;

  _friction = .25;

  _enemies = [];

  _mapObjects = [];

  _nis = [];

  _activeEnemies = {};

  _inactiveEnemies = {};

  _activeMapObjects = {};

  _inactiveMapObjects = {};

  _backgroundAssetClass = {};

  _midgroundAssetClass = {};

  _foregroundAssetClass = {};

  _collisionAssetClass = {};

  _backgroundAsset = {};

  _midgroundAsset = {};

  _foregroundAsset = {};

  _collisionAsset = {};

  _backgroundData = {};

  _midgroundData = {};

  _foregroundData = {};

  _collisionData = {};

  _sound = void 0;

  _soundLoops = 0;

  _floor = void 0;

  Map.prototype.initialize = function() {
    this.workbench = document.createElement("canvas");
    this.ctx = this.workbench.getContext('2d');
    if (this.mapType === Map.prototype.TYPE_TILE_BASED) {
      return;
    }
    if (this.mapType === Map.prototype.TYPE_FREE_MOVE) {
      return this.initializeFreeMoveAssets();
    } else if (this.mapType === Map.prototype.TYPE_SIDESCROLL) {
      if (this.paralaxing) {
        if (void 0 !== this.backgroundAssetClass && void 0 !== this.midgroundAssetClass && void 0 !== this.foregroundAssetClass && void 0 !== this.collisionAssetClass && void 0 !== this.enemies && void 0 !== this.mapObjects) {
          return this.initializeAssets();
        } else {
          return GameError.warn("Maps using paraxling require 3 assets and a collection of enemies.");
        }
      } else {
        if (void 0 !== this.foregroundAssetClass && void 0 !== this.enemies && void 0 !== this.collisionAssetClass) {
          return this.initializeAssets();
        } else {
          return GameError.warn("Maps require a foreground , collision asset , and a collection of enemies.");
        }
      }
    }
  };

  Map.prototype.initializeAssets = function() {
    if (this.paralaxing) {
      this.backgroundAsset = new Image();
      this.backgroundAsset.onload = this.imageLoadComplete.bind(this);
      this.backgroundAsset.src = this.backgroundAssetClass;
      this.backgroundData = new Image();
      this.midgroundAsset = new Image();
      this.midgroundAsset.onload = this.imageLoadComplete.bind(this);
      this.midgroundAsset.src = this.midgroundAssetClass;
      this.midgroundData = new Image();
    }
    this.foregroundAsset = new Image();
    this.foregroundAsset.onload = this.imageLoadComplete.bind(this);
    this.foregroundAsset.src = this.foregroundAssetClass;
    this.collisionAsset = new Image();
    this.collisionAsset.onload = this.imageLoadComplete.bind(this);
    this.collisionAsset.src = this.collisionAssetClass;
    this.foregroundData = new Image();
    return this.collisionData = new Image();
  };

  Map.prototype.initializeFreeMoveAssets = function() {};

  Map.prototype.imageLoadComplete = function(e) {
    _assetsLoaded++;
    if (this.paralaxing) {
      if (_assetsLoaded === Map.prototype.TOTAL_PARALAX_ASSETS) {
        this.backgroundAsset.onload = void 0;
        this.midgroundAsset.onload = void 0;
        this.foregroundAsset.onload = void 0;
        this.collisionAsset.onload = void 0;
        this.removeColorConstantAndCache(this.backgroundAsset, this.backgroundData);
        this.removeColorConstantAndCache(this.midgroundAsset, this.midgroundData);
        this.removeColorConstantAndCache(this.foregroundAsset, this.foregroundData);
        this.removeColorConstantAndCache(this.collisionAsset, this.collisionData, true);
        return this.finalize();
      }
    } else {
      if (_assetsLoaded === Map.prototype.TOTAL_STANDARD_ASSETS) {
        this.foregroundAsset.onload = void 0;
        this.collisionAsset.onload = void 0;
        this.removeColorConstantAndCache(this.foregroundAsset, this.foregroundData);
        this.removeColorConstantAndCache(this.collisionAsset, this.collisionData, true);
        return this.finalize();
      }
    }
  };

  Map.prototype.finalize = function() {
    this._initializeComplete = true;
    this.x = 0;
    this.y = 0;
    this.activeEnemies = {};
    this.activeMapObjects = {};
    this._inactiveEnemies = {};
    return this._inactiveMapObjects = {};
  };

  Map.prototype.manageElements = function(type) {
    var activeTargets, enemy, enemyOffScreen, group, inactiveTargets, indep, j, key, obj, posX, posY, position, target, targetArray, tmpE, vh, vw, _i, _j, _len, _len1, _ref;
    inactiveTargets = {};
    activeTargets = {};
    targetArray = type === Map.prototype.MANAGE_ENEMIES ? this.enemies : this.mapObjects;
    inactiveTargets = type === Map.prototype.MANAGE_ENEMIES ? this._inactiveEnemies : this._inactiveMapObjects;
    activeTargets = type === Map.prototype.MANAGE_ENEMIES ? this._activeEnemies : this._activeMapObjects;
    for (_i = 0, _len = targetArray.length; _i < _len; _i++) {
      group = targetArray[_i];
      _ref = group.positions;
      for (j = _j = 0, _len1 = _ref.length; _j < _len1; j = ++_j) {
        position = _ref[j];
        key = this.generateKey(group, j);
        target = activeTargets[key];
        obj = {};
        posX = target ? target.mapX : group.positions[j].x;
        posY = target ? target.mapY : group.positions[j].y;
        vw = Game.prototype.VIEWPORT_WIDTH;
        vh = Game.prototype.VIEWPORT_HEIGHT;
        try {
          tmpE = inactiveTargets[key];
        } catch (error) {
          tmpE = void 0;
        }
        if (tmpE !== void 0) {
          return;
        }
        indep = group.independence;
        if (target === void 0) {
          if (this.isEnemyOnScreen(posX, posY, vw, vh, indep)) {
            enemy = group.type;
            obj = new enemy();
            obj.mapX = posX;
            obj.mapY = posY;
            obj.screenX = posX - this.x;
            obj.screenY = obj.mapY - this.y - this.gravity;
            obj.uniqueID = key;
            activeTargets[obj.uniqueID] = obj;
          }
        } else if (target) {
          enemyOffScreen = !(this.isEnemyOnScreen(posX, posY, vw, vh, indep, target));
          if (enemyOffScreen || target.isDead) {
            delete activeTargets[target.uniqueID];
          }
          if (target.isDead) {
            inactiveTargets[target.uniqueID] = true;
          }
        }
      }
    }
  };

  Map.prototype.generateKey = function(group, i) {
    return group.type.prototype.name + "" + group.positions[i].x + "" + group.positions[i].y + "" + i;
  };

  Map.prototype.isEnemyOnScreen = function(posX, posY, vw, vh, indep, target) {
    var distanceFromOriginX, distanceFromOriginY, hBounds, vBounds;
    distanceFromOriginX = 0;
    distanceFromOriginY = 0;
    if (target !== void 0) {
      distanceFromOriginX = (target.x - posX) + this.x;
      distanceFromOriginY = (target.y - posY) + this.y;
    }
    hBounds = ((((posX + distanceFromOriginX) - indep) - this.x) - vw) <= 0 && ((((posX + distanceFromOriginX) + indep) - this.x) - vw) >= -vw;
    vBounds = ((((posY + distanceFromOriginY) + indep) - this.y) - vh) <= 0 && ((((posY + distanceFromOriginY) - indep) - this.y) - vh) >= -vh;
    return hBounds && vBounds;
  };

  Map.prototype.checkForNis = function(player) {
    var n, _i, _len, _ref;
    if (player === void 0) {
      return void 0;
    }
    _ref = this.nis;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      n = _ref[_i];
      n.player = player;
      n.enemies = [];
      n.map = this;
      if (n.conditionsMet) {
        return n;
      }
    }
    return void 0;
  };

  Map.prototype.removeNis = function(nis) {
    var arr, index;
    index = this.nis.indexOf(nis, 0);
    arr = this.nis.splice(index, 1);
    return arr = void 0;
  };

  Map.prototype.dispose = function() {
    this.backgroundAssetClass = void 0;
    this.midgroundAssetClass = void 0;
    this.foregroundAssetClass = void 0;
    this.backgroundAsset = void 0;
    this.midgroundAsset = void 0;
    this.foregroundAsset = void 0;
    this.midgroundData = void 0;
    this.foregroundData = void 0;
    _enemies = void 0;
    _mapObjects = void 0;
    _activeEnemies = void 0;
    _inactiveEnemies = void 0;
    _activeMapObjects = void 0;
    return _inactiveMapObjects = void 0;
  };

  Map.prototype.buildDataVO = function(img, rect) {
    var tmp;
    tmp = {};
    tmp.data = img;
    tmp.rect = rect;
    tmp.name = name;
    return tmp;
  };

  Map.prototype.collisionDataPixel = function(x, y) {
    var index;
    index = 4 * (y * this.collisionData.width + x);
    return this.collisionPixels.data[index + 3];
  };

  Map.prototype.adjustElementsVertically = function(val) {
    var enemy, _results;
    _results = [];
    for (enemy in this.activeEnemies) {
      if (enemy === "__defineGetter__" || enemy === "__defineSetter__") {
        continue;
      }
      _results.push(this.activeEnemies[enemy].y -= val);
    }
    return _results;
  };

  return Map;

})(RenderObject);

Map.prototype.name = "Map";

Map.prototype.TYPE_SIDESCROLL = "sidescroll";

Map.prototype.TYPE_FREE_MOVE = "freemove";

Map.prototype.TYPE_TILE_BASED = "tilebased";

Map.prototype.__defineGetter__("bitmapData", function() {
  var bg, cd, fg, mid, vh, vw, yPos;
  if (this._initializeComplete) {
    yPos = this.platform ? this._y : 0;
    vh = Game.prototype.VIEWPORT_HEIGHT;
    vw = Game.prototype.VIEWPORT_WIDTH;
    bg = {};
    mid = {};
    fg = {};
    cd = {};
    if (this.paralaxing) {
      bg = this.buildDataVO(this.backgroundData, new Rectangle(Math.round(this._x * .25), yPos, vw, vh));
      mid = this.buildDataVO(this.midgroundData, new Rectangle(Math.round(this._x * .5), yPos, vw, vh));
    }
    fg = this.buildDataVO(this.foregroundData, new Rectangle(Math.round(this._x), Math.round(yPos), vw, vh));
    if (this.showCollisionMap) {
      cd = this.buildDataVO(this.collisionData, new Rectangle(Math.round(this._x), Math.round(yPos), vw, vh));
    }
    return {
      map: [bg, mid, fg, cd]
    };
  } else {
    return GameError.warn('You cannot start the game yet. Map assets are not loaded.');
  }
});

Map.prototype.__defineGetter__("x", function() {
  return this._x;
});

Map.prototype.__defineSetter__("x", function(val) {
  if ((val >= 0) && (val <= this.foregroundAsset.width - Game.prototype.VIEWPORT_WIDTH)) {
    return this._x = val;
  } else if (val < 0) {
    return this._x = 0;
  } else if (val > 0) {
    return this._x = this.foregroundAsset.width - Game.prototype.VIEWPORT_WIDTH;
  }
});

Map.prototype.__defineGetter__("y", function() {
  return this._y;
});

Map.prototype.__defineSetter__("y", function(val) {
  console.log(this.floor);
  if (val >= this.collisionData.height - Game.prototype.VIEWPORT_HEIGHT) {
    this.adjustElementsVertically((this.collisionData.height - Game.prototype.VIEWPORT_HEIGHT) - this._y);
    this._y = this.collisionData.height - Game.prototype.VIEWPORT_HEIGHT;
    return;
  }
  if (val < 0) {
    this.adjustElementsVertically(-this._y);
    this._y = 0;
    return;
  }
  if (this.floor !== void 0 && val >= this.floor) {
    this.adjustElementsVertically(this.floor - this._y);
    this._y = this.floor;
    return;
  }
  this.adjustElementsVertically(val - this._y);
  return this._y = val;
});

Map.prototype.__defineGetter__("backgroundAssetClass", function() {
  return this._backgroundAssetClass;
});

Map.prototype.__defineSetter__("backgroundAssetClass", function(val) {
  return this._backgroundAssetClass = val;
});

Map.prototype.__defineGetter__("midgroundAssetClass", function() {
  return this._midgroundAssetClass;
});

Map.prototype.__defineSetter__("midgroundAssetClass", function(val) {
  return this._midgroundAssetClass = val;
});

Map.prototype.__defineGetter__("foregroundAssetClass", function() {
  return this._foregroundAssetClass;
});

Map.prototype.__defineSetter__("foregroundAssetClass", function(val) {
  return this._foregroundAssetClass = val;
});

Map.prototype.__defineGetter__("collisionAssetClass", function() {
  return this._collisionAssetClass;
});

Map.prototype.__defineSetter__("collisionAssetClass", function(val) {
  return this._collisionAssetClass = val;
});

Map.prototype.__defineGetter__("backgroundAsset", function() {
  return this._backgroundAsset;
});

Map.prototype.__defineSetter__("backgroundAsset", function(val) {
  return this._backgroundAsset = val;
});

Map.prototype.__defineGetter__("midgroundAsset", function() {
  return this._midgroundAsset;
});

Map.prototype.__defineSetter__("midgroundAsset", function(val) {
  return this._midgroundAsset = val;
});

Map.prototype.__defineGetter__("foregroundAsset", function() {
  return this._foregroundAsset;
});

Map.prototype.__defineSetter__("foregroundAsset", function(val) {
  return this._foregroundAsset = val;
});

Map.prototype.__defineGetter__("collisionAsset", function() {
  return this._collisionAsset;
});

Map.prototype.__defineSetter__("collisionAsset", function(val) {
  return this._collisionAsset = val;
});

Map.prototype.__defineGetter__("paralaxing", function() {
  return this._paralaxing;
});

Map.prototype.__defineSetter__("paralaxing", function(val) {
  return this._paralaxing = val;
});

Map.prototype.__defineGetter__("showCollisionMap", function() {
  return this._showCollisionMap;
});

Map.prototype.__defineSetter__("showCollisionMap", function(val) {
  return this._showCollisionMap = val;
});

Map.prototype.__defineGetter__("platform", function() {
  return this._platform;
});

Map.prototype.__defineSetter__("platform", function(val) {
  return this._platform = val;
});

Map.prototype.__defineGetter__("enemies", function() {
  return this._enemies;
});

Map.prototype.__defineSetter__("enemies", function(val) {
  return this._enemies = val;
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

Map.prototype.__defineSetter__("activeMapObjects", function(val) {
  return this._activeMapObjects = val;
});

Map.prototype.__defineGetter__("activeMapObjects", function() {
  return this._activeMapObjects;
});

Map.prototype.__defineGetter__("activeEnemies", function() {
  return this._activeEnemies;
});

Map.prototype.__defineSetter__("activeEnemies", function(val) {
  return this._activeEnemies = val;
});

Map.prototype.__defineGetter__("width", function() {
  return this._foregroundAsset.width;
});

Map.prototype.__defineGetter__("collisionData", function() {
  return this._collisionData;
});

Map.prototype.__defineSetter__("collisionData", function(val) {
  return this._collisionData = val;
});

Map.prototype.__defineGetter__("foregroundData", function() {
  return this._foregroundData;
});

Map.prototype.__defineSetter__("foregroundData", function(val) {
  return this._foregroundData = val;
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

Map.prototype.__defineGetter__("floor", function() {
  return this._floor;
});

Map.prototype.__defineSetter__("floor", function(val) {
  return this._floor = val;
});

Map.prototype.__defineGetter__("mapType", function() {
  return this._mapType;
});

Map.prototype.__defineSetter__("mapType", function(val) {
  return this._mapType = val;
});

Map.prototype.MANAGE_ENEMIES = "manageEnemies";

Map.prototype.MANAGE_MAP_OBJECTS = "manageMapObjects";

Map.prototype.TOTAL_STANDARD_ASSETS = 2;

Map.prototype.TOTAL_PARALAX_ASSETS = 4;
