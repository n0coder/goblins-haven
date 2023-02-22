import { Entity } from "./Entity.mjs";
import { Node } from "./Node.mjs";
import { Polygon } from "./Polygon.mjs";
import { RectangleF } from "./RectangleF.mjs";
import { Spring } from "./Spring.mjs";

export class SoftBody extends Entity {
  constructor(p, world, numX, numY, rect) {
    super();
    this.world = world;
    this.nodes = [];
    this.bounds = rect;
    this.numX = numX;
    this.numY = numY;
    this.p = p;
    this.depth = 4;
  }

  added(world) {
    super.added(world);

    let nodes = new Array(this.numX);
    for (let x = 0; x < this.numX; x++) {
      nodes[x] = new Array(this.numY);
    }

    let delta = this.p.createVector(
      this.bounds.width / (this.numX + 1),
      this.bounds.height / (this.numY + 1)
    );

    for (let x = 0; x < this.numX; x++) {
      for (let y = 0; y < this.numY; y++) {
        let pos = this.p.createVector(
          this.bounds.x + delta.x * x,
          this.bounds.y + delta.y * y
        );
        nodes[x][y] = new Node(this.p, pos);
        world.add(nodes[x][y]);
        this.nodes.push(nodes[x][y]);
      }
    }

    for (let x = 0; x < this.numX - 1; x++) {
      for (let y = 0; y < this.numY - 1; y++) {
        world.add(new Spring(this.p, nodes[x][y], nodes[x + 1][y],1));
        world.add(new Spring(this.p, nodes[x][y], nodes[x + 1][y + 1],1));
        world.add(new Spring(this.p, nodes[x][y], nodes[x][y + 1],1));
        world.add(new Spring(this.p, nodes[x + 1][y], nodes[x][y + 1],1));
      }
    }

    for (let x = 0; x < this.numX - 1; x++) {
      world.add(new Spring(this.p, nodes[x][this.numY - 1], nodes[x + 1][this.numY - 1],1));
    }

    for (let y = 0; y < this.numY - 1; y++) {
      world.add(new Spring(this.p, nodes[this.numX - 1][y], nodes[this.numX - 1][y + 1]),1);
    }
  }

  beforeUpdate() {
    super.beforeUpdate();

    let leftmost = this.nodes[0].position.x;
    let upmost = this.nodes[0].position.y;
    let downmost = this.nodes[0].position.y;
    let rightmost = this.nodes[0].position.x;

    for (let node of this.nodes) {
      if (node.position.x > rightmost) rightmost = node.position.x;
      if (node.position.x < leftmost) leftmost = node.position.x;
      if (node.position.y > downmost) downmost = node.position.y;
      if (node.position.y < upmost) upmost = node.position.y;
    }

    this.bounds = RectangleF.box(this.p, leftmost, upmost, rightmost - leftmost, downmost - upmost);
  }

  update() {
    super.update();

    for (let ent of this.world.entities) {
      if (ent instanceof Polygon) {
        let poly = ent;
        if (this.bounds.intersects(poly.bounds)) {
          for (let n of this.nodes) {
            if (poly.contains(n.position)) {
              n.processCollision(poly);
            }
          }
        }
      }
    }
}
}