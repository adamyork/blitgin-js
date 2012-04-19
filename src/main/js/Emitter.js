var Emitter;

Emitter = (function() {
  var _asset, _assetClass, _assetData, _ctx, _frame, _friction, _gravity, _particles, _quantity, _ready, _type, _workbench, _x, _y;

  function Emitter(_type, _gravity, _friction, _quantity) {
    this._type = _type;
    this._gravity = _gravity;
    this._friction = _friction;
    this._quantity = _quantity;
    this._workbench = document.createElement("canvas");
    this._workbench.width = this._size;
    this._workbench.height = this._size;
    this._ctx = this._workbench.getContext('2d');
    this._particles = [];
    this._frame = 0;
    this._imageData = new Image();
  }

  _asset = {};

  _assetClass = {};

  _assetData = {};

  _workbench = {};

  _ctx = {};

  _type = {};

  _gravity = 0;

  _friction = 0;

  _quantity = 0;

  _particles = [];

  _frame = 0;

  _x = 0;

  _y = 0;

  _ready = false;

  Emitter.prototype.createParticles = function() {
    var i, particle, _ref, _results;
    this.ready = false;
    _results = [];
    for (i = 0, _ref = this._quantity - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      particle = new this._type(i);
      particle.x = this.point.x;
      particle.y = this.point.y;
      if (i === 0) this.loadParticleAsset(particle.assetClass);
      _results.push(this._particles.push(particle));
    }
    return _results;
  };

  Emitter.prototype.loadParticleAsset = function(src) {
    this.workbench = document.createElement("canvas");
    this.asset = new Image();
    this.assetData = new Image();
    this.asset.onload = this.assetLoadComplete.bind(this);
    return this.asset.src = src;
  };

  Emitter.prototype.assetLoadComplete = function() {
    this.asset.onload = void 0;
    this.ctx = this.workbench.getContext('2d');
    this.assetData = this.asset;
    return this.ready = true;
  };

  Emitter.prototype.removeParticle = function(particle) {
    var arr, index;
    index = this._particles.indexOf(particle, 0);
    arr = this._particles.splice(index, 1);
    return arr = void 0;
  };

  return Emitter;

})();

Emitter.prototype.name = "Emitter";

Emitter.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Emitter.prototype.__defineSetter__("frame", function(val) {
  var particle, _i, _len, _ref;
  if (this.ready) {
    _ref = this._particles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      particle = _ref[_i];
      if (this._frame >= particle.startFrame) {
        particle.frame++;
        particle.velocityX += particle.easeCoefficient;
        particle.velocityY += particle.easeCoefficient;
        particle.x = (particle.x + (particle.velocityX * particle.direction)) - this._friction;
        particle.y = (particle.y + particle.velocityY) + this._gravity;
      }
    }
    if ((particle.frame + particle.startFrame) >= particle.lifeSpan) {
      this.removeParticle(particle);
    }
    return this._frame = val;
  }
});

Emitter.prototype.__defineGetter__("bitmapData", function() {
  var collection, keyframe, obj, particle, _i, _len, _ref;
  if (!this.ready) {
    return {
      player: {
        notready: true
      },
      rect: new Rectangle(0, 0, 0, 0)
    };
  }
  collection = [];
  _ref = this._particles;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    particle = _ref[_i];
    keyframe = particle.objectKeyframeLength * particle.cellWidth;
    obj = {
      data: this.assetData,
      rect: new Rectangle(keyframe, 0, particle.cellWidth, particle.cellHeight),
      particle: particle
    };
    collection.push(obj);
  }
  return {
    particles: collection
  };
});

Emitter.prototype.__defineGetter__("hasParticles", function() {
  if (this._particles.length !== 0) {
    return true;
  } else {
    return false;
  }
});

Emitter.prototype.__defineGetter__("asset", function() {
  return this._asset;
});

Emitter.prototype.__defineSetter__("asset", function(val) {
  return this._asset = val;
});

Emitter.prototype.__defineGetter__("assetClass", function() {
  return this._assetClass;
});

Emitter.prototype.__defineSetter__("assetClass", function(val) {
  return this._assetClass = val;
});

Emitter.prototype.__defineGetter__("assetData", function() {
  return this._assetData;
});

Emitter.prototype.__defineSetter__("assetData", function(val) {
  return this._assetData = val;
});

Emitter.prototype.__defineGetter__("workbench", function() {
  return this._workbench;
});

Emitter.prototype.__defineSetter__("workbench", function(val) {
  return this._workbench = val;
});

Emitter.prototype.__defineGetter__("ctx", function() {
  if (this._ctx === void 0) {
    return;
  } else {
    return this._ctx;
  }
});

Emitter.prototype.__defineSetter__("ctx", function(val) {
  return this._ctx = val;
});

Emitter.prototype.__defineGetter__("point", function() {
  return this._point;
});

Emitter.prototype.__defineSetter__("point", function(val) {
  var particle, _i, _len, _ref, _results;
  this._point = val;
  _ref = this._particles;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    particle = _ref[_i];
    if (this._frame <= particle.startFrame) {
      particle.x = this._point.x;
      _results.push(particle.y = this._point.y);
    } else {
      _results.push(void 0);
    }
  }
  return _results;
});

Emitter.prototype.__defineGetter__("x", function() {
  return this._x;
});

Emitter.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

Emitter.prototype.__defineGetter__("y", function() {
  return this._y;
});

Emitter.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

Emitter.prototype.__defineGetter__("ready", function() {
  return this._ready;
});

Emitter.prototype.__defineSetter__("ready", function(val) {
  return this._ready = val;
});
