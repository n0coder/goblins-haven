import { Entity } from "./Entity.mjs";
import { World } from "./World.mjs";

export class Node extends Entity {
  static size = 5;

  constructor(p, pos) {
    super(p);
    this.p = p;
    this.position = pos;
    this.velocity = this.p.createVector();
    this.force = this.p.createVector();
    this.mass = 1;
    this.collided = false;
    this.edgeVertice = this.p.createVector();
  }

  beforeUpdate() {
    super.beforeUpdate();
    this.collided = false;
    this.force.set(0, 0);
    this.force.add(p5.Vector.mult(World.G, this.mass));
  }

  update(mouseIsPressed) {
    super.update();
    if (mouseIsPressed) {
      const clickPos = this.p.createVector(mouseX, mouseY);
      const dist = p5.Vector.dist(clickPos, this.position);
      const maxForceDist = 50;
      const force = p5.Vector.sub(clickPos, this.position).mult(Math.min(dist, maxForceDist) * World.step);
      this.force.add(force);
    }
  }

  afterUpdate() {
    super.afterUpdate();
    // Euler Integration
    this.velocity.add(p5.Vector.div(this.force, this.mass).mult(World.step));
    // if point is within polygon, push it out to the closest edge and rebound velocity along the normalized pussh vector
    let delta = this.p.createVector();
    if (this.collided) {
      delta = p5.Vector.sub(this.edgeVertice, this.position);
      if (p5.Vector.dot(delta, this.velocity) < 0) {
        delta.normalize();
        // rebound
        const v = p5.Vector.mult(delta, 2 * p5.Vector.dot(this.velocity, delta));
        this.velocity.sub(v);
      }
    }
    this.position.add(p5.Vector.mult(this.velocity, World.step));
  }

  draw() {
    super.draw();
    if (this.collided) {
      this.p.fill(255, 0, 0);
      this.p.rect(this.edgeVertice.x - Node.size, this.edgeVertice.y - Node.size, Node.size * 2, Node.size * 2);
    } else {
      this.p.fill(255, 0, 0);
      this.p.rect(this.position.x - Node.size, this.position.y - Node.size, Node.size * 2, Node.size * 2);
    }
  }

  processCollision(poly) {
    if (poly.contains(this.position)) {
      this.collided = true;
      this.edgeVertice = poly.closestPoint(this.position);
    }
  }
}