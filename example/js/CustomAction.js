var CustomAction = ext(Action,function(){
    this.transparency = true;
    this.assetClass = "img/bullet.png";
    this.width = 10;
    this.height = 10;
    this.cellWidth = 10;
    this.cellHeight = 10;
    this.lifeSpan = 20;
    this.damage = 10;
    this.health = 1;
    this.x = 0;
    this.y = 70;
    this.maxVelocityX = 26;
    this.velocityX = 20;
    this.easeCoefficient = 1;
    this.stateRight = new State(10, 4, false, "shootRight", .7);
    this.stateLeft = new State(10, 5, false, "shootLeft", .7);
    this.id = "shoot";
    this.initialize();
})
