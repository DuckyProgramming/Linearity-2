function keyPressed(){
    if(game.enter.anim>=1&&screen.trigger){
        if((key=="w"||keyCode==UP_ARROW)&&screen.position[0]>0&&screen.main[screen.position[0]][screen.position[1]]!='o'){
            if(legalMove(screen.main[screen.position[0]-1][screen.position[1]])&&
            legalMove(screen.main[screen.position[0]-2][screen.position[1]])&&
            screen.active[screen.position[0]-1][screen.position[1]]==0&&
            screen.active[screen.position[0]-2][screen.position[1]]==0){
                screen.active[screen.position[0]-1][screen.position[1]]=1
                screen.active[screen.position[0]-2][screen.position[1]]=1
                screen.position[0]-=2
            }
            else if(legalMove(screen.main[screen.position[0]-1][screen.position[1]])&&
            legalMove(screen.main[screen.position[0]-2][screen.position[1]])&&
            screen.active[screen.position[0]-1][screen.position[1]]==1&&
            screen.active[screen.position[0]-2][screen.position[1]]==1){
                screen.active[screen.position[0]][screen.position[1]]=0
                screen.active[screen.position[0]-1][screen.position[1]]=0
                screen.position[0]-=2
            }
        }
        if((key=="s"||keyCode==DOWN_ARROW)&&screen.position[0]<screen.main.length-2&&screen.main[screen.position[0]][screen.position[1]]!='o'){
            if(legalMove(screen.main[screen.position[0]+1][screen.position[1]])&&
            legalMove(screen.main[screen.position[0]+2][screen.position[1]])&&
            screen.active[screen.position[0]+1][screen.position[1]]==0&&
            screen.active[screen.position[0]+2][screen.position[1]]==0){
                screen.active[screen.position[0]+1][screen.position[1]]=1
                screen.active[screen.position[0]+2][screen.position[1]]=1
                screen.position[0]+=2
            }
            else if(legalMove(screen.main[screen.position[0]+1][screen.position[1]])&&
            legalMove(screen.main[screen.position[0]+1][screen.position[1]])&&
            screen.active[screen.position[0]+1][screen.position[1]]==1&&
            screen.active[screen.position[0]+2][screen.position[1]]==1){
                screen.active[screen.position[0]][screen.position[1]]=0
                screen.active[screen.position[0]+1][screen.position[1]]=0
                screen.position[0]+=2
            }
        }
        if((key=="a"||keyCode==LEFT_ARROW)&&screen.position[1]>0&&screen.main[screen.position[0]][screen.position[1]]!='o'){
            if(legalMove(screen.main[screen.position[0]][screen.position[1]-1])&&
            legalMove(screen.main[screen.position[0]][screen.position[1]-2])&&
            screen.active[screen.position[0]][screen.position[1]-1]==0&&
            screen.active[screen.position[0]][screen.position[1]-2]==0){
                screen.active[screen.position[0]][screen.position[1]-1]=1
                screen.active[screen.position[0]][screen.position[1]-2]=1
                screen.position[1]-=2
            }
            else if(legalMove(screen.main[screen.position[0]][screen.position[1]-1])&&
            legalMove(screen.main[screen.position[0]][screen.position[1]-2])&&
            screen.active[screen.position[0]][screen.position[1]-1]==1&&
            screen.active[screen.position[0]][screen.position[1]-2]==1){
                screen.active[screen.position[0]][screen.position[1]]=0
                screen.active[screen.position[0]][screen.position[1]-1]=0
                screen.position[1]-=2
            }
        }
        if((key=="d"||keyCode==RIGHT_ARROW)&&screen.position[1]<screen.main[0].length-2&&screen.main[screen.position[0]][screen.position[1]]!='o'){
            if(legalMove(screen.main[screen.position[0]][screen.position[1]+1])&&
            legalMove(screen.main[screen.position[0]][screen.position[1]+2])&&
            screen.active[screen.position[0]][screen.position[1]+1]==0&&
            screen.active[screen.position[0]][screen.position[1]+2]==0){
                screen.active[screen.position[0]][screen.position[1]+1]=1
                screen.active[screen.position[0]][screen.position[1]+2]=1
                screen.position[1]+=2
            }
            else if(legalMove(screen.main[screen.position[0]][screen.position[1]+1])&&
            legalMove(screen.main[screen.position[0]][screen.position[1]+2])&&
            screen.active[screen.position[0]][screen.position[1]+1]==1&&
            screen.active[screen.position[0]][screen.position[1]+2]==1){
                screen.active[screen.position[0]][screen.position[1]]=0
                screen.active[screen.position[0]][screen.position[1]+1]=0
                screen.position[1]+=2
            }
        }
        if(keyCode==SHIFT&&game.enter.trigger){
            game.enter.trigger=false
            entities.screens[game.enter.select].screen.active=screen.active
            entities.screens[game.enter.select].screen.fade=screen.fade
            entities.screens[game.enter.select].screen.trigger=screen.trigger
            entities.screens[game.enter.select].image.clear()
            displayScreen(entities.screens[game.enter.select].image,entities.screens[game.enter.select].screen)
            screens.active[-entities.screens[game.enter.select].type]=screen.active
            screens.fade[-entities.screens[game.enter.select].type]=screen.fade
            screens.trigger[-entities.screens[game.enter.select].type]=screen.trigger
        }
        if(keyCode==ENTER&&screen.main[screen.position[0]][screen.position[1]]=='o'){
            screen.complete=true
            grouping.complete=false
            grouping.screen=[]
            for(a=0,la=screen.main.length/2-1;a<la;a++){
                grouping.screen.push([])
                for(b=0,lb=screen.main[a].length/2-1;b<lb;b++){
                    grouping.screen[a].push(-1)
                }
            }
            grouping.screen[0][0]=0
            grouping.star=[[0,0,0,0,0,0,0,0]]
            grouping.create=1
            while(!grouping.complete){
                grouping.complete=true
                grouping.add=true
                for(a=0,la=grouping.screen.length;a<la;a++){
                    for(b=0,lb=grouping.screen[a].length;b<lb;b++){
                        if(grouping.screen[a][b]<0){
                            grouping.complete=false
                            if(a>0&&grouping.screen[a-1][b]>=0&&screen.active[a*2][b*2+1]==0){
                                grouping.screen[a][b]=grouping.screen[a-1][b]
                                grouping.add=false
                            }
                            if(a<grouping.screen.length-1&&grouping.screen[a+1][b]>=0&&screen.active[a*2+2][b*2+1]==0){
                                grouping.screen[a][b]=grouping.screen[a+1][b]
                                grouping.add=false
                            }
                            if(b>0&&grouping.screen[a][b-1]>=0&&screen.active[a*2+1][b*2]==0){
                                grouping.screen[a][b]=grouping.screen[a][b-1]
                                grouping.add=false
                            }
                            if(b<grouping.screen[a].length-1&&grouping.screen[a][b+1]>=0&&screen.active[a*2+1][b*2+2]==0){
                                grouping.screen[a][b]=grouping.screen[a][b+1]
                                grouping.add=false
                            }
                        }
                    }
                }
                if(grouping.add){
                    for(a=0,la=grouping.screen.length;a<la;a++){
                        for(b=0,lb=grouping.screen[a].length;b<lb;b++){
                            if(grouping.screen[a][b]<0&&grouping.add){
                                grouping.screen[a][b]=grouping.create
                                grouping.create++
                                grouping.add=false
                                grouping.star.push([0,0,0,0,0,0,0,0])
                            }
                        }
                    }
                }
            }
            for(a=0,la=grouping.screen.length;a<la;a++){
                for(b=0,lb=grouping.screen[a].length;b<lb;b++){
                    grouping.star[grouping.screen[a][b]][colorNumber(screen.main[a*2+1][b*2+1])]++
                }
            }
            for(a=0,la=screen.main.length;a<la;a++){
                for(b=0,lb=screen.main[a].length;b<lb;b++){
                    switch(screen.main[a][b]){
                        case '*':
                            if(screen.active[a][b]==0){
                                screen.complete=false
                            }
                        break
                        case '1':
                            if(!(screen.active[a-1][b]==1&&screen.active[a+1][b]==0&&screen.active[a][b-1]==0&&screen.active[a][b+1]==0||
                                screen.active[a-1][b]==0&&screen.active[a+1][b]==1&&screen.active[a][b-1]==0&&screen.active[a][b+1]==0||
                                screen.active[a-1][b]==0&&screen.active[a+1][b]==0&&screen.active[a][b-1]==1&&screen.active[a][b+1]==0||
                                screen.active[a-1][b]==0&&screen.active[a+1][b]==0&&screen.active[a][b-1]==0&&screen.active[a][b+1]==1)){
                                screen.complete=false
                            }
                        break
                        case '2':
                            if(!(screen.active[a-1][b]==1&&screen.active[a+1][b]==1&&screen.active[a][b-1]==0&&screen.active[a][b+1]==0||
                                screen.active[a-1][b]==0&&screen.active[a+1][b]==1&&screen.active[a][b-1]==1&&screen.active[a][b+1]==0||
                                screen.active[a-1][b]==0&&screen.active[a+1][b]==0&&screen.active[a][b-1]==1&&screen.active[a][b+1]==1||
                                screen.active[a-1][b]==1&&screen.active[a+1][b]==0&&screen.active[a][b-1]==0&&screen.active[a][b+1]==1||
                                screen.active[a-1][b]==1&&screen.active[a+1][b]==0&&screen.active[a][b-1]==1&&screen.active[a][b+1]==0||
                                screen.active[a-1][b]==0&&screen.active[a+1][b]==1&&screen.active[a][b-1]==0&&screen.active[a][b+1]==1)){
                                screen.complete=false
                            }
                        break
                        case '3':
                            if(!(screen.active[a-1][b]==1&&screen.active[a+1][b]==0&&screen.active[a][b-1]==1&&screen.active[a][b+1]==1||
                                screen.active[a-1][b]==1&&screen.active[a+1][b]==1&&screen.active[a][b-1]==0&&screen.active[a][b+1]==1||
                                screen.active[a-1][b]==1&&screen.active[a+1][b]==1&&screen.active[a][b-1]==1&&screen.active[a][b+1]==0||
                                screen.active[a-1][b]==0&&screen.active[a+1][b]==1&&screen.active[a][b-1]==1&&screen.active[a][b+1]==1)){
                                screen.complete=false
                            }
                        break
                        case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
                            for(c=0,lc=grouping.screen.length;c<lc;c++){
                                for(d=0,ld=grouping.screen[c].length;d<ld;d++){
                                    if(grouping.screen[c][d]==grouping.screen[(a-1)/2][(b-1)/2]&&screen.main[c*2+1][d*2+1]!=screen.main[a][b]&&screen.main[c*2+1][d*2+1]!=capital(screen.main[a][b])&&(
                                        screen.main[c*2+1][d*2+1]=='a'||screen.main[c*2+1][d*2+1]=='b'||screen.main[c*2+1][d*2+1]=='c'||screen.main[c*2+1][d*2+1]=='d'||
                                        screen.main[c*2+1][d*2+1]=='e'||screen.main[c*2+1][d*2+1]=='f'||screen.main[c*2+1][d*2+1]=='g'||screen.main[c*2+1][d*2+1]=='h'||
                                        screen.main[c*2+1][d*2+1]=='A'||screen.main[c*2+1][d*2+1]=='B'||screen.main[c*2+1][d*2+1]=='C'||screen.main[c*2+1][d*2+1]=='D'||
                                        screen.main[c*2+1][d*2+1]=='E'||screen.main[c*2+1][d*2+1]=='F'||screen.main[c*2+1][d*2+1]=='G'||screen.main[c*2+1][d*2+1]=='H')){
                                        screen.complete=false
                                    }
                                }
                            }
                        break
                        case 'A': case 'B': case 'C': case 'D': case 'E': case 'F': case 'G': case 'H':
                            if(grouping.star[grouping.screen[(a-1)/2][(b-1)/2]][colorNumber(screen.main[a][b])]!=2){
                                screen.complete=false
                            }
                        break
                    }
                }
            }
            if(screen.complete){
                entities.screens[game.enter.select].complete=true
            }
        }
        if(keyCode==BACKSPACE){
            resetScreen()
        }
    }
}