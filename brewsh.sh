set +v

alertUser()
{
echo ehllo
}

brewAll()
{
echo nast
}

checkOther()
{
if [ $1 != "-wholepot" ] ; then
	alertUser 
else
	brewAll
fi
}

brewEach()
{
echo Brewing...
echo All Files into individual classes.
coffee --compile --bare --output src/main/js src/main/coffee
}

if [ $1 != "-onecup" ] ; then
	checkOther
else
	brewEach
fi