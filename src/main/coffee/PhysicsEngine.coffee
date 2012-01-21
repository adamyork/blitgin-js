class PhysicsEngine
  constructor:(@name)->

  _gravity = 0
  _friction = 0

  adjustPlayerVerically:(player,map)->
    player.y -= player.velocityY
    map.y -= player.velocityY
    player.velocityY-=4
    player.y += map.gravity
    map.y += map.gravity

  applyPlayerInput:(player,input)->
    if player.direction isnt input.direction
      #reduce any velocity when changing direction
      player.velocityX = player.velocityX * (player.easeCoefficient / 100)
    player.direction = input.direction
    player.velocityX += player.easeCoefficient

  adjustPlayerHorizontally:(player,map)->
    player.x = player.x + (player.velocityX * player.direction)
    player.velocityX -= map.friction
    if @doesMapNeedToMove(player, map)
      map.x = map.x + (player.velocityX * player.direction)
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

  handleHorizontalCollision:(target,focus,map)->
    if target.direction is 1
      if(target is Action)
          focus.x += focus.width * focus.collisionCoefficient;
          focus.velocityX = 0;
      else
          focus.screenX += focus.width + target.width
          target.x -= target.width * target.collisionCoefficient
          map.x -= target.width * target.collisionCoefficient
          target.velocityX = 0
    else if target.direction is -1
      if(typeof target is Action)
          focus.x -= focus.width * focus.collisionCoefficient
          focus.velocityX = 0
      else
          target.screenX -= focus.width + target.width
          target.x += target.width * target.collisionCoefficient
          map.x += target.width * target.collisionCoefficient
          target.velocityX = 0
    @updateMapXIfEnemy(focus,target,target.direction)

  updateMapXIfEnemy:(focus,target,direction)->
    if typeof focus is Enemy
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
    #console.log "player.hOrigin " + player.hOrigin + "map.x " + map.x + "player.thresholdX " + player.thresholdX + "player.direction " + player.direction
    (player.hOrigin + map.x - (player.thresholdX * player.direction))

  getVerticalMin:(player,map)->
    (player.y + map.y)

  getVerticalMax:(player,map)->
    (player.y + player.height + map.y)

  manageHorizontalBounds:(player,map,destination)->
    player.x = (destination - map.x + ((player.thresholdX - 1) * player.direction))
    player.velocityX = 0
    console.log "dir kids " + player.direction
    console.log "after manage h bounds " + (destination - map.x + (player.thresholdX * player.direction))

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
      enemy.screenY += map.gravity
      enemy.screenX = enemy.screenX + (enemy.velocityX * enemy.direction)
      enemy.velocityX -= map.friction
    else
      enemy.screenX = enemy.mapX - map.x
      enemy.screenY = enemy.mapY - map.y

  adjustAction:(action,map)->
    action.velocityX += action.easeCoefficient
    action.x += (action.direction * action.velocityX)
    #velocity should not always be reduced by .5
    action.y += map.gravity - (action.velocityX * .5)
    action.velocityX -= map.friction

  adjustMapObject:(mapObj,player,map)->
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
    for prop in pGoals
      value = pGoals[prop]
      target = (value - player[prop]) / (nis.nisGoal.duration - nis.frame)
      player.direction = if (target < 0) then -1 else 1
      player[prop] += target
      player.frame++
    mGoals:Object = nis.nisGoal.mapGoals
    for prop in mGoals
      value = mGoals[prop]
      map[prop] += (value - map[prop]) / (nis.nisGoal.duration - nis.frame)
      @adjustMapVerically(map,player)
    nis.frame++
    (nis.frame >= nis.nisGoal.duration)

PhysicsEngine::__defineGetter__ "gravity",->
  @_gravity

PhysicsEngine::__defineSetter__ "gravity",(val)->
  @_gravity = val

PhysicsEngine::__defineGetter__ "friction",->
  @_friction

PhysicsEngine::__defineSetter__ "friction",(val)->
  @_friction = val