class Group
  constructor:(@name)->
  
  _type = ""
  _positions = []
  _independence = 0

Game::__defineGetter__ "type", ->
  @_type

Game::__defineSetter__ "type", (val) ->
  @_type = val
  
Game::__defineGetter__ "positions", ->
  @_positions

Game::__defineSetter__ "positions", (val) ->
  @_positions = val
  
Game::__defineGetter__ "independence", ->
  @_independence

Game::__defineSetter__ "independence", (val) ->
  @_independence = val
