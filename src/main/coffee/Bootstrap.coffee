class Bootstrap  
  constructor:(@name)->

  _classes = ["Point","Rectangle","Keyboard","Game","GameError","Group","RenderObject",
    "RenderEngine","State","PhysicsEngine","CollisionEngine","SoundEngine","Input",
    "Player","Map","MapObject","MapObjectGroup","Nis","NisCondition","NisGoal",
    "PhysicsEngine","CollisionEngine","SoundEngine"]
  _collection = []
    
  start:(callback,basePath)->
   _collection[_i] = @prepare clazz,basePath for clazz in _classes
   @load callback

  prepare:(clazz,basePath)->
    basePath + clazz + ".js"
  
  load:(callback)->
    $LAB.script(_collection).wait(callback);
