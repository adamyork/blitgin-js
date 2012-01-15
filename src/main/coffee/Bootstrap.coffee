class Bootstrap  
  constructor:(@name)->

  _classes = ["Point","Rectangle","Keyboard","Game","GameError","Group","RenderObject",
    "Action","RenderEngine","State","PhysicsEngine","CollisionEngine","SoundEngine","Input",
    "Player","Map","MapObject","MapObjectGroup","Nis","NisCondition","NisGoal","Particle",
    "PhysicsEngine","CollisionEngine","SoundEngine","Emitter","Enemy","EnemyGroup"]
  _collection = []
    
  start:(callback,basePath)->
   _collection[_i] = @prepare clazz,basePath for clazz in _classes
   @load callback

  prepare:(clazz,basePath)->
    basePath + clazz + ".js"
  
  load:(callback)->
    $LAB.script(_collection).wait(callback);
