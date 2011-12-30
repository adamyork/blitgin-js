var Game;

Game = (function() {
  var _activeMap, _activePlayer, _collisionEngineClass, _customKey, _customKeys, _downKeys, _input, _jumpKeys, _leftKeys, _maps, _movement, _parent, _pause, _physicsEngineClass, _players, _renderEngine, _renderEngineClass, _rightKeys, _screen, _soundEngine, _subscribers, _upKeys;

  function Game() {}

  _subscribers = [];

  _subscribers = void 0;

  _pause = false;

  _activeMap = 0;

  _activePlayer = 0;

  _customKey = 0;

  _players = [];

  _maps = [];

  _leftKeys = [];

  _rightKeys = [];

  _upKeys = [];

  _downKeys = [];

  _jumpKeys = [];

  _customKeys = [];

  _parent = void 0;

  _screen = void 0;

  _renderEngineClass = void 0;

  _collisionEngineClass = void 0;

  _physicsEngineClass = void 0;

  _renderEngine = void 0;

  _soundEngine = void 0;

  _movement = void 0;

  _input = void 0;

  Game.prototype.render = function() {
    if (this._pause) return;
    return _renderEngine.render(_input);
  };

  Game.prototype.start = function() {
    return _stage.addEventListener(Event.ENTER_FRAME, render);
  };

  Game.prototype.dispose = function() {
    removeListeners();
    _players = null;
    _maps = null;
    _leftKeys = null;
    _rightKeys = null;
    _upKeys = null;
    _downKeys = null;
    _jumpKeys = null;
    _customKeys = null;
    _renderEngineClass = null;
    _renderEngine.dispose();
    _soundEngine = null;
    _movement = null;
    _input = null;
    _subscribers = null;
    return _screen = null;
  };

  Game.prototype.preinitialize = function(parent, width, height) {
    _parent = parent;
    this.ViewportHeight = height;
    this.ViewportWidth = width;
    _screen = document.createElement("canvas");
    _screen.setAttribute("width", this.ViewportWidth);
    _screen.setAttribute("height", this.ViewportHeight);
    document.body.appendChild(_screen);
    return initialize();
  };

  Game.prototype.initialize = function() {
    var map, player;
    if (this._renderEngineClass === null) {
      _renderEngine = new RenderEngine();
    } else {
      _renderEngine = new _renderEngineClass();
    }
    if (this._collisionEngineClass === null) {
      _renderEngine.collisionEngine = new CollisionEngine();
    } else {
      _renderEngine.collisionEngine = new _collisionEngineClass();
    }
    if (this._physicsEngineClass === null) {
      _renderEngine.physicsEngine = new PhysicsEngine();
    } else {
      _renderEngine.physicsEngine = new _physicsEngineClass();
    }
    if (this._maps.length === 0) {
      console.log("Blitgin_as :: [ERROR] :: you need at least one map.");
    }
    if (this._players.length === 0) {
      console.log("Blitgin_as :: [ERROR] :: you need at least one player.");
    }
    _soundEngine = new SoundEngine();
    _renderEngine.soundEngine = _soundEngine;
    map = _maps[_activeMap];
    player = _players[_activePlayer];
    _renderEngine.screen = _screen;
    _renderEngine.map = new map();
    _renderEngine.player = new player();
    _input = new InputVO();
    _input.direction = 0;
    _input.jump = 0;
    _input.jumpLock = false;
    _input.customKey = 0;
    return addListeners();
  };

  Game.prototype.addListeners = function() {
    _stage.addEventListener(KeyboardEvent.KEY_UP, manageMovement);
    _stage.addEventListener(KeyboardEvent.KEY_DOWN, manageMovement);
    _stage.removeEventListener(KeyboardEvent.KEY_UP, manageMovement);
    return _stage.removeEventListener(KeyboardEvent.KEY_DOWN, manageMovement);
  };

  Game.prototype.removeListeners = function() {};

  Game.prototype.manageMovement = function() {
    if (_input.disabled) return;
    if (event.type === KeyboardEvent.KEY_UP) {
      _input.direction = checkKeys(_leftKeys, event.keyCode) ? 0 : _input.direction;
      _input.direction = checkKey(_rightKeys, event.keyCode) ? 0 : _input.direction;
      _input.vDirection = checkKey(_upKeys, event.keyCode) ? 0 : _input.vDirection;
      _input.vDirection = checkKey(_downKeys, event.keyCode) ? 0 : _input.vDirection;
      _input.jump = checkKey(_jumpKeys, event.keyCode) ? 0 : _input.jump;
      _input.customKey = checkKey(_customKeys, event.keyCode) ? 0 : _input.customKey;
    } else {
      _input.direction = checkKey(_leftKeys, event.keyCode) ? -1 : _input.direction;
      _input.direction = checkKey(_rightKeys, event.keyCode) ? 1 : _input.direction;
      _input.vDirection = checkKey(_upKeys, event.keyCode) ? -1 : _input.direction;
      _input.vDirection = checkKey(_downKeys, event.keyCode) ? 1 : _input.direction;
      _input.jump = checkKey(_jumpKeys, event.keyCode) ? 1 : _input.jump;
    }
    if (checkKey(_customKeys, event.keyCode)) {
      return _input.customKey = _customKeys[_customKey];
    }
  };

  Game.prototype.checkKey = function(arr, keyCode) {
    var index;
    index = arr.indexOf(keyCode, 0);
    _customKey = index;
    return index !== -1;
  };

  Game.prototype.dispose = function() {
    removeListeners();
    this._players = null;
    this._maps = null;
    this._leftKeys = null;
    this._rightKeys = null;
    this._upKeys = null;
    this._downKeys = null;
    this._jumpKeys = null;
    this._customKeys = null;
    this._renderEngineClass = null;
    this._renderEngine.dispose();
    this._soundEngine = null;
    this._movement = null;
    this._input = null;
    this._subscribers = null;
    this._screen.bitmapData.dispose();
    return this._screen = null;
  };

  return Game;

})();

