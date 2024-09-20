class Level{
  constructor(newSpoutPos, newCupPos, newCupAngle){
    this.spoutPos = newSpoutPos;
    this.cup = new Cup(newCupPos.x,newCupPos.y,50, newCupAngle);
    this.bounces = 0;
  }
  
  load(){
    cup = this.cup;
    lines = [];
    balls = [];
  }
  
  display(){
    push();
    cup.display();
    fill(0);
    rect(this.spoutPos.x-15,this.spoutPos.y-15,30,40);
    text("press SHIFT to start balls",this.spoutPos.x,this.spoutPos.y-20);
    pop();
  }
  
  
  
  update(){
    
    if(frameCount % ballRate == 0 && ballsActivated){ //spawn new ball every ballRate frames
      balls.push(new Ball(random(this.spoutPos.x - 10,this.spoutPos.x + 10),this.spoutPos.y,5,random(0.75,0.9)));
    }
    
    handleBalls();
    for (let i in lines){
      lines[i].display();
    }
    
    handleLineDrawing();
    
  }
  
  
}