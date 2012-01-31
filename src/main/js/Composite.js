var Composite,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Composite = (function(_super) {
  var _frame;

  __extends(Composite, _super);

  function Composite(name) {
    this.name = name;
  }

  _frame = 0;

  Composite.prototype.initialize = function() {
    var duration;
    Composite.__super__.initialize.apply(this, arguments);
    return duration = Math.ceil(this.asset.width / this.cellWidth);
  };

  return Composite;

})(RenderObject);

Composite.prototype.name = "Composite";

Composite.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Composite.prototype.__defineSetter__("frame", function(val) {
  if (val > this.duration) {
    this._frame = 0;
    return;
  }
  return this._frame = this._frame === 0 || val === 0 ? val : val - this.frameBuffer;
});
