function setup(){
    cnv=createCanvas(800,600)
    cnv.position((windowWidth-width)/2,(windowHeight-height)/2)
    graphics.full=createGraphics(800,600)
    setupLayer(graphics.full)
    generateWorld(level)
}
function windowResized(){
    cnv.position((windowWidth-width)/2,(windowHeight-height)/2)
}