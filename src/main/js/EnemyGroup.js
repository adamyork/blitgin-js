var EnemyGroup,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

EnemyGroup = (function(_super) {

  __extends(EnemyGroup, _super);

  function EnemyGroup(type, positions, independence) {
    this.type = type;
    this.positions = positions;
    this.independence = independence;
  }

  return EnemyGroup;

})(Group);

EnemyGroup.prototype.name = "EnemyGroup";
