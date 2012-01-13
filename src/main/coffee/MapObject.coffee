class MapObject extends Player
  constructor:(@name)->
    
  behavior:()->
    #function is to be overridden by the implementer.

MapObject::__defineGetter__ "x", ->
  @screenX

MapObject::__defineSetter__ "x", (val) ->
  @screenX = val

MapObject::__defineGetter__ "y", ->
  @screenY

MapObject::__defineSetter__ "y", (val) ->
  @screenY = val

MapObject::__defineGetter__ "collisionRect", ->
  new Rectangle (@screenX + @thresholdX),(@screenY + @thresholdY),(@width - (@thresholdX * 2)),(@height - (@thresholdY * 2))
                         
MapObject::__defineGetter__ "point", ->
  new Point @screenX,@screenY

MapObject::__defineSetter__ "frame", (val) ->
  @_frame = value
  if not @isBusy
    @behavior()