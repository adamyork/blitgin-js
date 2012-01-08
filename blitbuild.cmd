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
coffee --join blitgin.js --compile --bare --output src/main/js src/main/coffee

:brewEach
ECHO Brewing...
ECHO All Files into individual classes.
coffee --compile --bare --output src/main/js src/main/coffee