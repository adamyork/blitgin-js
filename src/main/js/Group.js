var Group;

Group = (function() {
  var _independence, _positions, _type;

  function Group(name) {
    this.name = name;
  }

  _type = "";

  _positions = [];

  _independence = 0;

  return Group;

})();

Game.prototype.__defineGetter__("type", function() {
  return this._type;
});

Game.prototype.__defineSetter__("type", function(val) {
  return this._type = val;
});

Game.prototype.__defineGetter__("positions", function() {
  return this._positions;
});

Game.prototype.__defineSetter__("positions", function(val) {
  return this._positions = val;
});

Game.prototype.__defineGetter__("independence", function() {
  return this._independence;
});

Game.prototype.__defineSetter__("independence", function(val) {
  return this._independence = val;
});
