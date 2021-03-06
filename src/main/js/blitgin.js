var Action, Bootstrap, CollisionEngine, Emitter, Enemy, EnemyGroup, Game, GameError, Group, Input, Keyboard, Map, MapObject, MapObjectGroup, Nis, NisCondition, NisGoal, Particle, PhysicsEngine, Player, Point, Rectangle, RenderEngine, RenderObject, SoundEngine, State,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Bootstrap = (function() {
  var callBack, createAccessors, hasCustomAccessors, _classes, _collection, _ref;

  function Bootstrap(name) {
    this.name = name;
    this.checkForIE();
    this.checkExt();
    this.checkBind();
    this.checkAccessors();
  }

  _classes = ["Point", "Rectangle", "Keyboard", "Game", "GameError", "Group", "RenderObject", "Action", "RenderEngine", "Composite", "State", "PhysicsEngine", "CollisionEngine", "SoundEngine", "Input", "Player", "Map", "MapObject", "MapObjectGroup", "Nis", "NisCondition", "NisGoal", "Particle", "Emitter", "Enemy", "EnemyGroup"];

  _collection = [];

  _ref = Bootstrap;

  _ref.getters = {};

  _ref.setters = {};

  hasCustomAccessors = false;

  callBack = {};

  Bootstrap.prototype.FULL = "full";

  Bootstrap.prototype.IS_IE = false;

  Bootstrap.prototype.checkForIE = function() {
    var all, div, i, undef, v;
    undef = "not ie";
    v = 8;
    div = document.createElement('div');
    all = div.getElementsByTagName('i');
    for (i = v; v <= 11 ? i <= 11 : i >= 11; v <= 11 ? i++ : i--) {
      div.innerHTML = "<!--[if gt IE " + v + "]><i></i><![endif]-->";
      if (div.innerHTML === "") break;
      v = i;
    }
    if (v > 8) {
      return Bootstrap.prototype.IS_IE = true;
    } else {
      return Boostrap.prototype.IS_IE = false;
    }
  };

  Bootstrap.prototype.checkExt = function() {
    if (window.ext === void 0) {
      return window.ext = function(superClass, subClass) {
        var tmp;
        tmp = function() {};
        tmp.prototype = superClass.prototype;
        subClass.prototype = new tmp();
        subClass.prototype.constructor = subClass;
        return subClass;
      };
    }
  };

  Bootstrap.prototype.checkBind = function() {
    if (!Function.bind) {
      return Function.prototype.bind = function(bind) {
        var self;
        self = this;
        return function() {
          var args;
          args = Array.prototype.slice.call(arguments);
          return self.apply(bind || null, args);
        };
      };
    }
  };

  Bootstrap.prototype.checkAccessors = function() {
    if (!Object.__defineGetter__) {
      hasCustomAccessors = true;
      Object.prototype.__defineGetter__ = function(prop, func) {
        if (!_ref.getters[this.name]) _ref.getters[this.name] = {};
        _ref.getters[this.name]["name"] = this.name;
        return _ref.getters[this.name][prop] = func;
      };
    }
    if (!Object.__defineSetter__) {
      return Object.prototype.__defineSetter__ = function(prop, func) {
        if (!_ref.setters[this.name]) _ref.setters[this.name] = {};
        _ref.setters[this.name]["name"] = this.name;
        return _ref.setters[this.name][prop] = func;
      };
    }
  };

  Bootstrap.prototype.start = function(callback, basePath, mode) {
    var clazz, _i, _len;
    if (mode === Bootstrap.prototype.FULL) {
      for (_i = 0, _len = _classes.length; _i < _len; _i++) {
        clazz = _classes[_i];
        _collection[_i] = this.prepare(clazz, basePath);
      }
    }
    return this.load(callback);
  };

  Bootstrap.prototype.prepare = function(clazz, basePath) {
    return basePath + clazz + ".js";
  };

  Bootstrap.prototype.load = function(callback) {
    callBack = callback;
    if (_collection.length === 0) {
      Bootstrap.prototype.checkForWeave();
      return;
    }
    return $LAB.script(_collection).wait(function() {
      return Bootstrap.prototype.checkForWeave();
    });
  };

  Bootstrap.prototype.checkForWeave = function() {
    var clazz, tmp, _i, _len;
    if (hasCustomAccessors) {
      for (_i = 0, _len = _classes.length; _i < _len; _i++) {
        clazz = _classes[_i];
        tmp = {};
        tmp.name = clazz;
        Bootstrap.prototype.weave(tmp);
      }
      return callBack();
    } else {
      return callBack();
    }
  };

  Bootstrap.prototype.weave = function(target) {
    var obj, prop, _results;
    for (obj in _ref.getters) {
      if (obj !== "__defineGetter__" && obj !== "__defineSetter__" && _ref.getters[obj].name === target.name) {
        for (prop in _ref.getters[obj]) {
          if (prop !== "__defineGetter__" && prop !== "__defineSetter__" && prop !== "name") {
            if (_ref.setters[target.name][prop]) {
              createAccessors(target, prop, _ref.getters[target.name][prop], _ref.setters[target.name][prop]);
            } else {
              createAccessors(target, prop, _ref.getters[target.name][prop], function(val) {});
            }
          }
        }
      }
    }
    _results = [];
    for (obj in _ref.setters) {
      if (obj !== "__defineGetter__" && obj !== "__defineSetter__" && _ref.setters[obj].name === target.name) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (prop in _ref.setters[obj]) {
            if (prop !== "__defineGetter__" && prop !== "__defineSetter__" && prop !== "name") {
              if (_ref.getters[target.name][prop]) {
                _results2.push(createAccessors(target, prop, _ref.getters[target.name][prop], _ref.setters[target.name][prop]));
              } else {
                _results2.push(createAccessors(target, prop, (function() {}), _ref.setters[target.name][prop]));
              }
            } else {
              _results2.push(void 0);
            }
          }
          return _results2;
        })());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  createAccessors = function(obj, prop, getter, setter) {
    var tar;
    tar = eval(obj.name);
    return Object.defineProperty(tar.prototype, prop, {
      configurable: true,
      get: getter,
      set: setter
    });
  };

  return Bootstrap;

})();

Point = (function() {
  var _x, _y;

  function Point(_x, _y) {
    this._x = _x;
    this._y = _y;
  }

  _x = 0;

  _y = 0;

  return Point;

})();

Point.prototype.name = "Point";

Point.prototype.__defineGetter__("x", function() {
  return this._x;
});

Point.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

Point.prototype.__defineGetter__("y", function() {
  return this._y;
});

Point.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

Rectangle = (function() {
  var _height, _width, _x, _y;

  function Rectangle(_x, _y, _width, _height) {
    this._x = _x;
    this._y = _y;
    this._width = _width;
    this._height = _height;
  }

  _x = 0;

  _y = 0;

  _width = 0;

  _height = 0;

  return Rectangle;

})();

Rectangle.prototype.name = "Rectangle";

Rectangle.prototype.intersects = function(rect) {
  var lateral, vertical;
  lateral = (this.left < rect.left && rect.left < this.right) || (this.left < rect.right && rect.right < this.right);
  vertical = (this.top < rect.top && rect.top < this.bottom) || (this.top < rect.bottom && rect.bottom < this.bottom);
  return lateral && vertical;
};

Rectangle.prototype.intersection = function(rect) {
  return new Rectangle(Math.max(rect.left, this.left), Math.max(rect.top, this.top), Math.min(rect.right, this.right), Math.min(rect.bottom, this.bottom));
};

Rectangle.prototype.__defineGetter__("x", function() {
  return this._x;
});

Rectangle.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

Rectangle.prototype.__defineGetter__("y", function() {
  return this._y;
});

Rectangle.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

Rectangle.prototype.__defineGetter__("width", function() {
  return this._width;
});

Rectangle.prototype.__defineSetter__("width", function(val) {
  return this._width = val;
});

Rectangle.prototype.__defineGetter__("height", function() {
  return this._height;
});

Rectangle.prototype.__defineSetter__("height", function(val) {
  return this._height = val;
});

Rectangle.prototype.__defineGetter__("left", function() {
  return this._x;
});

Rectangle.prototype.__defineGetter__("top", function() {
  return this._y;
});

Rectangle.prototype.__defineGetter__("right", function() {
  return this._x + this._width;
});

Rectangle.prototype.__defineGetter__("bottom", function() {
  return this._y + this._height;
});

Keyboard = (function() {

  function Keyboard(name) {
    this.name = name;
  }

  return Keyboard;

})();

Keyboard.prototype.name = "Keyboard";

Keyboard.prototype.KEY_UP = "keyup";

Keyboard.prototype.KEY_DOWN = "keydown";

Keyboard.prototype.LEFT = 65;

Keyboard.prototype.RIGHT = 68;

Keyboard.prototype.SPACE = 32;

