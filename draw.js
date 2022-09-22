function draw(){
    graphics.full.background(0)
    switch(stage.scene){
        case 'level':
            graphics.full.push()
            graphics.full.translate(graphics.full.width/2-stage.focus.x,graphics.full.height/2-stage.focus.y)
            graphics.full.scale(stage.zoom)
            displayBasePlate(graphics.full,[220,200,120])
            for(a=0;a<run.fore.length;a++){
                for(b=0;b<run.fore[a].length;b++){
                    run.fore[a][b].display()
                    run.fore[a][b].update()
                    if(run.fore[a][b].remove){
                        run.fore[a].splice(b,1)
                    }
                }
            }
            graphics.full.pop()
            displayInPuzzle(graphics.full,game)
        break
    }
    displayTransition(graphics.full,transition)
    image(graphics.full,0,0)
    setMouse()
}