var NisCondition;

NisCondition = (function() {
  var _enemies, _mapCondition, _playerCondition;

  function NisCondition(name) {
    this.name = name;
  }

  _mapCondition = {};

  _playerCondition = {};

  _enemies = [];

  return NisCondition;

})();

NisCondition.prototype.name = "NisCondition";

NisCondition.prototype.__defineGetter__("mapCondition", function() {
  return this._mapCondition;
});

NisCondition.prototype.__defineSetter__("mapCondition", function(val) {
  return this._mapCondition = val;
});

NisCondition.prototype.__defineGetter__("playerCondition", function() {
  return this._playerCondition;
});

NisCondition.prototype.__defineSetter__("playerCondition", function(val) {
  return this._playerCondition = val;
});

NisCondition.prototype.__defineGetter__("enemies", function() {
  return this._enemies;
});

NisCondition.prototype.__defineSetter__("enemies", function(val) {
  return this._enemies = val;
});
