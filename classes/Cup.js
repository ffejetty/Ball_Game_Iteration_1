class Cup{
  constructor(newX, newY, newSize, newAngle = 0){
    this.pos = createVector(newX, newY);
    this.size = newSize;
    this.angle = newAngle;
    this.sides = this.makeSides(); //array of cup sides as line objects
  }
  
  display(){
    push();
    translate(this.pos.x,this.pos.y); //move origin to cup pos
    rotate(this.angle); //rotate axis by cup angle
    //now anything drawn at origin will be on screen at cup pos and rotated by cup angle
    stroke(30, 217, 217)
    fill(30, 217, 217, 100);
    square(-this.size/2,-this.size/2,this.size,0,0,10,10); //squares drawn from top left corner so to rotate from center start at (-size/2,-size/2)
    pop();
    for (let i in this.sides){
      this.sides[i].display()
    }
  }
  
  update(){
    this.angle += 0.01;
    this.sides = this.makeSides(); //remake sides at new angle
  }
  
  makeSides(){
    let diagonal = createVector(this.size/2,this.size/2).rotate(this.angle); //diagonal vector from centre to bottom right corner
    let backDiagonal = p5.Vector.rotate(diagonal,PI/2); //vector from centre to bottom left
    //these 2 vectors are when cup centre is at (0,0) ^
    
    //translate vectors to correct pos and create line obj using them
    let bottom = new Line([p5.Vector.add(diagonal, this.pos),p5.Vector.add(backDiagonal, this.pos)],2,50);
    let leftSide = new Line([p5.Vector.add(backDiagonal, this.pos),p5.Vector.add(p5.Vector.rotate(backDiagonal,PI/2), this.pos)],2,50)
    let rightSide = new Line([p5.Vector.add(diagonal, this.pos),p5.Vector.add(p5.Vector.rotate(diagonal,-PI/2), this.pos)],2,50)
    
    return [bottom,leftSide,rightSide];
  }
  
  checkInCup(ballObj){
    //make ball relative to origin as it is to the cup:
    let translatedBall = p5.Vector.sub(ballObj.pos, this.pos);
    translatedBall.rotate(-this.angle);
    
    if (isBetween(translatedBall.x,-this.size/2,this.size/2,2) &&
        isBetween(translatedBall.y,-this.size/2,this.size/2,2)){ //if within size of cup from origin
      return true;
    }
    return false;
  }
  
}