// Generated by CoffeeScript 1.3.3
var Nis;

Nis = (function() {
  var _enemies, _frame, _map, _nisCondition, _nisGoal, _player;

  function Nis(name) {
    this.name = name;
  }

  _nisCondition = {};

  _nisGoal = {};

  _player = {};

  _map = {};

  _enemies = {};

  _frame = 0;

  Nis.prototype.initialize = function() {
    return this.frame = 0;
  };

  Nis.prototype.checkConditions = function(target, condition) {
    var conditionsMet, prop, value;
    conditionsMet = true;
    for (prop in condition) {
      value = condition[prop];
      conditionsMet = this.evaluatePropAndValue(target, prop, value);
    }
    return conditionsMet;
  };

  Nis.prototype.evaluatePropAndValue = function(target, prop, value) {
    if (typeof value === "boolean" || typeof value === "string") {
      return target[prop] === value;
    }
    if (typeof value === "number") {
      return target[prop] >= value;
    }
    if (typeof value === "object") {
      return target[prop] === value;
    }
    return false;
  };

  Nis.prototype.checkForEnemyConditions = function() {
    return this.enemies.length === this.nisCondition.enemies.length;
  };

  return Nis;

})();

Nis.prototype.name = "Nis";

Nis.prototype.__defineGetter__("conditionsMet", function(val) {
  var eCondition, mCondition, pCondition;
  pCondition = this.checkConditions(this._player, this.nisCondition.playerCondition);
  mCondition = this.checkConditions(this._map, this.nisCondition.mapCondition);
  eCondition = this.checkForEnemyConditions();
  return pCondition && mCondition && eCondition;
});

Nis.prototype.__defineGetter__("nisCondition", function() {
  return this._nisCondition;
});

Nis.prototype.__defineSetter__("nisCondition", function(val) {
  return this._nisCondition = val;
});

Nis.prototype.__defineGetter__("nisGoal", function() {
  return this._nisGoal;
});

Nis.prototype.__defineSetter__("nisGoal", function(val) {
  return this._nisGoal = val;
});

Nis.prototype.__defineGetter__("map", function() {
  return this._map;
});

Nis.prototype.__defineSetter__("map", function(val) {
  return this._map = val;
});

Nis.prototype.__defineGetter__("player", function() {
  return this._player;
});

Nis.prototype.__defineSetter__("player", function(val) {
  return this._player = val;
});

Nis.prototype.__defineGetter__("enemies", function() {
  return this._enemies;
});

Nis.prototype.__defineSetter__("enemies", function(val) {
  return this._enemies = val;
});

Nis.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Nis.prototype.__defineSetter__("frame", function(val) {
  return this._frame = val;
});
