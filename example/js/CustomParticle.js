var CustomParticle = ext(Particle,function(index){
    this.transparency = true;
    this.index = index;
    this.direction = (this.index % 2 > 0) ? 1 : -1;
    this.assetClass = "img/particle.png";
    this.cellWidth = 16;
    this.cellHeight = 16;
    this.easeCoefficient = .25;
    this.lifeSpan = 100;
    this.startFrame = this.index;
    this.duration = 45;
    this.initialize();
})

CustomParticle.prototype.__defineGetter__("x", function() {
    return this._x;
});

CustomParticle.prototype.__defineSetter__("x", function(val) {
    this._x = val //+ (this.index * this.direction * 20);
});

CustomParticle.prototype.__defineGetter__("y", function() {
    return this._y;
});

CustomParticle.prototype.__defineSetter__("y", function(val) {
    //val -= this.index;
    this._y = val;
});