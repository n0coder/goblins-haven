import {Transform} from "./Engine/Transform.mjs";
import {SpriteRenderer} from "./Engine/SpriteRenderer.mjs";
import { Vector2 } from "./Engine/Math/Vector2.mjs";
import { p } from "./Core/p5engine.mjs";
import { CosmicEntity } from "./Core/CosmicEntity/CosmicEntity.mjs";

export class Player extends CosmicEntity {
    constructor(x, y, size, sprite) {
        super();
        let tfm = new Transform(x, y, size);
        this.transform = tfm;
        this.transform.offsetY = .5 * this.transform.size;
        this.transform.centerize();
        this.speed = 225;
        this.dirs = { 
            LEFT: new Vector2(-1, 0), 
            RIGHT: new Vector2(1, 0),
            UP: new Vector2(0, -1), 
            DOWN: new Vector2(0, 1) 
        };
        const {W, A, S, D} = {W: 87, A: 65, S: 83, D: 68};
        this.keys = {
            LEFT: [p.LEFT_ARROW, A],
            RIGHT: [p.RIGHT_ARROW, D],
            UP: [p.UP_ARROW, W],
            DOWN: [p.DOWN_ARROW, S]
        };
    }
    preload() {
        this.sprite = p.loadImage('assets/chara.png');
        this.spriteRenderer = new SpriteRenderer(this.sprite, this.transform);
    }

    draw(deltaTime) {
        Object.keys(this.keys).forEach(dir => {
            if (this.keys[dir].some(key => p.keyIsDown(key))) {
                let o = this.speed*deltaTime;
              this.transform.translate(this.dirs[dir].x * o, this.dirs[dir].y*o);
            }
          });
        this.spriteRenderer.draw();
    }
}