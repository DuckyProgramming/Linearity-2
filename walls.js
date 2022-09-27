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
        if(this.type<=0){
            this.complete = false
            this.completeAnim = 0
            this.screen = {main:screens.main[-this.type],active:screens.active[-this.type],fade:screens.fade[-this.type],error:screens.error[-this.type],flash:screens.flash[-this.type],trigger:screens.trigger[-this.type],start:screens.start[-this.type],position:screens.position[-this.type]}
            this.image = createGraphics(this.screen.main[0].length*20,this.screen.main.length*20)
            setupLayer(this.image)
            this.displayScreen()
        }
        switch(this.type){
            case 1:
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
            case 5:
                this.height*=0.25
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
        switch(this.type){
            case 5:
                if(this.id==id){
                    this.trigger.start=true
                }
            break
        }
    }
    display(){
        this.layer.noStroke()
        this.layer.translate(this.position.x,this.position.y)
        if(this.type<=0){
            this.layer.stroke(40+this.completeAnim*215,40+this.completeAnim*165,40+this.completeAnim*185)
            this.layer.strokeWeight(3)
            this.layer.fill(255,100,150)
            this.layer.rect(0,0,70,70,3)
            k=0
            updateScreen(this.screen)
            if(k>0){
                this.displayScreen()
            }
            this.layer.image(this.image,-30,-30)
        }
        switch(this.type){
            case 1:
                this.layer.fill(250,230,240)
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
            break
            case 2:
                this.layer.fill(245,250,255)
                this.layer.stroke(170,110,135)
                this.layer.strokeWeight(6)
                this.layer.rect(0,0,this.width,this.height,6)
            break
            case 3: case 4:
                this.layer.fill(245,250,255)
                this.layer.stroke(170,110,135)
                this.layer.strokeWeight(6)
                this.layer.rect(0,0,this.width,this.height)
            break
            case 5:
                this.layer.noStroke()
                this.layer.fill(120,110,100)
                this.layer.rect(0,0,max(0,this.width-6),this.height)
                this.layer.fill(80,70,60)
                for(e=0,le=this.height/10;e<le;e++){
                    this.layer.rect(0,-this.height/2+e*10+5,max(0,this.width-6),2)
                }
            break
        }
        if(dev.box){
            this.layer.noFill()
            this.layer.stroke(0,255,0)
            this.layer.strokeWeight(3)
            this.layer.rect(0,0,this.width,this.height)
        }
        this.layer.translate(-this.position.x,-this.position.y)
    }
    update(){
        if(this.trigger.start&&!this.trigger.end){
            switch(this.type){
                case 5:
                    if(this.anim.main<120){
                        this.position.x--
                        this.width-=2
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
        for(e=0,le=this.collide.length;e<le;e++){
            for(f=0,lf=this.collide[e].length;f<lf;f++){
                if(circleInsideBox(this,this.collide[e][f])){
                    this.collideInfo=circleCollideBox(this,this.collide[e][f])
					this.collide[e][f].position.x=this.collideInfo.x
					this.collide[e][f].position.y=this.collideInfo.y
                    this.collide[e][f].speed*=0.9
				}
            }
        }
    }
}