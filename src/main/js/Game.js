var Game;

Game = (function() {
  var _activeMap, _activePlayer, _animationFrameRequest, _collisionEngineClass, _container, _customKey, _customKeys, _downKeys, _fgscreen, _frameWait, _input, _instance, _isStarted, _jumpKeys, _leftKeys, _maps, _movement, _parent, _pause, _physicsEngineClass, _players, _prefetchTmp, _renderEngine, _renderEngineClass, _requiredAssets, _rightKeys, _screen, _soundEngine, _subscribers, _timer, _toFetchAssets, _upKeys, _useMultipleCanvas;

  function Game(name) {
    this.name = name;
    Game.prototype.instance = this;
    this.keyboard = new Keyboard();
    this.setAnimationFrameRequest();
    this._start = window.mozAnimationStartTime || Date.now();
    this._requiredAssets = 0;
    this._useMultipleCanvas = false;
    this._frameWait = 0;
  }

  _subscribers = [];

  _pause = false;

  _isStarted = false;

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

  _parent = {};

  _screen = {};

  _fgscreen = void 0;

  _renderEngineClass = {};

  _collisionEngineClass = {};

  _physicsEngineClass = {};

  _renderEngine = {};

  _soundEngine = {};

  _movement = {};

  _input = {};

  _timer = {};

  _instance = {};

  _animationFrameRequest = {};

  _toFetchAssets = 0;

  _requiredAssets = 0;

  _prefetchTmp = [];

  _container = {};

  _useMultipleCanvas = false;

  _frameWait = 0;

  Game.prototype.render = function(timestamp) {
    var progress;
    progress = timestamp - this._start;
    _renderEngine.render(_input);
    if (progress < 2000) return requestAnimationFrame(this.render.bind(this));
  };

  Game.prototype.renderDelegate = function() {
    if (this._pause) return;
    if (_animationFrameRequest) {
      return _animationFrameRequest(this.render.bind(this));
    } else {
      return _renderEngine.render(_input);
    }
  };

  Game.prototype.setAnimationFrameRequest = function() {
    var w;
    w = window;
    return _animationFrameRequest = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || w.msRequestAnimationFrame;
  };

  Game.prototype.start = function() {
    if (!_isStarted) {
      _timer = setInterval(this.renderDelegate.bind(this), 80);
      return _isStarted = true;
    }
  };

  Game.prototype.prefetch = function(items) {
    var audio, img, item, tmp, _i, _len, _results;
    this._toFetchAssets = 0;
    this._prefetchTmp = [];
    _results = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      tmp = new item();
      this._prefetchTmp.push(tmp);
      if (tmp.assetClass) {
        this._requiredAssets++;
        this._toFetchAssets++;
        img = new Image();
        this._prefetchTmp.push(img);
        img.onload = this.handleImagePrefetch.bind(this);
        img.src = tmp.assetClass;
      }
      if (tmp.sound) {
        this._toFetchAssets++;
        this._requiredAssets++;
        audio = new Audio();
        this._prefetchTmp.push(audio);
        audio.addEventListener('canplaythrough', this.handleAudioPrefetch.bind(this), false);
        audio.src = tmp.sound;
        if (Bootstrap.prototype.IS_IE) {
          _results.push(this.handleAudioPrefetch({
            currentTarget: audio
          }));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Game.prototype.handleImagePrefetch = function() {
    this._toFetchAssets--;
    console.log("pretch asset loaded " + this._toFetchAssets);
    if (this._toFetchAssets === 0) {
      this._prefetchTmp = [];
      return this.checkForReady();
    } else {
      return this._requiredAssets--;
    }
  };

  Game.prototype.handleAudioPrefetch = function(e) {
    var index;
    console.log("audio asset loaded");
    index = this._prefetchTmp.indexOf(e.currentTarget, 0);
    if (index >= 0) {
      this._prefetchTmp.splice(index, index + 1);
      return this.handleImagePrefetch();
    }
  };

  Game.prototype.checkForReady = function() {
    this._requiredAssets--;
    console.log("checking " + this._requiredAssets);
    if (this._requiredAssets === 0) {
      return Game.prototype.instance.notifySubscribers(Game.prototype.Ready, {}, {}, []);
    }
  };

  Game.prototype.preinitialize = function(parent, width, height) {
    var holder;
    _parent = parent;
    Game.prototype.VIEWPORT_HEIGHT = height;
    Game.prototype.VIEWPORT_WIDTH = width;
    holder = this.container ? this.container : document.body;
    _screen = document.createElement("canvas");
    _screen.setAttribute("width", this.VIEWPORT_WIDTH);
    _screen.setAttribute("height", this.VIEWPORT_HEIGHT);
    _screen.setAttribute("tabIndex", 0);
    _screen.setAttribute("id", "scrn");
    if (this.useMultipleCanvas) {
      _screen.setAttribute("style", "position: absolute; z-index: 0");
    }
    holder.appendChild(_screen);
    if (this.useMultipleCanvas) {
      _fgscreen = document.createElement("canvas");
      _fgscreen.setAttribute("width", this.VIEWPORT_WIDTH);
      _fgscreen.setAttribute("height", this.VIEWPORT_HEIGHT);
      _fgscreen.setAttribute("tabIndex", 1);
      _fgscreen.setAttribute("id", "fgscrn");
      _fgscreen.setAttribute("style", "position: absolute; z-index: 1");
      holder.appendChild(_fgscreen);
    }
    return this.initialize();
  };

  Game.prototype.initialize = function() {
    var map, player;
    if (!this.renderEngineClass) {
      _renderEngine = new RenderEngine();
    } else {
      _renderEngine = new _renderEngineClass();
    }
    if (!this.collisionEngineClass) {
      _renderEngine.collisionEngine = new CollisionEngine();
    } else {
      _renderEngine.collisionEngine = new _collisionEngineClass();
    }
    if (!this.physicsEngineClass) {
      _renderEngine.physicsEngine = new PhysicsEngine();
    } else {
      _renderEngine.physicsEngine = new _physicsEngineClass();
    }
    if (this.maps.length === 0) {
      console.log("Blitgin_as :: [ERROR] :: you need at least one map.");
    }
    if (this.players.length === 0) {
      console.log("Blitgin_as :: [ERROR] :: you need at least one player.");
    }
    _soundEngine = new SoundEngine();
    _renderEngine.soundEngine = _soundEngine;
    map = this.maps[_activeMap];
    player = this.players[_activePlayer];
    _renderEngine.scrn = _screen;
    _renderEngine.fgscrn = _fgscreen;
    _renderEngine.map = new map();
    _renderEngine.player = new player();
    _renderEngine.frameWait = this.frameWait;
    if (_renderEngine.map.platform) {
      this._requiredAssets += Map.prototype.TOTAL_PARALAX_ASSETS - 1;
    } else {
      this._requiredAssets += Map.prototype.TOTAL_STANDARD_ASSETS - 1;
    }
    this._requiredAssets += 1;
    _input = new Input();
    _input.direction = 0;
    _input.jump = 0;
    _input.jumpLock = false;
    _input.customKey = 0;
    return this.addListeners();
  };

  Game.prototype.addListeners = function() {
    document.onkeydown = this.manageMovement.bind(this);
    document.onkeyup = this.manageMovement.bind(this);
    return _screen.focus();
  };

  Game.prototype.removeListeners = function() {
    document.onkeydown = void 0;
    return document.onkeyup = void 0;
  };

  Game.prototype.manageMovement = function(e) {
    var key;
    if (_input.disabled) return;
    if (window.event) {
      key = window.event.keyCode;
    } else {
      key = e.keyCode;
    }
    if (e.type === Keyboard.prototype.KEY_UP) {
      _input.direction = this.checkKey(this.leftKeys, key) ? 0 : _input.direction;
      _input.direction = this.checkKey(this.rightKeys, key) ? 0 : _input.direction;
      _input.vDirection = this.checkKey(this.upKeys, key) ? 0 : _input.vDirection;
      _input.vDirection = this.checkKey(this.downKeys, key) ? 0 : _input.vDirection;
      _input.jump = this.checkKey(this.jumpKeys, key) ? 0 : _input.jump;
      _input.customKey = this.checkKey(this.customKeys, key) ? 0 : _input.customKey;
    } else {
      _input.direction = this.checkKey(this.leftKeys, key) ? -1 : _input.direction;
      _input.direction = this.checkKey(this.rightKeys, key) ? 1 : _input.direction;
      _input.vDirection = this.checkKey(this.upKeys, key) ? -1 : _input.direction;
      _input.vDirection = this.checkKey(this.downKeys, key) ? 1 : _input.direction;
      _input.jump = this.checkKey(this.jumpKeys, key) ? 1 : _input.jump;
    }
    if (this.checkKey(this.customKeys, key)) {
      return _input.customKey = this.customKeys[_customKey];
    }
  };

  Game.prototype.checkKey = function(arr, keyCode) {
    var index;
    if (!arr) return;
    index = arr.indexOf(keyCode, 0);
    _customKey = index;
    return index !== -1;
  };

  Game.prototype.dispose = function() {
    removeListeners();
    this.players = void 0;
    this.maps = void 0;
    this.leftKeys = void 0;
    this.rightKeys = void 0;
    this.upKeys = void 0;
    this.downKeys = void 0;
    this.jumpKeys = void 0;
    this.customKeys = void 0;
    this.renderEngineClass = void 0;
    this.renderEngine.dispose();
    _soundEngine = void 0;
    _movement = void 0;
    _input = void 0;
    _subscribers = void 0;
    return _screen = void 0;
  };

  Game.prototype.notifySubscribers = function(event, map, player, actions) {
    var subscriber, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = _subscribers.length; _i < _len; _i++) {
      subscriber = _subscribers[_i];
      _results.push(subscriber.notify(event, map, player, actions));
    }
    return _results;
  };

  Game.prototype.subscribe = function(subscriber) {
    return _subscribers.push(subscriber);
  };

  Game.prototype.unsubscribe = function(subscriber) {
    return _subscribers.slice(_subscribers.indexOf(subscriber), _subscribers.indexOf(subscriber) + 1 || 9e9);
  };

  return Game;

})();

Game.prototype.name = "Game";

Game.prototype.Ready = "Ready";

Game.prototype.Rendered = "Rendered";

Game.prototype.__defineGetter__("instance", function() {
  return this._instance;
});

Game.prototype.__defineSetter__("instance", function(val) {
  return this._instance = val;
});

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
  return this._physicsEngineClass = val;
});

