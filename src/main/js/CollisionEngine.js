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
        point = this.map.collisionDataPixel(Math.round(i), Math.round(destination));
        if (point !== 0) {
          this.checkForFloor(point, destination, i, target);
          return;
        }
      }
    } else {
      for (i = _ref3 = horizontalMin - target.thresholdX, _ref4 = horizontalMax + target.thresholdX; _ref3 <= _ref4 ? i <= _ref4 : i >= _ref4; _ref3 <= _ref4 ? i++ : i--) {
        this.checkForCieling(Math.round(i));
        point = this.map.collisionDataPixel(Math.round(i), Math.round(destination));
        if (point !== 0) {
          this.checkForFloor(point, destination, i, target);
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
        console.log("destination after transform " + destination);
        if (this.player.direction === 1) destination -= this.player.width;
        console.log("destination offset further " + destination);
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
      console.log("@player.direction " + this.player.direction);
      point = this.map.collisionDataPixel(Math.round(destination), Math.round(position));
      console.log("desintation " + destination);
      console.log("position " + position);
      _results.push(console.log("the point " + point));
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
