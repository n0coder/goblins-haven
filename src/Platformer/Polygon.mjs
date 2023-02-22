import { Calc } from "./Calc.mjs";
import { Entity } from "./Entity.mjs";
import Line from "./Line.mjs";
import { RectangleF } from "./RectangleF.mjs";

export class Polygon extends Entity {
  constructor(p, ...vertices) {
    super();

    this.p = p;
    this.vertices = vertices;
    this.bounds = this._calculateBounds();
  }

  _calculateBounds() {
    const leftmost = this.vertices.reduce((acc, v) => Math.min(acc, v.x), this.vertices[0].x);
    const upmost = this.vertices.reduce((acc, v) => Math.min(acc, v.y), this.vertices[0].y);
    const rightmost = this.vertices.reduce((acc, v) => Math.max(acc, v.x), this.vertices[0].x);
    const downmost = this.vertices.reduce((acc, v) => Math.max(acc, v.y), this.vertices[0].y);

    return RectangleF.box(this.p, leftmost, upmost, rightmost - leftmost, downmost - upmost);
  }

  draw() {
    super.draw();
    this.p.stroke(1);
    for (let i = 0; i < this.vertices.length; i++) {
      const v1 = this.vertices[i];
      const v2 = this.vertices[(i + 1) % this.vertices.length];
      this.p.line(v1.x, v1.y, v2.x, v2.y);
    }
  }

  numIntersections(other) {
    let count = 0;
    for (let i = 0; i < this.vertices.length; i++) {
      const v1 = this.vertices[i];
      const v2 = this.vertices[(i + 1) % this.vertices.length];
      const line = new Line(v1, v2);
      if (line.intersects(other)) {
        count++;
      }
    }
    return count;
  }

  contains(vertex) {
    const line = new Line(this.p.createVector(0, vertex.y), vertex);
    return this.numIntersections(line) % 2 === 1;
  }

  closestPoint(vertex) {
    let closest = Calc.closestPointOnLine(this.p, this.vertices[0], this.vertices[1], vertex);
    let curDist = p5.Vector.sub(vertex, closest).mag();

    for (let i = 1; i < this.vertices.length; i++) {
      const v1 = this.vertices[i];
      const v2 = this.vertices[(i + 1) % this.vertices.length];
      const other = Calc.closestPointOnLine(this.p, v1, v2, vertex);
      const otherDist = p5.Vector.sub(vertex, other).mag();

      if (otherDist < curDist) {
        closest = other;
        curDist = otherDist;
      }
    }

    return closest;
  }
}
