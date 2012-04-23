class CollisionEngine
  constructor:(@name)->

  _map = {}
  _player = {}
  _physicsEngine = {}

  manageCollisions:(focus,target)->
    if focus.name is Action.name
      tmpCollection = []
      if(focus.owner is Action::PLAYER)
        tmpCollection = @map.activeEnemies
      else
        tmpCollection[0] = @player  
      for obj of tmpCollection
        @checkForCollision tmpCollection[obj],focus
      return
    @checkForCollision focus,target
  
  fullyEvalulateSuperClass:(obj)->
    if obj instanceof MapObject
      return CollisionEngine::TYPE_OF_MAPOBJECT
    if obj instanceof Action
      return CollisionEngine::TYPE_OF_ACTION
    if obj instanceof Enemy
      return Enemy::name
    if obj instanceof Player
      return Player::name

  checkForCollision:(focus,target)->
    if target.collisionRect.intersects(focus.collisionRect)
      if @physicsEngine.isTargetMovingVertically(target)
        intersection = target.collisionRect.intersection(focus.collisionRect)
        @physicsEngine.handleVerticalCollision(target, focus, intersection)
      try
        focusBase = focus.__proto__.name
        targetBase = target.__proto__.name
      catch error
        focusBase = @fullyEvalulateSuperClass focus
        targetBase = @fullyEvalulateSuperClass target
      if(target.direction == 1 and focusBase isnt CollisionEngine::TYPE_OF_MAPOBJECT)
        if targetBase is CollisionEngine::TYPE_OF_ACTION
            focus.state = focus.collisionLeft
            focus.isBusy = true
        else
            target.state = target.collisionRight
            focus.state = focus.collisionLeft
            target.isBusy = true
            focus.isBusy = true
        @physicsEngine.handleHorizontalCollision target,focus,@map
      else if(target.direction == -1 and focusBase isnt CollisionEngine::TYPE_OF_MAPOBJECT)
        if targetBase is CollisionEngine::TYPE_OF_ACTION
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
      for i in [horizontalMin + target.thresholdX .. (horizontalMax - target.thresholdX)-1]
        @checkForCieling Math.round(i)
        point = @map.collisionDataPixel Math.round(i),Math.round(destination)
        if point isnt 0
          @checkForFloor Math.round(point),Math.round(destination),Math.round(i),target
          return
    else
      for i in [horizontalMin - target.thresholdX .. (horizontalMax + target.thresholdX)-1]
        @checkForCieling Math.round(i)
        point = @map.collisionDataPixel Math.round(i),Math.round(destination)
        if point isnt 0
          @checkForFloor Math.round(point),Math.round(destination),Math.round(i),target
          return
    @physicsEngine.manageVerticalBounds target,@map

  checkHorizontalMapCollision:->
    destination = Math.round(@physicsEngine.getHorizontalDesitination @player,@map)
    verticalMin = @physicsEngine.getVerticalMin @player,@map
    verticalMax = @physicsEngine.getVerticalMax @player,@map
    i = 0
    for i in [verticalMin .. verticalMax-1]
      point = @map.collisionDataPixel Math.round(destination),Math.round(i)
      if point isnt 0
        @checkForWall point,Math.round(destination),Math.round(i)
        if @player.direction is 1
          destination -= @player.width
        @physicsEngine.manageHorizontalBounds @player,@map,destination
        return
        
  checkForWall:(point,destination,position)->
    while point isnt 0
      destination -= @player.direction
      point = @map.collisionDataPixel Math.round(destination),Math.round(position)
      
  checkForFloor:(point,destination,position,target)->
    count = 0
    while point isnt 0
      count++
      destination--
      point = @map.collisionDataPixel Math.round(position),Math.round(destination)
      if count > (target.height * .75)
        point = 0
        return
    @physicsEngine.setTargetFloor target,@map,destination

  checkForCieling:(point)->
    top = @map.collisionDataPixel point,@player.y
    if top isnt 0
      while top isnt 0
        @physicsEngine.incrementPlayerVelocity @player
        top = @map.collisionDataPixel point,@player.y
      @physicsEngine.resetPlayerVelocity @player

CollisionEngine::name = "CollisionEngine"

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

CollisionEngine::TYPE_OF_MAPOBJECT = "MapObject"
CollisionEngine::TYPE_OF_ACTION = "Action"