Game = (function() {
  var _activeMap, _activePlayer, _animationFrameRequest, _collisionEngineClass, _container, _currentFrame, _customKey, _customKeys, _downKeys, _fgscreen, _fps, _frameWait, _framerateBuffer, _input, _instance, _isStarted, _jumpKeys, _leftKeys, _maps, _movement, _parent, _pause, _physicsEngineClass, _players, _prefetchTmp, _renderEngine, _renderEngineClass, _requiredAssets, _rightKeys, _screen, _server, _socket, _socketFrame, _socketReady, _soundEngine, _subscribers, _timer, _toFetchAssets, _upKeys, _useMultipleCanvas;

  function Game(name) {
    this.name = name;
    Game.prototype.instance = this;
    this.keyboard = new Keyboard();
    this.setAnimationFrameRequest();
    this._requiredAssets = 0;
    this._useMultipleCanvas = false;
    this._frameWait = 0;
    this._socketReady = false;
    this._socketFrame = 0;
    this._framerateBuffer = 0;
    this._currentFrame = 0;
    this.fps = 60;
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

  _server = {};

  _socket = {};

  _socketReady = false;

  _socketFrame = 0;

  _framerateBuffer = 2;

  _currentFrame = 0;

  _fps = 60;

  Game.prototype.render = function(timestamp) {
    var delta, msoverfps, mspf, tmp;
    mspf = Math.ceil(1000 / this.fps);
    delta = timestamp - this._start;
    if (delta >= mspf) {
      msoverfps = delta - mspf;
      tmp = msoverfps / this.fps;
      Game.prototype.DeltaFrames = tmp.toFixed(2);
      _renderEngine.render(_input);
      this._start = timestamp;
    } else {
      Game.prototype.DeltaFrames = 0;
    }
    return _animationFrameRequest(this.render.bind(this));
  };

  Game.prototype.renderDelegate = function() {
    if (this._pause) return;
    if (_animationFrameRequest) {
      this._start = Date.now();
      return this.render(this._start);
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
    this._framerateBuffer = Math.round(60 / this.fps);
    if (!_isStarted) {
      this.renderDelegate();
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
    if (this._toFetchAssets === 0) {
      this._prefetchTmp = [];
      return this.checkForReady();
    } else {
      return this._requiredAssets--;
    }
  };

  Game.prototype.handleAudioPrefetch = function(e) {
    var index;
    index = this._prefetchTmp.indexOf(e.currentTarget, 0);
    if (index >= 0) {
      this._prefetchTmp.splice(index, index + 1);
      return this.handleImagePrefetch();
    }
  };

  Game.prototype.checkForReady = function() {
    this._requiredAssets--;
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
    if (this.maps.length === 0) GameError.warn("you need at least one map.");
    if (this.players.length === 0) GameError.warn("you need at least one player.");
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
    if (this._socketReady && this._socketFrame === this._server.sendEvery) {
      console.log("met sending");
      this._socket.send(JSON.stringify(this._server.msgTransform(event, map, player, actions)));
      this._socketFrame = 0;
    }
    if (this._socketReady) this._socketFrame++;
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

  Game.prototype.handleSocketMessage = function(e) {
    console.log("msg from server");
    console.log("msg type" + e.type);
    console.log("msg origin " + e.origin);
    console.log("msg timestamp " + e.timeStamp);
    return console.log("msg data " + e.data);
  };

  Game.prototype.closeSocket = function() {
    if (this._socket) return this._socket.close();
  };

  return Game;

})();

Game.prototype.name = "Game";

Game.prototype.Ready = "Ready";

Game.prototype.Rendered = "Rendered";

Game.prototype.__defineGetter__("server", function() {
  return this._server;
});

Game.prototype.__defineSetter__("server", function(val) {
  var ref;
  try {
    WebSocket;
  } catch (error) {
    GameError.warn("WebSockets are not supported by this client");
    return;
  }
  ref = this;
  this._server = val;
  this._socket = new WebSocket(this._server.address);
  this._socket.onopen = function(e) {
    return ref._socketReady = true;
  };
  return this._socket.onmessage = this.handleSocketMessage.bind(this);
});

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

Game.prototype.__defineGetter__("fps", function() {
  return this._fps;
});

Game.prototype.__defineSetter__("fps", function(val) {
  if (val <= 60 && val > 0) {
    return this._fps = val;
  } else {
    this._fps = 60;
    return GameError.prototype.warn("FPS will be 60 because max FPS is 60 and min is 1");
  }
});

GameError = (function() {

  function GameError(name) {
    this.name = name;
  }

  return GameError;

})();

GameError.prototype.warn = function(msg) {
  return console.log("blitgin-js :: WARNING :: " + msg);
};

GameError.prototype.name = "GameError";

Group = (function() {
  var _independence, _positions, _type;

  function Group(type, positions, independence) {
    this.type = type;
    this.positions = positions;
    this.independence = independence;
  }

  _type = "";

  _positions = [];

  _independence = 0;

  return Group;

})();

Group.prototype.name = "Group";

Group.prototype.__defineGetter__("type", function() {
  return this._type;
});

Group.prototype.__defineSetter__("type", function(val) {
  return this._type = val;
});

Group.prototype.__defineGetter__("positions", function() {
  return this._positions;
});

Group.prototype.__defineSetter__("positions", function(val) {
  return this._positions = val;
});

Group.prototype.__defineGetter__("independence", function() {
  return this._independence;
});

Group.prototype.__defineSetter__("independence", function(val) {
  return this._independence = val;
});

RenderObject = (function() {
  var _asset, _assetClass, _assetData, _callback, _cellHeight, _cellWidth, _collisionPixels, _colorConstant, _ctx, _direction, _duration, _easeCoefficient, _frame, _frameBuffer, _height, _index, _lifeSpan, _objectKeyframeLength, _originalX, _originalY, _rgbTolerance, _showBounds, _transparency, _velocityX, _velocityY, _width, _workbench, _x, _y;

  function RenderObject(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
  }

  _transparency = false;

  _showBounds = false;

  _colorConstant = "#000000";

  _rgbTolerance = {};

  _workbench = {};

  _x = 0;

  _y = 0;

  _originalX = 0;

  _originalY = 0;

  _width = 0;

  _height = 0;

  _duration = 0;

  _frame = 0;

  _frameBuffer = 0;

  _velocityX = 0;

  _velocityY = 0;

  _easeCoefficient = 0;

  _index = 0;

  _lifeSpan = 0;

  _cellWidth = 0;

  _cellHeight = 0;

  _direction = 1;

  _assetClass = "";

  _asset = {};

  _assetData = {};

  _ctx = {};

  _callback = void 0;

  _collisionPixels = [];

  _objectKeyframeLength = 0;

  RenderObject.prototype.initialize = function(_callback) {
    this._callback = _callback;
    if ((void 0 !== this.assetClass) && (0 !== this.cellHeight) && (0 !== this.cellWidth)) {
      this.workbench = document.createElement("canvas");
      this.asset = new Image();
      this.assetData = new Image();
      this.asset.onload = this.assetLoadComplete.bind(this);
      return this.asset.src = this.assetClass;
    } else {
      return GameError.warn("Set a cellwidth , cellheight , and assetClass before calling initialize.");
    }
  };

  RenderObject.prototype.assetLoadComplete = function() {
    this.asset.onload = void 0;
    this.ctx = this.workbench.getContext('2d');
    this.objectKeyframeLength = 0;
    if (this.transparency || (!this.transparency && this.showBounds)) {
      this.assetData = this.asset;
    } else {
      this.removeColorConstantAndCache(this.asset, this.assetData);
    }
    if (this.x === void 0) this.x = 0;
    if (this.y === void 0) this.y = 0;
    if (this._callback) return this._callback();
  };

  RenderObject.prototype.removeColorConstantAndCache = function(asset, targetData, cachePixels) {
    var imageData, ref, worker;
    if (this.colorConstant === void 0) {
      GameError.warn("You need to set a hex value for colorConstant , or set tranparency true if no color is to be sampled out.");
    }
    this.workbench.width = asset.width;
    this.workbench.height = asset.height;
    this.ctx.drawImage(asset, 0, 0);
    imageData = this.ctx.getImageData(0, 0, this.workbench.width, this.workbench.height);
    try {
      worker = new Worker('../src/main/js/RemoveColorTask.js');
    } catch (error) {
      worker = {};
      worker.postMessage = this.removeSampleColor;
      worker.terminate = function() {};
    }
    ref = this;
    worker.onmessage = function(e) {
      if (cachePixels) ref.collisionPixels = e.data;
      ref.ctx.clearRect(0, 0, ref.workbench.width, ref.workbench.height);
      ref.ctx.putImageData(e.data, 0, 0);
      targetData.src = null;
      targetData.src = ref.workbench.toDataURL();
      ref.notifyReady();
      worker.terminate();
      return worker = null;
    };
    worker.onerror = function(e) {
      return GameError.warn("Error in worker");
    };
    return worker.postMessage({
      "imageData": imageData,
      "colorConstant": this.colorConstant,
      "rgbTolerance": this.rgbTolerance
    });
  };

  RenderObject.prototype.removeSampleColor = function(event) {
    var a, b, bv, dataRef, g, gv, imageData, index, parsed, r, rv, t, val, xpos, ypos, _ref, _ref2;
    imageData = event.imageData;
    parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(event.colorConstant);
    rv = parseInt(parsed[1], 16);
    gv = parseInt(parsed[2], 16);
    bv = parseInt(parsed[3], 16);
    val = rv + gv + bv;
    t = event.rgbTolerance;
    for (xpos = 0, _ref = imageData.width - 1; 0 <= _ref ? xpos <= _ref : xpos >= _ref; 0 <= _ref ? xpos++ : xpos--) {
      for (ypos = 0, _ref2 = imageData.height - 1; 0 <= _ref2 ? ypos <= _ref2 : ypos >= _ref2; 0 <= _ref2 ? ypos++ : ypos--) {
        index = 4 * (ypos * imageData.width + xpos);
        dataRef = imageData.data;
        r = dataRef[index];
        g = dataRef[index + 1];
        b = dataRef[index + 2];
        a = dataRef[index + 3];
        if (t !== void 0) {
          if (r <= rv + t.r && g <= gv + t.g && b <= bv + t.b) {
            dataRef[index + 3] = 0;
          }
        } else if ((r + g + b) === val) {
          dataRef[index + 3] = 0;
        }
      }
    }
    return this.onmessage({
      data: imageData
    });
  };

  RenderObject.prototype.notifyReady = function() {
    return Game.prototype.instance.checkForReady();
  };

  RenderObject.prototype.dispose = function() {
    _assetClass = void 0;
    return _asset = void 0;
  };

  return RenderObject;

})();

RenderObject.prototype.name = "RenderObject";

RenderObject.prototype.__defineGetter__("bitmapData", function() {
  var keyFrame;
  keyFrame = this.objectKeyframeLength * this.cellWidth;
  if (this.ctx === void 0) {
    return {
      player: {
        notready: true
      },
      rect: new Rectangle(keyFrame, 0, this.cellWidth, this.cellHeight)
    };
  }
  return {
    player: this.assetData,
    rect: new Rectangle(keyFrame, 0, this.cellWidth, this.cellHeight)
  };
});

RenderObject.prototype.__defineGetter__("x", function() {
  return this._x;
});

RenderObject.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

RenderObject.prototype.__defineGetter__("y", function() {
  return this._y;
});

RenderObject.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

RenderObject.prototype.__defineGetter__("originalX", function() {
  return this._originalX;
});

RenderObject.prototype.__defineSetter__("originalX", function(val) {
  return this._originalX = val;
});

RenderObject.prototype.__defineGetter__("originalY", function() {
  return this._originalY;
});

RenderObject.prototype.__defineSetter__("originalY", function(val) {
  return this._originalY = val;
});

RenderObject.prototype.__defineGetter__("width", function() {
  return this.cellWidth;
});

RenderObject.prototype.__defineGetter__("height", function() {
  return this.cellHeight;
});

RenderObject.prototype.__defineGetter__("cellWidth", function() {
  return this._cellWidth;
});

RenderObject.prototype.__defineSetter__("cellWidth", function(val) {
  return this._cellWidth = val;
});

RenderObject.prototype.__defineGetter__("cellHeight", function() {
  return this._cellHeight;
});

RenderObject.prototype.__defineSetter__("cellHeight", function(val) {
  return this._cellHeight = val;
});

RenderObject.prototype.__defineSetter__("velocityX", function(val) {
  return this._velocityX = val;
});

RenderObject.prototype.__defineGetter__("velocityX", function() {
  return this._velocityX;
});

RenderObject.prototype.__defineSetter__("velocityY", function(val) {
  return this._velocityY = val;
});

RenderObject.prototype.__defineGetter__("velocityY", function() {
  return this._velocityY;
});

RenderObject.prototype.__defineSetter__("direction", function(val) {
  return this._direction = val;
});

RenderObject.prototype.__defineGetter__("direction", function() {
  return this._direction;
});

RenderObject.prototype.__defineSetter__("easeCoefficient", function(val) {
  return this._easeCoefficient = val;
});

RenderObject.prototype.__defineGetter__("easeCoefficient", function() {
  return this._easeCoefficient;
});

RenderObject.prototype.__defineSetter__("frame", function(val) {
  return this._frame = val;
});

RenderObject.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

RenderObject.prototype.__defineSetter__("frameBuffer", function(val) {
  return this._frameBuffer = val;
});

RenderObject.prototype.__defineGetter__("frameBuffer", function() {
  return this._frameBuffer;
});

RenderObject.prototype.__defineSetter__("duration", function(val) {
  return this._duration = val;
});

RenderObject.prototype.__defineGetter__("duration", function() {
  return this._duration;
});

RenderObject.prototype.__defineGetter__("rect", function() {
  return new Rectangle(0, 0, this.width, this.height);
});

RenderObject.prototype.__defineGetter__("point", function() {
  return new Point(this._x, this._y);
});

RenderObject.prototype.__defineSetter__("transparency", function(val) {
  return this._transparency = val;
});

RenderObject.prototype.__defineGetter__("transparency", function() {
  return this._transparency;
});

RenderObject.prototype.__defineSetter__("colorConstant", function(val) {
  return this._colorConstant = val;
});

RenderObject.prototype.__defineGetter__("colorConstant", function() {
  return this._colorConstant;
});

RenderObject.prototype.__defineSetter__("rgbTolerance", function(val) {
  return this._rgbTolerance = val;
});

RenderObject.prototype.__defineGetter__("rgbTolerance", function() {
  return this._rgbTolerance;
});

RenderObject.prototype.__defineGetter__("showBounds", function() {
  return this._showBounds;
});

RenderObject.prototype.__defineSetter__("showBounds", function(val) {
  return this._showBounds = val;
});

RenderObject.prototype.__defineGetter__("asset", function() {
  return this._asset;
});

RenderObject.prototype.__defineSetter__("asset", function(val) {
  return this._asset = val;
});

RenderObject.prototype.__defineGetter__("assetClass", function() {
  return this._assetClass;
});

RenderObject.prototype.__defineSetter__("assetClass", function(val) {
  return this._assetClass = val;
});

RenderObject.prototype.__defineGetter__("assetData", function() {
  return this._assetData;
});

RenderObject.prototype.__defineSetter__("assetData", function(val) {
  return this._assetData = val;
});

RenderObject.prototype.__defineGetter__("workbench", function() {
  return this._workbench;
});

RenderObject.prototype.__defineSetter__("workbench", function(val) {
  return this._workbench = val;
});

RenderObject.prototype.__defineGetter__("ctx", function() {
  if (this._ctx === void 0) {
    return;
  } else {
    return this._ctx;
  }
});

RenderObject.prototype.__defineSetter__("ctx", function(val) {
  return this._ctx = val;
});

RenderObject.prototype.__defineGetter__("collisionPixels", function() {
  return this._collisionPixels;
});

RenderObject.prototype.__defineSetter__("collisionPixels", function(val) {
  return this._collisionPixels = val;
});

RenderObject.prototype.__defineGetter__("objectKeyframeLength", function() {
  return this._objectKeyframeLength;
});

RenderObject.prototype.__defineSetter__("objectKeyframeLength", function(val) {
  return this._objectKeyframeLength = val;
});

Action = (function(_super) {
  var _bitmapData, _collisionCoefficient, _composite, _damage, _emitter, _frame, _hasAnimated, _health, _height, _id, _isAnimating, _isComplete, _lifeSpan, _maxVelocityX, _nonObjectProducing, _owner, _sound, _soundLoops, _spammable, _state, _stateCollisionLeft, _stateCollisionRight, _stateJumpLeft, _stateJumpRight, _stateLeft, _stateRight, _wait, _width;

  __extends(Action, _super);

  function Action() {
    Action.__super__.constructor.apply(this, arguments);
  }

  Action.prototype.contructor = function(name) {
    this.name = name;
  };

  _isComplete = false;

  _isAnimating = false;

  _hasAnimated = false;

  _nonObjectProducing = false;

  _spammable = false;

  _wait = 0;

  _width = 0;

  _height = 0;

  _frame = 0;

  _lifeSpan = 0;

  _collisionCoefficient = 0;

  _health = 100;

  _damage = 10;

  _soundLoops = 0;

  _maxVelocityX = 0;

  _owner = "";

  _id = "";

  _bitmapData = {};

  _sound = {};

  _stateLeft = {};

  _stateRight = {};

  _stateCollisionRight = {};

  _stateCollisionLeft = {};

  _stateJumpRight = {};

  _stateJumpLeft = {};

  _state = {};

  _composite = {};

  _emitter = {};

  Action.prototype.loadedMetadata = function() {
    return GameError.warn("LOADED METADADA");
  };

  Action.prototype.audioAvailable = function() {
    return GameError.warn("audioAvailable");
  };

  return Action;

})(RenderObject);

Action.prototype.name = "Action";

Action.prototype.__defineGetter__("velocityX", function() {
  return this._velocityX;
});

Action.prototype.__defineSetter__("velocityX", function(val) {
  if (val <= this.maxVelocityX) return this._velocityX = val;
});

Action.prototype.__defineGetter__("maxVelocityX", function() {
  return this._maxVelocityX;
});

Action.prototype.__defineSetter__("maxVelocityX", function(val) {
  return this._maxVelocityX = val;
});

Action.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.x, this.y, this.width, this.height);
});

Action.prototype.__defineGetter__("collisionCoefficient", function() {
  return this._collisionCoefficient;
});

Action.prototype.__defineSetter__("collisionCoefficient", function(val) {
  return this._collisionCoefficient = val;
});

Action.prototype.__defineGetter__("id", function() {
  return this._id;
});

Action.prototype.__defineSetter__("id", function(val) {
  return this._id = val;
});

Action.prototype.__defineGetter__("lifeSpan", function() {
  return this._lifeSpan;
});

Action.prototype.__defineSetter__("lifeSpan", function(val) {
  return this._lifeSpan = val;
});

Action.prototype.__defineGetter__("damage", function() {
  return this._damage;
});

Action.prototype.__defineSetter__("damage", function(val) {
  return this._damage = val;
});

Action.prototype.__defineGetter__("health", function() {
  return this._health;
});

Action.prototype.__defineSetter__("health", function(val) {
  this._health = val;
  if (val <= 0) return this.isComplete = true;
});

Action.prototype.__defineGetter__("owner", function() {
  return this._owner;
});

Action.prototype.__defineSetter__("owner", function(val) {
  return this._owner = val;
});

Action.prototype.__defineGetter__("nonObjectProducing", function() {
  return this._nonObjectProducing;
});

Action.prototype.__defineSetter__("nonObjectProducing", function(val) {
  return this._nonObjectProducing = val;
});

Action.prototype.__defineGetter__("isComplete", function() {
  return this._isComplete;
});

Action.prototype.__defineSetter__("isComplete", function(val) {
  return this._isComplete = val;
});

Action.prototype.__defineGetter__("isAnimating", function() {
  return this._isAnimating;
});

Action.prototype.__defineSetter__("isAnimating", function(val) {
  return this._isAnimating = val;
});

Action.prototype.__defineGetter__("hasAnimated", function() {
  return this._hasAnimated;
});

Action.prototype.__defineSetter__("hasAnimated", function(val) {
  return this._hasAnimated = val;
});

Action.prototype.__defineGetter__("spammable", function() {
  return this._spammable;
});

Action.prototype.__defineSetter__("spammable", function(val) {
  return this._spammable = val;
});

Action.prototype.__defineGetter__("wait", function() {
  return this._wait;
});

Action.prototype.__defineSetter__("wait", function(val) {
  return this._wait = val;
});

Action.prototype.__defineGetter__("stateLeft", function() {
  return this._stateLeft;
});

Action.prototype.__defineSetter__("stateLeft", function(val) {
  return this._stateLeft = val;
});

Action.prototype.__defineGetter__("stateRight", function() {
  return this._stateRight;
});

Action.prototype.__defineSetter__("stateRight", function(val) {
  return this._stateRight = val;
});

Action.prototype.__defineGetter__("stateCollisionLeft", function() {
  return this._stateCollisionLeft;
});

Action.prototype.__defineSetter__("stateCollisionLeft", function(val) {
  return this._stateCollisionLeft = val;
});

Action.prototype.__defineGetter__("stateCollisionRight", function() {
  return this._stateCollisionRight;
});

Action.prototype.__defineSetter__("stateCollisionRight", function(val) {
  return this._stateCollisionRight = val;
});

Action.prototype.__defineGetter__("stateJumpRight", function() {
  return this._stateJumpRight;
});

Action.prototype.__defineSetter__("stateJumpRight", function(val) {
  return this._stateJumpRight = val;
});

Action.prototype.__defineGetter__("stateJumpLeft", function() {
  return this._stateJumpLeft;
});

Action.prototype.__defineSetter__("stateJumpLeft", function(val) {
  return this._stateJumpLeft = val;
});

Action.prototype.__defineGetter__("state", function() {
  if (this.direction === 1) {
    return this.stateRight;
  } else {
    return this.stateLeft;
  }
});

Action.prototype.__defineGetter__("composite", function() {
  return this._composite;
});

Action.prototype.__defineSetter__("composite", function(val) {
  return this._composite = val;
});

Action.prototype.__defineGetter__("emitter", function() {
  return this._emitter;
});

Action.prototype.__defineSetter__("emitter", function(val) {
  return this._emitter = val;
});

Action.prototype.__defineGetter__("sound", function() {
  return this._sound;
});

Action.prototype.__defineSetter__("sound", function(val) {
  return this._sound = val;
});

Action.prototype.__defineGetter__("soundLoops", function() {
  return this._soundLoops;
});

Action.prototype.__defineSetter__("soundLoops", function(val) {
  return this._soundLoops = val;
});

Action.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Action.prototype.__defineSetter__("frame", function(val) {
  if (val >= this.lifeSpan) this.isComplete = true;
  this._frame = val;
  if (this.asset === void 0) {
    this.objectKeyframeLength = 0;
    return;
  }
  if (this.objectKeyframeLength === (Math.round(this.asset.width / this.cellWidth) - 1)) {
    this.objectKeyframeLength = 0;
    return;
  }
  return this.objectKeyframeLength = val;
});

Action.prototype.ENEMY = "enemy";

Action.prototype.PLAYER = "player";

RenderEngine = (function() {
  var _collisionEngine, _fgscrn, _frameWait, _map, _nis, _physicsEngine, _player, _scrn, _soundEngine;

  function RenderEngine(name) {
    this.name = name;
    this.actionObjects = [];
  }

  _scrn = {};

  _fgscrn = {};

  _map = {};

  _player = {};

  _nis = {};

  _soundEngine = {};

  _collisionEngine = {};

  _physicsEngine = {};

  RenderEngine._ctx = {};

  _frameWait = 0;

  RenderEngine.prototype.render = function(input) {
    var aObj, action, enemy, mObj, mapObj;
    if (this._fgctx !== void 0) {
      this._fgctx.clearRect(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.VIEWPORT_HEIGHT);
    } else {
      this._ctx.clearRect(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.VIEWPORT_HEIGHT);
    }
    if (this._nis !== void 0) {
      this.manageNis(this._nis, input);
      return;
    }
    this.managePlayer(input);
    this.manageMap(input);
    this.paint(this.map);
    this.map.manageElements(Map.prototype.MANAGE_ENEMIES);
    for (enemy in this.map.activeEnemies) {
      if (enemy === "__defineGetter__" || enemy === "__defineSetter__") continue;
      this.manageEnemy(this.map.activeEnemies[enemy]);
      this.paint(this.map.activeEnemies[enemy]);
    }
    this.manageNewActions(input);
    for (action in this.actionObjects) {
      if (action === "__defineGetter__" || action === "__defineSetter__") continue;
      aObj = this.actionObjects[action];
      if (this.actionIsIdle(aObj)) continue;
      this.manageAction(aObj, input);
      this.paint(aObj);
    }
    for (mapObj in this.map.activeMapObjects) {
      if (mapObj === "__defineGetter__" || mapObj === "__defineSetter__") continue;
      mObj = this.map.activeMapObjects[mapObj];
      mObj.frame++;
      this.manageMapObject(mObj);
      this.paint(mObj);
    }
    this.map.manageElements(Map.prototype.MANAGE_MAP_OBJECTS);
    this.paint(this.player);
    if (this.player.composite !== void 0) {
      this.player.composite.frame++;
      this.paint(this.player.composite);
    }
    if (this.player.emitter !== void 0 && this.player.emitter.hasParticles) {
      this.player.emitter.frame++;
      this.paint(this.player.emitter);
    }
    input.manageWaits();
    return Game.prototype.instance.notifySubscribers(Game.prototype.RENDERED, this.map, this.player, this.actionObjects);
  };

  RenderEngine.prototype.paint = function(obj) {
    var asset, d, i, item, pPoint, rect, tar, _i, _len, _len2, _ref, _ref2, _results, _results2;
    d = obj.bitmapData;
    tar = this._fgctx === void 0 ? this._ctx : this._fgctx;
    if (d.player && d.player.notready === void 0) {
      return tar.drawImage(d.player, d.rect.x, d.rect.y, d.rect.width, d.rect.height, Math.round(obj.point.x), Math.round(obj.point.y), d.rect.width, d.rect.height);
    } else if (d.player && d.player.notready) {} else if (d.particles) {
      _ref = d.particles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        rect = item.rect;
        pPoint = item.particle.point;
        _results.push(tar.drawImage(item.data, rect.x, rect.y, rect.width, rect.height, Math.round(pPoint.x), Math.round(pPoint.y), rect.width, rect.height));
      }
      return _results;
    } else {
      _ref2 = d.map;
      _results2 = [];
      for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
        asset = _ref2[i];
        if (asset.data !== void 0) {
          if (this._fgscrn === void 0) {
            this._ctx.drawImage(asset.data, asset.rect.x, asset.rect.y, asset.rect.width, asset.rect.height, obj.point.x, obj.point.y, asset.rect.width, asset.rect.height);
            continue;
          }
          if (i === 0 && this._fcount >= this.frameWait) {
            this._fcount = 0;
            this._ctx.drawImage(asset.data, asset.rect.x, asset.rect.y, asset.rect.width, asset.rect.height, obj.point.x, obj.point.y, asset.rect.width, asset.rect.height);
            this._fcount++;
            continue;
          } else if (i === 0 && this._fcount < this.frameWait) {
            this._fcount++;
            continue;
          }
          _results2.push(this._fgctx.drawImage(asset.data, asset.rect.x, asset.rect.y, asset.rect.width, asset.rect.height, obj.point.x, obj.point.y, asset.rect.width, asset.rect.height));
        } else {
          _results2.push(void 0);
        }
      }
      return _results2;
    }
  };

  RenderEngine.prototype.managePlayer = function(input) {
    if (input.customKey !== 0 && (!input.hasWaitFor(input.customKey)) && this.player.state.isCancellable) {
      this.player.revertState();
      this.player.isBusy = false;
    }
    if (input.direction !== 0 && this.player.state.isCancellable) {
      this.player.revertState();
      this.player.isBusy = false;
    }
    this.manageJump(input);
    this.physicsEngine.adjustPlayerVerically(this.player, this.map);
    if (input.direction !== 0) {
      this.physicsEngine.applyPlayerInput(this.player, input);
      this.player.frame++;
    } else if ((input.direction === 0) && (!this.player.isBusy)) {
      this.player.frame = 0;
    }
    if (this.player.isBusy) this.player.frame++;
    this.physicsEngine.adjustPlayerHorizontally(this.player, this.map);
    this.collisionEngine.checkVerticalMapCollision(this.player);
    return this.collisionEngine.checkHorizontalMapCollision();
  };

  RenderEngine.prototype.manageJump = function(input) {
    if ((input.jump === 1) && (input.jumpLock === false)) {
      input.jumpLock = true;
      return this.player.state = this.player.direction === 1 ? this.player.jumpRight : this.player.jumpLeft;
    } else if ((input.jump === 0) && input.jumpLock && (this.player.velocityY === 0)) {
      this.player.state = this.player.direction === 1 ? this.player.moveRight : this.player.moveLeft;
      return input.jumpLock = false;
    }
  };

  RenderEngine.prototype.manageMap = function(input) {
    this.soundEngine.checkPlayback(this.map);
    this.physicsEngine.adjustMapVerically(this.map, this.player);
    return this.manageNis(this.map.checkForNis(this.player), input);
  };

  RenderEngine.prototype.manageEnemy = function(enemy) {
    enemy.frame++;
    this.physicsEngine.adjustEnemy(enemy, this.player, this.map);
    this.collisionEngine.checkVerticalMapCollision(enemy);
    return this.collisionEngine.manageCollisions(enemy, this.player);
  };

  RenderEngine.prototype.manageNewActions = function(input) {
    var action, clazz;
    if (input.customKey !== 0) {
      if (input.hasWaitFor(input.customKey)) {
        input.customKey = 0;
        return;
      }
      clazz = this.player.getCustomActionForKey(input.customKey);
      action = new clazz();
      if (!this.actionExists(action)) {
        action.x += this.player.x;
        action.y += this.player.y;
        action.frame = 0;
        action.owner = Action.prototype.PLAYER;
        action.direction = this.player.direction;
        action.hasAnimated = false;
        action.isAnimating = false;
        this.player.composite = action.composite;
        this.player.emitter = action.emitter;
        if (action.spammable) {
          input.addWaitForAction(input.customKey, action.wait);
          action.id = action.id + this.actionObjects.length;
        }
        this.actionObjects.push(action);
        this.soundEngine.checkPlayback(action);
      }
      return input.customKey = 0;
    }
  };

  RenderEngine.prototype.manageAction = function(action, input) {
    action.frame++;
    this.physicsEngine.adjustAction(action, this.map);
    this.managePlayerState(action, input);
    return this.collisionEngine.manageCollisions(action);
  };

  RenderEngine.prototype.managePlayerState = function(action, input) {
    if (input) this.manageJump(input);
    if (this.player.state !== action.state && action.isAnimating === false && action.hasAnimated === false && this.player.isBusy === false) {
      if (action.state === void 0) action.state = this.player.state;
      this.player.state = action.state;
      this.player.isBusy = true;
      action.isAnimating = true;
      return this.player.frame++;
    } else if (this.player.state !== action.state && action.isAnimating) {
      action.isAnimating = false;
      action.hasAnimated = true;
      return this.player.isBusy = false;
    } else if (action.isAnimating && this.player.frame < action.state.duration) {
      return this.player.frame++;
    }
  };

  RenderEngine.prototype.manageMapObject = function(mapObj) {
    this.physicsEngine.adjustMapObject(mapObj, this.player, this.map);
    this.collisionEngine.checkVerticalMapCollision(mapObj);
    return this.collisionEngine.manageCollisions(mapObj, this.player);
  };

  RenderEngine.prototype.actionExists = function(action) {
    var existing, _i, _len, _ref;
    _ref = this.actionObjects;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      existing = _ref[_i];
      if (existing.id === action.id) {
        action = void 0;
        return true;
      }
    }
    return false;
  };

  RenderEngine.prototype.actionIsIdle = function(action) {
    var idle;
    idle = false;
    if (action.isComplete) {
      this.removeAction(action);
      idle = true;
    }
    if (action.nonObjectProducing && action.isAnimating === false) {
      action.isAnimating = true;
      this.player.updateInherentStates(action);
      idle = true;
    } else if (action.nonObjectProducing && action.isAnimating) {
      action.frame++;
      idle = true;
    }
    return idle;
  };

  RenderEngine.prototype.removeAction = function(action) {
    var arr, index;
    if (action.nonObjectProducing) this.player.updateInherentStates();
    index = this.actionObjects.indexOf(action, 0);
    arr = this.actionObjects.splice(index, 1);
    arr = void 0;
    if (action.composite && this.player.composite === action.composite) {
      this.player.composite = void 0;
    }
    if (action.emitter && this.player.emitter === action.emitter) {
      this.player.emitter = void 0;
    }
    if (action.sound) return this.soundEngine.removeSound(action.sound);
  };

  RenderEngine.prototype.manageNis = function(nis, input) {
    if (nis === void 0) return;
    this._nis = nis;
    if (!input.disabled) input.disabled = true;
    if (this.physicsEngine.manageNis(nis, this.player, this.map)) {
      this.map.removeNis(nis);
      this._nis = void 0;
      input.disabled = false;
      return;
    }
    this.paint(this.map);
    return this.paint(this.player);
  };

  RenderEngine.prototype.dispose = function() {
    this.actionObjects = void 0;
    this.scrn = void 0;
    this.map.dispose();
    this.map = void 0;
    this.player.dispose();
    this.player = void 0;
    this.soundEngine = void 0;
    return this.collisionEngine = void 0;
  };

  return RenderEngine;

})();

