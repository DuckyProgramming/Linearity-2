class player extends entity{
    constructor(layer,x,y){
        super(layer,x,y)
        this.direction=0
        this.size=16
        this.width=16
        this.height=16
        this.speed=0
        this.vel={x:0,y:0}
    }
    display(){
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)
        this.layer.noStroke()
        this.layer.fill(255,225,125,this.fade)
        this.layer.ellipse(0,0,30,30)
        this.layer.fill(0,this.fade)
        this.layer.ellipse(-6,-5,5,5)
        this.layer.ellipse(6,-5,5,5)
        this.layer.rotate(-this.direction)
        this.layer.translate(-this.position.x,-this.position.y)
    }
    update(){
        this.position.x=constrain(this.position.x,0,game.edge.x)
        this.position.y=constrain(this.position.y,0,game.edge.y)
        this.direction=atan2(inputs.rel.x-this.position.x,this.position.y-inputs.rel.y)
        if(dev.control==0){
            this.position.x+=this.vel.x
            this.position.y+=this.vel.y
            this.vel.x*=0.9
            this.vel.y*=0.9
            if(inputs.keys[0]&&!game.enter.trigger){
                this.vel.y-=0.6
            }
            if(inputs.keys[1]&&!game.enter.trigger){
                this.vel.y+=0.6
            }
            if(inputs.keys[2]&&!game.enter.trigger){
                this.vel.x-=0.6
            }
            if(inputs.keys[3]&&!game.enter.trigger){
                this.vel.x+=0.6
            }
        }
        else{
            this.position.x+=sin(this.direction)*this.speed
            this.position.y-=cos(this.direction)*this.speed
            if(dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)>=100&&!game.enter.trigger&&this.speed<5){
                this.speed = round(this.speed+1)
            }
            else if((dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<100||game.enter.trigger)&&this.speed>0){
                this.speed = round(this.speed-1)
            }
        }
        stage.focus=this.position;
    }
}