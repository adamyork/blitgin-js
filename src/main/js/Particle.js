var Particle,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Particle = (function(_super) {
  var _index, _lifeSpan, _startFrame;

  __extends(Particle, _super);

  function Particle(index) {
    this.index = index;
  }

  _index = 0;

  _lifeSpan = 0;

  _startFrame = 1;

  Particle.prototype.initialize = function(duration) {
    this.objectKeyframeLength = 0;
    this.frame = 0;
    this.x = 0;
    this.y = 0;
    this.velocityX = 0;
    return this.velocityY = 0;
  };

  return Particle;

})(RenderObject);

Particle.prototype.name = "Particle";

Particle.prototype.__defineGetter__("index", function() {
  return this._index;
});

Particle.prototype.__defineSetter__("index", function(val) {
  return this._index = val;
});

Particle.prototype.__defineGetter__("lifeSpan", function() {
  return this._lifeSpan;
});

Particle.prototype.__defineSetter__("lifeSpan", function(val) {
  return this._lifeSpan = val;
});

Particle.prototype.__defineGetter__("startFrame", function() {
  return this._startFrame;
});

Particle.prototype.__defineSetter__("startFrame", function(val) {
  return this._startFrame = val;
});

Particle.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Particle.prototype.__defineSetter__("frame", function(val) {
  this._frame = val;
  if (this.objectKeyframeLength === (this.startFrame + this.duration)) {
    this.objectKeyframeLength = 0;
    return;
  }
  return this.objectKeyframeLength++;
});
