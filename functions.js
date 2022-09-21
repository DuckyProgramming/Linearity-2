function setupLayer(layer){
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
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
function generateWorld(level){
	game.edge.x = level[0].length*40;
	game.edge.y = level.length*40;
	for(i=0;i<level.length;i++){
        for(j=0;j<level[i].length;j++){
            if(level[i][j]>=100&&level[i][j]<10000){
                entities.walls.push(new wall(graphics.full,j*40+floor((level[i][j]%100)/10)*20+20,i*40+(level[i][j]%10)*20+20,floor(level[i][j]/100),floor((level[i][j]%100)/10)*40+40,(level[i][j]%10)*40+40))
            }
            else if(level[i][j]>=-1000&&level[i][j]<=0){
                entities.walls.push(new wall(graphics.full,j*40+20,i*40+20,level[i][j],40,40))
            }
            else if(level[i][j]>=-10&&level[i][j]<0&&level[i][j] == -transition.spawn){
                entities.players.push(new player(graphics.full,j*40+20,i*40+20))
            }
        }
    }
	run={fore:[entities.players,entities.walls]};
}