class wall extends entity{
    constructor(layer,x,y,type,width,height,id){
        super(layer,x,y)
        this.type=type
        this.width=width
        this.height=height
        this.id=id
        this.collide=[entities.players]
        if(this.type<=0){
            this.complete = false
            this.completeAnim = 0
            this.screen = {main:screens.main[-this.type],active:screens.active[-this.type],fade:screens.fade[-this.type]}
            this.image = createGraphics(this.screen.main[0].length*20,this.screen.main.length*20)
            setupLayer(this.image)
            displayScreen(this.image,this.screen)
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
            this.layer.image(this.image,-30,-30,60,60)
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
        if(this.type<=0&&this.complete&&this.completeAnim<1){
            this.completeAnim=round(this.completeAnim*20+1)/20
        }
        for(e=0,le=this.collide.length;e<le;e++){
            for(f=0,lf=this.collide[e].length;f<lf;f++){
                if(circleInsideBox(this,this.collide[e][f])){
					this.collide[e][f].position.x=circleCollideBox(this,this.collide[e][f]).x
					this.collide[e][f].position.y=circleCollideBox(this,this.collide[e][d]).y
                    this.collide[e][f].speed*=0.9
				}
            }
        }
    }
}