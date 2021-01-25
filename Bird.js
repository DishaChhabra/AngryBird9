class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("sprites/bird.png");
    this.image2 = loadImage("sprites/smoke.png")
    // Array is a special type of variable that stores multiple data
    this.array = []
  }

  display() {
    super.display();
    //this.array = [[x1,y1],[x2,y2],[x3,y3],...]
    if(this.body.position.x>200 && this.body.velocity.x>10){
    var birdPosition = [this.body.position.x, this.body.position.y]
    // adding data to the main array
    this.array.push(birdPosition)
  }
    for(var i=0; i<this.array.length; i++){
      image(this.image2, this.array[i][0],this.array[i][1] )
    }
  }
}
