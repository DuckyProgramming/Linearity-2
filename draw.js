function draw(){
    graphics.full.background(0)
    switch(stage.scene){
        case 'level':
            for(a=0;a<run.fore.length;a++){
                for(b=0;b<run.fore[a].length;b++){
                    run.fore[a][b].display()
                    run.fore[a][b].update()
                    if(run.fore[a][b].remove){
                        run.fore[a].splice(b,1)
                    }
                }
            }
        break
    }
    image(graphics.full,0,0)
}