Game.prototype.__defineGetter__("players", function() {
  return this._players;
});

Game.prototype.__defineSetter__("players", function(val) {
  return this._players = val;
});

Game.prototype.__defineGetter__("maps", function() {
  return this._maps;
});

Game.prototype.__defineSetter__("maps", function(val) {
  return this._maps = val;
});

Game.prototype.__defineGetter__("activeMap", function() {
  return this._activeMap;
});

Game.prototype.__defineSetter__("activeMap", function(val) {
  return this._activeMap = val;
});

Game.prototype.__defineSetter__("activePlayer", function(val) {
  return this._activePlayer = val;
});

Game.prototype.__defineGetter__("activePlayer", function() {
  return this._activePlayer;
});

Game.prototype.__defineGetter__("leftKeys", function() {
  return this._leftKeys;
});

Game.prototype.__defineSetter__("leftKeys", function(val) {
  return this._leftKeys = val;
});

Game.prototype.__defineGetter__("rightKeys", function() {
  return this._rightKeys;
});

Game.prototype.__defineSetter__("rightKeys", function(val) {
  return this._rightKeys = val;
});

Game.prototype.__defineGetter__("upKeys", function() {
  return this._upKeys;
});

Game.prototype.__defineSetter__("upKeys", function(val) {
  return this._upKeys = val;
});

