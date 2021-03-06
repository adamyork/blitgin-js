class PhysicsEngine
  constructor:(@name)->

  _gravity = 0
  _friction = 0

  adjustPlayerVerically:(player,map)->
    player.velocityY-= map.gravity + Math.floor(map.gravity * Game::DeltaFrames)
    # console.log "player.velocityY " + player.velocityY
    player.y -= player.velocityY
    player.y += map.gravity + Math.floor(map.gravity * Game::DeltaFrames)
    if player.y - player.height <= 0 and player.floor
      if map.floor is undefined then map.floor = map.y
      map.floor += map.gravity + Math.floor(map.gravity * Game::DeltaFrames)
      return
    map.y += map.gravity + Math.floor(map.gravity * Game::DeltaFrames)

  applyPlayerInput:(player,input)->
    if player.direction isnt input.direction
      #reduce any velocity when changing direction
      tar = (player.velocityX * (player.easeCoefficient / 100))
      player.velocityX = tar + Math.floor(tar* Game::DeltaFrames)
    player.direction = input.direction
    player.velocityX += player.easeCoefficient + Math.floor(player.easeCoefficient * Game::DeltaFrames)

  adjustPlayerHorizontally:(player,map)->
    tar = (player.x + (player.velocityX * player.direction)) 
    player.x = tar
    player.velocityX -= map.friction + Math.floor(map.friction * Game::DeltaFrames)
    if @doesMapNeedToMove(player, map)
      tar = map.x + (player.velocityX * player.direction)
      map.x = tar
      @enforcePositionThreshold(player)

  doesMapNeedToMove:(player,map)->
    conditionLeft = (player.x <= player.mapBoundsMin) and (map.x isnt 0)
    conditionRight = (player.x >= player.mapBoundsMax) and (map.x isnt map.width - Game::VIEWPORT_WIDTH)
    (conditionLeft or conditionRight)

  enforcePositionThreshold:(player)->
    if player.x <= player.mapBoundsMin
      player.x = player.mapBoundsMin
      return
    player.x = player.mapBoundsMax

  isTargetMovingVertically:(target)->
    (target.velocityY isnt 0)

  handleVerticalCollision:(target,focus,intersection)->
    if target.collisionRect.y > intersection.y
      target.velocityY = 0
    if target.collisionRect.y < intersection.y
      target.velocityY = target.maxVelocityY
  
  fullyEvalulateSuperClass:(obj)->
    if obj instanceof MapObject
      return CollisionEngine::TYPE_OF_MAPOBJECT
    if obj instanceof Action
      return CollisionEngine::TYPE_OF_ACTION
    if obj instanceof Enemy
      return Enemy::name
    if obj instanceof Player
      return Player::name

  handleHorizontalCollision:(target,focus,map)->
    try
      targetBase = target.__proto__.name
    catch error
      targetBase = @fullyEvalulateSuperClass target
      
    if target.direction is 1
      if targetBase is CollisionEngine::TYPE_OF_ACTION
          focus.x += focus.width * focus.collisionCoefficient
          focus.velocityX = 0
      else
          focus.screenX += focus.width * focus.collisionCoefficient
          target.x -= target.width * target.collisionCoefficient
          target.directionOfCollision = -1
          #map.x -= target.width * target.collisionCoefficient
          focus.velocityX = 0
          target.velocityX = 0
    else if target.direction is -1
      if targetBase is CollisionEngine::TYPE_OF_ACTION
          focus.x -= focus.width * focus.collisionCoefficient
          focus.velocityX = 0
      else
          focus.screenX -= focus.width * focus.collisionCoefficient
          target.x += target.width * target.collisionCoefficient
          target.directionOfCollision = 1
          #map.x += target.width * target.collisionCoefficient
          target.velocityX = 0
          focus.velocityX = 0
    @updateMapXIfEnemy(focus,target,target.direction)

  updateMapXIfEnemy:(focus,target,direction)->
    if focus instanceof Enemy
      focus.mapX += (focus.width + target.width) * direction

  isTargetOutOfBounds:(target,map)->
    (target.y - target.velocityY + map.gravity < target.y)

  getVerticalDestination:(target,map)->
    (target.y + target.height + map.y)

  getHorizontalMin:(target,map)->
    (target.vOrigin + map.x)
    
  getHorizontalMax:(target,min)->
    (min + (target.width * (target.direction)))

  manageVerticalBounds:(target,map)->
    if(target.y < 0 and map.platform is false)
      target.y = 0

  getHorizontalDesitination:(player,map)->
    dir = player.direction
    if player.directionOfCollision
      dir = player.directionOfCollision
    (player.hOrigin + map.x - (player.thresholdX * dir))

  getVerticalMin:(player,map)->
    (player.y + map.y)

  getVerticalMax:(player,map)->
    (player.y + player.height + map.y)

  manageHorizontalBounds:(player,map,destination)->
    player.x = destination - map.x
    player.velocityX = 0

  setTargetFloor:(target,map,destination)->
    target.floor = (destination - target.height - map.y)
    target.y = target.floor
    target.velocityY = 0

  resetPlayerVelocity:(player)->
    player.velocityY = 0

  incrementPlayerVelocity:(player)->
    player.y++

  adjustMapVerically:(map,player)->
    #Check to see if the map moves vertically.
    if (player.y < 0 and map.platform)
      map.y += player.y
      player.y = 0

  adjustEnemy:(enemy,player,map)->
    if enemy.applyGravityAndFriction
      if @doesMapNeedToMove(player,map)
        enemy.screenX = enemy.screenX + (player.velocityX * -(player.direction))
        enemy.originalX += (player.velocityX * -(player.direction))
      suggestedVelocityY = enemy.velocityY
      suggestedVelocityY -= Math.ceil(map.gravity + Math.floor(map.gravity * Game::DeltaFrames))
      if suggestedVelocityY > enemy.maxVelocityY then suggestedVelocityY = enemy.maxVelocityY
      if suggestedVelocityY < 0 then suggestedVelocityY = 0
      suggestedScreenY = enemy.screenY
      suggestedScreenY -= enemy.velocityY
      suggestedScreenY += map.gravity
      
      suggestedVelocityX = enemy.velocityX
      suggestedVelocityX += enemy.easeCoefficient + Math.floor(enemy.easeCoefficient * Game::DeltaFrames)
      if suggestedVelocityX > enemy.maxVelocityX then suggestedVelocityY = enemy.maxVelocityX
      if suggestedVelocityX < 0 then suggestedVelocityX = 0
      suggestedScreenX = enemy.screenX + (suggestedVelocityX * enemy.direction)
      suggestedVelocityX -= map.friction + Math.floor(map.friction * Game::DeltaFrames)
    else
      suggestedScreenX = enemy.mapX - map.x + (Math.ceil(map.x * Game::DeltaFrames))
      suggestedScreenY = enemy.mapY - map.y  + (Math.ceil(map.y * Game::DeltaFrames))
    enemy.behavior suggestedScreenX,suggestedScreenY,suggestedVelocityX,suggestedVelocityX

  adjustAction:(action,map)->
    action.velocityX += action.easeCoefficient + Math.ceil(action.easeCoefficient * Game::DeltaFrames)
    action.x += (action.direction * action.velocityX)
    #velocity should not always be reduced by .5
    action.y += map.gravity - (action.velocityX * .5)
    action.velocityX -= map.friction + + Math.ceil(map.friction * Game::DeltaFrames)

  adjustMapObject:(mapObj,player,map)->
     #TODO Account for delta time
    if(mapObj.applyGravityAndFriction)
      if(player.x isnt 0 and player.x isnt Game.VIEWPORT_WIDTH - player.width)
        mapObj.screenX = mapObj.screenX + (player.velocityX * -(player.direction))
      mapObj.screenY += map.gravity
      mapObj.screenX = mapObj.screenX + (mapObj.velocityX * mapObj.direction)
      mapObj.velocityX -= map.friction
    else
      mapObj.screenX = mapObj.mapX - map.x
      mapObj.screenY = mapObj.mapY - map.y

  manageNis:(nis,player,map)->
    prop = {}
    value = 0
    pGoals = nis.nisGoal.playerGoals
    for prop of pGoals
      value = pGoals[prop]
      target = (value - player[prop]) / (nis.nisGoal.duration - nis.frame)
      player.direction = if (target < 0) then -1 else 1
      player[prop] += target
      player.frame++
    mGoals = nis.nisGoal.mapGoals
    for prop in mGoals
      value = mGoals[prop]
      map[prop] += (value - map[prop]) / (nis.nisGoal.duration - nis.frame)
      @adjustMapVerically map,player
    nis.frame++
    (nis.frame >= nis.nisGoal.duration)

PhysicsEngine::name = "PhysicsEngine"

PhysicsEngine::__defineGetter__ "gravity",->
  @_gravity

PhysicsEngine::__defineSetter__ "gravity",(val)->
  @_gravity = val

PhysicsEngine::__defineGetter__ "friction",->
  @_friction

PhysicsEngine::__defineSetter__ "friction",(val)->
  @_friction = val