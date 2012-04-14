@echo off
ECHO Minifying...
IF NOT EXIST src\main\js\blitgin.js (
ECHO Please run brew -wholepot first.
EXIT /B
)
jsmin <src\main\js\blitgin.js>src\main\js\min-blitgin.js