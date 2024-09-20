function isBetween(num, bound1, bound2, tolerance = 0) {
  //returns true if num isBetween two bounds +/- tolerance
  if (bound1 > bound2) {
    return ((bound2 - tolerance) <= num && num <= (bound1 + tolerance));
  } else {
    return ((bound1 - tolerance) <= num && num <= (bound2 + tolerance));
  }
}



function populateMenuButtons(){
  //level select button
  menuButtons.push(new Button(width/2,height/2.5,width/5,100,"Level Select",[200,200,200]));
  menuButtons[menuButtons.length - 1].action = function(){
    screen = 2;
  }
  
  //settings
  menuButtons.push(new Button(width/2,height/1.8,width/5,100,"Settings",[200,200,200]));
  menuButtons[menuButtons.length - 1].action = function(){
    screen = 3;
  }
}



function populateLevelSelectButtons(){
  
  let w = 200;
  let h = 100;
  
  for (let i in levels){
    let newX = (100+w)*(i-4*floor(i/4)) + 50 + 250;
    let newY = (h+150)*floor(i/4)+50+50;
    levelSelectButtons.push(new Button(newX,newY,100,100,(++i),[200,200,200]));
    levelSelectButtons[levelSelectButtons.length - 1].action = function(){  //it works, shut up p5 idc abt semantics
      currentLevel = Number(i);
      levels[currentLevel].load();
      screen = 0;
    }
    i--;
  }
  
  for (let i = levels.length; i < 20; i++){
    let newX = (100+w)*(i-4*floor(i/4)) + 50 + 250;
    let newY = (h+150)*floor(i/4)+50+50;
    levelSelectButtons.push(new Button(newX,newY,100,100,"🔒",[200,200,200]));
  }
  
}

function handleBalls(){
    for (let i in balls){
      balls[i].display();
      balls[i].update();
      
      if (balls[i].bounce(cup.sides[0]) && cup.checkInCup(balls[i])){ //check if ball touching bottom of cup
        balls.splice(i, 1); //delete ball
        i--;
        levels[currentLevel].score++;
        continue; //go to next ball
      }
    
      if(!(balls[i].bounce(cup.sides[1]) || balls[i].bounce(cup.sides[2]))){ //if ball hasn't bounced off either side of cup
        for (let j in lines){
          if (balls[i].bounce(lines[j])){ //check if bounced off each line
            break;
          }
        }
      }
      
      if (!isBetween(balls[i].pos.x,0,width,-balls[i].radius/2)){ //bounce off side of screen if too far
        balls[i].vel.x *= (-1*balls[i].restitution);
        balls[i].pos.x += (balls[i].vel.x);
      }
    
      if (balls[i].pos.y > height){ //delete ball if under screen
        balls.splice(i,1);
        i--;
      }
    }
  }

function handleLineDrawing(){
  if (mouseIsPressed){
    if(keyIsDown(88) && !creatingLine){  //if X is down
      let tempMouseBall = new Ball(mouseX, mouseY, 5); //create temp ball at mouse to check if touching a line
      for (let i in lines){
        if (tempMouseBall.bounce(lines[i])){
          lines.splice(i,1);
          i--;
        }
      }
    }else if (creatingLine){
      lines[lines.length-1].updateLine(createVector(mouseX,mouseY)); //add the point at mouse coord to the currently being drawn line 
    }
    
  }
}



function menu(){
  push();
  noStroke();
  textSize(20);
  fill(200);
  rect(width/5, 75, 3*width/5,100);
  fill(0);
  text("BALL DROP",width/2, 125);
  pop();
  for (let button in menuButtons){
    menuButtons[button].display();
    menuButtons[button].checkClicked();
  }
  
}



function levelSelect(){
  for (let button in levelSelectButtons){
    levelSelectButtons[button].display();
    levelSelectButtons[button].checkClicked();
  }
}



function settings(){
  text("settings placeholder",width/2,height/2);
}

function game(level){
  levels[level].update();
  levels[level].display();
}

