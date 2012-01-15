class Particle extends RenderObject
  constructor:(@index,@x,@y)->
    
  _index = 0
  _lifeSpan = 0

  initialize:->
    super
    duration = Math.ceil (@asset.width/@cellWidth)

Particle::__defineGetter__ "index",->
  @_index

Particle::__defineSetter__ "index",(value)->
  @_index = val

Particle::__defineGetter__ "lifeSpan",->
  @_lifeSpan

Particle::__defineSetter__ "lifeSpan",(value)->
  @_lifeSpan = val