var Player,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Player = (function(_super) {
  var _actions, _applyGravityAndFriction, _collisionCoefficient, _collisionLeft, _collisionRight, _composite, _compositePoint, _damage, _emitter, _floor, _frame, _health, _isBusy, _isDead, _jumpLeft, _jumpRight, _mapBoundsMax, _mapBoundsMin, _mapX, _mapY, _maxVelocityX, _maxVelocityY, _minVelocity, _moveLeft, _moveRight, _previousState, _screenX, _screenY, _showCollisionRect, _state, _thresholdX, _thresholdY, _uniqueID;

  __extends(Player, _super);

  function Player(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.frame = 0;
  }

  _showCollisionRect = false;

  _isBusy = false;

  _isDead = false;

  _applyGravityAndFriction = true;

  _mapX = 0;

  _mapY = 0;

  _mapBoundsMin = 0;

  _mapBoundsMax = 0;

  _screenX = 0;

  _screenY = 0;

  _frame = 0;

  _maxVelocityX = 15;

  _maxVelocityY = 26;

  _collisionCoefficient = 0;

  _minVelocity = 0;

  _floor = 0;

  _thresholdX = 0;

  _thresholdY = 35;

  _health = 100;

  _damage = 10;

  _uniqueID = "";

  _actions = [];

  _moveRight = {};

  _moveLeft = {};

  _collisionRight = {};

  _collisionLeft = {};

  _jumpRight = {};

  _jumpLeft = {};

  _state = {};

  _previousState = {};

  _composite = {};

  _compositePoint = {};

  _emitter = {};

  Player.prototype.initialize = function() {
    Player.__super__.initialize.call(this, this.updateInherentStates);
    this.y = _floor = Game.prototype.VIEWPORT_HEIGHT - (this.asset.height - this.cellHeight);
    this._frame = 0;
    this._minVelocity = 0;
    this._isBusy = false;
    this._isDead = false;
    if (this.maxVelocityX === void 0) this.maxVelocityX = 15;
    if (this.maxVelocityY === void 0) {
      this._maxVelocityY = 45;
    } else {
      this._maxVelocityY = this.maxVelocityY;
    }
    if (this.frameBuffer === void 0) this.frameBuffer = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.mapBoundsMin = Math.round(Game.prototype.VIEWPORT_WIDTH * .15);
    this.mapBoundsMax = Math.round((Game.prototype.VIEWPORT_WIDTH * .85) - this.width);
    return this.updateInherentStates();
  };

  Player.prototype.updateInherentStates = function(action) {
    if (action === void 0) {
      this._moveRight = new State(Math.round(this.asset.width / this.cellWidth) - 1, 0, true, "moveRight", 0);
      this._moveLeft = new State(Math.round(this.asset.width / this.cellWidth) - 1, 1, true, "moveLeft", 0);
      this._collisionRight = new State(Math.round(this.asset.width / this.cellHeight) - 1, 2, false, "collisionRight", 0);
      this._collisionLeft = new State(Math.round(this.asset.width / this.cellHeight) - 1, 3, false, "collsionLeft", 0);
      this._jumpRight = new State(Math.round(this.asset.width / this.cellWidth) - 1, 0, true, "jumpRight", 0);
      this._jumpLeft = new State(Math.round(this.asset.width / this.cellWidth) - 1, 1, true, "jumpLeft", 0);
    } else {
      this._moveRight = this.assignActionState(action.stateRight, _moveRight);
      this._moveLeft = this.assignActionState(action.stateLeft, _moveLeft);
      this._collisionRight = this.assignActionState(action.stateCollisionRight, _collisionRight);
      this._collisionLeft = this.assignActionState(action.stateCollisionLeft, _collisionLeft);
      this._jumpRight = this.assignActionState(action.stateJumpRight, _jumpRight);
      this._jumpLeft = this.assignActionState(action.stateJumpLeft, _jumpLeft);
    }
    this._previousState = this._moveRight;
    this._state = this._moveRight;
    return this._direction = 1;
  };

  Player.prototype.assignActionState = function(state, inherent) {
    if (state) {
      return state;
    } else {
      return inherent;
    }
  };

  Player.prototype.getCustomActionForKey = function(keyCode) {
    if (this.actions === void 0) this.actions = [];
    return this.actions[keyCode];
  };

  Player.prototype.setCustomActionForKey = function(keyCode, action) {
    if (this.actions === void 0) this.actions = [];
    return this.actions[keyCode] = action;
  };

  return Player;

})(RenderObject);

