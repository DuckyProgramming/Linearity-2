class wall extends entity{
    constructor(layer,x,y,type,width,height,id){
        super(layer,x,y)
        this.type=type
        this.width=width
        this.height=height
        this.id=id
        this.trigger={start:false,end:false}
        this.anim={main:0}
        this.collide=[entities.players]
        this.collideInfo={x:0,y:0}
        this.base={width:this.width,height:this.height}
        if(this.type<=0){
            if(this.id==1){
                this.trigger.start=true
                this.trigger.end=true
                this.anim.main=30
            }
            this.complete = false
            this.completeAnim = 0
            this.screen = {main:screens.main[-this.type],active:screens.active[-this.type],fade:screens.fade[-this.type],error:screens.error[-this.type],
                flash:screens.flash[-this.type],disable:screens.disable[-this.type],deactivate:screens.deactivate[-this.type],
                trigger:screens.trigger[-this.type],start:screens.start[-this.type],position:screens.position[-this.type],symmetry:screens.symmetry[-this.type]}
            this.image = createGraphics(this.screen.main[0].length*20,this.screen.main.length*20)
            setupLayer(this.image)
            this.displayScreen()
        }
        switch(this.type){
            case 1: case 17:
                this.ellipse=[]
                this.control=[]
                for(e=0,le=this.width/80;e<le;e++){
                    this.ellipse.push([])
                    this.control.push([])
                    for(f=0,lf=this.height/80;f<lf;f++){
                        this.ellipse[e].push([])
                        this.control[e].push(random(0,1))
                        for(g=0;g<4;g++){
                            this.ellipse[e][f].push([random(15,25),random(15,25),random(60,70)])
                        }
                    }
                }
            break
            case 3:
                this.width*=0.5
            break
            case 4:
                this.height*=0.5
            break
            case 12:
                this.width*=0.25
            break
            case 5: case 11:
                this.height*=0.25
            break
            case 6:
                this.height-=8
            break
            case 7:
                this.width-=20
            break
            case 8:
                this.height-=20
            break
            case 9:
                this.width-=32
                this.position.x+=19.5
            break
            case 10:
                this.width-=32
                this.position.x-=19.5
            break
            case 13:
                this.width-=8
            break
            case 14:
                this.ellipse=[]
                this.control=[]
                for(e=0,le=this.width/80;e<le;e++){
                    this.ellipse.push([])
                    this.control.push([])
                    for(f=0,lf=this.height/80;f<lf;f++){
                        this.ellipse[e].push([])
                        this.control[e].push(random(0,1))
                        this.ellipse[e][f].push([random(5,10),random(5,10),random(100,120)])
                    }
                }
            break
            case 15:
                this.width*=1.5
                this.height*=0.2
            break
            case 16:
                this.width*=0.2
                this.height*=1.5
            break
        }
    }
    displayScreen(){
        this.image.clear()
        this.image.push()
        this.image.translate(30,30)
        this.image.scale(min(3/this.screen.main[0].length,3/this.screen.main.length))
        this.image.translate(-this.screen.main[0].length*10,-this.screen.main.length*10)
        displayScreen(this.image,this.screen)
        this.image.pop()
    }
    activate(id){
        if(-this.id==id){
            this.trigger.start=true
        }
    }
    display(){
        this.layer.noStroke()
        this.layer.translate(this.position.x,this.position.y)
        if(this.type<=0){
            this.layer.noStroke()
            this.layer.fill(255,100,150)
            this.layer.rect(0,0,70,70,3)
            k=0
            updateScreen(this.screen)
            if(k>0){
                this.displayScreen()
            }
            this.layer.image(this.image,-30,-30)
            this.layer.stroke(40+this.completeAnim*215,40+this.completeAnim*165,40+this.completeAnim*185)
            this.layer.strokeWeight(3)
            this.layer.fill(0,1-this.anim.main/30)
            this.layer.rect(0,0,70,70,3)
        }
        switch(this.type){
            case 1: case 14: case 17:
                if(this.type==1||this.type==17){
                    this.layer.fill(250,230,240)
                }
                else if(this.type==14){
                    this.layer.fill(65,60,65)
                }
                for(e=0,le=this.ellipse.length;e<le;e++){
                    for(f=0,lf=this.ellipse[e].length;f<lf;f++){
                        this.layer.translate(-this.width/2+40+e*80,-this.height/2+40+f*80)
                        this.layer.rotate(this.control[e][f]*360)
                        for(g=0,lg=this.ellipse[e][f].length;g<lg;g++){
                            this.layer.ellipse(this.ellipse[e][f][g][0]*((g%2)*2-1),this.ellipse[e][f][g][1]*(floor(g/2)*2-1),this.ellipse[e][f][g][2],this.ellipse[e][f][g][2])
                        }
                        this.layer.rotate(this.control[e][f]*-360)
                        this.layer.translate(this.width/2-40-e*80,this.height/2-40-f*80)
                    }
                }
                if(this.type==17){
                    this.layer.scale(3)
                    dots(this.layer,0,0,2,0,0,0)
                    this.layer.scale(1/3)
                }
            break
            case 2:
                this.layer.fill(245,250,255)
                this.layer.stroke(170,110,135)
                this.layer.strokeWeight(6)
                this.layer.rect(0,0,this.width,this.height,6)
            break
            case 3: case 4: case 11: case 12:
                this.layer.fill(245,250,255)
                this.layer.stroke(170,110,135)
                this.layer.strokeWeight(6)
                this.layer.rect(0,0,this.width,this.height)
            break
            case 5:
                this.layer.noStroke()
                this.layer.fill(170,140,115)
                this.layer.rect(0,0,max(0,this.width-6),this.height)
                this.layer.fill(150,120,100)
                for(e=0,le=this.height/10;e<le;e++){
                    this.layer.rect(0,-this.height/2+e*10+5,max(0,this.width-6),2)
                }
            break
            case 6:
                this.layer.noStroke()
                this.layer.fill(175,150,135)
                this.layer.rect(0,0,max(0,this.width-16),this.height)
                this.layer.fill(120,95,100)
                for(e=0,le=4;e<le;e++){
                    this.layer.rect(0,-this.height/2+e*this.height/4+this.height/8,max(0,this.width-16),2)
                }
            break
            case 9: case 10:
                this.layer.noStroke()
                this.layer.fill(165,145,140)
                this.layer.rect(0,0,this.width,this.height)
                this.layer.fill(105,90,95)
                for(e=0,le=4;e<le;e++){
                    this.layer.rect(0,-this.height/2+e*this.height/4+this.height/8,this.width,2)
                }
            break
            case 13:
                this.layer.noStroke()
                this.layer.fill(175,150,135)
                this.layer.rect(0,0,this.width,max(0,this.height-16))
                this.layer.fill(120,95,100)
                for(e=0,le=4;e<le;e++){
                    this.layer.rect(-this.width/2+e*this.width/4+this.width/8,0,2,max(0,this.height-16))
                }
            break
            case 15: case 16:
                this.layer.fill(245,250,255)
                this.layer.stroke(170,110,135)
                this.layer.strokeWeight(4)
                this.layer.rect(0,0,this.width,this.height)
            break
            case 18: case 19: case 20: case 21:
                for(e=0,le=this.height/80;e<le;e++){
                    for(f=0,lf=this.width/80;f<lf;f++){
                        this.layer.fill(entities.screens[game.puzzle.id[this.type-18]].screen.fade[e][f]*255)
                        this.layer.ellipse(-this.width/2+40+f*80,-this.height/2+40+e*80,40,40)
                    }
                }
            break
        }
        if(dev.box||this.type==7||this.type==8){
            this.layer.noFill()
            this.layer.stroke(0,255,0)
            this.layer.strokeWeight(3)
            this.layer.rect(0,0,this.width,this.height)
        }
        this.layer.translate(-this.position.x,-this.position.y)
    }
    update(){
        if(this.trigger.start&&!this.trigger.end){
            if(this.type<=0){
                if(this.anim.main<30){
                    this.anim.main++
                }
                else{
                    this.trigger.end=true
                }
            }
            switch(this.type){
                case 5:
                    if(this.anim.main<this.base.width/2){
                        this.position.x--
                        this.width-=2
                        this.anim.main++
                    }
                    else{
                        this.trigger.end=true
                    }
                break
                case 11:
                    if(this.anim.main<this.base.width){
                        this.position.x-=1/2
                        this.width--
                        this.anim.main++
                    }
                    else{
                        this.trigger.end=true
                    }
                break
                case 12:
                    if(this.anim.main<this.base.height){
                        this.position.y-=1/2
                        this.height--
                        this.anim.main++
                    }
                    else{
                        this.trigger.end=true
                    }
                break
            }
        }
        if(this.type<=0&&this.complete&&this.completeAnim<1){
            this.completeAnim=round(this.completeAnim*20+1)/20
        }
        if(this.type!=6&&this.type!=13){
            for(e=0,le=this.collide.length;e<le;e++){
                for(f=0,lf=this.collide[e].length;f<lf;f++){
                    if(this.type==18||this.type==19||this.type==20||this.type==21){
                        if(this.collide[e][f].position.x>this.position.x-this.width/2-10&&this.collide[e][f].position.x<this.position.x-this.width/2+90&&
                        this.collide[e][f].position.y>this.position.y-this.height/2-10&&this.collide[e][f].position.y<this.position.y-this.height/2+90&&!entities.screens[game.puzzle.id[this.type-18]].screen.trigger){
                            entities.screens[game.puzzle.id[this.type-18]].screen.trigger=true
                            entities.screens[game.puzzle.id[this.type-18]].screen.active[0][0]=true
                            entities.screens[game.puzzle.id[this.type-18]].screen.trigger=true
                            entities.screens[game.puzzle.id[this.type-18]].screen.position=[0,0]
                            entities.screens[game.puzzle.id[this.type-18]].screen.start=[0,0]
                            updateScreen(entities.screens[game.puzzle.id[this.type-18]].screen)
                        }
                        for(g=0,lg=this.height/80;g<lg;g++){
                            for(h=0,lh=this.width/80;h<lh;h++){
                                if(this.collide[e][f].position.x>this.position.x-this.width/2-10+h*80&&this.collide[e][f].position.x<this.position.x-this.width/2+90+h*80&&
                                this.collide[e][f].position.y>this.position.y-this.height/2-10+g*80&&this.collide[e][f].position.y<this.position.y-this.height/2+90+g*80&&entities.screens[game.puzzle.id[this.type-18]].screen.trigger&&game.enter.anim<=0){
                                    entities.screens[game.puzzle.id[this.type-18]].screen.active[g][h]=true
                                    entities.screens[game.puzzle.id[this.type-18]].screen.position=[g,h]
                                }
                            }
                        }
                    }
                    else if(circleInsideBox(this,this.collide[e][f])){
                        this.collideInfo=circleCollideBox(this,this.collide[e][f])
                        this.collide[e][f].position.x=this.collideInfo.x
                        this.collide[e][f].position.y=this.collideInfo.y
                        this.collide[e][f].speed*=0.9
                        this.collide[e][f].vel.x*=0.9
                        this.collide[e][f].vel.y*=0.9
                        if(this.type<=0&&!game.enter.trigger&&this.trigger.start&&dist(0,0,this.collide[e][f].vel.x,this.collide[e][f].vel.y)>2){
                            game.enter.trigger=true
                            game.enter.id=-this.type
                            game.enter.select=b
                            game.enter.position.x=(this.position.x-stage.focus.x)*stage.zoom+graphics.full.width/2
                            game.enter.position.y=(this.position.y-stage.focus.y)*stage.zoom+graphics.full.height/2
                            setupScreen(this)
                        }
                    }
                }
            }
        }
    }
}
