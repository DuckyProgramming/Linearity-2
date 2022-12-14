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
	screen.disable=base.screen.disable
	screen.deactivate=base.screen.deactivate
	screen.trigger=base.screen.trigger
	screen.start=base.screen.start
	screen.position=base.screen.position
	screen.symmetry=base.screen.symmetry
}
function setupPuzzleId(screens){
	for(a=0,la=screens.length;a<la;a++){
		if(screens[a].type==-628){
			game.puzzle.id[0]=a
		}
		if(screens[a].type==-629){
			game.puzzle.id[1]=a
		}
		if(screens[a].type==-630){
			game.puzzle.id[2]=a
		}
		if(screens[a].type==-631){
			game.puzzle.id[3]=a
		}
	}
}
function generateScreens(screens){
	for(i=0,li=screens.main.length;i<li;i++){
		screens.complete.push(false)
		screens.trigger.push(false)
		screens.start.push([0,0])
		screens.position.push([0,0])
		screens.symmetry.push(0)
		screens.generate=[screens.active,screens.fade,screens.error,screens.flash,screens.disable,screens.deactivate]
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
	for(i=0;i<8;i++){screens.symmetry[i+316]=2}
	for(i=0;i<5;i++){screens.symmetry[i+325]=2}
	for(i=0;i<23;i++){screens.symmetry[i+383]=2}
	for(i=0;i<11;i++){screens.symmetry[i+539]=1}
	for(i=0;i<21;i++){screens.symmetry[i+607]=2}
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
	grouping.groups=1
	grouping.size=[0]
	grouping.star=[[0,0,0,0,0,0,0,0]]
	grouping.dot=[0]
	grouping.shape=[[]]
	grouping.shapes=[[]]
	grouping.Nshapes=[[]]
	grouping.all=[]
	for(a=0,la=screen.main.length/2-1;a<la;a++){
		grouping.screen.push([])
		for(b=0,lb=screen.main[a].length/2-1;b<lb;b++){
			grouping.screen[a].push(-1)
		}
	}
	grouping.screen[0][0]=0
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
						grouping.groups++
						grouping.add=false
						grouping.size.push(0)
						grouping.star.push([0,0,0,0,0,0,0,0])
						grouping.dot.push(0)
						grouping.shape.push([])
						grouping.shapes.push([])
						grouping.Nshapes.push([])
					}
				}
			}
		}
	}
}
function checkScreen(screen){
	for(a=0,la=grouping.size.length;a<la;a++){
		grouping.size[a]=0
	}
	for(a=0,la=grouping.star.length;a<la;a++){
		for(b=0,lb=grouping.star[a].length;b<lb;b++){
			grouping.star[a][b]=0
		}
	}
	for(a=0,la=grouping.dot.length;a<la;a++){
		grouping.dot[a]=0
	}
	for(a=0,la=grouping.shape.length;a<la;a++){
		grouping.shape[a]=[]
	}
	for(a=0,la=grouping.shapes.length;a<la;a++){
		grouping.shapes[a]=[]
	}
	for(a=0,la=grouping.Nshapes.length;a<la;a++){
		grouping.Nshapes[a]=[]
	}
	screen.complete=true
	for(a=0,la=grouping.screen.length;a<la;a++){
		for(b=0,lb=grouping.screen[a].length;b<lb;b++){
			grouping.size[grouping.screen[a][b]]++
			grouping.shape[grouping.screen[a][b]].push([a,b])
			grouping.all.push([a,b])
			if(colorNumber(screen.main[a*2+1][b*2+1])>=0){
				grouping.star[grouping.screen[a][b]][colorNumber(screen.main[a*2+1][b*2+1])]++
			}
			if(dotNumber(screen.main[a*2+1][b*2+1])!=0){
				grouping.dot[grouping.screen[a][b]]+=dotNumber(screen.main[a*2+1][b*2+1])
			}  
			if(blockId(screen.main[a*2+1][b*2+1])>0){
				grouping.shapes[grouping.screen[a][b]].push(block(blockId(screen.main[a*2+1][b*2+1])))
			}
			if(blockId(screen.main[a*2+1][b*2+1])<0){
				grouping.Nshapes[grouping.screen[a][b]].push(block(-blockId(screen.main[a*2+1][b*2+1])))
			}
		}
	}
	for(a=0;a<grouping.groups;a++){
		if(grouping.shapes[a].length>0&&grouping.Nshapes[a].length==0){
			grouping.add=false
			if(grouping.shapes[a].length==1){
				for(i1=0,li1=grouping.shape[a].length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.shape[a][i3][0]==grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]&&grouping.shape[a][i3][1]==grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					grouping.works=true
					for(i2=0,li2=grouping.check.length;i2<li2;i2++){
						if(grouping.check[i2]==1){
							grouping.works=false
						}
					}
					if(grouping.works&&!grouping.cancel){
						grouping.add=true
					}
				}
			}
			else if(grouping.shapes[a].length==2){
				for(i1=0,li1=grouping.shape[a].length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.shape[a][i3][0]==grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]&&grouping.shape[a][i3][1]==grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					if(!grouping.cancel){
						grouping.checkRemember=[]//remember existing blocks
						for(i2=0,li2=grouping.check.length;i2<li2;i2++){
							grouping.checkRemember.push(grouping.check[i2])
						}
						for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){//every position for second piece
							if(grouping.checkRemember[i2]==1){
								grouping.check=[]//copy existing blocks
								for(i3=0,li3=grouping.checkRemember.length;i3<li3;i3++){
									grouping.check.push(grouping.checkRemember[i3])
								}
								grouping.cancel2=false
								for(i3=0,li3=grouping.shapes[a][1].length;i3<li3;i3++){//every piece of shape
									grouping.block=false
									for(i4=0,li4=grouping.shape[a].length;i4<li4;i4++){//cross-check piece position with group position
										if(grouping.shape[a][i4][0]==grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]&&grouping.shape[a][i4][1]==grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]){
											grouping.check[i4]=0
											grouping.block=true
											if(grouping.checkRemember[i4]==0){
												grouping.cancel2=true
											}
										}
									}
									if(grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]>=grouping.screen.length||grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]>=grouping.screen[0].length||!grouping.block){
										grouping.cancel2=true
									}
								}
								grouping.works=true
								for(i3=0,li3=grouping.check.length;i3<li3;i3++){
									if(grouping.check[i3]==1){
										grouping.works=false
									}
								}
								if(grouping.works&&!grouping.cancel&&!grouping.cancel2){
									grouping.add=true
								}
							}
						}
					}
				}
			}
			else if(grouping.shapes[a].length==3){
				for(i1=0,li1=grouping.shape[a].length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.shape[a][i3][0]==grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]&&grouping.shape[a][i3][1]==grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					if(!grouping.cancel){
						grouping.checkRemember=[]//remember existing blocks
						for(i2=0,li2=grouping.check.length;i2<li2;i2++){
							grouping.checkRemember.push(grouping.check[i2])
						}
						for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){//every position for second piece
							if(grouping.checkRemember[i2]==1){
								grouping.check=[]//copy existing blocks
								for(i3=0,li3=grouping.checkRemember.length;i3<li3;i3++){
									grouping.check.push(grouping.checkRemember[i3])
								}
								grouping.cancel2=false
								for(i3=0,li3=grouping.shapes[a][1].length;i3<li3;i3++){//every piece of shape
									grouping.block=false
									for(i4=0,li4=grouping.shape[a].length;i4<li4;i4++){//cross-check piece position with group position
										if(grouping.shape[a][i4][0]==grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]&&grouping.shape[a][i4][1]==grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]){
											grouping.check[i4]=0
											grouping.block=true
											if(grouping.checkRemember[i4]==0){
												grouping.cancel2=true
											}
										}
									}
									if(grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]>=grouping.screen.length||grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]>=grouping.screen[0].length||!grouping.block){
										grouping.cancel2=true
									}
								}
								if(!grouping.cancel2){
									grouping.checkRemember2=[]//remember existing blocks
									for(i3=0,li3=grouping.check.length;i3<li3;i3++){
										grouping.checkRemember2.push(grouping.check[i3])
									}
									for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//every position for third piece
										if(grouping.checkRemember2[i3]==1){
											grouping.check=[]//copy existing blocks
											for(i4=0,li4=grouping.checkRemember2.length;i4<li4;i4++){
												grouping.check.push(grouping.checkRemember2[i4])
											}
											grouping.cancel3=false
											for(i4=0,li4=grouping.shapes[a][2].length;i4<li4;i4++){//every piece of shape
												grouping.block=false
												for(i5=0,li5=grouping.shape[a].length;i5<li5;i5++){//cross-check piece position with group position
													if(grouping.shape[a][i5][0]==grouping.shapes[a][2][i4][0]+grouping.shape[a][i3][0]&&grouping.shape[a][i5][1]==grouping.shapes[a][2][i4][1]+grouping.shape[a][i3][1]){
														grouping.check[i5]=0
														grouping.block=true
														if(grouping.checkRemember[i5]==0){
															grouping.cancel3=true
														}
													}
												}
												if(grouping.shapes[a][2][i4][0]+grouping.shape[a][i3][0]>=grouping.screen.length||grouping.shapes[a][2][i4][1]+grouping.shape[a][i3][1]>=grouping.screen[0].length||!grouping.block){
													grouping.cancel3=true
												}
											}
											grouping.works=true
											for(i4=0,li4=grouping.check.length;i4<li4;i4++){
												if(grouping.check[i4]==1){
													grouping.works=false
												}
											}
											if(grouping.works&&!grouping.cancel&&!grouping.cancel2&&!grouping.cancel3){
												grouping.add=true
											}
										}
									}
								}
							}
						}
					}
				}
			}
			else if(grouping.shapes[a].length==4){
				for(i1=0,li1=grouping.shape[a].length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.shape[a][i3][0]==grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]&&grouping.shape[a][i3][1]==grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					if(!grouping.cancel){
						grouping.checkRemember=[]//remember existing blocks
						for(i2=0,li2=grouping.check.length;i2<li2;i2++){
							grouping.checkRemember.push(grouping.check[i2])
						}
						for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){//every position for second piece
							if(grouping.checkRemember[i2]==1){
								grouping.check=[]//copy existing blocks
								for(i3=0,li3=grouping.checkRemember.length;i3<li3;i3++){
									grouping.check.push(grouping.checkRemember[i3])
								}
								grouping.cancel2=false
								for(i3=0,li3=grouping.shapes[a][1].length;i3<li3;i3++){//every piece of shape
									grouping.block=false
									for(i4=0,li4=grouping.shape[a].length;i4<li4;i4++){//cross-check piece position with group position
										if(grouping.shape[a][i4][0]==grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]&&grouping.shape[a][i4][1]==grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]){
											grouping.check[i4]=0
											grouping.block=true
											if(grouping.checkRemember[i4]==0){
												grouping.cancel2=true
											}
										}
									}
									if(grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]>=grouping.screen.length||grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]>=grouping.screen[0].length||!grouping.block){
										grouping.cancel2=true
									}
								}
								if(!grouping.cancel2){
									grouping.checkRemember2=[]//remember existing blocks
									for(i3=0,li3=grouping.check.length;i3<li3;i3++){
										grouping.checkRemember2.push(grouping.check[i3])
									}
									for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//every position for third piece
										if(grouping.checkRemember2[i3]==1){
											grouping.check=[]//copy existing blocks
											for(i4=0,li4=grouping.checkRemember2.length;i4<li4;i4++){
												grouping.check.push(grouping.checkRemember2[i4])
											}
											grouping.cancel3=false
											for(i4=0,li4=grouping.shapes[a][2].length;i4<li4;i4++){//every piece of shape
												grouping.block=false
												for(i5=0,li5=grouping.shape[a].length;i5<li5;i5++){//cross-check piece position with group position
													if(grouping.shape[a][i5][0]==grouping.shapes[a][2][i4][0]+grouping.shape[a][i3][0]&&grouping.shape[a][i5][1]==grouping.shapes[a][2][i4][1]+grouping.shape[a][i3][1]){
														grouping.check[i5]=0
														grouping.block=true
														if(grouping.checkRemember[i5]==0){
															grouping.cancel3=true
														}
													}
												}
												if(grouping.shapes[a][2][i4][0]+grouping.shape[a][i3][0]>=grouping.screen.length||grouping.shapes[a][2][i4][1]+grouping.shape[a][i3][1]>=grouping.screen[0].length||!grouping.block){
													grouping.cancel3=true
												}
											}
											if(!grouping.cancel3){
												grouping.checkRemember3=[]//remember existing blocks
												for(i4=0,li4=grouping.check.length;i4<li4;i4++){
													grouping.checkRemember3.push(grouping.check[i4])
												}
												for(i4=0,li4=grouping.shape[a].length;i4<li4;i4++){//every position for fourth piece
													if(grouping.checkRemember3[i4]==1){
														grouping.check=[]//copy existing blocks
														for(i5=0,li5=grouping.checkRemember3.length;i5<li5;i5++){
															grouping.check.push(grouping.checkRemember3[i5])
														}
														grouping.cancel4=false
														for(i5=0,li5=grouping.shapes[a][3].length;i5<li5;i5++){//every piece of shape
															grouping.block=false
															for(i6=0,li6=grouping.shape[a].length;i6<li6;i6++){//cross-check piece position with group position
																if(grouping.shape[a][i6][0]==grouping.shapes[a][3][i5][0]+grouping.shape[a][i4][0]&&grouping.shape[a][i6][1]==grouping.shapes[a][3][i5][1]+grouping.shape[a][i4][1]){
																	grouping.check[i6]=0
																	grouping.block=true
																	if(grouping.checkRemember[i6]==0){
																		grouping.cancel4=true
																	}
																}
															}
															if(grouping.shapes[a][3][i5][0]+grouping.shape[a][i4][0]>=grouping.screen.length||grouping.shapes[a][3][i5][1]+grouping.shape[a][i4][1]>=grouping.screen[0].length||!grouping.block){
																grouping.cancel4=true
															}
														}
														grouping.works=true
														for(i5=0,li5=grouping.check.length;i5<li5;i5++){
															if(grouping.check[i5]==1){
																grouping.works=false
															}
														}
														if(grouping.works&&!grouping.cancel&&!grouping.cancel2&&!grouping.cancel3&&!grouping.cancel4){
															grouping.add=true
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			else if(grouping.shapes[a].length==5){
				for(i1=0,li1=grouping.shape[a].length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.shape[a][i3][0]==grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]&&grouping.shape[a][i3][1]==grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					if(!grouping.cancel){
						grouping.checkRemember=[]//remember existing blocks
						for(i2=0,li2=grouping.check.length;i2<li2;i2++){
							grouping.checkRemember.push(grouping.check[i2])
						}
						for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){//every position for second piece
							if(grouping.checkRemember[i2]==1){
								grouping.check=[]//copy existing blocks
								for(i3=0,li3=grouping.checkRemember.length;i3<li3;i3++){
									grouping.check.push(grouping.checkRemember[i3])
								}
								grouping.cancel2=false
								for(i3=0,li3=grouping.shapes[a][1].length;i3<li3;i3++){//every piece of shape
									grouping.block=false
									for(i4=0,li4=grouping.shape[a].length;i4<li4;i4++){//cross-check piece position with group position
										if(grouping.shape[a][i4][0]==grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]&&grouping.shape[a][i4][1]==grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]){
											grouping.check[i4]=0
											grouping.block=true
											if(grouping.checkRemember[i4]==0){
												grouping.cancel2=true
											}
										}
									}
									if(grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]>=grouping.screen.length||grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]>=grouping.screen[0].length||!grouping.block){
										grouping.cancel2=true
									}
								}
								if(!grouping.cancel2){
									grouping.checkRemember2=[]//remember existing blocks
									for(i3=0,li3=grouping.check.length;i3<li3;i3++){
										grouping.checkRemember2.push(grouping.check[i3])
									}
									for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//every position for third piece
										if(grouping.checkRemember2[i3]==1){
											grouping.check=[]//copy existing blocks
											for(i4=0,li4=grouping.checkRemember2.length;i4<li4;i4++){
												grouping.check.push(grouping.checkRemember2[i4])
											}
											grouping.cancel3=false
											for(i4=0,li4=grouping.shapes[a][2].length;i4<li4;i4++){//every piece of shape
												grouping.block=false
												for(i5=0,li5=grouping.shape[a].length;i5<li5;i5++){//cross-check piece position with group position
													if(grouping.shape[a][i5][0]==grouping.shapes[a][2][i4][0]+grouping.shape[a][i3][0]&&grouping.shape[a][i5][1]==grouping.shapes[a][2][i4][1]+grouping.shape[a][i3][1]){
														grouping.check[i5]=0
														grouping.block=true
														if(grouping.checkRemember[i5]==0){
															grouping.cancel3=true
														}
													}
												}
												if(grouping.shapes[a][2][i4][0]+grouping.shape[a][i3][0]>=grouping.screen.length||grouping.shapes[a][2][i4][1]+grouping.shape[a][i3][1]>=grouping.screen[0].length||!grouping.block){
													grouping.cancel3=true
												}
											}
											if(!grouping.cancel3){
												grouping.checkRemember3=[]//remember existing blocks
												for(i4=0,li4=grouping.check.length;i4<li4;i4++){
													grouping.checkRemember3.push(grouping.check[i4])
												}
												for(i4=0,li4=grouping.shape[a].length;i4<li4;i4++){//every position for fourth piece
													if(grouping.checkRemember3[i4]==1){
														grouping.check=[]//copy existing blocks
														for(i5=0,li5=grouping.checkRemember3.length;i5<li5;i5++){
															grouping.check.push(grouping.checkRemember3[i5])
														}
														grouping.cancel4=false
														for(i5=0,li5=grouping.shapes[a][3].length;i5<li5;i5++){//every piece of shape
															grouping.block=false
															for(i6=0,li6=grouping.shape[a].length;i6<li6;i6++){//cross-check piece position with group position
																if(grouping.shape[a][i6][0]==grouping.shapes[a][3][i5][0]+grouping.shape[a][i4][0]&&grouping.shape[a][i6][1]==grouping.shapes[a][3][i5][1]+grouping.shape[a][i4][1]){
																	grouping.check[i6]=0
																	grouping.block=true
																	if(grouping.checkRemember[i6]==0){
																		grouping.cancel4=true
																	}
																}
															}
															if(grouping.shapes[a][3][i5][0]+grouping.shape[a][i4][0]>=grouping.screen.length||grouping.shapes[a][3][i5][1]+grouping.shape[a][i4][1]>=grouping.screen[0].length||!grouping.block){
																grouping.cancel4=true
															}
														}
														if(!grouping.cancel4){
															grouping.checkRemember4=[]//remember existing blocks
															for(i5=0,li5=grouping.check.length;i5<li5;i5++){
																grouping.checkRemember4.push(grouping.check[i5])
															}
															for(i5=0,li5=grouping.shape[a].length;i5<li5;i5++){//every position for fifth piece
																if(grouping.checkRemember4[i5]==1){
																	grouping.check=[]//copy existing blocks
																	for(i6=0,li6=grouping.checkRemember4.length;i6<li6;i6++){
																		grouping.check.push(grouping.checkRemember4[i6])
																	}
																	grouping.cancel5=false
																	for(i6=0,li6=grouping.shapes[a][4].length;i6<li6;i6++){//every piece of shape
																		grouping.block=false
																		for(i7=0,li7=grouping.shape[a].length;i7<li7;i7++){//cross-check piece position with group position
																			if(grouping.shape[a][i7][0]==grouping.shapes[a][4][i6][0]+grouping.shape[a][i5][0]&&grouping.shape[a][i7][1]==grouping.shapes[a][4][i6][1]+grouping.shape[a][i5][1]){
																				grouping.check[i7]=0
																				grouping.block=true
																				if(grouping.checkRemember[i7]==0){
																					grouping.cancel5=true
																				}
																			}
																		}
																		if(grouping.shapes[a][4][i6][0]+grouping.shape[a][i5][0]>=grouping.screen.length||grouping.shapes[a][4][i6][1]+grouping.shape[a][i5][1]>=grouping.screen[0].length||!grouping.block){
																			grouping.cancel5=true
																		}
																	}
																	grouping.works=true
																	for(i6=0,li6=grouping.check.length;i6<li6;i6++){
																		if(grouping.check[i6]==1){
																			grouping.works=false
																		}
																	}
																	if(grouping.works&&!grouping.cancel&&!grouping.cancel2&&!grouping.cancel3&&!grouping.cancel4&&!grouping.cancel5){
																		grouping.add=true
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			else if(grouping.shapes[a].length==6){
				for(i1=0,li1=grouping.shape[a].length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.shape[a][i3][0]==grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]&&grouping.shape[a][i3][1]==grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.shape[a][i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.shape[a][i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					if(!grouping.cancel){
						grouping.checkRemember=[]//remember existing blocks
						for(i2=0,li2=grouping.check.length;i2<li2;i2++){
							grouping.checkRemember.push(grouping.check[i2])
						}
						for(i2=0,li2=grouping.shape[a].length;i2<li2;i2++){//every position for second piece
							if(grouping.checkRemember[i2]==1){
								grouping.check=[]//copy existing blocks
								for(i3=0,li3=grouping.checkRemember.length;i3<li3;i3++){
									grouping.check.push(grouping.checkRemember[i3])
								}
								grouping.cancel2=false
								for(i3=0,li3=grouping.shapes[a][1].length;i3<li3;i3++){//every piece of shape
									grouping.block=false
									for(i4=0,li4=grouping.shape[a].length;i4<li4;i4++){//cross-check piece position with group position
										if(grouping.shape[a][i4][0]==grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]&&grouping.shape[a][i4][1]==grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]){
											grouping.check[i4]=0
											grouping.block=true
											if(grouping.checkRemember[i4]==0){
												grouping.cancel2=true
												break
											}
										}
									}
									if(grouping.cancel2){
										break
									}
									if(grouping.shapes[a][1][i3][0]+grouping.shape[a][i2][0]>=grouping.screen.length||grouping.shapes[a][1][i3][1]+grouping.shape[a][i2][1]>=grouping.screen[0].length||!grouping.block){
										grouping.cancel2=true
										break
									}
								}
								if(!grouping.cancel2){
									grouping.checkRemember2=[]//remember existing blocks
									for(i3=0,li3=grouping.check.length;i3<li3;i3++){
										grouping.checkRemember2.push(grouping.check[i3])
									}
									for(i3=0,li3=grouping.shape[a].length;i3<li3;i3++){//every position for third piece
										if(grouping.checkRemember2[i3]==1){
											grouping.check=[]//copy existing blocks
											for(i4=0,li4=grouping.checkRemember2.length;i4<li4;i4++){
												grouping.check.push(grouping.checkRemember2[i4])
											}
											grouping.cancel3=false
											for(i4=0,li4=grouping.shapes[a][2].length;i4<li4;i4++){//every piece of shape
												grouping.block=false
												for(i5=0,li5=grouping.shape[a].length;i5<li5;i5++){//cross-check piece position with group position
													if(grouping.shape[a][i5][0]==grouping.shapes[a][2][i4][0]+grouping.shape[a][i3][0]&&grouping.shape[a][i5][1]==grouping.shapes[a][2][i4][1]+grouping.shape[a][i3][1]){
														grouping.check[i5]=0
														grouping.block=true
														if(grouping.checkRemember[i5]==0){
															grouping.cancel3=true
															break
														}
													}
												}
												if(grouping.cancel3){
													break
												}
												if(grouping.shapes[a][2][i4][0]+grouping.shape[a][i3][0]>=grouping.screen.length||grouping.shapes[a][2][i4][1]+grouping.shape[a][i3][1]>=grouping.screen[0].length||!grouping.block){
													grouping.cancel3=true
													break
												}
											}
											if(!grouping.cancel3){
												grouping.checkRemember3=[]//remember existing blocks
												for(i4=0,li4=grouping.check.length;i4<li4;i4++){
													grouping.checkRemember3.push(grouping.check[i4])
												}
												for(i4=0,li4=grouping.shape[a].length;i4<li4;i4++){//every position for fourth piece
													if(grouping.checkRemember3[i4]==1){
														grouping.check=[]//copy existing blocks
														for(i5=0,li5=grouping.checkRemember3.length;i5<li5;i5++){
															grouping.check.push(grouping.checkRemember3[i5])
														}
														grouping.cancel4=false
														for(i5=0,li5=grouping.shapes[a][3].length;i5<li5;i5++){//every piece of shape
															grouping.block=false
															for(i6=0,li6=grouping.shape[a].length;i6<li6;i6++){//cross-check piece position with group position
																if(grouping.shape[a][i6][0]==grouping.shapes[a][3][i5][0]+grouping.shape[a][i4][0]&&grouping.shape[a][i6][1]==grouping.shapes[a][3][i5][1]+grouping.shape[a][i4][1]){
																	grouping.check[i6]=0
																	grouping.block=true
																	if(grouping.checkRemember[i6]==0){
																		grouping.cancel4=true
																		break
																	}
																}
															}
															if(grouping.cancel4){
																break
															}
															if(grouping.shapes[a][3][i5][0]+grouping.shape[a][i4][0]>=grouping.screen.length||grouping.shapes[a][3][i5][1]+grouping.shape[a][i4][1]>=grouping.screen[0].length||!grouping.block){
																grouping.cancel4=true
																break
															}
														}
														if(!grouping.cancel4){
															grouping.checkRemember4=[]//remember existing blocks
															for(i5=0,li5=grouping.check.length;i5<li5;i5++){
																grouping.checkRemember4.push(grouping.check[i5])
															}
															for(i5=0,li5=grouping.shape[a].length;i5<li5;i5++){//every position for fifth piece
																if(grouping.checkRemember4[i5]==1){
																	grouping.check=[]//copy existing blocks
																	for(i6=0,li6=grouping.checkRemember4.length;i6<li6;i6++){
																		grouping.check.push(grouping.checkRemember4[i6])
																	}
																	grouping.cancel5=false
																	for(i6=0,li6=grouping.shapes[a][4].length;i6<li6;i6++){//every piece of shape
																		grouping.block=false
																		for(i7=0,li7=grouping.shape[a].length;i7<li7;i7++){//cross-check piece position with group position
																			if(grouping.shape[a][i7][0]==grouping.shapes[a][4][i6][0]+grouping.shape[a][i5][0]&&grouping.shape[a][i7][1]==grouping.shapes[a][4][i6][1]+grouping.shape[a][i5][1]){
																				grouping.check[i7]=0
																				grouping.block=true
																				if(grouping.checkRemember[i7]==0){
																					grouping.cancel5=true
																					break
																				}
																			}
																		}
																		if(grouping.cancel5){
																			break
																		}
																		if(grouping.shapes[a][4][i6][0]+grouping.shape[a][i5][0]>=grouping.screen.length||grouping.shapes[a][4][i6][1]+grouping.shape[a][i5][1]>=grouping.screen[0].length||!grouping.block){
																			grouping.cancel5=true
																			break
																		}
																	}
																	if(!grouping.cancel5){
																		grouping.checkRemember5=[]//remember existing blocks
																		for(i6=0,li6=grouping.check.length;i6<li6;i6++){
																			grouping.checkRemember5.push(grouping.check[i6])
																		}
																		for(i6=0,li6=grouping.shape[a].length;i6<li6;i6++){//every position for sixth piece
																			if(grouping.checkRemember5[i6]==1){
																				grouping.check=[]//copy existing blocks
																				for(i7=0,li7=grouping.checkRemember5.length;i7<li7;i7++){
																					grouping.check.push(grouping.checkRemember5[i7])
																				}
																				grouping.cancel6=false
																				for(i7=0,li7=grouping.shapes[a][5].length;i7<li7;i7++){//every piece of shape
																					grouping.block=false
																					for(i8=0,li8=grouping.shape[a].length;i8<li8;i8++){//cross-check piece position with group position
																						if(grouping.shape[a][i8][0]==grouping.shapes[a][5][i7][0]+grouping.shape[a][i6][0]&&grouping.shape[a][i8][1]==grouping.shapes[a][5][i7][1]+grouping.shape[a][i6][1]){
																							grouping.check[i8]=0
																							grouping.block=true
																							if(grouping.checkRemember[i8]==0){
																								grouping.cancel6=true
																								break
																							}
																						}
																					}
																					if(grouping.cancel6){
																						break
																					}
																					if(grouping.shapes[a][5][i7][0]+grouping.shape[a][i6][0]>=grouping.screen.length||grouping.shapes[a][5][i7][1]+grouping.shape[a][i6][1]>=grouping.screen[0].length||!grouping.block){
																						grouping.cancel6=true
																						break
																					}
																				}
																				grouping.works=true
																				for(i7=0,li7=grouping.check.length;i7<li7;i7++){
																					if(grouping.check[i7]==1){
																						grouping.works=false
																					}
																				}
																				if(grouping.works&&!grouping.cancel&&!grouping.cancel2&&!grouping.cancel3&&!grouping.cancel4&&!grouping.cancel5&&!grouping.cancel6){
																					grouping.add=true
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if(!grouping.add){
				for(i1=0,li1=grouping.shape[a].length;i1<li1;i1++){
					if(blockId(screen.main[grouping.shape[a][i1][0]*2+1][grouping.shape[a][i1][1]*2+1])>0){
						screen.error[grouping.shape[a][i1][0]*2+1][grouping.shape[a][i1][1]*2+1]=1
					}
				}
				if(screen.complete){
					screen.complete=false
				}
			}
		}
		if(grouping.shapes[a].length>0&&grouping.Nshapes[a].length==1){
			grouping.add=false
			if(grouping.shapes[a].length==1){
				for(i1=0,li1=grouping.all.length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.all.length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.all.length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.all[i3][0]==grouping.shapes[a][0][i2][0]+grouping.all[i1][0]&&grouping.all[i3][1]==grouping.shapes[a][0][i2][1]+grouping.all[i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.all[i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.all[i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					if(!grouping.cancel){
						grouping.checkRemember=[]//remember existing blocks
						for(i2=0,li2=grouping.check.length;i2<li2;i2++){
							grouping.checkRemember.push(grouping.check[i2])
						}
						for(i2=0,li2=grouping.all.length;i2<li2;i2++){//every position for first negative piece
							if(grouping.checkRemember[i2]==0){
								grouping.check=[]//copy existing blocks
								for(i3=0,li3=grouping.checkRemember.length;i3<li3;i3++){
									grouping.check.push(grouping.checkRemember[i3])
								}
								grouping.cancel2=false
								for(i3=0,li3=grouping.Nshapes[a][0].length;i3<li3;i3++){//every piece of shape
									grouping.block=false
									for(i4=0,li4=grouping.all.length;i4<li4;i4++){//cross-check piece position with group position
										if(grouping.all[i4][0]==grouping.Nshapes[a][0][i3][0]+grouping.all[i2][0]&&grouping.all[i4][1]==grouping.Nshapes[a][0][i3][1]+grouping.all[i2][1]){
											grouping.check[i4]=1
											grouping.block=true
											if(grouping.checkRemember[i4]==1){
												grouping.cancel2=true
											}
										}
									}
									if(grouping.Nshapes[a][0][i3][0]+grouping.all[i2][0]>=grouping.screen.length||grouping.Nshapes[a][0][i3][1]+grouping.all[i2][1]>=grouping.screen[0].length||!grouping.block){
										grouping.cancel2=true
									}
								}
								grouping.works=true
								for(i3=0,li3=grouping.check.length;i3<li3;i3++){
									if(grouping.check[i3]==1&&grouping.screen[grouping.all[i3][0]][grouping.all[i3][1]]==a||grouping.check[i3]==0&&grouping.screen[grouping.all[i3][0]][grouping.all[i3][1]]!=a){
										grouping.works=false
									}
								}
								if(grouping.works&&!grouping.cancel&&!grouping.cancel2){
									grouping.add=true
								}
							}
						}
					}
				}
			}
			else if(grouping.shapes[a].length==2){
				for(i1=0,li1=grouping.all.length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.all.length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.all.length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.all[i3][0]==grouping.shapes[a][0][i2][0]+grouping.all[i1][0]&&grouping.all[i3][1]==grouping.shapes[a][0][i2][1]+grouping.all[i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.all[i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.all[i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					if(!grouping.cancel){
						grouping.checkRemember=[]//remember existing blocks
						for(i2=0,li2=grouping.check.length;i2<li2;i2++){
							grouping.checkRemember.push(grouping.check[i2])
						}
						for(i2=0,li2=grouping.all.length;i2<li2;i2++){//every position for second piece
							grouping.check=[]//copy existing blocks
							for(i3=0,li3=grouping.checkRemember.length;i3<li3;i3++){
								grouping.check.push(grouping.checkRemember[i3])
							}
							grouping.cancel2=false
							for(i3=0,li3=grouping.shapes[a][1].length;i3<li3;i3++){//every piece of shape
								grouping.block=false
								for(i4=0,li4=grouping.all.length;i4<li4;i4++){//cross-check piece position with group position
									if(grouping.all[i4][0]==grouping.shapes[a][1][i3][0]+grouping.all[i2][0]&&grouping.all[i4][1]==grouping.shapes[a][1][i3][1]+grouping.all[i2][1]){
										grouping.check[i4]--
										grouping.block=true
									}
								}
								if(grouping.shapes[a][1][i3][0]+grouping.all[i2][0]>=grouping.screen.length||grouping.shapes[a][1][i3][1]+grouping.all[i2][1]>=grouping.screen[0].length||!grouping.block){
									grouping.cancel2=true
								}
							}
							if(!grouping.cancel2){
								grouping.checkRemember2=[]//remember existing blocks
								for(i3=0,li3=grouping.check.length;i3<li3;i3++){
									grouping.checkRemember2.push(grouping.check[i3])
								}
								for(i3=0,li3=grouping.all.length;i3<li3;i3++){//every position for first negative piece
									if(grouping.checkRemember2[i3]<1){
										grouping.check=[]//copy existing blocks
										for(i4=0,li4=grouping.checkRemember2.length;i4<li4;i4++){
											grouping.check.push(grouping.checkRemember2[i4])
										}
										grouping.cancel3=false
										for(i4=0,li4=grouping.Nshapes[a][0].length;i4<li4;i4++){//every piece of shape
											grouping.block=false
											for(i5=0,li5=grouping.all.length;i5<li5;i5++){//cross-check piece position with group position
												if(grouping.all[i5][0]==grouping.Nshapes[a][0][i4][0]+grouping.all[i3][0]&&grouping.all[i5][1]==grouping.Nshapes[a][0][i4][1]+grouping.all[i3][1]){
													grouping.check[i5]++
													grouping.block=true
												}
											}
											if(grouping.Nshapes[a][0][i4][0]+grouping.all[i3][0]>=grouping.screen.length||grouping.Nshapes[a][0][i4][1]+grouping.all[i3][1]>=grouping.screen[0].length||!grouping.block){
												grouping.cancel3=true
											}
										}
										grouping.works=true
										for(i4=0,li4=grouping.check.length;i4<li4;i4++){
											if(grouping.check[i4]==1&&grouping.screen[grouping.all[i4][0]][grouping.all[i4][1]]==a||grouping.check[i4]==0&&grouping.screen[grouping.all[i4][0]][grouping.all[i4][1]]!=a){
												grouping.works=false
											}
										}
										if(grouping.works&&!grouping.cancel&&!grouping.cancel2&&!grouping.cancel3){
											grouping.add=true
										}
									}
								}
							}
						}
					}
				}
			}
			else if(grouping.shapes[a].length==3){
				for(i1=0,li1=grouping.all.length;i1<li1;i1++){//every possible shape position
					grouping.check=[]
					for(i2=0,li2=grouping.all.length;i2<li2;i2++){
						grouping.check.push(1)
					}
					grouping.cancel=false
					for(i2=0,li2=grouping.shapes[a][0].length;i2<li2;i2++){//every piece of shape
						grouping.block=false
						for(i3=0,li3=grouping.all.length;i3<li3;i3++){//cross-check piece position with group position
							if(grouping.all[i3][0]==grouping.shapes[a][0][i2][0]+grouping.all[i1][0]&&grouping.all[i3][1]==grouping.shapes[a][0][i2][1]+grouping.all[i1][1]){
								grouping.check[i3]=0
								grouping.block=true
							}
						}
						if(grouping.shapes[a][0][i2][0]+grouping.all[i1][0]>=grouping.screen.length||grouping.shapes[a][0][i2][1]+grouping.all[i1][1]>=grouping.screen[0].length||!grouping.block){
							grouping.cancel=true
						}
					}
					if(!grouping.cancel){
						grouping.checkRemember=[]//remember existing blocks
						for(i2=0,li2=grouping.check.length;i2<li2;i2++){
							grouping.checkRemember.push(grouping.check[i2])
						}
						for(i2=0,li2=grouping.all.length;i2<li2;i2++){//every position for second piece
							grouping.check=[]//copy existing blocks
							for(i3=0,li3=grouping.checkRemember.length;i3<li3;i3++){
								grouping.check.push(grouping.checkRemember[i3])
							}
							grouping.cancel2=false
							for(i3=0,li3=grouping.shapes[a][1].length;i3<li3;i3++){//every piece of shape
								grouping.block=false
								for(i4=0,li4=grouping.all.length;i4<li4;i4++){//cross-check piece position with group position
									if(grouping.all[i4][0]==grouping.shapes[a][1][i3][0]+grouping.all[i2][0]&&grouping.all[i4][1]==grouping.shapes[a][1][i3][1]+grouping.all[i2][1]){
										grouping.check[i4]--
										grouping.block=true
									}
								}
								if(grouping.shapes[a][1][i3][0]+grouping.all[i2][0]>=grouping.screen.length||grouping.shapes[a][1][i3][1]+grouping.all[i2][1]>=grouping.screen[0].length||!grouping.block){
									grouping.cancel2=true
								}
							}
							if(!grouping.cancel){
								grouping.checkRemember2=[]//remember existing blocks
								for(i3=0,li3=grouping.check.length;i3<li3;i3++){
									grouping.checkRemember2.push(grouping.check[i3])
								}
								for(i3=0,li3=grouping.all.length;i3<li3;i3++){//every position for third piece
									grouping.check=[]//copy existing blocks
									for(i4=0,li4=grouping.checkRemember2.length;i4<li4;i4++){
										grouping.check.push(grouping.checkRemember2[i4])
									}
									grouping.cancel3=false
									for(i4=0,li4=grouping.shapes[a][1].length;i4<li4;i4++){//every piece of shape
										grouping.block=false
										for(i5=0,li5=grouping.all.length;i5<li5;i5++){//cross-check piece position with group position
											if(grouping.all[i5][0]==grouping.shapes[a][2][i4][0]+grouping.all[i3][0]&&grouping.all[i5][1]==grouping.shapes[a][2][i4][1]+grouping.all[i3][1]){
												grouping.check[i5]--
												grouping.block=true
											}
										}
										if(grouping.shapes[a][2][i4][0]+grouping.all[i3][0]>=grouping.screen.length||grouping.shapes[a][2][i4][1]+grouping.all[i3][1]>=grouping.screen[0].length||!grouping.block){
											grouping.cancel3=true
										}
									}
									if(!grouping.cancel2){
										grouping.checkRemember3=[]//remember existing blocks
										for(i4=0,li4=grouping.check.length;i4<li4;i4++){
											grouping.checkRemember3.push(grouping.check[i4])
										}
										for(i4=0,li4=grouping.all.length;i4<li4;i4++){//every position for first negative piece
											if(grouping.checkRemember3[i4]<1){
												grouping.check=[]//copy existing blocks
												for(i5=0,li5=grouping.checkRemember3.length;i5<li5;i5++){
													grouping.check.push(grouping.checkRemember3[i5])
												}
												grouping.cancel4=false
												for(i5=0,li5=grouping.Nshapes[a][0].length;i5<li5;i5++){//every piece of shape
													grouping.block=false
													for(i6=0,li6=grouping.all.length;i6<li6;i6++){//cross-check piece position with group position
														if(grouping.all[i6][0]==grouping.Nshapes[a][0][i5][0]+grouping.all[i4][0]&&grouping.all[i6][1]==grouping.Nshapes[a][0][i5][1]+grouping.all[i4][1]){
															grouping.check[i6]++
															grouping.block=true
														}
													}
													if(grouping.Nshapes[a][0][i5][0]+grouping.all[i4][0]>=grouping.screen.length||grouping.Nshapes[a][0][i5][1]+grouping.all[i4][1]>=grouping.screen[0].length||!grouping.block){
														grouping.cancel4=true
													}
												}
												grouping.works=true
												for(i5=0,li5=grouping.check.length;i5<li5;i5++){
													if(grouping.check[i5]==1&&grouping.screen[grouping.all[i5][0]][grouping.all[i5][1]]==a||grouping.check[i4]==0&&grouping.screen[grouping.all[i5][0]][grouping.all[i5][1]]!=a){
														grouping.works=false
													}
												}
												if(grouping.works&&!grouping.cancel&&!grouping.cancel2&&!grouping.cancel3&&!grouping.cancel4){
													grouping.add=true
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if(!grouping.add){
				for(i1=0,li1=grouping.shape[a].length;i1<li1;i1++){
					if(blockId(screen.main[grouping.shape[a][i1][0]*2+1][grouping.shape[a][i1][1]*2+1])!=0){
						screen.error[grouping.shape[a][i1][0]*2+1][grouping.shape[a][i1][1]*2+1]=1
					}
				}
				if(screen.complete){
					screen.complete=false
				}
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
	layer.rect(transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height);
	layer.rect(layer.width-transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height);
	layer.rect(layer.width/2,transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2);
	layer.rect(layer.width/2,layer.height-transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2);
	if(transition.trigger){
		transition.anim=round(transition.anim*10+1)/10
		if(transition.anim>1.1){
			transition.trigger = false;
			stage.scene = transition.scene;
			if(stage.scene=='map'){
				generateMap()
			}
			if(stage.scene=='level'){
				resetMap()
			}
		}
	}
	else if(transition.anim>0){
		transition.anim=round(transition.anim*10-1)/10
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
					layer.fill(errorLerp([200,200,200],screen.flash[i][j],screen.deactivate[i][j]))
					regPoly(layer,10+j*20,10+i*20,6,4,30)
				break
				case '1':
					layer.fill(errorLerp([255,50,100],screen.flash[i][j],screen.deactivate[i][j]))
					regTriangle(layer,10+j*20,10+i*20,5,-30)
				break
				case '2':
					layer.fill(errorLerp([255,50,100],screen.flash[i][j],screen.deactivate[i][j]))
					regTriangle(layer,6+j*20,10+i*20,5,-30)
					regTriangle(layer,14+j*20,10+i*20,5,-30)
				break
				case '3':
					layer.fill(errorLerp([255,50,100],screen.flash[i][j],screen.deactivate[i][j]))
					regTriangle(layer,2+j*20,10+i*20,5,-30)
					regTriangle(layer,10+j*20,10+i*20,5,-30)
					regTriangle(layer,18+j*20,10+i*20,5,-30)
				break
				case 'a':
					layer.fill(errorLerp([240,240,240],screen.flash[i][j],screen.deactivate[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'b':
					layer.fill(errorLerp([40,40,40],screen.flash[i][j],screen.deactivate[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'c':
					layer.fill(errorLerp([200,175,165],screen.flash[i][j],screen.deactivate[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'd':
					layer.fill(errorLerp([130,110,180],screen.flash[i][j],screen.deactivate[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'e':
					layer.fill(errorLerp([120,120,90],screen.flash[i][j],screen.deactivate[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'f':
					layer.fill(errorLerp([140,80,90],screen.flash[i][j],screen.deactivate[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'g':
					layer.fill(errorLerp([50,65,125],screen.flash[i][j],screen.deactivate[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'h':
					layer.fill(errorLerp([165,190,255],screen.flash[i][j],screen.deactivate[i][j]))
					layer.rect(10+j*20,10+i*20,12,12,2)
				break
				case 'A':
					layer.fill(errorLerp([240,240,240],screen.flash[i][j],screen.deactivate[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'B':
					layer.fill(errorLerp([40,40,40],screen.flash[i][j],screen.deactivate[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'C':
					layer.fill(errorLerp([200,175,165],screen.flash[i][j],screen.deactivate[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'D':
					layer.fill(errorLerp([130,110,180],screen.flash[i][j],screen.deactivate[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'E':
					layer.fill(errorLerp([120,120,90],screen.flash[i][j],screen.deactivate[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'F':
					layer.fill(errorLerp([140,80,90],screen.flash[i][j],screen.deactivate[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'G':
					layer.fill(errorLerp([50,65,125],screen.flash[i][j],screen.deactivate[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'H':
					layer.fill(errorLerp([165,190,255],screen.flash[i][j],screen.deactivate[i][j]))
					regStar(layer,10+j*20,10+i*20,8,[8,4],0)
				break
				case 'i': case 'j': case 'k': case 'l': case 'm': case 'n': case 'o': case 'p':
					dots(layer,10+j*20,10+i*20,dotNumber(screen.main[i][j]),0,screen.flash[i][j],screen.deactivate[i][j])
				break
				case 'I': case 'J': case 'K': case 'L': case 'M': case 'N': case 'O': case 'P':
					minusDots(layer,10+j*20,10+i*20,-dotNumber(screen.main[i][j]),0,screen.flash[i][j],screen.deactivate[i][j])
				break
				case '#':
					layer.fill(errorLerp([250,215,235],screen.flash[i][j],screen.deactivate[i][j]))
					layer.ellipse(10+j*20,10+i*20,20,20)
					layer.fill(255,100,150)
					layer.ellipse(12+j*20,8+i*20,16,16)
				break
				case '$':
					layer.stroke(errorLerp([190,65,85],screen.flash[i][j],screen.deactivate[i][j]))
					layer.strokeWeight(4);
					for(k=0;k<3;k++){
						layer.line(10+j*20,10+i*20,10+j*20+sin(k*120)*8,10+i*20-cos(k*120)*8)
					}
				break
				case 'q': case 'r': case 's': case 't': case 'u': case 'v': case 'w': case 'x': case 'y': case 'z': case 'Q': case 'R': case 'S': case 'T': case 'U': case 'V': case 'W': case 'X': case 'Y': case 'Z': case '~': case '`': case '|': case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: case 36: case 37: case 38:
					layer.fill(errorLerp([210,200,210],screen.flash[i][j],screen.deactivate[i][j]))
					for(k=0,lk=block(blockId(screen.main[i][j])).length;k<lk;k++){
						layer.rect(10+j*20-blockCap(blockId(screen.main[i][j]))[1]*4+block(blockId(screen.main[i][j]))[k][1]*8,10+i*20-blockCap(blockId(screen.main[i][j]))[0]*4+block(blockId(screen.main[i][j]))[k][0]*8,6.5,6.5)
					}
				break
				case -1: case -2: case -3: case -4: case -6: case -12: case -27: case -34:
					layer.noFill()
					layer.strokeWeight(1.5)
					layer.stroke(errorLerp([95,60,95],screen.flash[i][j],screen.deactivate[i][j]))
					for(k=0,lk=block(-blockId(screen.main[i][j])).length;k<lk;k++){
						layer.rect(10+j*20-blockCap(-blockId(screen.main[i][j]))[1]*4+block(-blockId(screen.main[i][j]))[k][1]*8,10+i*20-blockCap(-blockId(screen.main[i][j]))[0]*4+block(-blockId(screen.main[i][j]))[k][0]*8,5,5)
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
			if(screen.disable[i][j]==1&&screen.deactivate[i][j]<1){
				screen.deactivate[i][j]=round(screen.deactivate[i][j]*30+1)/30;
				k=1
			}
			if(screen.disable[i][j]==0&&screen.deactivate[i][j]>0){
				screen.deactivate[i][j]=round(screen.deactivate[i][j]*30-1)/30;
				k=1
			}
			if(screen.disable[i][j]==1&&screen.deactivate[i][j]>=1){
				screen.disable[i][j]=0
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
function displayWire(){
	graphics.wire=createGraphics(game.edge.x+200,game.edge.y+200)
	setupLayer(graphics.wire)
	dev.screenPositions=[]
	for(a=0,la=screens.main.length;a<la;a++){
		dev.screenPositions.push([0,0])
	}
	for(a=0,la=entities.screens.length;a<la;a++){
		dev.screenPositions[-entities.screens[a].type]=[entities.screens[a].position.x,entities.screens[a].position.y]
	}
	graphics.wire.stroke(0)
	graphics.wire.strokeWeight(4)
	for(a=0,la=entities.screens.length;a<la;a++){
		if(entities.screens[a].id<=0){
			graphics.wire.line(dev.screenPositions[-entities.screens[a].id][0]+100,dev.screenPositions[-entities.screens[a].id][1]+100,entities.screens[a].position.x+100,entities.screens[a].position.y+100)
		}
	}
	for(a=0,la=entities.walls.length;a<la;a++){
		if(entities.walls[a].id<=0){
			graphics.wire.line(dev.screenPositions[-entities.walls[a].id][0]+100,dev.screenPositions[-entities.walls[a].id][1]+100,entities.walls[a].position.x+100,entities.walls[a].position.y+100)
		}
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
function dots(layer,x,y,amount,direction,flash,deactivate){
	for(k=0;k<amount;k++){
		layer.fill(errorLerp(dotcolor[(k+(amount-1)*amount/2)%8],flash,deactivate))
		layer.ellipse(x+cos(direction+k*360/amount)*sqrt(amount-1)*4,y+sin(direction+k*360/amount)*sqrt(amount-1)*4,6,6)
	}
}
function minusDots(layer,x,y,amount,direction,flash,deactivate){
	layer.strokeWeight(1.5)
	layer.noFill()
	for(k=0;k<amount;k++){
		layer.stroke(errorLerp([255-dotcolor[(k+(amount-1)*amount/2)%8][0],255-dotcolor[(k+(amount-1)*amount/2)%8][1],255-dotcolor[(k+(amount-1)*amount/2)%8][2]],flash,deactivate))
		layer.ellipse(x+cos(direction+k*360/amount)*sqrt(amount-1)*4,y+sin(direction+k*360/amount)*sqrt(amount-1)*4,4.5,4.5)
	}
}
function errorLerp(color,amount,amount2){
	return [(color[0]*(1-amount)+240*amount)*(1-amount2),(color[1]*(1-amount))*(1-amount2),(color[2]*(1-amount))*(1-amount2)]
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
	return pushPoint(circle.position,{x:constrain(circle.position.x,box.position.x-box.width/2,box.position.x+box.width/2),y:constrain(circle.position.y,box.position.y-box.height/2,box.position.y+box.height/2)},circle.size+1)
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
function block(id){
	switch(id){
		case 1: return [[0,0]]; break
		case 2: return [[0,0],[1,0]]; break
		case 3: return [[0,0],[1,0],[1,1]]; break
		case 4: return [[0,0],[0,1],[1,0],[1,1]]; break
		case 5: return [[0,0],[1,0],[2,0]]; break
		case 6: return [[0,0],[0,1]]; break
		case 7: return [[0,0],[0,1],[0,2]]; break
		case 8: return [[0,0],[1,0],[2,0],[1,1]]; break
		case 9: return [[0,0],[1,0],[2,0],[0,1]]; break
		case 10: return [[0,0],[1,0],[2,0],[2,1]]; break
		case 11: return [[0,0],[1,0],[2,0],[1,-1]]; break
		case 12: return [[0,0],[1,1]]; break
		case 13: return [[0,0],[1,-1]]; break
		case 14: return [[0,0],[0,1],[0,2],[0,3]]; break
		case 15: return [[0,0],[1,0],[2,0],[3,0]]; break
		case 16: return [[0,0],[0,1],[0,2],[1,2]]; break
		case 17: return [[0,0],[1,0],[2,0],[1,1],[1,-1]]; break
		case 18: return [[0,0],[1,0],[0,1]]; break
		case 19: return [[0,0],[1,0],[1,1],[1,2]]; break
		case 20: return [[0,0],[1,0],[0,1],[0,2]]; break
		case 21: return [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2]]; break
		case 22: return [[0,0],[1,0],[-1,1]]; break
		case 23: return [[0,0],[1,0],[0,-1]]; break
		case 24: return [[0,0],[1,0],[2,0],[3,0],[0,1],[0,2],[3,1],[3,2],[0,3],[1,3],[2,3],[3,3]]; break
		case 25: return [[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]; break
		case 26: return [[0,0],[1,0],[1,1],[2,0],[2,1]]; break
		case 27: return [[0,0],[0,1],[1,1],[2,1]]; break
		case 28: return [[0,0],[1,1],[-1,1]]; break
		case 29: return [[0,0],[1,-1],[1,1]]; break
		case 30: return [[0,0],[1,0],[2,0],[0,1],[2,-1]]; break
		case 31: return [[0,0],[0,1],[0,2],[-1,2]]; break
		case 32: return [[0,0],[1,1],[2,2],[3,3],[2,0],[3,1],[0,2],[1,3]]; break
		case 33: return [[0,0],[0,1],[0,2],[1,1]]; break
		case 34: return [[0,0],[2,2]]; break
		case 35: return [[0,0],[0,1],[0,2],[-1,1]]; break
		case 36: return [[0,0],[1,1],[1,0],[2,1]]; break
		case 37: return [[0,0],[1,1],[0,1],[1,2]]; break
		case 38: return [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2],[1,1]]; break
	}
}
function blockCap(id){
	switch(id){
		case 1: return [0,0]; break
		case 2: case 29: return [1,0]; break
		case 3: case 4: case 12: case 18: return [1,1]; break
		case 5: case 17: case 30: return [2,0]; break
		case 6: case 22: case 28: return [0,1]; break
		case 7: return [0,2]; break
		case 8: case 9: case 10: case 26: case 27: case 36: return [2,1]; break
		case 11: return [2,-1]; break
		case 13: case 23: return [1,-1]; break
		case 14: return [0,3]; break
		case 15: return [3,0]; break
		case 16: case 19: case 20: case 33: case 37: return [1,2]; break
		case 21: case 34: case 38: return [2,2]; break
		case 24: case 25: case 32: return [3,3]; break
		case 31: case 35: return [-1,2]; break
	}
}
function blockId(letter){
	switch(letter){
		case 'q': return 1; break
		case 'r': return 2; break
		case 's': return 3; break
		case 't': return 4; break
		case 'u': return 5; break
		case 'v': return 6; break
		case 'w': return 7; break
		case 'x': return 8; break
		case 'y': return 9; break
		case 'z': return 10; break
		case 'Q': return 11; break
		case 'R': return 12; break
		case 'S': return 13; break
		case 'T': return 14; break
		case 'U': return 15; break
		case 'V': return 16; break
		case 'W': return 17; break
		case 'X': return 18; break
		case 'Y': return 19; break
		case 'Z': return 20; break
		case '~': return 21; break
		case '`': return 22; break
		case '|': return 23; break
		case -1: case -2: case -3: case -4: case -5: case -6: case -7: case -8: case -9: case -10: case -11: case -12: case -13: case -14: case -15: case -16: case -17: case -18: case -19: case -20:
		case -21: case -22: case -23: case -24: case -25: case -26: case -27: case -28: case -29: case -30: case -31: case -32: case -33: case -34: case -35: case -36: case -37: case -38: case -39: case -40:
		case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 19: case 20:
		case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40:
			return letter
		break
	}
	return 0
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
function generateMap(){
	graphics.map=createGraphics(game.edge.x+100,game.edge.y+100)
	setupLayer(graphics.map)
	graphics.map.background(160,200,240)
	graphics.map.push()
	graphics.map.translate(50,50)
	graphics.map.image(graphics.base,-100,-100)
	for(a=0,la=run.fore.length;a<la;a++){
		for(b=0,lb=run.fore[a].length;b<lb;b++){
			run.fore[a][b].layer=graphics.map
			run.fore[a][b].display()
		}
	}
	if(dev.wire){
		graphics.map.image(graphics.wire,-100,-100)
	}
	graphics.map.pop()
}
function resetMap(){
	for(a=0,la=run.fore.length;a<la;a++){
		for(b=0,lb=run.fore[a].length;b<lb;b++){
			run.fore[a][b].layer=graphics.full
		}
	}
}
function godMode(){
	for(b=0;b<screens.main.length;b++){
        for(a=0,la=entities.walls.length;a<la;a++){
            entities.walls[a].activate(b)
        }
        for(a=0,la=entities.screens.length;a<la;a++){
            entities.screens[a].activate(b)
        }
    }
}
function generateWorld(level){
	game.edge.x=level.main[0].length*80
	game.edge.y=level.main.length*80
	for(m=0,lm=level.main.length;m<lm;m++){
        for(n=0,ln=level.main[m].length;n<ln;n++){
            if(level.main[m][n]>=100&&level.main[m][n]<10000&&(floor(level.main[m][n]/100)==6||floor(level.main[m][n]/100)==13||floor(level.main[m][n]/100)==18||floor(level.main[m][n]/100)==19||floor(level.main[m][n]/100)==20||floor(level.main[m][n]/100)==21)){
                entities.base.push(new wall(graphics.full,n*80+floor((level.main[m][n]%100)/10)*40+40,m*80+(level.main[m][n]%10)*40+40,floor(level.main[m][n]/100),floor((level.main[m][n]%100)/10)*80+80,(level.main[m][n]%10)*80+80,level.id[m][n]))
            }
            else if(level.main[m][n]>=100&&level.main[m][n]<10000&&floor(level.main[m][n]/100)!=1&&floor(level.main[m][n]/100)!=2&&floor(level.main[m][n]/100)!=18&&floor(level.main[m][n]/100)!=19&&floor(level.main[m][n]/100)!=20&&floor(level.main[m][n]/100)!=21){
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
	for(m=0,lm=level.main.length;m<lm;m++){
        for(n=0,ln=level.main[m].length;n<ln;n++){
            if(level.main[m][n]>=100&&level.main[m][n]<10000&&(floor(level.main[m][n]/100)==1||floor(level.main[m][n]/100)==2)){
                entities.walls.push(new wall(graphics.full,n*80+floor((level.main[m][n]%100)/10)*40+40,m*80+(level.main[m][n]%10)*40+40,floor(level.main[m][n]/100),floor((level.main[m][n]%100)/10)*80+80,(level.main[m][n]%10)*80+80,level.id[m][n]))
            }
        }
    }
	run={fore:[entities.base,entities.players,entities.screens,entities.walls]};
}