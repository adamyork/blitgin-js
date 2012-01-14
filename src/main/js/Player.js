var Player;

Player = (function() {
  var _composite, _compositePoint, _emitter, _height, _point, _width, _x, _y;

  function Player(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.point = {};
  }

  _x = 0;

  _y = 0;

  _width = 0;

  _height = 0;

  _composite = {};

  _compositePoint = {};

  _emitter = {};

  _point = {};

  return Player;

})();

Player.prototype.__defineGetter__("x", function() {
  return this._x;
});

Player.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

Player.prototype.__defineGetter__("y", function() {
  return this._y;
});

Player.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

Player.prototype.__defineGetter__("point", function() {
  return this._point;
});

Player.prototype.__defineSetter__("point", function(val) {
  return this._point = val;
});

Player.prototype.__defineGetter__("composite", function() {
  return this._composite;
});

Player.prototype.__defineSetter__("composite", function(val) {
  return this._composite = val;
});

Player.prototype.__defineGetter__("compositePoint", function() {
  return new Point(x + composite.x, y + composite.y);
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
