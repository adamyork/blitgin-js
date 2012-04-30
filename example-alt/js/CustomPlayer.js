var CustomPlayer = ext(Player,function(){
    this.assetClass = "img/space-man.png";
    this.colorConstant = "#000000"
    this.cellWidth = 32;
    this.cellHeight = 32;
    this.easeCoefficient = 2;
    this.collisionCoefficient = .5;
    this.thresholdX = 12;
    this.thresholdY = 12;
    this.maxVelocityX = 30;
    this.maxVelocityY = 52;
    this.health = 100;
    this.damage = 20;
    this.showBounds = false;
    //this.rgbTolerance = {r:0,g:100,b:0}
    //this.showCollisionRect = true
    //this.frameBuffer = .5;
    this.initialize();
})
