import { p } from "../../p5engine.mjs";

export class SpriteRenderer {
    constructor(sprite, transform) {
      this.sprite = sprite;
      this.transform = transform;
    }
    
    draw() {
      p.image(this.sprite, this.transform.v.x, this.transform.v.y, this.transform.size, this.transform.size);
    }
  }
