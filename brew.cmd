@echo off
SET argz=%2
SET options=%3
SET "aa=                                 _..-------++._"
SET "ab=                             ^_^.^-^'^/ ^|      ^_^|^|  ^\^'^-^-^.^_"
SET "ac=                       ^_^_^.^-^-^'^`^.^_^/^_^\^j^_^_^_^_^_^/^_^|^|^_^_^_^\^    ^`^-^-^-^-^."
SET "ad=                  ^_^.^-^-^'^_^_^_^_^_    ^|          ^\     ^_^_^_^_^_    ^/"
SET "ae=               ^_^j    ^/^,^-^-^-^.^\   ^|        ^=^o ^|   ^/^,^-^-^-^.^\   ^|^_"
SET "af=             ^[^_^_^]^=^=^/^/ ^.^-^. ^\^\^=^=^`^=^=^=^=^=^=^=^=^=^=^=^/^=^=^/^/ ^.^-^. ^\^\^=^[^_^_^]"
SET "ag=                 ^`^-^.^_^|^\ ^`^-^' ^/^|^_^_^_^\^_^_^_^_^_^_^_^_^_^/^_^_^_^|^\ ^`^-^' ^/^|^_^.^' " 
SET "ah=                      ^`^-^-^-^'                     ^`^-^-^-^'"

ECHO %aa%
ECHO %ab%
ECHO %ac%
ECHO %ad%
ECHO %ae%
ECHO %af%
ECHO %ag%
ECHO %ah%

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