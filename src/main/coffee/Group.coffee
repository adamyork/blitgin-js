class Group
  constructor:(@name)->
  
  _type = ""
  _positions = []
  _independence = 0  
  
Group::name = "Group"

Group::__defineGetter__ "type", ->
  @_type

Group::__defineSetter__ "type", (val) ->
  @_type = val
  
Group::__defineGetter__ "positions", ->
  @_positions

Group::__defineSetter__ "positions", (val) ->
  @_positions = val
  
Group::__defineGetter__ "independence", ->
  @_independence

Group::__defineSetter__ "independence", (val) ->
  @_independence = val
