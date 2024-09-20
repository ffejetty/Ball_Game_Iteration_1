class Ball{
  constructor(newX,newY,newRadius, newE = 1, startVel = createVector(0,0)){
    this.pos = createVector(newX,newY);
    this.vel = startVel;
    this.accel = createVector(0, 0.1);
    this.radius = newRadius;
    this.restitution = newE;
    this.ballBrightness = ((this.restitution-0.75)/0.15); //brightness as a % based on bounciness (darker balls are less bouncy)
  }
  
  update(){
    this.vel.add(this.accel);
    this.pos.add(this.vel);
  }
  
  display(){
    push();
    //strokeWeight(0);
    fill(255 * this.ballBrightness, 50 * this.ballBrightness, 50 * this.ballBrightness);
    circle(this.pos.x,this.pos.y,this.radius*2);
    pop();
  }
  
  distToLine(x, y, x1, y1, x2, y2){
    let lineDirection = createVector(x2-x1,y2-y1); //direction vector for line equation
    let lambda = (lineDirection.x*(x-x1)+lineDirection.y*(y-y1))/(Math.pow(lineDirection.mag(),2)); //multiple of direction in line equation for point perpendicular to ball on line
    let lineToBall = createVector(x-x1-lambda*lineDirection.x,y-y1-lambda*lineDirection.y);//perpendicular vector from line to ball
    return lineToBall.mag();
  }
  
  touchingSegment(x, y, x1, y1, x2, y2, lineWidth){
    let distance = this.distToLine(x, y, x1, y1, x2, y2);
    let inRange = (isBetween(x,x1,x2,lineWidth/2+this.radius))&&
                  (isBetween(y,y1,y2,lineWidth/2+this.radius));
    let touchingLine = distance <= lineWidth/2+this.radius;
    return touchingLine && inRange;
  }
  
  
  bounce(lineObj){ //attempt to bounce ball off a line. return true if succesful (if ball was touching line)
    for (let i = 0; i < lineObj.points.length-1;i++){
      if(this.touchingSegment(this.pos.x,
                              this.pos.y,
                              lineObj.points[i].x,
                              lineObj.points[i].y,
                              lineObj.points[i+1].x,
                              lineObj.points[i+1].y,
                              lineObj.width)){
        let lineDirection = createVector(lineObj.points[i].x - lineObj.points[i+1].x, lineObj.points[i].y - lineObj.points[i+1].y); //turn line into a vector
        this.vel.reflect(lineDirection).mult(-1); //reflect ball vel in the line
        this.pos.add(createVector(this.vel.x,this.vel.y).normalize().mult(1.5)); //go forward 1 in vel direction to avoid getting stuck
        this.vel.mult(this.restitution); //decrease speed based on bounciness
        return true;
      }
    }
    return false;
    
  }
  
}