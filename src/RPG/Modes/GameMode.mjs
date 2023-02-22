import { Scene } from "../Engine/Scene.mjs";

export class GameMode {
    constructor(p, player, camera, sceneManager, possibleTiles) {
      this.scene = new Scene(p, camera, possibleTiles);
    }
    leftClick() {
      this.scene.leftClick()
    }
    rightClick(){
      this.scene.rightClick();
    }
    start() {
      // common functionality for starting the game mode
     
      this.scene.start();
    }
    end() {

    }
  
    update(deltaTime) {
        this.scene.update(deltaTime);
      // common functionality for updating the game mode
    }
    draw() {
        this.scene.draw();
        // common functionality for drawing the game mode
    }
  }