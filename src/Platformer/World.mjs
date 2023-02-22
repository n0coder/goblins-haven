import { Polygon } from "./Polygon.mjs";
import { RectangleF } from "./RectangleF.mjs";
import { SoftBody } from "./SoftBody.mjs";

export class World {
    static G = new p5.Vector;
    static Walled = true;
    static Step = 1 / 60;

    constructor(p) {
        this.p = p;
        World.G = p.createVector(0, 0.980665);
        this.entities = [];
        this.sorted = true;
        this.mousePressed = false;
        this.add(new SoftBody(p, this, 6, 4, RectangleF.box(p, 250, 100, 300, 500)));
        //this.add(new Polygon(p, p.createVector(0, 120), p.createVector(500, 630), p.createVector(700, 630), p.createVector(700, 650), p.createVector(20, 650)));
        //this.add(new Polygon(p, p.createVector(900, 400), p.createVector(900, 500), p.createVector(1100, 600), p.createVector(1100, 300)));
        //this.add(new Polygon(p, p.createVector(30, 30), p.createVector(1250, 30), p.createVector(1250, 690), p.createVector(30, 690), p.createVector(30, 30), p.createVector(1, 1), p.createVector(1, 719), p.createVector(1279, 719), p.createVector(1279, 1), p.createVector(1, 1)));
        this.p.mousePressed = function () {
            this.mousePressed = true;
        }
        this.p.mouseReleased = function () {
            this.mousePressed = false;
        }

    }
    
    update() {
        //MInput.Update();
        //KInput.Update();

        if (!this.sorted) {
            this.entities.sort((x, y) => this.compare(x, y));
            this.sorted = true;
        }

        // updating in 3 steps
        this.entities.forEach((o) => o.beforeUpdate());
        this.entities.forEach((o) => o.update(this.mousePressed));
        this.entities.forEach((o) => o.afterUpdate());
    }

    draw() {
        this.entities.forEach((o) => o.draw());
    }

    add(ent) {
        this.entities.push(ent);
        ent.added(this);
        this.sorted = false;
    }

    compare(x, y) {
        return Math.sign(y.Depth - x.Depth);
    }
}
