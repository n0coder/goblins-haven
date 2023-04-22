export class Sword {
  constructor(x, y, p) {
    this.x = x; // x position of the sword
    this.y = y; // y position of the sword
    this.p = p;
    this.size = 0; // size of the sword (starts at 0)
    this.maxSize = 100; // maximum size of the sword
  }
  
  draw() {
    this.p.noStroke();
    //this.p.fill(0, 255, 0, 100); // green fill with transparency
    this.p.ellipse(this.x, this.y, this.size, this.size); // draw an ellipse that will represent the sword
    this.size++; // increase the size of the sword every frame
    if (this.size >= this.maxSize) { // if the sword has reached its maximum size
        this.p.fill(0, 255, 0); // solid green fill
        this.p.rect(this.x, this.y, 20, this.maxSize); // draw a rectangle to represent the handle of the sword
    }
  }
  
}
