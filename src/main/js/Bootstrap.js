var Bootstrap;

Bootstrap = (function() {
  var _classes, _collection;

  function Bootstrap(name) {
    var ref;
    this.name = name;
    ref = this;
    ref.getters = {};
    ref.setters = {};
    if (!Object.__defineGetter__) {
      Object.prototype.__defineGetter__ = function(prop, func) {
        ref.getters[this.name] = {};
        ref.getters[this.name]["name"] = this.name;
        return ref.getters[this.name][prop] = func;
      };
    }
    if (!Object.__defineSetter__) {
      Object.prototype.__defineSetter__ = function(prop, func) {
        ref.setters[this.name] = {};
        ref.getters[this.name]["name"] = this.name;
        return ref.setters[this.name][prop] = func;
      };
    }
  }

  _classes = ["Point", "Rectangle", "Keyboard", "Game", "GameError", "Group", "RenderObject", "Action", "RenderEngine", "State", "PhysicsEngine", "CollisionEngine", "SoundEngine", "Input", "Player", "Map", "MapObject", "MapObjectGroup", "Nis", "NisCondition", "NisGoal", "Particle", "PhysicsEngine", "CollisionEngine", "SoundEngine", "Emitter", "Enemy", "EnemyGroup"];

  _collection = [];

  Bootstrap.prototype.start = function(callback, basePath) {
    var clazz, _i, _len;
    for (_i = 0, _len = _classes.length; _i < _len; _i++) {
      clazz = _classes[_i];
      _collection[_i] = this.prepare(clazz, basePath);
    }
    return this.load(callback);
  };

  Bootstrap.prototype.prepare = function(clazz, basePath) {
    return basePath + clazz + ".js";
  };

  Bootstrap.prototype.load = function(callback) {
    return $LAB.script(_collection).wait(callback);
  };

  return Bootstrap;

})();
