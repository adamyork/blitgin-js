class SoundEngine
  constructor:(@name)->

  _activeSounds = []

  checkPlayback:(obj)->
    if obj is undefined or obj.sound is undefined or _activeSounds[obj.sound]
      return
    el = new Audio()
    _activeSounds[obj.sound] = el
    el.src = obj.sound
    el.loopsRemaining = obj.soundLoops
    el.addEventListener "ended", (->
      if el.loopsRemaining and el.loopsRemaining isnt 0
        el.loopsRemaining--
        el.play()
    ), false
    el.play()

  removeSound:(snd)->
    if _activeSounds[snd]
      delete _activeSounds[snd]

SoundEngine::name = "SoundEngine"