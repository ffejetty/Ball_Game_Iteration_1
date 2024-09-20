class Line{
  constructor(newPoints,newWidth, newTransparency = 255){
    this.points = newPoints;
    this.width = newWidth;
    this.transparency = newTransparency; //alpha value for colour
  }
  
  display(){
    push();
    strokeWeight(this.width);
    stroke(0, this.transparency);
    for (let i = 0; i < this.points.length - 1; i++ ){
      line(this.points[i].x,this.points[i].y,this.points[i+1].x,this.points[i+1].y);
      if(displayNodes){
        push();
        fill(255);
        strokeWeight(1);
        circle(this.points[i].x,this.points[i].y,this.width);
        pop();
      }
    }
    pop();
  }
  
  updateLine(pos){
    this.points.push(pos);
  }
  
}