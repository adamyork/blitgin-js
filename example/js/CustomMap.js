var CustomMap = ext(Map,function(){
	this.foregroundAssetClass = "img/level-one-bg.png";
	this.collisionAssetClass = "img/level-one-coll.png";
	this.friction = .5;
	this.gravity = 13;
	this.enemies = [];
	this.mapObjects = [];
	this.paralaxing = false;
	this.platform = false;
	this.sound = {};
	this.nis = [];
	this.initialize();
});



