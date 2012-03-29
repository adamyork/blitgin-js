var CustomMap = ext(Map, function() {
    this.backgroundAssetClass = "img/level-one-bg-multi.png";
    this.midgroundAssetClass = "img/level-one-mg-multi.png";
    this.foregroundAssetClass = "img/level-one-fg-multi.png";
    this.collisionAssetClass = "img/level-one-coll-multi.png";
    this.colorConstant = "#000000"
    this.friction = 1;
    this.gravity = 9;
    this.enemyPos = [new Point(300, 1010)];
    this.mapObjPos = [new Point(700, 1010)];
    this.enemies = [new EnemyGroup(CustomEnemy, this.enemyPos, 50)];
    this.mapObjects = [new MapObjectGroup(CustomMapObject, this.mapObjPos, 40)];
    this.paralaxing = true;
    this.platform = true;
    this.showCollisionMap = true;
    this.sound = {};
    this.nis = [];
    this.initialize();
});
