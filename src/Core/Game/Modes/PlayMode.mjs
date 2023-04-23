import {Grid} from '../Map/Grid.mjs';
import { CosmicEntity as CosmicGalaxy } from "../../CosmicEntity/CosmicEntity.mjs";
import { startGlobalEntities } from '../../globalEntities.mjs';

//this is probably a bad idea to rename the inheritance
export class PlayMode extends CosmicGalaxy {
    constructor() {
        super();
    }
    start() { 

        //this doesn't make sense here anymore
        /*
        this.scene.setup(()=>{
            let grid = new Grid();
            grid.generateGrid(this.mapTexture);
            grid.findSize();
            return grid;
        });
        */
        startGlobalEntities();
        // scene.addGameObject(player)
    }
    end () {

    }

    // other methods for handling gameplay
}
export const playMode = new PlayMode();