Game.prototype.__defineGetter__("downKeys", function() {
  return this._downKeys;
});

Game.prototype.__defineSetter__("downKeys", function(val) {
  return this._downKeys = val;
});

Game.prototype.__defineGetter__("jumpKeys", function() {
  return this._jumpKeys;
});

Game.prototype.__defineSetter__("jumpKeys", function(val) {
  return this._jumpKeys = val;
});

Game.prototype.__defineGetter__("customKeys", function() {
  return this._customKeys;
});

Game.prototype.__defineSetter__("customKeys", function(val) {
  return this._customKeys = val;
});

Game.prototype.__defineGetter__("pause", function() {
  return this._pause;
});

Game.prototype.__defineSetter__("pause", function(val) {
  return this._pause = val;
});

Game.prototype.__defineGetter__("keyboard", function() {
  return this._keyboard;
});

Game.prototype.__defineSetter__("keyboard", function(val) {
  return this._keyboard = val;
});

Game.prototype.__defineGetter__("container", function() {
  return this._container;
});

Game.prototype.__defineSetter__("container", function(val) {
  return this._container = val;
});

Game.prototype.__defineGetter__("useMultipleCanvas", function() {
  return this._useMultipleCanvas;
});

Game.prototype.__defineSetter__("useMultipleCanvas", function(val) {
  return this._useMultipleCanvas = val;
});

Game.prototype.__defineGetter__("frameWait", function() {
  return this._frameWait;
});

Game.prototype.__defineSetter__("frameWait", function(val) {
  return this._frameWait = val;
});
