import {Entity} from "./Entity.mjs";

export class Spring extends Entity {
    constructor(p, a, b, desiredLength) {
        super();
        this.a = a;
        this.b = b;
        this.restLength = desiredLength;
        this.stiffness = 400;
        this.dampingFactor = 5;
        this.p = p;
    }

    update() {
      console.log(this.a);
      console.log(this.b);
        const springForce = this.stiffness * (p5.Vector.dist(this.a.position, this.b.position) - this.restLength);

        const veloBA = this.normalizedDifference(this.b.position, this.a.position);
        const deltaVelo = p5.Vector.sub(this.b.velocity, this.a.velocity);
        const dampingForce = p5.Vector.dot(veloBA, deltaVelo) * this.dampingFactor;

        const totalSpringForce = springForce + dampingForce;

        this.a.force.add(this.normalizedDifference(this.b.position, this.a.position).mult(totalSpringForce));
        this.b.force.add(this.normalizedDifference(this.a.position, this.b.position).mult(totalSpringForce));
    }

    draw() {
        super.draw();
        this.p.line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y, this.p.color(0, 0, 0));
    }

    normalizedDifference(a, b) {
        return p5.Vector.sub(a, b).div(p5.Vector.dist(a, b));
    }
}