Player.prototype.name = "Player";

Player.prototype.__defineGetter__("bitmapData", function() {
  var keyFrame, row;
  if (this.ctx !== void 0) {
    keyFrame = Math.floor(this.frame * this.cellWidth);
    row = this.state.row * this.cellHeight;
    if (this.showCollisionRect) {
      this.ctx.drawImage(this.assetData, 0, 0);
      this.ctx.fillStyle = "rgb(200,0,0)";
      this.ctx.fillRect(keyFrame + this.thresholdX, row + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
      this.assetData.src = this.workbench.toDataURL();
    }
    return {
      player: this.assetData,
      rect: new Rectangle(keyFrame, row, this.cellWidth, this.cellHeight)
    };
  } else {
    return {
      player: {},
      rect: new Rectangle(keyFrame, row, this.cellWidth, this.cellHeight)
    };
  }
});

Player.prototype.__defineGetter__("x", function() {
  return this._x;
});

Player.prototype.__defineSetter__("x", function(val) {
  if ((val >= 0) && (val <= (Game.prototype.VIEWPORT_WIDTH - this.width))) {
    return this._x = Math.round(val);
  } else if (val < 0) {
    return this._x = 0;
  } else if (val > 0) {
    return this._x = Game.prototype.VIEWPORT_WIDTH - this.width;
  }
});

Player.prototype.__defineGetter__("y", function() {
  return this._y;
});

Player.prototype.__defineSetter__("y", function(val) {
  if (val >= (Game.prototype.VIEWPORT_HEIGHT - this.cellHeight)) {
    this._y = Game.prototype.VIEWPORT_HEIGHT - this.cellHeight;
    return;
  }
  return this._y = val;
});

Player.prototype.__defineGetter__("direction", function() {
  return this._direction;
});

Player.prototype.__defineSetter__("direction", function(val) {
  this._direction = val;
  return this.state = this.direction === -1 ? this._moveLeft : this._moveRight;
});

Player.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Player.prototype.__defineSetter__("frame", function(val) {
  if (val >= this._state.duration) {
    if (!this._state.persistent) {
      this._state = this._previousState;
      this.frameBuffer = this._state.frameBuffer;
      this._isBusy = false;
    }
    this._frame = 0;
    return;
  }
  return this._frame = this._frame === 0 || val === 0 ? val : val - this._frameBuffer;
});

Player.prototype.__defineGetter__("velocityX", function() {
  return this._velocityX;
});

Player.prototype.__defineSetter__("velocityX", function(val) {
  if (val <= this._maxVelocityX && val >= this._minVelocity) {
    return this._velocityX = val;
  } else if (val <= this._minVelocity) {
    return this._velocityX = 0;
  }
});

Player.prototype.__defineGetter__("vOrigin", function() {
  var val;
  val = 0;
  if (this.direction === -1) {
    val = this.width + this.x;
  } else if (this.direction === 1) {
    val = this.x;
  }
  return val;
});

Player.prototype.__defineGetter__("hOrigin", function() {
  var val;
  val = 0;
  if (this.direction === -1) {
    val = this.x;
  } else if (this.direction === 1) {
    val = this.width + this.x;
  }
  return val;
});

Player.prototype.__defineGetter__("state", function() {
  return this._state;
});

Player.prototype.__defineSetter__("state", function(val) {
  if (this._isBusy || (this._state.id === val.id)) return;
  if ((val.id === this._jumpRight.id) || (val.id === this._jumpLeft.id)) {
    this.velocityY = this._maxVelocityY;
  }
  this._frame = 0;
  this.frameBuffer = val.frameBuffer;
  this._previousState = this._state;
  return this._state = val;
});

Player.prototype.__defineGetter__("health", function() {
  return this._health;
});

Player.prototype.__defineSetter__("health", function(val) {
  this._health = val;
  if (this._health <= 0) return this._isDead = true;
});

Player.prototype.__defineGetter__("mapX", function() {
  return this._mapX;
});

Player.prototype.__defineSetter__("mapX", function(val) {
  return this._mapX = val;
});

Player.prototype.__defineGetter__("mapY", function() {
  return this._mapY;
});

Player.prototype.__defineSetter__("mapY", function(val) {
  return this._mapY = val;
});

Player.prototype.__defineGetter__("mapBoundsMin", function() {
  return this._mapBoundsMin;
});

Player.prototype.__defineSetter__("mapBoundsMin", function(val) {
  return this._mapBoundsMin = val;
});

Player.prototype.__defineGetter__("mapBoundsMax", function() {
  return this._mapBoundsMax;
});

Player.prototype.__defineSetter__("mapBoundsMax", function(val) {
  return this._mapBoundsMax = val;
});

Player.prototype.__defineGetter__("screenX", function() {
  return this._screenX;
});

Player.prototype.__defineSetter__("screenX", function(val) {
  return this._screenX = val;
});

Player.prototype.__defineGetter__("screenY", function() {
  return this._screenY;
});

Player.prototype.__defineSetter__("screenY", function(val) {
  return this._screenY = val;
});

Player.prototype.__defineGetter__("floor", function() {
  return this._floor;
});

Player.prototype.__defineSetter__("floor", function(val) {
  return this._floor = val;
});

Player.prototype.__defineGetter__("collisionCoefficient", function() {
  return this._collisionCoefficient;
});

Player.prototype.__defineSetter__("collisionCoefficient,", function(val) {
  return this._collisionCoefficient = val;
});

Player.prototype.__defineGetter__("maxVelocityX", function() {
  return this._maxVelocityX;
});

Player.prototype.__defineSetter__("maxVelocityX", function(val) {
  return this._maxVelocityX = val;
});

Player.prototype.__defineGetter__("maxVelocityY", function() {
  return this._maxVelocityY;
});

Player.prototype.__defineSetter__("maxVelocityY", function(val) {
  return this._maxVelocityY = val;
});

Player.prototype.__defineGetter__("applyGravityAndFriction", function() {
  return this._applyGravityAndFriction;
});

Player.prototype.__defineSetter__("applyGravityAndFriction", function(val) {
  return this._applyGravityAndFriction = val;
});

Player.prototype.__defineGetter__("showCollisionRect", function() {
  return this._showCollisionRect;
});

Player.prototype.__defineSetter__("showCollisionRect", function(val) {
  return this._showCollisionRect = val;
});

Player.prototype.__defineGetter__("thresholdX", function() {
  return this._thresholdX;
});

Player.prototype.__defineSetter__("thresholdX", function(val) {
  if (val > (this.width * .5)) {
    console.log("You cant set a threshold this high. There would be no collision area.");
  }
  return this._thresholdX = val;
});

Player.prototype.__defineGetter__("thresholdY", function() {
  return this._thresholdY;
});

Player.prototype.__defineSetter__("thresholdY", function(val) {
  if (val > (this.height * .5)) {
    console.log("You cant set a threshold this high. There would be no collision area.");
  }
  return this._thresholdY = val;
});

Player.prototype.__defineGetter__("damage", function() {
  return this._damage;
});

Player.prototype.__defineSetter__("damage", function(val) {
  return this._damage = val;
});

Player.prototype.__defineGetter__("isDead", function() {
  return this._isDead;
});

Player.prototype.__defineGetter__("isBusy", function() {
  return this._isBusy;
});

Player.prototype.__defineSetter__("isBusy", function(val) {
  return this._isBusy = val;
});

Player.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.x + this.thresholdX, this.y + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
});

