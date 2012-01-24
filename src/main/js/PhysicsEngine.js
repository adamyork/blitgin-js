var PhysicsEngine;

PhysicsEngine = (function() {
  var _friction, _gravity;

  function PhysicsEngine(name) {
    this.name = name;
  }

  _gravity = 0;

  _friction = 0;

  PhysicsEngine.prototype.adjustPlayerVerically = function(player, map) {
    player.y -= player.velocityY;
    map.y -= player.velocityY;
    player.velocityY -= map.gravity;
    player.y += map.gravity;
    return map.y += map.gravity;
  };

  PhysicsEngine.prototype.applyPlayerInput = function(player, input) {
    if (player.direction !== input.direction) {
      player.velocityX = player.velocityX * (player.easeCoefficient / 100);
    }
    player.direction = input.direction;
    return player.velocityX += player.easeCoefficient;
  };

  PhysicsEngine.prototype.adjustPlayerHorizontally = function(player, map) {
    player.x = player.x + (player.velocityX * player.direction);
    player.velocityX -= map.friction;
    if (this.doesMapNeedToMove(player, map)) {
      map.x = map.x + (player.velocityX * player.direction);
      return this.enforcePositionThreshold(player);
    }
  };

  PhysicsEngine.prototype.doesMapNeedToMove = function(player, map) {
    var conditionLeft, conditionRight;
    conditionLeft = (player.x <= player.mapBoundsMin) && (map.x !== 0);
    conditionRight = (player.x >= player.mapBoundsMax) && (map.x !== map.width - Game.prototype.VIEWPORT_WIDTH);
    return conditionLeft || conditionRight;
  };

  PhysicsEngine.prototype.enforcePositionThreshold = function(player) {
    if (player.x <= player.mapBoundsMin) {
      player.x = player.mapBoundsMin;
      return;
    }
    return player.x = player.mapBoundsMax;
  };

  PhysicsEngine.prototype.isTargetMovingVertically = function(target) {
    return target.velocityY !== 0;
  };

  PhysicsEngine.prototype.handleVerticalCollision = function(target, focus, intersection) {
    if (target.collisionRect.y > intersection.y) target.velocityY = 0;
    if (target.collisionRect.y < intersection.y) {
      return target.velocityY = target.maxVelocityY;
    }
  };

  PhysicsEngine.prototype.handleHorizontalCollision = function(target, focus, map) {
    if (target.direction === 1) {
      if (target === Action) {
        focus.x += focus.width * focus.collisionCoefficient;
        focus.velocityX = 0;
      } else {
        focus.screenX += focus.width + target.width;
        target.x -= target.width * target.collisionCoefficient;
        map.x -= target.width * target.collisionCoefficient;
        target.velocityX = 0;
      }
    } else if (target.direction === -1) {
      if (typeof target === Action) {
        focus.x -= focus.width * focus.collisionCoefficient;
        focus.velocityX = 0;
      } else {
        target.screenX -= focus.width + target.width;
        target.x += target.width * target.collisionCoefficient;
        map.x += target.width * target.collisionCoefficient;
        target.velocityX = 0;
      }
    }
    return this.updateMapXIfEnemy(focus, target, target.direction);
  };

  PhysicsEngine.prototype.updateMapXIfEnemy = function(focus, target, direction) {
    if (typeof focus === Enemy) {
      return focus.mapX += (focus.width + target.width) * direction;
    }
  };

  PhysicsEngine.prototype.isTargetOutOfBounds = function(target, map) {
    return target.y - target.velocityY + map.gravity < target.y;
  };

  PhysicsEngine.prototype.getVerticalDestination = function(target, map) {
    return target.y + target.height + map.y;
  };

  PhysicsEngine.prototype.getHorizontalMin = function(target, map) {
    return target.vOrigin + map.x;
  };

  PhysicsEngine.prototype.getHorizontalMax = function(target, min) {
    return min + (target.width * target.direction);
  };

  PhysicsEngine.prototype.manageVerticalBounds = function(target, map) {
    if (target.y < 0 && map.platform === false) return target.y = 0;
  };

  PhysicsEngine.prototype.getHorizontalDesitination = function(player, map) {
    return player.hOrigin + map.x - (player.thresholdX * player.direction);
  };

  PhysicsEngine.prototype.getVerticalMin = function(player, map) {
    return player.y + map.y;
  };

  PhysicsEngine.prototype.getVerticalMax = function(player, map) {
    return player.y + player.height + map.y;
  };

  PhysicsEngine.prototype.manageHorizontalBounds = function(player, map, destination) {
    player.x = destination - map.x;
    return player.velocityX = 0;
  };

  PhysicsEngine.prototype.setTargetFloor = function(target, map, destination) {
    target.floor = destination - target.height - map.y;
    target.y = target.floor;
    return target.velocityY = 0;
  };

  PhysicsEngine.prototype.resetPlayerVelocity = function(player) {
    return player.velocityY = 0;
  };

  PhysicsEngine.prototype.incrementPlayerVelocity = function(player) {
    return player.y++;
  };

  PhysicsEngine.prototype.adjustMapVerically = function(map, player) {
    if (player.y < 0 && map.platform) {
      map.y += player.y;
      return player.y = 0;
    }
  };

  PhysicsEngine.prototype.adjustEnemy = function(enemy, player, map) {
    if (enemy.applyGravityAndFriction) {
      if (this.doesMapNeedToMove(player, map)) {
        enemy.screenX = enemy.screenX + (player.velocityX * -player.direction);
      }
      enemy.screenY += map.gravity;
      enemy.screenX = enemy.screenX + (enemy.velocityX * enemy.direction);
      return enemy.velocityX -= map.friction;
    } else {
      enemy.screenX = enemy.mapX - map.x;
      return enemy.screenY = enemy.mapY - map.y;
    }
  };

  PhysicsEngine.prototype.adjustAction = function(action, map) {
    action.velocityX += action.easeCoefficient;
    action.x += action.direction * action.velocityX;
    action.y += map.gravity - (action.velocityX * .5);
    return action.velocityX -= map.friction;
  };

  PhysicsEngine.prototype.adjustMapObject = function(mapObj, player, map) {
    if (mapObj.applyGravityAndFriction) {
      if (player.x !== 0 && player.x !== Game.VIEWPORT_WIDTH - player.width) {
        mapObj.screenX = mapObj.screenX + (player.velocityX * -player.direction);
      }
      mapObj.screenY += map.gravity;
      mapObj.screenX = mapObj.screenX + (mapObj.velocityX * mapObj.direction);
      return mapObj.velocityX -= map.friction;
    } else {
      mapObj.screenX = mapObj.mapX - map.x;
      return mapObj.screenY = mapObj.mapY - map.y;
    }
  };

  PhysicsEngine.prototype.manageNis = function(nis, player, map) {
    var Object, pGoals, prop, target, value, _i, _j, _len, _len2;
    prop = {};
    value = 0;
    pGoals = nis.nisGoal.playerGoals;
    for (_i = 0, _len = pGoals.length; _i < _len; _i++) {
      prop = pGoals[_i];
      value = pGoals[prop];
      target = (value - player[prop]) / (nis.nisGoal.duration - nis.frame);
      player.direction = target < 0 ? -1 : 1;
      player[prop] += target;
      player.frame++;
    }
    ({
      mGoals: Object = nis.nisGoal.mapGoals
    });
    for (_j = 0, _len2 = mGoals.length; _j < _len2; _j++) {
      prop = mGoals[_j];
      value = mGoals[prop];
      map[prop] += (value - map[prop]) / (nis.nisGoal.duration - nis.frame);
      this.adjustMapVerically(map, player);
    }
    nis.frame++;
    return nis.frame >= nis.nisGoal.duration;
  };

  return PhysicsEngine;

})();

PhysicsEngine.prototype.__defineGetter__("gravity", function() {
  return this._gravity;
});

PhysicsEngine.prototype.__defineSetter__("gravity", function(val) {
  return this._gravity = val;
});

PhysicsEngine.prototype.__defineGetter__("friction", function() {
  return this._friction;
});

PhysicsEngine.prototype.__defineSetter__("friction", function(val) {
  return this._friction = val;
});