RenderEngine.prototype.name = "RenderEngine";

RenderEngine.prototype.__defineGetter__("scrn", function() {
  return this._scrn;
});

RenderEngine.prototype.__defineSetter__("scrn", function(val) {
  this._scrn = val;
  return this._ctx = this._scrn.getContext('2d');
});

RenderEngine.prototype.__defineGetter__("fgscrn", function() {
  return this._fgscrn;
});

RenderEngine.prototype.__defineSetter__("fgscrn", function(val) {
  this._fgscrn = val;
  if (this._fgscrn !== void 0) return this._fgctx = this._fgscrn.getContext('2d');
});

RenderEngine.prototype.__defineGetter__("map", function() {
  return this._map;
});

RenderEngine.prototype.__defineSetter__("map", function(val) {
  if (this._map) this.soundEngine.removeSound(this._map.sound);
  this.collisionEngine.map = val;
  return this._map = val;
});

RenderEngine.prototype.__defineGetter__("player", function() {
  return this._player;
});

RenderEngine.prototype.__defineSetter__("player", function(val) {
  this.collisionEngine.player = val;
  return this._player = val;
});

RenderEngine.prototype.__defineGetter__("soundEngine", function() {
  return this._soundEngine;
});

RenderEngine.prototype.__defineSetter__("soundEngine", function(val) {
  return this._soundEngine = val;
});

