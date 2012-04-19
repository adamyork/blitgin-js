var CustomPlayer = ext(Player,function(){
    this.assetClass = "img/bot.png";
    //this.transparency = true;
    this.colorConstant = "#000000"
    this.cellWidth = 64;
    this.cellHeight = 128;
    this.easeCoefficient = 2;
    this.collisionCoefficient = .5;
    this.thresholdX = 12;
    this.thresholdY = 12;
    this.maxVelocityY = 52;
    this.health = 100;
    this.damage = 20;
    this.showBounds = true;
    this.rgbTolerance = {r:0,g:100,b:0}
    //this.showCollisionRect = true
    //this.frameBuffer = .5;
    this.setCustomActionForKey(76, CustomAction);
    this.setCustomActionForKey(66, CustomComplexAction);
    this.setCustomActionForKey(81, CustomParticleAction);
    this.initialize();
})
