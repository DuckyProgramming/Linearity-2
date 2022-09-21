class wall extends entity{
    constructor(layer,x,y,type,width,height){
        super(layer,x,y)
        this.type=type;
        this.width=width
        this.height=height
        this.collide=[entities.players]
        this.control=random(0,1)
        switch(this.type){
            case 1:
                this.ellipse=[]
                for(e=0;e<4;e++){
                    this.ellipse.push([random(20,30),random(20,30),random(60,80)])
                }
            break
        }
    }
    display(){
        this.layer.noStroke()
        this.layer.translate(this.position.x,this.position.y)
        switch(this.type){
            case 1:
                this.layer.rotate(this.control*360)
                this.layer.fill(255,50,100)
                for(e=0;e<this.ellipse.length;e++){
                    this.layer.ellipse(this.ellipse[e][0]*((e%2)*2-1),this.ellipse[e][1]*(floor(e/2)*2-1),this.ellipse[e][2],this.ellipse[e][2])
                }
                this.layer.rotate(-this.control*360)
            break
        }
        this.layer.translate(-this.position.x,-this.position.y)
    }
    update(){
        for(e=0;e<this.collide.length;e++){
            for(f=0;f<this.collide[e].length;f++){
                if(circleInsideBox(this,this.collide[e][f])){
					this.collide[e][f].position.x = circleCollideBox(this,this.collide[e][f]).x
					this.collide[e][f].position.y = circleCollideBox(this,this.collide[e][d]).y
				}
            }
        }
    }
}