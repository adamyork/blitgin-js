class Player
  constructor:(@name)->
    @x = 0
    @y = 0
    @width = 0
    @height = 0
    @point = {}
    
  _x = 0
  _y = 0
  _width = 0
  _height = 0
  _composite = {}
  _compositePoint = {}
  _emitter = {}
  _point = {}
  
Player::__defineGetter__ "x",->
  @_x

Player::__defineSetter__ "x",(val)->
  @_x = val
    
Player::__defineGetter__ "y",->
  @_y

Player::__defineSetter__ "y",(val)->
  @_y = val

Player::__defineGetter__ "point",->
  @_point

Player::__defineSetter__ "point",(val)->
  @_point = val
  
Player::__defineGetter__ "composite",->
  @_composite

Player::__defineSetter__ "composite",(val)->
  @_composite = val

Player::__defineGetter__ "compositePoint",->
  new Point (x + composite.x),(y + composite.y)

Player::__defineSetter__ "compositePoint",(val)->
  @_compositePoint = val

Player::__defineGetter__ "emitter",->
  @_emitter

Player::__defineSetter__ "emitter",(val)->
  @_emitter = val