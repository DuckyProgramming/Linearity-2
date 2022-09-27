function setup(){
    cnv=createCanvas(800,600)
    cnv.position((windowWidth-width)/2,(windowHeight-height)/2)
    graphics.full=createGraphics(800,600)
    angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
    setupLayer(graphics.full)
    generateScreens(screens)
    generateWorld(levels[stage.level])
    displayBasePlate([100,105,110])
    displayPath(graphics.base,levels[stage.level],[175,175,180])
}
function windowResized(){
    cnv.position((windowWidth-width)/2,(windowHeight-height)/2)
}