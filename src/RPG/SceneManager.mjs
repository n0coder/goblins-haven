import { PlayMode } from "./Modes/PlayMode.mjs";
import { EditMode } from "./Modes/EditMode.mjs";
import { MainMenu } from "./Modes/MainMenu.mjs";

export class SceneManager {
    constructor(p, player, camera, possibleTiles, mapTexture) {
      this.currentMode = null;
      this.defaultScene = "edit mode"; //specify scene to boot directly into for debugging purposes
      this.scenes = {
        "main menu": () => {
          this.currentMode = new MainMenu(p, null, null, this, possibleTiles, mapTexture);
          // custom code to run for main menu
        },
        "play mode": (directMapTexture) => {
          
          this.currentMode = new PlayMode(p, player, camera, this, possibleTiles, directMapTexture? directMapTexture : mapTexture);
          // custom code to run for play mode
        },
        "edit mode": (directMapTexture) => {
          
          this.currentMode = new EditMode(p, player, camera, this, possibleTiles, directMapTexture? directMapTexture : mapTexture);
          // custom code to run for edit mode
        }
      };
    }
    leftClick () {
      this.currentMode.leftClick();
    }
    rightClick () {
      this.currentMode.rightClick();
    }
    start() {
      
      this.loadScene(this.defaultScene);
      
    }
    update(deltaTime) {

      this.currentMode.update(deltaTime);
    }
    draw() {

      this.currentMode.draw();
    }
    loadScene(sceneName, mapTexture) {
      this.currentMode?.end();
      this.scenes[sceneName](mapTexture);
      this.currentMode.start();
    }
  }