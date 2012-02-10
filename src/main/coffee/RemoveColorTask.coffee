@onmessage =(event)->
  imageData = event.data.imageData
  parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(event.data.colorConstant)
  rv = parseInt parsed[1],16
  gv = parseInt parsed[2],16
  bv = parseInt parsed[3],16
  val = rv + gv + bv
  t = event.data.rgbTolerance
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
  @postMessage imageData  