RenderEngine.prototype.__defineGetter__("collisionEngine", function() {
  return this._collisionEngine;
});

RenderEngine.prototype.__defineSetter__("collisionEngine", function(val) {
  return this._collisionEngine = val;
});

RenderEngine.prototype.__defineGetter__("physicsEngine", function() {
  return this._physicsEngine;
});

RenderEngine.prototype.__defineSetter__("physicsEngine", function(val) {
  this._physicsEngine = val;
  return this.collisionEngine.physicsEngine = val;
});

RenderEngine.prototype.__defineGetter__("frameWait", function() {
  return this._frameWait;
});

RenderEngine.prototype.__defineSetter__("frameWait", function(val) {
  this._frameWait = val;
  return this._fcount = val;
});

State = (function() {
  var _duration, _frameBuffer, _id, _isCancellable, _persistent, _row;

  function State(duration, row, persistent, id, frameBuffer) {
    this.duration = duration;
    this.row = row;
    this.persistent = persistent;
    this.id = id;
    this.frameBuffer = frameBuffer;
  }

  _persistent = true;

  _duration = 0;

  _row = 0;

  _frameBuffer = 0;

  _id = "";

  _isCancellable = false;

  return State;

})();

State.prototype.name = "State";

State.prototype.__defineGetter__("duration", function() {
  return this._duration;
});

State.prototype.__defineSetter__("duration", function(val) {
  return this._duration = val;
});

State.prototype.__defineGetter__("row", function() {
  return this._row;
});

State.prototype.__defineSetter__("row", function(val) {
  return this._row = val;
});

State.prototype.__defineGetter__("persistent", function() {
  return this._persistent;
});

State.prototype.__defineSetter__("persistent", function(val) {
  return this._persistent = val;
});

State.prototype.__defineGetter__("id", function() {
  return this._id;
});

State.prototype.__defineSetter__("id", function(val) {
  return this._id = val;
});

State.prototype.__defineGetter__("isCancellable", function() {
  return this._isCancellable;
});

State.prototype.__defineSetter__("isCancellable", function(val) {
  return this._isCancellable = val;
});

State.prototype.__defineGetter__("frameBuffer", function() {
  return this._frameBuffer;
});

State.prototype.__defineSetter__("frameBuffer", function(val) {
  if (val > .9) {
    this._frameBuffer = .9;
    GameError.warn("A frame buffer greater .9 will result in the frame always being 0.");
    return;
  }
  return this._frameBuffer = val;
});

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

Player = (function(_super) {
  var _actions, _applyGravityAndFriction, _collisionCoefficient, _collisionLeft, _collisionRight, _composite, _compositePoint, _damage, _emitter, _floor, _frame, _health, _isBusy, _isDead, _jumpLeft, _jumpRight, _mapBoundsMax, _mapBoundsMin, _mapX, _mapY, _maxVelocityX, _maxVelocityY, _minVelocity, _moveLeft, _moveRight, _previousState, _screenX, _screenY, _showCollisionRect, _state, _thresholdX, _thresholdY, _uniqueID;

  __extends(Player, _super);

  function Player(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.frame = 0;
  }

  _showCollisionRect = false;

  _isBusy = false;

  _isDead = false;

  _applyGravityAndFriction = true;

  _mapX = 0;

  _mapY = 0;

  _mapBoundsMin = 0;

  _mapBoundsMax = 0;

  _screenX = 0;

  _screenY = 0;

  _frame = 0;

  _maxVelocityX = 15;

  _maxVelocityY = 26;

  _collisionCoefficient = 0;

  _minVelocity = 0;

  _floor = 0;

  _thresholdX = 0;

  _thresholdY = 35;

  _health = 100;

  _damage = 10;

  _uniqueID = "";

  _actions = [];

  _moveRight = {};

  _moveLeft = {};

  _collisionRight = {};

  _collisionLeft = {};

  _jumpRight = {};

  _jumpLeft = {};

  _state = {};

  _previousState = {};

  _composite = {};

  _compositePoint = {};

  _emitter = {};

  Player.prototype.initialize = function() {
    Player.__super__.initialize.call(this, this.updateInherentStates);
    this.y = 0;
    this._frame = 0;
    this._minVelocity = 0;
    this._isBusy = false;
    this._isDead = false;
    if (this.maxVelocityX === void 0) this.maxVelocityX = 15;
    if (this.maxVelocityY === void 0) {
      this._maxVelocityY = 45;
    } else {
      this._maxVelocityY = this.maxVelocityY;
    }
    if (this.frameBuffer === void 0) this.frameBuffer = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.mapBoundsMin = Math.round(Game.prototype.VIEWPORT_WIDTH * .15);
    this.mapBoundsMax = Math.round((Game.prototype.VIEWPORT_WIDTH * .85) - this.width);
    return this.updateInherentStates();
  };

  Player.prototype.updateInherentStates = function(action) {
    if (action === void 0) {
      this._moveRight = new State(Math.round(this.asset.width / this.cellWidth) - 1, 0, true, "moveRight", 0);
      this._moveLeft = new State(Math.round(this.asset.width / this.cellWidth) - 1, 1, true, "moveLeft", 0);
      this._collisionRight = new State(Math.round(this.asset.width / this.cellHeight) - 1, 2, false, "collisionRight", 0);
      this._collisionLeft = new State(Math.round(this.asset.width / this.cellHeight) - 1, 3, false, "collsionLeft", 0);
      this._jumpRight = new State(Math.round(this.asset.width / this.cellWidth) - 1, 0, true, "jumpRight", 0);
      this._jumpLeft = new State(Math.round(this.asset.width / this.cellWidth) - 1, 1, true, "jumpLeft", 0);
      this.applyState();
    } else {
      this.applyState();
      if (action.stateRight) {
        this._moveRight = this.assignActionState(action.stateRight, _moveRight);
      }
      if (action.stateLeft) {
        this._moveLeft = this.assignActionState(action.stateLeft, _moveLeft);
      }
      if (action.stateCollisionRight) {
        this._collisionRight = this.assignActionState(action.stateCollisionRight, _collisionRight);
      }
      if (action.stateCollisionLeft) {
        this._collisionLeft = this.assignActionState(action.stateCollisionLeft, _collisionLeft);
      }
      if (action.stateJumpRight) {
        this._jumpRight = this.assignActionState(action.stateJumpRight, _jumpRight);
      }
      if (action.stateJumpLeft) {
        this._jumpLeft = this.assignActionState(action.stateJumpLeft, _jumpLeft);
      }
    }
    if (this._direction === 1) {
      return this._state = this._moveRight;
    } else {
      return this._state = this._moveLeft;
    }
  };

  Player.prototype.applyState = function() {
    if (this._direction === void 0) this._direction = 1;
    if (this._direction === 1) {
      return this._previousState = this._moveRight;
    } else {
      return this._previousState = this._moveLeft;
    }
  };

  Player.prototype.revertState = function() {
    return this._state = this._previousState;
  };

  Player.prototype.assignActionState = function(state, inherent) {
    if (state) {
      return state;
    } else {
      return inherent;
    }
  };

  Player.prototype.getCustomActionForKey = function(keyCode) {
    if (this.actions === void 0) this.actions = [];
    return this.actions[keyCode];
  };

  Player.prototype.setCustomActionForKey = function(keyCode, action) {
    if (this.actions === void 0) this.actions = [];
    return this.actions[keyCode] = action;
  };

  Player.prototype.updatePoints = function() {
    if (this.composite !== void 0) this.composite.point = this.compositePoint;
    if (this.emitter !== void 0) return this.emitter.point = this.emitterPoint;
  };

  return Player;

})(RenderObject);

