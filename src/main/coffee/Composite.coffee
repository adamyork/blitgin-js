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
    @_frame = 0
    @objectKeyframeLength = @_frame
    return
  @_frame = if (@_frame is 0 or val is 0) then val else (val - @frameBuffer)
  @objectKeyframeLength = @_frame

Composite::__defineGetter__ "point",->
  @_point

Composite::__defineSetter__ "point",(val)->
  @_point = val