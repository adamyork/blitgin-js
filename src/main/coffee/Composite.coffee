class Composite extends RenderObject
  constructor:(@name)->
    
  _frame = 0

  initialize:->
    super
    duration = Math.ceil (@asset.width/@cellWidth)

Composite::name = "Composite"

Composite::__defineGetter__ "frame",->
  @_frame

Composite::__defineSetter__ "frame",(val)->
  if(val > @duration)
    @_frame = 0
    return
  @_frame = if (@_frame is 0 or val is 0) then val else (val - @frameBuffer)