Player.prototype.name = "Player";

Player.prototype.__defineGetter__("bitmapData", function() {
  var keyFrame, row;
  if (this.ctx !== void 0) {
    keyFrame = (Math.floor(this.frame)) * this.cellWidth;
    row = this.state.row * this.cellHeight;
    if (this.showCollisionRect) {
      this.ctx.drawImage(this.assetData, 0, 0);
      this.ctx.fillStyle = "rgb(200,0,0)";
      this.ctx.fillRect(keyFrame + this.thresholdX, row + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
      this.assetData.src = this.workbench.toDataURL();
    }
    return {
      player: this.assetData,
      rect: new Rectangle(keyFrame, row, this.cellWidth, this.cellHeight)
    };
  } else {
    return {
      player: {
        notready: true
      },
      rect: new Rectangle(keyFrame, row, this.cellWidth, this.cellHeight)
    };
  }
});

Player.prototype.__defineGetter__("x", function() {
  return this._x;
});

Player.prototype.__defineSetter__("x", function(val) {
  if ((val >= 0) && (val <= (Game.prototype.VIEWPORT_WIDTH - this.width))) {
    this._x = Math.round(val);
  } else if (val < 0) {
    this._x = 0;
  } else if (val > 0) {
    this._x = Game.prototype.VIEWPORT_WIDTH - this.width;
  }
  return this.updatePoints();
});

Player.prototype.__defineGetter__("y", function() {
  return this._y;
});

Player.prototype.__defineSetter__("y", function(val) {
  if (val >= (Game.prototype.VIEWPORT_HEIGHT - this.cellHeight)) {
    this._y = Game.prototype.VIEWPORT_HEIGHT - this.cellHeight;
    this.updatePoints();
    return;
  }
  this._y = val;
  return this.updatePoints();
});

Player.prototype.__defineGetter__("direction", function() {
  return this._direction;
});

Player.prototype.__defineSetter__("direction", function(val) {
  this._direction = val;
  return this.state = this.direction === -1 ? this._moveLeft : this._moveRight;
});

Player.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Player.prototype.__defineSetter__("frame", function(val) {
  if (val >= this._state.duration) {
    if (!this._state.persistent) {
      this._state = this._previousState;
      this.frameBuffer = this._state.frameBuffer;
      this._isBusy = false;
    }
    this._frame = 0;
    return;
  }
  return this._frame = this._frame === 0 || val === 0 ? val : val - this._frameBuffer;
});

Player.prototype.__defineGetter__("velocityX", function() {
  return this._velocityX;
});

Player.prototype.__defineSetter__("velocityX", function(val) {
  if (val <= this._maxVelocityX && val >= this._minVelocity) {
    return this._velocityX = val;
  } else if (val <= this._minVelocity) {
    return this._velocityX = 0;
  }
});

Player.prototype.__defineGetter__("vOrigin", function() {
  var val;
  val = 0;
  if (this.direction === -1) {
    val = this.width + this.x;
  } else if (this.direction === 1) {
    val = this.x;
  }
  return val;
});

Player.prototype.__defineGetter__("hOrigin", function() {
  var val;
  val = 0;
  if (this.direction === -1) {
    val = this.x;
  } else if (this.direction === 1) {
    val = this.width + this.x;
  }
  return val;
});

Player.prototype.__defineGetter__("state", function() {
  return this._state;
});

Player.prototype.__defineSetter__("state", function(val) {
  if (this._isBusy || (this._state.id === val.id)) return;
  if ((val.id === this._jumpRight.id) || (val.id === this._jumpLeft.id)) {
    this.velocityY = this._maxVelocityY;
  }
  this._frame = 0;
  this.frameBuffer = val.frameBuffer;
  this._previousState = this._state;
  return this._state = val;
});

Player.prototype.__defineGetter__("health", function() {
  return this._health;
});

Player.prototype.__defineSetter__("health", function(val) {
  this._health = val;
  if (this._health <= 0) return this._isDead = true;
});

Player.prototype.__defineGetter__("mapX", function() {
  return this._mapX;
});

Player.prototype.__defineSetter__("mapX", function(val) {
  return this._mapX = val;
});

Player.prototype.__defineGetter__("mapY", function() {
  return this._mapY;
});

Player.prototype.__defineSetter__("mapY", function(val) {
  return this._mapY = val;
});

Player.prototype.__defineGetter__("mapBoundsMin", function() {
  return this._mapBoundsMin;
});

Player.prototype.__defineSetter__("mapBoundsMin", function(val) {
  return this._mapBoundsMin = val;
});

Player.prototype.__defineGetter__("mapBoundsMax", function() {
  return this._mapBoundsMax;
});

Player.prototype.__defineSetter__("mapBoundsMax", function(val) {
  return this._mapBoundsMax = val;
});

Player.prototype.__defineGetter__("screenX", function() {
  return this._screenX;
});

Player.prototype.__defineSetter__("screenX", function(val) {
  return this._screenX = val;
});

Player.prototype.__defineGetter__("screenY", function() {
  return this._screenY;
});

Player.prototype.__defineSetter__("screenY", function(val) {
  return this._screenY = val;
});

Player.prototype.__defineGetter__("floor", function() {
  return this._floor;
});

Player.prototype.__defineSetter__("floor", function(val) {
  return this._floor = val;
});

Player.prototype.__defineGetter__("collisionCoefficient", function() {
  return this._collisionCoefficient;
});

Player.prototype.__defineSetter__("collisionCoefficient,", function(val) {
  return this._collisionCoefficient = val;
});

Player.prototype.__defineGetter__("maxVelocityX", function() {
  return this._maxVelocityX;
});

Player.prototype.__defineSetter__("maxVelocityX", function(val) {
  return this._maxVelocityX = val;
});

Player.prototype.__defineGetter__("maxVelocityY", function() {
  return this._maxVelocityY;
});

Player.prototype.__defineSetter__("maxVelocityY", function(val) {
  return this._maxVelocityY = val;
});

Player.prototype.__defineGetter__("applyGravityAndFriction", function() {
  return this._applyGravityAndFriction;
});

Player.prototype.__defineSetter__("applyGravityAndFriction", function(val) {
  return this._applyGravityAndFriction = val;
});

Player.prototype.__defineGetter__("showCollisionRect", function() {
  return this._showCollisionRect;
});

Player.prototype.__defineSetter__("showCollisionRect", function(val) {
  return this._showCollisionRect = val;
});

Player.prototype.__defineGetter__("thresholdX", function() {
  return this._thresholdX;
});

Player.prototype.__defineSetter__("thresholdX", function(val) {
  if (val > (this.width * .5)) {
    GameError.warn("You cant set a threshold this high. There would be no collision area.");
  }
  return this._thresholdX = val;
});

Player.prototype.__defineGetter__("thresholdY", function() {
  return this._thresholdY;
});

Player.prototype.__defineSetter__("thresholdY", function(val) {
  if (val > (this.height * .5)) {
    GameError.warn("You cant set a threshold this high. There would be no collision area.");
  }
  return this._thresholdY = val;
});

Player.prototype.__defineGetter__("damage", function() {
  return this._damage;
});

Player.prototype.__defineSetter__("damage", function(val) {
  return this._damage = val;
});

Player.prototype.__defineGetter__("isDead", function() {
  return this._isDead;
});

Player.prototype.__defineGetter__("isBusy", function() {
  return this._isBusy;
});

Player.prototype.__defineSetter__("isBusy", function(val) {
  return this._isBusy = val;
});

Player.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.x + this.thresholdX, this.y + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
});

Player.prototype.__defineGetter__("moveLeft", function() {
  return this._moveLeft;
});

Player.prototype.__defineGetter__("moveRight", function() {
  return this._moveRight;
});

Player.prototype.__defineGetter__("jumpRight", function() {
  return this._jumpRight;
});

Player.prototype.__defineGetter__("jumpLeft", function() {
  return this._jumpLeft;
});

Player.prototype.__defineGetter__("collisionLeft", function() {
  return this._collisionLeft;
});

Player.prototype.__defineGetter__("collisionRight", function() {
  return this._collisionRight;
});

Player.prototype.__defineGetter__("composite", function() {
  return this._composite;
});

Player.prototype.__defineSetter__("composite", function(val) {
  this._composite = val;
  return this.updatePoints();
});

Player.prototype.__defineGetter__("compositePoint", function() {
  return new Point(this.x + this.composite.x, this.y + this.composite.y);
});

Player.prototype.__defineSetter__("compositePoint", function(val) {
  return this._compositePoint = val;
});

Player.prototype.__defineGetter__("emitter", function() {
  return this._emitter;
});

Player.prototype.__defineSetter__("emitter", function(val) {
  this._emitter = val;
  if (this._emitter !== void 0) {
    this.updatePoints();
    return this._emitter.createParticles();
  }
});

Player.prototype.__defineGetter__("emitterPoint", function() {
  return new Point(this.x + this.emitter.x, this.y + this.emitter.y);
});

Player.prototype.__defineSetter__("emitterPoint", function(val) {
  return this._compositePoint = val;
});

Player.prototype.__defineGetter__("uniqueID", function() {
  return this._uniqueID;
});

Player.prototype.__defineSetter__("uniqueID", function(val) {
  return this._uniqueID = val;
});

