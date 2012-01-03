var Keyboard;

Keyboard = (function() {

  function Keyboard(name) {
    this.name = name;
  }

  return Keyboard;

})();

Keyboard.prototype.KEY_UP = "keyup";

Keyboard.prototype.KEY_DOWN = "keydown";

Keyboard.prototype.LEFT = "left";

Keyboard.prototype.RIGHT = "right";

Keyboard.prototype.SPACE = "space";
