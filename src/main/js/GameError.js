var GameError;

GameError = (function() {

  function GameError(name) {
    this.name = name;
  }

  GameError.prototype.warnNotUsed = function(clazz, func) {
    return logger.warn("WARNING :: " + func + "  is not used by " + clazz + ". Stack is ");
  };

  return GameError;

})();

GameError.prototype.name = "GameError";
