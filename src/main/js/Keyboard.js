var Keyboard;

Keyboard = (function() {

  function Keyboard(name) {
    this.name = name;
  }

  return Keyboard;

})();

Keyboard.prototype.name = "Keyboard";

Keyboard.prototype.KEY_UP = "keyup";

Keyboard.prototype.KEY_DOWN = "keydown";

Keyboard.prototype.LEFT = 65;

Keyboard.prototype.RIGHT = 68;

Keyboard.prototype.SPACE = 32;
