var CustomComplexAction = ext(Action,function(){
    this.lifeSpan = 100;
    this.nonObjectProducing = true;
    this.stateRight = new State(10, 6, true, "buffRight",0);
    this.stateLeft = new State(10, 7, true, "buffLeft",0);
    this.stateCollisionRight = new State(10, 8, false, "buffCollRight",0);
    this.stateCollisionLeft = new State(10, 9, false, "buffCollLeft",0);
    //composite = new Glow();
    this.id = "buff";
    //emitter = new Emitter(TestParticle, 2, 1, 10, 500);
    this.sound = "audio/action-audio.ogg";
    this.soundLoops = 2;
})
