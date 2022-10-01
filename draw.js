function draw(){
    graphics.full.background(160,200,240)
    switch(stage.scene){
        case 'map':
            graphics.full.image(graphics.map,100,0,600,600)
        break
        case 'level':
            graphics.full.push()
            graphics.full.translate(graphics.full.width/2,graphics.full.height/2)
            graphics.full.scale(stage.zoom)
            graphics.full.translate(-stage.focus.x,-stage.focus.y)
            graphics.full.image(graphics.base,-100,-100)
            for(a=0,la=run.fore.length;a<la;a++){
                for(b=0,lb=run.fore[a].length;b<lb;b++){
                    if(run.fore[a][b].position.x+run.fore[a][b].width/2>-graphics.full.width/2-100+stage.focus.x&&
                    run.fore[a][b].position.x-run.fore[a][b].width/2<graphics.full.width/2+100+stage.focus.x&&
                    run.fore[a][b].position.y+run.fore[a][b].height/2>-graphics.full.height/2-100+stage.focus.y&&
                    run.fore[a][b].position.y-run.fore[a][b].height/2<graphics.full.height/2+100+stage.focus.y||dev.view){
                        run.fore[a][b].display()
                        run.fore[a][b].update()
                    }
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