var Point;

Point = (function() {
  var _x, _y;

  function Point(_x, _y) {
    this._x = _x;
    this._y = _y;
  }

  _x = 0;

  _y = 0;

  return Point;

})();

Point.prototype.__defineGetter__("x", function() {
  return this._x;
});

Point.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

Point.prototype.__defineGetter__("y", function() {
  return this._y;
});

Point.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});