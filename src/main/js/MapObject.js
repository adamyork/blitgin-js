var MapObject,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

MapObject = (function(_super) {

  __extends(MapObject, _super);

  function MapObject(name) {
    this.name = name;
  }

  MapObject.prototype.behavior = function() {};

  return MapObject;

})(Player);

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

MapObject.prototype.__defineSetter__("frame", function(val) {
  this._frame = value;
  if (!this.isBusy) return this.behavior();
});