Map = (function(_super) {
  var _activeEnemies, _activeMapObjects, _assetsLoaded, _backgroundAsset, _backgroundAssetClass, _backgroundData, _collisionAsset, _collisionAssetClass, _collisionData, _enemies, _floor, _foregroundAsset, _foregroundAssetClass, _foregroundData, _friction, _gravity, _inactiveEnemies, _inactiveMapObjects, _initializeComplete, _mapObjects, _mapType, _midgroundAsset, _midgroundAssetClass, _midgroundData, _nis, _paralaxing, _platform, _showCollisionMap, _sound, _soundLoops;

  __extends(Map, _super);

  function Map(name) {
    this.name = name;
  }

  _mapType = '';

  _paralaxing = false;

  _platform = false;

  _showCollisionMap = false;

  _assetsLoaded = 0;

  _initializeComplete = false;

  _gravity = 10;

  _friction = .25;

  _enemies = [];

  _mapObjects = [];

  _nis = [];

  _activeEnemies = {};

  _inactiveEnemies = {};

  _activeMapObjects = {};

  _inactiveMapObjects = {};

  _backgroundAssetClass = {};

  _midgroundAssetClass = {};

  _foregroundAssetClass = {};

  _collisionAssetClass = {};

  _backgroundAsset = {};

  _midgroundAsset = {};

  _foregroundAsset = {};

  _collisionAsset = {};

  _backgroundData = {};

  _midgroundData = {};

  _foregroundData = {};

  _collisionData = {};

  _sound = void 0;

  _soundLoops = 0;

  _floor = void 0;

  Map.prototype.initialize = function() {
    this.workbench = document.createElement("canvas");
    this.ctx = this.workbench.getContext('2d');
    if (this.mapType === Map.prototype.TYPE_TILE_BASED) return;
    if (this.mapType === Map.prototype.TYPE_FREE_MOVE) {
      return this.initializeFreeMoveAssets();
    } else if (this.mapType === Map.prototype.TYPE_SIDESCROLL) {
      if (this.paralaxing) {
        if (void 0 !== this.backgroundAssetClass && void 0 !== this.midgroundAssetClass && void 0 !== this.foregroundAssetClass && void 0 !== this.collisionAssetClass && void 0 !== this.enemies && void 0 !== this.mapObjects) {
          return this.initializeAssets();
        } else {
          return GameError.warn("Maps using paraxling require 3 assets and a collection of enemies.");
        }
      } else {
        if (void 0 !== this.foregroundAssetClass && void 0 !== this.enemies && void 0 !== this.collisionAssetClass) {
          return this.initializeAssets();
        } else {
          return GameError.warn("Maps require a foreground , collision asset , and a collection of enemies.");
        }
      }
    }
  };

  Map.prototype.initializeAssets = function() {
    if (this.paralaxing) {
      this.backgroundAsset = new Image();
      this.backgroundAsset.onload = this.imageLoadComplete.bind(this);
      this.backgroundAsset.src = this.backgroundAssetClass;
      this.backgroundData = new Image();
      this.midgroundAsset = new Image();
      this.midgroundAsset.onload = this.imageLoadComplete.bind(this);
      this.midgroundAsset.src = this.midgroundAssetClass;
      this.midgroundData = new Image();
    }
    this.foregroundAsset = new Image();
    this.foregroundAsset.onload = this.imageLoadComplete.bind(this);
    this.foregroundAsset.src = this.foregroundAssetClass;
    this.collisionAsset = new Image();
    this.collisionAsset.onload = this.imageLoadComplete.bind(this);
    this.collisionAsset.src = this.collisionAssetClass;
    this.foregroundData = new Image();
    return this.collisionData = new Image();
  };

  Map.prototype.initializeFreeMoveAssets = function() {};

  Map.prototype.imageLoadComplete = function(e) {
    _assetsLoaded++;
    if (this.paralaxing) {
      if (_assetsLoaded === Map.prototype.TOTAL_PARALAX_ASSETS) {
        this.backgroundAsset.onload = void 0;
        this.midgroundAsset.onload = void 0;
        this.foregroundAsset.onload = void 0;
        this.collisionAsset.onload = void 0;
        this.removeColorConstantAndCache(this.backgroundAsset, this.backgroundData);
        this.removeColorConstantAndCache(this.midgroundAsset, this.midgroundData);
        this.removeColorConstantAndCache(this.foregroundAsset, this.foregroundData);
        this.removeColorConstantAndCache(this.collisionAsset, this.collisionData, true);
        return this.finalize();
      }
    } else {
      if (_assetsLoaded === Map.prototype.TOTAL_STANDARD_ASSETS) {
        this.foregroundAsset.onload = void 0;
        this.collisionAsset.onload = void 0;
        this.removeColorConstantAndCache(this.foregroundAsset, this.foregroundData);
        this.removeColorConstantAndCache(this.collisionAsset, this.collisionData, true);
        return this.finalize();
      }
    }
  };

  Map.prototype.finalize = function() {
    this._initializeComplete = true;
    this.x = 0;
    this.y = 0;
    this.activeEnemies = {};
    this.activeMapObjects = {};
    this._inactiveEnemies = {};
    return this._inactiveMapObjects = {};
  };

  Map.prototype.manageElements = function(type) {
    var activeTargets, enemy, enemyOffScreen, group, inactiveTargets, indep, j, key, obj, posX, posY, position, target, targetArray, tmpE, vh, vw, _i, _len, _len2, _ref;
    inactiveTargets = {};
    activeTargets = {};
    targetArray = type === Map.prototype.MANAGE_ENEMIES ? this.enemies : this.mapObjects;
    inactiveTargets = type === Map.prototype.MANAGE_ENEMIES ? this._inactiveEnemies : this._inactiveMapObjects;
    activeTargets = type === Map.prototype.MANAGE_ENEMIES ? this._activeEnemies : this._activeMapObjects;
    for (_i = 0, _len = targetArray.length; _i < _len; _i++) {
      group = targetArray[_i];
      _ref = group.positions;
      for (j = 0, _len2 = _ref.length; j < _len2; j++) {
        position = _ref[j];
        key = this.generateKey(group, j);
        target = activeTargets[key];
        obj = {};
        posX = target ? target.mapX : group.positions[j].x;
        posY = target ? target.mapY : group.positions[j].y;
        vw = Game.prototype.VIEWPORT_WIDTH;
        vh = Game.prototype.VIEWPORT_HEIGHT;
        try {
          tmpE = inactiveTargets[key];
        } catch (error) {
          tmpE = void 0;
        }
        if (tmpE !== void 0) return;
        indep = group.independence;
        if (target === void 0) {
          if (this.isEnemyOnScreen(posX, posY, vw, vh, indep)) {
            enemy = group.type;
            obj = new enemy();
            obj.mapX = posX;
            obj.mapY = posY;
            obj.screenX = posX - this.x;
            obj.screenY = obj.mapY - this.y - this.gravity;
            obj.uniqueID = key;
            activeTargets[obj.uniqueID] = obj;
          }
        } else if (target) {
          enemyOffScreen = !(this.isEnemyOnScreen(posX, posY, vw, vh, indep));
          if (enemyOffScreen || target.isDead) {
            delete activeTargets[target.uniqueID];
          }
          if (target.isDead) inactiveTargets[target.uniqueID] = true;
        }
      }
    }
  };

  Map.prototype.generateKey = function(group, i) {
    return group.type.prototype.name + "" + group.positions[i].x + "" + group.positions[i].y + "" + i;
  };

  Map.prototype.isEnemyOnScreen = function(posX, posY, vw, vh, indep) {
    var hBounds, vBounds;
    hBounds = (((posX - indep) - this.x) - vw) <= 0 && (((posX + indep) - this.x) - vw) >= -vw;
    vBounds = (((posY + indep) - this.y) - vh) <= 0 && (((posY - indep) - this.y) - vh) >= -vh;
    return hBounds && vBounds;
  };

  Map.prototype.checkForNis = function(player) {
    var n, _i, _len, _ref;
    if (player === void 0) return;
    _ref = this.nis;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      n = _ref[_i];
      n.player = player;
      n.enemies = [];
      n.map = this;
      if (n.conditionsMet) return n;
    }
  };

  Map.prototype.removeNis = function(nis) {
    var arr, index;
    index = this.nis.indexOf(nis, 0);
    arr = this.nis.splice(index, 1);
    return arr = void 0;
  };

  Map.prototype.dispose = function() {
    this.backgroundAssetClass = void 0;
    this.midgroundAssetClass = void 0;
    this.foregroundAssetClass = void 0;
    this.backgroundAsset = void 0;
    this.midgroundAsset = void 0;
    this.foregroundAsset = void 0;
    this.midgroundData = void 0;
    this.foregroundData = void 0;
    _enemies = void 0;
    _mapObjects = void 0;
    _activeEnemies = void 0;
    _inactiveEnemies = void 0;
    _activeMapObjects = void 0;
    return _inactiveMapObjects = void 0;
  };

  Map.prototype.buildDataVO = function(img, rect) {
    var tmp;
    tmp = {};
    tmp.data = img;
    tmp.rect = rect;
    tmp.name = name;
    return tmp;
  };

  Map.prototype.collisionDataPixel = function(x, y) {
    var index;
    index = 4 * (y * this.collisionData.width + x);
    return this.collisionPixels.data[index + 3];
  };

  return Map;

})(RenderObject);

Map.prototype.name = "Map";

Map.prototype.TYPE_SIDESCROLL = "sidescroll";

Map.prototype.TYPE_FREE_MOVE = "freemove";

Map.prototype.TYPE_TILE_BASED = "tilebased";

Map.prototype.__defineGetter__("bitmapData", function() {
  var bg, cd, fg, mid, vh, vw, yPos;
  if (this._initializeComplete) {
    yPos = this.platform ? this._y : 0;
    vh = Game.prototype.VIEWPORT_HEIGHT;
    vw = Game.prototype.VIEWPORT_WIDTH;
    bg = {};
    mid = {};
    fg = {};
    cd = {};
    if (this.paralaxing) {
      bg = this.buildDataVO(this.backgroundData, new Rectangle(Math.round(this._x * .25), yPos, vw, vh));
      mid = this.buildDataVO(this.midgroundData, new Rectangle(Math.round(this._x * .5), yPos, vw, vh));
    }
    fg = this.buildDataVO(this.foregroundData, new Rectangle(Math.round(this._x), Math.round(yPos), vw, vh));
    if (this.showCollisionMap) {
      cd = this.buildDataVO(this.collisionData, new Rectangle(Math.round(this._x), Math.round(yPos), vw, vh));
    }
    return {
      map: [bg, mid, fg, cd]
    };
  } else {
    return GameError.warn('You cannot start the game yet. Map assets are not loaded.');
  }
});

Map.prototype.__defineGetter__("x", function() {
  return this._x;
});

Map.prototype.__defineSetter__("x", function(val) {
  if ((val >= 0) && (val <= this.foregroundAsset.width - Game.prototype.VIEWPORT_WIDTH)) {
    return this._x = val;
  } else if (val < 0) {
    return this._x = 0;
  } else if (val > 0) {
    return this._x = this.foregroundAsset.width - Game.prototype.VIEWPORT_WIDTH;
  }
});

Map.prototype.__defineGetter__("y", function() {
  return this._y;
});

Map.prototype.__defineSetter__("y", function(val) {
  if (val >= this.collisionData.height - Game.prototype.VIEWPORT_HEIGHT) {
    this._y = this.collisionData.height - Game.prototype.VIEWPORT_HEIGHT;
    return;
  }
  if (val < 0) {
    this._y = 0;
    return;
  }
  if (this.floor !== void 0 && val >= this.floor) {
    this._y = this.floor;
    return;
  }
  return this._y = val;
});

Map.prototype.__defineGetter__("backgroundAssetClass", function() {
  return this._backgroundAssetClass;
});

Map.prototype.__defineSetter__("backgroundAssetClass", function(val) {
  return this._backgroundAssetClass = val;
});

Map.prototype.__defineGetter__("midgroundAssetClass", function() {
  return this._midgroundAssetClass;
});

Map.prototype.__defineSetter__("midgroundAssetClass", function(val) {
  return this._midgroundAssetClass = val;
});

Map.prototype.__defineGetter__("foregroundAssetClass", function() {
  return this._foregroundAssetClass;
});

Map.prototype.__defineSetter__("foregroundAssetClass", function(val) {
  return this._foregroundAssetClass = val;
});

Map.prototype.__defineGetter__("collisionAssetClass", function() {
  return this._collisionAssetClass;
});

Map.prototype.__defineSetter__("collisionAssetClass", function(val) {
  return this._collisionAssetClass = val;
});

Map.prototype.__defineGetter__("backgroundAsset", function() {
  return this._backgroundAsset;
});

Map.prototype.__defineSetter__("backgroundAsset", function(val) {
  return this._backgroundAsset = val;
});

Map.prototype.__defineGetter__("midgroundAsset", function() {
  return this._midgroundAsset;
});

Map.prototype.__defineSetter__("midgroundAsset", function(val) {
  return this._midgroundAsset = val;
});

Map.prototype.__defineGetter__("foregroundAsset", function() {
  return this._foregroundAsset;
});

Map.prototype.__defineSetter__("foregroundAsset", function(val) {
  return this._foregroundAsset = val;
});

Map.prototype.__defineGetter__("collisionAsset", function() {
  return this._collisionAsset;
});

Map.prototype.__defineSetter__("collisionAsset", function(val) {
  return this._collisionAsset = val;
});

Map.prototype.__defineGetter__("paralaxing", function() {
  return this._paralaxing;
});

Map.prototype.__defineSetter__("paralaxing", function(val) {
  return this._paralaxing = val;
});

Map.prototype.__defineGetter__("showCollisionMap", function() {
  return this._showCollisionMap;
});

Map.prototype.__defineSetter__("showCollisionMap", function(val) {
  return this._showCollisionMap = val;
});

Map.prototype.__defineGetter__("platform", function() {
  return this._platform;
});

Map.prototype.__defineSetter__("platform", function(val) {
  return this._platform = val;
});

Map.prototype.__defineGetter__("enemies", function() {
  return this._enemies;
});

Map.prototype.__defineSetter__("enemies", function(val) {
  return this._enemies = val;
});

Map.prototype.__defineGetter__("nis", function() {
  return this._nis;
});

Map.prototype.__defineSetter__("nis", function(val) {
  return this._nis = val;
});

Map.prototype.__defineSetter__("mapObjects", function(val) {
  return this._mapObjects = val;
});

Map.prototype.__defineGetter__("mapObjects", function() {
  return this._mapObjects;
});

Map.prototype.__defineSetter__("activeMapObjects", function(val) {
  return this._activeMapObjects = val;
});

Map.prototype.__defineGetter__("activeMapObjects", function() {
  return this._activeMapObjects;
});

Map.prototype.__defineGetter__("activeEnemies", function() {
  return this._activeEnemies;
});

Map.prototype.__defineSetter__("activeEnemies", function(val) {
  return this._activeEnemies = val;
});

Map.prototype.__defineGetter__("width", function() {
  return this._foregroundAsset.width;
});

Map.prototype.__defineGetter__("collisionData", function() {
  return this._collisionData;
});

Map.prototype.__defineSetter__("collisionData", function(val) {
  return this._collisionData = val;
});

Map.prototype.__defineGetter__("foregroundData", function() {
  return this._foregroundData;
});

Map.prototype.__defineSetter__("foregroundData", function(val) {
  return this._foregroundData = val;
});

Map.prototype.__defineSetter__("gravity", function(val) {
  return this._gravity = val;
});

Map.prototype.__defineGetter__("gravity", function() {
  return this._gravity;
});

Map.prototype.__defineSetter__("friction", function(val) {
  return this._friction = val;
});

Map.prototype.__defineGetter__("friction", function() {
  return this._friction;
});

Map.prototype.__defineGetter__("rect", function() {
  return new Rectangle(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.VIEWPORT_HEIGHT);
});

Map.prototype.__defineGetter__("point", function() {
  return new Point(0, 0);
});