Game.prototype.__defineGetter__("renderEngineClass", function() {
  return this._renderEngineClass;
});

Game.prototype.__defineSetter__("renderEngineClass", function(val) {
  return this._renderEngineClass = val;
});

Game.prototype.__defineGetter__("collisionEngineClass", function() {
  return this._collisionEngineClass;
});

Game.prototype.__defineSetter__("collisionEngineClass", function(val) {
  return this._collisionEngineClass = val;
});

Game.prototype.__defineGetter__("physicsEngineClass", function() {
  return this._physicsEngineClass;
});

Game.prototype.__defineSetter__("physicsEngineClass", function(val) {
  return this._physicsEngineClass = value;
});

Game.prototype.__defineGetter__("players", function() {
  return this._players;
});

Game.prototype.__defineSetter__("players", function(val) {
  return this._players = value;
});

Game.prototype.__defineGetter__("maps", function() {
  return this._maps;
});

Game.prototype.__defineSetter__("maps", function(val) {
  return this._maps = value;
});

Game.prototype.__defineGetter__("activeMap", function() {
  return this._activeMap;
});

Game.prototype.__defineSetter__("activeMap", function(val) {
  return this._activeMap = value;
});

Game.prototype.__defineSetter__("activePlayer", function(val) {
  return this._activePlayer = value;
});

Game.prototype.__defineGetter__("activePlayer", function() {
  return this._activePlayer;
});

Game.prototype.__defineGetter__("leftKeys", function() {
  return this._leftKeys;
});

Game.prototype.__defineSetter__("leftKeys", function(val) {
  var _leftKeys;
  return _leftKeys = value;
});

Game.prototype.__defineGetter__("rightKeys", function() {
  return this._rightKeys;
});

Game.prototype.__defineSetter__("rightKeys", function(val) {
  return this._rightKeys = value;
});

Game.prototype.__defineGetter__("upKeys", function() {
  return this._upKeys;
});

Game.prototype.__defineSetter__("upKeys", function(val) {
  return this._upKeys = value;
});

Game.prototype.__defineGetter__("downKeys", function() {
  return this._downKeys;
});

Game.prototype.__defineSetter__("downKeys", function(val) {
  return this._downKeys = value;
});

Game.prototype.__defineGetter__("jumpKeys", function() {
  return this._jumpKeys;
});

Game.prototype.__defineSetter__("jumpKeys", function(val) {
  return this._jumpKeys = value;
});

Game.prototype.__defineGetter__("customKeys", function() {
  return this._customKeys;
});

Game.prototype.__defineSetter__("customKeys", function(val) {
  return this._customKeys = value;
});

Game.prototype.__defineGetter__("pause", function() {
  return this._pause;
});

Game.prototype.__defineSetter__("pause", function(val) {
  return this._pause = value;
});
