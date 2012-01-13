var RenderEngine;

RenderEngine = (function() {

  function RenderEngine(name) {
    this.name = name;
  }

  RenderEngine._scrn = {};

  RenderEngine.prototype.setScreen = function(scrn) {
    return this._scrn = scrn;
  };

  RenderEngine.prototype.render = function(input) {
    var ctx;
    console.log('render' + this.map.bitmapData);
    console.log(this._scrn);
    ctx = this._scrn.getContext('2d');
    return ctx.drawImage(this.map.bitmapData, 0, 0);
  };

  return RenderEngine;

})();
