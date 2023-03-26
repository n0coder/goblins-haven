import {Transform} from "./Engine/Transform.mjs";
import {SpriteRenderer} from "./Engine/SpriteRenderer.mjs";
import { Vector2 } from "./Engine/Math/Vector2.mjs";
import { Sword } from "../Experiments/swordmagic.mjs";
export class Player {
    constructor(p5, x, y, size, sprite) {
        this.p5 = p5;
        let tfm = new Transform(x, y, size);
        this.transform = tfm;
        this.sword = new Sword(x,y, p5);
        this.transform.offsetY = .5 * this.transform.size;
        this.transform.centerize();
        this.speed = 225;
        this.spriteRenderer = new SpriteRenderer(p5, sprite, tfm);
        this.dirs = { 
            LEFT: new Vector2(-1, 0), 
            RIGHT: new Vector2(1, 0),
            UP: new Vector2(0, -1), 
            DOWN: new Vector2(0, 1) 
        };
        const {W, A, S, D} = {W: 87, A: 65, S: 83, D: 68};
        this.keys = {
            LEFT: [this.p5.LEFT_ARROW, A],
            RIGHT: [this.p5.RIGHT_ARROW, D],
            UP: [this.p5.UP_ARROW, W],
            DOWN: [this.p5.DOWN_ARROW, S]
        };
    }
    update(deltaTime) { // this.transform.x += this.speed * deltaTime;
        let speed = this.speed;

        Object.keys(this.keys).forEach(dir => {
            if (this.keys[dir].some(key => this.p5.keyIsDown(key))) {
                let o = speed * deltaTime;
              this.transform.translate(this.dirs[dir].x * o, this.dirs[dir].y*o);
            }
          });
        

        // this.transform.y = sin(this.sus)*10
        // console.log(this.transform.y);
    }

    draw() {
        this.spriteRenderer.draw();
        this.sword.draw();
    }
}