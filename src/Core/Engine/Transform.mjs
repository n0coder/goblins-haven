import { Vector2 } from "./Math/Vector2";
export class Transform {
    constructor(x, y, size) {
        this.v = new Vector2(x,y);
        this.size = size;
        this.offset = new Vector2(0,0);
    }

    get x() {
        return this.v.x + (this.size / 2) + (this.offset.x);
    }

    get y() {
        return this.v.y + (this.size / 2) + (this.offset.y);
    }

    centerize() {
        this.v.x += this.v.x - this.x;
        this.v.y += this.v.y - this.y;
    }

    translate(x, y) {
        this.v.x += x;
        this.v.y += y;
    }
    translateVector(vector) {
        this.v.x += vector.x;
        this.v.y += vector.y;
    }
}
Transform.prototype.vectorTo = function(otherTransform) {
  return new Vector2(otherTransform.x - this.x, otherTransform.y - this.y);
};