var game;
var bs;
var startButton;

function loadDependenciesFull() {
    //TODO allow for dependency loader to be defined by implementer
    startButton = document.getElementById("startButton");
    startButton.disabled = true;
    $LAB.setGlobalDefaults({AlwaysPreserveOrder:true,Debug:true});
    $LAB.script("../src/main/js/Bootstrap.js").wait(function(){
        bs = new Bootstrap("bs");
        bs.start(loadCustomClasses,"../src/main/js/",bs.FULL);
    });
}

function loadDependenciesDebug() {
    startButton = document.getElementById("startButton");
    startButton.disabled = true;
    $LAB.setGlobalDefaults({AlwaysPreserveOrder:true,Debug:true});
    $LAB.script("../src/main/js/blitgin.js").wait(function(){
        bs = new Bootstrap("bs");
        bs.start(loadCustomClasses);
    });
}

function loadDependenciesMin() {
    startButton = document.getElementById("startButton");
    startButton.disabled = true;
    $LAB.setGlobalDefaults({AlwaysPreserveOrder:true,Debug:true});
    $LAB.script("../src/main/js/min-blitgin.js").wait(function(){
        bs = new Bootstrap("bs");
        bs.start(loadCustomClasses);
    });
}


function loadCustomClasses() {
    $LAB
    .script("js/CustomPlayer.js").wait()
    .script("js/CustomMap.js").wait(function(){
    	createGame();
    });
}

function createGame() {
    game = new Game();
    game.maps = [CustomMap];
    game.players = [CustomPlayer];
    game.activeMap = 0;
    game.activePlayer = 0;
    game.leftKeys = [game.keyboard.LEFT];
    game.rightKeys = [game.keyboard.RIGHT];
    game.jumpKeys = [game.keyboard.SPACE];
    game.customKeys = [76,66,81];
    game.container = document.getElementById("container");
    game.useMultipleCanvas = false;
    game.frameWait = 1;
    game.preinitialize(this,1024,432);
    game.prefetch([]);
    game.subscribe(this);
    game.server = {address:'ws://echo.websocket.org',sendEvery:100,msgTransform:this.msgTransform};
}

function msgTransform(event,map,player,actions) {
    //Transform the gamestate into something your server cares about.
    return data = {
        event:event,
        map:{
            x : map.x,
            y : map.y,
            enemies : map.activeEnemies.length
        },
        player:{
            x : player.x,
            y : player.y
        },
    }
}

function notify(args) {
    if(args == Game.prototype.Ready) {
        startButton.disabled = false;
    }
}

function unsubscribeMain() {
    game.unsubscribe(this);
}

function startGame() {
    game.start();
}