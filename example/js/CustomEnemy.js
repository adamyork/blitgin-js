var CustomEnemy = ext(Enemy, function() {
    this.name = "CustomEnemy"
    this.colorConstant = "#000000"
    this.maxDistance = 200;
    this.applyGravityAndFriction = true;
    this.assetClass = "img/circle-man.png";
    this.cellWidth = 64;
    this.cellHeight = 64;
    this.easeCoefficient = 1;
    this.collisionCoefficient = .5;
    this.thresholdX = 16;
    this.thresholdY = 4;
    this.maxVelocityX = 40;
    this.maxVelocityY = 52;
    this.health = 100;
    this.damage = 10;
    this.showBounds = true;
    this.showCollisionRect = false;
    this.initialize();
})

CustomEnemy.prototype.__defineGetter__("screenX", function() {
  return this._screenX;
});

CustomEnemy.prototype.__defineSetter__("screenX", function(val) {
    if(this.originalX == undefined) {
        this._screenX = val;
        this.velocityX = 0;
        this.velocityY = 0;
        this.originalX = val; 
        this.distanceTraveled = 0;
        return
    }
    this._screenX = val;
});

CustomEnemy.prototype.behavior = function(suggestedX,suggestedY,suggestedVelocityX,suggestedVelocityY) {
    this.distanceTraveled = Math.abs(suggestedX-this.originalX);
    if(this.distanceTraveled >= this.maxDistance) {
        this.velocityX = 0;
        this.direction = this.direction * -1;
        this.originalX = this.screenX;
    } else {
        this.screenX = Math.ceil(suggestedX);
    }

    this.screenY = suggestedY;
    this.velocityX = suggestedVelocityX;
    this.velocityY = suggestedVelocityY;
}