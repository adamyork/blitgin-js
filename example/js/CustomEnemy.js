var CustomEnemy = ext(Enemy,function(){	
	this.name = "CustomEnemy"
	this.colorConstant = "#000000"
	this.maxDistance = 20;
    this.distanceFromOrigin = 0;
	this.applyGravityAndFriction = true;
	this.assetClass = "img/circle-man.png";
	this.cellWidth = 64;
	this.cellHeight = 64;
	this.easeCoefficient = .5;
	this.collisionCoefficient = .5;
	this.thresholdX = 16;
	this.thresholdY = 16;
	this.health = 100;
	this.damage = 10;
	this.showBounds = true;
	this.showCollisionRect = false;
	this.screenX = 0;
	this.screenY = 0;
	this.initialize();
})

CustomEnemy.prototype.behavior = function(args) {
	this.screenX += this.direction * 1;
	this.distanceFromOrigin += this.direction * 1;
	this.velocityX += this.easeCoefficient;
	if(this.distanceFromOrigin >= this.maxDistance || this.distanceFromOrigin <= -(this.maxDistance)) {
	    this.state = (this.state.id == this.moveRight.id) ? this.moveLeft : this.moveRight;	    
	    this.velocityX = 0;
	    this.direction = this.direction * -1;
	}
}