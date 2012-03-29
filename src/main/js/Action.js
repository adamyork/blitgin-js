var Action,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Action = (function(_super) {
  var _bitmapData, _collisionCoefficient, _composite, _damage, _emitter, _frame, _hasAnimated, _health, _height, _id, _isAnimating, _isComplete, _lifeSpan, _maxVelocityX, _nonObjectProducing, _owner, _sound, _soundLoops, _state, _stateCollisionLeft, _stateCollisionRight, _stateJumpLeft, _stateJumpRight, _stateLeft, _stateRight, _width;

  __extends(Action, _super);

  function Action() {
    Action.__super__.constructor.apply(this, arguments);
  }

  Action.prototype.contructor = function(name) {
    this.name = name;
  };

  _isComplete = false;

  _isAnimating = false;

  _hasAnimated = false;

  _nonObjectProducing = false;

  _width = 0;

  _height = 0;

  _frame = 0;

  _lifeSpan = 0;

  _collisionCoefficient = 0;

  _health = 100;

  _damage = 10;

  _soundLoops = 0;

  _maxVelocityX = 0;

  _owner = "";

  _id = "";

  _bitmapData = {};

  _sound = {};

  _stateLeft = {};

  _stateRight = {};

  _stateCollisionRight = {};

  _stateCollisionLeft = {};

  _stateJumpRight = {};

  _stateJumpLeft = {};

  _state = {};

  _composite = {};

  _emitter = {};

  return Action;

})(RenderObject);

Action.prototype.name = "Action";

Action.prototype.__defineGetter__("velocityX", function() {
  return this._velocityX;
});

Action.prototype.__defineSetter__("velocityX", function(val) {
  if (val <= this.maxVelocityX) return this._velocityX = val;
});

Action.prototype.__defineGetter__("maxVelocityX", function() {
  return this._maxVelocityX;
});

Action.prototype.__defineSetter__("maxVelocityX", function(val) {
  return this._maxVelocityX = val;
});

Action.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.x, this.y, this.width, this.height);
});

Action.prototype.__defineGetter__("collisionCoefficient", function() {
  return this._collisionCoefficient;
});

Action.prototype.__defineSetter__("collisionCoefficient", function(val) {
  return this._collisionCoefficient = val;
});

Action.prototype.__defineGetter__("id", function() {
  return this._id;
});

Action.prototype.__defineSetter__("id", function(val) {
  return this._id = val;
});

Action.prototype.__defineGetter__("lifeSpan", function() {
  return this._lifeSpan;
});

Action.prototype.__defineSetter__("lifeSpan", function(val) {
  return this._lifeSpan = val;
});

Action.prototype.__defineGetter__("damage", function() {
  return this._damage;
});

Action.prototype.__defineSetter__("damage", function(val) {
  return this._damage = val;
});

Action.prototype.__defineGetter__("health", function() {
  return this._health;
});

Action.prototype.__defineSetter__("health", function(val) {
  this._health = val;
  if (val <= 0) return this.isComplete = true;
});

Action.prototype.__defineGetter__("owner", function() {
  return this._owner;
});

Action.prototype.__defineSetter__("owner", function(val) {
  return this._owner = val;
});

Action.prototype.__defineGetter__("nonObjectProducing", function() {
  return this._nonObjectProducing;
});

Action.prototype.__defineSetter__("nonObjectProducing", function(val) {
  return this._nonObjectProducing = val;
});

Action.prototype.__defineGetter__("isComplete", function() {
  return this._isComplete;
});

Action.prototype.__defineSetter__("isComplete", function(val) {
  return this._isComplete = val;
});

Action.prototype.__defineGetter__("isAnimating", function() {
  return this._isAnimating;
});

Action.prototype.__defineSetter__("isAnimating", function(val) {
  return this._isAnimating = val;
});

Action.prototype.__defineGetter__("hasAnimated", function() {
  return this._hasAnimated;
});

Action.prototype.__defineSetter__("hasAnimated", function(val) {
  return this._hasAnimated = val;
});

Action.prototype.__defineGetter__("stateLeft", function() {
  return this._stateLeft;
});

Action.prototype.__defineSetter__("stateLeft", function(val) {
  return this._stateLeft = val;
});

Action.prototype.__defineGetter__("stateRight", function() {
  return this._stateRight;
});

Action.prototype.__defineSetter__("stateRight", function(val) {
  return this._stateRight = val;
});

Action.prototype.__defineGetter__("stateCollisionLeft", function() {
  return this._stateCollisionLeft;
});

Action.prototype.__defineSetter__("stateCollisionLeft", function(val) {
  return this._stateCollisionLeft = val;
});

Action.prototype.__defineGetter__("stateCollisionRight", function() {
  return this._stateCollisionRight;
});

Action.prototype.__defineSetter__("stateCollisionRight", function(val) {
  return this._stateCollisionRight = val;
});

Action.prototype.__defineGetter__("stateJumpRight", function() {
  return this._stateJumpRight;
});

Action.prototype.__defineSetter__("stateJumpRight", function(val) {
  return this._stateJumpRight = val;
});

Action.prototype.__defineGetter__("stateJumpLeft", function() {
  return this._stateJumpLeft;
});

Action.prototype.__defineSetter__("stateJumpLeft", function(val) {
  return this._stateJumpLeft = val;
});

Action.prototype.__defineGetter__("state", function() {
  if (this.direction === 1) {
    return this.stateRight;
  } else {
    return this.stateLeft;
  }
});

Action.prototype.__defineGetter__("composite", function() {
  return this._composite;
});

Action.prototype.__defineSetter__("composite", function(val) {
  return this._composite = val;
});

Action.prototype.__defineGetter__("emitter", function() {
  return this._emitter;
});

Action.prototype.__defineSetter__("emitter", function(val) {
  return this._emitter = val;
});

Action.prototype.__defineGetter__("sound", function() {
  return this._sound;
});

Action.prototype.__defineSetter__("sound", function(val) {
  return this._sound = val;
});

Action.prototype.__defineGetter__("soundLoops", function() {
  return this._soundLoops;
});

Action.prototype.__defineSetter__("soundLoops", function(val) {
  return this._soundLoops = val;
});

Action.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Action.prototype.__defineSetter__("frame", function(val) {
  if (val >= this.lifeSpan) this.isComplete = true;
  this._frame = val;
  if (this.objectKeyframeLength === (Math.round(this.asset.width / this.cellWidth) - 1)) {
    this.objectKeyframeLength = 0;
    return;
  }
  return this.objectKeyframeLength = val;
});

Action.prototype.ENEMY = "enemy";

Action.prototype.PLAYER = "player";
