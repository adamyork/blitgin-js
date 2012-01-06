function CustomMap() {	
	this.backgroundAssetClass = "img/level-one-bg.png";
	this.friction = .5;
	this.gravity = 13;
	this.enemies = [];
	this.mapObjects = [];
	this.paralaxing = false;
	this.platform = false;
	this.sound = {};
	this.nis = [];
	this.initialize();
}
function tmp() {}
tmp.prototype = RenderObject.prototype;
CustomMap.prototype = new tmp();
CustomMap.prototype.constructor = CustomMap;


