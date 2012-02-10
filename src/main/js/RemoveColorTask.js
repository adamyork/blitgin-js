
this.onmessage = function(event) {
  var a, b, bv, dataRef, g, gv, imageData, index, parsed, r, rv, t, val, xpos, ypos, _ref, _ref2;
  imageData = event.data.imageData;
  parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(event.data.colorConstant);
  rv = parseInt(parsed[1], 16);
  gv = parseInt(parsed[2], 16);
  bv = parseInt(parsed[3], 16);
  val = rv + gv + bv;
  t = event.data.rgbTolerance;
  for (xpos = 0, _ref = imageData.width - 1; 0 <= _ref ? xpos <= _ref : xpos >= _ref; 0 <= _ref ? xpos++ : xpos--) {
    for (ypos = 0, _ref2 = imageData.height - 1; 0 <= _ref2 ? ypos <= _ref2 : ypos >= _ref2; 0 <= _ref2 ? ypos++ : ypos--) {
      index = 4 * (ypos * imageData.width + xpos);
      dataRef = imageData.data;
      r = dataRef[index];
      g = dataRef[index + 1];
      b = dataRef[index + 2];
      a = dataRef[index + 3];
      if (t !== void 0) {
        if (r <= rv + t.r && g <= gv + t.g && b <= bv + t.b) {
          dataRef[index + 3] = 0;
        }
      } else if ((r + g + b) === val) {
        dataRef[index + 3] = 0;
      }
    }
  }
  return this.postMessage(imageData);
};
