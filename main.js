var game;
var bs;
function initGame() {
	$LAB.script("src/main/js/Bootstrap.js").wait(function(){
		bs = new Bootstrap("bs");
		bs.start(loadClasses,"src/main/js/");
	});
}

function loadClasses() {
	//load your custom classes here
	createGame();
}

function createGame() {
	game = new Game();
	// game.maps = [ LevelOneMap ];
	// game.players = [ Bot ];
	game.activeMap = 0;
	game.activePlayer = 0;
	// game.leftKeys = [ Keyboard.LEFT ];
	// game.rightKeys = [ Keyboard.RIGHT ];
	// game.jumpKeys = [ Keyboard.SPACE ];
	// game.customKeys = [ 76, 66 ];
	game.preinitialize(this, 800, 600);
	game.subscribe(this);
}
