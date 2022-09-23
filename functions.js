function setupLayer(layer){
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
}
function setupScreen(code){
	screen.main = code
	screen.active = []
	for(i=0,li=screen.main.length;i<li;i++){
		screen.active.push([])
		for(j=0,lj=screen.main[i].length;j<lj;j++){
			screen.active[i].push(0)
		}
	}
}
function displayTransition(layer,transition){
	layer.noStroke()
	layer.fill(0)
	if(transition.trigger){
		transition.anim=round(transition.anim+10+1)/10
		if(transition.anim>=1){
			transition.trigger = false;
			stage.scene = transition.scene;
		}
	}
	else if(transition.anim>0){
		transition.anim=round(transition.anim+10-1)/10
	}
}
function displayBasePlate(layer,color){
	layer.noStroke()
	layer.fill(color[0],color[1],color[2])
	layer.rect(game.edge.x/2,game.edge.y/2,game.edge.x+20,game.edge.y+20,10)
}
function displayInPuzzle(layer,game){
	if(game.enter.trigger&&game.enter.anim<1){
		game.enter.anim = round(game.enter.anim*10+1)/10
	}
	if(!game.enter.trigger&&game.enter.anim>0){
		game.enter.anim = round(game.enter.anim*10-1)/10
	}
	if(game.enter.anim>0){
		layer.stroke(40)
		layer.strokeWeight(3+game.enter.anim*21)
		layer.fill(255,100,150)
		layer.push()
		layer.translate(game.enter.position.x*(1-game.enter.anim)+layer.width/2*game.enter.anim,game.enter.position.y*(1-game.enter.anim)+layer.height/2*game.enter.anim)
		layer.rect(0,0,60+game.enter.anim*420,60+game.enter.anim*420,3+game.enter.anim*21)
		layer.scale(25/screen.main[0].length/10*(1+game.enter.anim*7),25/screen.main.length/10*(1+game.enter.anim*7))
		layer.translate(-screen.main[0].length*10,-screen.main.length*10)
		for(i=0,li=screen.main.length;i<li;i++){
			for(j=0,lj=screen.main[i].length;j<lj;j++){
				switch(screen.main[i][j]){
					case '.': case 'O': case 'o':
						layer.stroke(0)
						layer.strokeWeight(4)
						if(i<screen.main.length-1&&(screen.main[i+1][j]=='.'||screen.main[i+1][j]=='O'||screen.main[i+1][j]=='o')){
							layer.line(10+j*20,10+i*20,10+j*20,30+i*20)
						}
						if(j<screen.main[i].length-1&&(screen.main[i][j+1]=='.'||screen.main[i][j+1]=='O'||screen.main[i][j+1]=='o')){
							layer.line(10+j*20,10+i*20,30+j*20,10+i*20)
						}
						if(screen.main[i][j]=='O'){
							layer.strokeWeight(15)
							layer.point(10+j*20,10+i*20)
						}
						if(screen.main[i][j]=='o'){
							layer.strokeWeight(10)
							layer.point(10+j*20,10+i*20)
						}
					break
				}
			}
		}
		for(i=0,li=screen.main.length;i<li;i++){
			for(j=0,lj=screen.main[i].length;j<lj;j++){
				switch(screen.main[i][j]){
					case '.': case 'O': case 'o':
						layer.stroke(255,200,225)
						layer.strokeWeight(5)
						if(i<screen.main.length-1&&(screen.main[i+1][j]=='.'||screen.main[i+1][j]=='O'||screen.main[i+1][j]=='o')&&screen.active[i][j]&&screen.active[i+1][j]){
							layer.line(10+j*20,10+i*20,10+j*20,30+i*20)
						}
						if(j<screen.main[i].length-1&&(screen.main[i][j+1]=='.'||screen.main[i][j+1]=='O'||screen.main[i][j+1]=='o')&&screen.active[i][j]&&screen.active[i][j+1]){
							layer.line(10+j*20,10+i*20,30+j*20,10+i*20)
						}
						if(screen.main[i][j]=='O'&&screen.active[i][j]){
							layer.strokeWeight(16)
							layer.point(10+j*20,10+i*20)
						}
						if(screen.main[i][j]=='o'&&screen.active[i][j]){
							layer.strokeWeight(11)
							layer.point(10+j*20,10+i*20)
						}
					break
				}
			}
		}
		layer.pop()
	}
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
function pointInsideBox(point,box){
	if(point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2){
		return true
	}
	else{
		return false
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
	inputs.mouse.x=mouseX;
	inputs.mouse.y=mouseY;
	inputs.rel.x=(inputs.mouse.x-graphics.full.width/2)/stage.zoom+stage.focus.x;
	inputs.rel.y=(inputs.mouse.y-graphics.full.height/2)/stage.zoom+stage.focus.y;
}
function generateWorld(level){
	game.edge.x=level[0].length*80;
	game.edge.y=level.length*80;
	for(i=0,li=level.length;i<li;i++){
        for(j=0,lj=level[i].length;j<lj;j++){
            if(level[i][j]>=100&&level[i][j]<10000){
                entities.walls.push(new wall(graphics.full,j*80+floor((level[i][j]%100)/10)*40+40,i*80+(level[i][j]%10)*40+40,floor(level[i][j]/100),floor((level[i][j]%100)/10)*80+80,(level[i][j]%10)*80+80))
            }
            else if(level[i][j]>=-1000&&level[i][j]<=0){
                entities.screens.push(new wall(graphics.full,j*80+40,i*80+40,level[i][j],60,60))
            }
            else if(level[i][j]==2){
                entities.players.push(new player(graphics.full,j*80+40,i*80+40))
            }
        }
    }
	run={fore:[entities.players,entities.screens,entities.walls]};
}