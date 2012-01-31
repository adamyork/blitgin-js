var Enemy,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Enemy = (function(_super) {

  __extends(Enemy, _super);

  function Enemy(name) {
    this.name = name;
  }

  Enemy.prototype.behavior = function(args) {};

  return Enemy;

})(Player);

Enemy.prototype.name = "Enemy";

Enemy.prototype.__defineGetter__("x", function() {
  return this._screenX;
});

Enemy.prototype.__defineSetter__("x", function(val) {
  return this._screenX = val;
});

Enemy.prototype.__defineGetter__("y", function() {
  return this._screenY;
});

Enemy.prototype.__defineSetter__("y", function(val) {
  return this._screenY = val;
});

Enemy.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.screenX + this.thresholdX, this.screenY + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
});

Enemy.prototype.__defineGetter__("point", function() {
  return new Point(this.screenX, this.screenY);
});

Enemy.prototype.__defineSetter__("frame", function(val) {
  this._frame = val;
  if (!isBusy) return this.behavior();
});
