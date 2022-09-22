function mousePressed(){
    setMouse()
    switch(stage.scene){
        case 'level':
            if(!game.enter.trigger){
                for(a=0;a<entities.screens.length;a++){
                    if(pointInsideBox({position:inputs.rel},entities.screens[a])){
                        game.enter.trigger = true;
                        game.enter.id=-entities.screens[a].type;
                    }
                }
            }
        break;
    }
}