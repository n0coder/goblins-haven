import { Calc } from "./Calc.mjs";
import { RectangleF } from "./RectangleF.mjs";

export class Line {
    static EPSILON = 0.000001;
  
    bounds;
  
    constructor(a, b, p) {
      this.a0 = a;
      this.b0 = b;
      this.p = p;
  
      const x = Math.min(this.a0.x, this.b0.x);
      const y = Math.min(this.a0.y, this.b0.y);
      const width = Math.max(this.a0.x, this.b0.x) - x;
      const height = Math.max(this.a0.y, this.b0.y) - y;
  
      this.bounds = RectangleF.box(x, y, width, height);
    }
  
    translate(vec) {
      return new Line(this.a0.add(vec), this.b0.add(vec), this.p);
    }
  
    isPointOnLine(p) {
      const transLine = this.translate(this.a0.multiply(-1));
      const transP = p.subtract(this.a0);
      const r = Calc.crossProduct(transLine.b0, transP);
      return Math.abs(r) < Line.EPSILON;
    }
  
    isPointRightOfLine(p) {
      const transLine = this.translate(this.a0.multiply(-1));
      const transP = p.subtract(this.a0);
      return Calc.crossProduct(transLine.b0, transP) < 0;
    }
  
    touchOrCross(other) {
      return this.isPointOnLine(other.a0) || this.isPointOnLine(other.b0) || (this.isPointRightOfLine(other.a0) ^ this.isPointRightOfLine(other.b0));
    }
  
    intersects(other) {
      return this.bounds.intersects(other.bounds) && this.touchOrCross(other) && other.touchOrCross(this);
    }
  
    intersectsPoints(a1, b1) {
      const other = new Line(a1, b1, this.p);
      return this.intersects(other);
    }
  }
  
  export default Line;
  