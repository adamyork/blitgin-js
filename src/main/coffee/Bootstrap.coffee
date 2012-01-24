class Bootstrap  
  constructor:(@name)->
  
    ref = this
    ref.getters = {}
    ref.setters = {}
  
    unless Object.__defineGetter__
      Object::__defineGetter__ = (prop, func) ->
        ref.getters[@name] = {}
        ref.getters[@name]["name"] = @name
        ref.getters[@name][prop] = func
        
    unless Object.__defineSetter__
      Object::__defineSetter__ = (prop, func) ->
        ref.setters[@name] = {}
        ref.getters[@name]["name"] = @name
        ref.setters[@name][prop] = func

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
    $LAB.script(_collection).wait(callback)