@echo off
::initial
::	if "%1"=="-onecup" goto brewAll
::	if "%1"=="-wholepot" goto brewEach
	
::brewAll
::"C:/Program Files (x86)/nodejs/node.exe" "C:/Program Files (x86)/CoffeeScript/bin/coffee" --join blitgin.js --compile --bare --output src/main/js src/main/coffee
::brewEach
"C:/Program Files (x86)/nodejs/node.exe" "C:/Program Files (x86)/CoffeeScript/bin/coffee" --compile --bare --output src/main/js src/main/coffee