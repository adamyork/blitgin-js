class Emitter
  constructor:(@_type,@_gravity,@_friction,@_quantity,@_size)->
    @createParticles()
    
  _type = {}
  _gravity = 0
  _friction = 0
  _quantity = 0
  _particles = []
  _size = 0
  _frame = 0

createParticles:->
  for i in _quantity
    particle = new _type(i)
    _particles.push particle

removeParticle:(particle)->
  _particles[particle.index ... particle.index+1]

Emitter::__defineGetter__ "frame",->
  @_frame

Emitter::__defineGetter__ "frame",(val)->
  for particle in @_particles
    particle.frame++
    particle.velocityX += particle.easeCoefficient
    particle.velocityY += particle.easeCoefficient
    particle.x = (particle.x + (particle.velocityX * particle.direction)) - _friction
    particle.y = (particle.y + particle.velocityY) + _gravity
  
    if particle.frame >= particle.lifeSpan
      @removeParticle particle
      continue

Emitter::__defineGetter__ "bitmapData",->
  bmpData = new Image()
  for particle in @_particles
    particle
    #bmpData.copyPixels(particle.bitmapData, particle.rect, particle.point)
  bmpData

Emitter::__defineGetter__ "hasParticles",->
  if @_particles.length isnt 0 then true else false

Emitter::__defineGetter__ "rect",->
  new Rectangle 0,0,@_size,@_size