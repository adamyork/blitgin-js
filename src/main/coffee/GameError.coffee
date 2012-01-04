class GameError
  constructor:(@name)->
    
  warnNotUsed: (clazz,func) ->
    logger.warn("WARNING :: "+func+"  is not used by "+clazz+". Stack is ")