Player.prototype.__defineGetter__("moveLeft", function() {
  return this._moveLeft;
});

Player.prototype.__defineGetter__("moveRight", function() {
  return this._moveRight;
});

Player.prototype.__defineGetter__("jumpRight", function() {
  return this._jumpRight;
});

Player.prototype.__defineGetter__("jumpLeft", function() {
  return this._jumpLeft;
});

Player.prototype.__defineGetter__("collisionLeft", function() {
  return this._collisionLeft;
});

Player.prototype.__defineGetter__("collisionRight", function() {
  return this._collisionRight;
});

Player.prototype.__defineGetter__("composite", function() {
  return this._composite;
});

Player.prototype.__defineSetter__("composite", function(val) {
  return this._composite = val;
});

Player.prototype.__defineGetter__("compositePoint", function() {
  return new Point(this.x + this.composite.x, this.y + this.composite.y);
});

Player.prototype.__defineSetter__("compositePoint", function(val) {
  return this._compositePoint = val;
});

Player.prototype.__defineGetter__("emitter", function() {
  return this._emitter;
});

Player.prototype.__defineSetter__("emitter", function(val) {
  return this._emitter = val;
});

Player.prototype.__defineGetter__("uniqueID", function() {
  return this._uniqueID;
});

Player.prototype.__defineSetter__("uniqueID", function(val) {
  return this._uniqueID = val;
});
