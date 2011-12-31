var game;
var bs;
function initGame() {
	$LAB.script("src/main/js/Bootstrap.js").wait(function(){
		bs = new Bootstrap("bs");
		bs.start(loadClasses,"src/main/js/");
	});
}

function loadClasses() {
	$LAB
	.script("src/custom/CustomPlayer.js")
	.script("src/custom/CustomMap.js").wait(function(){
		createGame();
	});
}

function createGame() {
	game = new Game();
	game.maps = [CustomMap];
	game.players = [CustomPlayer];
	game.activeMap = 0;
	game.activePlayer = 0;
	game.leftKeys = [ Keyboard.LEFT ];
	// game.rightKeys = [ Keyboard.RIGHT ];
	// game.jumpKeys = [ Keyboard.SPACE ];
	// game.customKeys = [ 76, 66 ];
	game.preinitialize(this, 800, 600);
	game.subscribe(this);
}
