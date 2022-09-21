class player extends entity{
    constructor(layer,x,y){
        super(layer,x,y)
        this.direction=0
    }
    display(){
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)

        this.layer.rotate(-this.direction)
        this.layer.translate(-this.position.x,-this.position.y)
    }
    update(){
        this.position.x = constrain(this.position.x,0,game.edge.x)
        this.position.y = constrain(this.position.y,0,game.edge.y)
    }
}