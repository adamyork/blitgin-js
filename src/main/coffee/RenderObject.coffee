class RenderObject
  constructor:(@name)->

  _transparency = false
  _workbench = document.createElement "canvas"
  _x = 0
  _y = 0
  _width = 0
  _height = 0
  _duration = 0
  _frame = 0
  _frameBuffer = 0
  _velocityX = 0
  _velocityY = 0
  _easeCoefficient = 0
  _index = 0
  _lifeSpan = 0
  _cellWidth = 0
  _cellHeight = 0
  _direction = 1
  _assetClass = ""
  _asset = {}
  
  initialize: ->
    if (undefined != @_assetClass) and (0 != @_cellHeight) and (0 != @_cellWidth)
      @_asset = new Image()
      @_asset.src = @_assetClass
    else
      console.log("Set a cellwidth , cellheight , and assetClass before calling initialize.")

  dispose: ->
    _assetClass = undefined
    _asset = undefined

RenderObject::__defineGetter__ "bitmapData", ->
  tmpData = new Image()
  @_workbench.width = @_asset.width
  @_workbench.height = @_asset.height
  ctx = workbench.getContext('2d')
  keyFrame = Math.floor(@_frame) * @_cellWidth
  ctx.drawImage @_asset,keyFrame,0
  tmpData.src = workbench.toDataURL()
  return tmpData
    
RenderObject::__defineGetter__ "x", ->
  return @_x

RenderObject::__defineSetter__ "x", (val) ->
  @_x = val
    
RenderObject::__defineGetter__ "y", ->
  return @_y

RenderObject::__defineSetter__ "y", (val) ->
  @_y = val
  
RenderObject::__defineGetter__ "width", ->
  return @_cellWidth

RenderObject::__defineGetter__ "height", ->
  return @_cellHeight

RenderObject::__defineGetter__ "cellWidth", ->
  return @_cellWidth

RenderObject::__defineSetter__ "cellWidth", (val) ->
  @_cellWidth = value

RenderObject::__defineGetter__ "cellHeight", ->
  return @_cellHeight

RenderObject::__defineSetter__ "cellHeight", (val) ->
  @_cellHeight = value

RenderObject::__defineSetter__ "velocityX", (val) ->
  @_velocityX = value

RenderObject::__defineGetter__ "velocityX", ->
  return @_velocityX

RenderObject::__defineSetter__ "velocityY", (val) ->
  @_velocityY = value

RenderObject::__defineGetter__ "velocityY", ->
  return @_velocityY

RenderObject::__defineSetter__ "direction", (val) ->
  @_direction = value

RenderObject::__defineGetter__ "direction", ->
  return @_direction

RenderObject::__defineSetter__ "easeCoefficient", (val) ->
  @_easeCoefficient = value

RenderObject::__defineGetter__ "easeCoefficient", ->
  return @_easeCoefficient

RenderObject::__defineSetter__ "frame", (val) ->
  @_frame = value

RenderObject::__defineGetter__ "frame", ->
  return @_frame

RenderObject::__defineSetter__ "frameBuffer", (val) ->
  @_frameBuffer = value

RenderObject::__defineGetter__ "frameBuffer", ->
  return @_frameBuffer

RenderObject::__defineSetter__ "duration", (val) ->
  @_duration = value

RenderObject::__defineGetter__ "duration", ->
  return @_duration

RenderObject::__defineGetter__ "rect", ->
  return new Rectangle 0, 0, @width, @height

RenderObject::__defineGetter__ "point", ->
  return new Point @x, @y

RenderObject::__defineSetter__ "tranparency", (val) ->
  @_transparency = value

RenderObject::__defineGetter__ "transparency", ->
  return @_transparency

RenderObject::__defineGetter__ "asset", ->
  return @_asset

RenderObject::__defineGetter__ "assetClass", ->
  return @_assetClass

RenderObject::__defineSetter__ "assetClass", (val) ->
  @_assetClass = value