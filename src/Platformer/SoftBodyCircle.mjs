
export class SoftBodyCircle {
    constructor(p, x, y, r, numPoints, springLength, springStiffness) {
        this.p = p;
        this.position = this.p.createVector(x, y);
        this.velocity =this.p.createVector(0, 0);
        this.acceleration = this.p.createVector(0, 0);
        this.radius = r;
        this.numPoints = numPoints;
        this.springLength = springLength;
        this.springStiffness = springStiffness;
        this.points = [];

        // Create the points
        for (let i = 0; i < numPoints; i++) {
            const angle = p.map(i, 0, numPoints, 0, p.TWO_PI);
            const px = x + r * p.cos(angle);
            const py = y + r * p.sin(angle);
            this.points.push(new SoftBodyPoint(p,px, py));
        }

        // Create the springs
        this.springs = [];
        for (let i = 0; i < numPoints; i++) {
            for (let j = i + 1; j < numPoints; j++) {
                const a = this.points[i];
                const b = this.points[j];
                const d = p.dist(a.position.x, a.position.y, b.position.x, b.position.y);
                if (d < springLength * 1.5) {
                    const s = new SoftBodySpring(p, a, b, d, springStiffness);
                    this.springs.push(s);
                }
            }
        }
    }

    applyForce(force) {
        for (let i = 0; i < this.numPoints; i++) {
            this.points[i].applyForce(force);
        }
    }

    update() {
        for (let i = 0; i < this.numPoints; i++) {
            this.points[i].update();
        }

        for (let i = 0; i < this.springs.length; i++) {
            this.springs[i].update();
        }

        // // Constrain the circle to its original radius
        // for (let i = 0; i < this.numPoints; i++) {
        //     const p = this.points[i];
        //     const d = this.p.dist(p.position.x, p.position.y, this.position.x, this.position.y);
        //     if (d > this.radius) {
        //         const v = this.p.createVector(p.position.x - this.position.x, p.position.y - this.position.y);
        //         v.setMag(this.radius);
        //         p.position.x = this.position.x + v.x;
        //         p.position.y = this.position.y + v.y;
        //         p.velocity.mult(0.9); // Dampen the velocity
        //     }
        // }
    }
    getCenter() {
        let sumX = 0;
        let sumY = 0;
        for (let i = 0; i < this.numPoints; i++) {
          const p = this.points[i];
          sumX += p.position.x;
          sumY += p.position.y;
        }
        const centerX = sumX / this.numPoints;
        const centerY = sumY / this.numPoints;
        return this.p.createVector(centerX, centerY);
      }
    display() {
        for (let i = 0; i < this.numPoints; i++) {
            const p = this.points[i];
            this.p.ellipse(p.position.x, p.position.y, 10, 10);
        }
    }
    
}
export class SoftBodyPoint {
    constructor(p, x, y) {
        this.p = p;
        this.position = this.p.createVector(x, y);
        this.velocity = this.p.createVector(0, 0);
        this.acceleration = this.p.createVector(0, 0);
        this.mass = 1;
    }

    applyForce(force) {
        const f = p5.Vector.div(force, this.mass);
        this.velocity.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
}

export class SoftBodySpring {
    constructor(p, a, b, d, k) {
        this.p = p;
        this.pointA = a;
        this.pointB = b;
        this.restLength = d;
        this.stiffness = k;
    }

    update() {
        const springVector = p5.Vector.sub(this.pointB.position, this.pointA.position);
        const currentLength = springVector.mag();
        const stretchLength = currentLength - this.restLength;
        springVector.normalize().mult(-1 * this.stiffness * stretchLength);

        this.pointA.applyForce(springVector);
        this.pointB.applyForce(p5.Vector.mult(springVector, -1));
    }
}
