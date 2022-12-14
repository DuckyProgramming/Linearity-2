function keyPressed(){
    if(key=="w"||key=='W'||keyCode==UP_ARROW){
        inputs.keys[0]=true
    }
    if(key=="s"||key=='S'||keyCode==DOWN_ARROW){
        inputs.keys[1]=true
    }
    if(key=="a"||key=='A'||keyCode==LEFT_ARROW){
        inputs.keys[2]=true
    }
    if(key=="d"||key=='D'||keyCode==RIGHT_ARROW){
        inputs.keys[3]=true
    }
    switch(stage.scene){
        case 'level':
            if(game.enter.anim>=1){
                inputs.previous=[]
                if((key=='e'||key=='E')&&(!screen.trigger||screen.position[0]==screen.start[0]&&screen.position[1]==screen.start[1])&&(game.enter.id<628||game.enter.id>=632)){
                    for(a=0,la=screen.main.length;a<la;a++){
                        for(b=0,lb=screen.main[a].length;b<lb;b++){
                            if(screen.main[(screen.position[0]+a+1)%screen.main.length][(screen.position[1]+b)%screen.main[a].length]=='('){
                                screen.active[(screen.position[0]+a+1)%screen.main.length][(screen.position[1]+b)%screen.main[a].length]=true
                                screen.trigger=true
                                screen.start=[(screen.position[0]+a+1)%screen.main.length,(screen.position[1]+b)%screen.main[a].length]
                                screen.position=[(screen.position[0]+a+1)%screen.main.length,(screen.position[1]+b)%screen.main[a].length]
                                a=la
                                b=lb
                                inputs.previous.push([screen.position[0],screen.position[1]])
                            }
                        }
                    }
                }
                if(keyCode==SHIFT&&game.enter.trigger){
                    game.enter.trigger=false
                    entities.screens[game.enter.select].screen.active=screen.active
                    entities.screens[game.enter.select].screen.fade=screen.fade
                    entities.screens[game.enter.select].screen.error=screen.error
                    entities.screens[game.enter.select].screen.flash=screen.flash
                    entities.screens[game.enter.select].screen.trigger=screen.trigger
                    entities.screens[game.enter.select].screen.start=screen.start
                    entities.screens[game.enter.select].screen.position=screen.position
                    screens.active[-entities.screens[game.enter.select].type]=screen.active
                    screens.fade[-entities.screens[game.enter.select].type]=screen.fade
                    screens.trigger[-entities.screens[game.enter.select].type]=screen.trigger
                    screens.start[-entities.screens[game.enter.select].type]=screen.start
                    screens.position[-entities.screens[game.enter.select].type]=screen.position
                    entities.screens[game.enter.select].displayScreen()
                }
                if(screen.trigger){
                    if((key=="w"||keyCode==UP_ARROW)&&screen.position[0]>0&&screen.main[screen.position[0]][screen.position[1]]!=')'){
                        if(legalMove(screen.main[screen.position[0]-1][screen.position[1]])&&
                        legalMove(screen.main[screen.position[0]-2][screen.position[1]])&&
                        screen.active[screen.position[0]-1][screen.position[1]]==0&&
                        screen.active[screen.position[0]-2][screen.position[1]]==0){
                            screen.active[screen.position[0]-1][screen.position[1] ]=1
                            screen.active[screen.position[0]-2][screen.position[1]]=1
                            screen.position[0]-=2
                            inputs.previous.push([screen.position[0],screen.position[1]])
                            inputs.previous.push([screen.position[0]+1,screen.position[1]])
                        }
                        else if(legalMove(screen.main[screen.position[0]-1][screen.position[1]])&&
                        legalMove(screen.main[screen.position[0]-2][screen.position[1]])&&
                        screen.active[screen.position[0]-1][screen.position[1]]==1&&
                        screen.active[screen.position[0]-2][screen.position[1]]==1){
                            screen.active[screen.position[0]][screen.position[1]]=0
                            screen.active[screen.position[0]-1][screen.position[1]]=0
                            screen.position[0]-=2
                            inputs.previous.push([screen.position[0]+2,screen.position[1]])
                            inputs.previous.push([screen.position[0]+1,screen.position[1]])
                        }
                    }
                    if((key=="s"||keyCode==DOWN_ARROW)&&screen.position[0]<screen.main.length-2&&screen.main[screen.position[0]][screen.position[1]]!=')'){
                        if(legalMove(screen.main[screen.position[0]+1][screen.position[1]])&&
                        legalMove(screen.main[screen.position[0]+2][screen.position[1]])&&
                        screen.active[screen.position[0]+1][screen.position[1]]==0&&
                        screen.active[screen.position[0]+2][screen.position[1]]==0){
                            screen.active[screen.position[0]+1][screen.position[1]]=1
                            screen.active[screen.position[0]+2][screen.position[1]]=1
                            screen.position[0]+=2
                            inputs.previous.push([screen.position[0],screen.position[1]])
                            inputs.previous.push([screen.position[0]-1,screen.position[1]])
                        }
                        else if(legalMove(screen.main[screen.position[0]+1][screen.position[1]])&&
                        legalMove(screen.main[screen.position[0]+1][screen.position[1]])&&
                        screen.active[screen.position[0]+1][screen.position[1]]==1&&
                        screen.active[screen.position[0]+2][screen.position[1]]==1){
                            screen.active[screen.position[0]][screen.position[1]]=0
                            screen.active[screen.position[0]+1][screen.position[1]]=0
                            screen.position[0]+=2
                            inputs.previous.push([screen.position[0]-2,screen.position[1]])
                            inputs.previous.push([screen.position[0]-1,screen.position[1]])
                        }
                    }
                    if((key=="a"||keyCode==LEFT_ARROW)&&screen.position[1]>0&&screen.main[screen.position[0]][screen.position[1]]!=')'){
                        if(legalMove(screen.main[screen.position[0]][screen.position[1]-1])&&
                        legalMove(screen.main[screen.position[0]][screen.position[1]-2])&&
                        screen.active[screen.position[0]][screen.position[1]-1]==0&&
                        screen.active[screen.position[0]][screen.position[1]-2]==0){
                            screen.active[screen.position[0]][screen.position[1]-1]=1
                            screen.active[screen.position[0]][screen.position[1]-2]=1
                            screen.position[1]-=2
                            inputs.previous.push([screen.position[0],screen.position[1]])
                            inputs.previous.push([screen.position[0],screen.position[1]+1])
                        }
                        else if(legalMove(screen.main[screen.position[0]][screen.position[1]-1])&&
                        legalMove(screen.main[screen.position[0]][screen.position[1]-2])&&
                        screen.active[screen.position[0]][screen.position[1]-1]==1&&
                        screen.active[screen.position[0]][screen.position[1]-2]==1){
                            screen.active[screen.position[0]][screen.position[1]]=0
                            screen.active[screen.position[0]][screen.position[1]-1]=0
                            screen.position[1]-=2
                            inputs.previous.push([screen.position[0],screen.position[1]+2])
                            inputs.previous.push([screen.position[0],screen.position[1]+1])
                        }
                    }
                    if((key=="d"||keyCode==RIGHT_ARROW)&&screen.position[1]<screen.main[0].length-2&&screen.main[screen.position[0]][screen.position[1]]!=')'){
                        if(legalMove(screen.main[screen.position[0]][screen.position[1]+1])&&
                        legalMove(screen.main[screen.position[0]][screen.position[1]+2])&&
                        screen.active[screen.position[0]][screen.position[1]+1]==0&&
                        screen.active[screen.position[0]][screen.position[1]+2]==0){
                            screen.active[screen.position[0]][screen.position[1]+1]=1
                            screen.active[screen.position[0]][screen.position[1]+2]=1
                            screen.position[1]+=2
                            inputs.previous.push([screen.position[0],screen.position[1]])
                            inputs.previous.push([screen.position[0],screen.position[1]-1])
                        }
                        else if(legalMove(screen.main[screen.position[0]][screen.position[1]+1])&&
                        legalMove(screen.main[screen.position[0]][screen.position[1]+2])&&
                        screen.active[screen.position[0]][screen.position[1]+1]==1&&
                        screen.active[screen.position[0]][screen.position[1]+2]==1){
                            screen.active[screen.position[0]][screen.position[1]]=0
                            screen.active[screen.position[0]][screen.position[1]+1]=0
                            screen.position[1]+=2
                            inputs.previous.push([screen.position[0],screen.position[1]-2])
                            inputs.previous.push([screen.position[0],screen.position[1]-1])
                        }
                    }
                    clearPrevious()
                    if(keyCode==ENTER&&screen.main[screen.position[0]][screen.position[1]]==')'){
                        generateRememberScreen()
                        grouping.fail=false
                        screen.complete=false
                        generateGroup()
                        for(m=0,lm=screen.main.length;m<lm;m++){
                            for(n=0,ln=screen.main[m].length;n<ln;n++){
                                if(screen.main[m][n]=='$'){
                                    checkScreen(screen)
                                    if(screen.complete){
                                        screen.complete=false
                                        screen.error[m][n]=1
                                    }
                                    else{
                                        for(o=0,lo=(screen.main.length-1)/2;o<lo;o++){
                                            for(p=0,lp=(screen.main[o].length-1)/2;p<lp;p++){
                                                if(!screen.complete&&grouping.screen[o][p]==grouping.screen[(m-1)/2][(n-1)/2]){
                                                    generateScreenRemember()
                                                    screen.main[o*2+1][p*2+1]=" "
                                                    checkScreen(screen)
                                                    if(screen.complete){
                                                        screen.disable[o*2+1][p*2+1]=1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(screen.complete){
                                        for(o=0,lo=screen.error.length;o<lo;o++){
                                            for(p=0,lp=screen.error[o].length;p<lp;p++){
                                                screen.error[o][p]=0
                                            }
                                        }
                                    }
                                    grouping.fail=true
                                }
                            }
                        }
                        generateScreenRemember()
                        if(!screen.complete&&!grouping.fail){
                            checkScreen(screen)
                        }
                        if(screen.complete){
                            entities.screens[game.enter.select].complete=true
                            for(a=0,la=entities.walls.length;a<la;a++){
                                entities.walls[a].activate(game.enter.id)
                            }
                            for(a=0,la=entities.screens.length;a<la;a++){
                                entities.screens[a].activate(game.enter.id)
                            }
                        }
                    }
                    if(keyCode==BACKSPACE){
                        resetScreen()
                    }
                }
            }
            if(key=='m'){
                transition.trigger=true
                transition.scene='map'
            }
        break
        case 'map':
            transition.trigger=true
            transition.scene='level'
        break
    }
}
function keyReleased(){
    if(key=="w"||key=='W'||keyCode==UP_ARROW){
        inputs.keys[0]=false
    }
    if(key=="s"||key=='S'||keyCode==DOWN_ARROW){
        inputs.keys[1]=false
    }
    if(key=="a"||key=='A'||keyCode==LEFT_ARROW){
        inputs.keys[2]=false
    }
    if(key=="d"||key=='D'||keyCode==RIGHT_ARROW){
        inputs.keys[3]=false
    }
}