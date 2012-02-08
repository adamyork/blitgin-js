var CustomPlayer = ext(Player,function(){
	this.assetClass = "img/bot.png";
	//this.transparency = true;
	this.colorConstant = "#000000"
	this.cellWidth = 64;
	this.cellHeight = 128;
	this.easeCoefficient = 2;
	this.collisionCoefficient = .5;
	this.thresholdX = 12;
	this.thresholdY = 64;
	this.maxVelocityY = 52;
	this.health = 100;
	this.damage = 20;
	this.showBounds = true;
	this.rgbTolerance = {r:0,g:100,b:0}
	//this.showCollisionRect = true
	//this.frameBuffer = .5;
	//showCollisionRect = true;
	//setCustomActionForKey(76, Shoot);
	//setCustomActionForKey(66, Buff);
	this.initialize();
})
