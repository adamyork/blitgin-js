@echo off 
:initial
IF NOT "%1"=="-onecup" (
GOTO checkOther 
) ELSE (
GOTO brewEach
)

:checkOther
IF NOT "%1"=="-wholepot" (
GOTO alertUser 
) ELSE (
GOTO brewAll
)

:alertUser
ECHO You need to specify either -onecup or -wholepot
EXIT /B



:brewAll
ECHO Brewing...
ECHO All Files into one class.
coffee --join blitgin.js --compile --bare --output src/main/js src/main/coffee/Bootstrap.coffee src/main/js src/main/coffee/Point.coffee src/main/coffee/Rectangle.coffee src/main/coffee/Keyboard.coffee src/main/coffee/Game.coffee src/main/coffee/GameError.coffee src/main/coffee/Group.coffee src/main/coffee/RenderObject.coffee src/main/coffee/Action.coffee src/main/coffee/RenderEngine.coffee src/main/coffee/State.coffee  src/main/coffee/Input.coffee src/main/coffee/Player.coffee src/main/coffee/Map.coffee src/main/coffee/MapObject.coffee src/main/coffee/MapObjectGroup.coffee src/main/coffee/Nis.coffee src/main/coffee/NisCondition.coffee src/main/coffee/NisGoal.coffee src/main/coffee/Particle.coffee src/main/coffee/PhysicsEngine.coffee src/main/coffee/CollisionEngine.coffee src/main/coffee/SoundEngine.coffee src/main/coffee/Emitter.coffee src/main/coffee/Enemy.coffee src/main/coffee/EnemyGroup.coffee

:brewEach
ECHO Brewing...
ECHO All Files into individual classes.
coffee --compile --bare --output src/main/js src/main/coffee