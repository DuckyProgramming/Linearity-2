function setupLayer(layer){
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
}
function displayTransition(layer,transition){
	layer.noStroke()
	layer.fill(0)
	if(transition.trigger){
		transition.anim=round(transition.anim+10+1)/10;
		if(transition.anim>=1){
			transition.trigger = false;
			stage.scene = transition.scene;
		}
	}
	else if(transition.anim>0){
		transition.anim=round(transition.anim+10-1)/10;
	}
}
function displayBasePlate(layer,color){
	layer.noStroke();
    layer.fill(color[0],color[1],color[2])
	layer.rect(game.edge.x/2,game.edge.y/2,game.edge.x+20,game.edge.y+20,10)
}
function rotatePoint(point,direction,origin){
	return {x:dist(point.x-origin.x,point.y-origin.y,0,0)*sin(atan2(point.x-origin.x,point.y-origin.y)+direction),y:dist(point.x-origin.x,point.y-origin.y,0,0)*cos(atan2(point.x-origin.x,point.y-origin.y)+direction)}
}
function pushPoint(point,origin,size){
	if(dist(point.x,point.y,origin.x,origin.y)>size){
		return {x:point.x,y:point.y}
	}
	else{
		return {x:origin.x+sin(atan2(point.x-origin.x,point.y-origin.y))*size,y:origin.y+cos(atan2(point.x-origin.x,point.y-origin.y))*size}
	}
}
function circleCollideBox(box,circle){
	return pushPoint(circle.position,{x:constrain(circle.position.x,box.position.x-box.width/2,box.position.x+box.width/2),y:constrain(circle.position.y,box.position.y-box.height/2,box.position.y+box.height/2)},circle.size)
}
function circleInsideBox(box,circle){
	if(dist(circle.position.x,circle.position.y,constrain(circle.position.x,box.position.x-box.width/2,box.position.x+box.width/2),constrain(circle.position.y,box.position.y-box.height/2,box.position.y+box.height/2))<circle.size){
		return true
	}
	else{
		return false
	}
}
function setMouse(){
	inputs.mouse.x = mouseX;
	inputs.mouse.y = mouseY;
	inputs.rel.x = (inputs.mouse.x-graphics.full.width/2)/stage.zoom+stage.focus.x;
	inputs.rel.y = (inputs.mouse.y-graphics.full.height/2)/stage.zoom+stage.focus.y;
}
function generateWorld(level){
	game.edge.x = level[0].length*80;
	game.edge.y = level.length*80;
	for(i=0;i<level.length;i++){
        for(j=0;j<level[i].length;j++){
            if(level[i][j]>=100&&level[i][j]<10000){
                entities.walls.push(new wall(graphics.full,j*80+floor((level[i][j]%100)/10)*40+40,i*80+(level[i][j]%10)*40+40,floor(level[i][j]/100),floor((level[i][j]%100)/10)*80+80,(level[i][j]%10)*80+80))
            }
            else if(level[i][j]>=-1000&&level[i][j]<=0){
                entities.screens.push(new wall(graphics.full,j*80+40,i*80+40,level[i][j],50,50))
            }
            else if(level[i][j] == 2){
                entities.players.push(new player(graphics.full,j*80+40,i*80+40))
            }
        }
    }
	run={fore:[entities.players,entities.screens,entities.walls]};
}