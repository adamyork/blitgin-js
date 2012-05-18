class RenderObject
  constructor:(@name)->
    @x = 0
    @y = 0
    
  _transparency = false
  _showBounds = false
  _colorConstant = "#000000"
  _rgbTolerance = {}
  _workbench = {}
  _x = 0
  _y = 0
  _originalX = 0
  _originalY = 0
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
  _assetData = {}
  _ctx = {}
  _callback = undefined
  _collisionPixels = []
  _objectKeyframeLength = 0
  
  initialize:(@_callback)->
    if (undefined != @assetClass) and (0 != @cellHeight) and (0 != @cellWidth)
      @workbench = document.createElement "canvas"
      @asset = new Image()
      @assetData = new Image()
      @asset.onload = @assetLoadComplete.bind this
      @asset.src = @assetClass
    else
      GameError.warn "Set a cellwidth , cellheight , and assetClass before calling initialize."
      
  assetLoadComplete:->
    @asset.onload = undefined
    @ctx = @workbench.getContext '2d'
    @objectKeyframeLength = 0
    if @transparency or (not @transparency and @showBounds)
      @assetData = @asset
    else
      @removeColorConstantAndCache @asset,@assetData
    if @x is undefined
      @x = 0
    if @y is undefined
      @y = 0
    if @_callback
      @_callback()

  removeColorConstantAndCache:(asset,targetData,cachePixels)->
    if @colorConstant is undefined
      GameError.warn "You need to set a hex value for colorConstant , or set tranparency true if no color is to be sampled out."
    @workbench.width = asset.width
    @workbench.height = asset.height
    @ctx.drawImage asset,0,0
    imageData = @ctx.getImageData 0, 0, @workbench.width, @workbench.height
    try 
      worker = new Worker '../src/main/js/RemoveColorTask.js'
    catch error
      worker = {}
      worker.postMessage = @removeSampleColor
      worker.terminate = ()->
    ref = @ 
    worker.onmessage=(e)->
      if cachePixels
        ref.collisionPixels = e.data
      ref.ctx.clearRect 0,0,ref.workbench.width,ref.workbench.height
      ref.ctx.putImageData e.data,0,0
      targetData.src = null
      targetData.src = ref.workbench.toDataURL()
      ref.notifyReady()
      worker.terminate()
      worker = null
    worker.onerror=(e)->
      GameError.warn "Error in worker"
    worker.postMessage {"imageData":imageData,"colorConstant":@colorConstant,"rgbTolerance":@rgbTolerance}
    
  removeSampleColor:(event)->
    imageData = event.imageData
    parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(event.colorConstant)
    rv = parseInt parsed[1],16
    gv = parseInt parsed[2],16
    bv = parseInt parsed[3],16
    val = rv + gv + bv
    t = event.rgbTolerance
    for xpos in [0 .. imageData.width-1]
      for ypos in [0 .. imageData.height-1]
        index = 4 * (ypos * imageData.width + xpos)
        dataRef = imageData.data
        r = dataRef[index]
        g = dataRef[index + 1]
        b = dataRef[index + 2]
        a = dataRef[index + 3]
        if t isnt undefined
          if r <= rv + t.r and g <= gv + t.g and b <= bv + t.b
            dataRef[index + 3] = 0
        else if (r+g+b) is val
          dataRef[index + 3] = 0
    @onmessage {data:imageData}  

  
  notifyReady:->
    Game::instance.checkForReady()
              
  dispose:->
    _assetClass = undefined
    _asset = undefined

RenderObject::name = "RenderObject"

RenderObject::__defineGetter__ "bitmapData",->
  keyFrame = @objectKeyframeLength * @cellWidth
  if @ctx is undefined
    return {player:{notready:true},rect:new Rectangle keyFrame,0,@cellWidth,@cellHeight}
  #TODO its possible that a composites asset is not a single row
  {player:@assetData,rect:new Rectangle keyFrame,0,@cellWidth,@cellHeight}
    
RenderObject::__defineGetter__ "x",->
  @_x

RenderObject::__defineSetter__ "x",(val)->
  @_x = val
    
RenderObject::__defineGetter__ "y",->
  @_y

