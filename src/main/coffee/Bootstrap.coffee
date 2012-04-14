class Bootstrap  
  constructor:(@name)->
    @checkExt()
    @checkBind()
    @checkAccessors()
    
  _classes = ["Point","Rectangle","Keyboard","Game","GameError","Group","RenderObject",
    "Action","RenderEngine","State","PhysicsEngine","CollisionEngine","SoundEngine","Input",
    "Player","Map","MapObject","MapObjectGroup","Nis","NisCondition","NisGoal","Particle","Emitter","Enemy","EnemyGroup"]
  _collection = []
    
  _ref = this
  _ref.getters = {}
  _ref.setters = {}
  
  hasCustomAccessors = false
  callBack = {}
  
  Bootstrap::FULL = "full"
  
  checkExt:->
    if window.ext is undefined
      window.ext=(superClass,subClass)->
        tmp=()->
        tmp:: = superClass::
        subClass:: = new tmp()
        subClass::constructor = subClass
        subClass
  
  checkBind:->
    unless Function.bind
      Function::bind = (bind) ->
        self = this
        ->
          args = Array::slice.call(arguments)
          self.apply bind or null,args
  
  checkAccessors:->
    unless Object.__defineGetter__
      hasCustomAccessors = true
      Object::__defineGetter__ =(prop,func)->
        if not _ref.getters[@name]
          _ref.getters[@name] = {}
        _ref.getters[@name]["name"] = @name
        _ref.getters[@name][prop] = func
        
    unless Object.__defineSetter__
      Object::__defineSetter__ =(prop,func)->
        if not _ref.setters[@name]
          _ref.setters[@name] = {}
        _ref.setters[@name]["name"] = @name
        _ref.setters[@name][prop] = func

  start:(callback,basePath,mode)->
    if mode is Bootstrap::FULL
      _collection[_i] = @prepare clazz,basePath for clazz in _classes
    @load callback

  prepare:(clazz,basePath)->
    basePath + clazz + ".js"
  
  load:(callback)->
    callBack = callback
    if _collection.length is 0
      Bootstrap::checkForWeave()
      return
    $LAB.script(_collection).wait(->
      Bootstrap::checkForWeave()
    )

  checkForWeave:->
    if hasCustomAccessors
      for clazz in _classes
        tmp = {}
        tmp.name = clazz
        Bootstrap::weave tmp
      callBack()
    else
      callBack()
        
  weave:(target)->
    for obj of _ref.getters
      if obj isnt "__defineGetter__" and obj isnt "__defineSetter__" and _ref.getters[obj].name is target.name
        for prop of _ref.getters[obj]
          if prop isnt "__defineGetter__" and prop isnt "__defineSetter__" and prop isnt "name"
            if _ref.setters[target.name][prop]
              createAccessors target, prop,_ref.getters[target.name][prop],_ref.setters[target.name][prop]
            else
              createAccessors target,prop,_ref.getters[target.name][prop],(val)->
    for obj of _ref.setters
      if obj isnt "__defineGetter__" and obj isnt "__defineSetter__" and _ref.setters[obj].name is target.name
        for prop of _ref.setters[obj]
          if prop isnt "__defineGetter__" and prop isnt "__defineSetter__" and prop isnt "name"
            if _ref.getters[target.name][prop]
              createAccessors target,prop,_ref.getters[target.name][prop],_ref.setters[target.name][prop]
            else
              createAccessors target,prop,(->),_ref.setters[target.name][prop]

  createAccessors = (obj,prop,getter,setter)->
    tar = eval(obj.name)
    Object.defineProperty tar.prototype,prop,{configurable:true,get:getter,set:setter}