Map.prototype.__defineGetter__("sound", function() {
  return this._sound;
});

Map.prototype.__defineSetter__("sound", function(val) {
  return this._sound = val;
});

Map.prototype.__defineGetter__("soundLoops", function() {
  return this._soundLoops;
});

Map.prototype.__defineSetter__("soundLoops", function(val) {
  return this._soundLoops = val;
});

Map.prototype.__defineGetter__("floor", function() {
  return this._floor;
});

Map.prototype.__defineSetter__("floor", function(val) {
  return this._floor = val;
});

Map.prototype.__defineGetter__("mapType", function() {
  return this._mapType;
});

Map.prototype.__defineSetter__("mapType", function(val) {
  return this._mapType = val;
});

Map.prototype.MANAGE_ENEMIES = "manageEnemies";

Map.prototype.MANAGE_MAP_OBJECTS = "manageMapObjects";

Map.prototype.TOTAL_STANDARD_ASSETS = 2;

Map.prototype.TOTAL_PARALAX_ASSETS = 4;

MapObject = (function(_super) {

  __extends(MapObject, _super);

  function MapObject(name) {
    this.name = name;
  }

  MapObject.prototype.behavior = function() {};

  return MapObject;

})(Player);

MapObject.prototype.name = "MapObject";

MapObject.prototype.__defineGetter__("x", function() {
  return this.screenX;
});

MapObject.prototype.__defineSetter__("x", function(val) {
  return this.screenX = val;
});

MapObject.prototype.__defineGetter__("y", function() {
  return this.screenY;
});

MapObject.prototype.__defineSetter__("y", function(val) {
  return this.screenY = val;
});

MapObject.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.screenX + this.thresholdX, this.screenY + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
});

MapObject.prototype.__defineGetter__("point", function() {
  return new Point(this.screenX, this.screenY);
});

MapObject.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

MapObject.prototype.__defineSetter__("frame", function(val) {
  this._frame = val;
  if (!this.isBusy) this.behavior();
  if (val >= this.state.duration) {
    if (!this.state.persistent) {
      this.state = this._previousState;
      this.frameBuffer = this.state.frameBuffer;
      this.isBusy = false;
    }
    this._frame = 0;
    return;
  }
  return this._frame = this._frame === 0 || val === 0 ? val : val - this.frameBuffer;
});

MapObjectGroup = (function(_super) {

  __extends(MapObjectGroup, _super);

  function MapObjectGroup(type, positions, independence) {
    this.type = type;
    this.positions = positions;
    this.independence = independence;
  }

  return MapObjectGroup;

})(Group);

MapObjectGroup.prototype.name = "MapObjectGroup";

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
    if (typeof value === "number") return target[prop] >= value;
    if (typeof value === "object") return target[prop] === value;
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

NisGoal = (function() {
  var _duration, _enemyGoals, _mapGoals, _playerGoals, _useCollision;

  function NisGoal(name) {
    this.name = name;
  }

  _duration = 0;

  _playerGoals = {};

  _mapGoals = {};

  _enemyGoals = {};

  _useCollision = true;

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

NisGoal.prototype.__defineSetter__("useCollision", function(val) {
  return this._useCollision = val;
});

NisGoal.prototype.__defineGetter__("useCollision", function() {
  return this._useCollision;
});

Particle = (function(_super) {
  var _index, _lifeSpan, _startFrame;

  __extends(Particle, _super);

  function Particle(index) {
    this.index = index;
  }

  _index = 0;

  _lifeSpan = 0;

  _startFrame = 1;

  Particle.prototype.initialize = function(duration) {
    this.objectKeyframeLength = 0;
    this.frame = 0;
    this.x = 0;
    this.y = 0;
    this.velocityX = 0;
    return this.velocityY = 0;
  };

  return Particle;

})(RenderObject);

Particle.prototype.name = "Particle";

Particle.prototype.__defineGetter__("index", function() {
  return this._index;
});

Particle.prototype.__defineSetter__("index", function(val) {
  return this._index = val;
});

Particle.prototype.__defineGetter__("lifeSpan", function() {
  return this._lifeSpan;
});

Particle.prototype.__defineSetter__("lifeSpan", function(val) {
  return this._lifeSpan = val;
});

Particle.prototype.__defineGetter__("startFrame", function() {
  return this._startFrame;
});

Particle.prototype.__defineSetter__("startFrame", function(val) {
  return this._startFrame = val;
});

Particle.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Particle.prototype.__defineSetter__("frame", function(val) {
  this._frame = val;
  if (this.objectKeyframeLength === (this.startFrame + this.duration)) {
    this.objectKeyframeLength = 0;
    return;
  }
  return this.objectKeyframeLength++;
});

PhysicsEngine = (function() {
  var _friction, _gravity;

  function PhysicsEngine(name) {
    this.name = name;
  }

  _gravity = 0;

  _friction = 0;

  PhysicsEngine.prototype.adjustPlayerVerically = function(player, map) {
    player.velocityY -= map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames);
    player.y -= player.velocityY;
    player.y += map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames);
    if (player.y - player.height <= 0 && player.floor) {
      if (map.floor === void 0) map.floor = map.y;
      map.floor += map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames);
      return;
    }
    return map.y += map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames);
  };

  PhysicsEngine.prototype.applyPlayerInput = function(player, input) {
    var tar;
    if (player.direction !== input.direction) {
      tar = player.velocityX * (player.easeCoefficient / 100);
      player.velocityX = tar + Math.floor(tar * Game.prototype.DeltaFrames);
    }
    player.direction = input.direction;
    return player.velocityX += player.easeCoefficient + Math.floor(player.easeCoefficient * Game.prototype.DeltaFrames);
  };

  PhysicsEngine.prototype.adjustPlayerHorizontally = function(player, map) {
    var tar;
    tar = player.x + (player.velocityX * player.direction);
    player.x = tar;
    player.velocityX -= map.friction + Math.floor(map.friction * Game.prototype.DeltaFrames);
    if (this.doesMapNeedToMove(player, map)) {
      tar = map.x + (player.velocityX * player.direction);
      map.x = tar;
      return this.enforcePositionThreshold(player);
    }
  };

  PhysicsEngine.prototype.doesMapNeedToMove = function(player, map) {
    var conditionLeft, conditionRight;
    conditionLeft = (player.x <= player.mapBoundsMin) && (map.x !== 0);
    conditionRight = (player.x >= player.mapBoundsMax) && (map.x !== map.width - Game.prototype.VIEWPORT_WIDTH);
    return conditionLeft || conditionRight;
  };

  PhysicsEngine.prototype.enforcePositionThreshold = function(player) {
    if (player.x <= player.mapBoundsMin) {
      player.x = player.mapBoundsMin;
      return;
    }
    return player.x = player.mapBoundsMax;
  };

  PhysicsEngine.prototype.isTargetMovingVertically = function(target) {
    return target.velocityY !== 0;
  };

  PhysicsEngine.prototype.handleVerticalCollision = function(target, focus, intersection) {
    if (target.collisionRect.y > intersection.y) target.velocityY = 0;
    if (target.collisionRect.y < intersection.y) {
      return target.velocityY = target.maxVelocityY;
    }
  };

  PhysicsEngine.prototype.fullyEvalulateSuperClass = function(obj) {
    if (obj instanceof MapObject) {
      return CollisionEngine.prototype.TYPE_OF_MAPOBJECT;
    }
    if (obj instanceof Action) return CollisionEngine.prototype.TYPE_OF_ACTION;
    if (obj instanceof Enemy) return Enemy.prototype.name;
    if (obj instanceof Player) return Player.prototype.name;
  };

  PhysicsEngine.prototype.handleHorizontalCollision = function(target, focus, map) {
    var targetBase;
    try {
      targetBase = target.__proto__.name;
    } catch (error) {
      targetBase = this.fullyEvalulateSuperClass(target);
    }
    if (target.direction === 1) {
      if (targetBase === CollisionEngine.prototype.TYPE_OF_ACTION) {
        focus.x += focus.width * focus.collisionCoefficient;
        focus.velocityX = 0;
      } else {
        focus.screenX += focus.width + target.width;
        target.x -= target.width * target.collisionCoefficient;
        map.x -= target.width * target.collisionCoefficient;
        target.velocityX = 0;
      }
    } else if (target.direction === -1) {
      if (targetBase === CollisionEngine.prototype.TYPE_OF_ACTION) {
        focus.x -= focus.width * focus.collisionCoefficient;
        focus.velocityX = 0;
      } else {
        focus.screenX -= focus.width + target.width;
        target.x += target.width * target.collisionCoefficient;
        map.x += target.width * target.collisionCoefficient;
        target.velocityX = 0;
      }
    }
    return this.updateMapXIfEnemy(focus, target, target.direction);
  };

  PhysicsEngine.prototype.updateMapXIfEnemy = function(focus, target, direction) {
    if (focus instanceof Enemy) {
      return focus.mapX += (focus.width + target.width) * direction;
    }
  };

  PhysicsEngine.prototype.isTargetOutOfBounds = function(target, map) {
    return target.y - target.velocityY + map.gravity < target.y;
  };

  PhysicsEngine.prototype.getVerticalDestination = function(target, map) {
    return target.y + target.height + map.y;
  };

  PhysicsEngine.prototype.getHorizontalMin = function(target, map) {
    return target.vOrigin + map.x;
  };

  PhysicsEngine.prototype.getHorizontalMax = function(target, min) {
    return min + (target.width * target.direction);
  };

  PhysicsEngine.prototype.manageVerticalBounds = function(target, map) {
    if (target.y < 0 && map.platform === false) return target.y = 0;
  };

  PhysicsEngine.prototype.getHorizontalDesitination = function(player, map) {
    return player.hOrigin + map.x - (player.thresholdX * player.direction);
  };

  PhysicsEngine.prototype.getVerticalMin = function(player, map) {
    return player.y + map.y;
  };

  PhysicsEngine.prototype.getVerticalMax = function(player, map) {
    return player.y + player.height + map.y;
  };

  PhysicsEngine.prototype.manageHorizontalBounds = function(player, map, destination) {
    player.x = destination - map.x;
    return player.velocityX = 0;
  };

  PhysicsEngine.prototype.setTargetFloor = function(target, map, destination) {
    target.floor = destination - target.height - map.y;
    target.y = target.floor;
    return target.velocityY = 0;
  };

  PhysicsEngine.prototype.resetPlayerVelocity = function(player) {
    return player.velocityY = 0;
  };

  PhysicsEngine.prototype.incrementPlayerVelocity = function(player) {
    return player.y++;
  };

  PhysicsEngine.prototype.adjustMapVerically = function(map, player) {
    if (player.y < 0 && map.platform) {
      map.y += player.y;
      return player.y = 0;
    }
  };

  PhysicsEngine.prototype.adjustEnemy = function(enemy, player, map) {
    var suggestedScreenX, suggestedScreenY, suggestedVelocityX, suggestedVelocityY;
    if (enemy.applyGravityAndFriction) {
      if (this.doesMapNeedToMove(player, map)) {
        enemy.screenX = enemy.screenX + (player.velocityX * -player.direction);
        enemy.originalX = enemy.screenX;
      }
      suggestedVelocityY = enemy.velocityY;
      suggestedVelocityY -= Math.ceil(map.gravity + Math.floor(map.gravity * Game.prototype.DeltaFrames));
      if (suggestedVelocityY > enemy.maxVelocityY) {
        suggestedVelocityY = enemy.maxVelocityY;
      }
      if (suggestedVelocityY < 0) suggestedVelocityY = 0;
      suggestedScreenY = enemy.screenY;
      suggestedScreenY -= enemy.velocityY;
      suggestedScreenY += map.gravity;
      suggestedVelocityX = enemy.velocityX;
      suggestedVelocityX += enemy.easeCoefficient + Math.floor(enemy.easeCoefficient * Game.prototype.DeltaFrames);
      if (suggestedVelocityX > enemy.maxVelocityX) {
        suggestedVelocityY = enemy.maxVelocityX;
      }
      if (suggestedVelocityX < 0) suggestedVelocityX = 0;
      suggestedScreenX = enemy.screenX + (suggestedVelocityX * enemy.direction);
      suggestedVelocityX -= map.friction + Math.floor(map.friction * Game.prototype.DeltaFrames);
    } else {
      suggestedScreenX = enemy.mapX - map.x + (Math.ceil(map.x * Game.prototype.DeltaFrames));
      suggestedScreenY = enemy.mapY - map.y + (Math.ceil(map.y * Game.prototype.DeltaFrames));
    }
    return enemy.behavior(suggestedScreenX, suggestedScreenY, suggestedVelocityX, suggestedVelocityX);
  };

  PhysicsEngine.prototype.adjustAction = function(action, map) {
    action.velocityX += action.easeCoefficient + Math.ceil(action.easeCoefficient * Game.prototype.DeltaFrames);
    action.x += action.direction * action.velocityX;
    action.y += map.gravity - (action.velocityX * .5);
    return action.velocityX -= map.friction + +Math.ceil(map.friction * Game.prototype.DeltaFrames);
  };

  PhysicsEngine.prototype.adjustMapObject = function(mapObj, player, map) {
    if (mapObj.applyGravityAndFriction) {
      if (player.x !== 0 && player.x !== Game.VIEWPORT_WIDTH - player.width) {
        mapObj.screenX = mapObj.screenX + (player.velocityX * -player.direction);
      }
      mapObj.screenY += map.gravity;
      mapObj.screenX = mapObj.screenX + (mapObj.velocityX * mapObj.direction);
      return mapObj.velocityX -= map.friction;
    } else {
      mapObj.screenX = mapObj.mapX - map.x;
      return mapObj.screenY = mapObj.mapY - map.y;
    }
  };

  PhysicsEngine.prototype.manageNis = function(nis, player, map) {
    var mGoals, pGoals, prop, target, value, _i, _len;
    prop = {};
    value = 0;
    pGoals = nis.nisGoal.playerGoals;
    for (prop in pGoals) {
      value = pGoals[prop];
      target = (value - player[prop]) / (nis.nisGoal.duration - nis.frame);
      player.direction = target < 0 ? -1 : 1;
      player[prop] += target;
      player.frame++;
    }
    mGoals = nis.nisGoal.mapGoals;
    for (_i = 0, _len = mGoals.length; _i < _len; _i++) {
      prop = mGoals[_i];
      value = mGoals[prop];
      map[prop] += (value - map[prop]) / (nis.nisGoal.duration - nis.frame);
      this.adjustMapVerically(map, player);
    }
    nis.frame++;
    return nis.frame >= nis.nisGoal.duration;
  };

  return PhysicsEngine;

})();

