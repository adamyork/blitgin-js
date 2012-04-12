var Input;

Input = (function() {
  var _customKey, _direction, _disabled, _jump, _jumpLock, _vDirection, _waits;

  function Input(name) {
    var _waits;
    this.name = name;
    _waits = {};
  }

  _direction = 0;

  _vDirection = 0;

  _jump = 0;

  _jumpLock = false;

  _customKey = 0;

  _waits = {};

  _disabled = false;

  Input.prototype.hasWaitFor = function(key) {
    var val;
    val = key.toString();
    return _waits[val];
  };

  Input.prototype.addWaitForAction = function(key, duration) {
    var val;
    val = key.toString();
    return _waits[val] = duration;
  };

  Input.prototype.manageWaits = function() {
    var wait, _results;
    _results = [];
    for (wait in _waits) {
      _waits[wait]--;
      if (_waits[wait] <= 0) {
        _results.push(delete _waits[wait]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Input;

})();

Input.prototype.name = "Input";

Input.prototype.__defineGetter__("direction", function() {
  return this._direction;
});

Input.prototype.__defineSetter__("direction", function(val) {
  return this._direction = val;
});

Input.prototype.__defineGetter__("vDirection", function() {
  return this._vDirection;
});

Input.prototype.__defineSetter__("vDirection", function(val) {
  return this._vDirection = val;
});

Input.prototype.__defineGetter__("jump", function() {
  return this._jump;
});

Input.prototype.__defineSetter__("jump", function(val) {
  return this._jump = val;
});

Input.prototype.__defineGetter__("jumpLock", function() {
  return this._jumpLock;
});

Input.prototype.__defineSetter__("jumpLock", function(val) {
  return this._jumpLock = val;
});

Input.prototype.__defineGetter__("customKey", function() {
  return this._customKey;
});

Input.prototype.__defineSetter__("customKey", function(val) {
  return this._customKey = val;
});

Input.prototype.__defineGetter__("disabled", function() {
  return this._disabled;
});

Input.prototype.__defineSetter__("disabled", function(val) {
  this.direction = 0;
  this.jumpLock = false;
  this.jump = 0;
  this.customKey = 0;
  return this._disabled = val;
});
