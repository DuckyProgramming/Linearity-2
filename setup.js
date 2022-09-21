function setup(){
    createCanvas(800,600)
    graphics.full=createGraphics(800,600)
    setupLayer(graphics.full)
    generateWorld(level)
}