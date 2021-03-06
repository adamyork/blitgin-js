class MapObject extends Player
  constructor:(@name)->
    
  behavior:()->
    #function is to be overridden by the implementer.

MapObject::name = "MapObject"

MapObject::__defineGetter__ "x",->
  @screenX

MapObject::__defineSetter__ "x",(val)->
  @screenX = val

MapObject::__defineGetter__ "y",->
  @screenY

MapObject::__defineSetter__ "y",(val)->
  @screenY = val

MapObject::__defineGetter__ "collisionRect",->
  new Rectangle (@screenX + @thresholdX),(@screenY + @thresholdY),(@width - (@thresholdX * 2)),(@height - (@thresholdY * 2))
                         
MapObject::__defineGetter__ "point",->
  new Point @screenX,@screenY
  
MapObject::__defineGetter__ "frame",->
  @_frame

MapObject::__defineSetter__ "frame",(val)->
  @_frame = val
  if not @isBusy
    @behavior()
  if val >= @state.duration
    if not @state.persistent
      @state = @_previousState
      @frameBuffer = @state.frameBuffer
      @isBusy = false
    @_frame = 0
    return
  @_frame = if (@_frame is 0 or val is 0) then val else val - @frameBuffer