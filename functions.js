function setupLayer(layer){
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
}
function setupScreen(base){
	screen.main=base.screen
	screen.active=base.details.active
	screen.fade=base.details.fade
	screen.trigger=false
}
function resetScreen(){
	for(i=0,li=screen.active.length;i<li;i++){
		for(j=0,lj=screen.active[i].length;j<lj;j++){
			screen.active[i][j]=0
		}
	}
	screen.trigger=false
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
		layer.stroke(40+entities.screens[game.enter.select].completeAnim*215,40+entities.screens[game.enter.select].completeAnim*160,40+entities.screens[game.enter.select].completeAnim*185)
		layer.strokeWeight(3+game.enter.anim*21)
		layer.fill(255,100,150)
		layer.push()
		layer.translate(game.enter.position.x*(1-game.enter.anim)+layer.width/2*game.enter.anim,game.enter.position.y*(1-game.enter.anim)+layer.height/2*game.enter.anim)
		layer.rect(0,0,60+game.enter.anim*420,60+game.enter.anim*420,3+game.enter.anim*21)
		layer.scale(25/screen.main[0].length/10*(1+game.enter.anim*7),25/screen.main.length/10*(1+game.enter.anim*7))
		layer.translate(-screen.main[0].length*10,-screen.main.length*10)
		for(i=0,li=screen.main.length;i<li;i++){
			for(j=0,lj=screen.main[i].length;j<lj;j++){
				if(legalMove(screen.main[i][j])){
					layer.stroke(0)
					layer.strokeWeight(3)
					if(i<screen.main.length-1&&legalMove(screen.main[i+1][j])){
						layer.line(10+j*20,10+i*20,10+j*20,30+i*20)
					}
					if(j<screen.main[i].length-1&&legalMove(screen.main[i][j+1])){
						layer.line(10+j*20,10+i*20,30+j*20,10+i*20)
					}
					if(screen.main[i][j]=='O'){
						layer.strokeWeight(12)
						layer.point(10+j*20,10+i*20)
					}
					if(screen.main[i][j]=='o'){
						layer.strokeWeight(8)
						layer.point(10+j*20,10+i*20)
					}
				}
			}
		}
		for(i=0,li=screen.main.length;i<li;i++){
			for(j=0,lj=screen.main[i].length;j<lj;j++){
				if(legalMove(screen.main[i][j])){
					layer.strokeWeight(4)
					if(i<screen.main.length-1&&i%2==0&&legalMove(screen.main[i+1][j])&&legalMove(screen.main[i+2][j])){
						layer.stroke(255,200,225,min(screen.fade[i][j],screen.fade[i+1][j],screen.fade[i+2][j]))
						layer.line(10+j*20,10+i*20,10+j*20,50+i*20)
					}
					if(j<screen.main[i].length-1&&j%2==0&&legalMove(screen.main[i][j+1])&&legalMove(screen.main[i][j+2])){
						layer.stroke(255,200,225,min(screen.fade[i][j],screen.fade[i][j+1],screen.fade[i][j+2]))
						layer.line(10+j*20,10+i*20,50+j*20,10+i*20)
					}
					if(screen.main[i][j]=='O'){
						layer.stroke(255,200,225,screen.fade[i][j])
						layer.strokeWeight(13)
						layer.point(10+j*20,10+i*20)
					}
					if(screen.main[i][j]=='o'){
						layer.stroke(255,200,225,screen.fade[i][j])
						layer.strokeWeight(9)
						layer.point(10+j*20,10+i*20)
					}
					if(screen.active[i][j]&&screen.fade[i][j]<1){
						screen.fade[i][j]=round(screen.fade[i][j]*10+1)/10;
					}
					if(!screen.active[i][j]&&screen.fade[i][j]>0){
						screen.fade[i][j]=round(screen.fade[i][j]*10-1)/10;
					}
				}
			}
		}
		layer.noStroke()
		for(i=0,li=screen.main.length;i<li;i++){
			for(j=0,lj=screen.main[i].length;j<lj;j++){
				switch(screen.main[i][j]){
					case '*':
						layer.fill(200)
						regPoly(layer,10+j*20,10+i*20,6,4,30)
					break
					case '1':
						layer.fill(255,50,100)
                        regTriangle(layer,10+j*20,10+i*20,5,-30)
                    break
                    case '2':
                        layer.fill(255,50,100)
                        regTriangle(layer,6+j*20,10+i*20,5,-30)
                        regTriangle(layer,14+j*20,10+i*20,5,-30)
                    break
                    case '3':
                        layer.fill(255,50,100)
                        regTriangle(layer,2+j*20,10+i*20,5,-30)
                        regTriangle(layer,10+j*20,10+i*20,5,-30)
                        regTriangle(layer,18+j*20,10+i*20,5,-30)
                    break
				}
			}
		}
		layer.pop()
	}
}
function regTriangle(layer,x,y,radius,direction){
	layer.triangle(x+sin(direction)*radius,y+cos(direction)*radius,x+sin(direction+120)*radius,y+cos(direction+120)*radius,x+sin(direction+240)*radius,y+cos(direction+240)*radius);
}
function regPoly(layer,x,y,sides,radius,direction){
	layer.beginShape()
	for(k=0,lk=sides;k<lk;k++){
		layer.vertex(x+sin(direction+k*360/sides)*radius,y+cos(direction+k*360/sides)*radius)
	}
	layer.endShape(CLOSE)
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
function legalMove(move){
	if(move=='.'||move=='O'||move=='o'||move=='*'){
		return true
	}
	else{
		return false
	}
}
function setMouse(){
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
	inputs.rel.x=(inputs.mouse.x-graphics.full.width/2)/stage.zoom+stage.focus.x
	inputs.rel.y=(inputs.mouse.y-graphics.full.height/2)/stage.zoom+stage.focus.y
}
function generateWorld(level){
	game.edge.x=level.main[0].length*80
	game.edge.y=level.main.length*80
	for(i=0,li=level.main.length;i<li;i++){
        for(j=0,lj=level.main[i].length;j<lj;j++){
            if(level.main[i][j]>=100&&level.main[i][j]<10000){
                entities.walls.push(new wall(graphics.full,j*80+floor((level.main[i][j]%100)/10)*40+40,i*80+(level.main[i][j]%10)*40+40,floor(level.main[i][j]/100),floor((level.main[i][j]%100)/10)*80+80,(level.main[i][j]%10)*80+80,level.id[i][j]))
            }
            else if(level.main[i][j]>=-1000&&level.main[i][j]<=0){
                entities.screens.push(new wall(graphics.full,j*80+40,i*80+40,level.main[i][j],60,60,level.id[i][j]))
            }
            else if(level.main[i][j]==2){
                entities.players.push(new player(graphics.full,j*80+40,i*80+40))
				stage.focus.x=j*80+40
				stage.focus.x=i*80+40
            }
        }
    }
	run={fore:[entities.players,entities.screens,entities.walls]};
}