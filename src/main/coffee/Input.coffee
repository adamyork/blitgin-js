class Input
  constructor:(@name)->
    _waits = {}
    
  _direction = 0
  _vDirection = 0
  _jump = 0
  _jumpLock = false
  _customKey = 0
  _waits = {}
  _disabled = false
  
  hasWaitFor:(key)->
    val = key.toString()
    return _waits[val]

  addWaitForAction:(key,duration)->
    val = key.toString()
    _waits[val] = duration

  manageWaits:->
    for wait of _waits
      _waits[wait]--
      if _waits[wait] <= 0
        delete _waits[wait]

Input::name = "Input"

Input::__defineGetter__ "direction",->
  @_direction

Input::__defineSetter__ "direction",(val)->
  @_direction = val

Input::__defineGetter__ "vDirection",->
  @_vDirection

Input::__defineSetter__ "vDirection",(val)->
  @_vDirection = val

Input::__defineGetter__ "jump",->
  @_jump

Input::__defineSetter__ "jump",(val)->
  @_jump = val

Input::__defineGetter__ "jumpLock",->
  @_jumpLock

Input::__defineSetter__ "jumpLock",(val)->
  @_jumpLock = val

Input::__defineGetter__ "customKey",->
  @_customKey

Input::__defineSetter__ "customKey",(val)->
  @_customKey = val

Input::__defineGetter__ "disabled",->
  @_disabled

Input::__defineSetter__ "disabled",(val)->
  @direction = 0
  @jumpLock = false
  @jump = 0
  @customKey = 0
  @_disabled = val