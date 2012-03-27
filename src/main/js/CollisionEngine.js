var CollisionEngine;

CollisionEngine = (function() {
  var _map, _physicsEngine, _player;

  function CollisionEngine(name) {
    this.name = name;
  }

  _map = {};

  _player = {};

  _physicsEngine = {};

  CollisionEngine.prototype.manageCollisions = function(focus, target) {
    var obj, tmpCollection;
    if (focus.name === Action.name) {
      tmpCollection = [];
      if (focus.owner === Action.prototype.PLAYER) {
        tmpCollection = this.map.activeEnemies;
      } else {
        tmpCollection[0] = this.player;
      }
      for (obj in tmpCollection) {
        this.checkForCollision(tmpCollection[obj], focus);
      }
      return;
    }
    return this.checkForCollision(focus, target);
  };

  CollisionEngine.prototype.checkForCollision = function(focus, target) {
    var focusBase, intersection, targetBase;
    if (target.collisionRect.intersects(focus.collisionRect)) {
      if (this.physicsEngine.isTargetMovingVertically(target)) {
        intersection = target.collisionRect.intersection(focus.collisionRect);
        this.physicsEngine.handleVerticalCollision(target, focus, intersection);
      }
      focusBase = focus.__proto__.name;
      targetBase = target.__proto__.name;
      if (target.direction === 1 && focusBase !== CollisionEngine.prototype.TYPE_OF_MAPOBJECT) {
        if (targetBase === CollisionEngine.prototype.TYPE_OF_ACTION) {
          focus.state = focus.collisionLeft;
          focus.isBusy = true;
        } else {
          target.state = target.collisionRight;
          focus.state = focus.collisionLeft;
          target.isBusy = true;
          focus.isBusy = true;
        }
        this.physicsEngine.handleHorizontalCollision(target, focus, this.map);
      } else if (target.direction === -1 && focusBase !== CollisionEngine.prototype.TYPE_OF_MAPOBJECT) {
        if (targetBase === CollisionEngine.prototype.TYPE_OF_ACTION) {
          focus.state = focus.collisionRight;
          focus.isBusy = true;
        } else {
          target.state = target.collisionLeft;
          focus.state = focus.collisionRight;
          target.isBusy = true;
          focus.isBusy = true;
        }
        this.physicsEngine.handleHorizontalCollision(target, focus, this.map);
      }
      focus.health -= target.damage;
      return target.health -= focus.damage;
    }
  };

  CollisionEngine.prototype.checkVerticalMapCollision = function(target) {
    var destination, horizontalMax, horizontalMin, i, outOfBounds, point, _ref, _ref2, _ref3, _ref4;
    outOfBounds = this.physicsEngine.isTargetOutOfBounds(target, this.map);
    if (outOfBounds || target.applyGravityAndFriction === false) return;
    destination = this.physicsEngine.getVerticalDestination(target, this.map);
    horizontalMin = this.physicsEngine.getHorizontalMin(target, this.map);
    horizontalMax = this.physicsEngine.getHorizontalMax(target, horizontalMin);
    i = 0;
    point = 0;
    if (target.direction === 1) {
      for (i = _ref = horizontalMin + target.thresholdX, _ref2 = (horizontalMax - target.thresholdX) - 1; _ref <= _ref2 ? i <= _ref2 : i >= _ref2; _ref <= _ref2 ? i++ : i--) {
        this.checkForCieling(Math.round(i));
        point = this.map.collisionDataPixel(Math.round(i), Math.round(destination));
        if (point !== 0) {
          this.checkForFloor(Math.round(point), Math.round(destination), Math.round(i), target);
          return;
        }
      }
    } else {
      for (i = _ref3 = horizontalMin - target.thresholdX, _ref4 = (horizontalMax + target.thresholdX) - 1; _ref3 <= _ref4 ? i <= _ref4 : i >= _ref4; _ref3 <= _ref4 ? i++ : i--) {
        this.checkForCieling(Math.round(i));
        point = this.map.collisionDataPixel(Math.round(i), Math.round(destination));
        if (point !== 0) {
          this.checkForFloor(Math.round(point), Math.round(destination), Math.round(i), target);
          return;
        }
      }
    }
    return this.physicsEngine.manageVerticalBounds(target, this.map);
  };

  CollisionEngine.prototype.checkHorizontalMapCollision = function() {
    var destination, i, point, verticalMax, verticalMin, _ref;
    destination = Math.round(this.physicsEngine.getHorizontalDesitination(this.player, this.map));
    verticalMin = this.physicsEngine.getVerticalMin(this.player, this.map);
    verticalMax = this.physicsEngine.getVerticalMax(this.player, this.map);
    i = 0;
    for (i = verticalMin, _ref = verticalMax - 1; verticalMin <= _ref ? i <= _ref : i >= _ref; verticalMin <= _ref ? i++ : i--) {
      point = this.map.collisionDataPixel(Math.round(destination), Math.round(i));
      if (point !== 0) {
        this.checkForWall(point, Math.round(destination), Math.round(i));
        if (this.player.direction === 1) destination -= this.player.width;
        this.physicsEngine.manageHorizontalBounds(this.player, this.map, destination);
        return;
      }
    }
  };

  CollisionEngine.prototype.checkForWall = function(point, destination, position) {
    var _results;
    _results = [];
    while (point !== 0) {
      destination -= this.player.direction;
      _results.push(point = this.map.collisionDataPixel(Math.round(destination), Math.round(position)));
    }
    return _results;
  };

  CollisionEngine.prototype.checkForFloor = function(point, destination, position, target) {
    var count;
    count = 0;
    while (point !== 0) {
      count++;
      destination--;
      point = this.map.collisionDataPixel(Math.round(position), Math.round(destination));
      if (count > (target.height * .75)) {
        point = 0;
        return;
      }
    }
    return this.physicsEngine.setTargetFloor(target, this.map, destination);
  };

  CollisionEngine.prototype.checkForCieling = function(point) {
    var top;
    top = this.map.collisionDataPixel(point, this.player.y);
    if (top !== 0) {
      while (top !== 0) {
        this.physicsEngine.incrementPlayerVelocity(this.player);
        top = this.map.collisionDataPixel(point, this.player.y);
      }
      return this.physicsEngine.resetPlayerVelocity(this.player);
    }
  };

  return CollisionEngine;

})();

CollisionEngine.prototype.name = "CollisionEngine";

CollisionEngine.prototype.__defineGetter__("map", function() {
  return this._map;
});

CollisionEngine.prototype.__defineSetter__("map", function(val) {
  return this._map = val;
});

CollisionEngine.prototype.__defineGetter__("player", function() {
  return this._player;
});

CollisionEngine.prototype.__defineSetter__("player", function(val) {
  return this._player = val;
});

CollisionEngine.prototype.__defineGetter__("physicsEngine", function() {
  return this._physicsEngine;
});

CollisionEngine.prototype.__defineSetter__("physicsEngine", function(val) {
  return this._physicsEngine = val;
});

CollisionEngine.prototype.TYPE_OF_MAPOBJECT = "MapObject";

CollisionEngine.prototype.TYPE_OF_ACTION = "Action";
