class Emitter
  constructor:(@_type,@_gravity,@_friction,@_quantity)->
    @_workbench = document.createElement "canvas"
    @_workbench.width = @_size
    @_workbench.height = @_size
    @_ctx = @_workbench.getContext '2d'
    @_particles = []
    @_frame = 0
    @_imageData = new Image()
    
  _asset = {}
  _assetClass = {}
  _assetData = {}
  _workbench = {}
  _ctx = {}
  _type = {}
  _gravity = 0
  _friction = 0
  _quantity = 0
  _particles = []
  _frame = 0
  _x = 0
  _y = 0
  _ready = false

  createParticles:->
    @ready = false
    for i in [0 .. @_quantity-1]
      particle = new @_type(i)
      particle.x = @point.x
      particle.y = @point.y
      if i is 0
        @loadParticleAsset particle.assetClass
      @_particles.push particle
  
  loadParticleAsset:(src)->
    #TODO this does not support sampling of color
    @workbench = document.createElement "canvas"
    @asset = new Image()
    @assetData = new Image()
    @asset.onload = @assetLoadComplete.bind this
    @asset.src = src
    
  assetLoadComplete:->
    @asset.onload = undefined
    @ctx = @workbench.getContext '2d'
    @assetData = @asset
    @ready = true
  
  removeParticle:(particle)->
    index = @_particles.indexOf particle,0
    arr = @_particles.splice index,1
    arr = undefined

Emitter::name = "Emitter"

Emitter::__defineGetter__ "frame",->
  @_frame

Emitter::__defineSetter__ "frame",(val)->
  if @ready
    for particle in @_particles
      if @_frame >= particle.startFrame
        particle.frame++
        particle.velocityX += particle.easeCoefficient
        particle.velocityY += particle.easeCoefficient
        particle.x = (particle.x + (particle.velocityX * particle.direction)) - @_friction
        particle.y = (particle.y + particle.velocityY) + @_gravity
    if (particle.frame + particle.startFrame) >= particle.lifeSpan
      @removeParticle particle
    @_frame = val

Emitter::__defineGetter__ "bitmapData",->
  if not @ready
    return {player:{notready:true},rect:new Rectangle 0,0,0,0}
  collection = []
  for particle in @_particles
    keyframe = particle.objectKeyframeLength * particle.cellWidth
    #TODO this assumes are particle sprite sheets are a single row
    obj = {data:@assetData,rect:new Rectangle(keyframe,0,particle.cellWidth,particle.cellHeight),particle:particle}
    collection.push obj
  {particles:collection}

Emitter::__defineGetter__ "hasParticles",->
  if @_particles.length isnt 0 then true else false

Emitter::__defineGetter__ "asset",->
  @_asset

Emitter::__defineSetter__ "asset",(val)->
  @_asset = val

Emitter::__defineGetter__ "assetClass",->
  @_assetClass

Emitter::__defineSetter__ "assetClass",(val)->
  @_assetClass = val

Emitter::__defineGetter__ "assetData",->
  @_assetData

Emitter::__defineSetter__ "assetData",(val)->
  @_assetData = val

Emitter::__defineGetter__ "workbench",->
  @_workbench

Emitter::__defineSetter__ "workbench",(val)->
  @_workbench = val

Emitter::__defineGetter__ "ctx",->
  if @_ctx is undefined
    undefined
  else
    @_ctx

Emitter::__defineSetter__ "ctx",(val)->
  @_ctx = val

Emitter::__defineGetter__ "point",->
  @_point

Emitter::__defineSetter__ "point",(val)->
  @_point = val
  for particle in @_particles
    if @_frame <= particle.startFrame
      particle.x = @_point.x
      particle.y = @_point.y

Emitter::__defineGetter__ "x",->
  @_x

Emitter::__defineSetter__ "x",(val)->
  @_x = val
  
Emitter::__defineGetter__ "y",->
  @_y

Emitter::__defineSetter__ "y",(val)->
  @_y = val

Emitter::__defineGetter__ "ready",->
  @_ready

Emitter::__defineSetter__ "ready",(val)->
  @_ready = val