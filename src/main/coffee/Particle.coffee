class Particle extends RenderObject
  constructor:(@index)->

  _index = 0
  _lifeSpan = 0
  _startFrame = 1

  initialize:(duration)->
    @objectKeyframeLength = 0
    @frame = 0
    @x = 0
    @y = 0
    @velocityX = 0
    @velocityY = 0

Particle::name = "Particle"

Particle::__defineGetter__ "index",->
  @_index

Particle::__defineSetter__ "index",(val)->
  @_index = val

Particle::__defineGetter__ "lifeSpan",->
  @_lifeSpan

Particle::__defineSetter__ "lifeSpan",(val)->
  @_lifeSpan = val
  
Particle::__defineGetter__ "startFrame",->
  @_startFrame

Particle::__defineSetter__ "startFrame",(val)->
  @_startFrame = val
  
Particle::__defineGetter__ "frame",->
  @_frame

Particle::__defineSetter__ "frame",(val)->
  @_frame = val
  if @objectKeyframeLength is (@startFrame + @duration)
    @objectKeyframeLength = 0
    return
  @objectKeyframeLength++