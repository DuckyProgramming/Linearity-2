function keyPressed(){
    if(key=="w"){

    }
    if(key=="s"&&screen.position[0]<screen.main.length-2){
        if(legalMove(screen.main[screen.position[0]+1][screen.position[1]])&&legalMove(screen.main[screen.position[0]+2][screen.position[1]])&&screen.active[screen.position[0]+1][screen.position[1]]==0&&screen.active[screen.position[0]+2][screen.position[1]]==0){
            screen.active[screen.position[0]+1][screen.position[1]]=1
            screen.active[screen.position[0]+2][screen.position[1]]=1
            screen.position[0]+=2
        }
    }
    if(key=="a"){
        
    }
    if(key=="d"){
        
    }
    if(keyCode==ENTER&&game.enter.trigger){
        game.enter.trigger=false;
    }
}