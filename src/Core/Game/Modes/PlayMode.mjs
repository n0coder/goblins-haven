import {Grid} from '../Map/EditorGrid.mjs';
import { CosmicEntity as CosmicGalaxy } from "../../CosmicEntity/CosmicEntity.mjs";

//this is probably a bad idea to rename the inheritance
export class PlayMode extends CosmicGalaxy {
    constructor() {
        super();
    }
    start() { 

        //this doesn't make sense here anymore
        this.scene.setup(()=>{
            let grid = new Grid();
            grid.generateGrid(this.mapTexture);
            grid.findSize();
            return grid;
        });
        super.start();
        // scene.addGameObject(player)
    }
    end () {

    }
    update(deltaTime) {
        super.update(deltaTime);
        // update game logic for play mode
        // this.handlePlayerMovement();
        // this.handleMonsterSpawning(); //<- this will be handled at a per tile basis
        // this.handleInteraction();
        // other gameplay-related tasks
    }
    draw() {
        super.draw();
    }

    // other methods for handling gameplay
}
export const playMode = new PlayMode();