
import {Vector2} from "./Math/Vector2";


export class Camera {

    constructor(p5, transform, target, smoothness) {
        this.p5 = p5;
        this.transform = transform;
        this.target = target;
        this.smoothness = smoothness;
    }
    follow(target) {
        this.target = target;
    }
    start () {
        if (this.target && "transform" in this.target) {
            this.transform.v.x  = (this.target.transform.x - (this.p5.gameW / 2));
            this.transform.v.y = (this.target.transform.y - (this.p5.gameH / 2));
        }
    }
    update(deltaTime) {
        if (this.target && "transform" in this.target) {
            let x = (this.target.transform.x - (this.p5.gameW / 2));
            let y = (this.target.transform.y - (this.p5.gameH / 2));
            var vector = this.transform.vectorTo(new Vector2(x, y));
            this.transform.v.x += vector.x * deltaTime * this.smoothness;
            this.transform.v.y += vector.y * deltaTime * this.smoothness;
        }
    }

    draw() {
        this.p5.translate(-this.transform.x, -this.transform.y);
    }
}