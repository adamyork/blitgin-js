var Map,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Map = (function(_super) {
  var _activeEnemies, _activeMapObjects, _assetsLoaded, _backgroundAsset, _backgroundAssetClass, _backgroundData, _collisionAsset, _collisionAssetClass, _collisionData, _enemies, _foregroundAsset, _foregroundAssetClass, _foregroundData, _friction, _gravity, _inactiveEnemies, _inactiveMapObjects, _initializeComplete, _mapObjects, _midgroundAsset, _midgroundAssetClass, _midgroundData, _nis, _paralaxing, _platform, _showCollisionMap, _sound, _soundLoops;

  __extends(Map, _super);

  function Map(name) {
    this.name = name;
  }

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

  _backgroundData = {};

  _midgroundData = {};

  _foregroundData = {};

  _collisionData = {};

  _sound = {};

  _soundLoops = 0;

  Map.prototype.initialize = function() {
    this.workbench = document.createElement("canvas");
    if (this.paralaxing) {
      if (void 0 !== this.backgroundAssetClass && void 0 !== this.midgroundAssetClass && void 0 !== this.foregroundAssetClass && void 0 !== this.collisionAssetClass && void 0 !== this.enemies && void 0 !== this.mapObjects) {
        return this.initializeAssets();
      } else {
        return console.log("Maps using paraxling require 3 assets and a collection of enemies.");
      }
    } else {
      if (void 0 !== this.foregroundAssetClass && void 0 !== this.enemies && void 0 !== this.collisionAssetClass) {
        return this.initializeAssets();
      } else {
        return console.log("Maps require a foreground , collision asset , and a collection of enemies.");
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
      this.midgroundAsset.src = this.backgroundAssetClass;
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

  Map.prototype.imageLoadComplete = function(e) {
    _assetsLoaded++;
    if (this.paralaxing) {
      if (_assetsLoaded === Map.prototype.TOTAL_PARALAX_ASSETS) {
        this.removeBlackAndCache(this.backgroundAsset, this.backgroundData);
        this.removeBlackAndCache(this.midgroundAsset, this.midgroundData);
        this.removeBlackAndCache(this.foregroundAsset, this.foregroundData);
        this.removeBlackAndCache(this.collisionAsset, this.collisionData);
        return this.finalize();
      }
    } else {
      if (_assetsLoaded === Map.prototype.TOTAL_STANDARD_ASSETS) {
        this.removeBlackAndCache(this.foregroundAsset, this.foregroundData);
        this.removeBlackAndCache(this.collisionAsset, this.collisionData);
        return this.finalize();
      }
    }
  };

  Map.prototype.finalize = function() {
    this._initializeComplete = true;
    this.x = 0;
    this.y = 0;
    this.activeEnemies = [];
    return this.activeMapObjects = [];
  };

  Map.prototype.removeBlackAndCache = function(asset, targetData) {
    var a, b, ctx, g, imageData, index, r, xpos, ypos, _ref, _ref2;
    this.workbench.width = asset.width;
    this.workbench.height = asset.height;
    ctx = this.workbench.getContext('2d');
    ctx.drawImage(asset, 0, 0);
    imageData = ctx.getImageData(0, 0, this.workbench.width, this.workbench.height);
    for (xpos = 0, _ref = imageData.width - 1; 0 <= _ref ? xpos <= _ref : xpos >= _ref; 0 <= _ref ? xpos++ : xpos--) {
      for (ypos = 0, _ref2 = imageData.height - 1; 0 <= _ref2 ? ypos <= _ref2 : ypos >= _ref2; 0 <= _ref2 ? ypos++ : ypos--) {
        index = 4 * (ypos * imageData.width + xpos);
        r = imageData.data[index];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];
        if (r + g + b === 0) imageData.data[index + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    targetData.src = null;
    targetData.src = this.workbench.toDataURL();
    return ctx.clearRect(0, 0, asset.width, asset.height);
  };

  Map.prototype.manageElements = function(type) {
    var activeTargets, enemy, group, i, inactiveTargets, indep, key, obj, posX, posY, target, targetArray, vh, vw, _i, _j, _len, _len2, _ref;
    targetArray = type === Map.prototype.MANAGE_ENEMIES ? this.enemies : this.mapObjects;
    inactiveTargets = type === Map.prototype.MANAGE_ENEMIES ? _inactiveEnemies : _inactiveMapObjects;
    activeTargets = type === Map.prototype.MANAGE_ENEMIES ? _activeEnemies : _activeMapObjects;
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

  Map.prototype.copyPixels = function(asset, rect) {
    var ctx, imageData;
    if (this.workbench.width < asset.width) this.workbench.width = asset.width;
    if (this.workbench.height < asset.height) this.workbench.height = asset.height;
    ctx = this.workbench.getContext('2d');
    ctx.drawImage(asset, 0, 0);
    imageData = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
    return ctx.putImageData(imageData, 0, 0);
  };

  return Map;

})(RenderObject);

Map.prototype.__defineGetter__("bitmapData", function() {
  var ctx, vh, vw, yPos;
  if (this._initializeComplete) {
    ctx = this.workbench.getContext('2d');
    ctx.clearRect(0, 0, this.workbench.width, this.workbench.height);
    yPos = this.platform ? this._y : 0;
    vh = Game.prototype.VIEWPORT_HEIGHT;
    vw = Game.prototype.VIEWPORT_WIDTH;
    if (this.paralaxing) {
      this.copyPixels(this.backgroundData, tmp, new Rectangle(this._x * .25, yPos, vw, vh));
      this.copyPixels(this.midgroundData, tmp, new Rectangle(this._x * .5, yPos, vw, vh));
    } else {
      this.copyPixels(this.foregroundData, new Rectangle(this._x, yPos, vw, vh));
    }
    if (this.showCollisionMap) {
      this.copyPixels(this.collisionData, new Rectangle(this._x, yPos, vw, vh));
    }
    return ctx.getImageData(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.ViewportHeight);
  } else {
    return console.log('You cannot start the game yet. Map assets are not loaded.');
  }
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

Map.prototype.__defineSetter__("y", function(val) {
  if (val >= this.collisionData.height - Game.prototype.VIEWPORT_WIDTH) {
    this._y = this.collisionData.height - Game.prototype.VIEWPORT_HEIGHT;
    return;
  }
  if (val < 0) {
    this._y = 0;
    return;
  }
  return this._y = val;
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

Map.prototype.__defineSetter__("backgroundAsset", function(val) {
  return this._backgroundAsset = val;
});

Map.prototype.__defineGetter__("backgroundAsset", function() {
  return this._backgroundAsset;
});

Map.prototype.__defineSetter__("midgroundAsset", function(val) {
  return this._midgroundAsset = val;
});

Map.prototype.__defineGetter__("midgroundAsset", function() {
  return this._midgroundAsset;
});

Map.prototype.__defineSetter__("foregroundAsset", function(val) {
  return this._foregroundAsset = val;
});

Map.prototype.__defineGetter__("foregroundAsset", function() {
  return this._foregroundAsset;
});

Map.prototype.__defineSetter__("collisionAsset", function(val) {
  return this._collisionAsset = val;
});

Map.prototype.__defineGetter__("collisionAsset", function() {
  return this._collisionAsset;
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

Map.prototype.MANAGE_ENEMIES = "manageEnemies";

Map.prototype.MANAGE_MAP_OBJECTS = "manageMapObjects";

Map.prototype.TOTAL_STANDARD_ASSETS = 2;

Map.prototype.TOTAL_PARALAX_ASSETS = 4;
