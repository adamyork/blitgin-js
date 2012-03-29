var CustomAction = ext(Action,function(){
    this.transparency = true;
    this.assetClass = "img/bullet.png";
    this.cellWidth = 126;
    this.cellHeight = 10;
    this.lifeSpan = 20;
    this.damage = 10;
    this.health = 1;
    this.x = 0;
    this.y = 70;
    this.maxVelocityX = 26;
    this.velocityX = 20;
    this.easeCoefficient = 1;
    this.stateRight = new State(10, 4, false, "shootRight",0);
    this.stateLeft = new State(10, 5, false, "shootLeft",0);
    this.id = "shoot";
    this.initialize();
})
