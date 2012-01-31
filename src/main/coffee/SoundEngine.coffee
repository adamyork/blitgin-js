class SoundEngine
  constructor:(@name)->

  _activeSounds = []

  checkPlayback:(obj)->
    if(obj is undefined or obj.sound is undefined or _activeSounds[obj.sound])
      return
    _activeSounds[obj.sound] = obj.sound
    #obj.sound.play(0, obj.soundLoops);

  removeSound:(snd)->
    if _activeSounds[snd]
      index = _activeSounds.indexOf snd, 0 
      arr = _activeSounds.splice index, 1
      arr = undefined

SoundEngine::name = "SoundEngine"