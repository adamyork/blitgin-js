class Composite extends RenderObject
  constructor:(@name)->
    
  _frame = 0
  _duration = 0
  _point = {}

  initialize:->
    super
    @frame = 0
    if @frameBuffer is undefined
      @frameBuffer = 0
    @duration = Math.ceil (@asset.width/@cellWidth)
    
Composite::name = "Composite"

Composite::__defineGetter__ "frame",->
  @_frame

Composite::__defineSetter__ "frame",(val)->
  if(val > @duration)
    console.log "in if frame " + @_frame
    console.log "in if val " + val
    console.log "in if duration " + @duration
    @_frame = 0
    @objectKeyframeLength = @_frame
    return
  console.log "not in if frame " + @_frame
  console.log "not in if val " + val
  console.log "not in if @duration " + @duration
  @_frame = if (@_frame is 0 or val is 0) then val else (val - @frameBuffer)
  console.log "not in if after the set frame " + @_frame 
  @objectKeyframeLength = @_frame

Composite::__defineGetter__ "point",->
  @_point

Composite::__defineSetter__ "point",(val)->
  @_point = val