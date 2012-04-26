var GameError;

GameError = (function() {

  function GameError(name) {
    this.name = name;
  }

  return GameError;

})();

GameError.prototype.warn = function(msg) {
  return console.log("blitgin-js :: WARNING :: " + msg);
};

GameError.prototype.name = "GameError";
