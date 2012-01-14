var CustomPlayer = ext(Player,function(){
	this.assetClass = "img/bot.png";
	this.cellWidth = 64;
	this.cellHeight = 128;
	this.easeCoefficient = .75;
	this.collisionCoefficient = .5;
	this.thresholdX = 12;
	this.thresholdY = 35;
	this.health = 100;
	this.damage = 20;
	this.showBounds = true;
	//showCollisionRect = true;
	//setCustomActionForKey(76, Shoot);
	//setCustomActionForKey(66, Buff);
	this.initialize();
})
