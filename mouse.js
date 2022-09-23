function mousePressed(){
    setMouse()
    switch(stage.scene){
        case 'level':
            if(!game.enter.trigger){
                for(a=0;a<entities.screens.length;a++){
                    if(pointInsideBox({position:inputs.rel},entities.screens[a])){
                        game.enter.trigger=true
                        game.enter.id=-entities.screens[a].type
                        game.enter.select=a
                        game.enter.position.x=(inputs.rel.x-stage.focus.x)*stage.zoom+graphics.full.width/2
	                    game.enter.position.y=(inputs.rel.y-stage.focus.y)*stage.zoom+graphics.full.height/2
                        screen.main=entities.screens[a].screen
                    }
                }
            }
        break;
    }
}