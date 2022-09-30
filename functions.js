function setupLayer(layer){
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
}
function setupScreen(base){
	screen.main=base.screen.main
	screen.active=base.screen.active
	screen.fade=base.screen.fade
	screen.error=base.screen.error
	screen.flash=base.screen.flash
	screen.trigger=base.screen.trigger
	screen.start=base.screen.start
	screen.position=base.screen.position
	screen.symmetry=base.screen.symmetry
}
function generateScreens(screens){
	for(i=0,li=screens.main.length;i<li;i++){
		screens.complete.push(false)
		screens.trigger.push(false)
		screens.start.push([0,0])
		screens.position.push([0,0])
		screens.symmetry.push(0)
		screens.generate=[screens.active,screens.fade,screens.error,screens.flash]
		for(j=0,lj=screens.generate.length;j<lj;j++){
			screens.generate[j].push([])
			for(k=0,lk=screens.main[i].length;k<lk;k++){
				screens.generate[j][i].push([])
				for(l=0,ll=screens.main[i][k].length;l<ll;l++){
					screens.generate[j][i][k].push(0)
				}
			}
		}
	}
	for(i=0;i<13;i++){screens.symmetry[i+211]=1}
	for(i=0;i<14;i++){screens.symmetry[i+224]=2}
}
function resetScreen(){
	for(i=0,li=screen.active.length;i<li;i++){
		for(j=0,lj=screen.active[i].length;j<lj;j++){
			screen.active[i][j]=0
		}
	}
	screen.trigger=false
}
function generateScreenRemember(){
	screen.main=[]
	for(k=0,lk=screen.remember.length;k<lk;k++){
		screen.main.push([])
		for(l=0,ll=screen.remember[k].length;l<ll;l++){
			screen.main[k].push(screen.remember[k][l])
		}
	}
}
function generateRememberScreen(){
	screen.remember=[]
	for(k=0,lk=screen.main.length;k<lk;k++){
		screen.remember.push([])
		for(l=0,ll=screen.main[k].length;l<ll;l++){
			screen.remember[k].push(screen.main[k][l])
		}
	}
}
function generateGroup(){
	grouping.complete=false
	grouping.screen=[]
	for(a=0,la=screen.main.length/2-1;a<la;a++){
		grouping.screen.push([])
		for(b=0,lb=screen.main[a].length/2-1;b<lb;b++){
			grouping.screen[a].push(-1)
		}
	}
	grouping.screen[0][0]=0
	grouping.size=[0]
	grouping.star=[[0,0,0,0,0,0,0,0]]
	grouping.dot=[0]
	grouping.create=1
	while(!grouping.complete){
		grouping.complete=true
		grouping.add=true
		for(a=0,la=grouping.screen.length;a<la;a++){
			for(b=0,lb=grouping.screen[a].length;b<lb;b++){
				if(grouping.screen[a][b]<0){
					grouping.complete=false
					if(a>0&&grouping.screen[a-1][b]>=0&&screen.active[a*2][b*2+1]==0){
						grouping.screen[a][b]=grouping.screen[a-1][b]
						grouping.add=false
					}
					if(a<grouping.screen.length-1&&grouping.screen[a+1][b]>=0&&screen.active[a*2+2][b*2+1]==0){
						grouping.screen[a][b]=grouping.screen[a+1][b]
						grouping.add=false
					}
					if(b>0&&grouping.screen[a][b-1]>=0&&screen.active[a*2+1][b*2]==0){
						grouping.screen[a][b]=grouping.screen[a][b-1]
						grouping.add=false
					}
					if(b<grouping.screen[a].length-1&&grouping.screen[a][b+1]>=0&&screen.active[a*2+1][b*2+2]==0){
						grouping.screen[a][b]=grouping.screen[a][b+1]
						grouping.add=false
					}
				}
			}
		}
		if(grouping.add){
			for(a=0,la=grouping.screen.length;a<la;a++){
				for(b=0,lb=grouping.screen[a].length;b<lb;b++){
					if(grouping.screen[a][b]<0&&grouping.add){
						grouping.screen[a][b]=grouping.create
						grouping.create++
						grouping.add=false
						grouping.size.push(0)
						grouping.star.push([0,0,0,0,0,0,0,0])
						grouping.dot.push(0)
					}
				}
			}
		}
	}
}
function checkScreen(screen){
	screen.complete=true
	for(a=0,la=grouping.screen.length;a<la;a++){
		for(b=0,lb=grouping.screen[a].length;b<lb;b++){
			grouping.size[grouping.screen[a][b]]++
			if(colorNumber(screen.main[a*2+1][b*2+1])>=0){
				grouping.star[grouping.screen[a][b]][colorNumber(screen.main[a*2+1][b*2+1])]++
			}
			if(dotNumber(screen.main[a*2+1][b*2+1])!=0){
				grouping.dot[grouping.screen[a][b]]+=dotNumber(screen.main[a*2+1][b*2+1])
			}
		}
	}
	for(a=0,la=screen.main.length;a<la;a++){
		for(b=0,lb=screen.main[a].length;b<lb;b++){
			switch(screen.main[a][b]){
				case '*': case ',':
					if(screen.active[a][b]==0){
						screen.complete=false
						screen.error[a][b]=1
					}
				break
				case '1':
					if(!(screen.active[a-1][b]==1&&screen.active[a+1][b]==0&&screen.active[a][b-1]==0&&screen.active[a][b+1]==0||
						screen.active[a-1][b]==0&&screen.active[a+1][b]==1&&screen.active[a][b-1]==0&&screen.active[a][b+1]==0||
						screen.active[a-1][b]==0&&screen.active[a+1][b]==0&&screen.active[a][b-1]==1&&screen.active[a][b+1]==0||
						screen.active[a-1][b]==0&&screen.active[a+1][b]==0&&screen.active[a][b-1]==0&&screen.active[a][b+1]==1)){
						screen.complete=false
						screen.error[a][b]=1
					}
				break
				case '2':
					if(!(screen.active[a-1][b]==1&&screen.active[a+1][b]==1&&screen.active[a][b-1]==0&&screen.active[a][b+1]==0||
						screen.active[a-1][b]==0&&screen.active[a+1][b]==1&&screen.active[a][b-1]==1&&screen.active[a][b+1]==0||
						screen.active[a-1][b]==0&&screen.active[a+1][b]==0&&screen.active[a][b-1]==1&&screen.active[a][b+1]==1||
						screen.active[a-1][b]==1&&screen.active[a+1][b]==0&&screen.active[a][b-1]==0&&screen.active[a][b+1]==1||
						screen.active[a-1][b]==1&&screen.active[a+1][b]==0&&screen.active[a][b-1]==1&&screen.active[a][b+1]==0||
						screen.active[a-1][b]==0&&screen.active[a+1][b]==1&&screen.active[a][b-1]==0&&screen.active[a][b+1]==1)){
						screen.complete=false
						screen.error[a][b]=1
					}
				break
				case '3':
					if(!(screen.active[a-1][b]==1&&screen.active[a+1][b]==0&&screen.active[a][b-1]==1&&screen.active[a][b+1]==1||
						screen.active[a-1][b]==1&&screen.active[a+1][b]==1&&screen.active[a][b-1]==0&&screen.active[a][b+1]==1||
						screen.active[a-1][b]==1&&screen.active[a+1][b]==1&&screen.active[a][b-1]==1&&screen.active[a][b+1]==0||
						screen.active[a-1][b]==0&&screen.active[a+1][b]==1&&screen.active[a][b-1]==1&&screen.active[a][b+1]==1)){
						screen.complete=false
						screen.error[a][b]=1
					}
				break
				case 'a': case 'b': case 'c': case 'd': case 'e': case 'f': case 'g': case 'h':
					for(c=0,lc=grouping.screen.length;c<lc;c++){
						for(d=0,ld=grouping.screen[c].length;d<ld;d++){
							if(grouping.screen[c][d]==grouping.screen[(a-1)/2][(b-1)/2]&&screen.main[c*2+1][d*2+1]!=screen.main[a][b]&&screen.main[c*2+1][d*2+1]!=capital(screen.main[a][b])&&(
								screen.main[c*2+1][d*2+1]=='a'||screen.main[c*2+1][d*2+1]=='b'||screen.main[c*2+1][d*2+1]=='c'||screen.main[c*2+1][d*2+1]=='d'||
								screen.main[c*2+1][d*2+1]=='e'||screen.main[c*2+1][d*2+1]=='f'||screen.main[c*2+1][d*2+1]=='g'||screen.main[c*2+1][d*2+1]=='h'||
								screen.main[c*2+1][d*2+1]=='A'||screen.main[c*2+1][d*2+1]=='B'||screen.main[c*2+1][d*2+1]=='C'||screen.main[c*2+1][d*2+1]=='D'||
								screen.main[c*2+1][d*2+1]=='E'||screen.main[c*2+1][d*2+1]=='F'||screen.main[c*2+1][d*2+1]=='G'||screen.main[c*2+1][d*2+1]=='H')){
								screen.complete=false
								screen.error[a][b]=1
							}
						}
					}
				break
				case 'A': case 'B': case 'C': case 'D': case 'E': case 'F': case 'G': case 'H':
					if(grouping.star[grouping.screen[(a-1)/2][(b-1)/2]][colorNumber(screen.main[a][b])]!=2){
						screen.complete=false
						screen.error[a][b]=1
					}
				break
				case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p': case 'I': case 'J': case 'K': case 'L': case 'M': case 'N': case 'O': case 'P':
					if(grouping.dot[grouping.screen[(a-1)/2][(b-1)/2]]!=grouping.size[grouping.screen[(a-1)/2][(b-1)/2]]&&grouping.dot[grouping.screen[(a-1)/2][(b-1)/2]]!=0){
						screen.complete=false
						screen.error[a][b]=1
					}
				break
				case '#':
					if(!(screen.active[a-1][b]==1&&screen.active[a][b-1]==1||
						screen.active[a][b-1]==1&&screen.active[a+1][b]==1||
						screen.active[a+1][b]==1&&screen.active[a][b+1]==1||
						screen.active[a][b+1]==1&&screen.active[a-1][b]==1)){
						screen.complete=false
						screen.error[a][b]=1
					}
				break
			}
		}
	}
}
function clearPrevious(){
	if(inputs.previous.length>0){
		for(a=0,la=inputs.previous.length;a<la;a++){
			switch(screen.symmetry){
				case 1:
					if(screen.active[inputs.previous[a][0]][screen.main[0].length-1-inputs.previous[a][1]]!=screen.active[inputs.previous[a][0]][inputs.previous[a][1]]&&legalMove(screen.main[inputs.previous[a][0]][screen.main[0].length-1-inputs.previous[a][1]])){
						screen.active[inputs.previous[a][0]][screen.main[0].length-1-inputs.previous[a][1]]=screen.active[inputs.previous[a][0]][inputs.previous[a][1]]
					}
					else{
						resetScreen()
					}
				break
				case 2:
					if(screen.active[screen.main.length-1-inputs.previous[a][0]][screen.main[0].length-1-inputs.previous[a][1]]!=screen.active[inputs.previous[a][0]][inputs.previous[a][1]]&&legalMove(screen.main[screen.main.length-1-inputs.previous[a][0]][screen.main[0].length-1-inputs.previous[a][1]])){
						screen.active[screen.main.length-1-inputs.previous[a][0]][screen.main[0].length-1-inputs.previous[a][1]]=screen.active[inputs.previous[a][0]][inputs.previous[a][1]]
					}
					else{
						resetScreen()
					}
				break
			}
		}
		inputs.previous=[]
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
function displayBasePlate(color,color2){
	graphics.base=createGraphics(game.edge.x+200,game.edge.y+200)
	setupLayer(graphics.base)
	graphics.base.noStroke()
	graphics.base.fill(color[0],color[1],color[2])
	switch(stage.level){
		case 0:
			graphics.base.rect(game.edge.x/2+100,game.edge.y/2+500,game.edge.x+10,game.edge.y+10-800,10)
			graphics.base.fill(color[0],color[1],color[2])
			graphics.base.rect(380,380,250,250,10)
			graphics.base.rect(460,700,250,250,10)
			graphics.base.rect(1340,380,250,250,10)
			graphics.base.rect(1660,460,250,250,10)
			graphics.base.rect(1260,700,250,250,10)
			graphics.base.fill(color2[0],color2[1],color2[2])
		break
		case 1:
			graphics.base.rect(game.edge.x/2+100,game.edge.y/2+100,game.edge.x+10,game.edge.y+10,10)
		break
	}
}
function displayPath(layer,level,color){
	layer.stroke(color[0],color[1],color[2])
	layer.strokeWeight(60)
	for(i=0,li=level.path.length;i<li;i++){
        for(j=0,lj=level.path[i].length;j<lj;j++){
			if(i<level.path.length-1&&level.path[i][j]==0&&level.path[i+1][j]==0){
				layer.line(j*80+140,i*80+140,j*80+140,i*80+220)
			}
			if(j<level.path[i].length-1&&level.path[i][j]==0&&level.path[i][j+1]==0){
				layer.line(j*80+140,i*80+140,j*80+220,i*80+140)
			}
		}
	}
}
function displayScreen(layer,screen){
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
				if(screen.main[i][j]=='('){
					layer.strokeWeight(12)
					layer.point(10+j*20,10+i*20)
				}
				if(screen.main[i][j]==')'){
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
				if(screen.main[i][j]=='('&&screen.start[0] == i&&screen.start[1] == j){
					layer.stroke(255,200,225,screen.fade[i][j])
					layer.strokeWeight(13)
					layer.point(10+j*20,10+i*20)
				}
				if(screen.main[i][j]=='('&&(screen.symmetry==1&&screen.start[0] == i&&screen.start[1] == screen.main[0].length-1-j||screen.symmetry==2&&screen.start[0] == screen.main.length-1-i&&screen.start[1] == screen.main[0].length-1-j)){
					layer.stroke(255,200,225,screen.fade[i][j])
					layer.strokeWeight(10)
					layer.point(10+j*20,10+i*20)
				}
				if(screen.main[i][j]==')'){
					layer.stroke(255,200,225,screen.fade[i][j])
					layer.strokeWeight(9)
					layer.point(10+j*20,10+i*20)
				}
			}
		}
	}
	for(i=0,li=screen.main.length;i<li;i++){
		for(j=0,lj=screen.main[i].length;j<lj;j++){
			layer.noStroke()
			switch(screen.main[i][j]){
				case '*':
					layer.fill(errorLerp([200,200,200],screen.flash[i][j]))
					regPoly(layer,10+j*20,10+i*20,6,4,30)
				break
				case '1':
					layer.fill(errorLerp([255,50,100],screen.flash[i][j]))
					regTriangle(layer,10+j*20,10+i*20,5,-30)
				break
				case '2':
					layer.fill(errorLerp([255,50,100],screen.flash[i][j]))
					regTriangle(layer,6+j*20,10+i*20,5,-30)
					regTriangle(layer,14+j*20,10+i*20,5,-30)
				break
				case '3':
					layer.fill(errorLerp([255,50,100],screen.flash[i][j]))
					regTriangle(layer,2+j*20,10+i*20,5,-30)
					regTriangle(layer,10+j*20,10+i*20,5,-30)
					regTriangle(layer,18+j*20,10+i*20,5,-30)
				break
				case 'a':
					layer.fill(errorLerp([240,240,240],screen.flash[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'b':
					layer.fill(errorLerp([40,40,40],screen.flash[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'c':
					layer.fill(errorLerp([200,175,165],screen.flash[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'd':
					layer.fill(errorLerp([130,110,180],screen.flash[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'e':
					layer.fill(errorLerp([120,120,90],screen.flash[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'f':
					layer.fill(errorLerp([140,80,90],screen.flash[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'g':
					layer.fill(errorLerp([50,65,125],screen.flash[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'h':
					layer.fill(errorLerp([165,190,255],screen.flash[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'A':
					layer.fill(errorLerp([240,240,240],screen.flash[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'B':
					layer.fill(errorLerp([40,40,40],screen.flash[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'C':
					layer.fill(errorLerp([200,175,165],screen.flash[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'D':
					layer.fill(errorLerp([130,110,180],screen.flash[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'E':
					layer.fill(errorLerp([120,120,90],screen.flash[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'F':
					layer.fill(errorLerp([140,80,90],screen.flash[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'G':
					layer.fill(errorLerp([50,65,125],screen.flash[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'H':
					layer.fill(errorLerp([165,190,255],screen.flash[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
					dots(layer,10+j*20,10+i*20,dotNumber(screen.main[i][j]),0,screen.flash[i][j])
				break
				case 'I': case 'J': case 'K': case 'L': case 'M': case 'N': case 'O': case 'P':
					minusDots(layer,10+j*20,10+i*20,-dotNumber(screen.main[i][j]),0,screen.flash[i][j])
				break
				case '#':
					layer.fill(errorLerp([250,215,235],screen.flash[i][j]))
					layer.ellipse(10+j*20,10+i*20,20,20)
					layer.fill(255,100,150)
					layer.ellipse(12+j*20,8+i*20,16,16)
				break
				case '$':
					layer.stroke(190,65,85)
					layer.strokeWeight(4);
					for(k=0;k<3;k++){
						layer.line(10+j*20,10+i*20,10+j*20+sin(k*120)*8,10+i*20-cos(k*120)*8)
					}
				break
			}
		}
	}
}
function updateScreen(screen){
	for(i=0,li=screen.main.length;i<li;i++){
		for(j=0,lj=screen.main[i].length;j<lj;j++){
			if(legalMove(screen.main[i][j])){
				if(screen.active[i][j]==1&&screen.fade[i][j]<1){
					screen.fade[i][j]=round(screen.fade[i][j]*10+1)/10;
					k=1
				}
				if(screen.active[i][j]==0&&screen.fade[i][j]>0){
					screen.fade[i][j]=round(screen.fade[i][j]*10-1)/10;
					k=1
				}
			}
			if(screen.error[i][j]==1&&screen.flash[i][j]<1){
				screen.flash[i][j]=round(screen.flash[i][j]*10+1)/10;
				k=1
			}
			if(screen.error[i][j]==0&&screen.flash[i][j]>0){
				screen.flash[i][j]=round(screen.flash[i][j]*10-1)/10;
				k=1
			}
			if(screen.error[i][j]==1&&screen.flash[i][j]>=1){
				screen.error[i][j]=0
				k=1
			}
		}
	}
}
function displayInScreen(layer,game){
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
		layer.rect(0,0,70+game.enter.anim*410,70+game.enter.anim*410,3+game.enter.anim*21)
		layer.scale(min(30/screen.main[0].length/10*(1+game.enter.anim*41/7),30/screen.main.length/10*(1+game.enter.anim*41/7)))
		layer.translate(-screen.main[0].length*10,-screen.main.length*10)
		displayScreen(layer,screen)
		updateScreen(screen)
		layer.pop()
	}
}
function regTriangle(layer,x,y,radius,direction){
	layer.triangle(x+sin(direction)*radius,y+cos(direction)*radius,x+sin(direction+120)*radius,y+cos(direction+120)*radius,x+sin(direction+240)*radius,y+cos(direction+240)*radius);
}
function regPoly(layer,x,y,sides,radius,direction){
	layer.beginShape()
	for(k=0;k<sides;k++){
		layer.vertex(x+sin(direction+k*360/sides)*radius,y+cos(direction+k*360/sides)*radius)
	}
	layer.endShape(CLOSE)
}
function regStar(layer,x,y,sides,radius,direction){
	layer.beginShape()
	for(k=0;k<sides*2;k++){
		layer.vertex(x+sin(direction+k*180/sides)*radius[k%2],y+cos(direction+k*180/sides)*radius[k%2])
	}
	layer.endShape(CLOSE)
}
function dots(layer,x,y,amount,direction,flash){
	for(k=0;k<amount;k++){
		layer.fill(errorLerp(dotcolor[(k+(amount-1)*amount/2)%8],flash))
		layer.ellipse(x+cos(direction+k*360/amount)*sqrt(amount-1)*4,y+sin(direction+k*360/amount)*sqrt(amount-1)*4,6,6)
	}
}
function minusDots(layer,x,y,amount,direction,flash){
	layer.strokeWeight(1.5)
	layer.noFill()
	for(k=0;k<amount;k++){
		layer.stroke(errorLerp([255-dotcolor[(k+(amount-1)*amount/2)%8][0],255-dotcolor[(k+(amount-1)*amount/2)%8][1],255-dotcolor[(k+(amount-1)*amount/2)%8][2]],flash))
		layer.ellipse(x+cos(direction+k*360/amount)*sqrt(amount-1)*4,y+sin(direction+k*360/amount)*sqrt(amount-1)*4,4.5,4.5)
	}
}
function errorLerp(color,amount){
	return [color[0]*(1-amount)+240*amount,color[1]*(1-amount),color[2]*(1-amount)]
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
	if(move=='.'||move=='('||move==')'||move=='*'||move==','){
		return true
	}
	else{
		return false
	}
}
function capital(letter){
	switch(letter){
		case 'a': return 'A'; break
		case 'b': return 'B'; break
		case 'c': return 'C'; break
		case 'd': return 'D'; break
		case 'e': return 'E'; break
		case 'f': return 'F'; break
		case 'g': return 'G'; break
		case 'h': return 'H'; break
		case 'A': return 'a'; break
		case 'B': return 'b'; break
		case 'C': return 'c'; break
		case 'D': return 'd'; break
		case 'E': return 'e'; break
		case 'F': return 'f'; break
		case 'G': return 'g'; break
		case 'H': return 'h'; break
	}
	return -1
}
function colorNumber(letter){
	switch(letter){
		case 'a': case 'A': return 0; break
		case 'b': case 'B': return 1; break
		case 'c': case 'C': return 2; break
		case 'd': case 'D': return 3; break
		case 'e': case 'E': return 4; break
		case 'f': case 'F': return 5; break
		case 'g': case 'G': return 6; break
		case 'h': case 'H': return 7; break
	}
	return -1
}
function dotNumber(letter){
	switch(letter){
		case 'i': return 1; break
		case 'j': return 2; break
		case 'k': return 3; break
		case 'l': return 4; break
		case 'm': return 5; break
		case 'n': return 6; break
		case 'o': return 7; break
		case 'p': return 8; break
		case 'I': return -1; break
		case 'J': return -2; break
		case 'K': return -3; break
		case 'L': return -4; break
		case 'M': return -5; break
		case 'N': return -6; break
		case 'O': return -7; break
		case 'P': return -8; break
	}
	return 0
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
	for(m=0,lm=level.main.length;m<lm;m++){
        for(n=0,ln=level.main[m].length;n<ln;n++){
            if(level.main[m][n]>=100&&level.main[m][n]<10000&&(floor(level.main[m][n]/100)==6||floor(level.main[m][n]/100)==13)){
                entities.base.push(new wall(graphics.full,n*80+floor((level.main[m][n]%100)/10)*40+40,m*80+(level.main[m][n]%10)*40+40,floor(level.main[m][n]/100),floor((level.main[m][n]%100)/10)*80+80,(level.main[m][n]%10)*80+80,level.id[m][n]))
            }
            else if(level.main[m][n]>=100&&level.main[m][n]<10000){
                entities.walls.push(new wall(graphics.full,n*80+floor((level.main[m][n]%100)/10)*40+40,m*80+(level.main[m][n]%10)*40+40,floor(level.main[m][n]/100),floor((level.main[m][n]%100)/10)*80+80,(level.main[m][n]%10)*80+80,level.id[m][n]))
            }
            else if(level.main[m][n]>=-1000&&level.main[m][n]<=0){
                entities.screens.push(new wall(graphics.full,n*80+40,m*80+40,level.main[m][n],70,70,level.id[m][n]))
            }
            else if(level.main[m][n]==2){
                entities.players.push(new player(graphics.full,n*80+40,m*80+40))
				stage.focus.x=n*80+40
				stage.focus.y=m*80+40
            }
        }
    }
	run={fore:[entities.base,entities.players,entities.screens,entities.walls]};
}