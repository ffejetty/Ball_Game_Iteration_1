let screen;

let menuButtons;
let levelSelectButtons;

let currentLevel;

let fullscreenButton;

let levels;

let displayNodes;

let balls;
let lines;
let cup;

let ballsActivated;

let ballRate;

let creatingLine;

let comicSans;


let bounces;

function preload(){
  //comicSans = loadFont("assets/fonts/comic_sans.otf");
}


function setup() {
  createCanvas(1500, 1000);

  
  lines = [];
  balls = [];
  cup = new Cup(0,0,0);
  
  screen = 1;
  displayNodes = false;
  ballsActivated = false;
  ballRate = 20;
  creatingLine = false;
  menuButtons = [];
  populateMenuButtons();
  
  levels = [new Level(createVector(150, 30),createVector(width/2,800),0),
            new Level(createVector(800, 30),createVector(150,800),PI/4)];
  
  levelSelectButtons = [];
  populateLevelSelectButtons();
  textAlign(CENTER, CENTER);
  //textFont(comicSans);
  fullscreenButton = new Button(25,25,50,50, "⛶", [255,255,255], 30);
  fullscreenButton.action = function(){
    fullscreen(!fullscreen());
  }
}

function draw() {
  background(250);
  switch (screen){
    case 0:
      game(currentLevel);
      break;
    case 1:
      menu();
      break;
    case 2:
      levelSelect();
      break;
    case 3:
      settings()
      break;
    default:
      text("something went wrong",width/2,height/2);
  }
  fullscreenButton.display();
  
}
function mousePressed(){
  fullscreenButton.checkClicked();
  //a case for what should happen in each screen
  switch (screen){
    case 0:
      if (!keyIsDown(88) && !fullscreenButton.hovered()){
        creatingLine = true;
        lines.push(new Line([createVector(mouseX,mouseY)],10)); //create new line to start being drawn
      }
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    default:
  }
  
}

function mouseReleased(){
  if(creatingLine){
    creatingLine = false;
    let tooBunched = true;
    while(tooBunched){
      tooBunched = false;
      for (let i = 0; i < lines[lines.length-1].points.length-1;i++){ //removes duplicate points for performance
        let pointDiff = p5.Vector.sub(lines[lines.length-1].points[i],
                                      lines[lines.length-1].points[i+1]); //find vector from point at i to point at i+1
        if(pointDiff.mag()<=5){ //if points too close
          lines[lines.length-1].points.splice(i,1); //remove point
          tooBunched = true;
        }
      }
    }
  }
}

function keyPressed(){
  if (keyCode === SHIFT){
    ballsActivated = !ballsActivated;
  }else if (keyCode === ENTER){
    displayNodes = !displayNodes;
  }
}
