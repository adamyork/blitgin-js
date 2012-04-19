var CustomParticleAction = ext(Action,function(){
    this.lifeSpan = 150;
    this.nonObjectProducing = true;
    this.id = "particles";
    this.emitter = new Emitter(CustomParticle,10,1,100);
    this.emitter.x = 20;
    this.emitter.y = 20;
})
