@echo off
SET argz=%2
SET options=%3
CALL blitbuild %1
IF "%argz%"=="-o" (
GOTO checkOptions
) ELSE (
GOTO complete
)

:checkOptions
if "%options%"=="min" (
CALL min
GOTO cleanUP
)

:cleanUP
IF EXIST src\main\js\blitgin.js (
ECHO Cleaning up...
DEL src\main\js\blitgin.js
GOTO complete
)

:complete
ECHO Complete.
EXIT /B