var State;

State = (function() {
  var _duration, _frameBuffer, _id, _persistent, _row;

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

State.prototype.__defineGetter__("frameBuffer", function() {
  return this._frameBuffer;
});

State.prototype.__defineSetter__("frameBuffer", function(val) {
  if (val > .9) {
    this._frameBuffer = .9;
    console.log("A frame buffer greater .9 will result in the frame always being 0.");
    return;
  }
  return this._frameBuffer = val;
});
