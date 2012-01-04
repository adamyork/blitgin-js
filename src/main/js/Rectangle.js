var Rectangle;

Rectangle = (function() {
  var _height, _width, _x, _y;

  function Rectangle(_x, _y, _width, _height) {
    this._x = _x;
    this._y = _y;
    this._width = _width;
    this._height = _height;
  }

  _x = 0;

  _y = 0;

  _width = 0;

  _height = 0;

  return Rectangle;

})();

Rectangle.prototype.__defineGetter__("x", function() {
  return this._x;
});

Rectangle.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

Rectangle.prototype.__defineGetter__("y", function() {
  return this._y;
});

Rectangle.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

Rectangle.prototype.__defineGetter__("width", function() {
  return this._width;
});

Rectangle.prototype.__defineSetter__("width", function(val) {
  return this._width = val;
});

Rectangle.prototype.__defineGetter__("height", function() {
  return this._height;
});

Rectangle.prototype.__defineSetter__("height", function(val) {
  return this._height = val;
});
