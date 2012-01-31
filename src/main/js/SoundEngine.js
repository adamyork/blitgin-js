var SoundEngine;

SoundEngine = (function() {
  var _activeSounds;

  function SoundEngine(name) {
    this.name = name;
  }

  _activeSounds = [];

  SoundEngine.prototype.checkPlayback = function(obj) {
    if (obj === void 0 || obj.sound === void 0 || _activeSounds[obj.sound]) return;
    return _activeSounds[obj.sound] = obj.sound;
  };

  SoundEngine.prototype.removeSound = function(snd) {
    var arr, index;
    if (_activeSounds[snd]) {
      index = _activeSounds.indexOf(snd, 0);
      arr = _activeSounds.splice(index, 1);
      return arr = void 0;
    }
  };

  return SoundEngine;

})();

SoundEngine.prototype.name = "SoundEngine";
