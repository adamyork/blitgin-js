class CollisionEngine
  constructor:(@name)->

  _map = {}
  _player = {}
  _physicsEngine = {}

  manageCollisions:(focus,target)->
    if typeof focus is Action
      tmpCollection = []
      if(focus.owner is Action.PLAYER)
        tmpCollection = @map.activeEnemies
      else
        tmpCollection[0] = @player  
      for obj in tmpCollection
        @checkForCollision obj, focus
      return
    @checkForCollision focus,target

  checkForCollision:(focus,target)->
    if target.collisionRect.intersects(focus.collisionRect)
      if _physicsEngine.isTargetMovingVertically(target)
        intersection = target.collisionRect.intersection(focus.collisionRect)
        @physicsEngine.handleVerticalCollision(target, focus, intersection)
      if(target.direction == 1 and not (type focus is MapObject))
        if typeof target is Action
            focus.state = focus.collisionLeft
            focus.isBusy = true
        else
            target.state = target.collisionRight
            focus.state = focus.collisionLeft
            target.isBusy = true
            focus.isBusy = true
        @physicsEngine.handleHorizontalCollision target,focus,@map
      else if(target.direction == -1 and not (typeof focus is MapObject))
        if typeof target is Action
            focus.state = focus.collisionRight
            focus.isBusy = true
        else
            target.state = target.collisionLeft
            focus.state = focus.collisionRight
            target.isBusy = true
            focus.isBusy = true
        @physicsEngine.handleHorizontalCollision target,focus,@map
      focus.health -= target.damage
      target.health -= focus.damage

  checkVerticalMapCollision:(target)->
    outOfBounds = @physicsEngine.isTargetOutOfBounds target,@map
    if(outOfBounds or target.applyGravityAndFriction is false)
      return

    destination = @physicsEngine.getVerticalDestination target,@map
    horizontalMin = @physicsEngine.getHorizontalMin target,@map
    horizontalMax = @physicsEngine.getHorizontalMax target,horizontalMin
    i = 0
    point = 0

    if target.direction is 1      
      for i in [horizontalMin + target.thresholdX .. horizontalMax - target.thresholdX]
        @checkForCieling Math.round(i)
        point = @map.collisionData.getPixel(Math.round(i),Math.round(destination))
        if point isnt 0
          checkForFloor(point, destination, i, target)
          return
    else
      for i in [horizontalMin - target.thresholdX .. horizontalMax + target.thresholdX]
        @checkForCieling Math.round(i)
        point = @map.collisionData.getPixel(Math.round(i),Math.round(destination))
        if point isnt 0
          @checkForFloor point,destination,i,target
          return
    @physicsEngine.manageVerticalBounds target,@map

  checkHorizontalMapCollision:->
    destination = @physicsEngine.getHorizontalDesitination @player,@map
    verticalMin = @physicsEngine.getVerticalMin @player,@map
    verticalMax = @physicsEngine.getVerticalMax @player,@map
    
    for i in [verticalMin .. verticalMax]
      point = @map.collisionData.getPixel destination,Math.round(i)
      if point isnt 0
        while point isnt 0
          destination -= @player.direction
          point = @map.collisionData.getPixel destination,Math.round(i)
        if @player.direction is 1
          destination -= @player.width
        @physicsEngine.manageHorizontalBounds @player,@map,destination
        return

  checkForFloor:(point,destination,position,target)->
    count = 0
    while point isnt 0
      count++
      destination--
      point = @map.collisionData.getPixel Math.round(position),Math.round(destination)
      if count > (target.height * .75)
        point = 0
        return
    @physicsEngine.setTargetFloor target,@map,destination

  checkForCieling:(point)->
    top = @map.collisionData.getPixel point,@player.y
    if top isnt 0
      while top isnt 0
        @physicsEngine.incrementPlayerVelocity @player
        top = _map.collisionData.getPixel point,@player.y
      @physicsEngine.resetPlayerVelocity @player

CollisionEngine::__defineGetter__ "map",->
  @_map
  
CollisionEngine::__defineSetter__ "map",(val)->
  @_map = val
  
CollisionEngine::__defineGetter__ "player",->
  @_player

CollisionEngine::__defineSetter__ "player",(val)->
  @_player = val
  
CollisionEngine::__defineGetter__ "physicsEngine",->
  @_physicsEngine

CollisionEngine::__defineSetter__ "physicsEngine",(val)->
  @_physicsEngine = val