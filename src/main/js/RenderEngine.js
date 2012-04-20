var RenderEngine;

RenderEngine = (function() {
  var _collisionEngine, _map, _nis, _physicsEngine, _player, _scrn, _soundEngine;

  function RenderEngine(name) {
    this.name = name;
    this.actionObjects = [];
  }

  _scrn = {};

  _map = {};

  _player = {};

  _nis = {};

  _soundEngine = {};

  _collisionEngine = {};

  _physicsEngine = {};

  RenderEngine._ctx = {};

  RenderEngine.prototype.render = function(input) {
    var aObj, action, enemy, mObj, mapObj;
    this._ctx.clearRect(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.VIEWPORT_HEIGHT);
    if (this._nis !== void 0) {
      this.manageNis(this._nis, input);
      return;
    }
    this.managePlayer(input);
    this.manageMap(input);
    this.paint(this.map);
    this.map.manageElements(Map.prototype.MANAGE_ENEMIES);
    for (enemy in this.map.activeEnemies) {
      this.manageEnemy(this.map.activeEnemies[enemy]);
      this.paint(this.map.activeEnemies[enemy]);
    }
    this.manageNewActions(input);
    for (action in this.actionObjects) {
      aObj = this.actionObjects[action];
      if (this.actionIsIdle(aObj)) continue;
      this.manageAction(aObj, input);
      this.paint(aObj);
    }
    for (mapObj in this.map.activeMapObjects) {
      mObj = this.map.activeMapObjects[mapObj];
      mObj.frame++;
      this.manageMapObject(mObj);
      this.paint(mObj);
    }
    this.map.manageElements(Map.prototype.MANAGE_MAP_OBJECTS);
    this.paint(this.player);
    if (this.player.composite !== void 0) {
      this.player.composite.frame++;
      this.paint(this.player.composite);
    }
    if (this.player.emitter !== void 0 && this.player.emitter.hasParticles) {
      this.player.emitter.frame++;
      this.paint(this.player.emitter);
    }
    input.manageWaits();
    return Game.prototype.instance.notifySubscribers(this.map, this.player, this.actionObjects);
  };

  RenderEngine.prototype.paint = function(obj) {
    var asset, d, item, pPoint, rect, _i, _j, _len, _len2, _ref, _ref2, _results, _results2;
    d = obj.bitmapData;
    if (d.player && d.player.notready === void 0) {
      return this._ctx.drawImage(d.player, d.rect.x, d.rect.y, d.rect.width, d.rect.height, Math.round(obj.point.x), Math.round(obj.point.y), d.rect.width, d.rect.height);
    } else if (d.player && d.player.notready) {} else if (d.particles) {
      _ref = d.particles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        rect = item.rect;
        pPoint = item.particle.point;
        _results.push(this._ctx.drawImage(item.data, rect.x, rect.y, rect.width, rect.height, Math.round(pPoint.x), Math.round(pPoint.y), rect.width, rect.height));
      }
      return _results;
    } else {
      _ref2 = d.map;
      _results2 = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        asset = _ref2[_j];
        if (asset.data !== void 0) {
          _results2.push(this._ctx.drawImage(asset.data, asset.rect.x, asset.rect.y, asset.rect.width, asset.rect.height, obj.point.x, obj.point.y, asset.rect.width, asset.rect.height));
        } else {
          _results2.push(void 0);
        }
      }
      return _results2;
    }
  };

  RenderEngine.prototype.managePlayer = function(input) {
    if (input.customKey !== 0 && (!input.hasWaitFor(input.customKey)) && this.player.state.isCancellable) {
      this.player.revertState();
      this.player.isBusy = false;
    }
    if (input.direction !== 0 && this.player.state.isCancellable) {
      this.player.revertState();
      this.player.isBusy = false;
    }
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
    this.physicsEngine.adjustMapVerically(this.map, this.player);
    return this.manageNis(this.map.checkForNis(this.player), input);
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
      if (input.hasWaitFor(input.customKey)) {
        input.customKey = 0;
        return;
      }
      clazz = this.player.getCustomActionForKey(input.customKey);
      action = new clazz();
      if (!this.actionExists(action)) {
        action.x += this.player.x;
        action.y += this.player.y;
        action.frame = 0;
        action.owner = Action.prototype.PLAYER;
        action.direction = this.player.direction;
        action.hasAnimated = false;
        action.isAnimating = false;
        this.player.composite = action.composite;
        this.player.emitter = action.emitter;
        if (action.spammable) {
          input.addWaitForAction(input.customKey, action.wait);
          action.id = action.id + this.actionObjects.length;
        }
        this.actionObjects.push(action);
        this.soundEngine.checkPlayback(action);
      }
      return input.customKey = 0;
    }
  };

  RenderEngine.prototype.manageAction = function(action, input) {
    action.frame++;
    this.physicsEngine.adjustAction(action, this.map);
    this.managePlayerState(action, input);
    return this.collisionEngine.manageCollisions(action);
  };

  RenderEngine.prototype.managePlayerState = function(action, input) {
    if (input) this.manageJump(input);
    if (this.player.state !== action.state && action.isAnimating === false && action.hasAnimated === false && this.player.isBusy === false) {
      if (action.state === void 0) action.state = this.player.state;
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
      this.removeAction(action);
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

  RenderEngine.prototype.manageNis = function(nis, input) {
    if (nis === void 0) return;
    this._nis = nis;
    if (!input.disabled) input.disabled = true;
    if (this.physicsEngine.manageNis(nis, this.player, this.map)) {
      this.map.removeNis(nis);
      this._nis = void 0;
      input.disabled = false;
      return;
    }
    this.paint(this.map);
    return this.paint(this.player);
  };

  RenderEngine.prototype.dispose = function() {
    this.actionObjects = void 0;
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
