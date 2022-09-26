function mousePressed(){
    setMouse()
    switch(stage.scene){
        case 'level':
            if(!game.enter.trigger){
                for(a=0,la=entities.screens.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},entities.screens[a])){
                        game.enter.trigger=true
                        game.enter.id=-entities.screens[a].type
                        game.enter.select=a
                        game.enter.position.x=(entities.screens[a].position.x-stage.focus.x)*stage.zoom+graphics.full.width/2
	                    game.enter.position.y=(entities.screens[a].position.y-stage.focus.y)*stage.zoom+graphics.full.height/2
                        setupScreen(entities.screens[a])
                    }
                }
            }
            if(game.enter.anim>=1&&!screen.trigger){
                for(a=0,la=screen.main.length;a<la;a++){
                    for(b=0,lb=screen.main[a].length;b<lb;b++){
                        switch(screen.main[a][b]){
                            case '(':
                                if(dist(inputs.mouse.x,inputs.mouse.y,
                                    (10+b*20-screen.main[0].length*10)*30/screen.main[0].length/10*(1+game.enter.anim*41/7)+graphics.full.width/2,
                                    (10+a*20-screen.main.length*10)*30/screen.main.length/10*(1+game.enter.anim*41/7)+graphics.full.height/2)<200/screen.main[0].length/10*(1+game.enter.anim*41/7)){
                                    screen.active[a][b]=true
                                    screen.trigger=true
                                    screen.position=[a,b]
                                }
                            break
                        }
                    }
                }
            }
        break;
    }
}