class RenderObject
  constructor:(@name)->
    
  _x = 0
  _y = 0
    
RenderObject::__defineGetter__ "x", ->
    return @_x;

RenderObject::__defineSetter__ "x", (val) ->
    @_x = val
    
RenderObject::__defineGetter__ "y", ->
    return @_y;

RenderObject::__defineSetter__ "y", (val) ->
    @_y = val
