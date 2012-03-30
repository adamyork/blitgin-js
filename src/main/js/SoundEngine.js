var SoundEngine;

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
