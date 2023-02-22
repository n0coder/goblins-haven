import { Grid } from "../Grid.mjs";
import { GameMode } from "./GameMode.mjs";

export class PlayMode extends GameMode {
    constructor(p, player, camera, sceneManager, possibleTiles, mapTexture) {
        super(p, player, camera,sceneManager, possibleTiles);
        this.p = p;
        this.scene.hierarchy.push(player);
        this.possibleTiles = possibleTiles;
        this.mapTexture = mapTexture;
        // other play-related properties
    }
    start() { 
        this.scene.setup(()=>{
            let grid = new Grid(this.possibleTiles, 64);
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