RenderObject::__defineSetter__ "y",(val)->
  @_y = val
  
RenderObject::__defineGetter__ "originalX",->
  @_originalX

RenderObject::__defineSetter__ "originalX",(val)->
  @_originalX = val
    
RenderObject::__defineGetter__ "originalY",->
  @_originalY

RenderObject::__defineSetter__ "originalY",(val)->
  @_originalY = val
  
RenderObject::__defineGetter__ "width",->
  @cellWidth

RenderObject::__defineGetter__ "height",->
  @cellHeight

RenderObject::__defineGetter__ "cellWidth",->
  @_cellWidth

RenderObject::__defineSetter__ "cellWidth",(val)->
  @_cellWidth = val

RenderObject::__defineGetter__ "cellHeight",->
  @_cellHeight

RenderObject::__defineSetter__ "cellHeight",(val)->
  @_cellHeight = val

RenderObject::__defineSetter__ "velocityX",(val)->
  @_velocityX = val

RenderObject::__defineGetter__ "velocityX",->
  @_velocityX

RenderObject::__defineSetter__ "velocityY",(val)->
  @_velocityY = val

RenderObject::__defineGetter__ "velocityY",->
  @_velocityY

RenderObject::__defineSetter__ "direction",(val)->
  @_direction = val

RenderObject::__defineGetter__ "direction",->
  @_direction

RenderObject::__defineSetter__ "easeCoefficient",(val)->
  @_easeCoefficient = val

RenderObject::__defineGetter__ "easeCoefficient",->
  @_easeCoefficient

RenderObject::__defineSetter__ "frame",(val)->
  @_frame = val

RenderObject::__defineGetter__ "frame",->
  @_frame

RenderObject::__defineSetter__ "frameBuffer",(val)->
  @_frameBuffer = val

RenderObject::__defineGetter__ "frameBuffer",->
  @_frameBuffer

RenderObject::__defineSetter__ "duration",(val)->
  @_duration = val

RenderObject::__defineGetter__ "duration",->
  @_duration

RenderObject::__defineGetter__ "rect",->
  new Rectangle 0, 0, @width, @height

RenderObject::__defineGetter__ "point",->
  new Point @_x, @_y

RenderObject::__defineSetter__ "transparency",(val)->
  @_transparency = val

RenderObject::__defineGetter__ "transparency",->
  @_transparency

RenderObject::__defineSetter__ "colorConstant",(val)->
  @_colorConstant = val

RenderObject::__defineGetter__ "colorConstant",->
  @_colorConstant

RenderObject::__defineSetter__ "rgbTolerance",(val)->
  @_rgbTolerance = val

RenderObject::__defineGetter__ "rgbTolerance",->
  @_rgbTolerance
  
RenderObject::__defineGetter__ "showBounds",->
  @_showBounds

RenderObject::__defineSetter__ "showBounds",(val)->
  @_showBounds = val

RenderObject::__defineGetter__ "asset",->
  @_asset

RenderObject::__defineSetter__ "asset",(val)->
  @_asset = val

RenderObject::__defineGetter__ "assetClass",->
  @_assetClass

RenderObject::__defineSetter__ "assetClass",(val)->
  @_assetClass = val

RenderObject::__defineGetter__ "assetData",->
  @_assetData

RenderObject::__defineSetter__ "assetData",(val)->
  @_assetData = val

RenderObject::__defineGetter__ "workbench",->
  @_workbench

RenderObject::__defineSetter__ "workbench",(val)->
  @_workbench = val

RenderObject::__defineGetter__ "ctx",->
  if @_ctx is undefined
    undefined
  else
    @_ctx

RenderObject::__defineSetter__ "ctx",(val)->
  @_ctx = val
  
RenderObject::__defineGetter__ "collisionPixels",->
  @_collisionPixels

RenderObject::__defineSetter__ "collisionPixels",(val)->
  @_collisionPixels = val

RenderObject::__defineGetter__ "objectKeyframeLength",->
  @_objectKeyframeLength

RenderObject::__defineSetter__ "objectKeyframeLength",(val)->
  @_objectKeyframeLength = val