PhysicsEngine.prototype.name = "PhysicsEngine";

PhysicsEngine.prototype.__defineGetter__("gravity", function() {
  return this._gravity;
});

PhysicsEngine.prototype.__defineSetter__("gravity", function(val) {
  return this._gravity = val;
});

PhysicsEngine.prototype.__defineGetter__("friction", function() {
  return this._friction;
});

PhysicsEngine.prototype.__defineSetter__("friction", function(val) {
  return this._friction = val;
});

CollisionEngine = (function() {
  var _map, _physicsEngine, _player;

  function CollisionEngine(name) {
    this.name = name;
  }

  _map = {};

  _player = {};

  _physicsEngine = {};

  CollisionEngine.prototype.manageCollisions = function(focus, target) {
    var obj, tmpCollection;
    if (focus.name === Action.name) {
      tmpCollection = [];
      if (focus.owner === Action.prototype.PLAYER) {
        tmpCollection = this.map.activeEnemies;
      } else {
        tmpCollection[0] = this.player;
      }
      for (obj in tmpCollection) {
        this.checkForCollision(tmpCollection[obj], focus);
      }
      return;
    }
    return this.checkForCollision(focus, target);
  };

  CollisionEngine.prototype.fullyEvalulateSuperClass = function(obj) {
    if (obj instanceof MapObject) {
      return CollisionEngine.prototype.TYPE_OF_MAPOBJECT;
    }
    if (obj instanceof Action) return CollisionEngine.prototype.TYPE_OF_ACTION;
    if (obj instanceof Enemy) return Enemy.prototype.name;
    if (obj instanceof Player) return Player.prototype.name;
  };

  CollisionEngine.prototype.checkForCollision = function(focus, target) {
    var intersection;
    if (target.collisionRect.intersects(focus.collisionRect)) {
      this.handleCollisionStates(focus, target);
      if (this.physicsEngine.isTargetMovingVertically(target)) {
        intersection = target.collisionRect.intersection(focus.collisionRect);
        if (target.damage < focus.health) {
          this.physicsEngine.handleVerticalCollision(target, focus, intersection);
        }
      } else {
        this.physicsEngine.handleHorizontalCollision(target, focus, this.map);
      }
      focus.health -= target.damage;
      return target.health -= focus.damage;
    }
  };

  CollisionEngine.prototype.handleCollisionStates = function(focus, target) {
    var focusBase, targetBase;
    try {
      focusBase = focus.__proto__.name;
      targetBase = target.__proto__.name;
    } catch (error) {
      focusBase = this.fullyEvalulateSuperClass(focus);
      targetBase = this.fullyEvalulateSuperClass(target);
    }
    if (target.direction === 1 && focusBase !== CollisionEngine.prototype.TYPE_OF_MAPOBJECT) {
      if (targetBase === CollisionEngine.prototype.TYPE_OF_ACTION) {
        focus.state = focus.collisionLeft;
        return focus.isBusy = true;
      } else {
        target.state = target.collisionRight;
        focus.state = focus.collisionLeft;
        target.isBusy = true;
        return focus.isBusy = true;
      }
    } else if (target.direction === -1 && focusBase !== CollisionEngine.prototype.TYPE_OF_MAPOBJECT) {
      if (targetBase === CollisionEngine.prototype.TYPE_OF_ACTION) {
        focus.state = focus.collisionRight;
        return focus.isBusy = true;
      } else {
        target.state = target.collisionLeft;
        focus.state = focus.collisionRight;
        target.isBusy = true;
        return focus.isBusy = true;
      }
    }
  };

  CollisionEngine.prototype.checkVerticalMapCollision = function(target) {
    var destination, horizontalMax, horizontalMin, i, outOfBounds, point, _ref, _ref2, _ref3, _ref4;
    outOfBounds = this.physicsEngine.isTargetOutOfBounds(target, this.map);
    if (outOfBounds || target.applyGravityAndFriction === false) return;
    destination = this.physicsEngine.getVerticalDestination(target, this.map);
    horizontalMin = this.physicsEngine.getHorizontalMin(target, this.map);
    horizontalMax = this.physicsEngine.getHorizontalMax(target, horizontalMin);
    i = 0;
    point = 0;
    if (target.direction === 1) {
      for (i = _ref = horizontalMin + target.thresholdX, _ref2 = (horizontalMax - target.thresholdX) - 1; _ref <= _ref2 ? i <= _ref2 : i >= _ref2; _ref <= _ref2 ? i++ : i--) {
        this.checkForCieling(Math.round(i));
        point = this.map.collisionDataPixel(Math.round(i), Math.round(destination));
        if (point !== 0) {
          this.checkForFloor(Math.round(point), Math.round(destination), Math.round(i), target);
          return;
        }
      }
    } else {
      for (i = _ref3 = horizontalMin - target.thresholdX, _ref4 = (horizontalMax + target.thresholdX) - 1; _ref3 <= _ref4 ? i <= _ref4 : i >= _ref4; _ref3 <= _ref4 ? i++ : i--) {
        this.checkForCieling(Math.round(i));
        point = this.map.collisionDataPixel(Math.round(i), Math.round(destination));
        if (point !== 0) {
          this.checkForFloor(Math.round(point), Math.round(destination), Math.round(i), target);
          return;
        }
      }
    }
    return this.physicsEngine.manageVerticalBounds(target, this.map);
  };

  CollisionEngine.prototype.checkHorizontalMapCollision = function() {
    var destination, i, point, verticalMax, verticalMin, _ref;
    destination = Math.round(this.physicsEngine.getHorizontalDesitination(this.player, this.map));
    verticalMin = this.physicsEngine.getVerticalMin(this.player, this.map);
    verticalMax = this.physicsEngine.getVerticalMax(this.player, this.map);
    i = 0;
    for (i = verticalMin, _ref = verticalMax - 1; verticalMin <= _ref ? i <= _ref : i >= _ref; verticalMin <= _ref ? i++ : i--) {
      point = this.map.collisionDataPixel(Math.round(destination), Math.round(i));
      if (point !== 0) {
        this.checkForWall(point, Math.round(destination), Math.round(i));
        if (this.player.direction === 1) destination -= this.player.width;
        this.physicsEngine.manageHorizontalBounds(this.player, this.map, destination);
        return;
      }
    }
  };

  CollisionEngine.prototype.checkForWall = function(point, destination, position) {
    var _results;
    _results = [];
    while (point !== 0) {
      destination -= this.player.direction;
      _results.push(point = this.map.collisionDataPixel(Math.round(destination), Math.round(position)));
    }
    return _results;
  };

  CollisionEngine.prototype.checkForFloor = function(point, destination, position, target) {
    var count;
    count = 0;
    while (point !== 0) {
      count++;
      destination--;
      point = this.map.collisionDataPixel(Math.round(position), Math.round(destination));
      if (count > (target.height * .75)) {
        point = 0;
        return;
      }
    }
    return this.physicsEngine.setTargetFloor(target, this.map, destination);
  };

  CollisionEngine.prototype.checkForCieling = function(point) {
    var top;
    top = this.map.collisionDataPixel(point, this.player.y);
    if (top !== 0) {
      while (top !== 0) {
        this.physicsEngine.incrementPlayerVelocity(this.player);
        top = this.map.collisionDataPixel(point, this.player.y);
      }
      return this.physicsEngine.resetPlayerVelocity(this.player);
    }
  };

  return CollisionEngine;

})();

CollisionEngine.prototype.name = "CollisionEngine";

CollisionEngine.prototype.__defineGetter__("map", function() {
  return this._map;
});

CollisionEngine.prototype.__defineSetter__("map", function(val) {
  return this._map = val;
});

CollisionEngine.prototype.__defineGetter__("player", function() {
  return this._player;
});

CollisionEngine.prototype.__defineSetter__("player", function(val) {
  return this._player = val;
});

CollisionEngine.prototype.__defineGetter__("physicsEngine", function() {
  return this._physicsEngine;
});

CollisionEngine.prototype.__defineSetter__("physicsEngine", function(val) {
  return this._physicsEngine = val;
});

CollisionEngine.prototype.TYPE_OF_MAPOBJECT = "MapObject";

CollisionEngine.prototype.TYPE_OF_ACTION = "Action";

SoundEngine = (function() {
  var _activeSounds;

  function SoundEngine(name) {
    this.name = name;
  }

  _activeSounds = [];

  SoundEngine.prototype.checkPlayback = function(obj) {
    var el;
    if (obj === void 0 || obj.sound === void 0 || _activeSounds[obj.sound]) return;
    el = new Audio();
    _activeSounds[obj.sound] = el;
    el.src = obj.sound;
    el.loopsRemaining = obj.soundLoops;
    el.addEventListener("ended", (function() {
      if (el.loopsRemaining && el.loopsRemaining !== 0) {
        el.loopsRemaining--;
        return el.play();
      }
    }), false);
    return el.play();
  };

  SoundEngine.prototype.removeSound = function(snd) {
    if (_activeSounds[snd]) return delete _activeSounds[snd];
  };

  return SoundEngine;

})();

SoundEngine.prototype.name = "SoundEngine";

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

Enemy = (function(_super) {

  __extends(Enemy, _super);

  function Enemy(name) {
    this.name = name;
  }

  Enemy.prototype.behavior = function(suggestedX, suggestedY, suggestedVelcoityY) {};

  return Enemy;

})(Player);

Enemy.prototype.name = "Enemy";

Enemy.prototype.__defineGetter__("x", function() {
  return this._screenX;
});

Enemy.prototype.__defineSetter__("x", function(val) {
  return this._screenX = val;
});

Enemy.prototype.__defineGetter__("y", function() {
  return this._screenY;
});

Enemy.prototype.__defineSetter__("y", function(val) {
  if (val >= (Game.prototype.VIEWPORT_HEIGHT - this.cellHeight)) {
    this._screenY = Game.prototype.VIEWPORT_HEIGHT - this.cellHeight;
    return;
  }
  return this._screenY = val;
});

Enemy.prototype.__defineGetter__("collisionRect", function() {
  return new Rectangle(this.screenX + this.thresholdX, this.screenY + this.thresholdY, this.width - (this.thresholdX * 2), this.height - (this.thresholdY * 2));
});

Enemy.prototype.__defineGetter__("point", function() {
  return new Point(this.screenX, this.screenY);
});

Enemy.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

Enemy.prototype.__defineSetter__("frame", function(val) {
  if (val >= this.state.duration) {
    if (!this.state.persistent) {
      this.state = this._previousState;
      this.frameBuffer = this.state.frameBuffer;
      this.isBusy = false;
    }
    this._frame = 0;
    return;
  }
  return this._frame = this._frame === 0 || val === 0 ? val : val - this.frameBuffer;
});

EnemyGroup = (function(_super) {

  __extends(EnemyGroup, _super);

  function EnemyGroup(type, positions, independence) {
    this.type = type;
    this.positions = positions;
    this.independence = independence;
  }

  return EnemyGroup;

})(Group);

EnemyGroup.prototype.name = "EnemyGroup";
