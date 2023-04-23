
import { CosmicEntity } from "../CosmicEntity/CosmicEntity.mjs";
import { gameH, gameW } from "../n0config.mjs";
import { p } from "../p5engine.mjs";
import {Vector2} from "./Math/Vector2";
import { Transform } from "./Transform.mjs";
//import p5 instance through module

export class Camera extends CosmicEntity {

    constructor(target, smoothness) {
        super();
        this.transform = new Transform(0,0,1);
        this.target = target;
        this.smoothness = smoothness;
    }
    follow(target) {
        this.target = target;
    }
    start () {
        if (this.target && "transform" in this.target) {
            this.transform.v.x  = (this.target.transform.x - (gameW / 2));
            this.transform.v.y = (this.target.transform.y - (gameH / 2));
        }
    }
    draw(deltaTime) {
        if (this.target && "transform" in this.target) {
            let x = (this.target.transform.x - (gameW / 2));
            let y = (this.target.transform.y - (gameH / 2));
            var vector = this.transform.vectorTo(new Vector2(x, y));
            this.transform.v.x += vector.x * deltaTime * this.smoothness;
            this.transform.v.y += vector.y * deltaTime * this.smoothness;
            p.translate(-this.transform.v.x, -this.transform.v.y);
        }
    }

}
export const cam = new Camera(undefined, .5);