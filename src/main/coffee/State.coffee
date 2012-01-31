class State
  constructor:(@duration,@row,@persistent,@id,@frameBuffer)->
    
  _persistent = true
  _duration = 0
  _row = 0
  _frameBuffer = 0
  _id = ""

State::name = "State"

State::__defineGetter__ "duration",->
  @_duration

State::__defineSetter__ "duration",(val)->
  @_duration = val

State::__defineGetter__ "row",->
  @_row

State::__defineSetter__ "row",(val)->
  @_row = val

State::__defineGetter__ "persistent",->
  @_persistent

State::__defineSetter__ "persistent",(val)->
  @_persistent = val

State::__defineGetter__ "id",->
  @_id

State::__defineSetter__ "id",(val)->
  @_id = val

State::__defineGetter__ "frameBuffer",->
  @_frameBuffer

State::__defineSetter__ "frameBuffer",(val)->
  if val > .9
    @_frameBuffer = .9
    console.log "A frame buffer greater .9 will result in the frame always being 0."
    return
  @_frameBuffer = val