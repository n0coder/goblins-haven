export class Vector2 {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    add(x,y) {
      return new Vector2(this.x + x, this.y+y);
    }
    subtract(x,y) {
      return new Vector2(this.x - x, this.y-y);
    }
    divide(value) {
      return new Vector2(this.x / value, this.y/value);
    }
  
    multiply(value) {
      return new Vector2(this.x * value, this.y*value);
    }
  }