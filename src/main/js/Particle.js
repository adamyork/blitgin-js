var Particle,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Particle = (function(_super) {
  var _index, _lifeSpan;

  __extends(Particle, _super);

  function Particle(index, x, y) {
    this.index = index;
    this.x = x;
    this.y = y;
  }

  _index = 0;

  _lifeSpan = 0;

  Particle.prototype.initialize = function() {
    var duration;
    Particle.__super__.initialize.apply(this, arguments);
    return duration = Math.ceil(this.asset.width / this.cellWidth);
  };

  return Particle;

})(RenderObject);

Particle.prototype.name = "Particle";

Particle.prototype.__defineGetter__("index", function() {
  return this._index;
});

Particle.prototype.__defineSetter__("index", function(value) {
  return this._index = val;
});

Particle.prototype.__defineGetter__("lifeSpan", function() {
  return this._lifeSpan;
});

Particle.prototype.__defineSetter__("lifeSpan", function(value) {
  return this._lifeSpan = val;
});
