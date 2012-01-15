var Action,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Action = (function(_super) {

  __extends(Action, _super);

  function Action() {
    Action.__super__.constructor.apply(this, arguments);
  }

  Action.prototype.contructor = function(name) {
    this.name = name;
  };

  return Action;

})(RenderObject);
