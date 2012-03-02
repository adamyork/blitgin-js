var CustomMapObject = ext(MapObject,function(){
    this.assetClass = "img/milk-jug.png";
    this.cellWidth = 79;
    this.cellHeight = 79;
    this.easeCoefficient = .5;
    this.thresholdX = 18;
    this.thresholdY = 18;
    this.applyGravityAndFriction = false;
    this.health = 1;
    this.damage = 0;
    this.showBounds = true;
    this.showCollisionRect = true;
    this.initialize();
})
