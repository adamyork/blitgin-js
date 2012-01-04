class Point
  constructor:(@_x,@_y)->
    
  _x = 0
  _y = 0
  
Point::__defineGetter__ "x", ->
    return @_x;

Point::__defineSetter__ "x", (val) ->
    @_x = val
    
Point::__defineGetter__ "y", ->
    return @_y;

Point::__defineSetter__ "y", (val) ->
    @_y = val
