var RenderObject;

RenderObject = (function() {
  var _asset, _assetClass, _cellHeight, _cellWidth, _direction, _duration, _easeCoefficient, _frame, _frameBuffer, _height, _index, _lifeSpan, _transparency, _velocityX, _velocityY, _width, _workbench, _x, _y;

  function RenderObject(name) {
    this.name = name;
  }

  _transparency = false;

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

  RenderObject.prototype.initialize = function() {
    if ((void 0 !== this._assetClass) && (0 !== this._cellHeight) && (0 !== this._cellWidth)) {
      _asset = new Image();
      _asset.src = this._assetClass;
      return this.workbench = document.createElement("canvas");
    } else {
      return console.log("Set a cellwidth , cellheight , and assetClass before calling initialize.");
    }
  };

  RenderObject.prototype.dispose = function() {
    _assetClass = void 0;
    return _asset = void 0;
  };

  return RenderObject;

})();

RenderObject.prototype.__defineGetter__("bitmapData", function() {
  var ctx, keyFrame, tmpData;
  tmpData = new Image();
  this.workbench.width = this._asset.width;
  this.workbench.height = this._asset.height;
  ctx = workbench.getContext('2d');
  keyFrame = Math.floor(this._frame) * this._cellWidth;
  ctx.drawImage(this._asset, keyFrame, 0);
  tmpData.src = workbench.toDataURL();
  return tmpData;
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
  return this._cellWidth;
});

RenderObject.prototype.__defineGetter__("height", function() {
  return this._cellHeight;
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
  return new Point(this.x, this.y);
});

RenderObject.prototype.__defineSetter__("tranparency", function(val) {
  return this._transparency = val;
});

RenderObject.prototype.__defineGetter__("transparency", function() {
  return this._transparency;
});

RenderObject.prototype.__defineGetter__("asset", function() {
  return this._asset;
});

RenderObject.prototype.__defineGetter__("assetClass", function() {
  return this._assetClass;
});

RenderObject.prototype.__defineSetter__("assetClass", function(val) {
  return this._assetClass = val;
});

RenderObject.prototype.__defineGetter__("workbench", function() {
  return this._workbench;
});

RenderObject.prototype.__defineSetter__("workbench", function(val) {
  return this._workbench = val;
});
