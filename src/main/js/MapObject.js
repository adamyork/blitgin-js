// Generated by CoffeeScript 1.3.3
var MapObject,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MapObject = (function(_super) {

  __extends(MapObject, _super);

  function MapObject(name) {
    this.name = name;
  }

  MapObject.prototype.behavior = function() {};

  return MapObject;

})(Player);

MapObject.prototype.name = "MapObject";

MapObject.prototype.__defineGetter__("x", function() {
  return this.screenX;
});

MapObject.prototype.__defineSetter__("x", function(val) {
  return this.screenX = val;
});

MapObject.prototype.__defineGetter__("y", function() {
  return this.screenY;
});

MapObject.prototype.__defineSetter__("y", function(val) {
  return this.screenY = val;
});

MapObject.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.screenX + this.thresholdX, this.screenY + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
});

MapObject.prototype.__defineGetter__("point", function() {
  return new Point(this.screenX, this.screenY);
});

MapObject.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

MapObject.prototype.__defineSetter__("frame", function(val) {
  this._frame = val;
  if (!this.isBusy) {
    this.behavior();
  }
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
