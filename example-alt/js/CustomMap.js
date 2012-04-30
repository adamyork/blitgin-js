var CustomMap = ext(Map, function() {
    this.mapType = Map.TYPE_FREE_MOVE
    this.foregroundAssetClass = "img/level-one-fg-multi.png";
    this.friction = 0;
    this.gravity = 0;
    this.enemyPos = [];
    this.mapObjPos = [];
    this.enemies = [];
    this.mapObjects = [];
    this.paralaxing = true;
    this.platform = true;
    this.showCollisionMap = true;
    this.initialize();
});
