class player extends entity{
    constructor(layer,x,y){
        super(layer,x,y)
        this.direction=0
        this.size=16
        this.speed=0
    }
    display(){
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)
        this.layer.noStroke()
        this.layer.fill(255,225,125,this.fade)
        this.layer.ellipse(0,0,30,30)
        this.layer.fill(0,this.fade)
        this.layer.ellipse(-6,-5,5,5);
        this.layer.ellipse(6,-5,5,5)
        this.layer.rotate(-this.direction)
        this.layer.translate(-this.position.x,-this.position.y)
    }
    update(){
        this.position.x=constrain(this.position.x,0,game.edge.x)
        this.position.y=constrain(this.position.y,0,game.edge.y)
        this.direction=atan2(inputs.rel.x-this.position.x,this.position.y-inputs.rel.y)
        this.position.x+=sin(this.direction)*this.speed
        this.position.y-=cos(this.direction)*this.speed
        if(dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)>=100&&this.speed<5){
            this.speed = round(this.speed+1)
        }
        else if(dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<100&&this.speed>0){
            this.speed = round(this.speed-1)
        }
        stage.focus=this.position;
    }
}