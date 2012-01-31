var Emitter;

Emitter = (function() {
  var _frame, _friction, _gravity, _particles, _quantity, _size, _type;

  function Emitter(_type, _gravity, _friction, _quantity, _size) {
    this._type = _type;
    this._gravity = _gravity;
    this._friction = _friction;
    this._quantity = _quantity;
    this._size = _size;
    this.createParticles();
  }

  _type = {};

  _gravity = 0;

  _friction = 0;

  _quantity = 0;

  _particles = [];

  _size = 0;

  _frame = 0;

  return Emitter;

})();

({
  createParticles: function() {
    var i, particle, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = _quantity.length; _i < _len; _i++) {
      i = _quantity[_i];
      particle = new _type(i);
      _results.push(_particles.push(particle));
    }
    return _results;
  },
  removeParticle: function(particle) {
    return _particles.slice(particle.index, (particle.index + 1));
  }
});

Emitter.prototype.name = "Emitter";

Emitter.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Emitter.prototype.__defineSetter__("frame", function(val) {
  var particle, _i, _len, _ref, _results;
  _ref = this._particles;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    particle = _ref[_i];
    particle.frame++;
    particle.velocityX += particle.easeCoefficient;
    particle.velocityY += particle.easeCoefficient;
    particle.x = (particle.x + (particle.velocityX * particle.direction)) - _friction;
    particle.y = (particle.y + particle.velocityY) + _gravity;
    if (particle.frame >= particle.lifeSpan) {
      this.removeParticle(particle);
      continue;
    } else {
      _results.push(void 0);
    }
  }
  return _results;
});

Emitter.prototype.__defineGetter__("bitmapData", function() {
  var bmpData, particle, _i, _len, _ref;
  bmpData = new Image();
  _ref = this._particles;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    particle = _ref[_i];
    particle;
  }
  return bmpData;
});

Emitter.prototype.__defineGetter__("hasParticles", function() {
  if (this._particles.length !== 0) {
    return true;
  } else {
    return false;
  }
});

Emitter.prototype.__defineGetter__("rect", function() {
  return new Rectangle(0, 0, this._size, this._size);
});
