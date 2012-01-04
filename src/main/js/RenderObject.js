var RenderObject;

RenderObject = (function() {
  var _x, _y;

  function RenderObject(name) {
    this.name = name;
  }

  _x = 0;

  _y = 0;

  return RenderObject;

})();

RenderObject.prototype.__defineGetter__("x", function() {
  return this._x;
});

RenderObject.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

RenderObject.prototype.__defineGetter__("y", function() {
  return this._y;
});

RenderObject.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});
