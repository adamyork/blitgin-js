class GameError
  constructor:(@name)->
    
GameError::warn = (msg)->
  console.log "blitgin-js :: WARNING :: " + msg
    
GameError::name = "GameError"