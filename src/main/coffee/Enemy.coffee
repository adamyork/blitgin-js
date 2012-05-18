class Enemy extends Player
  constructor:(@name)->

  behavior:(suggestedX,suggestedY,suggestedVelcoityY)->
    #function is to be overridden by the implementer.

Enemy::name = "Enemy"

Enemy::__defineGetter__ "x",->
  @_screenX

Enemy::__defineSetter__ "x",(val)->
  @_screenX = val

Enemy::__defineGetter__ "y",->
  @_screenY

Enemy::__defineSetter__ "y",(val)->
  if val >= (Game::VIEWPORT_HEIGHT - @cellHeight)
    @_screenY = Game::VIEWPORT_HEIGHT - @cellHeight;
    return
  @_screenY = val

Enemy::__defineGetter__ "collisionRect",->
  new Rectangle (@screenX+@thresholdX),(@screenY+@thresholdY),(@width-(@thresholdX*2)),(@height-(@thresholdY*2))

Enemy::__defineGetter__ "point",->
  new Point @screenX,@screenY

Enemy::__defineGetter__ "frame",->
  @_frame

Enemy::__defineSetter__ "frame",(val)->
  if val >= @state.duration
    if not @state.persistent
      @state = @_previousState
      @frameBuffer = @state.frameBuffer
      @isBusy = false
    @_frame = 0
    return
  @_frame = if (@_frame is 0 or val is 0) then val else val - @frameBuffer