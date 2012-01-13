class RenderObject
  constructor:(@name)->

  _transparency = false
  _workbench = {}
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
      _asset = new Image()
      _asset.src = @_assetClass
      @workbench = document.createElement "canvas"
    else
      console.log("Set a cellwidth , cellheight , and assetClass before calling initialize.")

  dispose: ->
    _assetClass = undefined
    _asset = undefined

RenderObject::__defineGetter__ "bitmapData", ->
  tmpData = new Image()
  @workbench.width = @_asset.width
  @workbench.height = @_asset.height
  ctx = workbench.getContext('2d')
  keyFrame = Math.floor(@_frame) * @_cellWidth
  ctx.drawImage @_asset,keyFrame,0
  tmpData.src = workbench.toDataURL()
  return tmpData
    
RenderObject::__defineGetter__ "x", ->
  @_x

RenderObject::__defineSetter__ "x", (val) ->
  @_x = val
    
RenderObject::__defineGetter__ "y", ->
  @_y

RenderObject::__defineSetter__ "y", (val) ->
  @_y = val
  
RenderObject::__defineGetter__ "width", ->
  @_cellWidth

RenderObject::__defineGetter__ "height", ->
  @_cellHeight

RenderObject::__defineGetter__ "cellWidth", ->
  @_cellWidth

RenderObject::__defineSetter__ "cellWidth", (val) ->
  @_cellWidth = val

RenderObject::__defineGetter__ "cellHeight", ->
  @_cellHeight

RenderObject::__defineSetter__ "cellHeight", (val) ->
  @_cellHeight = val

RenderObject::__defineSetter__ "velocityX", (val) ->
  @_velocityX = val

RenderObject::__defineGetter__ "velocityX", ->
  @_velocityX

RenderObject::__defineSetter__ "velocityY", (val) ->
  @_velocityY = val

RenderObject::__defineGetter__ "velocityY", ->
  @_velocityY

RenderObject::__defineSetter__ "direction", (val) ->
  @_direction = val

RenderObject::__defineGetter__ "direction", ->
  @_direction

RenderObject::__defineSetter__ "easeCoefficient", (val) ->
  @_easeCoefficient = val

RenderObject::__defineGetter__ "easeCoefficient", ->
  @_easeCoefficient

RenderObject::__defineSetter__ "frame", (val) ->
  @_frame = val

RenderObject::__defineGetter__ "frame", ->
  @_frame

RenderObject::__defineSetter__ "frameBuffer", (val) ->
  @_frameBuffer = val

RenderObject::__defineGetter__ "frameBuffer", ->
  @_frameBuffer

RenderObject::__defineSetter__ "duration", (val) ->
  @_duration = val

RenderObject::__defineGetter__ "duration", ->
  @_duration

RenderObject::__defineGetter__ "rect", ->
  new Rectangle 0, 0, @width, @height

RenderObject::__defineGetter__ "point", ->
  new Point @x, @y

RenderObject::__defineSetter__ "tranparency", (val) ->
  @_transparency = val

RenderObject::__defineGetter__ "transparency", ->
  @_transparency

RenderObject::__defineGetter__ "asset", ->
  @_asset

RenderObject::__defineGetter__ "assetClass", ->
  @_assetClass

RenderObject::__defineSetter__ "assetClass", (val) ->
  @_assetClass = val

RenderObject::__defineGetter__ "workbench", ->
  @_workbench

RenderObject::__defineSetter__ "workbench", (val) ->
  @_workbench = val