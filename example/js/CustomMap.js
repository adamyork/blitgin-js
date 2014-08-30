var CustomMap = ext(Map, function() {
    this.mapType = Map.prototype.TYPE_SIDESCROLL;
    this.backgroundAssetClass = "img/level-one-bg-multi.png";
    this.midgroundAssetClass = "img/level-one-mg-multi.png";
    this.foregroundAssetClass = "img/level-one-fg-multi.png";
    this.collisionAssetClass = "img/level-one-coll-multi.png";
    this.colorConstant = "#000000"
    this.friction = 1;
    this.gravity = 9;
    this.enemyPos = [new Point(200, 1115)];
    this.mapObjPos = [new Point(700, 1010)];
    this.enemies = [new EnemyGroup(CustomEnemy, this.enemyPos, 100)];
    this.mapObjects = [new MapObjectGroup(CustomMapObject, this.mapObjPos, 40)];
    this.paralaxing = true;
    this.platform = true;
    this.showCollisionMap = true;
    this.sound = "audio/map-audio.ogg";
    this.nis = [];//[new CustomNis()];
    this.initialize();
});
