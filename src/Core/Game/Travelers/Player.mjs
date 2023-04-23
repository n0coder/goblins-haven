import { Transform } from "../../Engine/Transform.mjs";
import {SpriteRenderer} from "../../Engine/Sprites/SpriteRenderer.mjs";
import { Vector2 } from "../../Engine/Math/Vector2.mjs";
import { p } from "../../p5engine.mjs";
import { CosmicEntity } from "../../CosmicEntity/CosmicEntity.mjs";
import { loadImage } from "../../Engine/Sprites/ImageLoader.mjs";

export class Player extends CosmicEntity {
    constructor(x, y, size) {
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
    start() {
        
        p.loadImage('assets/chara.png', (img)=> {
            this.spriteRenderer = new SpriteRenderer(img, this.transform);
        });
    }
    //keyPressed, keyReleased, keyTyped?!

    

    draw(deltaTime) {
        // Check if any of the keys are pressed and move the player accordingly
Object.keys(this.keys).forEach(dir => {
    if (this.keys[dir].some(key => p.keyIsDown(key))) {
        let direction = this.dirs[dir];
        let x = direction.x * this.speed * deltaTime;
        let y = direction.y * this.speed * deltaTime;
        this.transform.translate(x, y);
    }
});
           
        this.spriteRenderer?.draw();
    }
}