var NisGoal;

NisGoal = (function() {
  var _duration, _enemyGoals, _mapGoals, _playerGoals;

  function NisGoal(name) {
    this.name = name;
  }

  _duration = 0;

  _playerGoals = {};

  _mapGoals = {};

  _enemyGoals = {};

  return NisGoal;

})();

NisGoal.prototype.name = "NisGoal";

NisGoal.prototype.__defineSetter__("duration", function(val) {
  return this._duration = val;
});

NisGoal.prototype.__defineGetter__("duration", function() {
  return this._duration;
});

NisGoal.prototype.__defineSetter__("playerGoals", function(val) {
  return this._playerGoals = val;
});

NisGoal.prototype.__defineGetter__("playerGoals", function() {
  return this._playerGoals;
});

NisGoal.prototype.__defineSetter__("mapGoals", function(val) {
  return this._mapGoals = val;
});

NisGoal.prototype.__defineGetter__("mapGoals", function() {
  return this._mapGoals;
});

NisGoal.prototype.__defineSetter__("enemyGoals", function(val) {
  return this._enemyGoals = val;
});

NisGoal.prototype.__defineGetter__("enemyGoals", function() {
  return this._enemyGoals;
});
