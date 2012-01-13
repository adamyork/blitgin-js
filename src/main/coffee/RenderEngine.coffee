class RenderEngine
  constructor:(@name)->
    
  @_scrn = {}
    
  setScreen:(scrn)->
    @_scrn = scrn
    
  render: (input) ->
    console.log 'render' + this.map.bitmapData
    console.log @_scrn
    ctx = @_scrn.getContext '2d'
    ctx.drawImage this.map.bitmapData,0,0
