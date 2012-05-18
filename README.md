
                                 _..-------++._
                             _.-'/ |      _||  \"--._
                       __.--'`._/_\j_____/_||___\    `----.
                  _.--'_____    |          \     _____    /
                _j    /,---.\   |        =o |   /,---.\   |_
               [__]==// .-. \\==`===========/==// .-. \\=[__]
                 `-._|\ `-' /|___\_________/___|\ `-' /|_.'  
                       `---'                     `---'
					       __, _,  _ ___  _, _ _, _ 
						   |_) |   |  |  / _ | |\ | 
						   |_) | , |  |  \ / | | \| js.

## To use... [Note : blitgin is under development]
### Create an instance of Bootstrap , then ...
- Include blitgin-js classes individually
**or**
- Include blitgin-js
**or**
- Include blitgin-js-min

## To edit...
- Install node -> npm -> coffeescript
- git clone https://github.com/radAdam/blitgin-js.git
- Modify coffeescript files.
- Compile : brew.cmd or brewsh.sh brew -[onecup|wholepot] -[o[min]]

## Browser Compatibility...
- Tested in 
 - FF 11
 - Chrome 18 **For Chrome to render properly make use of '--disable-accelerated-2d-canvas'. Until the peformance issue is fixed**
 - IE 9 **Webworkers are not available in IE. Sampling out of colors is very slow.**
 - Opera 11+ **Barely works. FPS is atrocious**
 - Safari **Doesnt work yet.**

## Todo...
- It's possible that a composites asset is not a single row
- Particles and Composities need to support sampling of color
- Particles and Composities need to support multiple row sprite sheets
- Nis logic needs to be expanded upon.
- Nis logic should check more than just number of enemies
- Allow for dependency loader to be defined by implementer
- Update shell script for build process
- Allow for multiple players
- Unit test

contact : vertigo.index@gmail.com