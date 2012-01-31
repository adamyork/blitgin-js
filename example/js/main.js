var game;
var bs;

function ext(superClass,subClass) {
	function tmp() {}
	tmp.prototype = superClass.prototype;
	subClass.prototype = new tmp();
	subClass.prototype.constructor = subClass;
	return subClass;
}

function initGame() {
	$LAB.setGlobalDefaults({AlwaysPreserveOrder:true,Debug:true});
	$LAB.script("../src/main/js/Bootstrap.js").wait(function(){
		bs = new Bootstrap("bs");
		bs.start(loadClasses,"../src/main/js/");
	});
}

function loadClasses() {
	$LAB
	.script("js/CustomPlayer.js")
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
	game.customKeys = [ 76, 66 ];
	game.preinitialize(this,1024,432);
	game.subscribe(this);
}

function notify(args) {
	//console.log("notified " + args)
}

function unsubscribeMain() {
	game.unsubscribe(this);
}

function startGame() {
	game.start();
}
