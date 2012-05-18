var PhysicsEngine;

PhysicsEngine = (function() {
  var _friction, _gravity;

  function PhysicsEngine(name) {
    this.name = name;
  }

  _gravity = 0;

  _friction = 0;

  PhysicsEngine.prototype.adjustPlayerVerically = function(player, map) {
    console.log("Game::DeltaFrames " + Game.prototype.DeltaFrames);
    player.velocityY -= map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames);
    player.y -= player.velocityY;
    player.y += map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames);
    if (player.y - player.height <= 0 && player.floor) {
      if (map.floor === void 0) map.floor = map.y;
      map.floor += map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames);
      return;
    }
    return map.y += map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames);
  };

  PhysicsEngine.prototype.applyPlayerInput = function(player, input) {
    var tar;
    if (player.direction !== input.direction) {
      tar = player.velocityX * (player.easeCoefficient / 100);
      player.velocityX = tar + Math.floor(tar * Game.prototype.DeltaFrames);
    }
    player.direction = input.direction;
    return player.velocityX += player.easeCoefficient + Math.floor(player.easeCoefficient * Game.prototype.DeltaFrames);
  };

  PhysicsEngine.prototype.adjustPlayerHorizontally = function(player, map) {
    var tar;
    tar = player.x + (player.velocityX * player.direction);
    player.x = tar;
    player.velocityX -= map.friction + Math.floor(map.friction * Game.prototype.DeltaFrames);
    if (this.doesMapNeedToMove(player, map)) {
      tar = map.x + (player.velocityX * player.direction);
      map.x = tar;
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

  PhysicsEngine.prototype.fullyEvalulateSuperClass = function(obj) {
    if (obj instanceof MapObject) {
      return CollisionEngine.prototype.TYPE_OF_MAPOBJECT;
    }
    if (obj instanceof Action) return CollisionEngine.prototype.TYPE_OF_ACTION;
    if (obj instanceof Enemy) return Enemy.prototype.name;
    if (obj instanceof Player) return Player.prototype.name;
  };

  PhysicsEngine.prototype.handleHorizontalCollision = function(target, focus, map) {
    var targetBase;
    try {
      targetBase = target.__proto__.name;
    } catch (error) {
      targetBase = this.fullyEvalulateSuperClass(target);
    }
    if (target.direction === 1) {
      if (targetBase === CollisionEngine.prototype.TYPE_OF_ACTION) {
        focus.x += focus.width * focus.collisionCoefficient;
        focus.velocityX = 0;
      } else {
        focus.screenX += focus.width + target.width;
        target.x -= target.width * target.collisionCoefficient;
        map.x -= target.width * target.collisionCoefficient;
        target.velocityX = 0;
      }
    } else if (target.direction === -1) {
      if (targetBase === CollisionEngine.prototype.TYPE_OF_ACTION) {
        focus.x -= focus.width * focus.collisionCoefficient;
        focus.velocityX = 0;
      } else {
        focus.screenX -= focus.width + target.width;
        target.x += target.width * target.collisionCoefficient;
        map.x += target.width * target.collisionCoefficient;
        target.velocityX = 0;
      }
    }
    return this.updateMapXIfEnemy(focus, target, target.direction);
  };

  PhysicsEngine.prototype.updateMapXIfEnemy = function(focus, target, direction) {
    if (focus instanceof Enemy) {
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
    var suggestedScreenX, suggestedScreenY, suggestedVelocityX, suggestedVelocityY;
    if (enemy.applyGravityAndFriction) {
      if (this.doesMapNeedToMove(player, map)) {
        enemy.screenX = enemy.screenX + (player.velocityX * -player.direction);
        enemy.originalX = enemy.screenX;
      }
      suggestedVelocityY = enemy.velocityY;
      suggestedVelocityY -= Math.ceil(map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames));
      if (suggestedVelocityY > enemy.maxVelocityY) {
        suggestedVelocityY = enemy.maxVelocityY;
      }
      if (suggestedVelocityY < 0) suggestedVelocityY = 0;
      suggestedScreenY = enemy.screenY;
      suggestedScreenY -= enemy.velocityY;
      suggestedScreenY += map.gravity;
      suggestedVelocityX = enemy.velocityX;
      suggestedVelocityX += enemy.easeCoefficient + Math.floor(enemy.easeCoefficient * Game.prototype.DeltaFrames);
      if (suggestedVelocityX > enemy.maxVelocityX) {
        suggestedVelocityY = enemy.maxVelocityX;
      }
      if (suggestedVelocityX < 0) suggestedVelocityX = 0;
      suggestedScreenX = enemy.screenX + (suggestedVelocityX * enemy.direction);
      suggestedVelocityX -= map.friction + Math.floor(map.friction * Game.prototype.DeltaFrames);
    } else {
      suggestedScreenX = enemy.mapX - map.x + (Math.ceil(map.x * Game.prototype.DeltaFrames));
      suggestedScreenY = enemy.mapY - map.y + (Math.ceil(map.y * Game.prototype.DeltaFrames));
    }
    return enemy.behavior(suggestedScreenX, suggestedScreenY, suggestedVelocityX, suggestedVelocityX);
  };

  PhysicsEngine.prototype.adjustAction = function(action, map) {
    action.velocityX += action.easeCoefficient + Math.ceil(action.easeCoefficient * Game.prototype.DeltaFrames);
    action.x += action.direction * action.velocityX;
    action.y += map.gravity - (action.velocityX * .5);
    return action.velocityX -= map.friction + +Math.ceil(map.friction * Game.prototype.DeltaFrames);
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
    var mGoals, pGoals, prop, target, value, _i, _len;
    prop = {};
    value = 0;
    pGoals = nis.nisGoal.playerGoals;
    for (prop in pGoals) {
      value = pGoals[prop];
      target = (value - player[prop]) / (nis.nisGoal.duration - nis.frame);
      player.direction = target < 0 ? -1 : 1;
      player[prop] += target;
      player.frame++;
    }
    mGoals = nis.nisGoal.mapGoals;
    for (_i = 0, _len = mGoals.length; _i < _len; _i++) {
      prop = mGoals[_i];
      value = mGoals[prop];
      map[prop] += (value - map[prop]) / (nis.nisGoal.duration - nis.frame);
      this.adjustMapVerically(map, player);
    }
    nis.frame++;
    return nis.frame >= nis.nisGoal.duration;
  };

  return PhysicsEngine;

})();

PhysicsEngine.prototype.name = "PhysicsEngine";

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
