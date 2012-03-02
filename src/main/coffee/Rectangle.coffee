class Rectangle
  constructor:(@_x,@_y,@_width,@_height)->

  _x = 0
  _y = 0
  _width = 0
  _height = 0

Rectangle::name = "Rectangle"

Rectangle::intersects=(rect)->
  lateral = (@left < rect.left and rect.left < @right) or (@left < rect.right and rect.right < @right )
  vertical = (@top < rect.top and rect.top < @bottom) or (@top < rect.bottom and rect.bottom < @bottom)
  (lateral and vertical)
  
Rectangle::intersection=(rect)->
  new Rectangle(Math.max(rect.left,@left),Math.max(rect.top,@top),Math.min(rect.right,@right),Math.min(rect.bottom,@bottom))

Rectangle::__defineGetter__ "x",->
  @_x

Rectangle::__defineSetter__ "x",(val)->
  @_x = val
    
Rectangle::__defineGetter__ "y",->
  @_y

Rectangle::__defineSetter__ "y",(val)->
  @_y = val

Rectangle::__defineGetter__ "width",->
  @_width

Rectangle::__defineSetter__ "width",(val)->
  @_width = val

Rectangle::__defineGetter__ "height",->
  @_height

Rectangle::__defineSetter__ "height",(val)->
  @_height = val
  
Rectangle::__defineGetter__ "left",->
  @_x
  
Rectangle::__defineGetter__ "top",->
  @_y

Rectangle::__defineGetter__ "right",->
  @_x+@_width

Rectangle::__defineGetter__ "bottom",->
  @_y+@_height
