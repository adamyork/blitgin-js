var CustomMap = ext(Map,function(){
	this.backgroundAssetClass = "img/level-one-bg.png";
	this.midgroundAssetClass = "img/level-one-mg.png";
	this.foregroundAssetClass = "img/level-one-fg.png";
	this.collisionAssetClass = "img/level-one-coll.png";
	this.colorConstant = "#000000"
	this.friction = 1;
	this.gravity = 9;
	this.enemies = [];
	this.mapObjects = [];
	this.paralaxing = true;
	this.platform = false;
	this.showCollisionMap = true;
	this.sound = {};
	this.nis = [];
	this.initialize();
});



