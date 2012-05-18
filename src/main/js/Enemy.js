var Enemy,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Enemy = (function(_super) {

  __extends(Enemy, _super);

  function Enemy(name) {
    this.name = name;
  }

  Enemy.prototype.behavior = function(suggestedX, suggestedY, suggestedVelcoityY) {};

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
  if (val >= (Game.prototype.VIEWPORT_HEIGHT - this.cellHeight)) {
    this._screenY = Game.prototype.VIEWPORT_HEIGHT - this.cellHeight;
    return;
  }
  return this._screenY = val;
});

Enemy.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.screenX + this.thresholdX, this.screenY + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
});

Enemy.prototype.__defineGetter__("point", function() {
  return new Point(this.screenX, this.screenY);
});

Enemy.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Enemy.prototype.__defineSetter__("frame", function(val) {
  if (val >= this.state.duration) {
    if (!this.state.persistent) {
      this.state = this._previousState;
      this.frameBuffer = this.state.frameBuffer;
      this.isBusy = false;
    }
    this._frame = 0;
    return;
  }
  return this._frame = this._frame === 0 || val === 0 ? val : val - this.frameBuffer;
});
