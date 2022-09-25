function draw(){
    graphics.full.background(120,170,220)
    switch(stage.scene){
        case 'level':
            graphics.full.push()
            graphics.full.translate(graphics.full.width/2-stage.focus.x,graphics.full.height/2-stage.focus.y)
            graphics.full.scale(stage.zoom)
            graphics.full.image(graphics.base,-100,-100)
            for(a=0,la=run.fore.length;a<la;a++){
                for(b=0,lb=run.fore[a].length;b<lb;b++){
                    run.fore[a][b].display()
                    run.fore[a][b].update()
                    if(run.fore[a][b].remove){
                        run.fore[a].splice(b,1)
                    }
                }
            }
            graphics.full.pop()
            displayInScreen(graphics.full,game)
        break
    }
    displayTransition(graphics.full,transition)
    image(graphics.full,0,0)
    setMouse()
}