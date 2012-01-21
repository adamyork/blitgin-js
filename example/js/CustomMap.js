var CustomMap = ext(Map,function(){
	this.foregroundAssetClass = "img/level-one-fg.png";
	this.collisionAssetClass = "img/level-one-coll.png";
	this.colorConstant = "#000000"
	this.friction = .5;
	this.gravity = 20;
	this.enemies = [];
	this.mapObjects = [];
	this.paralaxing = false;
	this.platform = false;
	this.showCollisionMap = true;
	this.sound = {};
	this.nis = [];
	this.initialize();
});



