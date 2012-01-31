class Enemy extends Player
  constructor:(@name)->

  behavior:(args)->
    #function is to be overridden by the implementer.

Enemy::name = "Enemy"

Enemy::__defineGetter__ "x",->
  @_screenX

Enemy::__defineSetter__ "x",(val)->
  @_screenX = val

Enemy::__defineGetter__ "y",->
  @_screenY

Enemy::__defineSetter__ "y",(val)->
  @_screenY = val

Enemy::__defineGetter__ "collisionRect",->
  new Rectangle (@screenX+@thresholdX),(@screenY+@thresholdY),(@width-(@thresholdX*2)),(@height-(@thresholdY*2))

Enemy::__defineGetter__ "point",->
  new Point @screenX,@screenY

Enemy::__defineSetter__ "frame",(val)->
  @_frame = val
  if not isBusy
    @behavior()