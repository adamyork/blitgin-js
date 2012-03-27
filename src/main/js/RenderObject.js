var RenderObject;

RenderObject = (function() {
  var _asset, _assetClass, _assetData, _callback, _cellHeight, _cellWidth, _collisionPixels, _colorConstant, _ctx, _direction, _duration, _easeCoefficient, _frame, _frameBuffer, _height, _index, _lifeSpan, _rgbTolerance, _showBounds, _transparency, _velocityX, _velocityY, _width, _workbench, _x, _y;

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

  RenderObject.prototype.initialize = function(_callback) {
    this._callback = _callback;
    if ((void 0 !== this.assetClass) && (0 !== this.cellHeight) && (0 !== this.cellWidth)) {
      this.workbench = document.createElement("canvas");
      this.asset = new Image();
      this.assetData = new Image();
      this.asset.onload = this.assetLoadComplete.bind(this);
      return this.asset.src = this.assetClass;
    } else {
      return console.log("Set a cellwidth , cellheight , and assetClass before calling initialize.");
    }
  };

  RenderObject.prototype.assetLoadComplete = function() {
    this.ctx = this.workbench.getContext('2d');
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
      console.log("Error : You need to set a hex value for colorConstant , or set tranparency true if no color is to be sampled out.");
    }
    this.workbench.width = asset.width;
    this.workbench.height = asset.height;
    this.ctx.drawImage(asset, 0, 0);
    imageData = this.ctx.getImageData(0, 0, this.workbench.width, this.workbench.height);
    worker = new Worker('../src/main/js/RemoveColorTask.js');
    ref = this;
    worker.onmessage = function(e) {
      if (cachePixels) {
        console.log('pixels cached');
        ref.collisionPixels = e.data;
      }
      ref.ctx.putImageData(e.data, 0, 0);
      targetData.src = null;
      targetData.src = ref.workbench.toDataURL();
      ref.ctx.clearRect(0, 0, asset.width, asset.height);
      console.log("sample complete");
      return worker.terminate();
    };
    worker.onerror = function(e) {
      return console.log("error in worker");
    };
    return worker.postMessage({
      "imageData": imageData,
      "colorConstant": this.colorConstant,
      "rgbTolerance": this.rgbTolerance
    });
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
  keyFrame = Math.floor(this._frame) * this.cellWidth;
  if (this.ctx === void 0) {
    return {
      player: {
        notready: true
      },
      rect: new Rectangle(keyFrame, 0, this.cellWidth, this.cellHeight)
    };
  }
  this.workbench.width = this._asset.width;
  this.workbench.height = this._asset.height;
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
