var RenderEngine;

RenderEngine = (function() {
  var _actionObjects, _collisionEngine, _map, _nis, _physicsEngine, _player, _scrn, _soundEngine;

  function RenderEngine(name) {
    this.name = name;
  }

  _actionObjects = [];

  _scrn = {};

  _map = {};

  _player = {};

  _nis = {};

  _soundEngine = {};

  _collisionEngine = {};

  _physicsEngine = {};

  RenderEngine._ctx = {};

  RenderEngine.prototype.render = function(input) {
    var action, enemy, mObj, mapObj;
    this._ctx.clearRect(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.VIEWPORT_HEIGHT);
    if (this.nis) {
      this.manageNIS(this.nis, input);
      return;
    }
    this.managePlayer(input);
    this.manageMap(input);
    this.paint(this.map, this.map.point);
    this.map.manageElements(Map.prototype.MANAGE_ENEMIES);
    for (enemy in this.map.activeEnemies) {
      this.manageEnemy(this.map.activeEnemies[enemy]);
      this.paint(this.map.activeEnemies[enemy], enemy.point);
    }
    this.manageNewActions(input);
    for (action in _actionObjects) {
      if (this.actionIsIdle(action)) continue;
      this.manageAction(action);
      this.paint(action, action.point);
    }
    for (mapObj in this.map.activeMapObjects) {
      mObj = this.map.activeMapObjects[mapObj];
      mObj.frame++;
      this.manageMapObject(mObj);
      this.paint(mObj, mObj.point);
    }
    this.map.manageElements(Map.prototype.MANAGE_MAP_OBJECTS);
    this.paint(this.player, this.player.point);
    if (this.player.composite !== void 0) {
      this.player.composite.frame++;
      this.paint(this.player.composite, this.player.compositePoint);
    }
    if (this.player.emitter !== void 0 && this.player.emitter.hasParticles) {
      this.player.emitter.frame++;
      this.paint(this.player.emitter, this.player.point);
    }
    return Game.prototype.instance.notifySubscribers(this.map, this.player, this.actionObjects);
  };

  RenderEngine.prototype.paint = function(obj, point) {
    var asset, d, _i, _len, _ref, _results;
    d = obj.bitmapData;
    if (d.player) {
      return this._ctx.drawImage(d.player, d.rect.x, d.rect.y, d.rect.width, d.rect.height, obj.point.x, obj.point.y, d.rect.width, d.rect.height);
    } else {
      _ref = d.map;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        asset = _ref[_i];
        if (asset.data !== void 0) {
          _results.push(this._ctx.drawImage(asset.data, asset.rect.x, asset.rect.y, asset.rect.width, asset.rect.height, obj.point.x, obj.point.y, asset.rect.width, asset.rect.height));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  RenderEngine.prototype.managePlayer = function(input) {
    this.manageJump(input);
    this.physicsEngine.adjustPlayerVerically(this.player, this.map);
    if (input.direction !== 0) {
      this.physicsEngine.applyPlayerInput(this.player, input);
      this.player.frame++;
    } else if ((input.direction === 0) && (!this.player.isBusy)) {
      this.player.frame = 0;
    }
    if (this.player.isBusy) this.player.frame++;
    this.physicsEngine.adjustPlayerHorizontally(this.player, this.map);
    this.collisionEngine.checkVerticalMapCollision(this.player);
    return this.collisionEngine.checkHorizontalMapCollision();
  };

  RenderEngine.prototype.manageJump = function(input) {
    if ((input.jump === 1) && (input.jumpLock === false)) {
      input.jumpLock = true;
      return this.player.state = this.player.direction === 1 ? this.player.jumpRight : this.player.jumpLeft;
    } else if ((input.jump === 0) && input.jumpLock && (this.player.velocityY === 0)) {
      this.player.state = this.player.direction === 1 ? this.player.moveRight : this.player.moveLeft;
      return input.jumpLock = false;
    }
  };

  RenderEngine.prototype.manageMap = function(input) {
    this.soundEngine.checkPlayback(this.map);
    return this.physicsEngine.adjustMapVerically(this.map, this.player);
  };

  RenderEngine.prototype.manageEnemy = function(enemy) {
    enemy.frame++;
    this.physicsEngine.adjustEnemy(enemy, this.player, this.map);
    this.collisionEngine.checkVerticalMapCollision(enemy);
    return this.collisionEngine.manageCollisions(enemy, this.player);
  };

  RenderEngine.prototype.manageNewActions = function(input) {
    var action, clazz;
    if (input.customKey !== 0) {
      clazz = this.player.getCustomActionForKey(input.customKey);
      action = new clazz();
      input.customKey = 0;
      if (!this.actionExists(action)) {
        action.x += this.player.x;
        action.y += this.player.y;
        action.owner = Action.prototype.PLAYER;
        action.direction = this.player.direction;
        this.player.composite = this.action.composite;
        this.player.emitter = action.emitter;
        this.actionObjects.push(action);
        return this.soundEngine.checkPlayback(action);
      }
    }
  };

  RenderEngine.prototype.manageAction = function(action) {
    action.frame++;
    this.physicsEngine.adjustAction(action, this.map);
    this.managePlayerState(action);
    return this.collisionEngine.manageCollisions(action);
  };

  RenderEngine.prototype.managePlayerState = function(action, input) {
    if (input) this.manageJump(input);
    if (this.player.state !== action.state && action.isAnimating === false && action.hasAnimated === false && this.player.isBusy === false) {
      this.player.state = action.state;
      this.player.isBusy = true;
      action.isAnimating = true;
      return this.player.frame++;
    } else if (this.player.state !== action.state && action.isAnimating) {
      action.isAnimating = false;
      action.hasAnimated = true;
      return this.player.isBusy = false;
    } else if (action.isAnimating && this.player.frame < action.state.duration) {
      return this.player.frame++;
    }
  };

  RenderEngine.prototype.manageMapObject = function(mapObj) {
    this.physicsEngine.adjustMapObject(mapObj, this.player, this.map);
    this.collisionEngine.checkVerticalMapCollision(mapObj);
    return this.collisionEngine.manageCollisions(mapObj, this.player);
  };

  RenderEngine.prototype.actionExists = function(action) {
    var existing, _i, _len, _ref;
    _ref = this.actionObjects;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      existing = _ref[_i];
      if (existing.id === action.id) {
        action = void 0;
        return true;
      }
    }
    return false;
  };

  RenderEngine.prototype.actionIsIdle = function(action) {
    var idle;
    idle = false;
    if (action.isComplete) {
      this.removeAction(this.action);
      idle = true;
    }
    if (action.nonObjectProducing && action.isAnimating === false) {
      action.isAnimating = true;
      this.player.updateInherentStates(action);
      idle = true;
    } else if (action.nonObjectProducing && action.isAnimating) {
      action.frame++;
      idle = true;
    }
    return idle;
  };

  RenderEngine.prototype.removeAction = function(action) {
    var arr, index;
    if (action.nonObjectProducing) this.player.updateInherentStates();
    index = this.actionObjects.indexOf(action, 0);
    arr = this.actionObjects.splice(index, 1);
    arr = void 0;
    if (action.composite && this.player.composite === action.composite) {
      this.player.composite = void 0;
    }
    if (action.emitter && this.player.emitter === action.emitter) {
      this.player.emitter = void 0;
    }
    if (action.sound) return this.soundEngine.removeSound(action.sound);
  };

  RenderEngine.prototype.dispose = function() {
    _actionObjects = void 0;
    this.scrn = void 0;
    this.map.dispose();
    this.map = void 0;
    this.player.dispose();
    this.player = void 0;
    this.soundEngine = void 0;
    return this.collisionEngine = void 0;
  };

  return RenderEngine;

})();

RenderEngine.prototype.name = "RenderEngine";

RenderEngine.prototype.__defineGetter__("scrn", function() {
  return this._scrn;
});

RenderEngine.prototype.__defineSetter__("scrn", function(val) {
  this._scrn = val;
  return this._ctx = this.scrn.getContext('2d');
});

RenderEngine.prototype.__defineGetter__("map", function() {
  return this._map;
});

RenderEngine.prototype.__defineSetter__("map", function(val) {
  if (this._map) this.soundEngine.removeSound(this._map.sound);
  this.collisionEngine.map = val;
  return this._map = val;
});

RenderEngine.prototype.__defineGetter__("player", function() {
  return this._player;
});

RenderEngine.prototype.__defineSetter__("player", function(val) {
  this.collisionEngine.player = val;
  return this._player = val;
});

RenderEngine.prototype.__defineGetter__("soundEngine", function() {
  return this._soundEngine;
});

RenderEngine.prototype.__defineSetter__("soundEngine", function(val) {
  return this._soundEngine = val;
});

RenderEngine.prototype.__defineGetter__("collisionEngine", function() {
  return this._collisionEngine;
});

RenderEngine.prototype.__defineSetter__("collisionEngine", function(val) {
  return this._collisionEngine = val;
});

RenderEngine.prototype.__defineGetter__("physicsEngine", function() {
  return this._physicsEngine;
});

RenderEngine.prototype.__defineSetter__("physicsEngine", function(val) {
  this._physicsEngine = val;
  return this.collisionEngine.physicsEngine = val;
});
