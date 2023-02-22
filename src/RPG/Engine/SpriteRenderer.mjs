
export class SpriteRenderer {
    constructor(p5, sprite, transform) {
      this.p5 = p5;
      this.sprite = sprite;
      this.transform = transform;
    }
    
    draw() {
      this.p5.image(this.sprite, this.transform.v.x, this.transform.v.y, this.transform.size, this.transform.size);
    }
  }
