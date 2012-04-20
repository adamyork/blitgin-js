var CustomNis = ext(Nis,function(){
    _conditions = new NisCondition();
    _goal = new NisGoal();
    _conditions.mapCondition = {x:400};
    _conditions.playerCondition = {};
    _conditions.enemies = [];
    _goal.duration = 111;
    _goal.mapGoals = { x: 0 };
    _goal.playerGoals = {x:200,y:50};
    _goal.useCollision = false;
    this.nisCondition = _conditions;
    this.nisGoal = _goal;
    this.initialize();
})