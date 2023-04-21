import { cosmicEntityManager } from "./CosmicEntity/CosmicEntityManager.mjs";
import { calculateDeltaTime, previousTime } from "./Time/n0Time.mjs";
import { gameH, gameW } from "./n0config.mjs";
class P5engine {
    constructor(){
        this.p = new window.p5(this.p5);
    }

    p5(p) {
        p.preload = (...args) => {
            cosmicEntityManager.invoke("preload", ...args);
          };
          
          p.setup = (...args) => {
            p.createCanvas(gameW,gameH).parent("sketch-holder");
            cosmicEntityManager.invoke("setup", ...args);
          };
          
          p.draw = (...args) => {
            p.background(34.5, 34.5, 34.5);
            p.noStroke();
            var dt = calculateDeltaTime();
            
            
            cosmicEntityManager.invoke("draw", dt, ...args);
          };
          
          p.mouseClicked = (...args) => {
            cosmicEntityManager.invoke("mouseClicked", ...args);
          };
          
          p.mouseDragged = (...args) => {
            cosmicEntityManager.invoke("mouseDragged", ...args);
          };
          
          p.mouseMoved = (...args) => {
            cosmicEntityManager.invoke("mouseMoved", ...args);
          };
          
          p.mousePressed = (...args) => {
            cosmicEntityManager.invoke("mousePressed", ...args);
          };
          
          p.mouseReleased = (...args) => {
            cosmicEntityManager.invoke("mouseReleased", ...args);
          };
          
          p.mouseWheel = (...args) => {
            cosmicEntityManager.invoke("mouseWheel", ...args);
          };
          
          p.doubleClicked = (...args) => {
            cosmicEntityManager.invoke("doubleClicked", ...args);
          };
          
          p.windowResized = (...args) => {
            cosmicEntityManager.invoke("windowResized", ...args);
          };
          
          p.keyPressed = (...args) => {
            cosmicEntityManager.invoke("keyPressed", ...args);
          };
          
          p.keyReleased = (...args) => {
            cosmicEntityManager.invoke("keyReleased", ...args);
          };
          
          p.keyTyped = (...args) => {
            cosmicEntityManager.invoke("keyTyped", ...args);
          };
          

    }
    
}
export var p5engine = new P5engine();
export const p = p5engine.p;