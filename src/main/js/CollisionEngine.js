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
    var obj, tmpCollection, _i, _len;
    if (typeof focus === Action) {
      tmpCollection = [];
      if (focus.owner === Action.PLAYER) {
        tmpCollection = this.map.activeEnemies;
      } else {
        tmpCollection[0] = this.player;
      }
      for (_i = 0, _len = tmpCollection.length; _i < _len; _i++) {
        obj = tmpCollection[_i];
        this.checkForCollision(obj, focus);
      }
      return;
    }
    return this.checkForCollision(focus, target);
  };

  CollisionEngine.prototype.checkForCollision = function(focus, target) {
    var intersection;
    if (target.collisionRect.intersects(focus.collisionRect)) {
      if (_physicsEngine.isTargetMovingVertically(target)) {
        intersection = target.collisionRect.intersection(focus.collisionRect);
        this.physicsEngine.handleVerticalCollision(target, focus, intersection);
      }
      if (target.direction === 1 && !(type(focus === MapObject))) {
        if (typeof target === Action) {
          focus.state = focus.collisionLeft;
          focus.isBusy = true;
        } else {
          target.state = target.collisionRight;
          focus.state = focus.collisionLeft;
          target.isBusy = true;
          focus.isBusy = true;
        }
        this.physicsEngine.handleHorizontalCollision(target, focus, this.map);
      } else if (target.direction === -1 && !(typeof focus === MapObject)) {
        if (typeof target === Action) {
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
      for (i = _ref = horizontalMin + target.thresholdX, _ref2 = horizontalMax - target.thresholdX; _ref <= _ref2 ? i <= _ref2 : i >= _ref2; _ref <= _ref2 ? i++ : i--) {
        this.checkForCieling(Math.round(i));
        point = this.map.collisionData.getPixel(Math.round(i), Math.round(destination));
        if (point !== 0) {
          checkForFloor(point, destination, i, target);
          return;
        }
      }
    } else {
      for (i = _ref3 = horizontalMin - target.thresholdX, _ref4 = horizontalMax + target.thresholdX; _ref3 <= _ref4 ? i <= _ref4 : i >= _ref4; _ref3 <= _ref4 ? i++ : i--) {
        this.checkForCieling(Math.round(i));
        point = this.map.collisionData.getPixel(Math.round(i), Math.round(destination));
        if (point !== 0) {
          this.checkForFloor(point, destination, i, target);
          return;
        }
      }
    }
    return this.physicsEngine.manageVerticalBounds(target, this.map);
  };

  CollisionEngine.prototype.checkHorizontalMapCollision = function() {
    var destination, i, point, verticalMax, verticalMin;
    destination = this.physicsEngine.getHorizontalDesitination(this.player, this.map);
    verticalMin = this.physicsEngine.getVerticalMin(this.player, this.map);
    verticalMax = this.physicsEngine.getVerticalMax(this.player, this.map);
    for (i = verticalMin; verticalMin <= verticalMax ? i <= verticalMax : i >= verticalMax; verticalMin <= verticalMax ? i++ : i--) {
      point = this.map.collisionData.getPixel(destination, Math.round(i));
      if (point !== 0) {
        while (point !== 0) {
          destination -= this.player.direction;
          point = this.map.collisionData.getPixel(destination, Math.round(i));
        }
        if (this.player.direction === 1) destination -= this.player.width;
        this.physicsEngine.manageHorizontalBounds(this.player, this.map, destination);
        return;
      }
    }
  };

  CollisionEngine.prototype.checkForFloor = function(point, destination, position, target) {
    var count;
    count = 0;
    while (point !== 0) {
      count++;
      destination--;
      point = this.map.collisionData.getPixel(Math.round(position), Math.round(destination));
      if (count > (target.height * .75)) {
        point = 0;
        return;
      }
    }
    return this.physicsEngine.setTargetFloor(target, this.map, destination);
  };

  CollisionEngine.prototype.checkForCieling = function(point) {
    var top;
    top = this.map.collisionData.getPixel(point, this.player.y);
    if (top !== 0) {
      while (top !== 0) {
        this.physicsEngine.incrementPlayerVelocity(this.player);
        top = _map.collisionData.getPixel(point, this.player.y);
      }
      return this.physicsEngine.resetPlayerVelocity(this.player);
    }
  };

  return CollisionEngine;

})();

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
